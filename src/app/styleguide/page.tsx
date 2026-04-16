import { Fragment } from "react";

import type { Metadata } from "next";

import { Badge } from "@/components/primitives/Badge";
import { BlinkDot } from "@/components/primitives/BlinkDot";
import { AgentIdBlock } from "@/components/primitives/AgentIdBlock";
import { AgentRow } from "@/components/primitives/AgentRow";
import { CardButton } from "@/components/primitives/CardButton";
import { ConfidenceChip } from "@/components/primitives/ConfidenceChip";
import { FilterChip } from "@/components/primitives/FilterChip";
import { FunctionKey } from "@/components/primitives/FunctionKey";
import { KeyValueRow } from "@/components/primitives/KeyValueRow";
import { LivePulse } from "@/components/primitives/LivePulse";
import { StatusPip } from "@/components/primitives/StatusPip";
import typo from "@/styles/typography.module.css";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Styleguide · Fleet Control",
};

// ─────────────────────────────────────────────────────────────────────
// Token data.
//
// These arrays enumerate every token in the design system so the
// /styleguide page can render them as visual reference. The data is
// duplicated from tokens.primitive.css and tokens.semantic.css, which
// remain the actual source of truth. When a token is added or removed,
// update both the CSS file AND this page.
//
// (A more sophisticated setup could parse the CSS files at build time
// and extract the declarations automatically, but that trades clarity
// for cleverness. Start simple; refactor if maintenance becomes real.)
// ─────────────────────────────────────────────────────────────────────

type PrimitiveColor = {
  cssVar: string;
  mdName: string;
  value: string;
  role: string;
};

type SemanticColor = {
  cssVar: string;
  mdName: string;
  aliasOf: string;
  role: string;
};

type TypographyStyle = {
  cls: string;
  mdName: string;
  sample: string;
};

type ScaleRow = {
  cssVar: string;
  mdName: string;
  px: number;
  role?: string;
};

type MotionRow = {
  cssVar: string;
  mdName: string;
  value: string;
  role: string;
};

// ─── Primitive colors ────────────────────────────────────────────────

const primitiveColors: Record<string, PrimitiveColor[]> = {
  "color.bg.* — surface darks": [
    { cssVar: "--color-bg-0", mdName: "color.bg.0", value: "#0a0907", role: "Page, footer, topbar" },
    { cssVar: "--color-bg-1", mdName: "color.bg.1", value: "#121110", role: "Default panel" },
    { cssVar: "--color-bg-2", mdName: "color.bg.2", value: "#181614", role: "Raised panel, hover" },
    { cssVar: "--color-bg-3", mdName: "color.bg.3", value: "#1f1c18", role: "Elevated surface" },
    { cssVar: "--color-bg-code", mdName: "color.bg.code", value: "#0c0a07", role: "Code editor pane" },
  ],
  "color.line.* — borders": [
    { cssVar: "--color-line-1", mdName: "color.line.1", value: "#2a2520", role: "Subtle divider" },
    { cssVar: "--color-line-2", mdName: "color.line.2", value: "#3d3527", role: "Default panel border" },
    { cssVar: "--color-line-hot", mdName: "color.line.hot", value: "#5c4a2c", role: "Incident/finding border" },
  ],
  "color.amber.* — brand scale": [
    { cssVar: "--color-amber-300", mdName: "color.amber.300", value: "#ffc863", role: "Bright — emphasis, hover" },
    { cssVar: "--color-amber-500", mdName: "color.amber.500", value: "#ffa724", role: "Brand — default text, primary" },
    { cssVar: "--color-amber-700", mdName: "color.amber.700", value: "#b8841c", role: "Dim — secondary labels" },
    { cssVar: "--color-amber-900", mdName: "color.amber.900", value: "#6b5028", role: "Mute — hairlines only" },
    { cssVar: "--color-amber-tint", mdName: "color.amber.tint", value: "rgba(255,167,36,0.04)", role: "Current-line highlight" },
  ],
  "color.neutral.* — foreground neutrals": [
    { cssVar: "--color-neutral-100", mdName: "color.neutral.100", value: "#f0e6d2", role: "\"White\" — primary readable text" },
    { cssVar: "--color-neutral-500", mdName: "color.neutral.500", value: "#7a6e58", role: "Muted — labels, secondary" },
    { cssVar: "--color-neutral-700", mdName: "color.neutral.700", value: "#4f463a", role: "Muted-2 — disabled, tertiary" },
    { cssVar: "--color-neutral-0", mdName: "color.neutral.0", value: "#000000", role: "Pure black — on amber fills" },
    { cssVar: "--color-neutral-ink", mdName: "color.neutral.ink", value: "#1a1408", role: "Dark amber-black on linked fills" },
  ],
  "color.signal.* — status palette": [
    { cssVar: "--color-signal-crit", mdName: "color.signal.crit", value: "#ff3a2e", role: "Critical alert" },
    { cssVar: "--color-signal-crit-bg", mdName: "color.signal.crit.bg", value: "#2a0e0a", role: "Critical surface tint" },
    { cssVar: "--color-signal-crit-edge", mdName: "color.signal.crit.edge", value: "#6b1f17", role: "Critical border" },
    { cssVar: "--color-signal-crit-ink", mdName: "color.signal.crit.ink", value: "#ffe6e2", role: "Text on critical surface" },
    { cssVar: "--color-signal-crit-tint", mdName: "color.signal.crit-tint", value: "rgba(255,58,46,0.09)", role: "Diff removed bg" },
    { cssVar: "--color-signal-linked", mdName: "color.signal.linked", value: "#ffd166", role: "Correlated finding" },
    { cssVar: "--color-signal-linked-bg", mdName: "color.signal.linked.bg", value: "#2a2010", role: "Linked surface tint" },
    { cssVar: "--color-signal-linked-edge", mdName: "color.signal.linked.edge", value: "#6b5520", role: "Linked border" },
    { cssVar: "--color-signal-linked-ink", mdName: "color.signal.linked.ink", value: "#fff1c4", role: "Text on linked surface" },
    { cssVar: "--color-signal-stale", mdName: "color.signal.stale", value: "#8a8275", role: "Silent agent / fleet-health" },
    { cssVar: "--color-signal-stale-bg", mdName: "color.signal.stale.bg", value: "#1a1816", role: "Stale surface tint" },
    { cssVar: "--color-signal-warn", mdName: "color.signal.warn", value: "#ffb800", role: "Warning" },
    { cssVar: "--color-signal-nominal", mdName: "color.signal.nominal", value: "#3da55c", role: "Healthy / OK" },
    { cssVar: "--color-signal-nominal-edge", mdName: "color.signal.nominal.edge", value: "#20502d", role: "Nominal border" },
    { cssVar: "--color-signal-nominal-tint", mdName: "color.signal.nominal-tint", value: "rgba(61,165,92,0.09)", role: "Diff added bg, \"new\" highlight" },
    { cssVar: "--color-signal-info", mdName: "color.signal.info", value: "#6cb4d4", role: "Neutral informational" },
  ],
};

