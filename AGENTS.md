<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Screenshots / Visual Testing

Never run `npx next start` directly — it blocks the shell and gets killed on timeout. Use this exact sequence:

1. **Kill any existing server on port 3001:**
   ```powershell
   $p = Get-NetTCPConnection -LocalPort 3001 -ErrorAction SilentlyContinue; if ($p) { Stop-Process -Id $p.OwningProcess -Force }
   ```
2. **Start server in background:**
   ```powershell
   cmd /c start /b npx next start -p 3001
   ```
3. **Wait and verify:**
   ```powershell
   Start-Sleep -Seconds 5; (Invoke-WebRequest -Uri http://localhost:3001 -TimeoutSec 5).StatusCode
   ```
4. **Run screenshot script:**
   ```powershell
   npx tsx screenshots/screenshot.ts
   ```

All 4 steps should be in **separate** tool calls (verify before running). Never combine start + screenshot in one call.

## Next.js 16 Local Image Optimization

Next.js 16 blocks image optimization from localhost by default. `next.config.ts` must include:
```ts
images: {
  dangerouslyAllowLocalIP: true,
  minimumCacheTTL: 60,
}
```
Without this, images fail silently during local dev/screenshots.
