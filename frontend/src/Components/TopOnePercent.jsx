import React from "react";
import {
  MonitorPlay,
  CalendarDays,
  BarChart3,
  FileSearch,
  Building2,
  BadgeCheck,
  UserCheck,
  TrendingUp,
} from "lucide-react";

const features = [
  {
    Icon: MonitorPlay,
    title: "100% Live Interactive Classes",
    sub: "Learn directly from research-oriented IIIT Hyderabad faculty. Interactive sessions with concept-to-application focus.",
  },
  {
    Icon: CalendarDays,
    title: "16-Week Intensive Career Program",
    sub: "Follow a structured, week-by-week roadmap. Master everything from core fundamentals to advanced industry-standard tools.",
  },
  {
    Icon: BarChart3,
    title: "Real Industry Projects & Case Studies",
    sub: "Build a job-ready portfolio. Work on actual business datasets from retail, finance, and healthcare sectors.",
  },
  {
    Icon: FileSearch,
    title: "Premium Career Support Ecosystem",
    sub: "Get noticed by top recruiters. We optimize your professional profiles and conduct technical mock interviews.",
  },
  {
    Icon: Building2,
    title: "15 Guaranteed Interview Opportunities*",
    sub: "Fast-track your job search. Get direct access to 500+ hiring partners actively looking for talent.",
  },
  {
    Icon: BadgeCheck,
    title: "Multiple Industry Certifications",
    sub: "Validate your expertise. Earn industry-recognized credentials that demonstrate your proficiency to global employers.",
  },
  {
    Icon: UserCheck,
    title: "Expert Mentorship from Industry Leaders",
    sub: "Get industry-specific guidance. Learn directly from professionals currently working as Lead Experts and Senior Architects.",
  },
  {
    Icon: TrendingUp,
    title: "Built for Serious Career Growth",
    sub: "Targeted at career success. Every module is engineered to bridge the gap between your current role and your target career.",
  },
];

const TopOnePercent = ({
  badge = "Program Highlights",
  title = "Built for",
  titleHighlight = "Serious Career Growth",
  subtitle = "Gain the technical depth required to build production-grade agentic systems and AI infrastructure.",
  customFeatures = null,
}) => {
  const displayFeatures = customFeatures || features;

  return (
    <section className="py-24 px-6" style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}>
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-left mb-14">
          <span className="inline-block bg-primary/15 text-primary font-extrabold text-[11px] uppercase tracking-[1.5px] px-5 py-2 rounded-full mb-6">
            {badge}
          </span>
          <h2
            className="font-outfit font-black text-text leading-[1.1] tracking-[-0.02em] mb-0"
            style={{ fontSize: "clamp(32px, 4vw, 48px)" }}
          >
            {title}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-400">
              {titleHighlight}
            </span>
          </h2>
          <p className="mt-4 text-[17px] text-textMuted font-medium max-w-xl leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {displayFeatures.map(({ Icon, title, sub }, i) => {
            const bulletPoints = sub.split(". ").filter((s) => s.trim().length > 0);
            return (
              <div
                key={i}
                className="bg-surface2 border border-border rounded-2xl p-6 relative transition-all duration-250 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] group"
              >
                {/* Icon */}
                <div className="absolute top-6 right-6 w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary transition-transform group-hover:scale-105">
                  <Icon size={24} strokeWidth={1.5} />
                </div>

                {/* Title */}
                <div className="text-[16px] font-semibold text-text leading-snug mb-5 mr-14 font-outfit">
                  {title}
                </div>

                {/* Bullets */}
                <div className="text-[13px] text-textMuted font-normal leading-relaxed flex flex-col gap-2.5">
                  {bulletPoints.map((pt, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <span className="mt-[5px] w-1 h-1 rounded-full bg-textMuted shrink-0" />
                      <span>{pt.endsWith(".") ? pt : pt + "."}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Disclaimer */}
        <p className="mt-8 text-[11px] text-textMuted italic text-center">
          * Interview opportunities are subject to eligibility criteria and partner availability.
        </p>
      </div>
    </section>
  );
};

export default TopOnePercent;
