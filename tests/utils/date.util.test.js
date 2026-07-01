import {describe, it, expect} from "vitest";

import { formatVietnameseDateTime } from "../../src/utils/date.util";

describe ("formatVietnameseDateTime", () => {
    it ("should format RSS date to Vietnamese date time", () => {
        const rssDate = "Wed, 25 Jun 2026 09:45:00 +0700";
        const result = formatVietnameseDateTime(rssDate);
        expect(result).toContain("25/06/2026");
        expect(result).toContain("09:45");
    });

    it("should return fallback text when date is empty",() => {
        const result = formatVietnameseDateTime("");
        expect(result).toBe("Không rõ thời gian");
    });

    it("should return fallback text when date is invalid", () => {
        const result = formatVietnameseDateTime("invalid-date");
        expect(result).toBe("Không rõ thời gian");
    });
});