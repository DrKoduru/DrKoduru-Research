---
name: literature-intelligence
description: Use when performing literature searches, systematic reviews, citation analysis, research gap identification, PubMed queries, building evidence tables, PRISMA flow diagrams, or preparing background sections for grants and manuscripts in biomedical research
---

# Literature Intelligence — Systematic Search & Evidence Synthesis

## PubMed Search Strategy

### Building Effective Queries
```
Step 1: Define PICO(TS) framework
  P = Population (e.g., "colorectal cancer patients")
  I = Intervention/Index test (e.g., "circulating miRNA panel")
  C = Comparator (e.g., "colonoscopy" or "CEA")
  O = Outcome (e.g., "early detection sensitivity")
  T = Time frame (optional)
  S = Study type (optional)

Step 2: Map to MeSH + free text
  Population:  "Colorectal Neoplasms"[MeSH] OR "colorectal cancer"[tiab]
  Index test:  "MicroRNAs"[MeSH] OR "circulating miRNA"[tiab] OR "liquid biopsy"[tiab]
  Outcome:     "Early Detection of Cancer"[MeSH] OR "sensitivity"[tiab] OR "AUC"[tiab]

Step 3: Combine with Boolean
  (#1 AND #2 AND #3) AND ("humans"[MeSH] AND English[lang])

Step 4: Apply filters
  Date range, article type (Clinical Trial, Review, Meta-Analysis)
```

### PubMed Field Tags (Quick Reference)
| Tag | Field | Example |
|-----|-------|---------|
| [tiab] | Title/Abstract | "liquid biopsy"[tiab] |
| [MeSH] | MeSH heading | "Biomarkers, Tumor"[MeSH] |
| [au] | Author | "Koduru SV"[au] |
| [dp] | Date published | "2020/01/01:2025/12/31"[dp] |
| [pt] | Publication type | "Meta-Analysis"[pt] |
| [jour] | Journal | "Clinical Chemistry"[jour] |

### Using the PubMed MCP Tools
```
Available tools (if PubMed MCP connected):
- search_articles: query with PubMed syntax, date filters, pagination
- get_article_metadata: fetch full metadata by PMID (title, authors, abstract, DOI)
- get_full_text_article: retrieve full text from PMC by PMCID
- find_related_articles: find similar papers by PMID
- convert_article_ids: convert between PMID, PMCID, DOI
- lookup_article_by_citation: find PMID from journal/year/page
```

## Systematic Review Workflow

### Phase 1: Protocol Registration
```
- [ ] Register protocol on PROSPERO (CRD number) before starting searches
- [ ] Define inclusion/exclusion criteria a priori
- [ ] Specify primary and secondary outcomes
- [ ] Name at least 2 independent reviewers for screening
- [ ] Pre-specify data extraction fields
```

### Phase 2: Search Execution
```
Search at least 3 databases:
1. PubMed/MEDLINE (biomedical core)
2. Embase (European + pharmaceutical coverage)
3. Cochrane Library (systematic reviews + trials)
Optional: Web of Science (citation tracking), Scopus, CINAHL

Additional sources:
- ClinicalTrials.gov (ongoing/unpublished studies)
- Conference abstracts (ASCO, AACR proceedings)
- Reference lists of included studies (snowballing)
- Google Scholar (grey literature — use sparingly)
```

### Phase 3: Screening (PRISMA Flow)
```
PRISMA 2020 Flow Diagram:

Records identified (n = ___):
  Database 1 (n = ___)
  Database 2 (n = ___)
  Database 3 (n = ___)
       ↓
Duplicates removed (n = ___)
       ↓
Records screened (n = ___)  →  Excluded (n = ___)
       ↓
Reports sought for retrieval (n = ___)  →  Not retrieved (n = ___, reasons)
       ↓
Reports assessed for eligibility (n = ___)  →  Excluded (n = ___):
                                                 - Wrong population (n = ___)
                                                 - Wrong intervention (n = ___)
                                                 - Wrong outcome (n = ___)
                                                 - Wrong study design (n = ___)
       ↓
Studies included in review (n = ___)
  Included in meta-analysis (n = ___)
```

### Phase 4: Data Extraction Template
| Field | Extract |
|-------|---------|
| Study ID | First author, year, journal |
| Design | Prospective/retrospective, single/multi-center |
| Population | n, age, sex, disease stage, ethnicity |
| Index test | Biomarker(s), platform, specimen type |
| Reference standard | Gold standard test used |
| Results | Sensitivity, specificity, AUC (95% CI) |
| Quality | QUADAS-2 risk of bias domains |

### Phase 5: Risk of Bias Assessment
| Tool | For Study Type |
|------|---------------|
| QUADAS-2 | Diagnostic accuracy studies |
| RoB 2 | Randomized trials |
| ROBINS-I | Non-randomized interventions |
| Newcastle-Ottawa | Observational (cohort, case-control) |
| JBI Checklist | Prevalence, qualitative, case reports |

## Citation Network Analysis

### Forward/Backward Tracking
```
Starting from a key paper (seed):
  Backward: examine reference list → find foundational work
  Forward:  "cited by" search (Google Scholar, Web of Science) → find recent developments

Build citation matrix:
  Seed paper → 10-15 most-cited references → 5-10 most-citing recent papers
  Identify: citation clusters, methodological lineage, competing approaches
```

### Identifying Research Gaps
```
Signals of a gap:
1. "Future studies should..." statements in Discussion sections of reviews
2. Absent PICO combinations: population studied but not with your biomarker
3. Small-sample-only evidence: all studies n < 50, no validation cohort
4. Geographic gaps: all studies from one country/institution
5. Missing head-to-head comparisons with current standard of care
6. No prospective validation of retrospective findings

Document gaps as: "No study has evaluated [biomarker X] in [population Y] using [design Z]"
— this becomes your grant Significance section
```

## Evidence Table for Grants/Manuscripts

### Summary of Evidence Table
```markdown
| Author (Year) | Design | N | Population | Biomarker | Sens (%) | Spec (%) | AUC | Notes |
|---------------|--------|---|------------|-----------|----------|----------|-----|-------|
| Smith (2023)  | Retro  | 87| Stage I-II CRC | 5-miRNA | 91 | 78 | 0.89 | Single-center |
| ...           | ...    |...|...         |...        |...       |...       |...  |...    |
```

### Narrative Synthesis Pattern
```
For grant Background/Significance:
1. State the clinical problem + burden (cite epidemiology)
2. Describe current diagnostic standard + its limitations (cite guidelines)
3. Present evidence for your approach, organized by study quality:
   - Meta-analyses/systematic reviews first
   - Prospective validation studies
   - Retrospective discovery studies
4. Identify the gap your study fills (cite the absence)
5. State your hypothesis
```

## Search Documentation (for reproducibility)

```
Always document and save:
- [ ] Full search strategy per database (exact query strings)
- [ ] Date of search execution
- [ ] Number of results per database
- [ ] Screening decisions with reasons for exclusion
- [ ] Software used (Covidence, Rayyan, EndNote)
- [ ] PRISMA checklist (completed, for submission)
```

Cross-reference: `DrKoduru-Research:scientific-writing` for PRISMA checklist reporting and narrative synthesis in manuscripts.
Cross-reference: `DrKoduru-Research:clinical-study-design` for QUADAS-2 and study design assessment.
