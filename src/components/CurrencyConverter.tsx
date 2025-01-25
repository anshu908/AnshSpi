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
    AUD: { name: 'Australian Dollar', symbol: 'A$', rate: 1.54 },
    CAD: { name: 'Canadian Dollar', symbol: 'C$', rate: 1.36 },
    CHF: { name: 'Swiss Franc', symbol: 'Fr', rate: 0.90 },
    CNY: { name: 'Chinese Yuan', symbol: '¥', rate: 7.24 },
    HKD: { name: 'Hong Kong Dollar', symbol: 'HK$', rate: 7.82 },
    NZD: { name: 'New Zealand Dollar', symbol: 'NZ$', rate: 1.67 },
    SEK: { name: 'Swedish Krona', symbol: 'kr', rate: 10.51 },
    KRW: { name: 'South Korean Won', symbol: '₩', rate: 1345.78 },
    SGD: { name: 'Singapore Dollar', symbol: 'S$', rate: 1.35 },
    NOK: { name: 'Norwegian Krone', symbol: 'kr', rate: 10.72 },
    MXN: { name: 'Mexican Peso', symbol: '$', rate: 17.05 },
    RUB: { name: 'Russian Ruble', symbol: '₽', rate: 92.50 },
    ZAR: { name: 'South African Rand', symbol: 'R', rate: 19.24 },
    TRY: { name: 'Turkish Lira', symbol: '₺', rate: 31.93 },
    BRL: { name: 'Brazilian Real', symbol: 'R$', rate: 5.05 },
    TWD: { name: 'Taiwan Dollar', symbol: 'NT$', rate: 31.89 },
    DKK: { name: 'Danish Krone', symbol: 'kr', rate: 6.87 },
    PLN: { name: 'Polish Złoty', symbol: 'zł', rate: 4.01 },
    THB: { name: 'Thai Baht', symbol: '฿', rate: 36.31 },
    IDR: { name: 'Indonesian Rupiah', symbol: 'Rp', rate: 15907.50 },
    HUF: { name: 'Hungarian Forint', symbol: 'Ft', rate: 356.95 },
    CZK: { name: 'Czech Koruna', symbol: 'Kč', rate: 23.41 },
    ILS: { name: 'Israeli Shekel', symbol: '₪', rate: 3.69 },
    CLP: { name: 'Chilean Peso', symbol: '$', rate: 987.45 },
    PHP: { name: 'Philippine Peso', symbol: '₱', rate: 56.35 },
    AED: { name: 'UAE Dirham', symbol: 'د.إ', rate: 3.67 },
    SAR: { name: 'Saudi Riyal', symbol: '﷼', rate: 3.75 },
    MYR: { name: 'Malaysian Ringgit', symbol: 'RM', rate: 4.75 },
    VND: { name: 'Vietnamese Dong', symbol: '₫', rate: 24565 }
  };

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

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= 0) {
      setAmount(value);
    }
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
            onChange={handleCustomAmountChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Enter amount to convert"
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