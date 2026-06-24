# VnExpress News Automation

This project automatically fetches the latest 10 news articles from VnExpress and sends them via email.

## Tech Stack

- Node.js
- Playwright
- Nodemailer
- fast-xml-parser
- dotenv

## Project Structure

```bash
vnexpress-news-automation/
├── src/
│   ├── config/
│   │   └── env.js
│   ├── constants/
│   │   └── news.js
│   ├── services/
│   │   ├── vnexpress.service.js
│   │   └── email.service.js
│   ├── templates/
│   │   └── news-email.template.js
│   ├── utils/
│   │   ├── date.util.js
│   │   └── text.util.js
│   └── index.js
├── .env
├── .env.example
├── .gitignore
├── package.json
└── README.md