/**
 * FILE: lib/pdf-generator.ts
 * DESCRIPTION: Generate 80G tax-exempt receipt PDF
 * DEPENDENCIES: jsPDF, html2pdf, or puppeteer
 */

import { jsPDF } from 'jspdf';

interface ReceiptData {
  donor_name: string;
  donor_email: string;
  amount: number;
  initiative: string;
  receipt_number: string;
  pan_number?: string;
  payment_date: Date;
}

export async function generateReceiptPDF(data: ReceiptData): Promise<Buffer> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageHeight = doc.internal.pageSize.getHeight();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;
  let yPosition = margin;

  // Header
  doc.setFillColor(101, 26, 22); // Brand Crimson
  doc.rect(0, 0, pageWidth, 40, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.text('RAMAKIRTI FOUNDATION', pageWidth / 2, 15, { align: 'center' });

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('80G(5)(vi) Registered Charitable Trust', pageWidth / 2, 25, {
    align: 'center',
  });
  doc.text('Gurgaon, Haryana, India', pageWidth / 2, 32, { align: 'center' });

  yPosition = 50;

  // Receipt title
  doc.setTextColor(101, 26, 22); // Brand Crimson
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('DONATION RECEIPT', margin, yPosition);

  yPosition += 12;

  // Donor details
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');

  const details = [
    ['Receipt Number:', data.receipt_number],
    ['Date of Donation:', data.payment_date.toLocaleDateString('en-IN')],
    ['Donor Name:', data.donor_name],
    ['Email:', data.donor_email],
    ['PAN (if applicable):', data.pan_number || 'Not provided'],
  ];

  details.forEach(([label, value]) => {
    doc.setFont('helvetica', 'bold');
    doc.text(label, margin, yPosition);
    doc.setFont('helvetica', 'normal');
    doc.text(value || '', margin + 60, yPosition);
    yPosition += 8;
  });

  yPosition += 10;

  // Donation summary box
  doc.setFillColor(251, 245, 224); // Light gold wash
  doc.setDrawColor(201, 168, 76); // Gold border
  doc.setLineWidth(1);
  doc.rect(margin, yPosition, pageWidth - 2 * margin, 30, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('DONATION SUMMARY', margin + 5, yPosition + 7);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(
    'Initiative:',
    margin + 5,
    yPosition + 16
  );
  doc.setFont('helvetica', 'bold');
  const initiativeName = {
    education: 'Education',
    food: 'Food Distribution',
    women: 'Women Empowerment',
  };
  doc.text(
    initiativeName[data.initiative as keyof typeof initiativeName] || 'General Fund',
    margin + 50,
    yPosition + 16
  );

  doc.setFont('helvetica', 'normal');
  doc.text('Donation Amount:', margin + 5, yPosition + 24);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(201, 168, 76); // Gold
  doc.text(
    `₹${data.amount.toLocaleString('en-IN')}`,
    margin + 50,
    yPosition + 24
  );

  yPosition += 40;

  // Tax exemption clause
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('80G TAX EXEMPTION', margin, yPosition);

  yPosition += 7;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);

  const taxText = [
    'This donation is exempt from income tax under Section 80G(5)(vi) of the',
    'Indian Income Tax Act, 1961. As per Section 80G(5)(vi), the donor can claim',
    'a deduction of up to 50% of the donation amount from the adjusted gross income.',
    '',
    'Please keep this receipt for income tax filing. The donor must provide their',
    'PAN to claim tax exemption. For Corporate donations, CSR compliance may apply.',
  ];

  taxText.forEach((line) => {
    doc.text(line, margin, yPosition);
    yPosition += 5;
  });

  yPosition += 10;

  // Impact statement
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('YOUR IMPACT', margin, yPosition);

  yPosition += 6;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);

  const impactTexts = {
    education: `Your donation of ₹${data.amount.toLocaleString('en-IN')} will provide educational materials,
scholarships, and support for approximately ${Math.floor(data.amount / 500)} underprivileged children.`,
    food: `Your donation of ₹${data.amount.toLocaleString('en-IN')} will provide nutritious meals and
essential items for approximately ${Math.floor(data.amount / 250)} children and families in need.`,
    women: `Your donation of ₹${data.amount.toLocaleString('en-IN')} will support skills training, awareness
programs, and empowerment initiatives for women in our community.`,
  };

  const impactText = impactTexts[data.initiative as keyof typeof impactTexts];
  doc.text(impactText, margin, yPosition, { maxWidth: pageWidth - 2 * margin });

  yPosition += 30;

  // Footer
  yPosition = pageHeight - margin - 20;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(107, 114, 128);

  const footerText = [
    'Ramakirti Foundation | CIN: [Registration Number]',
    '89 FF Housing Board Society, Sector 33, Gurgaon, Haryana 122022',
    'Email: support@ramakirtifoundation.co.in | Phone: +91 88515 02840',
    'Website: https://ramakirtifoundation.co.in',
  ];

  footerText.forEach((line, index) => {
    doc.text(line, pageWidth / 2, yPosition + index * 5, { align: 'center' });
  });

  return Buffer.from(doc.output('arraybuffer'));
}

/**
 * ENVIRONMENT VARIABLES REQUIRED (.env.local):
 * 
 * # Razorpay
 * NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_XXXXX
 * RAZORPAY_KEY_SECRET=xxxxxxxxxxxx
 * 
 * # Email (Gmail / SendGrid / AWS SES)
 * EMAIL_USER=support@ramakirtifoundation.co.in
 * EMAIL_PASSWORD=your_app_password
 * 

 * 
 * # Database
 * DATABASE_URL=postgresql://user:password@localhost:5432/ramakirti
 */
