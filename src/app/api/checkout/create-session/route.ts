import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(request: Request) {
  try {
    // get selected plan
    const { plan } = await request.json();
    let priceId = 'price_1RdKboGa94dJvYnTSKI7CuKj'; //  Free plan
    if (plan === 'pro') {
      priceId = 'price_1RdKboGa94dJvYnTSKI7CuKj';
    } else if (plan === 'business') {
      priceId = 'price_1RdKe2Ga94dJvYnTFh7Ipt68';
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET ?? '');
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      // NOTE: this is required for embedded mode
      ui_mode: 'custom',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      payment_method_types: ['card'],
      return_url: 'http://localhost:3000/admin',
    });

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
