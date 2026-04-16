"use client";

import typo from "@/styles/typography.module.css";

import styles from "./FilterChip.module.css";

type FilterChipProps = {
  /** Filter label — e.g. "ALL", "DEMAND", "LINKED", "STALE". */
  label: string;
  /** Count of items matching this filter. */
  count: number;
  /** Whether this chip is the currently selected filter. */
  active?: boolean;
  /** Called when the chip is clicked to activate this filter. */
  onClick?: () => void;
};

/**
 * FilterChip — toggle button for the roster filter bar.
 *
 * Each chip shows a label + count ("ALL 24"). The active chip gets
 * an amber fill with black text; inactive chips are muted and
 * transparent. The count renders at reduced opacity in the inactive
 * state for visual hierarchy.
 *
 * Renders as a <button> so it is keyboard-accessible and carries
 * the correct ARIA semantics. The `aria-pressed` attribute
 * communicates the toggle state to assistive technology.
 *
 * Client Component — needs onClick handler for filter toggling.
 * The parent container (future RosterHeader) owns the outer border
 * and the flex layout; FilterChip only adds a right border between
 * siblings, removed on :last-child.
 */
export function FilterChip({
  label,
  count,
  active = false,
  onClick,
}: FilterChipProps) {
  const className = [styles.base, active && styles.active, typo.labelSm]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      className={className}
      aria-pressed={active}
      onClick={onClick}
    >
      {label}
      <span className={styles.count}>{count}</span>
    </button>
  );
}
