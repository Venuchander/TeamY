// src/routes/sign-up/+page.server.ts
import type { Actions } from './$types';
import pool from '$lib/db';

export const actions: Actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const result = await pool.query(
        'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id',
        [email, password]
      );

      console.log('Insert Result:', result);

      return {
        success: true,
        userId: result.rows[0].id
      };
    } catch (err) {
      console.error('Insert Error:', err);
      if (err.code === '23505') { // Unique violation
        return {
          success: false,
          error: 'User already exists'
        };
      } else {
        return {
          success: false,
          error: err.message
        };
      }
    }
  }
};
