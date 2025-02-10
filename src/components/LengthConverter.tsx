import React, { useState, ChangeEvent } from 'react';

const units = {
  meters: 1,
  kilometers: 1000,
  centimeters: 0.01,
  millimeters: 0.001,
  miles: 1609.34,
  yards: 0.9144,
  feet: 0.3048,
  inches: 0.0254
};

type Unit = keyof typeof units;

export default function LengthConverter() {
  const [value, setValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<Unit>('meters');
  const [toUnit, setToUnit] = useState<Unit>('feet');

  const convert = (value: string, from: Unit, to: Unit): string => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return '';
    
    const inMeters = numValue * units[from];
    const result = inMeters / units[to];
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