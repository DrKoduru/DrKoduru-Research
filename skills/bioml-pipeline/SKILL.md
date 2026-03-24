---
name: bioml-pipeline
description: Use when building ML models for cancer diagnostics, biomarker analysis, qPCR data, OpenArray, small RNA/mRNA panels, survival analysis, gene expression, liquid biopsy, or any clinical prediction task
---

# BioML Pipeline — Cancer Biology & Diagnostics

## Standard Project Structure
```
data/         raw/  processed/  features/
models/       trained/  evaluation/  artifacts/
notebooks/    exploration/  validation/
src/          preprocessing.py  features.py  model.py  evaluate.py
requirements.txt   README.md   PROJECT_BRIEF.md
```

## Phase 1: Data & QC
```python
df.info(); df.isnull().sum(); df['label'].value_counts()
# qPCR: reference gene CV < 25%, flag Cq > 35
# Expression: log2-transform, PCA for batch effects
# Liquid biopsy: check hemolysis (miR-23a/miR-451 ratio > 25 = hemolyzed)
```

## OpenArray & High-Throughput
```python
# OpenArray: 48.48 or 96.96 Dynamic Array (QuantStudio CSV export)
# QC: flag Undetermined wells, Grubbs outlier Ct, failed wells
# Normalization: endogenous controls per plate (not global)
# Batch correction: ComBat or limma::removeBatchEffect across runs
```

## small RNA / mRNA Biomarker Patterns
```python
# small RNA-seq: miRBase annotation, edgeR/DESeq2 for DE analysis
# Plasma qPCR: spike-in controls (cel-miR-39-3p), 3-10 marker panels typical
# Pre-amplification required for low-input plasma mRNA
# Normalization: spike-in Ct for plasma; housekeeping genes for tissue
```

## Assay Validation Framework (CLIA/FDA/CAP)
```
Analytical validation — always calculate:
- Accuracy:     % recovery from known spiked standards
- Precision:    within-run CV%, between-run CV%, between-day CV% (target < 15%)
- Linearity:    R² across 5+ concentrations spanning dynamic range
- LOD:          mean blank + 3σ (confirmed with 20 replicates near LOD)
- LOQ:          CV < 20% at lowest quantifiable concentration
- Interference: hemolysis (H+), lipemia (L+), bilirubin (I+) at clinical levels
- Stability:    freeze-thaw (3 cycles), bench (4h, 24h), long-term (-80°C, 6mo)
```

## Phase 2: Feature Selection
```python
from sklearn.feature_selection import RFECV
from sklearn.ensemble import RandomForestClassifier
# Cancer dx panels: LASSO, RFECV, or Boruta — sparse + interpretable
# Always report: AUC-ROC, sensitivity, specificity, PPV, NPV at clinical cutoff
```

## Phase 3: Model Selection
| Task | Model | Why |
|------|-------|-----|
| Binary dx (cancer vs normal) | XGBoost / Random Forest | Small N, interpretable |
| Multi-class tumor type | LightGBM + SHAP | Fast, feature importance |
| Survival analysis | Cox PH + RSF | Time-to-event clinical standard |
| mRNA/miRNA panel | Elastic Net / LASSO | Sparse, interpretable |
| >1000 samples | 1D-CNN or TabNet | When sample size justifies |

## Phase 4: Clinical Validation
```python
# Stratified k-fold (k=5 or 10), bootstrap CIs for AUC (n=2000)
# DeLong test for model comparison
# NEVER report only accuracy — AUC + sens/spec required for diagnostic models
aucs = [roc_auc_score(y, m.predict_proba(X)[:,1]) for X, y in bootstrap_samples]
ci = np.percentile(aucs, [2.5, 97.5])
```

## Phase 5: Explainability (mandatory for clinical)
```python
import shap
explainer = shap.TreeExplainer(model)
# Waterfall: individual patient · Beeswarm: population summary
# Always include SHAP — required for clinical/regulatory interpretability
```

## Clinical Reporting Requirements
- AUC ± 95% CI (DeLong method)
- ROC curve with sens/spec tradeoff table at key cutoffs
- Youden's J or predefined sensitivity (e.g., 95% sens) for clinical cutoff
- Discovery vs. validation cohort performance — clearly separate
- Sample demographics table: n, age, sex, stage, collection site

## Standard requirements.txt
```
pandas>=2.0 numpy>=1.24 scikit-learn>=1.3 xgboost lightgbm
shap matplotlib seaborn scipy statsmodels lifelines
mlflow streamlit jupyter rpy2
```
