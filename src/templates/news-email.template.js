export function buildNewsEmailTemplate(newsList) {
  const newsItemsHtml = newsList
    .map((news) => {
      const imageHtml = news.imageUrl
        ? `
          <div style="margin: 12px 0;">
            <img 
              src="${news.imageUrl}" 
              alt="${news.title}" 
              style="width: 100%; max-width: 520px; height: auto; border-radius: 8px; display: block;"
            />
          </div>
        `
        : "";

      return `
        <div style="padding: 18px 0; border-bottom: 1px solid #e5e5e5;">
          <h3 style="margin: 0 0 10px 0; color: #222; font-size: 18px;">
            ${news.id}. ${news.title}
          </h3>

          ${imageHtml}

          <p style="margin: 0 0 10px 0; color: #444; font-size: 15px; line-height: 1.6;">
            ${news.description}
          </p>

          <p style="margin: 0 0 10px 0; color: #777; font-size: 13px;">
            Thời gian đăng: ${news.publishedAt}
          </p>

          <a 
            href="${news.link}" 
            target="_blank"
            style="
              display: inline-block;
              padding: 8px 14px;
              background-color: #b00020;
              color: white;
              text-decoration: none;
              border-radius: 6px;
              font-size: 14px;
            "
          >
            Đọc bài viết
          </a>
        </div>
      `;
    })
    .join("");

  return `
    <div style="margin: 0; padding: 0; background-color: #f5f5f5;">
      <div style="
        max-width: 680px;
        margin: 0 auto;
        background-color: #ffffff;
        padding: 24px;
        font-family: Arial, sans-serif;
      ">
        <div style="border-bottom: 3px solid #b00020; padding-bottom: 16px; margin-bottom: 20px;">
          <h1 style="margin: 0; color: #b00020; font-size: 26px;">
            Tin mới nhất từ VnExpress
          </h1>

          <p style="margin: 8px 0 0 0; color: #555; font-size: 15px;">
            Dưới đây là 10 tin tức mới nhất được hệ thống tự động tổng hợp từ VnExpress.
          </p>
        </div>

        ${newsItemsHtml}

        <div style="margin-top: 24px; padding-top: 16px; color: #777; font-size: 13px; text-align: center;">
          <p style="margin: 0;">
            Email này được gửi tự động bởi hệ thống VnExpress News Automation.
          </p>
        </div>
      </div>
    </div>
  `;
}