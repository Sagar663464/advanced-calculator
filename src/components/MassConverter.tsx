import React, { useState, ChangeEvent } from 'react';

const units = {
  kilograms: 1,
  grams: 0.001,
  milligrams: 0.000001,
  pounds: 0.453592,
  ounces: 0.0283495,
  tons: 1000,
  stones: 6.35029
};

type Unit = keyof typeof units;

export default function MassConverter() {
  const [value, setValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<Unit>('kilograms');
  const [toUnit, setToUnit] = useState<Unit>('pounds');

  const convert = (value: string, from: Unit, to: Unit): string => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return '';
    
    const inKilograms = numValue * units[from];
    const result = inKilograms / units[to];
    return result.toFixed(6);
  };

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleFromUnitChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFromUnit(e.target.value as Unit);
  };

  const handleToUnitChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setToUnit(e.target.value as Unit);
  };

  const result = convert(value, fromUnit, toUnit);

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
          <input
            type="number"
            value={value}
            onChange={handleValueChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter value"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
            <select
              value={fromUnit}
              onChange={handleFromUnitChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              {Object.keys(units).map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
            <select
              value={toUnit}
              onChange={handleToUnitChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              {Object.keys(units).map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg">
          <div className="text-sm text-gray-600">Result:</div>
          <div className="text-2xl font-semibold">
            {result ? `${result} ${toUnit}` : '-'}
          </div>
        </div>
      </div>
    </div>
  );
}