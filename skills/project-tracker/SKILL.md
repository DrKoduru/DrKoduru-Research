---
name: project-tracker
description: Use when starting any new project, web app, ML model, analysis, or diagnostic tool — creates PROJECT_BRIEF.md in project root and adds entry to PROJECTS_REGISTRY.md
---

# Project Tracker

## Always Do These Two Things
1. Create `PROJECT_BRIEF.md` in the project directory
2. Add a row to `PROJECTS_REGISTRY.md` in `C:\Users\sreen\Cloud-Drive\Sync with iDrive\Cloud_Claude_2026\`

## PROJECT_BRIEF.md Template

```markdown
# [Project Name]

**Type**: Diagnostic Platform | Web App | ML Model | Analysis | Business Tool | Scientific Mobile App
**Status**: 🟢 Active | 🟡 Paused | ✅ Complete
**Created**: YYYY-MM-DD | **Updated**: YYYY-MM-DD

## Purpose
[1-2 sentences: what clinical/business problem does this solve?]

## Tech Stack
| Layer | Technology |
|-------|-----------|
| Backend | |
| Frontend | |
| ML/Data | |
| Database | |
| Auth | |

## Clinical/Scientific Context
- **Biomarkers**:
- **Assay type**: qPCR | OpenArray | RNA-seq | Immunoassay | Other
- **Patient population**:
- **Regulatory**: HIPAA | CLIA | CAP | FDA | cGMP | None

## Key Features
- [ ] Feature 1
- [ ] Feature 2

## Security Requirements
- Auth method:
- Data sensitivity: PHI | De-identified | Public
- Access control: RBAC | Single-user | Public

## Validation Requirements (if diagnostic/assay)
- [ ] Analytical validation (CV%, LOD, LOQ, linearity)
- [ ] Clinical validation (sensitivity, specificity, AUC)
- [ ] Regulatory filing: None | CLIA | 510(k) | De Novo

## Progress Log
| Date | Update |
|------|--------|
| YYYY-MM-DD | Project created |
```

## PROJECTS_REGISTRY.md Entry Format
```
| ProjectName | Type | Status | Stack | Description |
```

## Project Types Quick Reference
| Type | Default Stack |
|------|--------------|
| Diagnostic Platform | FastAPI + React/Next.js + PostgreSQL + JWT |
| ML Model | Python + scikit-learn/PyTorch + MLflow + Streamlit |
| qPCR/Bio Analysis | R + Python + Jupyter + Pandas |
| Scientific Mobile App | React Native + FastAPI + SQLite |
| Web App | Next.js + Tailwind + Neon/Supabase + Clerk |
| Business Tool | Next.js + shadcn/ui + Stripe + Neon |
