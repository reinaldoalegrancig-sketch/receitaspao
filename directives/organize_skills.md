# Organize Skills Directive

## Goal
Organize the skills downloaded from the `antigravity-awesome-skills` repository into folders based on their functional categories as defined in `CATALOG.md`.

## Inputs
- `SOURCE_DIR`: The `.tmp/awesome-skills-repo/skills/` directory containing the skill folders.
- `CATALOG_PATH`: The `.tmp/awesome-skills-repo/CATALOG.md` file containing the category mapping.
- `TARGET_DIR`: The root directory where organized folders will be created.

## Output
- A set of folders in `TARGET_DIR`, each representing a category (e.g., `architecture`, `business`, `data-ai`), containing the respective skill folders.

## Tools
- `execution/organize_skills.py`: A Python script to parse the catalog and move the files.

## Edge Cases
- Skill folder does not exist in `skills/` but is listed in `CATALOG.md`.
- Category name contains special characters.
- Duplicate skill names (unlikely given the repo structure).

## Execution Steps
1. Run `execution/organize_skills.py` with the paths to the repo and the target directory.
2. Verify that all 1,306 skills have been moved or accounted for.
3. Clean up the source repository if needed.
