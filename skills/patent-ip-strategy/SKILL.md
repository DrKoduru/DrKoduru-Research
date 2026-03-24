---
name: patent-ip-strategy
description: Use when drafting provisional patent applications for diagnostic assays, biomarker panels, or medical devices — claims structure, patent vs trade secret decisions, freedom-to-operate analysis, IP landscape assessment for grants (SBIR commercialization), or protecting intellectual property in translational cancer research and molecular diagnostics
---

# Patent & IP Strategy — Diagnostic Assays & Biomarker Panels

## Patent vs Trade Secret Decision

| Factor | Patent | Trade Secret |
|--------|--------|-------------|
| Protection duration | 20 years from filing | Unlimited (as long as secret) |
| Disclosure required | Yes (full enablement) | No |
| Reverse-engineerable? | Doesn't matter (protected) | Fatal if reverse-engineered |
| Licensing revenue | Yes (can license to others) | Limited (must keep secret) |
| Cost | $15K–$50K+ (prosecution) | Low (just NDAs + access control) |
| Enforcement | Litigation (expensive, public) | Difficult to prove misappropriation |
| **Best for** | Biomarker panels, assay methods, devices | Algorithms, scoring models, proprietary databases |

**For diagnostic assays:** Patent the biomarker panel composition and method of use. Keep the exact algorithm/cutoff scoring as trade secret. This dual strategy is common in IVD.

## Provisional Patent Application Structure

```
A provisional patent application establishes a priority date (12 months to file full utility patent).
Cost: $1,700–$3,000 (filing fee + minimal attorney review).
No claims required, but include them for clarity.

Sections:
1. Title
   "[Method/Composition/System] for [Clinical Application] Using [Technology]"
   Example: "Method for Early Detection of Colorectal Cancer Using a Circulating
   MicroRNA Panel in Plasma Samples"

2. Field of the Invention
   One paragraph: technical field + clinical context

3. Background
   - Current diagnostic limitations (cite clinical need)
   - Prior art summary (existing assays + their shortcomings)
   - Problem statement (what gap this invention fills)

4. Summary of the Invention
   - Brief description of what the invention is
   - Key advantages over prior art
   - Outline of claims

5. Detailed Description
   - Biomarker panel composition (gene/miRNA names, sequences if novel)
   - Specimen type and collection method
   - Assay methodology (qPCR, sequencing, immunoassay)
   - Data analysis method (algorithm overview — keep specifics vague if trade secret)
   - Validation data (at least one cohort: n, AUC, sensitivity, specificity)
   - Examples: 2-3 worked examples with real or representative data

6. Claims (Draft)
   See Claims Structure section below

7. Figures
   - ROC curve(s)
   - Workflow diagram
   - Biomarker selection flowchart
   - Representative data (e.g., expression heatmap)

8. Abstract (150 words max)
```

## Claims Structure for Diagnostic Assays

### Independent Claims (broad — these define scope)
```
Claim 1 (Method claim):
"A method for detecting [disease] in a subject, comprising:
  (a) obtaining a biological sample from the subject;
  (b) measuring expression levels of [biomarker 1], [biomarker 2], and [biomarker 3]
      in the sample;
  (c) applying a classification algorithm to the expression levels; and
  (d) determining the presence or absence of [disease] based on the output of
      the classification algorithm."

Claim 2 (Composition/kit claim):
"A kit for detecting [disease], comprising:
  (a) reagents for measuring expression levels of [biomarker 1], [biomarker 2],
      and [biomarker 3]; and
  (b) instructions for use in determining the presence or absence of [disease]."

Claim 3 (System claim):
"A system for [disease] detection, comprising:
  (a) an assay platform configured to measure [biomarkers];
  (b) a processor executing a classification algorithm; and
  (c) an output module providing a diagnostic result."
```

