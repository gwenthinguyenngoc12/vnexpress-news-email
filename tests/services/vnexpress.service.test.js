import { describe, it, expect, vi, beforeEach } from "vitest";

const mockInnerText = vi.fn();

const mockPage = {
  goto: vi.fn(),
  locator: vi.fn(() => ({
    innerText: mockInnerText,
  })),
};

const mockBrowser = {
  newPage: vi.fn(() => mockPage),
  close: vi.fn(),
};

vi.mock("playwright", () => {
  return {
    chromium: {
      launch: vi.fn(() => mockBrowser),
    },
  };
});

describe("getLatestVnExpressNews", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch, parse and return latest VnExpress news", async () => {
    const rssXml = `
      <rss>
        <channel>
          <item>
            <title>Tin số 1</title>
            <link>https://vnexpress.net/tin-so-1</link>
            <description>
              <![CDATA[
                <a href="https://vnexpress.net/tin-so-1">
                  <img src="https://example.com/image1.jpg" />
                </a>
                Đây là mô tả tin số 1.
              ]]>
            </description>
            <pubDate>Wed, 25 Jun 2026 09:45:00 +0700</pubDate>
          </item>
        </channel>
      </rss>
    `;

    mockInnerText.mockResolvedValue(rssXml);

    const { getLatestVnExpressNews } = await import(
      "../../src/services/vnexpress.service.js"
    );

    const result = await getLatestVnExpressNews();

    expect(result).toHaveLength(1);

    expect(result[0]).toMatchObject({
      id: 1,
      title: "Tin số 1",
      link: "https://vnexpress.net/tin-so-1",
      imageUrl: "https://example.com/image1.jpg",
      description: "Đây là mô tả tin số 1.",
    });

    expect(result[0].publishedAt).toContain("25/06/2026");

    expect(mockPage.goto).toHaveBeenCalled();
    expect(mockBrowser.close).toHaveBeenCalled();
  });

  it("should close browser even when error happens", async () => {
    mockPage.goto.mockRejectedValueOnce(new Error("Network error"));

    const { getLatestVnExpressNews } = await import(
      "../../src/services/vnexpress.service.js"
    );

    await expect(getLatestVnExpressNews()).rejects.toThrow("Network error");

    expect(mockBrowser.close).toHaveBeenCalled();
  });
});