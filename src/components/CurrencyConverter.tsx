import React, { useState, useEffect } from 'react';
import { ArrowRightLeft } from 'lucide-react';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');
  const [result, setResult] = useState(0);

  const currencies = {
    USD: { name: 'US Dollar', symbol: '$', rate: 1 },
    INR: { name: 'Indian Rupee', symbol: '₹', rate: 82.5 },
    EUR: { name: 'Euro', symbol: '€', rate: 0.92 },
    GBP: { name: 'British Pound', symbol: '£', rate: 0.79 },
    JPY: { name: 'Japanese Yen', symbol: '¥', rate: 150.27 },
  };

  // Auto-convert when any value changes
  useEffect(() => {
    handleConvert();
  }, [amount, fromCurrency, toCurrency]);

  const handleConvert = () => {
    if (amount <= 0) {
      setResult(0);
      return;
    }
    const fromRate = currencies[fromCurrency].rate;
    const toRate = currencies[toCurrency].rate;
    const converted = (amount / fromRate) * toRate;
    setResult(converted);
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-8 animate-slideUp">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Currency Converter</h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
          <input
            type="number"
            min="0"
            step="any"
            value={amount}
            onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              {Object.entries(currencies).map(([code, { name }]) => (
                <option key={code} value={code}>
                  {code} - {name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={swapCurrencies}
            className="mt-6 p-2 rounded-full bg-indigo-100 hover:bg-indigo-200 transition-colors"
            aria-label="Swap currencies"
          >
            <ArrowRightLeft className="h-5 w-5 text-indigo-600" />
          </button>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              {Object.entries(currencies).map(([code, { name }]) => (
                <option key={code} value={code}>
                  {code} - {name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 p-4 bg-indigo-50 rounded-lg animate-fadeIn">
          <p className="text-center">
            <span className="text-lg">
              {amount.toLocaleString()} {currencies[fromCurrency].symbol}
            </span>
            <span className="text-gray-600 mx-2">=</span>
            <span className="text-2xl font-bold text-indigo-600">
              {currencies[toCurrency].symbol}
              {result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;