### Dependent Claims (narrow — add specificity)
```
Claim 4: "The method of claim 1, wherein the biological sample is plasma."
Claim 5: "The method of claim 1, wherein measuring comprises quantitative PCR."
Claim 6: "The method of claim 1, wherein the classification algorithm is a
          machine learning model selected from [XGBoost, Random Forest, Logistic Regression]."
Claim 7: "The method of claim 1, wherein the method achieves a sensitivity of
          at least 85% and a specificity of at least 75%."
Claim 8: "The method of claim 1, further comprising measuring a reference gene
          selected from [GAPDH, ACTB, miR-16-5p]."
```

### Claims Strategy Tips
```
- File broadest possible independent claims (specimen type: "biological sample" not "plasma")
- Narrow in dependent claims (plasma, serum, urine — each adds a fallback position)
- Include method, composition, and system claims (triple coverage)
- Performance claims (AUC > 0.85) limit scope — use only in dependent claims
- Name specific biomarkers by standard identifiers (miRBase ID, HGNC symbol)
- Include "at least N biomarkers from [list]" language for panel flexibility
```

## Freedom-to-Operate (FTO) Analysis

### Search Strategy
```
1. Patent databases to search:
   - Google Patents (free, broadest coverage)
   - USPTO PAIR (US patents, application status)
   - Espacenet (European patents)
   - WIPO PatentScope (international PCT applications)

2. Search terms:
   - Biomarker names (miR-21, CEA, etc.) + "detection" or "diagnosis"
   - Disease + specimen type + technology
   - Competitor company names

3. Key fields to review per patent:
   - Claims (only claims define legal scope — not abstract or description)
   - Filing date and priority date
   - Status: active, expired, abandoned, pending
   - Assignee (company/university)
   - Prosecution history (narrowing amendments reduce scope)

4. Document findings in FTO matrix:
   | Patent # | Assignee | Key Claims | Overlap with Our Assay | Risk Level | Notes |
```

### Risk Assessment
| Risk Level | Meaning | Action |
|-----------|---------|--------|
| Low | No overlapping claims, or claims clearly different in scope | Proceed |
| Medium | Some claim language overlap, but differences in method/biomarkers | Seek opinion of counsel |
| High | Direct claim coverage of your biomarker + method + specimen | Design around, license, or challenge validity |

## IP Landscape for Grant Applications

### SBIR/STTR Commercialization Section
```
Required IP content in SBIR commercialization plan:
1. IP Status: provisional patent filed (include application #), pending, or planned
2. Freedom-to-operate: brief FTO summary showing no blocking patents
3. IP Strategy: patent timeline (provisional → utility → PCT → national phase)
4. Licensing plan: exclusive vs non-exclusive, target licensees
5. Competitive advantage: what your IP protects that competitors cannot replicate
```

### Patent Timeline for Diagnostic Assays
```
Month 0:   File provisional patent (priority date established)
Month 6:   File additional provisional if new data/biomarkers added
Month 12:  Convert to full utility patent (or file new provisional — resets 12-mo clock)
Month 12:  File PCT (Patent Cooperation Treaty) for international protection
Month 18:  PCT published (now public — trade secrets must be filed before this)
Month 30:  National phase entry (US, EU, JP, CN — choose markets)
Month 36+: Patent prosecution (office actions, amendments, allowance)
Year 3-5:  Patent granted
```

## Key Considerations for Diagnostic Patents

```
Mayo/Alice concerns (35 USC § 101 — patent eligibility):
- Natural phenomena (biomarker levels) are not patentable alone
- Must claim a specific practical application: method of detection + clinical action
- Include concrete steps: "obtaining", "measuring", "applying [algorithm]", "determining"
- Adding specific technology (qPCR, specific primers) strengthens eligibility
- Cite Vanda Pharmaceuticals v. West-Ward (method of treatment with diagnostic step = eligible)

Enablement (35 USC § 112):
- Include enough detail that a skilled person could reproduce the assay
- Validation data (AUC, sens/spec) from at least one cohort
- Reference gene normalization method
- Classification threshold or algorithm description
```

Cross-reference: `DrKoduru-Research:regulatory-submissions` for LDT vs IVD IP implications and FDA pathway.
Cross-reference: `DrKoduru-Research:scientific-writing` for SBIR/STTR commercialization section in grants.
