# DrKoduru-Research — Claude Code Plugin for Cancer Biology & Diagnostics

> **AI/ML brain for Senior Research Scientists** in cancer biomarker development,
> bioinformatics, diagnostic platform engineering, and clinical research.

**Author:** [Dr. Srinivas V Koduru, PhD, AI/ML](https://www.DrKoduru.com)
**Website:** [www.DrKoduru.com](https://www.DrKoduru.com)

---

## Who This Is For

- Cancer biologists working with **qPCR, OpenArray, liquid biopsy, ctDNA**
- Bioinformaticians doing **mRNA/small RNA/gene expression** analysis
- Researchers building **CLIA/CAP/FDA-compliant diagnostic tools**
- Scientists developing **IVD assays** with regulatory strategy
- **Scientific web & mobile app developers** in clinical research
- AI/ML engineers building **clinical prediction models**

---

## Install

```bash
/plugin install github:sreenivaskoduru/DrKoduru-Research
```

Or manually place the folder in:
```
~/.claude/plugins/marketplaces/local-desktop-app-uploads/DrKoduru-Research/
```
Then add to `~/.claude/settings.json`:
```json
"DrKoduru-Research@local-desktop-app-uploads": true
```

---

## Skills (15 Included)

| Skill | Invoke | Purpose |
|-------|--------|---------|
| **identity** | `DrKoduru-Research:identity` | Loads full cancer biology + bioinformatics + AI/ML expertise context |
| **project-tracker** | `DrKoduru-Research:project-tracker` | Creates `PROJECT_BRIEF.md` + registers project in portfolio |
| **bioml-pipeline** | `DrKoduru-Research:bioml-pipeline` | End-to-end cancer diagnostics ML: qPCR · OpenArray · small RNA · AUC · SHAP |
| **r-bioinformatics** | `DrKoduru-Research:r-bioinformatics` | DESeq2 · limma · edgeR · Seurat · Harmony · clusterProfiler · GSEA · survival |
| **biostats-advanced** | `DrKoduru-Research:biostats-advanced` | Mixed models · meta-analysis · Bayesian · competing risks · propensity scores · NRI/IDI |
| **data-viz-publication** | `DrKoduru-Research:data-viz-publication` | Journal-quality figures: volcano · heatmap · ROC · KM · forest · UMAP · multi-panel |
| **literature-intelligence** | `DrKoduru-Research:literature-intelligence` | PubMed search strategy · systematic review · PRISMA · citation analysis · evidence tables |
| **clinical-study-design** | `DrKoduru-Research:clinical-study-design` | Sample size · power analysis · STARD/CONSORT/STROBE · IRB · biospecimen SOPs |
| **scientific-writing** | `DrKoduru-Research:scientific-writing` | MIQE · IMRAD · NIH/NSF/DoD grants · conference abstracts · expert voice humanizer |
| **regulatory-submissions** | `DrKoduru-Research:regulatory-submissions` | FDA 510(k) · De Novo · CLIA validation reports · LDT vs IVD · CAP · CRO |
| **patent-ip-strategy** | `DrKoduru-Research:patent-ip-strategy` | Provisional patents · claims structure · FTO analysis · IP landscape · Mayo/Alice |
| **poster-presentation** | `DrKoduru-Research:poster-presentation` | Scientific posters · conference talks · graphical abstracts · 3-min pitch structure |
| **lab-automation** | `DrKoduru-Research:lab-automation` | OpenTrons · liquid handlers · plate layouts · barcode tracking · LIMS · serial dilutions |
| **secure-webapp** | `DrKoduru-Research:secure-webapp` | Security-first web/mobile/API patterns with HIPAA · CLIA · RBAC |
| **update-knowledge** | `DrKoduru-Research:update-knowledge` | Captures session discoveries to persistent `KNOWLEDGE_BASE.md` |

---

## Feature Highlights

### 🧬 Biomarker Science
- mRNA / small RNA biomarker panels (liquid biopsy)
- qPCR reference gene validation (geNorm/NormFinder, CV thresholds)
- OpenArray data parsing, QC flagging, ComBat batch correction
- Hemolysis detection (miR-23a/miR-451 ratio)

### 🔬 R/Bioconductor Bioinformatics
- Differential expression: DESeq2, limma-voom, edgeR with decision matrix
- Single-cell RNA-seq: Seurat + Harmony integration, QC thresholds
- Pathway enrichment: clusterProfiler (ORA + GSEA), fgsea (MSigDB hallmark)
- Survival analysis: Cox PH, Kaplan-Meier, optimal cutpoint selection
- Gene ID conversion, ComBat batch correction, Bioconductor patterns

### 📊 Publication-Quality Data Visualization
- Journal specs: 300 DPI TIFF, column widths, font requirements
- Color-blind safe palettes (Okabe-Ito, viridis) for all figures
- Plot templates: volcano, heatmap, ROC, Kaplan-Meier, forest, UMAP, violin
- Multi-panel composition (patchwork in R, subplot in Python)
- Export checklist: resolution, fonts, labels, statistics, panel letters

### 📖 Literature Intelligence
- PubMed search strategy with PICO framework and MeSH + free text mapping
- Systematic review workflow: PROSPERO registration through PRISMA flow
- Citation network analysis: forward/backward tracking, gap identification
- Evidence tables and narrative synthesis for grants and manuscripts
- Risk of bias tools: QUADAS-2, RoB 2, ROBINS-I, Newcastle-Ottawa

### 🧪 Lab Automation
- OpenTrons OT-2/Flex protocol development with validation checklist
- 96/384-well plate layout generation with controls and randomization
- Barcode/sample tracking database schema and LIMS integration
- Pipetting worklists (Hamilton/Tecan GWL format)
- Serial dilution automation and dead volume calculations

### 📐 Advanced Biostatistics
- Mixed-effects models (lme4/lmerTest): longitudinal, multi-site, nested designs
- Meta-analysis: forest plots, funnel plots, SROC, heterogeneity, publication bias
- Bayesian diagnostics: informative priors, credible intervals, latent class models
- Competing risks, propensity score matching, mediation analysis
- NRI, IDI, decision curve analysis, partial AUC, calibration

### 📋 Clinical Study Design
- Study type selection matrix (diagnostic accuracy, case-control, cohort, RCT)
- Sample size / power analysis (R pwr package, G*Power reference)
- Reporting checklists: STARD, CONSORT, STROBE, REMARK, TRIPOD
- IRB protocol template structure
- Biospecimen collection SOPs and pre-analytical variable documentation
- Bias control checklist for diagnostic studies

### 🤖 AI/ML Diagnostics
- XGBoost, LightGBM, Elastic Net for clinical classification
- Survival analysis (Cox PH + Random Survival Forest)
- Bootstrap AUC with 95% CI, DeLong test, Youden's J cutoff
- SHAP explainability (mandatory for clinical/regulatory)

### 📝 Scientific Writing & Grants
- MIQE-compliant qPCR manuscript preparation
- IMRAD structure with biomedical/diagnostics specifics
- NIH R01/R21, SBIR/STTR, NSF SBIR, DoD CDMRP grant guidance
- Conference abstracts: ASCO, AACR, CAP, AMP formats
- **Anti-AI detection humanizer**: expert professor voice, banned AI phrases, before/after examples

### 🧾 Patent & IP Strategy
- Provisional patent application structure for diagnostic assays
- Claims drafting: method, composition, system claims for biomarker panels
- Patent vs trade secret decision matrix
- Freedom-to-operate (FTO) analysis and risk assessment
- Mayo/Alice patent eligibility for diagnostic methods
- IP landscape section for SBIR commercialization plans

### 🎨 Poster & Presentation Design
- Scientific poster layouts (48x36, A0) with typography rules
- 3-minute poster pitch structure for conference walk judges
- Conference talk slide deck (10-15 slides) with timing guide
- Graphical abstract specifications and tool recommendations
- Export and printing checklist for all conference formats

### 🏛️ Regulatory & Assay Validation
- FDA 510(k) / De Novo pathway decision tree with clinical examples
- Complete 510(k) submission checklist (18+ sections)
- CLIA validation report structure + CAP compliance categories
- LDT vs IVD pathway comparison (cost, timeline, IP, reimbursement)
- Precision (CV%), LOD, LOQ, linearity, interference, stability
- CRO partnership contract essentials
- cGMP · ISO7 · gCLP compliance patterns

### 🔒 Secure Scientific Software
- FastAPI + Next.js with JWT/RBAC
- HIPAA-compliant PHI handling + audit logging
- Scientific mobile apps (React Native + offline-first)
- CLIA traceability: operator + instrument + lot + date

### 📚 Living Knowledge Base
- Session learnings auto-captured to `KNOWLEDGE_BASE.md`
- Stop hook appends session markers to `LEARNINGS.md`
- 12-project registry with status tracking

---

## Requirements

- [Claude Code](https://claude.ai/claude-code) CLI
- Node.js (for session-marker hook)

---

## About the Author

**Dr. Srinivas V Koduru, PhD, AI/ML** is a Senior Research Scientist specializing in cancer biomarker discovery and validation, liquid biopsy diagnostics, bioinformatics, and AI/ML-powered clinical prediction platforms.

🌐 [www.DrKoduru.com](https://www.DrKoduru.com)

---

## License

MIT — free to use, modify, and share.

---

## Contributing

PRs welcome — especially additional skills for:
- Multi-omics integration (MOFA, mixOmics, WGCNA, network analysis)
- Clinical trial data management (REDCap, CDISC/SDTM, eCRF design)
- Science communication (lay summaries, press releases, social media for researchers)
