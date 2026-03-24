# Humanizer Rules — Anti-AI Detection for Scientific Writing

## Purpose

Enforce writing that reads as authored by an experienced biomedical research professor. Eliminate all AI-telltale patterns. Every paragraph must pass AI detection tools (GPTZero, Originality.ai, Turnitin) as human-written.

## Banned AI Phrases — Never Use These

Replace with the expert alternative:

| AI Phrase (BANNED) | Expert Alternative |
|-------------------|-------------------|
| "It is important to note that" | State the fact directly |
| "Furthermore" / "Moreover" | Drop it — start the next point directly |
| "In conclusion" | Omit or use "These data indicate..." |
| "Delve into" / "Dive into" | "Examine" or "Characterize" |
| "Landscape" (as metaphor) | Name the specific field or context |
| "Multifaceted" | Name the specific facets |
| "Comprehensive" | "Systematic" or describe scope specifically |
| "Leverage" | "Use" or "Exploit" (bio context) |
| "Utilize" | "Use" — always |
| "Facilitate" | "Enable" or "Allow" or state the mechanism |
| "Underscore" / "Highlight" | "Demonstrate" or "Show" or "Confirm" |
| "Notably" / "Importantly" / "Interestingly" | Delete — let the data speak |
| "Robust" (overused) | "Reproducible" or state the metric |
| "Groundbreaking" / "Revolutionary" | Never use. State what changed. |
| "Shed light on" | "Clarify" or "Explain" |
| "Play a crucial role" | State the specific role directly |
| "A growing body of evidence" | Cite the evidence: "Recent work (Author, Year) shows..." |
| "Taken together" | "Collectively, these results..." or start with the synthesis |
| "In light of" | "Given..." or "Based on..." |
| "It is worth mentioning" | Just mention it |
| "State-of-the-art" | Name the current method |
| "Paradigm shift" | Describe what changed specifically |
| "Pave the way" | "Enable" or describe the next step |

## Voice Principles

### Authority Without Hedging
- Assert when data supports: "The 5-marker panel discriminated early-stage CRC from controls" not "The panel appeared to show some discriminatory ability"
- Hedge only when genuinely uncertain — and be specific: "whether the panel generalizes to Asian populations remains untested" not "more research is needed"
- "More research is needed" is BANNED — always state what specific research is needed

### Specificity Over Generality
- "3.2-fold increase in miR-21 expression (p = 0.001, n = 87)" not "significant increase in miR-21"
- "CV of 4.7% across 20 replicates" not "high reproducibility"
- Name the comparator: "outperformed CEA alone (AUC 0.92 vs 0.71)" not "showed superior performance"

### Expert Vocabulary
- Use field-standard terminology without explanation: "Cq" not "threshold cycle (Ct) values (also known as quantification cycle or Cq)"
- Define novel terms only; assume reviewer expertise in the field
- Jargon is expected in biomedical writing — the sign of AI is *explaining common terms*

### First Person
- Methods: "We extracted..." / "We measured..." — active, first person plural
- Discussion: "Our data suggest..." not "The data presented here suggest..."
- Never use "the authors" to refer to yourself

## Sentence-Level Rules

### Active Voice Default
- "We incubated samples at 37°C for 2 h" not "Samples were incubated at 37°C for 2 h"
- Passive acceptable for established protocols: "RNA was extracted using the miRNeasy kit" (kit is the agent, not the researcher)
- Passive acceptable when the actor is irrelevant: "Patients were recruited from three clinical sites"

### No Empty Intensifiers
Delete: "very", "highly", "extremely", "quite", "really", "significantly" (unless referring to statistical significance)

### No Formulaic Transitions
- Do NOT start consecutive paragraphs with transitional phrases
- Jump directly to the next point — the logical connection should be self-evident from content
- Occasionally: "In contrast," or "Consistent with this," — but not every paragraph

### Sentence Length Variation
- Mix short declarative sentences (8-12 words) with longer complex ones (25-35 words)
- AI writes uniformly medium sentences (15-20 words). Break this pattern.
- Occasional very short sentence for emphasis. "This was unexpected."

### Paragraph Length Variation
- Range: 3-8 sentences per paragraph. NEVER all the same length.
- AI paragraphs are typically 4-5 sentences each, uniformly. Vary deliberately.
- One-sentence paragraphs acceptable for emphasis in Discussion sections

## Before/After Examples

### Methods Section
**AI-style (BAD):**
"Total RNA was extracted from plasma samples utilizing the miRNeasy Serum/Plasma Kit. Subsequently, reverse transcription was performed using the miScript II RT Kit. Furthermore, quantitative real-time PCR was conducted on the QuantStudio 12K Flex system."

