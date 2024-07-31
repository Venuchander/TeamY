// src/routes/sign-in/+page.server.ts
import type { Actions } from './$types';
import pool from '$lib/db';
import bcrypt from 'bcrypt';

export const actions: Actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      // Fetch the user record by email
      const result = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
      );

      if (result.rows.length > 0) {
        const user = result.rows[0];
        const validPassword = await bcrypt.compare(password, user.password);

        if (validPassword) {
          return {
            success: true,
            user: user // Ideally, you should avoid sending the whole user object
          };
        } else {
          return {
            success: false,
            error: 'Invalid email or password'
          };
        }
      } else {
        return {
          success: false,
          error: 'Invalid email or password'
        };
      }
    } catch (err) {
      console.error('Select Error:', err);
      return {
        success: false,
        error: err.message
      };
    }
  }
};
