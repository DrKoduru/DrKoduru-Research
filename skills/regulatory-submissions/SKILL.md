---
name: regulatory-submissions
description: Use when preparing FDA submissions (510(k), De Novo), CLIA validation reports, CAP compliance documents, or making regulatory pathway decisions for diagnostic assays including LDT vs IVD
---

# Regulatory Submissions — Diagnostic Assay Pathways

## FDA Pathway Decision Tree

| Question | If Yes | If No |
|----------|--------|-------|
| Substantially equivalent predicate device exists? | 510(k) | De Novo |
| Novel biomarker or novel intended use with no predicate? | De Novo | 510(k) |
| Companion diagnostic (CDx) tied to a specific drug? | PMA or 510(k) with drug sponsor | Standard pathway |
| Single CLIA-certified lab, no commercial distribution? | LDT (CLIA/CAP only) | IVD (FDA clearance required) |

**Clinical examples:**

| Assay Type | Likely Pathway | Rationale |
|------------|---------------|-----------|
| UTI bacterial panel (PCR) | 510(k) | Predicates exist (BioFire, GenMark) |
| Novel cancer RNA signature (plasma) | De Novo | No predicate for this biomarker panel |
| CDx for checkpoint inhibitor | PMA or 510(k) with pharma co-development | FDA requires CDx label to match drug label |
| In-house qPCR panel (single lab) | LDT under CLIA | No distribution — validate under CLIA/CAP |
| Multi-cancer early detection (MCED) | De Novo or PMA | Novel category — FDA guidance evolving |

## 510(k) Submission Checklist

```
- [ ] Cover Letter (FDA Form 3514)
- [ ] CDRH Premarket Review Cover Sheet (FDA Form 3601)
- [ ] Indications for Use Statement (FDA Form 3881)
- [ ] 510(k) Summary or 510(k) Statement
- [ ] Truthful and Accuracy Statement
- [ ] Class III Summary and Certification (if applicable)
- [ ] Financial Certification / Disclosure (FDA Forms 3454 / 3455)
- [ ] Declarations of Conformity and Summary Reports (recognized standards)
- [ ] Device Description (technology, design, reagents, specimen types)
- [ ] Predicate Comparison Table (side-by-side: intended use, technology, performance)
- [ ] Substantial Equivalence Discussion
- [ ] Proposed Labeling (IFU, package insert, warnings)
- [ ] Sterilization and Shelf Life Data (if applicable)
- [ ] Biocompatibility (if applicable — ISO 10993)
- [ ] Software Documentation (IEC 62304 level, cybersecurity if connected)
- [ ] EMC / Electrical Safety (IEC 61010, if instrument)
- [ ] Performance Testing — Analytical Validation
- [ ] Performance Testing — Clinical Validation
- [ ] Bibliography
```

Analytical and clinical validation formulas (LOD, LOQ, CV%, AUC, sensitivity/specificity): see `DrKoduru-Research:bioml-pipeline` Assay Validation Framework

## De Novo Classification Request

Key sections beyond 510(k):
- Proposed device classification (Class I or Class II) with rationale
- Proposed product code and regulation number
- Risk analysis and mitigation (FMEA — Failure Mode and Effects Analysis)
- Proposed special controls (performance standards, labeling, post-market surveillance)
- Performance data: same analytical + clinical validation as 510(k)
- Classification rationale: why general/special controls are sufficient

Timeline: 12–18 months typical. Budget: $150K–$500K+ for regulatory consulting. Consider Pre-Sub (Q-Sub) meeting with FDA before filing.

## LDT vs IVD Pathway

| Factor | LDT | IVD (FDA Cleared/Approved) |
|--------|-----|---------------------------|
| Regulatory oversight | CLIA / CAP only | FDA 510(k), De Novo, or PMA |
| Distribution | Single lab only | Commercial kit, any lab |
| Development timeline | 3–6 months validation | 1–3 years (510(k)) to 3–5 years (PMA) |
| Estimated cost | $50K–$200K (validation) | $500K–$2M+ (full FDA pathway) |
| IP protection | Trade secret | Patent + FDA exclusivity period |
| Reimbursement | Harder (no FDA clearance) | Easier (CPT code + FDA backing) |
| Scalability | Limited (your lab only) | Unlimited (licensed to other labs) |

Note: FDA is increasing LDT oversight. Check current VALID Act / LHCA status before committing to LDT-only strategy.

## CLIA Validation Report Structure

```
1.  Assay Overview — name, intended use, methodology, specimen type, instrument
2.  Validation Protocol — study design, sample selection criteria, acceptance criteria
3.  Accuracy — method comparison or recovery study (reference method stated)
4.  Precision — within-run, between-run, between-day (acceptance: CV < 15%)
5.  Analytical Sensitivity — LOD protocol: 20 replicates at low concentration
6.  Analytical Specificity — interference panel (H/L/I) + cross-reactivity
7.  Reportable Range / Linearity — 5+ concentrations, R² > 0.99
8.  Reference Range — verification (n ≥ 20) or establishment (n ≥ 120) if novel analyte
9.  Specimen Stability — conditions tested + time points (RT, 4°C, -20°C, -80°C, freeze-thaw)
10. Summary & Conclusions — pass/fail per acceptance criteria, clinical sign-off
```

Formulas for LOD, LOQ, CV%, linearity R², interference testing: see `DrKoduru-Research:bioml-pipeline` Assay Validation Framework

## CAP Checklist Compliance Categories

| Category | Key Requirements |
|----------|-----------------|
| General | Laboratory director qualifications, QA/QI program, document control |
| Analytical | Method validation, calibration verification, QC frequency + rules |
| Pre-analytical | Specimen collection manual, transport conditions, rejection criteria |
| Post-analytical | Result reporting format, critical value notification, turnaround time |
| Personnel | Competency assessment (6 elements), annual continuing education |

## Companion Diagnostics (CDx) — Brief

- Co-develop with pharma sponsor — CDx label must match drug label
- PMA pathway most common for CDx (requires clinical trial data with drug)
- IDE (Investigational Device Exemption) needed if investigational device used in drug trial
- Pre-Sub meeting with FDA early — align on study design, endpoints, predicate strategy
- Examples: PD-L1 IHC for pembrolizumab, BRCA testing for olaparib, MSI for checkpoint inhibitors

## Predicate Device Search

Search FDA 510(k) database (accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm):
- Match by: intended use + technology type + specimen type
- Document 3+ potential predicates with clearance numbers (K-numbers)
- Build side-by-side comparison table: intended use, technology, specimen, performance claims
- Check FDA product classification database for product code and regulation number

## CRO Partnership Essentials

Key contract terms to negotiate:
- **IP ownership**: who owns data, methods, and any improvements developed during study
- **Data rights**: full access to raw data, not just summary reports
- **Timeline milestones**: tied to payment schedule, with penalties for delays
- **Quality agreement**: 21 CFR Part 11 compliance for electronic records, GLP/GCP as applicable
- **Lab requirements**: CLIA-certified lab for clinical validation studies
- Look for: FDA submission experience in your specific device classification, prior Pre-Sub experience
