import nodemailer from "nodemailer";

import { env } from "../config/env.js";

export async function sendEmail({ subject, html }) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: env.emailFrom,
      pass: env.emailAppPassword,
    },
  });

  const mailOptions = {
    from: `"VnExpress News Bot" <${env.emailFrom}>`,
    to: env.emailTo,
    subject,
    html,
  };

  const result = await transporter.sendMail(mailOptions);

  return result;
}