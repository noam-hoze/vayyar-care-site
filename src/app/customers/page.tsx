// app/customers/page.tsx or pages/customers.tsx (depending on your router setup)

import React from 'react';

type Customer = {
  name: string;
  location?: string;
  description?: string;
  quote?: string;
  person?: string;
  position?: string;
  website?: string;
};

const customers: Customer[] = [
  {
    name: 'Sunrise Senior Living',
    location: 'New York, NY',
    description: 'A leading senior care provider using VayyarCare in 40+ facilities.',
    quote: 'VayyarCare gives us real peace of mind — it works quietly and reliably, day and night.',
    person: 'Linda M.',
    position: 'Director of Nursing, Sunrise Senior Living',
    website: 'https://www.sunriseseniorliving.com',
  },
  {
    name: 'Baycrest Health Sciences',
    location: 'Toronto, Canada',
    description: 'Renowned for geriatric care and innovation.',
    quote: 'With VayyarCare, we’ve taken a major step toward proactive, respectful care.',
    person: 'Dr. Amir B.',
    position: 'Geriatrician, Baycrest Health Sciences',
    website: 'https://www.baycrest.org',
  },
  {
    name: 'SavaSeniorCare',
    location: 'Houston, TX',
    description: 'One of the largest providers of skilled nursing care.',
    quote: 'Our staff can focus more on residents, knowing VayyarCare has their back.',
    person: 'Jason R.',
    position: 'Facility Manager, SavaSeniorCare',
  },
  // Add more customers as needed
];

export default function CustomersPage() {
  return (
    <div className="px-6 md:px-20 py-20 max-w-6xl mx-auto space-y-20">
      {/* Page Title */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-purple-700">Trusted by Industry Leaders</h1>
        <p className="text-xl text-gray-700 max-w-2xl mx-auto">
          VayyarCare is already deployed in hundreds of senior care facilities worldwide — and growing.
        </p>
      </div>

      {/* Customer List */}
      <div className="space-y-16">
        {customers.map((customer, idx) => (
          <div
            key={idx}
            className="bg-white shadow-md rounded-2xl p-8 space-y-4 border border-gray-100"
          >
            <h2 className="text-2xl font-bold text-gray-800">{customer.name}</h2>
            {customer.location && (
              <p className="text-sm text-gray-500">{customer.location}</p>
            )}
            {customer.description && (
              <p className="text-base text-gray-600">{customer.description}</p>
            )}
            {customer.quote && (
              <blockquote className="text-lg italic text-purple-700 mt-4">“{customer.quote}”</blockquote>
            )}
            {(customer.person || customer.position) && (
              <p className="text-sm text-gray-500 mt-2">
                — {customer.person}{customer.position ? `, ${customer.position}` : ''}
              </p>
            )}
            {customer.website && (
              <a
                href={customer.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-purple-600 hover:underline inline-block mt-2"
              >
                Visit website
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
