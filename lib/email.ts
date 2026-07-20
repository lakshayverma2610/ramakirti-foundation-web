/**
 * FILE: lib/email.ts
 * DESCRIPTION: Send receipt emails with 80G tax exemption details
 * DEPENDENCIES: nodemailer or SendGrid
 */

import nodemailer from 'nodemailer';
import { generateReceiptPDF } from './pdf-generator';

interface ReceiptEmailData {
  donor_name: string;
  donor_email: string;
  amount: number;
  initiative: string;
  receipt_number: string;
  pan_number?: string;
  payment_date: Date;
}

export async function sendReceiptEmail(data: ReceiptEmailData) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.hostinger.com',
    port: parseInt(process.env.EMAIL_PORT || '465', 10),
    secure: process.env.EMAIL_SECURE !== 'false',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Generate PDF receipt
  const pdfBuffer = await generateReceiptPDF(data);

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: 'Roboto', sans-serif; color: #1F2937; }
          .header { background: linear-gradient(135deg, #651A16 0%, #C9A84C 100%); color: white; padding: 30px; text-align: center; }
          .content { padding: 30px; }
          .donation-summary { background: #F0FDF4; border: 2px solid #C9A84C; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .summary-row { display: flex; justify-content: space-between; padding: 10px 0; }
          .amount { font-size: 28px; font-weight: bold; color: #C9A84C; }
          .tax-badge { background: #FEF3C7; border-left: 4px solid #C9A84C; padding: 15px; margin: 20px 0; }
          .footer { text-align: center; color: #6B7280; font-size: 12px; margin-top: 30px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Ramakirti Foundation</h1>
          <p>Transforming Lives Through Education, Food & Women Empowerment</p>
        </div>

        <div class="content">
          <p>Dear ${data.donor_name},</p>

          <p>Thank you for your generous donation to Ramakirti Foundation! Your contribution will directly impact lives in our community.</p>

          <div class="donation-summary">
            <div class="summary-row">
              <span>Receipt Number:</span>
              <strong>${data.receipt_number}</strong>
            </div>
            <div class="summary-row">
              <span>Donation Date:</span>
              <strong>${data.payment_date.toLocaleDateString('en-IN')}</strong>
            </div>
            <div class="summary-row">
              <span>Initiative:</span>
              <strong>${data.initiative === 'education' ? '📚 Education' : data.initiative === 'food' ? '🍚 Food for Poor' : '💪 Women Empowerment'}</strong>
            </div>
            <div class="summary-row">
              <span>Donation Amount:</span>
              <span class="amount">₹${data.amount.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div class="tax-badge">
            <strong>🔏 80G Tax Exemption</strong>
            <p>This donation is exempt from income tax under Section 80G(5)(vi) of the Indian Income Tax Act. You can claim a deduction up to 50% of your adjusted gross income.</p>
            <p><strong>PAN for 80G:</strong> ${data.pan_number ? data.pan_number : 'Not provided - email us to add it for future donations'}</p>
          </div>

          <h3>Your Impact:</h3>
          <p>
            ${
              data.initiative === 'education'
                ? `₹${data.amount.toLocaleString('en-IN')} will provide educational materials and support for ${Math.floor(data.amount / 500)} underprivileged children.`
                : data.initiative === 'food'
                  ? `₹${data.amount.toLocaleString('en-IN')} will provide nutritious meals for approximately ${Math.floor(data.amount / 250)} children and families.`
                  : `₹${data.amount.toLocaleString('en-IN')} will support skills training and empowerment programs for women in our community.`
            }
          </p>

          <p>
            <strong>Next Steps:</strong><br>
            1. Your receipt PDF is attached (save for tax filing)<br>
            2. You'll receive monthly impact updates at this email<br>
            3. You can view your donation on our website anytime
          </p>

          <div class="footer">
            <p>Ramakirti Foundation | Sector 33, Gurgaon, Haryana 122022</p>
            <p>Email: support@ramakirtifoundation.co.in | Phone: +91 88515 02840</p>
            <p><a href="https://ramakirtifoundation.co.in" style="color: #C9A84C; text-decoration: none;">Visit our website</a></p>
          </div>
        </div>
      </body>
    </html>
  `;

  await transporter.sendMail({
    from: 'support@ramakirtifoundation.co.in',
    to: data.donor_email,
    subject: `Donation Receipt - ₹${data.amount.toLocaleString('en-IN')} | Ramakirti Foundation`,
    html: htmlContent,
    attachments: [
      {
        filename: `Ramakirti_Receipt_${data.receipt_number}.pdf`,
        content: pdfBuffer,
        contentType: 'application/pdf',
      },
    ],
  });
}

