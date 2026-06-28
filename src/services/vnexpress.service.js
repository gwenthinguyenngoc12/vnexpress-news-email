import { chromium } from "playwright";
import { XMLParser } from "fast-xml-parser";
import { formatVietnameseDateTime } from "../utils/date.util.js";

import { VNEXPRESS_RSS_URL, MAX_NEWS_ITEMS } from "../constants/news.js";
import { cleanHtmlText } from "../utils/text.util.js";

function extractImageUrl(description = "") {
  const imgMatch = description.match(/<img[^>]+src=["']([^"']+)["']/i);

  if (!imgMatch) {
    return "";
  }

  return imgMatch[1];
}

export async function getLatestVnExpressNews() {
  const browser = await chromium.launch({
    headless: true,
  });

  try {
    const page = await browser.newPage();

    await page.goto(VNEXPRESS_RSS_URL, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });

    const xmlText = await page.locator("body").innerText();

    const parser = new XMLParser({
      ignoreAttributes: false,
    });

    const data = parser.parse(xmlText);

    const items = data?.rss?.channel?.item || [];

    const newsList = items.slice(0, MAX_NEWS_ITEMS).map((item, index) => {
      return {
        id: index + 1,
        title: item.title || "Không có tiêu đề",
        link: item.link || "",
        imageUrl: extractImageUrl(item.description || ""),
        description: cleanHtmlText(item.description || ""),
        publishedAt: formatVietnameseDateTime(item.pubDate || ""),
      };
    });

    return newsList;
  } finally {
    await browser.close();
  }
}