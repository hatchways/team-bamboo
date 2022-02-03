import type ApiData from '../../interface/ApiData';
import { FetchOptions } from '../../interface/FetchOptions';
import { Card } from '@stripe/stripe-js';

interface CardResponse {
  card: Card;
}

const paymentMethodPath = '/stripe/paymentMethod';

export const getPaymentMethod = async (): Promise<ApiData<CardResponse>> => {
  const response = await fetch(paymentMethodPath);
  return response.json();
};

export const setPaymentMethod = async (tokenId: string): Promise<ApiData<CardResponse>> => {
  const options: FetchOptions = {
    credentials: 'include',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tokenId }),
  };
  const response = await fetch(paymentMethodPath, options);
  return response.json();
};

export const deletePaymentMethod = async () => {
  const options: FetchOptions = {
    credentials: 'include',
    method: 'DELETE',
  };
  await fetch(paymentMethodPath, options);
};
