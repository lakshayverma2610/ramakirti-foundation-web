import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sendReceiptEmail } from '@/lib/email';
import { sendWhatsAppMessage } from '@/lib/whatsapp';

export async function POST(req: NextRequest) {
  try {
    const {
      amount,
      initiative,
      donor_name,
      donor_email,
      donor_phone,
      pan_number,
      transaction_id,
    } = await req.json();

    // Save donation to database
    let dbDonation = null;
    try {
      dbDonation = await db.donation.create({
        data: {
          donor_name: donor_name,
          donor_email: donor_email,
          donor_phone: donor_phone || '',
          amount: parseFloat(amount),
          initiative,
          payment_method: 'qr_code_manual',
          status: 'success', // We assume success on manual submission for now, could be 'pending' if manual verification is needed
          receipt_sent: true,
          // razorpay fields are optional now
        },
      });
    } catch (dbError) {
      console.error('Failed to save donation to database:', dbError);
    }

    const receiptNumber = dbDonation?.id || `RF-MANUAL-${Date.now()}`;

    // Send receipt email with PDF attachment (fire-and-forget, async)
    if (donor_email) {
      sendReceiptEmail({
        donor_name: donor_name,
        donor_email: donor_email,
        amount: parseFloat(amount),
        initiative,
        receipt_number: receiptNumber,
        pan_number: pan_number || undefined,
        payment_date: new Date(),
      }).catch((error) => {
        console.error('Failed to send receipt email:', error);
      });
    }

    // Send WhatsApp notification if credentials exist and number is present
    if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && donor_phone) {
      sendWhatsAppMessage({
        phone_number: donor_phone,
        donor_name: donor_name,
        amount: parseFloat(amount),
        initiative,
      }).catch((error) => {
        console.error('Failed to send WhatsApp message:', error);
      });
    }

    return NextResponse.json({
      success: true,
      donation_id: receiptNumber,
      message: 'Donation submitted successfully.',
    });
  } catch (error) {
    console.error('Manual submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit donation. Please try again.' },
      { status: 500 }
    );
  }
}
