import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHandHoldingUsd, FaChevronRight } from "react-icons/fa";

const RefundPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#05050A] text-gray-300 font-sans relative overflow-hidden pb-24">
      {/* Ambient Background Effects */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none transform -translate-y-1/2"></div>
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none translate-x-1/3"></div>

      <div className="max-w-[900px] mx-auto px-6 pt-32 relative z-10">
        
        {/* Header Section */}
        <div className="mb-16 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center justify-center p-4 bg-white/5 border border-white/10 rounded-2xl mb-6 text-blue-500 shadow-[0_0_30px_rgba(37,99,235,0.15)]">
            <FaHandHoldingUsd size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6">
            Refund <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Policy</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            By enrolling in any of our educational programs, you acknowledge and agree that all fees, tuition, and payments made towards the program are strictly non-refundable under any circumstances.
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white/[0.02] border border-white/10 backdrop-blur-xl rounded-[32px] p-8 md:p-14 shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
          
          <div className="space-y-12">
            
            <section className="group">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center text-sm border border-blue-500/20">01</span>
                Non-Refundable Payments
              </h2>
              <div className="pl-11 space-y-4 text-gray-400 leading-relaxed text-sm md:text-base">
                <p>All fees and payments made towards any of our educational programs are non-refundable under any circumstances. This policy applies regardless of withdrawal, cancellation, non-completion, dismissal, or any other reason.</p>
              </div>
            </section>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

            <section className="group">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center text-sm border border-indigo-500/20">02</span>
                Program Access
              </h2>
              <div className="pl-11 space-y-4 text-gray-400 leading-relaxed text-sm md:text-base">
                <p>Once payment is confirmed, participants will receive access to all course materials and resources. This constitutes the completion of our obligation to provide the purchased service.</p>
              </div>
            </section>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

            <section className="group">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center text-sm border border-blue-500/20">03</span>
                Exceptions
              </h2>
              <div className="pl-11 space-y-4 text-gray-400 leading-relaxed text-sm md:text-base">
                <p>Refunds are not provided except in cases where the company is unable to deliver the agreed service due to unforeseen circumstances on our end.</p>
              </div>
            </section>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

            {/* Contact Support */}
            <section className="mt-8 p-6 md:p-8 bg-blue-900/20 border border-blue-500/30 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-xl font-bold text-white mb-2">Commitment to Quality</h2>
                <p className="text-sm text-gray-400 max-w-lg">We are dedicated to offering programs that meet the highest educational standards. If you encounter any issues or require support, please contact us.</p>
              </div>
              <a href="mailto:support@atorax.com" className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-sm transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] whitespace-nowrap">
                support@atorax.com
              </a>
            </section>

            <div className="text-center pt-4">
              <p className="text-xs text-gray-500 italic">By enrolling in our programs, you acknowledge and accept the terms of this No Refund Policy.</p>
            </div>

          </div>
        </div>

        {/* Footer Navigation */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 animate-in fade-in duration-1000 delay-300">
          <Link to="/" className="w-full md:w-auto text-center px-8 py-3.5 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-xl text-sm transition-all border border-white/5">
            Back to Home
          </Link>
          <div className="flex gap-4 w-full md:w-auto">
            <Link to="/Terms" className="flex-1 md:flex-none text-center px-6 py-3.5 bg-transparent hover:bg-white/5 border border-white/10 text-gray-300 hover:text-white font-semibold rounded-xl text-sm transition-all flex items-center justify-center gap-2 group">
              Terms of Service <FaChevronRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0" />
            </Link>
            <Link to="/Privacy" className="flex-1 md:flex-none text-center px-6 py-3.5 bg-transparent hover:bg-white/5 border border-white/10 text-gray-300 hover:text-white font-semibold rounded-xl text-sm transition-all flex items-center justify-center gap-2 group">
              Privacy Policy <FaChevronRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RefundPolicy;
