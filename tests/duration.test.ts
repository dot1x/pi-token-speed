import { describe, expect, it } from "vitest";

import { formatDuration } from "../src/ui/duration";

describe("formatDuration", () => {
  it("shows plain seconds with one decimal below a minute", () => {
    expect(formatDuration(45.67)).toBe("45.7s");
    expect(formatDuration(0)).toBe("0.0s");
    expect(formatDuration(59.9)).toBe("59.9s");
  });

  it("shows minutes plus seconds below an hour", () => {
    expect(formatDuration(92.3)).toBe("1m 32.3s");
    expect(formatDuration(3599)).toBe("59m 59.0s");
  });

  it("shows hours plus minutes below a day", () => {
    expect(formatDuration(3600)).toBe("1h 0m");
    expect(formatDuration(7325)).toBe("2h 2m");
  });

  it("shows days plus hours at a day or more", () => {
    expect(formatDuration(86400)).toBe("1d 0h");
    expect(formatDuration(3 * 86400 + 7 * 3600)).toBe("3d 7h");
  });

  it("never renders 60.0s by rounding into the next unit", () => {
    // 59.96 rounds to 60.0 → becomes 1m 0.0s
    expect(formatDuration(59.96)).toBe("1m 0.0s");
    // 3599.97 rounds to 3600.0 → becomes 1h 0m
    expect(formatDuration(3599.97)).toBe("1h 0m");
  });

  it("clamps invalid input to zero", () => {
    expect(formatDuration(-5)).toBe("0.0s");
    expect(formatDuration(Number.NaN)).toBe("0.0s");
    expect(formatDuration(Number.POSITIVE_INFINITY)).toBe("0.0s");
  });
});
