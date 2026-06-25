import { chromium } from "playwright";
import { XMLParser } from "fast-xml-parser";

import { VNEXPRESS_RSS_URL, MAX_NEWS_ITEMS } from "../constants/news.js";
import { cleanHtmlText } from "../utils/text.util.js";

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
        title: item.title || "No title",
        link: item.link || "",
        description: cleanHtmlText(item.description || ""),
        publishedAt: item.pubDate || "",
      };
    });

    return newsList;
  } finally {
    await browser.close();
  }
}