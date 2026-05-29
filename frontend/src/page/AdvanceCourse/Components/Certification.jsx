import React from "react";
import { ShieldCheck, TrendingUp, Globe, Award } from "lucide-react";
import advance from "../../../assets/certificates/Advance/Advance certificate completion.jpg";

const certPoints = [
  {
    Icon: ShieldCheck,
    title: "Industrial Validation",
    desc: "Graduates receive a unique verifiable ID that establishes project-based competency in your domain.",
  },
  {
    Icon: TrendingUp,
    title: "Hiring Signal",
    desc: "Our certification is recognized as a Tier-1 Hiring Signal by our network of 500+ global corporate partners.",
  },
  {
    Icon: Globe,
    title: "Institutional Mobility",
    desc: "The Atorax credential facilitates seamless transition into high-growth roles in international tech hubs.",
  },
];

const Certification = () => {
  return (
    <div className="py-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center mb-14 text-center">
          <span className="inline-flex items-center gap-2 mb-5 px-5 py-2 bg-primary/15 border border-primary/20 rounded-full text-primary text-[11px] font-extrabold uppercase tracking-[1.5px]">
            <Award size={12} /> Professional Credential
          </span>
          <h2 className="font-outfit font-black text-3xl md:text-5xl mb-4 text-text">
            Global <span className="text-primary">Certification</span>
          </h2>
          <p className="max-w-xl text-textMuted text-lg leading-relaxed font-medium">
            Evidence your expertise with a professional-grade certification recognized by 500+ global technology and finance partners.
          </p>
        </div>

        {/* Card */}
        <div className="lg:flex items-center gap-14 rounded-2xl p-8 md:p-12 bg-surface2 border border-border">
          {/* Image */}
          <div className="lg:w-[45%] w-full mb-8 lg:mb-0">
            <div className="relative group">
              <div className="absolute -inset-4 rounded-3xl bg-primary/20 blur-2xl opacity-0 group-hover:opacity-30 transition duration-700" />
              <div className="relative overflow-hidden rounded-2xl border border-border">
                <img
                  src={advance}
                  alt="Professional Certification"
                  className="w-full transform group-hover:scale-[1.02] transition-transform duration-700"
                />
              </div>
            </div>
          </div>

          {/* Points */}
          <div className="lg:w-[55%] w-full">
            <div className="space-y-8">
              {certPoints.map(({ Icon, title, desc }, i) => (
                <div key={i} className="flex gap-5 group">
                  <div className="w-12 h-12 shrink-0 rounded-xl bg-primary/15 flex items-center justify-center text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <Icon size={24} strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-text mb-1">{title}</h3>
                    <p className="text-sm text-textMuted leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-6 border-t border-border flex items-center gap-3 opacity-60">
              <img
                src="https://img.icons8.com/color/48/linkedin.png"
                className="w-5 h-5 grayscale hover:grayscale-0 transition-all cursor-pointer"
                alt="LinkedIn"
              />
              <span className="text-[11px] font-bold text-textMuted uppercase tracking-widest">
                Shareable on global networks
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certification;
