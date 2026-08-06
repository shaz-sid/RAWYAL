/**
 * Escape HTML special characters to prevent XSS in email templates.
 */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Email template for lead notification to business
 */
export const leadNotificationTemplate = (formData) => {
  const fullName = escapeHtml(formData.fullName);
  const company = escapeHtml(formData.company);
  const email = escapeHtml(formData.email);

  return {
    subject: `New Quote Request - ${formData.company || 'Unknown'}`,
    html: `
<div style="background-color: #f4f4f4; padding: 20px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; margin: 0;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 4px; overflow: hidden; border: 1px solid #eeeeee;">
        <!-- Header -->
        <tr>
            <td style="background-color: #082c6c; padding: 30px 20px; text-align: left; border-bottom: 4px solid #d4af37;">
                <h1 style="margin: 0; color: #d4af37; font-size: 24px; letter-spacing: 2px; text-transform: uppercase;">RAWYAL</h1>
                <p style="margin: 5px 0 0 0; color: #ffffff; font-size: 10px; letter-spacing: 1px; text-transform: uppercase; opacity: 0.8;">Internal Notification</p>
            </td>
        </tr>
        
        <!-- Body -->
        <tr>
            <td style="padding: 40px 30px; background-color: #ffffff;">
                <h2 style="margin: 0 0 20px 0; font-size: 20px; color: #082c6c;">New Quote Request</h2>
                <p style="margin: 0 0 25px 0; font-size: 15px; color: #555555;">A new potential partner has submitted a request through the portal.</p>
                
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f9f9f7; border-left: 3px solid #d4af37; padding: 25px; margin-bottom: 30px;">
                    <tr>
                        <td style="padding-bottom: 20px;">
                            <span style="font-size: 11px; text-transform: uppercase; color: #999999; letter-spacing: 1px; font-weight: bold;">Full Name</span><br>
                            <span style="font-size: 16px; color: #082c6c; font-weight: bold;">${fullName}</span>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-bottom: 20px;">
                            <span style="font-size: 11px; text-transform: uppercase; color: #999999; letter-spacing: 1px; font-weight: bold;">Company</span><br>
                            <span style="font-size: 16px; color: #082c6c; font-weight: bold;">${company}</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span style="font-size: 11px; text-transform: uppercase; color: #999999; letter-spacing: 1px; font-weight: bold;">Email Address</span><br>
                            <span style="font-size: 16px; color: #082c6c; font-weight: bold;">${email}</span>
                        </td>
                    </tr>
                </table>
                
                <hr style="border: 0; border-top: 1px solid #eeeeee; margin: 30px 0;">
                
                
            </td>
        </tr>
    </table>
</div>
    `,
  };
};

/**
 * Email template for customer auto-reply
 */
export const customerAutoReplyTemplate = (customerName) => {
  const safeName = escapeHtml(customerName);

  return {
    subject: `We've received your request — The Rawyal`,
    html: `
<div style="background-color: #f4f4f4; padding: 20px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; margin: 0;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 4px; overflow: hidden; border: 1px solid #eeeeee;">
        <!-- Header -->
        <tr>
            <td style="background-color: #082c6c; padding: 30px 20px; text-align: left; border-bottom: 4px solid #d4af37;">
                <h1 style="margin: 0; color: #d4af37; font-size: 24px; letter-spacing: 2px; text-transform: uppercase;">RAWYAL</h1>
                <p style="margin: 5px 0 0 0; color: #ffffff; font-size: 10px; letter-spacing: 1px; text-transform: uppercase; opacity: 0.8;">E-Commerce Without Borders</p>
            </td>
        </tr>
        
        <!-- Body -->
        <tr>
            <td style="padding: 40px 30px; background-color: #ffffff;">
                <h2 style="margin: 0 0 20px 0; font-size: 22px; color: #082c6c;">Hi ${safeName},</h2>
                
                <p style="margin: 0 0 15px 0; color: #444444; font-size: 16px; line-height: 1.6;">
                    Thank you for reaching out to <strong>RAWYAL</strong>. We've successfully received your request for a quote.
                </p>
                
                
                
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f9f9f7; border-left: 3px solid #d4af37; padding: 20px; margin: 25px 0;">
                    <tr>
                        <td>
                            <p style="margin: 0; font-size: 14px; color: #082c6c;">
                                <strong>Next Step:</strong> Our team will contact you via email to discuss your requirements.
                            </p>
                        </td>
                    </tr>
                </table>
                
                <p style="margin: 35px 0 0 0; color: #666666; font-size: 14px; line-height: 1.8;">
                    Best Regards,<br>
                    <strong style="color: #082c6c;">Team RAWYAL</strong><br>
                   
                </p>
            </td>
        </tr>
    </table>
</div>
    `,
  };
};
