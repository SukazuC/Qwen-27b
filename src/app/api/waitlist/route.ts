import { NextRequest, NextResponse } from "next/server";
import { waitlistRequestSchema } from "@/lib/validation/waitlist";
import { upsertWaitlistSignup, createFounder } from "@/lib/db/queries";
import { isDbAvailable } from "@/lib/db/client";
import { checkRateLimit, getIpFromHeaders } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  const ip = getIpFromHeaders(request.headers);

  if (!checkRateLimit(ip, "/api/waitlist")) {
    return NextResponse.json(
      {
        ok: false,
        error: "RATE_LIMITED",
        message: "Trop de tentatives. Veuillez réessayer plus tard.",
      },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: "INVALID_INPUT",
        message: "Requête invalide.",
      },
      { status: 400 }
    );
  }

  const parsed = waitlistRequestSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    const message = fieldErrors.email
      ? fieldErrors.email[0]
      : "Données invalides.";
    return NextResponse.json(
      {
        ok: false,
        error: "INVALID_INPUT",
        message,
      },
      { status: 400 }
    );
  }

  const { email, source, referralCode, company } = parsed.data;

  if (company) {
    return NextResponse.json({
      ok: true,
      status: "created" as const,
      founderId: "HYDRE-0000",
      points: 100,
    });
  }

  const normalizedEmail = email.toLowerCase().trim();

  let founderId = "";
  const points = 100;
  let emailWarning = false;
  let status: "created" | "duplicate" = "created";

  if (isDbAvailable()) {
    const result = await upsertWaitlistSignup(
      email,
      normalizedEmail,
      source,
      referralCode || undefined
    );

    status = result.status;

    if (result.status === "created" && result.founderNumber) {
      const founder = await createFounder(normalizedEmail, result.founderNumber);
      founderId = founder.displayId;
    } else {
      founderId = `HYDRE-${String(Math.floor(Math.random() * 9000) + 1000)}`;
    }

    const resendKey = process.env.RESEND_API_KEY;
    const resendFrom = process.env.RESEND_FROM_EMAIL;
    if (resendKey && resendFrom) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(resendKey);
        await resend.emails.send({
          from: resendFrom,
          to: normalizedEmail,
          subject: "Bienvenue dans l'Agora HYDRE Nutrition",
          text: `Bonjour,\n\nBienvenue dans l'Agora HYDRE Nutrition.\n\nVotre ID fondateur : ${founderId}\n\nMerci de rejoindre notre communauté.\n\nL'équipe HYDRE`,
        });
      } catch {
        emailWarning = true;
      }
    }
  } else {
    founderId = `HYDRE-${String(Math.floor(Math.random() * 9000) + 1000)}`;
  }

  return NextResponse.json({
    ok: true,
    status,
    founderId,
    points,
    ...(emailWarning ? { emailWarning } : {}),
  });
}
