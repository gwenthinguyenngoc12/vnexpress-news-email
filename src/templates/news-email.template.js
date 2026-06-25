export function buildNewsEmailTemplate(newsList) {
  const newsItemsHtml = newsList
    .map((news) => {
      return `
        <li style="margin-bottom: 20px;">
          <h3 style="margin: 0 0 8px 0;">
            ${news.id}. 
            <a href="${news.link}" target="_blank" style="color: #0055cc; text-decoration: none;">
              ${news.title}
            </a>
          </h3>

          <p style="margin: 0 0 6px 0; color: #333;">
            ${news.description}
          </p>

          <p style="margin: 0; color: #777; font-size: 13px;">
            Published at: ${news.publishedAt}
          </p>
        </li>
      `;
    })
    .join("");

  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2 style="color: #222;">Top 10 tin mới nhất từ VnExpress</h2>

      <p style="color: #555;">
        Email này được gửi tự động bởi Node.js, Playwright và Nodemailer.
      </p>

      <ol style="padding-left: 20px;">
        ${newsItemsHtml}
      </ol>
    </div>
  `;
}