---
name: biostats-advanced
description: Use when performing advanced biostatistics — mixed-effects models, meta-analysis (forest plots, funnel plots, heterogeneity), Bayesian diagnostics, competing risks, propensity score matching, multiple testing correction (FDR, permutation), mediation analysis, or any statistical method beyond basic t-test/ANOVA/Cox regression for biomedical research
---

# Advanced Biostatistics — Mixed Models, Meta-Analysis & Bayesian Methods

## Mixed-Effects Models (Longitudinal / Clustered Data)

### Linear Mixed-Effects (R)
```r
library(lme4); library(lmerTest)
# Random intercept + slope per patient (longitudinal biomarker measurements)
fit <- lmer(biomarker ~ time * treatment + age + sex + (1 + time | patient_id),
            data = longitudinal_data)
summary(fit)   # Fixed effects: coefficient, SE, t, p-value
confint(fit)   # 95% CI for fixed effects
# Report: β (95% CI), p-value for each fixed effect
# Check: residual plots, random effect distribution (qqnorm(ranef(fit)$patient_id[,1]))
```

### Generalized Linear Mixed Models (binary outcomes)
```r
# Repeated diagnostic test outcomes (positive/negative) within patients
fit_glmm <- glmer(test_result ~ biomarker_level + age + (1 | patient_id),
                  data = repeated_tests, family = binomial)
# Report: OR = exp(β), 95% CI, p-value
exp(fixef(fit_glmm))        # Odds ratios
exp(confint(fit_glmm))      # CI for ORs
```

### Python Alternative (statsmodels)
```python
import statsmodels.formula.api as smf
model = smf.mixedlm("biomarker ~ time * treatment + age", data=df,
                     groups=df["patient_id"], re_formula="~time")
result = model.fit()
print(result.summary())
```

**When to use mixed models:**
| Scenario | Fixed Effects | Random Effects |
|----------|--------------|----------------|
| Longitudinal biomarker monitoring | Time, treatment, covariates | Patient (intercept + slope) |
| Multi-site diagnostic study | Biomarker, age, sex | Site (intercept) |
| Repeated measurements per sample | Condition, batch | Sample (intercept) |
| Nested design (patients within clinics) | Treatment, covariates | Clinic / Patient within clinic |

## Meta-Analysis

### Fixed/Random Effects Meta-Analysis (R)
```r
library(meta); library(metafor)

# Diagnostic accuracy meta-analysis (sensitivity/specificity)
# Input: 2×2 table per study (TP, FP, FN, TN)
library(mada)
fit_ma <- reitsma(data = studies_2x2)
summary(fit_ma)
plot(fit_ma)  # SROC curve

# Generic effect size meta-analysis
m <- metagen(TE = log_or, seTE = se_log_or, studlab = author_year,
             data = studies, sm = "OR")
forest(m, sortvar = TE, prediction = TRUE)  # Forest plot with prediction interval
funnel(m)  # Funnel plot for publication bias

# Heterogeneity — always report:
# I² (% variation due to heterogeneity): <25% low, 25-75% moderate, >75% high
# Q statistic p-value
# τ² (between-study variance)
```

### Publication Bias Assessment
```r
# Egger's test (small-study effects)
metabias(m, method.bias = "linreg")  # p < 0.10 suggests bias

# Trim-and-fill (estimate missing studies)
trimfill(m)

# Report: "Egger's test p = X.XX. Trim-and-fill estimated N missing studies."
```

### Subgroup & Meta-Regression
```r
# Subgroup by study design
update(m, subgroup = design, tau.common = FALSE)

# Meta-regression (continuous moderator)
metareg(m, ~ sample_size + year)
# Report: β for each moderator, 95% CI, p-value, R² (% heterogeneity explained)
```

## Bayesian Biostatistics

### Bayesian Diagnostic Test Evaluation (R)
```r
library(rjags); library(R2jags)

# Bayesian estimation of sensitivity/specificity with informative priors
model_string <- "
model {
  # Priors (Beta distribution — use published literature as informative prior)
  sens ~ dbeta(a_sens, b_sens)   # e.g., dbeta(90, 10) = prior mean 0.90
  spec ~ dbeta(a_spec, b_spec)   # e.g., dbeta(85, 15) = prior mean 0.85
  prev ~ dbeta(1, 1)             # non-informative for prevalence

  # Likelihood
  for (i in 1:N) {
    disease[i] ~ dbern(prev)
    test[i] ~ dbern(disease[i] * sens + (1 - disease[i]) * (1 - spec))
  }
}
"
# Report: posterior median (95% credible interval) for sens, spec, prev
```

