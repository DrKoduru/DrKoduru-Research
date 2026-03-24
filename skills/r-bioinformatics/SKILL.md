---
name: r-bioinformatics
description: Use when performing bioinformatics analysis in R — differential expression (DESeq2, limma, edgeR), single-cell RNA-seq (Seurat, Harmony), pathway enrichment (clusterProfiler, GSEA, fgsea), survival analysis (survival, survminer), or any Bioconductor workflow for gene expression, small RNA, or mRNA data
---

# R Bioinformatics — Expression, Pathway, Survival & Single-Cell

## Differential Expression

### DESeq2 (bulk RNA-seq — standard)
```r
library(DESeq2)
dds <- DESeqDataSetFromMatrix(countData = counts, colData = metadata, design = ~ condition)
dds <- dds[rowSums(counts(dds)) >= 10, ]   # filter low counts
dds <- DESeq(dds)
res <- results(dds, contrast = c("condition", "tumor", "normal"), alpha = 0.05)
res <- lfcShrink(dds, coef = "condition_tumor_vs_normal", type = "apeglm")
# Report: log2FC, padj (BH-corrected), baseMean
```

### limma-voom (microarray or RNA-seq with complex designs)
```r
library(limma); library(edgeR)
dge <- DGEList(counts = counts); dge <- calcNormFactors(dge)
design <- model.matrix(~ condition + batch, data = metadata)
v <- voom(dge, design, plot = TRUE)
fit <- lmFit(v, design) |> eBayes()
topTable(fit, coef = "conditiontumor", number = Inf, sort.by = "P")
```

### edgeR (alternative to DESeq2 — faster for large datasets)
```r
library(edgeR)
y <- DGEList(counts = counts, group = metadata$condition)
y <- calcNormFactors(y); design <- model.matrix(~ condition, data = metadata)
y <- estimateDisp(y, design)
fit <- glmQLFit(y, design); qlf <- glmQLFTest(fit, coef = 2)
topTags(qlf, n = Inf)
```

**When to use which:**
| Tool | Best For | Design Complexity |
|------|----------|-------------------|
| DESeq2 | Standard bulk RNA-seq, small n | Simple (2-group, paired) |
| limma-voom | Microarray, complex batch designs | Complex (multi-factor, interaction) |
| edgeR | Large datasets, speed needed | Simple to moderate |

## Pathway & Enrichment Analysis

### clusterProfiler (ORA + GSEA)
```r
library(clusterProfiler); library(org.Hs.eg.db)
# Over-representation analysis (ORA) — use DE gene list
ego <- enrichGO(gene = sig_genes_entrez, OrgDb = org.Hs.eg.db,
                ont = "BP", pAdjustMethod = "BH", qvalueCutoff = 0.05)
# GSEA — use ranked gene list (log2FC * -log10(pvalue))
gseaRes <- gseGO(geneList = ranked_genes, OrgDb = org.Hs.eg.db,
                 ont = "BP", pAdjustMethod = "BH", minGSSize = 15)
# KEGG
ekegg <- enrichKEGG(gene = sig_genes_entrez, organism = "hsa")
```

### fgsea (fast preranked GSEA)
```r
library(fgsea)
pathways <- gmtPathways("h.all.v2024.1.Hs.symbols.gmt")  # MSigDB hallmark
stats <- setNames(res$log2FoldChange, rownames(res))       # named vector
fgseaRes <- fgsea(pathways, stats, minSize = 15, maxSize = 500)
# Report: NES (normalized enrichment score), padj, leadingEdge
```

## Single-Cell RNA-seq (Seurat + Harmony)

```r
library(Seurat); library(harmony)
# Standard Seurat workflow
obj <- CreateSeuratObject(counts = counts_matrix, min.cells = 3, min.features = 200)
obj[["percent.mt"]] <- PercentageFeatureSet(obj, pattern = "^MT-")
obj <- subset(obj, nFeature_RNA > 200 & nFeature_RNA < 5000 & percent.mt < 20)
obj <- NormalizeData(obj) |> FindVariableFeatures() |> ScaleData() |> RunPCA()

# Batch correction with Harmony (multi-sample integration)
obj <- RunHarmony(obj, group.by.vars = "sample_id")
obj <- RunUMAP(obj, reduction = "harmony", dims = 1:30)
obj <- FindNeighbors(obj, reduction = "harmony", dims = 1:30) |>
       FindClusters(resolution = 0.5)

# DE between clusters
markers <- FindAllMarkers(obj, only.pos = TRUE, min.pct = 0.25, logfc.threshold = 0.25)
# Cell type annotation: use SingleR or manual marker genes
```

**QC thresholds (adjust per tissue):**
| Metric | Typical Filter |
|--------|---------------|
| nFeature_RNA | 200–5000 |
| percent.mt | < 20% (tissue) or < 5% (PBMC) |
| nCount_RNA | 500–30000 |
| Doublet removal | scDblFinder or DoubletFinder |

## Survival Analysis

```r
library(survival); library(survminer)
# Cox proportional hazards
fit_cox <- coxph(Surv(time, status) ~ gene_high + age + stage, data = clin)
summary(fit_cox)  # Report: HR, 95% CI, p-value per covariate

# Kaplan-Meier
fit_km <- survfit(Surv(time, status) ~ gene_high, data = clin)
ggsurvplot(fit_km, pval = TRUE, risk.table = TRUE,
           palette = c("#2E9FDF", "#E7B800"),
           xlab = "Time (months)", ylab = "Overall Survival")
# Log-rank test
survdiff(Surv(time, status) ~ gene_high, data = clin)
```

**Optimal cutoff for continuous biomarker:**
```r
library(survminer)
cut <- surv_cutpoint(clin, time = "time", event = "status", variables = "gene_expr")
# Or use median split — simpler, more reproducible, preferred by reviewers
```

## Common Bioconductor Patterns

```r
# Install Bioconductor packages
if (!requireNamespace("BiocManager")) install.packages("BiocManager")
BiocManager::install(c("DESeq2", "clusterProfiler", "org.Hs.eg.db", "fgsea"))

# Gene ID conversion (critical — many tools need Entrez IDs)
library(org.Hs.eg.db)
gene_map <- AnnotationDbi::select(org.Hs.eg.db,
  keys = gene_symbols, keytype = "SYMBOL", columns = c("ENTREZID", "ENSEMBL"))

# Batch correction (ComBat for known batches)
library(sva)
corrected <- ComBat(dat = expr_matrix, batch = metadata$batch, mod = model.matrix(~ condition))
```

## Standard R Session Info

```r
# Always include at end of analysis for reproducibility
sessionInfo()
# Or: renv::snapshot() for full lockfile
```

**Key packages (install all):**
```r
BiocManager::install(c("DESeq2", "limma", "edgeR", "clusterProfiler",
  "fgsea", "org.Hs.eg.db", "sva", "Seurat", "harmony", "SingleR"))
install.packages(c("survival", "survminer", "ggplot2", "pheatmap", "renv"))
```

Cross-reference: `DrKoduru-Research:bioml-pipeline` for Python ML models (XGBoost, SHAP) on the same data.
Cross-reference: `DrKoduru-Research:data-viz-publication` for publication-quality R figures (ggplot2, volcano, heatmap).
