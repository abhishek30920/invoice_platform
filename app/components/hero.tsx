import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

export const 
Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-cyan-50/50 to-blue-100/50" />
      
      {/* Content container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero content */}
        <div className="pt-20 pb-32 text-center">
          {/* Version badge */}
          <div className="inline-block mb-8">
            <span className="inline-flex items-center px-4 py-1 rounded-full text-sm bg-gray-100/80 backdrop-blur-sm">
              Introducing InvoiceAPP 1.0
            </span>
          </div>
          
          {/* Main heading */}
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Invoicing made
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              super easy!
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Creating Invoices can be a pain! We at InvoiceApp make it super
            easy for you to get paid in time!
          </p>
          
          {/* CTA Button */}
          <Link href="/login" className={buttonVariants()}>Get Unlimited Access</Link>
        </div>

        {/* Dashboard preview */}
        <div className="relative">
          {/* Glass effect container */}
          <div className="relative rounded-t-2xl border border-gray-200/50 bg-white/80 backdrop-blur-sm shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center px-4 py-3 border-b border-gray-200/50">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
            </div>
            
            {/* Dashboard content */}
            <div className="p-6">
              <div className="grid grid-cols-4 gap-4 mb-6">
                {/* Stats cards */}
                <div className="p-4 rounded-lg bg-white shadow-sm border border-gray-100">
                  <div className="text-sm text-gray-600">Total Revenue</div>
                  <div className="text-2xl font-bold">$190</div>
                  <div className="text-xs text-gray-500">Based on last 30 days</div>
                </div>
                <div className="p-4 rounded-lg bg-white shadow-sm border border-gray-100">
                  <div className="text-sm text-gray-600">Total Invoices Issued</div>
                  <div className="text-2xl font-bold">+5</div>
                  <div className="text-xs text-gray-500">Total invoices issued</div>
                </div>
                <div className="p-4 rounded-lg bg-white shadow-sm border border-gray-100">
                  <div className="text-sm text-gray-600">Paid Invoices</div>
                  <div className="text-2xl font-bold">+5</div>
                  <div className="text-xs text-gray-500">+67% from last month</div>
                </div>
                <div className="p-4 rounded-lg bg-white shadow-sm border border-gray-100">
                  <div className="text-sm text-gray-600">Open Invoices</div>
                  <div className="text-2xl font-bold">+0</div>
                  <div className="text-xs text-gray-500">Total open invoices</div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative gradient blur */}
          <div className="absolute -bottom-40 left-0 right-0 h-60 bg-gradient-to-b from-transparent to-white" />
      
        </div>
      </div>
    </div>
  );
};

