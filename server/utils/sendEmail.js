import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: Number(process.env.SMTP_PORT || 587) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendOtpEmail(toEmail, otp) {
  await transporter.sendMail({
    from: `"RepoNeva" <${process.env.SMTP_USER}>`,
    to: toEmail,
    subject: "Your RepoNeva login code",
    html: `
      <div style="font-family: sans-serif; padding: 24px;">
        <h2 style="color:#111;">Your login code</h2>
        <p style="color:#555;">Enter this code to log in to RepoNeva. It expires in 5 minutes.</p>
        <p style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color:#0a0a0a;">${otp}</p>
        <p style="color:#999; font-size: 12px;">If you didn't request this, you can safely ignore this email.</p>
      </div>
    `,
  });
}