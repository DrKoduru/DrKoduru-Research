---
name: scientific-writing
description: Use when writing scientific manuscripts, grant applications (NIH R01/R21, SBIR/STTR, NSF, DoD CDMRP), conference abstracts (ASCO, AACR, CAP, AMP), figure legends, or statistical reporting for biomedical and diagnostics papers — enforces expert academic voice and AI detection avoidance
---

# Scientific Writing — Biomedical & Diagnostics

## Writing Voice (MANDATORY)

All scientific text must read as written by an experienced university professor — direct, precise, authoritative. Never hedge when data supports a claim. Never use filler transitions.

**Core rules:**
- NEVER use: "it is important to note", "furthermore", "moreover", "delve into", "landscape", "multifaceted", "leverage", "utilize", "facilitate", "underscore", "notably", "in conclusion"
- Use "we" for methods ("We extracted RNA..."), active voice by default
- Quantify precisely: "3.2-fold increase (p = 0.001)" not "significant increase"
- Vary sentence length and paragraph length — uniform = AI-detectable
- No formulaic paragraph openings or symmetric section structure

**Full humanizer reference with banned phrases, before/after examples, and structural anti-patterns:** see `references/humanizer-rules.md`

## MIQE Checklist (qPCR Manuscripts)

```
Required MIQE items — reviewers reject without these:
- [ ] Sample: tissue/fluid type, collection protocol, storage conditions
- [ ] Nucleic acid: extraction method, quality (A260/A280, RIN), quantity
- [ ] Reverse transcription: enzyme, priming method, temperature/time
- [ ] Target: gene symbol, accession number, amplicon length, exon spanning
- [ ] Primers: sequences (5'→3'), concentration, specificity validation
- [ ] qPCR: instrument, cycling conditions, reaction volume, master mix
- [ ] Reference genes: number used (≥2), validation method (geNorm/NormFinder/BestKeeper)
- [ ] Data analysis: Cq determination method, normalization strategy (ΔΔCq or standard curve)
- [ ] Controls: no-template (NTC), no-RT, positive control
```

## IMRAD — Biomedical/Diagnostic Paper

| Section | Must Include | Biomedical Specifics |
|---------|-------------|---------------------|
| Introduction | Unmet clinical need, prevalence, current dx limitations | State the gap: what existing assays miss |
| Methods | Study design, cohort, assay protocol, statistical plan | MIQE for qPCR · STARD for dx accuracy · discovery vs validation split |
| Results | Primary endpoint first, then secondary | AUC (95% CI) first · sensitivity/specificity at clinical cutoff · SHAP summary |
| Discussion | Clinical utility (not just statistical significance) | Head-to-head vs existing assays · limitations: sample size, single-center, retrospective bias |

Cross-reference: `DrKoduru-Research:bioml-pipeline` for AUC/CI code (Phase 4) and SHAP (Phase 5)

## NIH Grant Structure (R01 / R21)

| Section | Limit | Key Content |
|---------|-------|-------------|
| Specific Aims | 1 page | 3 aims max · each: hypothesis → approach → expected outcome · opening paragraph = clinical problem + significance |
| Significance | ~2 pages | Burden of disease · gap in knowledge · how this changes clinical practice |
| Innovation | ~1 page | New method, concept, or application · frame around diagnostic unmet need |
| Approach | ~8 pages (R01) | Preliminary data (required R01) · experimental design per aim · statistical plan with power analysis · pitfalls + alternatives |
| Biosketch | 5 pages | Personal statement ties to this project · 5 key publications per position |

R21: exploratory, no preliminary data required, 2 years max, $275K direct costs.

## Grant Funder Comparison

| Factor | NIH (SBIR/STTR) | NSF SBIR | DoD CDMRP (PRCRP/BCRP) |
|--------|-----------------|----------|------------------------|
| Phase I budget | $275K / 6-12 mo | $275K / 6-12 mo | $150K-$600K / 1-2 yr |
| Phase II budget | $1M / 2 yr | $1M / 2 yr | $1M-$2M / 2-3 yr |
| Review focus | Scientific merit + clinical impact | Technical innovation + commercial potential | Military relevance + clinical impact |
| Cancer dx relevance | High (NCI, NIDCR) | Moderate (biotech platform) | High (PRCRP, BCRP, LCRP) |
| Commercialization plan | Required | Required + detailed market analysis | Not required but strengthens |
| STTR option | Yes (requires academic partner) | Yes | No (intramural or extramural only) |

Cross-reference: `DrKoduru-Research:regulatory-submissions` for pathway decisions in commercialization plans

## Conference Abstracts

| Conference | Limit | Structure | Key Requirement |
|------------|-------|-----------|-----------------|
| ASCO | 2500 char | Background / Methods / Results / Conclusions | Clinical relevance statement required |
| AACR | 2500 char | Background / Methods / Results / Conclusions | Translational angle emphasized |
| CAP | 300 words | Structured | Lab validation focus, analytical performance |
| AMP | 250 words | Structured | Molecular method detail, clinical correlation |

Lead Results with the primary endpoint number (AUC, sensitivity, p-value) — never bury it.

## Statistical Reporting

```
Reporting format — always follow:
- p-values: exact (p = 0.003), not thresholds (p < 0.05). Three decimals.
- Pair with CI: "AUC = 0.92 (95% CI: 0.87–0.96)"
- Effect sizes: OR for case-control, HR for survival, Cohen's d for continuous
- Sample sizes: report n per group, not just total N
- Multiple comparisons: state correction method (Bonferroni, FDR/BH)
```

| Study Type | Use Checklist |
|------------|--------------|
| Diagnostic accuracy | STARD |
| Randomized trial | CONSORT |
| Observational | STROBE |
| Systematic review | PRISMA |
| qPCR experiments | MIQE |

## Figure Legends

```
Figure N. [One-sentence description of what the figure shows].
(A) [Panel description]. (B) [Panel description].
Method: [brief method used to generate figure].
n = [per group]. Error bars = [SD / SEM / 95% CI].
Statistical test: [test name], p = [value] or adjusted p = [value].
Abbreviations: [expand all non-standard abbreviations].
```

ROC plots must state: AUC, 95% CI, n per class, and the cutoff shown (Youden's J or predefined sensitivity).
