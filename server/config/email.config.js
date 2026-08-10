import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const emailUser = process.env.EMAIL_USER || 'bizdev@therawyal.com';
const rawPass = process.env.EMAIL_PASSWORD || '';
const smtpHost = process.env.SMTP_HOST || 'smtp.hostinger.com';
const smtpPort = parseInt(process.env.SMTP_PORT || '465', 10);

// Use exact password or sanitized version if Gmail
const emailPass = smtpHost.includes('gmail')
  ? rawPass.replace(/[\s-]/g, '')
  : rawPass.trim();

// Create transporter for email sending
const transporter = nodemailer.createTransport(
  smtpHost.includes('gmail')
    ? {
        service: 'gmail',
        auth: {
          user: emailUser,
          pass: emailPass,
        },
      }
    : {
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: emailUser,
          pass: emailPass,
        },
      }
);

// Verify connection
transporter.verify((error) => {
  if (error) {
    console.error(`Email configuration error (${emailUser} @ ${smtpHost}:${smtpPort}):`, error.message);
    if (error.message.includes('535') || error.message.includes('BadCredentials') || error.message.includes('Invalid login')) {
      console.error('💡 Hint: Please verify your Hostinger email address and password in .env');
    }
  } else {
    console.log(`✓ Email service ready via ${smtpHost} for ${process.env.BUSINESS_EMAIL || emailUser}`);
  }
});

export default transporter;
