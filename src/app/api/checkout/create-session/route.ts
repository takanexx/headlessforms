import { auth } from '@/auth';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const PRICE_IDS: Record<string, string> = {
  pro: 'price_1RdKboGa94dJvYnTSKI7CuKj',
  business: 'price_1RdKe2Ga94dJvYnTFh7Ipt68',
};

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const { plan } = await request.json();
    const priceId = PRICE_IDS[plan];
    if (!priceId) {
      return NextResponse.json({ error: '無効なプランです。' }, { status: 400 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';
    const stripe = new Stripe(process.env.STRIPE_SECRET ?? '');
    const stripeSession = await stripe.checkout.sessions.create({
      mode: 'subscription',
      // NOTE: this is required for embedded mode
      ui_mode: 'custom',
      line_items: [{ price: priceId, quantity: 1 }],
      payment_method_types: ['card'],
      return_url: `${baseUrl}/checkout/completed/${plan}`,
    });

    return NextResponse.json(
      { clientSecret: stripeSession.client_secret },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'チェックアウトセッションの作成に失敗しました。' },
      { status: 500 },
    );
  }
}
