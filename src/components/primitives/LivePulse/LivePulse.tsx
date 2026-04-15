import styles from "./LivePulse.module.css";

/**
 * LivePulse — animated indicator dot that signals a live data stream.
 *
 * Renders an inline 6px square in the nominal-green hue, pulsing its
 * opacity on a 1.6s loop. Designed to sit immediately before live-status
 * text (e.g. `<LivePulse /> WS · LIVE`).
 *
 * Server Component — no state, no event handlers, the animation runs
 * entirely in CSS. The element is presentational, so it is marked
 * `aria-hidden`; the meaning is conveyed by the adjacent text that
 * the consumer renders.
 */
export function LivePulse() {
  return <span className={styles.pulse} aria-hidden="true" />;
}
