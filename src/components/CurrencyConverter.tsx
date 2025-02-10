import React, { useState, ChangeEvent } from 'react';

const exchangeRates = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 150.41,
  AUD: 1.53,
  CAD: 1.35,
  CHF: 0.89,
  CNY: 7.21
};

type Currency = keyof typeof exchangeRates;

export default function CurrencyConverter() {
  const [amount, setAmount] = useState<string>('');
  const [fromCurrency, setFromCurrency] = useState<Currency>('USD');
  const [toCurrency, setToCurrency] = useState<Currency>('EUR');

  const convert = (amount: string, from: Currency, to: Currency): string => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount)) return '';
    
    const inUSD = numAmount / exchangeRates[from];
    const result = inUSD * exchangeRates[to];
    return result.toFixed(2);
  };

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleFromCurrencyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFromCurrency(e.target.value as Currency);
  };

  const handleToCurrencyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setToCurrency(e.target.value as Currency);
  };

  const result = convert(amount, fromCurrency, toCurrency);

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter amount"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
            <select
              value={fromCurrency}
              onChange={handleFromCurrencyChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              {Object.keys(exchangeRates).map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
            <select
              value={toCurrency}
              onChange={handleToCurrencyChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              {Object.keys(exchangeRates).map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg">
          <div className="text-sm text-gray-600">Result:</div>
          <div className="text-2xl font-semibold">
            {result ? `${result} ${toCurrency}` : '-'}
          </div>
        </div>

        <div className="text-xs text-gray-500 text-center">
          Note: Exchange rates are for demonstration purposes only and may not reflect current market rates.
        </div>
      </div>
    </div>
  );
}