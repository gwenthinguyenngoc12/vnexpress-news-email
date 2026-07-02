import cron from "node-cron";

import { sendVnExpressNewsEmail } from "../job/send-news-email.job.js";

export function startEmailScheduler() {
  console.log("Email scheduler started.");
  console.log("The email will be sent every day at 08:00 AM Toronto time.");

  cron.schedule(
    "30 1 * * *",
    async () => {
      try {
        console.log("Running scheduled VnExpress email job...");
        await sendVnExpressNewsEmail();
        console.log("Scheduled email job completed.");
      } catch (error) {
        console.error("Scheduled email job failed:");
        console.error(error.message);
      }
    },
    {
      timezone: "America/Toronto",
    }
  );
}