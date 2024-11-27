import React from 'react';
import { ConfigForm } from '../components/ConfigForm';

export function Settings() {
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">System Configuration</h2>
      <ConfigForm />
    </div>
  );
}