// ─── Semantic colors ─────────────────────────────────────────────────

const semanticColors: Record<string, SemanticColor[]> = {
  "surface.*": [
    { cssVar: "--surface-background", mdName: "surface.background", aliasOf: "color.bg.0", role: "Body, content scroll area" },
    { cssVar: "--surface-panel", mdName: "surface.panel", aliasOf: "color.bg.1", role: "Default card, roster" },
    { cssVar: "--surface-panel-raised", mdName: "surface.panel.raised", aliasOf: "color.bg.2", role: "Card header, hover" },
    { cssVar: "--surface-panel-elevated", mdName: "surface.panel.elevated", aliasOf: "color.bg.3", role: "Inline code, nested cells" },
    { cssVar: "--surface-bar-fill", mdName: "surface.bar.fill", aliasOf: "color.neutral.0", role: "Topbar and footer" },
    { cssVar: "--surface-brand-fill", mdName: "surface.brand.fill", aliasOf: "color.amber.500", role: "Brand wordmark, F1 active key" },
    { cssVar: "--surface-signal-crit", mdName: "surface.signal.crit", aliasOf: "color.signal.crit.bg", role: "Critical row tint, badge bg" },
    { cssVar: "--surface-signal-linked", mdName: "surface.signal.linked", aliasOf: "color.signal.linked.bg", role: "Linked row tint, posture pill" },
    { cssVar: "--surface-signal-stale", mdName: "surface.signal.stale", aliasOf: "color.signal.stale.bg", role: "Stale row tint, stale card head" },
  ],
  "border.*": [
    { cssVar: "--border-subtle", mdName: "border.subtle", aliasOf: "color.line.1", role: "Topbar dividers, row separators" },
    { cssVar: "--border-default", mdName: "border.default", aliasOf: "color.line.2", role: "Card outline, panel outline" },
    { cssVar: "--border-strong", mdName: "border.strong", aliasOf: "color.line.hot", role: "Incident wrapper, finding dividers" },
    { cssVar: "--border-signal-crit", mdName: "border.signal.crit", aliasOf: "color.signal.crit.edge", role: "Critical card border" },
    { cssVar: "--border-signal-linked", mdName: "border.signal.linked", aliasOf: "color.signal.linked.edge", role: "Linked badges, pills, incident" },
    { cssVar: "--border-signal-stale", mdName: "border.signal.stale", aliasOf: "color.signal.stale", role: "Stale card border, badge" },
    { cssVar: "--border-signal-nominal", mdName: "border.signal.nominal", aliasOf: "color.signal.nominal.edge", role: "Nominal status badge" },
  ],
  "text.*": [
    { cssVar: "--text-primary", mdName: "text.primary", aliasOf: "color.neutral.100", role: "Default readable text" },
    { cssVar: "--text-secondary", mdName: "text.secondary", aliasOf: "color.neutral.500", role: "Labels, supporting text" },
    { cssVar: "--text-tertiary", mdName: "text.tertiary", aliasOf: "color.neutral.700", role: "Disabled, separators-as-text" },
    { cssVar: "--text-brand", mdName: "text.brand", aliasOf: "color.amber.500", role: "Default body, brand text" },
    { cssVar: "--text-brand-bright", mdName: "text.brand.bright", aliasOf: "color.amber.300", role: "Emphasis, hover, key numerals" },
    { cssVar: "--text-brand-dim", mdName: "text.brand.dim", aliasOf: "color.amber.700", role: "De-emphasis, breadcrumbs" },
    { cssVar: "--text-signal-crit", mdName: "text.signal.crit", aliasOf: "color.signal.crit", role: "Critical text" },
    { cssVar: "--text-signal-linked", mdName: "text.signal.linked", aliasOf: "color.signal.linked", role: "Linked text" },
    { cssVar: "--text-signal-stale", mdName: "text.signal.stale", aliasOf: "color.signal.stale", role: "Stale text" },
    { cssVar: "--text-signal-warn", mdName: "text.signal.warn", aliasOf: "color.signal.warn", role: "Warning text" },
    { cssVar: "--text-signal-nominal", mdName: "text.signal.nominal", aliasOf: "color.signal.nominal", role: "Nominal status text" },
    { cssVar: "--text-signal-info", mdName: "text.signal.info", aliasOf: "color.signal.info", role: "Informational text" },
    { cssVar: "--text-on-brand", mdName: "text.on-brand", aliasOf: "color.neutral.0", role: "Black-on-amber" },
    { cssVar: "--text-on-linked", mdName: "text.on-linked", aliasOf: "color.neutral.ink", role: "Dark-on-yellow" },
    { cssVar: "--text-on-crit", mdName: "text.on-crit", aliasOf: "color.neutral.100", role: "White-on-red badge" },
    { cssVar: "--text-on-crit-row", mdName: "text.on-crit.row", aliasOf: "color.signal.crit.ink", role: "Soft red text on crit row" },
    { cssVar: "--text-on-linked-row", mdName: "text.on-linked.row", aliasOf: "color.signal.linked.ink", role: "Soft yellow text on linked row" },
    { cssVar: "--text-confidence-below", mdName: "text.confidence.below", aliasOf: "color.amber.700", role: "Confidence below threshold" },
    { cssVar: "--text-confidence-standard", mdName: "text.confidence.standard", aliasOf: "color.amber.500", role: "Confidence above threshold" },
    { cssVar: "--text-confidence-high", mdName: "text.confidence.high", aliasOf: "color.amber.300", role: "High confidence (≥90%)" },
    { cssVar: "--text-confidence-delta-up", mdName: "text.confidence.delta-up", aliasOf: "color.signal.linked", role: "Confidence increased" },
    { cssVar: "--text-confidence-delta-down", mdName: "text.confidence.delta-down", aliasOf: "color.neutral.500", role: "Confidence decreased" },
    { cssVar: "--text-annotation", mdName: "text.annotation", aliasOf: "color.signal.info", role: "Inline corrections, ACTUAL callouts" },
  ],
  "action.*": [
    { cssVar: "--action-primary-bg", mdName: "action.primary.bg", aliasOf: "color.amber.500", role: "Primary button fill" },
    { cssVar: "--action-primary-bg-hover", mdName: "action.primary.bg.hover", aliasOf: "color.amber.300", role: "Primary button hover" },
    { cssVar: "--action-primary-text", mdName: "action.primary.text", aliasOf: "color.neutral.0", role: "Primary button text" },
    { cssVar: "--action-crit-bg", mdName: "action.crit.bg", aliasOf: "color.signal.crit", role: "Destructive button fill" },
    { cssVar: "--action-crit-text", mdName: "action.crit.text", aliasOf: "color.neutral.100", role: "Destructive button text" },
    { cssVar: "--action-default-text", mdName: "action.default.text", aliasOf: "color.amber.500", role: "Ghost/default button text" },
    { cssVar: "--action-ghost-text", mdName: "action.ghost.text", aliasOf: "color.neutral.500", role: "Muted ghost button text" },
    { cssVar: "--action-text-hover", mdName: "action.text.hover", aliasOf: "color.amber.300", role: "Text hover state" },
    { cssVar: "--action-bg-hover", mdName: "action.bg.hover", aliasOf: "color.bg.2", role: "Button background hover" },
  ],
  "diff.* (Screen 5)": [
    { cssVar: "--diff-added-bg", mdName: "diff.added.bg", aliasOf: "color.signal.nominal-tint", role: "Added line background" },
    { cssVar: "--diff-added-gutter", mdName: "diff.added.gutter", aliasOf: "color.signal.nominal", role: "Added line gutter" },
    { cssVar: "--diff-added-border", mdName: "diff.added.border", aliasOf: "color.signal.nominal.edge", role: "Added line border" },
    { cssVar: "--diff-removed-bg", mdName: "diff.removed.bg", aliasOf: "color.signal.crit-tint", role: "Removed line background" },
    { cssVar: "--diff-removed-gutter", mdName: "diff.removed.gutter", aliasOf: "color.signal.crit", role: "Removed line gutter" },
    { cssVar: "--diff-removed-border", mdName: "diff.removed.border", aliasOf: "color.signal.crit.edge", role: "Removed line border" },
    { cssVar: "--diff-context-gutter", mdName: "diff.context.gutter", aliasOf: "color.neutral.700", role: "Context line gutter" },
  ],
  "code.syntax.* (Screen 5)": [
    { cssVar: "--code-syntax-keyword", mdName: "code.syntax.keyword", aliasOf: "color.amber.300", role: "rule, when, then, and, or" },
    { cssVar: "--code-syntax-function", mdName: "code.syntax.function", aliasOf: "color.signal.info", role: "lock_account, page_oncall" },
    { cssVar: "--code-syntax-identifier", mdName: "code.syntax.identifier", aliasOf: "color.neutral.100", role: "actor, time, access" },
    { cssVar: "--code-syntax-property", mdName: "code.syntax.property", aliasOf: "color.neutral.100", role: ".type, .hour, .ip" },
    { cssVar: "--code-syntax-string", mdName: "code.syntax.string", aliasOf: "color.signal.linked", role: "\"service_account\"" },
    { cssVar: "--code-syntax-number", mdName: "code.syntax.number", aliasOf: "color.signal.info", role: "0.75, 2, true" },
    { cssVar: "--code-syntax-operator", mdName: "code.syntax.operator", aliasOf: "color.neutral.500", role: "==, !=, :, ->" },
    { cssVar: "--code-syntax-punctuation", mdName: "code.syntax.punctuation", aliasOf: "color.amber.700", role: "Brackets, parens, dots" },
    { cssVar: "--code-syntax-comment", mdName: "code.syntax.comment", aliasOf: "color.neutral.700", role: "# comment lines" },
  ],
  "code.editor.* (Screen 5)": [
    { cssVar: "--code-editor-surface", mdName: "code.editor.surface", aliasOf: "color.bg.code", role: "Editor pane background" },
    { cssVar: "--code-editor-gutter-bg", mdName: "code.editor.gutter-bg", aliasOf: "color.bg.0", role: "Line number gutter bg" },
    { cssVar: "--code-editor-gutter-text", mdName: "code.editor.gutter-text", aliasOf: "color.neutral.700", role: "Line number text" },
    { cssVar: "--code-editor-current-line-bg", mdName: "code.editor.current-line-bg", aliasOf: "color.amber.tint", role: "Current line highlight" },
    { cssVar: "--code-editor-current-line-border", mdName: "code.editor.current-line-border", aliasOf: "color.amber.900", role: "Current line border" },
  ],
};