### When to Use Bayesian
| Scenario | Why Bayesian |
|----------|-------------|
| Small sample (n < 30) | Informative priors stabilize estimates |
| Incorporating prior study data | Literature-based priors on sensitivity |
| Multiple imperfect reference standards | Latent class models |
| Adaptive clinical trials | Sequential updating |
| Prediction intervals for new settings | Posterior predictive distribution |

## Competing Risks Analysis

```r
library(cmprsk); library(tidycmprsk)

# When patients can experience multiple event types
# (e.g., cancer-specific death vs death from other causes)
cif <- cuminc(ftime = data$time, fstatus = data$event_type, group = data$treatment)
ggcuminc(cif) + labs(x = "Time (months)", y = "Cumulative Incidence")

# Fine-Gray regression (sub-distribution hazard)
fit_fg <- crr(ftime = data$time, fstatus = data$event_type,
              cov1 = model.matrix(~ treatment + age + stage, data)[, -1])
summary(fit_fg)
# Report: sub-distribution HR (95% CI), p-value
# Interpretation: effect of covariate on incidence of event of interest,
# accounting for competing events
```

**Use competing risks when:** Patient can experience mutually exclusive events (cancer death vs non-cancer death, relapse vs treatment-related mortality). Standard Kaplan-Meier overestimates cumulative incidence when competing risks exist.

## Propensity Score Methods

```r
library(MatchIt)
# Propensity score matching for observational studies
# (when randomization is not possible)
m <- matchit(treatment ~ age + sex + stage + comorbidity,
             data = obs_data, method = "nearest", ratio = 1, caliper = 0.2)
summary(m)            # Check balance (standardized mean differences < 0.1)
matched <- match.data(m)

# Analyze matched data
fit <- coxph(Surv(time, event) ~ treatment, data = matched)
# Or: use IPTW (inverse probability of treatment weighting) as alternative
```

| PS Method | When to Use |
|-----------|-------------|
| Nearest-neighbor matching | Simple, interpretable, loses unmatched subjects |
| IPTW (weighting) | Retains all subjects, more efficient |
| Stratification | Quick, less precise than matching |
| Doubly robust | Combines PS model + outcome model — robust to misspecification |

## Multiple Testing Correction

| Method | Controls | Use When |
|--------|----------|----------|
| Bonferroni | FWER (family-wise) | Few comparisons (<20), need strict control |
| Holm | FWER (step-down) | Default — uniformly more powerful than Bonferroni |
| BH (Benjamini-Hochberg) | FDR | High-throughput (genomics, proteomics) — standard |
| BY (Benjamini-Yekutieli) | FDR under dependence | Correlated tests (e.g., correlated biomarkers) |
| Permutation | Empirical | Custom test statistics, no distributional assumptions |
| q-value (Storey) | FDR | Large-scale genomics, more power than BH |

```r
# R: built-in correction
p.adjust(p_values, method = "BH")      # Benjamini-Hochberg
p.adjust(p_values, method = "holm")     # Holm (step-down Bonferroni)

# Permutation-based (for custom statistics)
library(coin)
independence_test(outcome ~ group, data = df, distribution = approximate(nresample = 10000))
```

**Rule: always report the correction method.** "P-values adjusted for multiple comparisons using BH FDR correction."

## Mediation Analysis

```r
library(mediation)
# Does biomarker X mediate the effect of exposure on outcome?
model_m <- lm(mediator ~ exposure + covariates, data = df)
model_y <- lm(outcome ~ exposure + mediator + covariates, data = df)
med <- mediate(model_m, model_y, treat = "exposure", mediator = "mediator",
               boot = TRUE, sims = 1000)
summary(med)
# Report: ACME (average causal mediation effect), ADE (average direct effect),
# total effect, proportion mediated (95% CI)
```

## Diagnostic Accuracy Beyond AUC

| Metric | Formula/Tool | When to Report |
|--------|-------------|---------------|
| Net Benefit | `library(dcurves); dca()` | Decision curve analysis — clinical utility at threshold |
| NRI (Net Reclassification) | `library(nricens)` | Adding new biomarker to existing model |
| IDI (Integrated Discrimination) | `library(nricens)` | Continuous improvement in discrimination |
| Calibration plot | `library(rms); calibrate()` | Predicted vs observed probabilities |
| Partial AUC | `pROC::auc(roc, partial.auc = c(0.8, 1))` | High-sensitivity region for screening tests |

Cross-reference: `DrKoduru-Research:bioml-pipeline` for basic AUC, bootstrap CI, SHAP explainability.
Cross-reference: `DrKoduru-Research:r-bioinformatics` for DESeq2 (uses BH correction) and survival analysis (basic Cox).
Cross-reference: `DrKoduru-Research:clinical-study-design` for power analysis and sample size calculations.
Cross-reference: `DrKoduru-Research:data-viz-publication` for forest plot and funnel plot figure templates.
