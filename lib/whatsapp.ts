/**
 * FILE: lib/whatsapp.ts
 * DESCRIPTION: Send WhatsApp confirmation messages via Twilio or Meta API
 */

interface WhatsAppData {
  phone_number: string;
  donor_name: string;
  amount: number;
  initiative: string;
}

export async function sendWhatsAppMessage(data: WhatsAppData) {
  // Using Twilio WhatsApp API (alternative: Meta WhatsApp Business API)
  const client = require('twilio')(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );

  const initiativeEmoji = {
    education: '📚',
    food: '🍚',
    women: '💪',
  };

  const initiativeName = {
    education: 'Education',
    food: 'Food for Poor',
    women: 'Women Empowerment',
  };

  const message = `
Hi ${data.donor_name},

🙏 Thank you for your donation of ₹${data.amount.toLocaleString('en-IN')} to Ramakirti Foundation!

${initiativeEmoji[data.initiative as keyof typeof initiativeEmoji]} Your support for ${initiativeName[data.initiative as keyof typeof initiativeName]} will transform lives.

✓ Receipt sent to your email
✓ Monthly impact updates coming soon

Together, we're making a difference! ❤️

Visit: https://ramakirtifoundation.co.in
  `.trim();

  try {
    await client.messages.create({
      body: message,
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:+91${data.phone_number}`,
    });
  } catch (error) {
    console.error('Failed to send WhatsApp message:', error);
    throw error;
  }
}