// ─── Typography ──────────────────────────────────────────────────────

const typographyStyles: TypographyStyle[] = [
  { cls: "displayXl", mdName: "display.xl", sample: "247" },
  { cls: "displayLg", mdName: "display.lg", sample: "4 ITEMS" },
  { cls: "headingLg", mdName: "heading.lg", sample: "AGT-0142" },
  { cls: "headingMd", mdName: "heading.md", sample: "INCIDENT · EXFIL-2026-04-15" },
  { cls: "headingSm", mdName: "heading.sm", sample: "Finding 3 — outbound volume anomaly" },
  { cls: "bodyMd", mdName: "body.md", sample: "Default body text. Correlated with AGT-0098 at 14:22:07Z." },
  { cls: "bodySm", mdName: "body.sm", sample: "Finding description — looser leading for multi-line prose scanning." },
  { cls: "bodyXs", mdName: "body.xs", sample: "Pattern detail prose. 3 of 4 sessions originated from the same ASN." },
  { cls: "codeInline", mdName: "code.inline", sample: "policy.session.ttl = 3600" },
  { cls: "codeEditor", mdName: "code.editor", sample: "rule exfil when outbound.volume > 2.5 * baseline" },
  { cls: "idAgent", mdName: "id.agent", sample: "AGT-0142" },
  { cls: "labelLg", mdName: "label.lg", sample: "agents" },
  { cls: "labelMd", mdName: "label.md", sample: "fleet memory" },
  { cls: "labelSm", mdName: "label.sm", sample: "correlated" },
  { cls: "labelXs", mdName: "label.xs", sample: "stale 14m" },
  { cls: "labelMicro", mdName: "label.micro", sample: "now / brief" },
  { cls: "buttonPrimary", mdName: "button.primary", sample: "hold" },
  { cls: "buttonSecondary", mdName: "button.secondary", sample: "approve" },
  { cls: "buttonTertiary", mdName: "button.tertiary", sample: "all" },
  { cls: "chipMd", mdName: "chip.md", sample: "f1 now" },
  { cls: "chipSm", mdName: "chip.sm", sample: "all 24" },
  { cls: "caption", mdName: "caption", sample: "14:22:07Z" },
  { cls: "metaMd", mdName: "meta.md", sample: "vulnerability · production dependency scan" },
  { cls: "brandWordmark", mdName: "brand.wordmark", sample: "sentryos / fleet" },
];

