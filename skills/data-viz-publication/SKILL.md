---
name: data-viz-publication
description: Use when creating publication-quality figures for scientific journals — volcano plots, heatmaps, ROC curves, Kaplan-Meier, forest plots, UMAP, box/violin plots, or multi-panel figures in R (ggplot2) or Python (matplotlib/seaborn) with journal submission specs (300 DPI, TIFF/EPS, color-blind safe)
---

# Data Visualization — Publication-Quality Scientific Figures

## Journal Submission Specs

| Spec | Requirement |
|------|-------------|
| Resolution | 300 DPI minimum (600 DPI for line art) |
| Format | TIFF (preferred), EPS/PDF (vector), PNG (online only) |
| Color mode | RGB for online, CMYK for print |
| Width | Single column: 3.3 in · 1.5 column: 4.5 in · Full width: 6.7 in |
| Font size | 8–12 pt (6 pt minimum for axis labels) |
| Font | Arial or Helvetica (most journals) |
| Line weight | 0.5–1.0 pt minimum |

## Color-Blind Safe Palettes

```r
# Okabe-Ito palette — gold standard for accessibility
okabe_ito <- c("#E69F00", "#56B4E9", "#009E73", "#F0E442",
               "#0072B2", "#D55E00", "#CC79A7", "#999999")
# Use for all categorical comparisons (2–8 groups)

# Sequential: viridis (perceptually uniform)
scale_fill_viridis_c()  # continuous
scale_fill_viridis_d()  # discrete
```

```python
# Python equivalents
import matplotlib.pyplot as plt
okabe_ito = ["#E69F00", "#56B4E9", "#009E73", "#F0E442",
             "#0072B2", "#D55E00", "#CC79A7", "#999999"]
plt.cm.viridis  # sequential
```

**Never use:** red-green only, rainbow/jet, default matplotlib colors for publications.

## Plot Types — Code Templates

### Volcano Plot (differential expression)
```r
library(ggplot2); library(ggrepel)
ggplot(res_df, aes(x = log2FC, y = -log10(padj), color = significance)) +
  geom_point(alpha = 0.6, size = 1.5) +
  scale_color_manual(values = c("NS" = "grey70", "Up" = "#D55E00", "Down" = "#0072B2")) +
  geom_hline(yintercept = -log10(0.05), linetype = "dashed", color = "grey40") +
  geom_vline(xintercept = c(-1, 1), linetype = "dashed", color = "grey40") +
  geom_text_repel(data = top_genes, aes(label = gene), size = 3, max.overlaps = 15) +
  labs(x = expression(log[2]~"Fold Change"), y = expression(-log[10]~"adj. p-value")) +
  theme_classic(base_size = 12)
```

### Heatmap (gene expression)
```r
library(pheatmap)
pheatmap(expr_matrix, scale = "row",
         color = colorRampPalette(c("#0072B2", "white", "#D55E00"))(100),
         annotation_col = metadata[, c("condition", "stage")],
         clustering_distance_rows = "correlation",
         show_rownames = TRUE, fontsize_row = 8,
         border_color = NA, cutree_rows = 3)
```

### ROC Curve (diagnostic performance)
```python
import matplotlib.pyplot as plt
from sklearn.metrics import roc_curve, auc

fpr, tpr, _ = roc_curve(y_true, y_score)
roc_auc = auc(fpr, tpr)
plt.figure(figsize=(4, 4), dpi=300)
plt.plot(fpr, tpr, color="#0072B2", lw=2, label=f"AUC = {roc_auc:.2f}")
plt.plot([0, 1], [0, 1], "k--", lw=1, alpha=0.5)
plt.xlabel("1 - Specificity"); plt.ylabel("Sensitivity")
plt.legend(loc="lower right", fontsize=10)
plt.tight_layout()
plt.savefig("roc.tiff", dpi=300, bbox_inches="tight")
```

### Kaplan-Meier (survival)
```r
library(survminer)
ggsurvplot(fit_km, data = clin,
  pval = TRUE, pval.size = 4, risk.table = TRUE,
  palette = c("#0072B2", "#D55E00"),
  xlab = "Time (months)", ylab = "Overall Survival Probability",
  legend.labs = c("Low", "High"), legend.title = "Biomarker",
  ggtheme = theme_classic(base_size = 12),
  risk.table.fontsize = 3.5, risk.table.height = 0.25)
```

### Forest Plot (hazard ratios / odds ratios)
```r
library(ggplot2)
ggplot(hr_df, aes(x = HR, y = reorder(variable, HR))) +
  geom_point(size = 3) +
  geom_errorbarh(aes(xmin = CI_low, xmax = CI_high), height = 0.2) +
  geom_vline(xintercept = 1, linetype = "dashed", color = "grey50") +
  scale_x_log10() +
  labs(x = "Hazard Ratio (95% CI)", y = NULL) +
  theme_classic(base_size = 12)
```

### UMAP (single-cell / dimensionality reduction)
```r
library(Seurat)
DimPlot(obj, reduction = "umap", group.by = "cell_type",
        cols = okabe_ito, pt.size = 0.3, label = TRUE, label.size = 3) +
  theme_void(base_size = 12) + NoLegend()
# For publication: export as PDF then convert to TIFF at 300 DPI
```

### Box/Violin + Jitter (group comparisons)
```r
ggplot(data, aes(x = group, y = expression, fill = group)) +
  geom_violin(alpha = 0.4, color = NA) +
  geom_boxplot(width = 0.15, outlier.shape = NA) +
  geom_jitter(width = 0.1, size = 0.8, alpha = 0.5) +
  scale_fill_manual(values = okabe_ito) +
  stat_compare_means(method = "wilcox.test", label = "p.signif") +
  labs(y = expression(log[2]~"Expression"), x = NULL) +
  theme_classic(base_size = 12) + theme(legend.position = "none")
```

## Multi-Panel Figure Composition

```r
library(patchwork)
# Combine panels with labels
(p_volcano | p_heatmap) / (p_roc | p_km) +
  plot_annotation(tag_levels = "A") &
  theme(plot.tag = element_text(face = "bold", size = 14))
ggsave("Figure1.tiff", width = 6.7, height = 6, dpi = 300, compression = "lzw")
```

```python
# Python multi-panel
fig, axes = plt.subplots(2, 2, figsize=(6.7, 6), dpi=300)
# ... plot in each ax
for ax, label in zip(axes.flat, "ABCD"):
    ax.text(-0.15, 1.05, label, transform=ax.transAxes, fontsize=14, fontweight="bold")
fig.tight_layout()
fig.savefig("Figure1.tiff", dpi=300, bbox_inches="tight")
```

## Export Checklist

```
- [ ] Resolution: 300 DPI (check with identify -verbose or PIL)
- [ ] Font size: ≥8 pt at final print size
- [ ] Color: Okabe-Ito or viridis (color-blind safe)
- [ ] Labels: axis labels, units, sample sizes (n = X per group)
- [ ] Statistics: p-values or significance brackets shown
- [ ] Legend: clear, no overlapping text
- [ ] Panel labels: A, B, C, D — bold, top-left
- [ ] File format: TIFF (LZW compression) or PDF (vector)
- [ ] Width: matches journal column spec (single/full)
```

Cross-reference: `DrKoduru-Research:scientific-writing` for figure legend text format.
Cross-reference: `DrKoduru-Research:r-bioinformatics` for upstream analysis code (DESeq2, Seurat, survival).
Cross-reference: `DrKoduru-Research:bioml-pipeline` for ROC/AUC calculation code (Python).
