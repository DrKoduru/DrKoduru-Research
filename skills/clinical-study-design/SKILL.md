---
name: clinical-study-design
description: Use when designing clinical or diagnostic studies — sample size calculation, power analysis, study type selection (case-control, cohort, diagnostic accuracy), CONSORT/STROBE/STARD checklists, IRB protocol structure, or biospecimen collection SOPs for cancer biology and diagnostics research
---

# Clinical Study Design — Diagnostics & Biomarker Research

## Study Type Selection

| Study Type | When to Use | Key Design Feature |
|------------|-------------|-------------------|
| **Diagnostic accuracy** | Evaluating a new test vs reference standard | Prospective enrollment, STARD checklist |
| **Case-control** | Biomarker discovery, rare diseases | Cases + matched controls, selection bias risk |
| **Cohort (prospective)** | Prognosis, screening test validation | Follow-up for outcomes, gold standard |
| **Cohort (retrospective)** | Preliminary data, grant pilot | Banked specimens, faster, weaker evidence |
| **Cross-sectional** | Prevalence, biomarker distribution | Single time point, no causation |
| **RCT** | Treatment or intervention testing | Randomization, CONSORT checklist |

**For diagnostic assay validation:** Start with retrospective case-control (discovery), then prospective diagnostic accuracy study (validation). Two-cohort design is the gold standard for regulatory submissions.

## Sample Size & Power Analysis

### R (pwr package)
```r
library(pwr)
# Two-group comparison (t-test)
pwr.t.test(d = 0.5, sig.level = 0.05, power = 0.80, type = "two.sample")
# d = effect size (Cohen's d): 0.2 small, 0.5 medium, 0.8 large

# Chi-squared / proportion test
pwr.2p.test(h = 0.3, sig.level = 0.05, power = 0.80)
# h = effect size (Cohen's h): use ES.h(p1, p2) to calculate

# Correlation
pwr.r.test(r = 0.3, sig.level = 0.05, power = 0.80)
```

### Diagnostic Study Sample Size
```r
# For target sensitivity/specificity with CI width
# Formula: n = (Z² × p × (1-p)) / w²
# Z = 1.96 (95% CI), p = expected sensitivity, w = CI half-width
n_cases <- function(sens, ci_width) {
  ceiling((1.96^2 * sens * (1 - sens)) / (ci_width/2)^2)
}
n_cases(sens = 0.90, ci_width = 0.10)  # 139 cases needed for 90% sens ± 5%
# Also need matched controls: typically 1:1 or 1:2 ratio
```

### Survival Analysis Sample Size
```r
library(powerSurvEpi)
# Log-rank test
ssizeCT(formula = ~ arm, data = pilot, RR = 0.65,
        alpha = 0.05, power = 0.80, k = 1)
# RR = hazard ratio to detect, k = allocation ratio
```

### G*Power Reference
| Design | Input Needed | G*Power Test Family |
|--------|-------------|-------------------|
| Two-group means | Effect size d, α, power | t-tests → Two-sample |
| AUC comparison | AUC₁, AUC₂, n per group | z-tests → Two proportions |
| Correlation | Expected r, α, power | Exact → Correlation |
| Survival | HR, event rate, accrual | Log-rank → Survival |
| Multiple regression | R², # predictors | F-tests → Linear regression |

**Rule of thumb for ML/biomarker studies:** ≥10 events per predictor variable (EPV rule). For a 5-marker panel: need ≥50 events (e.g., 50 cancer cases minimum).

## Reporting Checklists

| Checklist | Study Type | Key Sections |
|-----------|-----------|--------------|
| **STARD** | Diagnostic accuracy | Flow diagram, 2×2 table, sensitivity/specificity/LR, specimen handling |
| **CONSORT** | RCT | Randomization, blinding, ITT analysis, flow diagram |
| **STROBE** | Observational (cohort, case-control, cross-sectional) | Selection criteria, matching, confounders, missing data |
| **PRISMA** | Systematic review / meta-analysis | Search strategy, PRISMA flow, risk of bias, forest plot |
| **REMARK** | Tumor biomarker prognostic | Specimen characteristics, assay methods, cutoff selection, multivariate model |
| **MIQE** | qPCR experiments | See `DrKoduru-Research:scientific-writing` |
| **TRIPOD** | Prediction model | Development vs validation, calibration, discrimination, net benefit |

Always identify the applicable checklist BEFORE writing the protocol. Journals increasingly require completed checklists at submission.

## IRB Protocol Structure

```
1.  Title and Principal Investigator
2.  Background and Rationale (cite preliminary data)
3.  Study Objectives (primary + secondary aims)
4.  Study Design (type, duration, number of sites)
5.  Study Population
    - Inclusion criteria (disease definition, age, specimen availability)
    - Exclusion criteria (confounders, prior treatment, insufficient sample)
6.  Recruitment and Consent Procedures
7.  Study Procedures (specimen collection, assay protocol, data collection)
8.  Data Management (REDCap recommended, 21 CFR Part 11 if FDA-regulated)
9.  Statistical Analysis Plan
    - Primary endpoint + sample size justification
    - Pre-specified analysis (not post-hoc)
    - Missing data handling (MCAR/MAR/MNAR strategy)
10. Risks and Benefits
11. Privacy and Confidentiality (HIPAA, de-identification plan)
12. Data and Safety Monitoring
13. References
```

**For retrospective studies with banked specimens:** IRB may grant waiver of consent if: (1) de-identified, (2) minimal risk, (3) research impractical otherwise, (4) no impact on subjects' rights.

## Biospecimen Collection SOP Essentials

| Element | Standard |
|---------|----------|
| **Blood draw** | EDTA (plasma) or serum separator tube · process within 2h |
| **Plasma processing** | Centrifuge 1500×g 10 min → aliquot 200–500 μL → -80°C |
| **Serum processing** | Clot 30 min RT → centrifuge 2000×g 10 min → aliquot → -80°C |
| **Tissue** | Snap-freeze in liquid N₂ within 30 min of excision · or RNAlater |
| **Urine** | Centrifuge 3000×g 15 min → aliquot supernatant → -80°C |
| **Labeling** | Unique barcode · date · specimen type · aliquot number |
| **Freeze-thaw** | Document cycles · max 3 for RNA, max 5 for DNA |
| **Chain of custody** | Collector → processor → storage location → retrieval log |

**Pre-analytical variables to document (BRISQ):**
- Time from collection to processing (ischemia time)
- Storage temperature and duration
- Number of freeze-thaw cycles
- Hemolysis index (for plasma/serum — H/L/I)

## Bias Control Checklist

```
- [ ] Selection bias: consecutive enrollment (not convenience sample)
- [ ] Spectrum bias: include early-stage, borderline cases (not just clear-cut)
- [ ] Verification bias: all subjects get reference standard (not just test-positives)
- [ ] Blinding: lab blinded to clinical diagnosis, clinicians blinded to test result
- [ ] Confounders: age, sex, ethnicity matching or adjustment
- [ ] Batch effects: randomize samples across plates/runs
- [ ] Training/test split: NEVER use same samples for discovery and validation
- [ ] Cutoff selection: pre-specify or use independent training set (not validation set)
```

Cross-reference: `DrKoduru-Research:bioml-pipeline` for ML model validation (bootstrap AUC, stratified k-fold).
Cross-reference: `DrKoduru-Research:regulatory-submissions` for CLIA validation report structure and FDA study design requirements.
Cross-reference: `DrKoduru-Research:scientific-writing` for STARD/CONSORT/STROBE reporting format and statistical reporting standards.