// ─── Spacing ─────────────────────────────────────────────────────────

const spacingScale: ScaleRow[] = [
  { cssVar: "--space-0", mdName: "space.0", px: 0 },
  { cssVar: "--space-2", mdName: "space.2", px: 2 },
  { cssVar: "--space-4", mdName: "space.4", px: 4 },
  { cssVar: "--space-6", mdName: "space.6", px: 6 },
  { cssVar: "--space-8", mdName: "space.8", px: 8 },
  { cssVar: "--space-10", mdName: "space.10", px: 10 },
  { cssVar: "--space-12", mdName: "space.12", px: 12 },
  { cssVar: "--space-14", mdName: "space.14", px: 14 },
  { cssVar: "--space-16", mdName: "space.16", px: 16 },
  { cssVar: "--space-18", mdName: "space.18", px: 18 },
  { cssVar: "--space-20", mdName: "space.20", px: 20 },
  { cssVar: "--space-24", mdName: "space.24", px: 24 },
  { cssVar: "--space-28", mdName: "space.28", px: 28 },
  { cssVar: "--space-32", mdName: "space.32", px: 32 },
];

// ─── Dimensions ──────────────────────────────────────────────────────

const dimensions: ScaleRow[] = [
  { cssVar: "--size-dot-xs", mdName: "size.dot.xs", px: 6, role: "Live pulse, status pip" },
  { cssVar: "--size-dot-sm", mdName: "size.dot.sm", px: 8, role: "Posture blob, small event glyph" },
  { cssVar: "--size-dot-md", mdName: "size.dot.md", px: 12, role: "Event glyph" },
  { cssVar: "--size-icon-sm", mdName: "size.icon.sm", px: 14, role: "Caret, line-icons in roster" },
  { cssVar: "--size-icon-md", mdName: "size.icon.md", px: 16, role: "Avatar, missed-list bullet" },
  { cssVar: "--size-bar-topbar", mdName: "size.bar.topbar", px: 32, role: "Top status bar height" },
  { cssVar: "--size-bar-footer", mdName: "size.bar.footer", px: 26, role: "Footer height" },
  { cssVar: "--size-bar-posture", mdName: "size.bar.posture", px: 56, role: "Posture strip height" },
  { cssVar: "--size-timeline-height", mdName: "size.timeline.height", px: 90, role: "Queue timeline panel" },
  { cssVar: "--size-rail-width", mdName: "size.rail.width", px: 308, role: "Left roster rail width" },
];

