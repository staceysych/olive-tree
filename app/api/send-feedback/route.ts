import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, rating, feedback, allowDisplay } = await request.json() as {
      name: string;
      email: string;
      rating: number;
      feedback: string;
      allowDisplay: boolean;
    };

    const data = await resend.emails.send({
      from: 'Olive Tree <onboarding@resend.dev>',
      to: process.env.YOUR_EMAIL_ADDRESS as string,
      subject: `New Feedback from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <h2 style="color: #2e7d32; text-align: center;">New Feedback Received</h2>
          
          <div style="background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h3 style="color: #333; margin-bottom: 15px;">Customer Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            
            <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;" />
            
            <h3 style="color: #333; margin-top: 20px; margin-bottom: 15px;">Feedback Details</h3>
            <p><strong>Rating:</strong> ${rating}/5</p>
            <p><strong>Feedback:</strong></p>
            <p style="background-color: #f5f5f5; padding: 15px; border-radius: 4px;">${feedback}</p>
            <p><strong>Allow Display on Website:</strong> ${allowDisplay ? 'Yes' : 'No'}</p>
          </div>
          
          <p style="text-align: center; margin-top: 20px; color: #666; font-size: 14px;">
            This is an automated message from Olive Tree. Please respond to the customer's email address if needed.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error sending feedback email:', error);
    return NextResponse.json({ error: 'Failed to send feedback email' }, { status: 500 });
  }
} 