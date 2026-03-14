import React from 'react';

const timeline = [
  { date: "27 Mar 2026", label: "Project kick-off", desc: "Discovery call, dataset handover, brand guidelines review" },
  { date: "1 Apr 2026", label: "Platform recommendation confirmed", desc: "This document, plus alignment call on filters, data model, and embed approach" },
  { date: "17 Apr 2026", label: "Interactive directory live", desc: "Fully functional public directory: profile cards, search, multi-filter, visualisation layer, mobile-responsive, accessible, embed-ready" },
  { date: "21 Apr 2026", label: "Handover documentation", desc: "Step-by-step guide for non-technical staff, dependencies, licenses, future expansion guidance" },
];

const scope = [
  "Platform architecture and data model design",
  "Custom React + Tailwind frontend — profile cards, search, multi-filter, profile detail view",
  "Visualisation layer — live stats bar, expertise charts, region breakdown",
  "Google Sheets integration — non-technical CMS for the Transform Health team",
  "Mobile-responsive, WCAG 2.1 accessible implementation",
  "GitHub Pages deployment and embed configuration",
  "Up to two rounds of revisions on the interactive database",
  "Handover documentation written for the specific team member who will own it",
];

export default function SectionFee() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24">
      <div className="section-badge bg-rose-light text-rose-dark">Fee & timeline</div>
      <h2 className="text-4xl font-serif text-ink mb-4">USD 3,500.<br /><span className="text-rose italic">50% on signing.</span></h2>
      <p className="text-gray-600 text-lg mb-12 max-w-2xl">
        The top of the stated budget range — reflecting a scope that delivers significantly more than the brief describes, at zero ongoing cost to Transform Health.
      </p>

      {/* Fee breakdown */}
      <div className="grid sm:grid-cols-2 gap-4 mb-12">
        <div className="callout callout-rose">
          <div className="text-xs font-semibold tracking-widest uppercase text-rose mb-2">Total fee</div>
          <div className="text-4xl font-serif text-rose mb-1">USD 3,500</div>
          <div className="text-sm text-gray-600">Inclusive of all design, development, revisions and final delivery</div>
        </div>
        <div className="callout callout-teal">
          <div className="text-xs font-semibold tracking-widest uppercase text-teal mb-3">Payment schedule</div>
          <div className="flex flex-col gap-2 text-sm text-gray-700">
            <div className="flex justify-between"><span>50% on contract signing</span><span className="font-medium text-teal">USD 1,750</span></div>
            <div className="h-px bg-teal/20"></div>
            <div className="flex justify-between"><span>50% on final delivery</span><span className="font-medium text-teal">USD 1,750</span></div>
          </div>
        </div>
      </div>

      {/* Scope */}
      <h3 className="text-xl font-serif text-ink mb-4">What is included</h3>
      <div className="card mb-12">
        <div className="flex flex-col gap-2">
          {scope.map(s => (
            <div key={s} className="flex gap-3 text-sm text-gray-700 py-1 border-b border-gray-100 last:border-0">
              <span className="text-teal font-bold flex-shrink-0">✓</span>
              <span>{s}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-700">
          Ongoing infrastructure cost to Transform Health after handover: <strong className="text-gray-700">$0</strong>
        </div>
      </div>

      {/* Timeline */}
      <h3 className="text-xl font-serif text-ink mb-6">Delivery timeline</h3>
      <div className="relative pl-6 border-l-2 border-gray-200 flex flex-col gap-8">
        {timeline.map((t, i) => (
          <div key={t.date} className="relative">
            <div className="absolute -left-[25px] w-4 h-4 rounded-full bg-white border-2 border-rose flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-rose"></div>
            </div>
            <div className="text-xs font-mono text-gray-700 mb-1">{t.date}</div>
            <div className="font-medium text-ink text-sm">{t.label}</div>
            <div className="text-sm text-gray-600 leading-relaxed mt-0.5">{t.desc}</div>
          </div>
        ))}
      </div>

      <div className="mt-14 p-6 bg-ink text-white rounded-2xl">
        <div className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-3">Ready to start</div>
        <p className="text-white/80 text-sm leading-relaxed mb-4">
          Subject to contract signing by 27 March 2026, all three deliverables can be completed within the stated timeline. I am available for a discovery call at any point before then.
        </p>
        <div className="flex flex-wrap gap-4 text-sm">
          <div><span className="text-white/40">Submitted by</span> <span className="font-medium">Naijeria Toweett</span></div>
          <div><span className="text-white/40">Contact</span> <span className="font-medium">naijeria.toweett@[email]</span></div>
        </div>
      </div>
    </div>
  );
}
