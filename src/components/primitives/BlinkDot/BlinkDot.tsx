import styles from "./BlinkDot.module.css";

/**
 * BlinkDot — inline indicator dot that blinks on a 1.05s 2-step loop.
 *
 * Designed to sit at the start of an attention-grabbing Badge — the
 * `NOW · CRIT` badge on the dashboard and the `PROPOSED` badge on
 * the permissions screen both use one. The dot's background is
 * `currentColor`, so it inherits the surrounding text color
 * automatically and does not need to know which badge variant it
 * is sitting inside.
 *
 * Server Component; presentational (`aria-hidden`). The animation
 * is pure CSS and no client boundary is needed. The 2-step keyframe
 * (a hard on/off rather than a smooth fade) is what makes this
 * read as a more urgent signal than LivePulse.
 */
export function BlinkDot() {
  return <span className={styles.blink} aria-hidden="true" />;
}
