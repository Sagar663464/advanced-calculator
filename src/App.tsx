import React, { useState, useEffect } from 'react';
import { Calculator, Calculator as CalculatorSquare, Ruler, Scale, DollarSign } from 'lucide-react';
import ScientificCalc from './components/ScientificCalc';
import BasicCalc from './components/BasicCalc';
import LengthConverter from './components/LengthConverter';
import MassConverter from './components/MassConverter';
import CurrencyConverter from './components/CurrencyConverter';

type Tab = 'basic' | 'scientific' | 'length' | 'mass' | 'currency';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('basic');

  const tabs = [
    { id: 'basic', name: 'Basic', icon: Calculator },
    { id: 'scientific', name: 'Scientific', icon: CalculatorSquare },
    { id: 'length', name: 'Length', icon: Ruler },
    { id: 'mass', name: 'Mass', icon: Scale },
    { id: 'currency', name: 'Currency', icon: DollarSign },
  ];

  // Handle keyboard shortcuts for tab switching
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey) {
        switch (e.key) {
          case '1':
            setActiveTab('basic');
            break;
          case '2':
            setActiveTab('scientific');
            break;
          case '3':
            setActiveTab('length');
            break;
          case '4':
            setActiveTab('mass');
            break;
          case '5':
            setActiveTab('currency');
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-4 sm:p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
            Advanced Calculator
          </h1>
          
          <div className="flex overflow-x-auto space-x-2 mb-6 p-1 bg-gray-100 rounded-lg">
            {tabs.map(({ id, name, icon: Icon }, index) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as Tab)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  activeTab === id
                    ? 'bg-white text-indigo-600 shadow-md'
                    : 'text-gray-600 hover:bg-gray-200'
                } whitespace-nowrap flex-shrink-0`}
              >
                <Icon size={18} />
                <span>{name}</span>
                <span className="text-xs text-gray-400 ml-1">(Alt+{index + 1})</span>
              </button>
            ))}
          </div>

          <div className="bg-white rounded-xl p-4">
            {activeTab === 'basic' && <BasicCalc />}
            {activeTab === 'scientific' && <ScientificCalc />}
            {activeTab === 'length' && <LengthConverter />}
            {activeTab === 'mass' && <MassConverter />}
            {activeTab === 'currency' && <CurrencyConverter />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;