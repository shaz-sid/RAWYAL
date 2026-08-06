import transporter from '../config/email.config.js';
import {
  leadNotificationTemplate,
  customerAutoReplyTemplate,
} from '../utils/emailTemplates.js';

// ── Simple validators ─────────────────────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME_LEN = 200;
const MAX_COMPANY_LEN = 200;
const MAX_EMAIL_LEN = 254;

function validateContactInput({ fullName, company, email }) {
  const errors = [];

  if (!fullName || typeof fullName !== 'string' || !fullName.trim()) {
    errors.push('Full name is required.');
  } else if (fullName.trim().length > MAX_NAME_LEN) {
    errors.push(`Full name must be under ${MAX_NAME_LEN} characters.`);
  }

  if (!email || typeof email !== 'string' || !email.trim()) {
    errors.push('Email is required.');
  } else if (!EMAIL_RE.test(email.trim())) {
    errors.push('A valid email address is required.');
  } else if (email.trim().length > MAX_EMAIL_LEN) {
    errors.push(`Email must be under ${MAX_EMAIL_LEN} characters.`);
  }

  if (company && typeof company === 'string' && company.trim().length > MAX_COMPANY_LEN) {
    errors.push(`Company name must be under ${MAX_COMPANY_LEN} characters.`);
  }

  return errors;
}

/**
 * Handle contact form submission
 * Sends both lead notification and customer auto-reply
 */
export const submitContactForm = async (req, res) => {
  try {
    const { fullName, company, email } = req.body;

    // Validation
    const errors = validateContactInput({ fullName, company, email });
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: errors.join(' '),
      });
    }

    // Prepare sanitized data
    const formData = {
      fullName: fullName.trim().slice(0, MAX_NAME_LEN),
      company: (company?.trim() || 'Not specified').slice(0, MAX_COMPANY_LEN),
      email: email.trim().toLowerCase().slice(0, MAX_EMAIL_LEN),
    };

    let emailSent = false;

    try {
      // Step 1: Send lead notification to business
      const leadNotification = leadNotificationTemplate(formData);
      const targetEmail = process.env.BUSINESS_EMAIL || process.env.EMAIL_USER || 'bizdev@therawyal.com';
      await transporter.sendMail({
        from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
        to: targetEmail,
        subject: leadNotification.subject,
        html: leadNotification.html,
      });

      console.log(`✓ Lead notification sent to ${targetEmail}`);

      // Step 2: Send auto-reply to customer
      const customerReply = customerAutoReplyTemplate(formData.fullName);
      await transporter.sendMail({
        from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
        to: formData.email,
        subject: customerReply.subject,
        html: customerReply.html,
        replyTo: targetEmail,
      });

      console.log(`✓ Auto-reply sent to ${formData.email}`);
      emailSent = true;
    } catch (emailErr) {
      console.warn(`⚠ Email Delivery Notice: Could not send email via SMTP (${emailErr.message}).`);
      console.log(`[NEW LEAD CAPTURED LOCALLY] Name: "${formData.fullName}", Company: "${formData.company}", Email: "${formData.email}"`);
    }

    // Success response — never leak internal details
    return res.status(200).json({
      success: true,
      message: 'Quote request submitted successfully',
      emailSent,
    });
  } catch (error) {
    console.error('Error submitting contact form:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to submit quote request. Please try again later.',
    });
  }
};
