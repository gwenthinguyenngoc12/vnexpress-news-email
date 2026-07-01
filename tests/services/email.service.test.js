import { describe, it, expect, vi, beforeEach } from "vitest";

const mockSendMail = vi.fn();

vi.mock("nodemailer", () => {
  return {
    default: {
      createTransport: vi.fn(() => ({
        sendMail: mockSendMail,
      })),
    },
  };
});

vi.mock("../../src/config/env.js", () => {
  return {
    env: {
      emailFrom: "sender@gmail.com",
      emailAppPassword: "fake-app-password",
      emailTo: "receiver@gmail.com",
    },
  };
});

describe("sendEmail", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should send email with correct options", async () => {
    mockSendMail.mockResolvedValue({
      messageId: "test-message-id",
    });

    const { sendEmail } = await import("../../src/services/email.service.js");

    const result = await sendEmail({
      subject: "Bản tin VnExpress mới nhất",
      html: "<h1>Xin chào</h1>",
    });

    expect(mockSendMail).toHaveBeenCalledWith({
      from: '"VnExpress News Bot" <sender@gmail.com>',
      to: "receiver@gmail.com",
      subject: "Bản tin VnExpress mới nhất",
      html: "<h1>Xin chào</h1>",
    });

    expect(result).toEqual({
      messageId: "test-message-id",
    });
  });

  it("should throw error when sending email fails", async () => {
    mockSendMail.mockRejectedValue(new Error("SMTP error"));

    const { sendEmail } = await import("../../src/services/email.service.js");

    await expect(
      sendEmail({
        subject: "Test",
        html: "<p>Test</p>",
      })
    ).rejects.toThrow("SMTP error");
  });
});