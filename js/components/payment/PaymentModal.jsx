import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import { Modal } from '../common/Modal.jsx';

export function PaymentModal() {
  const { activeModal, setActiveModal, activateProSubscription, isProUser } = useApp();
  const [billingCycle, setBillingCycle] = useState('annual'); // 'monthly' | 'annual'
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'card' | 'netbanking'
  const [upiId, setUpiId] = useState('student@oksbi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const isOpen = activeModal === 'payment';

  const handlePay = () => {
    setIsProcessing(true);
    // Simulate payment gateway handshake + server-side webhook
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      activateProSubscription(billingCycle === 'annual' ? 'Nexora Pro Annual' : 'Nexora Pro Monthly');
      setTimeout(() => {
        setPaymentSuccess(false);
        setActiveModal(null);
      }, 2000);
    }, 1500);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        if (!isProcessing) {
          setActiveModal(null);
          setPaymentSuccess(false);
        }
      }}
      title="Upgrade to Nexora Pro"
      subtitle="Supercharge your decision engine with institutional-grade AI intelligence"
      maxWidth="max-w-xl"
    >
      {paymentSuccess ? (
        <div className="py-8 text-center animate-slide-up">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h4 className="text-xl font-heading font-extrabold text-slate-900 mb-1">
            Payment Verified & Pro Active!
          </h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
            Webhook verified successfully. Your 7-dimension AI matching engine, priority alerts, and resume tailoring are now fully unlocked.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-semibold rounded-full border border-emerald-200">
            Invoice generated & emailed
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          {/* Plan Selector */}
          <div className="grid grid-cols-2 gap-3">
            <div
              onClick={() => setBillingCycle('annual')}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all relative ${
                billingCycle === 'annual'
                  ? 'border-blue-600 bg-blue-50/50 shadow-xs'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <span className="absolute -top-2.5 right-3 bg-emerald-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                Save 35%
              </span>
              <div className="text-xs font-bold text-slate-700">Annual Pro</div>
              <div className="text-xl font-heading font-black text-slate-900 mt-1">
                ₹3,999 <span className="text-xs font-normal text-slate-500">/ year</span>
              </div>
              <div className="text-[11px] text-blue-700 font-medium mt-1">
                Equivalent to ~₹333 / month
              </div>
            </div>

            <div
              onClick={() => setBillingCycle('monthly')}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                billingCycle === 'monthly'
                  ? 'border-blue-600 bg-blue-50/50 shadow-xs'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="text-xs font-bold text-slate-700">Monthly Pro</div>
              <div className="text-xl font-heading font-black text-slate-900 mt-1">
                ₹499 <span className="text-xs font-normal text-slate-500">/ month</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                Flexible cancel anytime
              </div>
            </div>
          </div>

          {/* Pro Benefits List */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-2">
            <div className="text-xs font-bold text-slate-900 mb-2">Everything in Free + Pro Upgrades:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
                <span>7-Dimension AI Match Matrix</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
                <span>Instant Resume Tailoring AI</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
                <span>Unlimited AI Assistant Prompts</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
                <span>Priority Deadline Alerts</span>
              </div>
            </div>
          </div>

          {/* Payment Method Selector (Simulated Razorpay UI) */}
          <div>
            <div className="text-xs font-bold text-slate-900 mb-2">Select Payment Method (Secure Gateway)</div>
            <div className="flex rounded-xl border border-slate-200 p-1 bg-slate-50 gap-1 mb-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  paymentMethod === 'upi' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                UPI (GPay/PhonePe/Paytm)
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  paymentMethod === 'card' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Debit / Credit Card
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('netbanking')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  paymentMethod === 'netbanking' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                NetBanking
              </button>
            </div>

            {paymentMethod === 'upi' && (
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-slate-600">Enter UPI ID / VPA</label>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="e.g. mobile@upi"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                />
              </div>
            )}

            {paymentMethod === 'card' && (
              <div className="space-y-2">
                <input
                  type="text"
                  defaultValue="4532 •••• •••• 8821"
                  placeholder="Card Number"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    defaultValue="08/29"
                    placeholder="MM/YY"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900"
                  />
                  <input
                    type="password"
                    defaultValue="•••"
                    placeholder="CVV"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900"
                  />
                </div>
              </div>
            )}

            {paymentMethod === 'netbanking' && (
              <select className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900">
                <option>HDFC Bank</option>
                <option>State Bank of India</option>
                <option>ICICI Bank</option>
                <option>Axis Bank</option>
              </select>
            )}
          </div>

          {/* Secure Guarantee & Pay Button */}
          <div className="pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                256-bit Encrypted Checkout
              </span>
              <span>100% Refund within 7 days</span>
            </div>

            <button
              onClick={handlePay}
              disabled={isProcessing}
              className="w-full py-3 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white font-bold text-sm rounded-xl hover:from-blue-700 hover:to-indigo-800 shadow-md shadow-blue-500/20 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Verifying via Secure Gateway...</span>
                </>
              ) : (
                <span>Pay {billingCycle === 'annual' ? '₹3,999' : '₹499'} & Unlock Pro</span>
              )}
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
