import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST() {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET ?? '');
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      // NOTE: this is required for embedded mode
      ui_mode: 'custom',
      line_items: [
        {
          price: 'price_1RdKboGa94dJvYnTSKI7CuKj',
          quantity: 1,
        },
      ],
      return_url: 'http://localhost:3000/admin/account',
    });
    console.log(session.client_secret);

    return NextResponse.json(
      { clientSecret: session.client_secret },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'フォーム作成に失敗しました。' },
      { status: 500 },
    );
  }
}
