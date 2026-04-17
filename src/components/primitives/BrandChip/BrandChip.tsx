import typo from "@/styles/typography.module.css";

import styles from "./BrandChip.module.css";

/**
 * BrandChip — amber product wordmark that anchors the topbar left edge.
 *
 * Renders `[■] SENTRYOS/FLEET` as a single lockup: a 6px black phosphor
 * square, the `SENTRYOS` word, a dimmed-black `/` separator, and the
 * `FLEET` word — all set in the `brandWordmark` composite typography
 * (11px / 800 / 0.12em tracking / uppercase) on an amber fill.
 *
 * The wordmark is fixed product identity, so the component takes no
 * props. Layout around it (fixed height, horizontal padding, border)
 * is intentionally owned by the parent topbar cell, not by the chip
 * itself — the chip only provides its own background, color, inline
 * layout, and inter-element gap. This matches the mockup, where a
 * cross-cutting `.topbar > *` rule drives the cell geometry.
 *
 * Server Component — no state, no interactivity. The text content is
 * the accessible label, so there is no aria-hidden on the root; only
 * the decorative square dot is marked aria-hidden.
 */
export function BrandChip() {
  const className = [styles.base, typo.brandWordmark].join(" ");

  return (
    <div className={className}>
      <span className={styles.dot} aria-hidden="true" />
      SENTRYOS<span className={styles.slash}>/</span>FLEET
    </div>
  );
}
