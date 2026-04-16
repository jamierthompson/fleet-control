import typo from "@/styles/typography.module.css";

import styles from "./AgentIdBlock.module.css";

type AgentIdBlockProps = {
  /** Agent name — the primary identifier, e.g. "vuln-scanner". */
  name: string;
  /** Namespace suffix — the deployment context, e.g. "prod". */
  namespace: string;
  /** Description line — the agent's role, e.g. "Vulnerability · production dependency scan". */
  description: string;
};

/**
 * AgentIdBlock — namespaced agent identifier with a description line.
 *
 * Used in card headers to identify which agent fired the card.
 * Renders as a two-line stack: the agent ID on top (name + muted
 * namespace suffix separated by a middot), and a shorter uppercase
 * description line below.
 *
 * The middot separator between name and namespace is rendered by
 * the component — callers pass the parts separately so the display
 * concern stays internal.
 *
 * Server Component — purely presentational.
 */
export function AgentIdBlock({
  name,
  namespace,
  description,
}: AgentIdBlockProps) {
  return (
    <div className={styles.base}>
      <span className={`${styles.id} ${typo.headingLg}`}>
        {name}
        <span className={styles.namespace}>·{namespace}</span>
      </span>
      <span className={`${styles.description} ${typo.metaMd}`}>
        {description}
      </span>
    </div>
  );
}
