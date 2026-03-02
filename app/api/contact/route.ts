import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error('Missing RESEND_API_KEY environment variable');
  return new Resend(key);
}

export async function POST(request: NextRequest) {
  try {
    const resend = getResend();
    const { name, email, subject, message } = await request.json();

    // Send email to YOUR inbox
    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'ejbm1027@gmail.com',
      subject: `New Contact Form: ${subject}`,
      replyTo: email,
      html: `
        <h2>New Message from Your Portfolio</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    // Send confirmation email to visitor (best-effort — may fail on Resend free plan)
    try {
      await resend.emails.send({
        from: 'Edber John <onboarding@resend.dev>',
        to: email,
        subject: 'I received your message!',
        html: `
          <h2>Thanks for reaching out!</h2>
          <p>Hi ${name},</p>
          <p>I've received your message and will get back to you soon.</p>
          <p>Best regards,<br>Edber John</p>
        `,
      });
    } catch (confirmError) {
      // Non-fatal: main notification already sent
      console.warn('Confirmation email failed (expected on free plan):', confirmError);
    }

    return NextResponse.json({ success: true, message: 'Email sent!' }, { status: 200 });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json({ success: false, message: 'Failed to send email' }, { status: 500 });
  }
}
