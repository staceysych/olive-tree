import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, phone, location, basket, deliveryPreference, promotion, notes } = await request.json();

    const data = await resend.emails.send({
      from: 'Olive Tree <onboarding@resend.dev>',
      to: process.env.YOUR_EMAIL_ADDRESS as string,
      subject: `New Order from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <h2 style="color: #2e7d32; text-align: center;">New Order Received</h2>
          
          <div style="background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h3 style="color: #333; margin-bottom: 15px;">Customer Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Location:</strong> ${location}</p>
            
            <h3 style="color: #333; margin-top: 20px; margin-bottom: 15px;">Order Details</h3>
            <p><strong>Basket Type:</strong> ${basket}</p>
            <p><strong>Delivery Preference:</strong> ${deliveryPreference}</p>
            <p><strong>Promotion Selected:</strong> ${promotion}</p>
            
            ${notes ? `
              <h3 style="color: #333; margin-top: 20px; margin-bottom: 15px;">Additional Notes</h3>
              <p>${notes}</p>
            ` : ''}
          </div>
          
          <p style="text-align: center; margin-top: 20px; color: #666; font-size: 14px;">
            This is an automated message from Olive Tree. Please respond to the customer's email address.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
} 