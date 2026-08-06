import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const emailUser = process.env.EMAIL_USER || '';
const emailPass = process.env.EMAIL_PASSWORD ? process.env.EMAIL_PASSWORD.replace(/[\s-]/g, '') : '';
const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
const smtpPort = parseInt(process.env.SMTP_PORT || '465', 10);

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
          pass: process.env.EMAIL_PASSWORD ? process.env.EMAIL_PASSWORD.trim() : '',
        },
      }
);

// Verify connection
transporter.verify((error, success) => {
  if (error) {
    console.error(`Email configuration error (${emailUser}):`, error.message);
    if (error.message.includes('535') || error.message.includes('BadCredentials')) {
      console.error('💡 Hint: Please generate a new 16-character App Password at https://myaccount.google.com/apppasswords');
    }
  } else {
    console.log(`✓ Email service ready for ${process.env.BUSINESS_EMAIL || emailUser}`);
  }
});

export default transporter;

