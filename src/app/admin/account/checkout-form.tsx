'use client';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/sonner';
import {
  CheckoutProvider,
  PaymentElement,
  useCheckout,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const stripePromise = loadStripe(
  // Access token
  'pk_test_51RdKWLGa94dJvYnTXzQ8d6yz3ud84Jg4x0xEOpWcDI4HQvNldygTM6XRpLqreI1Sjc6ygXOjwtb5NEYmUa5ty7lB001IXMWwvR',
);

const PaymentForm = () => {
  const { confirm, updateEmail } = useCheckout();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // NOTE: this is required for embedded mode
    updateEmail('test@example.com');
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = await confirm();
    console.log(result);
    if (result.type === 'error') {
      toast.error('stripe error');
    }

    toast.success('決済が完了しました。');
  };

  return (
    <>
      {loading && <p>Loading...</p>}
      <form onSubmit={handleSubmit}>
        <PaymentElement onReady={() => setLoading(false)} />
        <div className="flex justify-end mt-10">
          <Button type="submit">決済する</Button>
        </div>
      </form>
      <Toaster />
    </>
  );
};

const CheckoutForm = ({ plan }: { plan: string }) => {
  const { resolvedTheme } = useTheme();
  const fetchClientSecret = async () => {
    return fetch('/api/checkout/create-session', {
      method: 'POST',
      body: JSON.stringify({ plan }),
    })
      .then(res => res.json())
      .then(data => data.clientSecret);
  };

  const appearance = {
    theme: (resolvedTheme === 'dark' ? 'night' : 'stripe') as
      | 'night'
      | 'stripe'
      | 'flat',
  };

  return (
    <CheckoutProvider
      stripe={stripePromise}
      options={{ fetchClientSecret, elementsOptions: { appearance } }}
    >
      <PaymentForm />
    </CheckoutProvider>
  );
};

export default CheckoutForm;
