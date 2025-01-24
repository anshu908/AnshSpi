import React, { useState, useEffect } from 'react';
import { IndianRupee } from 'lucide-react';

const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(10);
  const [tenure, setTenure] = useState(12);
  const [emi, setEmi] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  useEffect(() => {
    const calculateEMI = () => {
      try {
        const principal = loanAmount;
        const ratePerMonth = interestRate / (12 * 100);
        const numberOfPayments = tenure;

        if (principal <= 0 || interestRate <= 0 || numberOfPayments <= 0) {
          setEmi(0);
          setTotalPayment(0);
          setTotalInterest(0);
          return;
        }

        const emiAmount =
          (principal *
            ratePerMonth *
            Math.pow(1 + ratePerMonth, numberOfPayments)) /
          (Math.pow(1 + ratePerMonth, numberOfPayments) - 1);

        const totalAmount = emiAmount * numberOfPayments;
        
        setEmi(emiAmount);
        setTotalPayment(totalAmount);
        setTotalInterest(totalAmount - principal);
      } catch (error) {
        console.error('EMI calculation error:', error);
        setEmi(0);
        setTotalPayment(0);
        setTotalInterest(0);
      }
    };

    calculateEMI();
  }, [loanAmount, interestRate, tenure]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-8 animate-slideUp">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">EMI Calculator</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Loan Amount
          </label>
          <input
            type="range"
            min="100000"
            max="10000000"
            step="100000"
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between mt-2">
            <span className="text-sm text-gray-600">₹1L</span>
            <span className="text-indigo-600 font-semibold">{formatCurrency(loanAmount)}</span>
            <span className="text-sm text-gray-600">₹1Cr</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Interest Rate (% per annum)
          </label>
          <input
            type="range"
            min="5"
            max="20"
            step="0.1"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between mt-2">
            <span className="text-sm text-gray-600">5%</span>
            <span className="text-indigo-600 font-semibold">{interestRate}%</span>
            <span className="text-sm text-gray-600">20%</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Loan Tenure
          </label>
          <input
            type="range"
            min="12"
            max="360"
            step="12"
            value={tenure}
            onChange={(e) => setTenure(Number(e.target.value))}
            className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between mt-2">
            <span className="text-sm text-gray-600">1 year</span>
            <span className="text-indigo-600 font-semibold">
              {Math.floor(tenure / 12)} years {tenure % 12 ? `${tenure % 12} months` : ''}
            </span>
            <span className="text-sm text-gray-600">30 years</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 mt-8">
          <div className="bg-indigo-50 p-4 rounded-lg animate-pulse">
            <p className="text-sm text-gray-600">Monthly EMI</p>
            <p className="text-xl font-bold text-indigo-600 mt-1">
              {formatCurrency(emi)}
            </p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-lg animate-pulse">
            <p className="text-sm text-gray-600">Total Interest</p>
            <p className="text-xl font-bold text-indigo-600 mt-1">
              {formatCurrency(totalInterest)}
            </p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-lg animate-pulse">
            <p className="text-sm text-gray-600">Total Payment</p>
            <p className="text-xl font-bold text-indigo-600 mt-1">
              {formatCurrency(totalPayment)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EMICalculator;