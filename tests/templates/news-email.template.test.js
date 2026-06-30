import { describe, it, expect } from "vitest";

import { buildNewsEmailTemplate } from "../../src/templates/news-email.template";

describe("buildNewsEmailTemplate", () => {
    it("should generate Vietnamese email HTML with news data", () => {
        const newList = [
            {
                id: 1,
                title: "Tiêu đề tin tức",
                link: "https://vnexpress.net/test-news",
                imageUrl: "https://example.com/image.jpg",
                description: "Đây là mô tả bài viết.",
                publishedAt: "09:45, Thứ Tư, 25/06/2026",
            },
        ];
        const html = buildNewsEmailTemplate(newList);

        expect(html).toContain('Bản tin VnExpress mới nhất');
        expect(html).toContain('Tiêu đề tin tức');
        expect(html).toContain('Đây là mô tả bài viết.');
        expect(html).toContain('09:45, Thứ Tư, 25/06/2026');
        expect(html).toContain('https://vnexpress.net/test-news');
        expect(html).toContain('https://example.com/image.jpg');
        expect(html).toContain("Đọc bài viết");
    });

    it("should not render image tag when imageUrl is empty", () => {
        const newList = [
            {
                id: 1,
                title: "Tiêu đề tin tức",
                link: "https://vnexpress.net/test-news",
                imageUrl: "",
                description: "Mô tả không có ảnh.",
                publishedAt: "Không rõ thời gian",
            },
        ];
        const html = buildNewsEmailTemplate(newList);

        expect(html).toContain('Tin không có ảnh');
        expect(html).not.toContain("<img");
    });    
});