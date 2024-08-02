import { describe, expect, test } from "vitest";
import { isExternalLink } from ".";

describe("isExternalLink", () => {
  test.each<{ href: string; external: boolean }>([
    { href: "http://example.com", external: true },
    { href: "https://example.com", external: true },
    { href: "#", external: false },
    { href: "/some/internal/page", external: false },
    { href: "mailto:john.doe@example.com", external: false },
    { href: "tel:12345678", external: false },
    { href: "data:test", external: false },
    { href: "blob:test", external: false },
  ])(`$href should be external: $external`, ({ href, external }) => {
    expect(isExternalLink(href)).toBe(external);
  });
});
