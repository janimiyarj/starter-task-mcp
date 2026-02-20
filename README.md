# Starter App (Learning Project)

This is a tiny task app you can understand in one sitting.

## Features
- Add a task
- Mark task complete
- Delete task
- Clear completed tasks
- Persist data in localStorage

## Run it locally
From this folder:

```bash
./start-app.sh
```

Then open:
- http://localhost:5501

## Playwright MCP integration
This project is wired to Playwright MCP through `.vscode/mcp.json`.

- Server id: `io.github.microsoft/playwright-mcp`
- Command: `playwright-mcp`
- Artifacts folder: `.playwright-mcp/output`
- Enabled: trace + session saving

### Use it
1. Start the app server (`./start-app.sh`).
2. In your MCP-enabled IDE, start/connect `io.github.microsoft/playwright-mcp`.
3. Run a prompt like:

```text
Use Playwright MCP to open http://localhost:5501 and run a smoke test:
- Add task "Learn Playwright MCP"
- Mark it completed
- Verify count is "1 total, 1 done"
Return pass/fail for each step.
```

After runs, inspect `.playwright-mcp/output` for artifacts.

## Deploy (secure GitHub Pages)
This repo includes a workflow that deploys only `index.html`, `style.css`, and `app.js` to GitHub Pages.

Security defaults included:
- HTTPS (GitHub Pages)
- restrictive Content Security Policy in `index.html`
- least-privilege deploy workflow permissions

### Enable deployment
1. In GitHub, open `Settings -> Pages`.
2. Under Build and deployment, set `Source` to `GitHub Actions`.
3. Push to `main` (or run the workflow manually).

Your site URL will be:
- `https://<your-github-username>.github.io/<repo-name>/`

## Project files
- `index.html` - UI structure
- `style.css` - styles
- `app.js` - app logic/state

## Playwright MCP learning prompts
Use these prompts in your MCP-enabled assistant.

### Prompt 1: Basic smoke test
```text
Use Playwright MCP to test http://localhost:5501.
Steps:
1) Verify page title contains "Starter App".
2) Add task "Learn MCP".
3) Confirm task count becomes "1 total, 0 done".
4) Check the task checkbox.
5) Confirm task count becomes "1 total, 1 done".
Report pass/fail for each step.
```

### Prompt 2: Failure-oriented check
```text
Use Playwright MCP against http://localhost:5501 and find one bug or UX issue.
Return:
- exact repro steps
- expected result
- actual result
- minimal fix suggestion
```

### Prompt 3: Regression loop
```text
Use Playwright MCP to run this regression:
- Add two tasks
- Complete one
- Click "Clear Completed"
- Verify only one active task remains
If anything fails, explain which step failed first.
```

## Next complexity steps (later)
1. Add due dates and priority.
2. Add filters (All / Active / Done).
3. Add edit-in-place for tasks.
4. Add backend API + database.
5. Add real Playwright test files and CI.
