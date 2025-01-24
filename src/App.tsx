import React, { useState } from 'react';
import { Calculator, DollarSign, Percent, ArrowRightLeft } from 'lucide-react';
import EMICalculator from './components/EMICalculator';
import CurrencyConverter from './components/CurrencyConverter';
import SIPCalculator from './components/SIPCalculator';

function App() {
  const [activeTab, setActiveTab] = useState('emi');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <Calculator className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900">AnshSip</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('emi')}
            className={`flex items-center px-6 py-3 rounded-lg transition-all duration-300 ${
              activeTab === 'emi'
                ? 'bg-indigo-600 text-white shadow-lg transform scale-105'
                : 'bg-white text-gray-700 hover:bg-indigo-50'
            }`}
          >
            <DollarSign className="h-5 w-5 mr-2" />
            EMI Calculator
          </button>
          <button
            onClick={() => setActiveTab('currency')}
            className={`flex items-center px-6 py-3 rounded-lg transition-all duration-300 ${
              activeTab === 'currency'
                ? 'bg-indigo-600 text-white shadow-lg transform scale-105'
                : 'bg-white text-gray-700 hover:bg-indigo-50'
            }`}
          >
            <ArrowRightLeft className="h-5 w-5 mr-2" />
            Currency Converter
          </button>
          <button
            onClick={() => setActiveTab('sip')}
            className={`flex items-center px-6 py-3 rounded-lg transition-all duration-300 ${
              activeTab === 'sip'
                ? 'bg-indigo-600 text-white shadow-lg transform scale-105'
                : 'bg-white text-gray-700 hover:bg-indigo-50'
            }`}
          >
            <Percent className="h-5 w-5 mr-2" />
            SIP Calculator
          </button>
        </div>

        <div className="animate-fadeIn">
          {activeTab === 'emi' && <EMICalculator />}
          {activeTab === 'currency' && <CurrencyConverter />}
          {activeTab === 'sip' && <SIPCalculator />}
        </div>
      </main>
    </div>
  );
}

export default App;