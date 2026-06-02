import React, { useState } from 'react';
import { CreditCard, Layers, Percent, ShieldCheck, ArrowRight, Sparkles, BadgeCheck } from 'lucide-react';
import PaymentPlanPopup from './PaymentPlanPopup';

const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

const PaymentPlanWidget = ({ basePrice, courseName, durationMonths = 6, themeColor = "#6366f1" }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const GST_RATE = 0.18;
  const bookingBase = 10000;
  const financeRegBase = Math.max(0, basePrice * 0.05);
  const loanBase = basePrice - bookingBase - financeRegBase;
  const loanGST = loanBase * GST_RATE;
  const loanTotal = loanBase + loanGST;
  const startingEMI = Math.round(loanTotal / 24);

  const paymentModes = [
    {
      icon: CreditCard,
      label: 'Full Payment',
      sub: 'Max savings',
      bg: 'rgba(99,102,241,0.12)',
      color: '#818cf8',
    },
    {
      icon: Layers,
      label: 'Installments',
      sub: 'Split flexibly',
      bg: 'rgba(16,185,129,0.12)',
      color: '#34d399',
    },
    {
      icon: Percent,
      label: 'EMI / Loan',
      sub: 'Low interest',
      bg: 'rgba(245,158,11,0.12)',
      color: '#fbbf24',
    },
  ];

  return (
    <>
      <div className="relative max-w-5xl mx-auto w-full">
        {/* Outer glow */}
        <div
          className="absolute -inset-px rounded-3xl pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${themeColor}33, transparent 60%, ${themeColor}22)`,
          }}
        />

        <div
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, #0f0f1a 0%, #13131f 60%, #0c0c17 100%)',
            border: '1px solid rgba(255,255,255,0.07)',
            boxShadow: `0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.06)`,
          }}
        >
          {/* Top accent bar */}
          <div className="h-[3px] w-full" style={{ background: `linear-gradient(90deg, transparent, ${themeColor}, transparent)` }} />

          <div className="p-8 md:p-10 grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* ─── LEFT ─── */}
            <div className="flex flex-col gap-6">

              {/* Header */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${themeColor}22`, border: `1px solid ${themeColor}44` }}
                >
                  <Sparkles size={18} style={{ color: themeColor }} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500 m-0">Course Fee</p>
                  <h3 className="text-xl font-black text-white m-0 leading-tight">Investment Plan</h3>
                </div>
              </div>

              {/* Price card */}
              <div
                className="rounded-2xl p-6"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] m-0 mb-3" style={{ color: themeColor }}>
                  Total Programme Fee
                </p>
                <div className="flex items-end gap-4 flex-wrap">
                  <span className="text-5xl font-black text-white tracking-tight leading-none">
                    {formatCurrency(basePrice)}
                  </span>
                  <div className="mb-1">
                    <p className="text-[10px] text-slate-500 font-semibold m-0">EMI from</p>
                    <p className="text-2xl font-black leading-none" style={{ color: themeColor }}>
                      {formatCurrency(startingEMI)}<span className="text-sm font-semibold text-slate-400">/mo</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-500 shrink-0" />
                  <p className="text-[11px] text-slate-500 font-medium m-0">Exclusive of 18% GST &nbsp;·&nbsp; Up to 24-month EMI</p>
                </div>
              </div>

              {/* Booking note */}
              <div
                className="rounded-2xl p-5 flex gap-3 items-start"
                style={{ background: `${themeColor}0d`, border: `1px solid ${themeColor}33` }}
              >
                <BadgeCheck size={18} className="shrink-0 mt-0.5" style={{ color: themeColor }} />
                <div>
                  <p className="text-sm font-semibold text-slate-200 m-0 leading-relaxed">
                    Reserve your seat for just <span className="font-black text-white">₹10,000</span> today — rest after enrolment.
                  </p>
                  <p className="text-[11px] text-slate-500 m-0 mt-1.5">Token amount exclusive of 18% GST</p>
                </div>
              </div>
            </div>

            {/* ─── RIGHT ─── */}
            <div className="flex flex-col gap-6">

              {/* Payment modes */}
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-slate-500 mb-4">
                  Choose Payment Mode
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {paymentModes.map(({ icon: Icon, label, sub, bg, color }, i) => (
                    <button
                      key={i}
                      onClick={() => setIsPopupOpen(true)}
                      className="group flex flex-col items-center gap-3 py-5 rounded-2xl transition-all duration-300 hover:-translate-y-1"
                      style={{
                        background: bg,
                        border: `1px solid ${color}33`,
                        cursor: 'pointer',
                      }}
                    >
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200"
                        style={{ background: `${color}22` }}
                      >
                        <Icon size={20} style={{ color }} />
                      </div>
                      <div className="text-center">
                        <p className="text-[12px] font-black text-white m-0">{label}</p>
                        <p className="text-[10px] font-medium text-slate-500 m-0 mt-0.5">{sub}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* What's included */}
              <div
                className="rounded-2xl p-5 flex flex-col gap-3"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-500 m-0">What's Included</p>
                {[
                  'Lifetime access to all recorded sessions',
                  'Certificate of completion',
                  'Placement assistance & mock interviews',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: `${themeColor}22` }}>
                      <ShieldCheck size={10} style={{ color: themeColor }} />
                    </div>
                    <p className="text-[12px] text-slate-300 font-medium m-0 leading-snug">{item}</p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button
                onClick={() => setIsPopupOpen(true)}
                className="w-full rounded-2xl py-5 px-6 flex items-center justify-center gap-3 font-black text-[15px] tracking-wide shadow-2xl transition-all duration-300 group hover:-translate-y-1"
                style={{
                  background: `linear-gradient(135deg, ${themeColor}, ${themeColor}cc)`,
                  color: '#ffffff',
                  border: 'none',
                  boxShadow: `0 12px 40px ${themeColor}55`,
                }}
              >
                <ShieldCheck size={20} className="opacity-90 shrink-0" />
                Block Your Seat @ ₹10,000
                <ArrowRight size={20} className="ml-auto group-hover:translate-x-1.5 transition-transform shrink-0" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">
                <ShieldCheck size={12} className="opacity-60" />
                Secure Payment &nbsp;·&nbsp; Cancel Anytime
              </div>
            </div>

          </div>
        </div>
      </div>

      <PaymentPlanPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        basePrice={basePrice}
        courseName={courseName}
        durationMonths={durationMonths}
      />
    </>
  );
};

export default PaymentPlanWidget;
