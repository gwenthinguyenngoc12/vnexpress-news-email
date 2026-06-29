import {describe, it, expect} from "vitest";
import { cleanHtmlText } from "../../src/utils/text.util";

describe (" cleanHtmlText",() => {
    it ("Should remove HTML tag from text ",() => {
        const html = '<a href="https://vnexpress.net"><img src="image.jpg"></a> Đây là mô tả bài viết.';
        const result = cleanHtmlText(html);
        expect(result).toBe("Đây là mô tả bài viết.");

    })

    it("should replace HTML entities with readable characters", () => {
        const html = 'Tin&nbsp;tức &amp; đời sống &quot;hôm nay&quot;';
        const result = cleanHtmlText(html);
        expect(result).toBe('Tin tức & đời sống "hôm nay"');
    })

    it("should return empty string when input is empty", () => {
        const result = cleanHtmlText("");
        expect(result).toBe("");
    })

    it("should return empty string when input undifined", () => {
        const result = cleanHtmlText();
        expect(result).toBe("");
    })
})