// ─── Borders ─────────────────────────────────────────────────────────

const borderWidths: ScaleRow[] = [
  { cssVar: "--border-width-0", mdName: "border.width.0", px: 0 },
  { cssVar: "--border-width-1", mdName: "border.width.1", px: 1, role: "All standard borders" },
  { cssVar: "--border-width-2", mdName: "border.width.2", px: 2, role: "Cell top accent, active rail" },
  { cssVar: "--border-width-3", mdName: "border.width.3", px: 3, role: "Card crit/stale left accent" },
];

// ─── Motion ──────────────────────────────────────────────────────────

const motionRows: MotionRow[] = [
  { cssVar: "--motion-duration-fast", mdName: "motion.duration.fast", value: "100ms", role: "Hover transitions on rows" },
  { cssVar: "--motion-duration-base", mdName: "motion.duration.base", value: "120ms", role: "Default UI transitions" },
  { cssVar: "--motion-duration-enter", mdName: "motion.duration.enter", value: "200ms", role: "Entering view" },
  { cssVar: "--motion-duration-exit", mdName: "motion.duration.exit", value: "150ms", role: "Leaving the brief" },
  { cssVar: "--motion-duration-pulse", mdName: "motion.duration.pulse", value: "1600ms", role: "Live indicator pulse" },
  { cssVar: "--motion-duration-blink", mdName: "motion.duration.blink", value: "1050ms", role: "Critical badge blink" },
  { cssVar: "--motion-ease-standard", mdName: "motion.ease.standard", value: "cubic-bezier(0.4, 0, 0.2, 1)", role: "Default — entries, hovers" },
  { cssVar: "--motion-ease-exit", mdName: "motion.ease.exit", value: "cubic-bezier(0.4, 0, 1, 1)", role: "Accelerate-out" },
];

// ─── Page component ──────────────────────────────────────────────────

