// src/routes/request/+server.ts
import { json } from '@sveltejs/kit';
import pool from '$lib/db'; // Adjust the import based on your project structure

export async function POST({ request }) {
  try {
    const { propertyId, loanAmount, repaymentPeriod } = await request.json();

    if (!propertyId || !loanAmount || !repaymentPeriod) {
      return json({ error: 'All fields are required.' }, { status: 400 });
    }

    await pool.query(
      'INSERT INTO mortgage_requests (property_id, loan_amount, repayment_period) VALUES ($1, $2, $3)',
      [propertyId, loanAmount, repaymentPeriod]
    );

    return json({ message: 'Request submitted successfully!' }, { status: 201 });
  } catch (err) {
    console.error('Error processing request:', err);
    return json({ error: 'Failed to submit request.' }, { status: 500 });
  }
}
