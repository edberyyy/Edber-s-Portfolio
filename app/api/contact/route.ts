import nodemailer from 'nodemailer';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    // ╔════════════════════════════════════════════════════════════╗
    // ║  CONFIGURE YOUR EMAIL HERE                                ║
    // ║  Replace 'your-email@gmail.com' with your email address  ║
    // ║  Add your app password in .env.local                      ║
    // ╚════════════════════════════════════════════════════════════╝
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or another SMTP service
      auth: {
        user: process.env.EMAIL_USER, // Your email (add to .env.local)
        pass: process.env.EMAIL_PASS, // Your app password (add to .env.local)
      },
    });

    // Send email to YOUR inbox
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // 👈 YOUR EMAIL ADDRESS GOES HERE
      subject: `New Contact Form: ${subject}`,
      html: `
        <h2>New Message from Your Portfolio</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
      replyTo: email, // Reply directly to visitor
    });

    // Optional: Send confirmation email to visitor
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'I received your message!',
      html: `
        <h2>Thanks for reaching out!</h2>
        <p>Hi ${name},</p>
        <p>I've received your message and will get back to you soon.</p>
        <p>Best regards,<br>Edber John</p>
      `,
    });

    return NextResponse.json({ success: true, message: 'Email sent!' }, { status: 200 });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json({ success: false, message: 'Failed to send email' }, { status: 500 });
  }
}
