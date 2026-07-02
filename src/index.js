import { sendVnExpressNewsEmail } from "./job/send-news-email.job.js";
import { startEmailScheduler } from "./scheduler/email.scheduler.js";

async function main() {
  const mode = process.argv[2];

  if (mode === "schedule") {
    startEmailScheduler();
    return;
  }

  try {
    await sendVnExpressNewsEmail();
  } catch (error) {
    console.error("Automation failed:");
    console.error(error.message);
    process.exit(1);
  }
}

main();