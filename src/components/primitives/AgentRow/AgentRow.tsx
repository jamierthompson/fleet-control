import { Badge } from "@/components/primitives/Badge";
import type { BadgeVariant } from "@/components/primitives/Badge/Badge";
import { StatusPip } from "@/components/primitives/StatusPip";
import type { StatusPipVariant } from "@/components/primitives/StatusPip/StatusPip";
import typo from "@/styles/typography.module.css";

import styles from "./AgentRow.module.css";

/**
 * AgentRow variant — drives the row's background tint, left accent
 * border, and text color overrides.
 *
 * Omitting the variant produces the default neutral row — no
 * background tint, no accent border. Used for nominal agents.
 */
export type AgentRowVariant = "crit" | "linked" | "stale";

type AgentRowProps = {
  /** Row variant — controls background tint and left accent. */
  variant?: AgentRowVariant;
  /**
   * StatusPip variant for the circle pip. When omitted, falls back
   * to "nominal" for a default row, or maps from the row variant.
   */
  pipVariant?: StatusPipVariant;
  /** Agent name — e.g. "vuln-scanner". */
  name: string;
  /** Namespace suffix — e.g. "prod". Some agents have none. */
  namespace?: string;
  /** Badge text — e.g. "CRIT", "NOM", "LOCK", "2 FND". */
  status: string;
  /** Badge variant — maps to Badge's variant prop. */
  statusVariant?: BadgeVariant;
};

/**
 * AgentRow — one agent in the fleet roster.
 *
 * A 3-column grid row: circle StatusPip + agent name (with optional
 * muted namespace suffix) + Badge showing current status. Signal
 * variants (crit, linked, stale) add a tinted background and a
 * colored left accent border.
 *
 * This is the first primitive that composes other primitives
 * (StatusPip and Badge). It does not handle click/selection — that
 * will live in the parent ClassGroup or Roster.
 *
 * Server Component — purely presentational.
 */
export function AgentRow({
  variant,
  pipVariant,
  name,
  namespace,
  status,
  statusVariant,
}: AgentRowProps) {
  const className = [styles.base, variant && styles[variant]]
    .filter(Boolean)
    .join(" ");

  /* Default pip variant: use the row variant if no explicit pip
     variant was passed. For default (no variant) rows, the pip
     is nominal. */
  const resolvedPipVariant: StatusPipVariant =
    pipVariant ?? variant ?? "nominal";

  return (
    <div className={className}>
      <StatusPip shape="circle" variant={resolvedPipVariant} />
      <span className={`${styles.name} ${typo.idAgent}`}>
        {name}
        {namespace && <span className={styles.namespace}>·{namespace}</span>}
      </span>
      <Badge size="sm" variant={statusVariant}>
        {status}
      </Badge>
    </div>
  );
}
