import type { ReactNode } from "react";

import typo from "@/styles/typography.module.css";

import styles from "./KeyValueRow.module.css";

type KeyValueRowProps = {
  /** Plain-text label rendered as a <dt>. Always uppercase via labelSm. */
  label: string;
  /**
   * The value content rendered as a <dd>. Accepts mixed content —
   * plain text, <code>, <b>, or any inline element. The mockup uses
   * <code> for identifiers and <b> for amber-accented keywords, so
   * KeyValueRow.module.css styles those descendants accordingly.
   */
  children: ReactNode;
};

/**
 * KeyValueRow — one label/value pair inside a card body field grid.
 *
 * Renders a bare <dt> + <dd> fragment (no wrapping element) so it
 * can sit inside a parent <dl> that owns the grid layout. The grid
 * columns, gap, and alignment are the responsibility of the future
 * FieldGrid primitive — KeyValueRow only handles the content and
 * typography of a single row.
 *
 * Server Component — purely presentational, no client APIs needed.
 */
export function KeyValueRow({ label, children }: KeyValueRowProps) {
  return (
    <>
      <dt className={`${styles.label} ${typo.labelSm}`}>{label}</dt>
      <dd className={`${styles.value} ${typo.bodySm}`}>{children}</dd>
    </>
  );
}
