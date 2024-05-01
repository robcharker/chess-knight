import React from 'react';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import stripePromise from '../stripe'

const PaymentMethodForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      // Here you would update the payment method information
      // by sending `paymentMethod.id` to your server.
    }
  };

  return (
    <div className="card" style={{ maxWidth: '400px', margin: '0 0', padding: '20px' }}>
      <div className="card-body">
        <h5 className="card-title">Update Payment Method</h5>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="card-element">Credit or Debit Card</label>
            <CardElement id="card-element" className="form-control" />
          </div>
          <button type="submit" className="btn btn-primary mt-3" disabled={!stripe}>
            Update Payment Method
          </button>
        </form>
      </div>
    </div>
  );
};

const PaymentMethodComponent = () => (
  <Elements stripe={stripePromise}>
    <PaymentMethodForm />
  </Elements>
);

export default PaymentMethodComponent;
