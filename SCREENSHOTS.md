\---

name: take-screenshots

description: Safely checks for, starts, and manages the local dev server to capture application screenshots.

\---



\## What I Do

I manage the development server lifecycle safely to run the screenshot script without blocking the agent's active shell.



\## Procedure

Follow these steps strictly:



1\. \*\*Check Dev Server Status:\*\*

&#x20;  - Verify if the server is running by attempting to reach `http://localhost:3000`. Use a command like `curl -Is http://localhost:3000` or PowerShell's `Test-NetConnection -ComputerName localhost -Port 3000`.

&#x20;  - Note the result: is it running or not?



2\. \*\*Start Dev Server (If Not Running):\*\*

&#x20;  - If the server is NOT running, you MUST start it in the background so it doesn't monopolize your shell.

&#x20;  - Use a non-blocking command. For example, in PowerShell: `Start-Process npm -ArgumentList "run dev" -NoNewWindow` (adjust the `npm run dev` part to the project's actual start command).

&#x20;  - Wait 5-10 seconds for the server to spin up before proceeding.



3\. \*\*Run the Screenshot Script:\*\*

&#x20;  - Execute the screenshot generation command (e.g., `npm run screenshot`). Wait for this script to fully complete.



4\. \*\*Clean Up:\*\*

&#x20;  - If (and only if) you started the dev server in Step 2, you must close it now.

&#x20;  - Find the process running on port 3000 and terminate it (e.g., using `Stop-Process` or `taskkill`). Do not kill the server if it was already running before you started Step 1.

