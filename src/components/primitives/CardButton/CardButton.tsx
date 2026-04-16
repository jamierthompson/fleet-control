"use client";

import type { ReactNode } from "react";

import typo from "@/styles/typography.module.css";

import styles from "./CardButton.module.css";

/**
 * CardButton variant — the visual intent of the action.
 *
 * - `primary` — amber fill, black text. The main positive action
 *   ("APPROVE PROD DEPLOY", "CONFIRM LOCKOUT", "RESTART AGENT").
 * - `crit` — red fill, white text. Destructive or high-severity
 *   action ("APPROVE PROD DEPLOY" on the crit card).
 * - `ghost` — muted text, no fill. Secondary navigation links
 *   ("DETAIL · DIFF · BLAST RADIUS", "INVESTIGATE").
 *
 * Omitting the variant produces the default treatment: amber text
 * on a transparent background. Used for mid-priority actions
 * ("DEFER 30M", "RELEASE", "PAGE ON-CALL").
 */
export type CardButtonVariant = "primary" | "crit" | "ghost";

type CardButtonProps = {
  /** Visual variant — omit for the default amber-text treatment. */
  variant?: CardButtonVariant;
  /**
   * Optional keyboard shortcut hint rendered as a small bordered
   * pill to the right of the label ("D", "↵"). Uses chipSm
   * typography at reduced opacity.
   */
  keyHint?: string;
  /** Button label text. */
  children: ReactNode;
  /** Click handler for the action. */
  onClick?: () => void;
};

/**
 * CardButton — one action button in a card's bottom action row.
 *
 * Renders as a <button> with buttonPrimary typography (11px/bold/
 * uppercase/0.12em). The parent CardActionRow (future Tier 3
 * primitive) owns the grid layout and top border; CardButton
 * handles its own padding, colours, variant styles, and the
 * border-left separator between siblings.
 *
 * The first button in a row is typically a ghost variant that spans
 * the remaining space (left-aligned via :first-child). The other
 * buttons are centered.
 *
 * Client Component — needs onClick for actions.
 */
export function CardButton({
  variant,
  keyHint,
  children,
  onClick,
}: CardButtonProps) {
  const className = [
    styles.base,
    variant && styles[variant],
    typo.buttonPrimary,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button type="button" className={className} onClick={onClick}>
      {children}
      {keyHint && (
        <span className={`${styles.keyHint} ${typo.chipSm}`}>{keyHint}</span>
      )}
    </button>
  );
}