export default function Styleguide() {
  return (
    <main className={styles.page}>
      <header className={styles.pageHeader}>
        <h1 className={typo.headingLg}>Fleet Control · Styleguide</h1>
        <p className={`${typo.bodyMd} ${styles.pageLead}`}>
          A live reference for every design token, text style, and primitive
          in the system. This page is the source of truth — if it is not
          here, it does not exist.
        </p>
      </header>

      {/* ─── Primitives ──────────────────────────────────────────── */}
      <section className={styles.section}>
        <h2 className={`${typo.labelMicro} ${styles.sectionTitle}`}>Primitives</h2>
        <p className={`${typo.bodySm} ${styles.pageLead}`}>
          The reusable React building blocks that compose every screen in
          Fleet Control. Each entry below is rendered live — what you see
          here is what ships.
        </p>

        <div className={styles.primitiveGrid}>
          {/* LivePulse — 6px nominal-green dot, 1.6s opacity pulse. */}
          <div className={styles.primitiveCard}>
            <div className={styles.primitiveDemo}>
              <LivePulse />
              <span className={typo.labelXs}>WS · LIVE</span>
            </div>
            <div className={styles.primitiveMeta}>
              <span className={`${typo.idAgent} ${styles.tokenName}`}>LivePulse</span>
              <span className={`${typo.caption} ${styles.tokenRole}`}>
                Live-stream indicator. Topbar (WS · LIVE) and footer (STREAM OK).
              </span>
            </div>
          </div>

          {/* StatusPip — small status dot, four signal variants + muted default,
              two sizes (xs default, sm for posture pill). */}
          <div className={styles.primitiveCard}>
            <div className={styles.primitiveDemo}>
              <StatusPip variant="crit" />
              <StatusPip variant="linked" />
              <StatusPip variant="nominal" />
              <StatusPip variant="stale" />
              <StatusPip />
            </div>
            <div className={styles.primitiveMeta}>
              <span className={`${typo.idAgent} ${styles.tokenName}`}>StatusPip · xs</span>
              <span className={`${typo.caption} ${styles.tokenRole}`}>
                crit · linked · nominal · stale · muted (default)
              </span>
            </div>
          </div>

          <div className={styles.primitiveCard}>
            <div className={styles.primitiveDemo}>
              <StatusPip size="sm" variant="crit" />
              <StatusPip size="sm" variant="linked" />
              <StatusPip size="sm" variant="nominal" />
              <StatusPip size="sm" variant="stale" />
              <StatusPip size="sm" />
            </div>
            <div className={styles.primitiveMeta}>
              <span className={`${typo.idAgent} ${styles.tokenName}`}>StatusPip · sm</span>
              <span className={`${typo.caption} ${styles.tokenRole}`}>
                Larger 8px size used in the posture pill.
              </span>
            </div>
          </div>

          <div className={styles.primitiveCard}>
            <div className={styles.primitiveDemo}>
              <StatusPip shape="circle" variant="crit" />
              <StatusPip shape="circle" variant="linked" />
              <StatusPip shape="circle" variant="nominal" />
              <StatusPip shape="circle" variant="stale" />
              <StatusPip shape="circle" />
            </div>
            <div className={styles.primitiveMeta}>
              <span className={`${typo.idAgent} ${styles.tokenName}`}>StatusPip · circle</span>
              <span className={`${typo.caption} ${styles.tokenRole}`}>
                Rounded shape for roster agent rows.
              </span>
            </div>
          </div>

          {/* Badge — uppercase status chip, the most-reused primitive
              in the system. Two appearances (filled, outlined), four
              signal variants + muted default, two sizes, composes
              BlinkDot as a child for attention-grabbing states. */}
          <div className={styles.primitiveCard}>
            <div className={styles.primitiveDemo} style={{ flexWrap: "wrap" }}>
              <Badge variant="crit" appearance="filled">
                <BlinkDot />NOW · CRIT
              </Badge>
              <Badge variant="linked" appearance="filled">LINKED · LOCK</Badge>
              <Badge variant="stale">STALE · FLEET HEALTH</Badge>
            </div>
            <div className={styles.primitiveMeta}>
              <span className={`${typo.idAgent} ${styles.tokenName}`}>Badge · md (card headers)</span>
              <span className={`${typo.caption} ${styles.tokenRole}`}>
                Filled crit + BlinkDot, filled linked, outlined stale.
              </span>
            </div>
          </div>

          <div className={styles.primitiveCard}>
            <div className={styles.primitiveDemo} style={{ flexWrap: "wrap" }}>
              <Badge variant="crit" size="sm">CRIT</Badge>
              <Badge variant="linked" size="sm">LINK</Badge>
              <Badge variant="nominal" size="sm">NOM</Badge>
              <Badge variant="stale" size="sm">STALE</Badge>
              <Badge size="sm">MUTED</Badge>
            </div>
            <div className={styles.primitiveMeta}>
              <span className={`${typo.idAgent} ${styles.tokenName}`}>Badge · sm (summary, roster)</span>
              <span className={`${typo.caption} ${styles.tokenRole}`}>
                Outlined variants — crit, linked, nominal, stale, and the muted default.
              </span>
            </div>
          </div>

          {/* BlinkDot — 6px square that blinks on a 1.05s 2-step loop.
              Inherits color from its parent via currentColor, so we set
              text color on the demo wrappers to show it in the two
              palettes it actually appears in (crit and linked badges). */}
          <div className={styles.primitiveCard}>
            <div className={styles.primitiveDemo}>
              <span style={{ color: "var(--text-signal-crit)" }}>
                <BlinkDot />
              </span>
              <span style={{ color: "var(--text-signal-linked)" }}>
                <BlinkDot />
              </span>
            </div>
            <div className={styles.primitiveMeta}>
              <span className={`${typo.idAgent} ${styles.tokenName}`}>BlinkDot</span>
              <span className={`${typo.caption} ${styles.tokenRole}`}>
                Inherits currentColor. Composed inside Badge for NOW · CRIT
                and PROPOSED states.
              </span>
            </div>
          </div>

          {/* KeyValueRow — one label/value pair for card body field grids.
              Renders a bare <dt>/<dd> fragment, so we wrap in a <dl> with
              an inline grid matching the mockup's 92px / 1fr layout. The
              demo shows plain text, <code>, and <b> descendants. */}
          <div className={styles.primitiveCard}>
            <dl
              className={styles.primitiveDemo}
              style={{
                display: "grid",
                gridTemplateColumns: "92px 1fr",
                gap: "6px 16px",
                alignItems: "baseline",
                justifyContent: "start",
                minHeight: "auto",
                padding: "var(--space-12)",
              }}
            >
              <KeyValueRow label="Finding">
                Critical <code>CVE-2025-48719</code> in <b>libgrpc-rs 1.42.0</b>
              </KeyValueRow>
              <KeyValueRow label="Auto-action">
                Patched <b>staging</b> at 03:43 — within authority
              </KeyValueRow>
              <KeyValueRow label="Authority">
                <code>vuln.patch:staging</code> ✓ · <code>vuln.patch:prod</code> ✗
              </KeyValueRow>
            </dl>
            <div className={styles.primitiveMeta}>
              <span className={`${typo.idAgent} ${styles.tokenName}`}>KeyValueRow</span>
              <span className={`${typo.caption} ${styles.tokenRole}`}>
                Card body field row. Label as &lt;dt&gt; (labelSm), value as
                &lt;dd&gt; (bodySm). Supports &lt;code&gt; and &lt;b&gt; in values.
              </span>
            </div>
          </div>

          {/* ConfidenceChip — inline confidence percentage with tier
              colouring. Shows all three tiers and the delta variant. */}
          <div className={styles.primitiveCard}>
            <div
              className={styles.primitiveDemo}
              style={{
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "var(--space-10)",
                padding: "var(--space-12)",
              }}
            >
              <ConfidenceChip value={94} />
              <ConfidenceChip value={87} />
              <ConfidenceChip value={62} />
              <ConfidenceChip value={87} previousValue={62} />
            </div>
            <div className={styles.primitiveMeta}>
              <span className={`${typo.idAgent} ${styles.tokenName}`}>ConfidenceChip</span>
              <span className={`${typo.caption} ${styles.tokenRole}`}>
                High (≥90%), standard (75–89%), below (&lt;75%), and delta variant.
              </span>
            </div>
          </div>

          {/* FilterChip — roster filter toggle buttons. The outer
              border and flex layout belong to the parent container;
              FilterChip adds a right border between siblings. */}
          <div className={styles.primitiveCard}>
            <div
              className={styles.primitiveDemo}
              style={{
                padding: "var(--space-12)",
                flexDirection: "column",
                alignItems: "stretch",
                gap: "var(--space-10)",
              }}
            >
              {/* Simulates the roster filter bar with "ALL" selected.
                  Max-width matches the 308px roster panel so the chips
                  look realistic at the flex: 1 sizing they use in situ. */}
              <div
                style={{
                  display: "flex",
                  maxWidth: "308px",
                  border: "var(--border-width-1) solid var(--border-default)",
                }}
              >
                <FilterChip label="ALL" count={24} active />
                <FilterChip label="DEMAND" count={2} />
                <FilterChip label="LINKED" count={2} />
                <FilterChip label="STALE" count={1} />
              </div>
            </div>
            <div className={styles.primitiveMeta}>
              <span className={`${typo.idAgent} ${styles.tokenName}`}>FilterChip</span>
              <span className={`${typo.caption} ${styles.tokenRole}`}>
                Roster filter toggle. Active (amber fill) vs inactive (muted).
                Count at reduced opacity when inactive.
              </span>
            </div>
          </div>

          {/* FunctionKey — footer navigation buttons. The row wrapper
              simulates the 26px footer bar height so the keys look
              realistic. */}
          <div className={styles.primitiveCard}>
            <div
              className={styles.primitiveDemo}
              style={{
                padding: "var(--space-12)",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "var(--space-10)",
              }}
            >
              {/* Active state — "F1 NOW" is the current screen */}
              <div
                style={{
                  display: "flex",
                  height: "26px",
                  background: "var(--surface-bar-fill)",
                  border: "var(--border-width-1) solid var(--border-subtle)",
                }}
              >
                <FunctionKey keyName="F1" label="NOW" active />
                <FunctionKey keyName="F2" label="ROSTER" />
                <FunctionKey keyName="F3" label="LOG" />
                <FunctionKey keyName="/" label="CMD" />
              </div>
            </div>
            <div className={styles.primitiveMeta}>
              <span className={`${typo.idAgent} ${styles.tokenName}`}>FunctionKey</span>
              <span className={`${typo.caption} ${styles.tokenRole}`}>
                Footer navigation. Key name in amber, label muted.
                Active key gets amber fill with black text.
              </span>
            </div>
          </div>

          {/* AgentIdBlock — namespaced agent ID with description subtitle.
              Used in card headers to identify the firing agent. */}
          <div className={styles.primitiveCard}>
            <div
              className={styles.primitiveDemo}
              style={{
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "var(--space-16)",
                padding: "var(--space-12)",
              }}
            >
              <AgentIdBlock
                name="vuln-scanner"
                namespace="prod"
                description="Vulnerability · production dependency scan"
              />
              <AgentIdBlock
                name="threat-detector"
                namespace="prod"
                description="Threat correlation · behavioural analysis"
              />
            </div>
            <div className={styles.primitiveMeta}>
              <span className={`${typo.idAgent} ${styles.tokenName}`}>AgentIdBlock</span>
              <span className={`${typo.caption} ${styles.tokenRole}`}>
                Card header agent identifier. Name + muted namespace,
                description subtitle below (metaMd typography).
              </span>
            </div>
          </div>

          {/* AgentRow — roster agent row composing StatusPip (circle)
              + agent name + Badge. Shows all variants. */}
          <div className={styles.primitiveCard}>
            <div
              className={styles.primitiveDemo}
              style={{
                flexDirection: "column",
                alignItems: "stretch",
                padding: 0,
                minHeight: "auto",
              }}
            >
              <AgentRow
                variant="crit"
                name="vuln-scanner"
                namespace="prod"
                status="CRIT"
                statusVariant="crit"
              />
              <AgentRow
                variant="linked"
                name="access-monitor"
                status="LOCK"
                statusVariant="linked"
              />
              <AgentRow
                name="vuln-scanner"
                namespace="staging"
                status="NOM"
                statusVariant="nominal"
              />
              <AgentRow
                variant="stale"
                name="patch-manager"
                namespace="prod"
                status="STALE"
                statusVariant="stale"
              />
              <AgentRow
                name="threat-network"
                status="NOM"
                statusVariant="nominal"
              />
            </div>
            <div className={styles.primitiveMeta}>
              <span className={`${typo.idAgent} ${styles.tokenName}`}>AgentRow</span>
              <span className={`${typo.caption} ${styles.tokenRole}`}>
                Roster row: circle pip + agent name + badge. Crit, linked,
                stale, and default variants.
              </span>
            </div>
          </div>

          {/* CardButton — card action row buttons. The wrapper simulates
              the card action row grid (1fr auto auto) with a top border.
              Spans full grid width so the action row text doesn't wrap. */}
          <div className={styles.primitiveCard} style={{ gridColumn: "1 / -1" }}>
            <div
              className={styles.primitiveDemo}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto auto",
                alignItems: "stretch",
                padding: 0,
                minHeight: "auto",
                borderTop: "var(--border-width-1) solid var(--border-default)",
              }}
            >
              <CardButton variant="ghost">DETAIL · DIFF · BLAST RADIUS</CardButton>
              <CardButton keyHint="D">DEFER 30M</CardButton>
              <CardButton variant="crit" keyHint="↵">APPROVE PROD DEPLOY</CardButton>
            </div>
            <div
              className={styles.primitiveDemo}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto auto",
                alignItems: "stretch",
                padding: 0,
                minHeight: "auto",
                borderTop: "var(--border-width-1) solid var(--border-default)",
              }}
            >
              <CardButton variant="ghost">INVESTIGATE</CardButton>
              <CardButton>RELEASE</CardButton>
              <CardButton variant="primary" keyHint="↵">CONFIRM LOCKOUT</CardButton>
            </div>
            <div className={styles.primitiveMeta}>
              <span className={`${typo.idAgent} ${styles.tokenName}`}>CardButton</span>
              <span className={`${typo.caption} ${styles.tokenRole}`}>
                Ghost, default, crit, and primary variants. Optional key hint pill.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Semantic colors ─────────────────────────────────────── */}
      <section className={styles.section}>
        <h2 className={`${typo.labelMicro} ${styles.sectionTitle}`}>Semantic colors</h2>

        {Object.entries(semanticColors).map(([group, entries]) => (
          <div key={group} className={styles.section}>
            <h3 className={`${typo.labelXs} ${styles.subsectionTitle}`}>{group}</h3>
            <div className={styles.colorGrid}>
              {entries.map((c) => (
                <div key={c.cssVar} className={styles.colorCard}>
                  <div
                    className={styles.colorSwatch}
                    style={{ background: `var(${c.cssVar})` }}
                  />
                  <div className={styles.colorMeta}>
                    <span className={`${typo.idAgent} ${styles.tokenName}`}>{c.mdName}</span>
                    <span className={`${typo.caption} ${styles.tokenAlias}`}>→ {c.aliasOf}</span>
                    <span className={`${typo.caption} ${styles.tokenRole}`}>{c.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ─── Primitive colors ────────────────────────────────────── */}
      <section className={styles.section}>
        <h2 className={`${typo.labelMicro} ${styles.sectionTitle}`}>Primitive colors</h2>
        <p className={`${typo.bodySm} ${styles.pageLead}`}>
          Reference only. Components must consume semantic tokens, not primitives.
        </p>

        {Object.entries(primitiveColors).map(([group, entries]) => (
          <div key={group} className={styles.section}>
            <h3 className={`${typo.labelXs} ${styles.subsectionTitle}`}>{group}</h3>
            <div className={styles.colorGrid}>
              {entries.map((c) => (
                <div key={c.cssVar} className={styles.colorCard}>
                  <div
                    className={styles.colorSwatch}
                    style={{ background: `var(${c.cssVar})` }}
                  />
                  <div className={styles.colorMeta}>
                    <span className={`${typo.idAgent} ${styles.tokenName}`}>{c.mdName}</span>
                    <span className={`${typo.caption} ${styles.tokenValue}`}>{c.value}</span>
                    <span className={`${typo.caption} ${styles.tokenRole}`}>{c.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ─── Typography ──────────────────────────────────────────── */}
      <section className={styles.section}>
        <h2 className={`${typo.labelMicro} ${styles.sectionTitle}`}>Typography</h2>
        <div className={styles.typeList}>
          {typographyStyles.map((t) => {
            const sampleClass = typo[t.cls as keyof typeof typo];
            return (
              <div key={t.cls} className={styles.typeRow}>
                <span className={`${typo.caption} ${styles.typeLabel}`}>{t.mdName}</span>
                <span className={`${sampleClass} ${styles.typeSample}`}>{t.sample}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── Spacing ─────────────────────────────────────────────── */}
      <section className={styles.section}>
        <h2 className={`${typo.labelMicro} ${styles.sectionTitle}`}>Spacing scale</h2>
        <div className={styles.spacingList}>
          {spacingScale.map((s) => (
            <div key={s.cssVar} className={styles.spacingRow}>
              <span className={`${typo.caption} ${styles.typeLabel}`}>
                {s.mdName} · {s.px}px
              </span>
              <div
                className={styles.spacingBar}
                style={{ width: `var(${s.cssVar})` }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ─── Dimensions ──────────────────────────────────────────── */}
      <section className={styles.section}>
        <h2 className={`${typo.labelMicro} ${styles.sectionTitle}`}>Component dimensions</h2>
        <div className={styles.dimensionList}>
          {dimensions.map((d) => (
            <div key={d.cssVar} className={styles.dimensionRow}>
              <span className={`${typo.caption} ${styles.typeLabel}`}>{d.mdName}</span>
              <div
                className={styles.dimensionSample}
                style={{
                  width: `var(${d.cssVar})`,
                  height: `var(${d.cssVar})`,
                }}
              />
              <span className={`${typo.caption} ${styles.tokenRole}`}>
                {d.px}px · {d.role}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Borders ─────────────────────────────────────────────── */}
      <section className={styles.section}>
        <h2 className={`${typo.labelMicro} ${styles.sectionTitle}`}>Border widths</h2>
        <div className={styles.borderList}>
          {borderWidths.map((b) => (
            <div key={b.cssVar} className={styles.borderRow}>
              <span className={`${typo.caption} ${styles.typeLabel}`}>{b.mdName}</span>
              <div
                className={styles.borderSample}
                style={{ borderTopWidth: `var(${b.cssVar})` }}
              />
              <span className={`${typo.caption} ${styles.tokenRole}`}>
                {b.px}px · {b.role ?? ""}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Motion ──────────────────────────────────────────────── */}
      <section className={styles.section}>
        <h2 className={`${typo.labelMicro} ${styles.sectionTitle}`}>Motion</h2>
        <div className={styles.motionTable}>
          {motionRows.map((m) => (
            <Fragment key={m.cssVar}>
              <span className={`${typo.caption} ${styles.tokenName}`}>
                {m.mdName}
              </span>
              <span className={`${typo.caption} ${styles.tokenRole}`}>
                {m.role}
              </span>
              <span className={`${typo.caption} ${styles.tokenValue}`}>
                {m.value}
              </span>
            </Fragment>
          ))}
        </div>
      </section>
    </main>
  );
}
