---
name: update-knowledge
description: Use at end of any session where new ML patterns, assay fixes, code solutions, or clinical discoveries were made — captures learnings to KNOWLEDGE_BASE.md
---

# Update Knowledge

## When to Use
- End of session: new ML pattern worked, bug fixed, new library solved a problem
- Better approach found than what's currently in KNOWLEDGE_BASE.md
- Novel clinical/statistical/assay solution discovered
- Regulatory guidance clarified (FDA form, CLIA requirement, CAP standard)

## Two-Step Process

### Step 1: Append to KNOWLEDGE_BASE.md
Path: `C:\Users\sreen\Cloud-Drive\Sync with iDrive\Cloud_Claude_2026\KNOWLEDGE_BASE.md`

Format:
```markdown
## [Category]: [Short Title]
**Date**: YYYY-MM-DD | **Project**: [project name]
**Problem**: [what was the problem or question?]
**Solution**: [what worked?]
\```python / R / bash
# Key code snippet (keep concise)
\```
**Why it works**: [1 sentence]
**Reuse**: [other projects or contexts where this applies]
```

### Step 2: Verify LEARNINGS.md has session marker
Path: `C:\Users\sreen\Cloud-Drive\Sync with iDrive\Cloud_Claude_2026\LEARNINGS.md`
(Auto-appended by Stop hook — just confirm it's there)

## Categories
| Category | Use for |
|----------|---------|
| `BioML` | ML model patterns, feature selection, validation |
| `qPCR` | qPCR analysis, normalization, Cq handling, OpenArray |
| `Bioinformatics` | Expression, pathway, UMAP, small RNA, clustering |
| `Assay` | Validation metrics, LOD/LOQ, interference, stability |
| `Regulatory` | FDA forms, CLIA/CAP requirements, 510(k)/De Novo |
| `WebApp` | Security patterns, API design, frontend |
| `MobileApp` | React Native, offline-first, scientific apps |
| `AI-Agents` | Claude/AI workflow improvements |
| `R-Python` | Language-specific patterns and library solutions |
| `Clinical` | Clinical interpretation, reporting standards |
