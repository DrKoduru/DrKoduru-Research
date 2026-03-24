---
name: koduru-identity
description: Use when starting any session for Dr. Koduru — loads expertise context as Senior Research Scientist in Cancer Biology, Bioinformatics, and AI/ML diagnostics with active projects in UroDETECT, qPCR, UTI detection, and colorectal cancer screening
---

# Dr. Srinivas V Koduru, PhD, AI/ML — Research Identity & Context

## Expertise Profile
- **Biomarker Science**: Cancer biomarker discovery & validation · mRNA/small RNA biomarkers · liquid biopsy · ctDNA · early cancer detection · precision medicine
- **Assay Development**: qPCR · OpenArray · high-throughput platforms · lab automation · assay validation (analytical + clinical) · CLIA/CAP compliance · cGMP · ISO7 · gCLP
- **Diagnostics & Regulatory**: Diagnostic predictions · IVD assay validation · FDA filing strategies & form preparation · 510(k)/De Novo · CRO partnerships · regulatory submissions
- **Bioinformatics**: Gene expression (DESeq2/limma) · UMAP · survival analysis · pathway enrichment · small RNA-seq · mRNA-seq
- **Software & Apps**: Python · R · JavaScript/TypeScript · FastAPI · Next.js · Streamlit · web apps for scientific use · scientific mobile app development
- **AI/ML**: Diagnostic classifiers · ROC/AUC analysis · feature selection · AutoML · deep learning · clinical prediction models

## Active Projects (see PROJECTS_REGISTRY.md)
UroDETECT · UTI Detection Platform · qPCR Data Extraction App · ColoCheck · NETest · PROSTest · DrKoduruWebsite · Quote&InvoicePro · SocialPulse · OmeletteApps · ScholarSite · STI

## Default Rules (ALWAYS enforce)
1. **Token-first**: Run all computation in-house (Python/R/bash). Online only for docs, packages, external APIs
2. **Project .md**: Any new project → use `DrKoduru-Research:project-tracker` to create PROJECT_BRIEF.md first
3. **Security**: Auth + input validation + RBAC on every web app. No exceptions.
4. **Clinical context**: Every statistical result needs clinical interpretation, not just p-values
5. **Reproducibility**: Always include requirements.txt / environment.yml / package.json
6. **Learning capture**: End of session → use `DrKoduru-Research:update-knowledge` to record discoveries
7. **Regulatory awareness**: Flag when work has FDA/CLIA/CAP implications — assay validation data, IVD claims, 510(k)/De Novo relevance
8. **Assay validation**: Always include CV%, LOD/LOQ, linearity for any new assay or platform comparison

## Working Directory
`C:\Users\sreen\Cloud-Drive\Sync with iDrive\Cloud_Claude_2026\`
- `PROJECTS_REGISTRY.md` — all project index
- `KNOWLEDGE_BASE.md` — accumulated ML/bio/dev patterns
- `LEARNINGS.md` — auto-appended session learning log
