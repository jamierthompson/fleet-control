import { Fragment } from "react";

import typo from "@/styles/typography.module.css";

import styles from "./BreadcrumbPath.module.css";

type BreadcrumbPathProps = {
  /**
   * Parent segments rendered before the current page, joined with a
   * hierarchical `›` separator. Leave empty for a root view.
   */
  ancestors?: string[];
  /**
   * The currently-viewed page. Rendered in primary-text colour and
   * marked with `aria-current="page"` for screen readers.
   */
  current: string;
  /**
   * Sibling views alongside the current one, joined with `·`
   * separators. These read as "other views at this level," not as
   * parents. Leave empty when there are no sibling views to list.
   */
  siblings?: string[];
};

/**
 * BreadcrumbPath — topbar navigation lockup.
 *
 * Renders a breadcrumb + sibling-list in a single line, e.g.
 *
 *     CONTROL › NOW · LOG · REPLAY · PERMISSIONS · COMPLIANCE
 *
 * Three colour roles — ancestors are dim amber (they led to here),
 * the current page is bright primary text (we are here), and siblings
 * are muted grey (you could be there instead). Separators use the
 * tertiary text colour so they fade into the background — the labels
 * are what the eye should track.
 *
 * Emits a semantic `<nav>` with `aria-current="page"` on the active
 * segment. Layout-naked: the surrounding topbar cell owns horizontal
 * padding and vertical centring. Server Component.
 */
export function BreadcrumbPath({
  ancestors = [],
  current,
  siblings = [],
}: BreadcrumbPathProps) {
  return (
    <nav className={`${styles.base} ${typo.navPath}`}>
      {ancestors.map((segment) => (
        <Fragment key={`ancestor-${segment}`}>
          <span className={styles.ancestor}>{segment}</span>
          <span className={styles.separator} aria-hidden="true">
            ›
          </span>
        </Fragment>
      ))}
      <span className={styles.current} aria-current="page">
        {current}
      </span>
      {siblings.map((segment) => (
        <Fragment key={`sibling-${segment}`}>
          <span className={styles.separator} aria-hidden="true">
            ·
          </span>
          <span className={styles.sibling}>{segment}</span>
        </Fragment>
      ))}
    </nav>
  );
}
