import { validateEnv } from "./config/env.js";
import { EMAIL_SUBJECT_PREFIX } from "./constants/news.js";
import { getLatestVnExpressNews } from "./services/vnexpress.service.js";
import { sendEmail } from "./services/email.service.js";
import { buildNewsEmailTemplate } from "./templates/news-email.template.js";
import { getTodayDate } from "./utils/date.util.js";

async function main() {
  try {
    validateEnv();

    console.log("Starting VnExpress news automation...");

    const newsList = await getLatestVnExpressNews();

    if (!newsList.length) {
      throw new Error("No news found from VnExpress.");
    }

    const today = getTodayDate();

    const subject = `${EMAIL_SUBJECT_PREFIX} - ${today}`;

    const html = buildNewsEmailTemplate(newsList);

    await sendEmail({
      subject,
      html,
    });

    console.log(`Email sent successfully with ${newsList.length} news items.`);
  } catch (error) {
    console.error("Automation failed:");
    console.error(error.message);
    process.exit(1);
  }
}

main();