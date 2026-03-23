# Lessons and Patterns

## Workflow & Environment
- **[2026-03-21] Python Path Issue:** Python commands (python, py, python3) from the Microsoft Store stub were not functional on this Windows machine.
    - **Fix:** Used Node.js (already installed) for complex scripting tasks.
- **[2026-03-21] PowerShell count:** Avoid `wc -l`. Instead, use `(Get-ChildItem -Directory "path").Count` or similar native PowerShell commands.
- **[2026-03-21] Artifact Paths:** Artifacts must be stored in the designated Brain directory. Files in the workspace should use `IsArtifact: false`.
