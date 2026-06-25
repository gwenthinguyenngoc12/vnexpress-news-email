import fs from "fs";

import { buildNewsEmailTemplate } from "./templates/news-email.template.js";

const sampleNews = [
  {
    id: 1,
    title: "Giá vàng trong nước tiếp tục tăng",
    link: "https://vnexpress.net",
    imageUrl: "https://i1-vnexpress.vnecdn.net/2024/01/01/sample.jpg",
    description:
      "Giá vàng miếng trong nước sáng nay tăng mạnh theo xu hướng thế giới, trong khi tỷ giá USD biến động nhẹ.",
    publishedAt: "09:45, Thứ Tư, 25/06/2026",
  },
  {
    id: 2,
    title: "Tuyển Việt Nam chuẩn bị cho trận đấu tiếp theo",
    link: "https://vnexpress.net",
    imageUrl: "https://i1-vnexpress.vnecdn.net/2024/01/01/sample.jpg",
    description:
      "Huấn luyện viên cho biết đội tuyển đang tập trung cải thiện thể lực và chiến thuật trước trận đấu quan trọng.",
    publishedAt: "09:45, Thứ Tư, 25/06/2026",
  },
];

const html = buildNewsEmailTemplate(sampleNews);

fs.writeFileSync("preview.html", html, "utf8");

console.log("Đã tạo file preview.html");