import React from 'react';

export default function SectionOverview({ onNav }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 pt-20 pb-16">
        <img src={process.env.PUBLIC_URL + "/images/logo.svg"} alt="Transform Health" className="h-10 mb-6" />
        <div className="section-badge bg-teal-light text-teal-dark mb-2">Technical Proposal · March 2026</div>
        <h1 className="text-5xl md:text-6xl font-serif text-ink leading-tight max-w-3xl mb-6">
          Women Leaders<br />
          <span className="text-rose-dark italic">in Digital Health</span>
        </h1>
        <p className="text-lg text-gray-700 max-w-xl leading-relaxed mb-10">
          An interactive, public-facing directory that supports discovery, storytelling and future growth — built at zero ongoing cost for Transform Health.
        </p>
        <div className="flex flex-wrap gap-4 justify-center mb-16">
          <button onClick={() => onNav('directory')}
            className="px-6 py-3 bg-teal text-white rounded-full font-medium hover:bg-teal-dark transition-colors shadow-sm">
            See the directory demo →
          </button>
          <button onClick={() => onNav('brief')}
            className="px-6 py-3 bg-white text-ink border-2 border-gray-300 rounded-full font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors">
            Read the proposal
          </button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-3xl">
          {[
            { num: "$0", label: "Ongoing cost" },
            { num: "3.5 wks", label: "Delivery timeline" },
            { num: "3", label: "Proven products" },
            { num: "$3,500", label: "Total investment" },
          ].map(s => (
            <div key={s.label} className="card text-center">
              <div className="text-3xl font-serif text-rose mb-1">{s.num}</div>
              <div className="text-sm text-gray-700">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Submitted by */}
      <div className="border-t border-gray-200 px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-teal flex items-center justify-center text-white font-bold text-sm">NT</div>
          <div>
            <div className="font-medium text-ink text-sm">Naijeria Toweett</div>
            <div className="text-xs text-gray-700">Product Lead — Design & Build</div>
          </div>
        </div>
        <div className="text-xs text-gray-700">Submitted to hr@transformhealthcoalition.org · 20 March 2026</div>
      </div>
    </div>
  );
}
