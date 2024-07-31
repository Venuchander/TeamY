import { config } from 'dotenv';
import type { Actions } from './$types';
import pool from '$lib/db'; 
import nodemailer from 'nodemailer';

config();

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const mailOptions = (name: string, email: string, message: string) => ({
  from: process.env.EMAIL_USER,
  to: 'venuchander1@gmail.com', 
  subject: 'New Contact Message',
  text: `You have a new message from ${name} (${email}):\n\n${message}`
});

export const actions: Actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const name = data.get('name') as string;
    const email = data.get('email') as string;
    const message = data.get('message') as string;

    if (!name || !email || !message) {
      return {
        status: 400,
        errors: { message: 'All fields are required.' },
      };
    }

    try {
      await pool.query('INSERT INTO contact_messages (name, email, message) VALUES ($1, $2, $3)', [name, email, message]);

      await transporter.sendMail(mailOptions(name, email, message));

      return {
        status: 201,
        body: { message: 'Message sent successfully.' },
      };
    } catch (error) {
      console.error('Error sending email:', error);
      return {
        status: 500,
        errors: { message: 'Failed to send message.' },
      };
    }
  },
};