**Professor-style (GOOD):**
"We isolated total RNA from 200 μL plasma (miRNeasy Serum/Plasma Kit, Qiagen) and reverse-transcribed 50 ng using miScript II RT (HiFlex buffer, 37°C, 60 min). qPCR was run on the QuantStudio 12K Flex with miScript SYBR Green, 40 cycles, and cel-miR-39-3p spike-in normalization."

**Why better:** Specific quantities, active voice, single flowing paragraph, no "subsequently" or "furthermore", includes normalization detail.

### Results Interpretation
**AI-style (BAD):**
"The results demonstrated that the biomarker panel exhibited robust diagnostic performance. Notably, the area under the curve was significantly higher than that of the conventional marker. These findings underscore the potential clinical utility of the panel."

**Professor-style (GOOD):**
"The 5-miRNA panel achieved an AUC of 0.94 (95% CI: 0.90–0.97) in the validation cohort (n = 142), outperforming CEA alone (AUC = 0.71, DeLong p < 0.001). At 95% sensitivity, specificity reached 82%, corresponding to a PPV of 0.74 in a screening population with 5% prevalence."

**Why better:** Numbers first, named comparator, clinical cutoff justified, prevalence-adjusted PPV — this is what an expert writes.

### Discussion Paragraph
**AI-style (BAD):**
"Our study has several important limitations that should be considered. First, the sample size was relatively small. Second, the study was conducted at a single center. Furthermore, the retrospective design may introduce selection bias. Despite these limitations, our findings provide valuable insights into the potential of liquid biopsy biomarkers."

**Professor-style (GOOD):**
"Three limitations constrain interpretation. The validation cohort (n = 142) may underpower subgroup analyses, particularly for stage I disease (n = 23). All samples came from a single academic center; performance in community settings and across ethnic populations remains untested. The retrospective design cannot exclude referral bias, though consecutive enrollment mitigated this partially."

**Why better:** Specific numbers, names the specific subgroup concern, no "valuable insights" or "should be considered", states what was done to mitigate.

### Grant Specific Aims
**AI-style (BAD):**
"The overarching goal of this proposal is to develop a comprehensive liquid biopsy platform for early cancer detection. This innovative approach leverages cutting-edge molecular technologies to address the critical unmet need in cancer diagnostics."

**Professor-style (GOOD):**
"Colorectal cancer kills 53,000 Americans annually, yet colonoscopy compliance hovers at 60%. A blood-based screening test would reach the 40% who decline invasive procedures. We propose a 5-miRNA plasma panel (UroDETECT platform) that achieved 94% sensitivity at 82% specificity in our 340-patient pilot, outperforming Cologuard (sensitivity 92%, specificity 87% but requiring stool collection). This R01 will validate the panel in 1,200 patients across 4 sites."

**Why better:** Opens with the problem (deaths + compliance gap), quantifies the opportunity, cites own preliminary data with comparator, states exact scope.

## Structural Patterns to Avoid

### Uniform Paragraph Length
AI generates paragraphs of ~equal length (4-5 sentences each). Mix: 2-sentence summary paragraphs, 6-8 sentence detailed analyses, occasional single-sentence emphasis.

### Predictable Structure
AI follows: topic sentence → evidence → interpretation → transition. Break this: sometimes lead with the surprising finding, sometimes with the comparison, sometimes with the clinical implication.

### Symmetric Sections
AI makes Introduction and Discussion roughly equal length, and subsections within Methods roughly equal. Real manuscripts have asymmetric sections — the novel method gets 2 pages, standard protocols get 2 sentences.

### Bullet-Point-Then-Prose
AI often lists items as bullets, then restates them in prose. Pick one. In scientific writing, prose is almost always preferred over bullets (except in checklists and structured abstracts).

## Discipline-Specific Biomedical Conventions

- Units: always SI, with space ("5 mL" not "5mL"), except "%" (no space: "95%")
- Gene names: italic (in manuscript), protein names: roman (MIR21 gene → miR-21 RNA → no standard protein)
- Abbreviations: define at first use in abstract AND again at first use in body text
- Numbers: spell out at sentence start ("Forty-two patients..." not "42 patients...")
- References: numbered in order of appearance (Vancouver style) for most biomedical journals
- Tables: every table must have a title AND footnotes explaining abbreviations
- Supplementary material: put lengthy methods, additional figures, raw data tables here — keep main text focused
