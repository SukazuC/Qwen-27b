import { NextRequest, NextResponse } from "next/server";
import { voteRequestSchema } from "@/lib/validation/vote";
import { hashString } from "@/lib/utils";
import { checkRateLimit, getIpFromHeaders } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  const ip = getIpFromHeaders(request.headers);

  if (!checkRateLimit(ip, "/api/vote")) {
    return NextResponse.json(
      {
        ok: false,
        error: "RATE_LIMITED",
        message: "Trop de tentatives. Veuillez réessayer plus tard.",
      },
      { status: 429 }
    );
  }

  let body;
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

  const parsed = voteRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "INVALID_INPUT",
        message: parsed.error.issues[0]?.message ?? "Données invalides.",
      },
      { status: 400 }
    );
  }

  const { pollSlug, optionSlug, email, anonymousToken } = parsed.data;

  /*
   * In production with a database, this would:
   * 1. Look up the poll by slug
   * 2. Look up the option by slug within the poll
   * 3. Check if the founder/token has already voted
   * 4. Insert the vote record
   *
   * For demo/local mode without DB, return mock success.
   */

  const voterIdentifier = email
    ? hashString(email.toLowerCase())
    : anonymousToken
      ? hashString(anonymousToken)
      : null;

  return NextResponse.json({
    ok: true,
    status: "voted",
    pollSlug,
    optionSlug,
    voterIdentifier: voterIdentifier ? voterIdentifier.slice(0, 8) : null,
  });
}
