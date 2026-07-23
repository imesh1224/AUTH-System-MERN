import nodemailer from "nodemailer";

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
};

export const sendVerificationEmail = async (user, verificationUrl) => {
  try {
    const transporter = createTransporter();

    const cleanUrl = verificationUrl.trim();

    const message = {
      from: `"MERN AUTH" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Email Verification - MERN AUTH",
      html: `
            <!DOCTYPE html>
            <html>
            <head>
            <style>
            .button{
            display: inline-block;
            padding: 12px 25px;
            background-color: #111827 !important;
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            }
            </style>
            </head>
            <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
            <div style="max-width: 600px; margin: 40px auto;  background-color: #ffffff; border-radius: 10px;
            overflow: hidden; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
                <div style="background-color: #111827; padding: 30px; text-align: center; color: white;">
                <h1>Welcome to MERN AUTH</h1>
                </div>
                <div style="padding: 30px; color: #333; line-height: 1.6;">
                <h2>Hello ${user.name},</h2>
                <p>Thank you for registering with MERN AUTH. To verify your email address, please click the button below:</p>

                <div style="text-align: center; margin: 30px 0;"><a href="${cleanUrl}" class="button" style="color: #ffffff;">Verify Email Address</a></div>

                <p>If the button doesn't work, please copy and paste the following link into your browser:</p>
                <p style="word-break: break-all; color: #4F46E5; font-size: 14px;">${cleanUrl}</p>

                <p><strong>Expiry:</strong> This link expires in 24 hours.</p>
                </div>
                <div style="text-align: center; font-size: 12px; background: #f9f9f9; padding: 20px; color: #777;">
                <p>&copy; ${new Date().getFullYear()} MERN AUTH. All rights reserved.</p>
                </div>
            </div>
            </body>
            </html>
           
            `,
    };
    const info = await transporter.sendMail(message);
    console.log("Email sent succefully");
  } catch (error) {
    console.error("Email service error:", error.message);
    throw new Error("Failed to send verification email");
  }
};
