import { describe, expect, test } from "vitest";
import { isInternalLink } from ".";

describe("isInternalLink", () => {
  test.each<{ href: string; internal: boolean }>([
    // internal links
    { href: "#", internal: true },
    { href: "/some/internal/page", internal: true },
    { href: "./some/path", internal: true },
    { href: "../some/path", internal: true },
    // external links
    { href: "http://example.com", internal: false },
    { href: "https://example.com", internal: false },
    { href: "mailto:john.doe@example.com", internal: false },
    { href: "tel:12345678", internal: false },
    { href: "data:test", internal: false },
    { href: "blob:test", internal: false },
  ])(`$href should be internal: $internal`, ({ href, internal }) => {
    expect(isInternalLink(href)).toBe(internal);
  });
});
