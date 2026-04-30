<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Screenshots / Visual Testing

Use this 2-step procedure. The screenshot script has its own built-in health check and will wait up to 60s for the server to become ready.

1. **Kill any existing server on port 3001 and start a new one:**
   ```powershell
   $p = Get-NetTCPConnection -LocalPort 3001 -ErrorAction SilentlyContinue; if ($p) { Stop-Process -Id $p.OwningProcess -Force -ErrorAction SilentlyContinue }; Start-Process powershell -ArgumentList "-NoExit", "-Command", "npx next start -p 3001"; Start-Sleep -Seconds 12
   ```

2. **Run screenshot script (built-in health check, waits up to 60s for the server):**
   ```powershell
   npx tsx screenshots/screenshot.ts
   ```

If the script prints `"Dev server did not start in time"`, wait 10s then re-run step 2.

## Next.js 16 Local Image Optimization

Next.js 16 blocks image optimization from localhost by default. `next.config.ts` must include:
```ts
images: {
  dangerouslyAllowLocalIP: true,
  minimumCacheTTL: 60,
}
```
Without this, images fail silently during local dev/screenshots.
