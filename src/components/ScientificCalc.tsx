import React, { useState, useEffect } from 'react';
import CalcButton from './CalcButton';

export default function ScientificCalc() {
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

  const handleFunction = (func: string) => {
    setHasResult(false);
    setDisplay('0');
    setEquation(`${func}(${equation})`);
  };

  const calculate = () => {
    try {
      const mathEquation = equation
        .replace(/sin/g, 'Math.sin')
        .replace(/cos/g, 'Math.cos')
        .replace(/tan/g, 'Math.tan')
        .replace(/sqrt/g, 'Math.sqrt')
        .replace(/log/g, 'Math.log10')
        .replace(/ln/g, 'Math.log')
        .replace(/π/g, 'Math.PI')
        .replace(/e/g, 'Math.E')
        .replace(/\^/g, '**');

      // eslint-disable-next-line no-eval
      const result = eval(mathEquation);
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
        /[\d+\-*/.=()%^]/.test(e.key) ||
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
      // Basic operators
      else if (['+', '-', '*', '/', '(', ')', '%', '^'].includes(e.key)) {
        handleNumber(e.key);
      }
      // Scientific functions
      else if (e.key === 's') handleFunction('sin');
      else if (e.key === 'c') handleFunction('cos');
      else if (e.key === 't') handleFunction('tan');
      else if (e.key === 'r') handleFunction('sqrt');
      else if (e.key === 'l') handleFunction('log');
      else if (e.key === 'n') handleFunction('ln');
      // Constants
      else if (e.key === 'p') handleNumber('π');
      else if (e.key === 'e') handleNumber('e');
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
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <div className="text-right text-gray-500 text-sm mb-1">{equation || '0'}</div>
        <div className="text-right text-3xl font-semibold">{display}</div>
      </div>
      
      <div className="grid grid-cols-6 gap-2">
        <CalcButton onClick={() => handleFunction('sin')} className="bg-purple-500 hover:bg-purple-600">
          sin (s)
        </CalcButton>
        <CalcButton onClick={() => handleFunction('cos')} className="bg-purple-500 hover:bg-purple-600">
          cos (c)
        </CalcButton>
        <CalcButton onClick={() => handleFunction('tan')} className="bg-purple-500 hover:bg-purple-600">
          tan (t)
        </CalcButton>
        <CalcButton onClick={() => handleNumber('π')} className="bg-purple-500 hover:bg-purple-600">
          π (p)
        </CalcButton>
        <CalcButton onClick={() => handleNumber('e')} className="bg-purple-500 hover:bg-purple-600">
          e
        </CalcButton>
        <CalcButton onClick={clear} className="bg-red-500 hover:bg-red-600">
          C (Esc)
        </CalcButton>

        <CalcButton onClick={() => handleFunction('sqrt')} className="bg-indigo-500 hover:bg-indigo-600">
          √ (r)
        </CalcButton>
        <CalcButton onClick={() => handleFunction('log')} className="bg-indigo-500 hover:bg-indigo-600">
          log (l)
        </CalcButton>
        <CalcButton onClick={() => handleFunction('ln')} className="bg-indigo-500 hover:bg-indigo-600">
          ln (n)
        </CalcButton>
        <CalcButton onClick={() => handleNumber('(')} className="bg-indigo-500 hover:bg-indigo-600">
          (
        </CalcButton>
        <CalcButton onClick={() => handleNumber(')')} className="bg-indigo-500 hover:bg-indigo-600">
          )
        </CalcButton>
        <CalcButton onClick={() => handleNumber('/')} className="bg-indigo-500 hover:bg-indigo-600">
          ÷
        </CalcButton>

        {[7, 8, 9].map((num) => (
          <CalcButton key={num} onClick={() => handleNumber(num.toString())}>
            {num}
          </CalcButton>
        ))}
        <CalcButton onClick={() => handleNumber('*')} className="bg-indigo-500 hover:bg-indigo-600">
          ×
        </CalcButton>
        <CalcButton onClick={() => handleNumber('^')} className="bg-indigo-500 hover:bg-indigo-600">
          ^
        </CalcButton>
        <CalcButton onClick={() => handleNumber('%')} className="bg-indigo-500 hover:bg-indigo-600">
          %
        </CalcButton>

        {[4, 5, 6].map((num) => (
          <CalcButton key={num} onClick={() => handleNumber(num.toString())}>
            {num}
          </CalcButton>
        ))}
        <CalcButton onClick={() => handleNumber('-')} className="bg-indigo-500 hover:bg-indigo-600">
          -
        </CalcButton>
        <CalcButton onClick={calculate} className="bg-green-500 hover:bg-green-600 row-span-2">
          = (Enter)
        </CalcButton>
        <CalcButton onClick={() => handleNumber('0')} className="row-span-2">
          0
        </CalcButton>

        {[1, 2, 3].map((num) => (
          <CalcButton key={num} onClick={() => handleNumber(num.toString())}>
            {num}
          </CalcButton>
        ))}
        <CalcButton onClick={() => handleNumber('+')} className="bg-indigo-500 hover:bg-indigo-600">
          +
        </CalcButton>
        <CalcButton onClick={() => handleNumber('.')}>.</CalcButton>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <p>Keyboard shortcuts:</p>
        <ul className="grid grid-cols-2 gap-2 mt-2">
          <li>Numbers: 0-9</li>
          <li>Operators: +, -, *, /, ^, %</li>
          <li>Functions: s (sin), c (cos), t (tan)</li>
          <li>r (sqrt), l (log), n (ln)</li>
          <li>Constants: p (π), e</li>
          <li>Clear: Esc</li>
          <li>Calculate: Enter or =</li>
          <li>Delete: Backspace</li>
        </ul>
      </div>
    </div>
  );
}