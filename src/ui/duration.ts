/**
 * Formats an elapsed duration using the largest sensible units, showing at
 * most two components:
 *
 * - `< 1 min`   → `45.6s`
 * - `< 1 hour`  → `5m 32.4s`
 * - `< 1 day`   → `2h 5m`
 * - `>= 1 day`  → `3d 7h`
 *
 * Seconds keep one decimal digit; larger units are integers. The value is
 * rounded to 0.1s before decomposition so the display never shows `60.0s`.
 *
 * @param seconds Elapsed time in seconds (fractional values allowed).
 * @returns The formatted duration string.
 */
export function formatDuration(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0.0s";

  const total = Math.round(seconds * 10) / 10;

  if (total < 60) return `${total.toFixed(1)}s`;

  const days = Math.floor(total / 86400);
  const hours = Math.floor((total % 86400) / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const secs = total % 60;

  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m ${secs.toFixed(1)}s`;
}
