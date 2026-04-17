import type { ReactNode } from "react";

import typo from "@/styles/typography.module.css";

import styles from "./UserChip.module.css";

type UserChipProps = {
  /**
   * Initials rendered inside the 16×16 avatar square. Typically two
   * characters (`"RA"`, `"JT"`); three will fit but may look tight at
   * the 9px avatar text size. Not validated — consumers own the format.
   */
  initials: string;
  /**
   * Identity label rendered beside the avatar. In the dashboard topbar
   * this is the on-call user's handle and role (`R.AHN · L3 ON-CALL`),
   * but consumers are free to put whatever text reads naturally next to
   * the avatar.
   */
  children: ReactNode;
};

/**
 * UserChip — topbar identity chip: 16×16 avatar + uppercase label.
 *
 * Renders a small dark avatar square with amber initials, followed by
 * the user's handle and role in dim amber. Used at the right edge of
 * the topbar to show who is currently on-call. The avatar is a
 * phosphor box — square with a subtle amber border, matching the rest
 * of the dashboard's no-rounded-shapes aesthetic.
 *
 * Unlike BrandChip, this primitive is layout-naked: the text has no
 * background of its own, so the surrounding topbar cell can provide
 * horizontal padding and vertical centring without any visual
 * consequence. That keeps UserChip drop-anywhere reusable.
 *
 * Server Component — presentational, no state or interactivity.
 */
export function UserChip({ initials, children }: UserChipProps) {
  return (
    <div className={`${styles.base} ${typo.labelLg}`}>
      <span className={`${styles.avatar} ${typo.labelXs}`}>{initials}</span>
      {children}
    </div>
  );
}
