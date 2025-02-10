import React, { useState, useEffect } from 'react';
import CalcButton from './CalcButton';

export default function BasicCalc() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [hasResult, setHasResult] = useState(false);

  const handleNumber = (num: string) => {
    if (hasResult) {
      setDisplay(num);
      setEquation(num);
      setHasResult(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
      setEquation(equation + num);
    }
  };

  const handleOperator = (op: string) => {
    setHasResult(false);
    setDisplay('0');
    setEquation(equation + ' ' + op + ' ');
  };

  const calculate = () => {
    try {
      // eslint-disable-next-line no-eval
      const result = eval(equation);
      setDisplay(result.toString());
      setEquation(result.toString());
      setHasResult(true);
    } catch (error) {
      setDisplay('Error');
      setEquation('');
    }
  };

  const clear = () => {
    setDisplay('0');
    setEquation('');
    setHasResult(false);
  };

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey) return; // Ignore if Alt is pressed (for tab switching)
      
      // Prevent default behavior for calculator keys
      if (
        /[\d+\-*/.=]/.test(e.key) ||
        e.key === 'Enter' ||
        e.key === 'Escape' ||
        e.key === 'Backspace'
      ) {
        e.preventDefault();
      }

      // Numbers and decimal
      if (/\d|\./.test(e.key)) {
        handleNumber(e.key);
      }
      // Operators
      else if (['+', '-', '*', '/'].includes(e.key)) {
        handleOperator(e.key);
      }
      // Equal sign or Enter
      else if (e.key === '=' || e.key === 'Enter') {
        calculate();
      }
      // Clear on Escape
      else if (e.key === 'Escape') {
        clear();
      }
      // Backspace
      else if (e.key === 'Backspace') {
        if (equation.length > 0) {
          const newEquation = equation.slice(0, -1);
          setEquation(newEquation);
          setDisplay(newEquation || '0');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [equation]);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <div className="text-right text-gray-500 text-sm mb-1">{equation || '0'}</div>
        <div className="text-right text-3xl font-semibold">{display}</div>
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        <CalcButton onClick={clear} className="col-span-2 bg-red-500 hover:bg-red-600">
          Clear (Esc)
        </CalcButton>
        <CalcButton onClick={() => handleOperator('/')} className="bg-indigo-500 hover:bg-indigo-600">
          ÷
        </CalcButton>
        <CalcButton onClick={() => handleOperator('*')} className="bg-indigo-500 hover:bg-indigo-600">
          ×
        </CalcButton>
        
        {[7, 8, 9].map((num) => (
          <CalcButton key={num} onClick={() => handleNumber(num.toString())}>
            {num}
          </CalcButton>
        ))}
        <CalcButton onClick={() => handleOperator('-')} className="bg-indigo-500 hover:bg-indigo-600">
          -
        </CalcButton>
        
        {[4, 5, 6].map((num) => (
          <CalcButton key={num} onClick={() => handleNumber(num.toString())}>
            {num}
          </CalcButton>
        ))}
        <CalcButton onClick={() => handleOperator('+')} className="bg-indigo-500 hover:bg-indigo-600">
          +
        </CalcButton>
        
        {[1, 2, 3].map((num) => (
          <CalcButton key={num} onClick={() => handleNumber(num.toString())}>
            {num}
          </CalcButton>
        ))}
        <CalcButton onClick={calculate} className="bg-green-500 hover:bg-green-600 row-span-2">
          = (Enter)
        </CalcButton>
        
        <CalcButton onClick={() => handleNumber('0')} className="col-span-2">
          0
        </CalcButton>
        <CalcButton onClick={() => handleNumber('.')}>.</CalcButton>
      </div>
    </div>
  );
}