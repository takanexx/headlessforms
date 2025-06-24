'use client';
import { Button } from '@/components/ui/button';
import { CheckoutProvider, PaymentElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';

const CheckoutForm = () => {
  const [loading, setLoading] = useState(true);
  const stripePromise = loadStripe(
    'pk_test_51RdKWLGa94dJvYnTXzQ8d6yz3ud84Jg4x0xEOpWcDI4HQvNldygTM6XRpLqreI1Sjc6ygXOjwtb5NEYmUa5ty7lB001IXMWwvR',
  );

  const fetchClientSecret = async () => {
    return fetch('/api/checkout/create-session', {
      method: 'POST',
    })
      .then(res => res.json())
      .then(data => data.clientSecret);
  };

  return (
    <>
      {loading && <p>Loading...</p>}
      <CheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
        <form>
          <PaymentElement onReady={() => setLoading(false)} />
          <Button type="submit">Submit</Button>
        </form>
      </CheckoutProvider>
    </>
  );
};

export default CheckoutForm;
