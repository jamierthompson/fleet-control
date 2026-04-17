"use client";

import typo from "@/styles/typography.module.css";

import styles from "./FunctionKey.module.css";

type FunctionKeyProps = {
  /** The key identifier — "F1", "F2", "/", etc. */
  keyName: string;
  /** The function label — "NOW", "ROSTER", "CMD", etc. */
  label: string;
  /** Whether this key is the currently active screen. */
  active?: boolean;
  /** Called when the key is clicked to navigate. */
  onClick?: () => void;
};

/**
 * FunctionKey — footer navigation button.
 *
 * Renders a two-part button: a bold key name ("F1") in amber, and a
 * muted function label ("NOW"). The active key gets an amber fill
 * with black text for both parts, matching the filter chip pattern.
 *
 * The parent Footer container owns the overall layout (height,
 * outer borders, grid columns). FunctionKey handles its own
 * padding, colors, and the right-border separator between siblings.
 *
 * Client Component — needs onClick for screen navigation.
 */
export function FunctionKey({
  keyName,
  label,
  active = false,
  onClick,
}: FunctionKeyProps) {
  const className = [styles.base, active && styles.active, typo.chipMd]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      className={className}
      aria-pressed={active}
      onClick={onClick}
    >
      <span className={styles.key}>{keyName}</span>
      {label}
    </button>
  );
}
