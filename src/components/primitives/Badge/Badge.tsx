import type { ReactNode } from "react";

import typo from "@/styles/typography.module.css";

import styles from "./Badge.module.css";

/**
 * Badge variant — the qualitative status the badge represents.
 *
 * Omitting the variant produces the muted gray "no signal" default.
 * Used for placeholder tags in summary cells and anywhere a badge
 * needs to render without a status color. The four explicit
 * variants reuse the same vocabulary as the surrounding signal
 * tokens.
 */
export type BadgeVariant = "crit" | "linked" | "nominal" | "stale";

/**
 * Badge appearance — visual emphasis.
 *
 * - `outlined` (default) — colored text and border, transparent
 *   background. Used in summary cells, the roster, and as the
 *   stale form of card-header badges.
 * - `filled` — saturated background fill with contrasting text.
 *   Only meaningful for crit and linked variants; passing
 *   `appearance="filled"` on any other variant silently falls
 *   back to the outlined treatment because the mockups have no
 *   filled forms for nominal, stale, or muted.
 */
export type BadgeAppearance = "filled" | "outlined";

/**
 * Badge size.
 *
 * - `md` (default) — 9.5px font, the card-header chip size.
 * - `sm` — 9px font, the slightly tighter chip used in summary
 *   cells and the roster row status pill.
 */
export type BadgeSize = "sm" | "md";

type BadgeProps = {
  variant?: BadgeVariant;
  appearance?: BadgeAppearance;
  size?: BadgeSize;
  children: ReactNode;
};

/**
 * Badge — uppercase status chip used across the dashboard.
 *
 * The single most-reused presentational primitive in the system —
 * card headers, summary cell tags, roster row status, posture
 * pill. Renders an inline-flex container so consumers can drop a
 * BlinkDot or other inline element in as a child:
 *
 *     <Badge variant="crit" appearance="filled">
 *       <BlinkDot />NOW · CRIT
 *     </Badge>
 *
 * Server Component. The badge text *is* the accessible label, so
 * unlike StatusPip and LivePulse there is no aria-hidden — the
 * chip is meaningful content, not a decoration.
 */
export function Badge({
  variant,
  appearance = "outlined",
  size = "md",
  children,
}: BadgeProps) {
  // Typography is applied as a composite class from typography.module.css
  // — md uses labelSm (9.5px), sm uses labelXs (9px). This keeps Badge.module.css
  // free of font declarations and conformant with the project rule.
  const typographyClass = size === "md" ? typo.labelSm : typo.labelXs;

  const className = [
    styles.base,
    styles[size],
    variant && styles[variant],
    appearance === "filled" && styles.filled,
    typographyClass,
  ]
    .filter(Boolean)
    .join(" ");

  return <span className={className}>{children}</span>;
}
