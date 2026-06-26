import dotenv from "dotenv";

dotenv.config();

export const env = {
  emailFrom: process.env.EMAIL_FROM,
  emailAppPassword: process.env.EMAIL_APP_PASSWORD,
  emailTo: process.env.EMAIL_TO,
};

export function validateEnv() {
  const missingVariables = [];

  if (!env.emailFrom) {
    missingVariables.push("EMAIL_FROM");
  }

  if (!env.emailAppPassword) {
    missingVariables.push("EMAIL_APP_PASSWORD");
  }

  if (!env.emailTo) {
    missingVariables.push("EMAIL_TO");
  }

  if (missingVariables.length > 0) {
    throw new Error(
      `Missing environment variables: ${missingVariables.join(", ")}`
    );
  }
}