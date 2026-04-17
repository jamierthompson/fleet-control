import typo from "@/styles/typography.module.css";

import styles from "./ConfidenceChip.module.css";

/**
 * Confidence tier — determined by the percentage value.
 *
 * - `high`     (≥ 90%) → bright amber  (`--text-confidence-high`)
 * - `standard` (75–89%) → amber        (`--text-confidence-standard`)
 * - `below`    (< 75%) → dim amber     (`--text-confidence-below`)
 *
 * The tier is computed automatically from `value`, never passed
 * as a prop — there is exactly one correct tier for any given
 * percentage.
 */
type ConfidenceTier = "high" | "standard" | "below";

type ConfidenceChipProps = {
  /** Confidence percentage (0–100). Drives the color tier. */
  value: number;
  /**
   * Previous confidence percentage. When present, the chip renders
   * a delta suffix showing the direction of change and the prior
   * value: "↑ from 62%".
   */
  previousValue?: number;
};

/**
 * Derives the display tier from a confidence percentage.
 *
 * The thresholds (90, 75) match the autonomy decision boundaries
 * described in the fleet-control spec — an agent at ≥ 90% confidence
 * can take certain auto-actions, while < 75% triggers the "below
 * threshold" visual treatment.
 */
function getTier(value: number): ConfidenceTier {
  if (value >= 90) return "high";
  if (value >= 75) return "standard";
  return "below";
}

/**
 * ConfidenceChip — inline confidence percentage with tier coloring.
 *
 * Used in card headers (`CONF 94%`) and finding headers where it can
 * also show a delta from a previous value (`CONF 87% ↑ from 62%`).
 *
 * The "CONF" label uses labelMd typography (uppercase, muted). The
 * percentage value steps up to labelLg for emphasis, colored by the
 * computed tier. The optional delta uses caption typography at a
 * subdued weight.
 *
 * Server Component — the tier is pure computation, no client APIs.
 */
export function ConfidenceChip({ value, previousValue }: ConfidenceChipProps) {
  const tier = getTier(value);

  /* Direction arrow for the delta — up when value increased, down
     when it decreased. Equal values get no arrow (edge case, but
     handled cleanly). */
  const showDelta = previousValue !== undefined;
  const deltaArrow =
    showDelta && value > previousValue! ? "↑" : showDelta ? "↓" : null;

  return (
    <span className={`${styles.base} ${typo.labelMd}`}>
      CONF{" "}
      <span className={`${styles.value} ${styles[tier]} ${typo.labelLg}`}>
        {value}%
      </span>
      {showDelta && (
        <span className={`${styles.delta} ${typo.caption}`}>
          {deltaArrow} from {previousValue}%
        </span>
      )}
    </span>
  );
}
