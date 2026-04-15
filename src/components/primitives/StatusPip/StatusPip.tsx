import styles from "./StatusPip.module.css";

/**
 * StatusPip variant — the qualitative status the pip is signalling.
 *
 * Omitting the variant renders the muted "no signal" default, used
 * at the head of agent class groups when nothing in the group is
 * degraded. The four explicit variants map 1:1 to the dashboard's
 * signal colors (crit / linked / stale / nominal) and reuse the
 * same vocabulary as the surrounding semantic tokens.
 */
export type StatusPipVariant = "crit" | "linked" | "nominal" | "stale";

/**
 * StatusPip size.
 *
 * - `xs` (6px) — default. Used inline in agent rows, class-group
 *   headers, and anywhere a pip needs to sit beside body-size text.
 * - `sm` (8px) — slightly larger. Used in the posture pill, where
 *   the indicator is the dominant visual element of the row.
 */
export type StatusPipSize = "xs" | "sm";

type StatusPipProps = {
  variant?: StatusPipVariant;
  size?: StatusPipSize;
};

/**
 * StatusPip — small square indicator dot for agent and group status.
 *
 * Server Component. The element is presentational — its meaning is
 * always carried by adjacent text (the agent ID, the class label,
 * the posture name) — so it is marked `aria-hidden`. Crit and
 * linked variants render with a phosphor-style halo; nominal and
 * stale are flat; passing no variant produces the muted gray
 * default.
 */
export function StatusPip({ variant, size = "xs" }: StatusPipProps) {
  const variantClass = variant ? styles[variant] : "";
  const className = `${styles.pip} ${styles[size]} ${variantClass}`.trimEnd();

  return <span className={className} aria-hidden="true" />;
}
