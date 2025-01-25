import React, { useState, useEffect } from 'react';
import { TrendingUp } from 'lucide-react';

const SIPCalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [timePeriod, setTimePeriod] = useState(5);
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [estimatedReturns, setEstimatedReturns] = useState(0);
  const [maturityValue, setMaturityValue] = useState(0);

  useEffect(() => {
    const calculateSIP = () => {
      try {
        if (monthlyInvestment <= 0 || expectedReturn <= 0 || timePeriod <= 0) {
          setTotalInvestment(0);
          setMaturityValue(0);
          setEstimatedReturns(0);
          return;
        }

        const monthlyRate = expectedReturn / (12 * 100);
        const months = timePeriod * 12;
        const invested = monthlyInvestment * months;

        const futureValue =
          monthlyInvestment *
          ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
          (1 + monthlyRate);

        setTotalInvestment(invested);
        setMaturityValue(futureValue);
        setEstimatedReturns(futureValue - invested);
      } catch (error) {
        console.error('SIP calculation error:', error);
        setTotalInvestment(0);
        setMaturityValue(0);
        setEstimatedReturns(0);
      }
    };

    calculateSIP();
  }, [monthlyInvestment, expectedReturn, timePeriod]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= 500 && value <= 100000) {
      setMonthlyInvestment(value);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-8 animate-slideUp">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">SIP Calculator</h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Monthly Investment
          </label>
          <div className="flex gap-4 mb-2">
            <input
              type="number"
              min="500"
              max="100000"
              value={monthlyInvestment}
              onChange={handleCustomAmountChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter monthly investment"
            />
          </div>
          <input
            type="range"
            min="500"
            max="100000"
            step="500"
            value={monthlyInvestment}
            onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
            className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between mt-2">
            <span className="text-sm text-gray-600">₹500</span>
            <span className="text-indigo-600 font-semibold">
              {formatCurrency(monthlyInvestment)}
            </span>
            <span className="text-sm text-gray-600">₹1,00,000</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Expected Return (% per annum)
          </label>
          <div className="flex gap-4 mb-2">
            <input
              type="number"
              min="1"
              max="30"
              step="0.5"
              value={expectedReturn}
              onChange={(e) => setExpectedReturn(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter expected return rate"
            />
          </div>
          <input
            type="range"
            min="1"
            max="30"
            step="0.5"
            value={expectedReturn}
            onChange={(e) => setExpectedReturn(Number(e.target.value))}
            className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between mt-2">
            <span className="text-sm text-gray-600">1%</span>
            <span className="text-indigo-600 font-semibold">{expectedReturn}%</span>
            <span className="text-sm text-gray-600">30%</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Investment Period
          </label>
          <div className="flex gap-4 mb-2">
            <input
              type="number"
              min="1"
              max="30"
              step="1"
              value={timePeriod}
              onChange={(e) => setTimePeriod(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter investment period in years"
            />
          </div>
          <input
            type="range"
            min="1"
            max="30"
            step="1"
            value={timePeriod}
            onChange={(e) => setTimePeriod(Number(e.target.value))}
            className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between mt-2">
            <span className="text-sm text-gray-600">1 year</span>
            <span className="text-indigo-600 font-semibold">
              {timePeriod} {timePeriod === 1 ? 'year' : 'years'}
            </span>
            <span className="text-sm text-gray-600">30 years</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 mt-8">
          <div className="bg-indigo-50 p-4 rounded-lg animate-pulse">
            <p className="text-sm text-gray-600">Total Investment</p>
            <p className="text-xl font-bold text-indigo-600 mt-1">
              {formatCurrency(totalInvestment)}
            </p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-lg animate-pulse">
            <p className="text-sm text-gray-600">Est. Returns</p>
            <p className="text-xl font-bold text-indigo-600 mt-1">
              {formatCurrency(estimatedReturns)}
            </p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-lg animate-pulse">
            <p className="text-sm text-gray-600">Total Value</p>
            <p className="text-xl font-bold text-indigo-600 mt-1">
              {formatCurrency(maturityValue)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SIPCalculator;