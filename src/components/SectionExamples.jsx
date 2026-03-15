import React, { useState } from 'react';

const examples = [
  {
    id: "rafikey", order: "01", priority: "Product 1",
    title: "AskRafikey", subtitle: "Youth SRHR Health Companion · Kenya · 7-org coalition",
    priorityColor: "bg-teal text-white",
    summary: "A public-facing youth health platform built within a 7-organisation health coalition — combining AI-powered SRHR information, 18 verified topic areas, a GPS-based service finder, and a full admin CMS. The AI bot is retrained instantly by uploading new content and clicking a button — no developer needed for ongoing updates.",
    link: "https://rafikey-portfolio.lovable.app",
    linkLabel: "View case study →",
    videoLink: "https://drive.google.com/file/d/17TNt35CkR-pn1wF9QJW5dmDgJPienuKZ/view",
    matches: [
      "Admin CMS for non-technical coalition staff — exact requirement Transform Health states",
      "Public-facing product designed for excluded, low-literacy users — equity-first design",
      "Service finder with category and location filtering — same interaction logic as geography/expertise filters",
      "Multi-organisation coalition delivery with distributed teams across Kenya",
      "Accessibility-first design with privacy mode and crisis detection",
    ],
    tags: ["Coalition CMS", "Public-facing product", "Search & filtering", "Non-technical handover", "Global health"],
  },
  {
    id: "nairobi", order: "02", priority: "Product 2",
    title: "NairobiTalks", subtitle: "GovTech Civic Platform · World Bank · Nairobi County Government",
    priorityColor: "bg-purple-600 text-white",
    summary: "A civic tech platform conceived, designed, and shipped during a 1.5-day co-design sprint with the World Bank and Nairobi County Government. Features a filterable admin dashboard, public citizen discovery interface, and full handover documentation designed for non-technical county IT teams.",
    link: "https://mamatechafrica.github.io/NairobiTalks-NCG/",
    linkLabel: "View case study →",
    videoNote: null,
    matches: [
      "Filterable dashboard by ward, sector, issue and demographic — maps directly to Women Leaders filter requirements",
      "Handover designed for non-technical government staff — same principle as Transform Health's update requirement",
      "Multi-stakeholder co-design: government, civil society, World Bank",
      "Delivered under extreme time pressure — signals efficiency within the 3.5-week timeline",
      "Built to be owned, not just delivered — open source, MIT licensed",
    ],
    tags: ["Filterable dashboard", "World Bank partner", "Non-technical handover", "Fast delivery", "Civic tech"],
  },
  {
    id: "powerbi", order: "03", priority: "Product 3",
    title: "Washington DC Crime Analysis", subtitle: "Power BI · Capstone Project · Group 3",
    priorityColor: "bg-amber-500 text-white",
    summary: "An interactive Power BI dashboard analysing 3,866 crime records across Washington DC — featuring geospatial hotspot mapping, time-of-day KPI analysis, Crime Severity Index, and neighbourhood cluster distribution. Demonstrates data visualisation fluency and analytical depth.",
    link: null,
    linkLabel: null,
    videoNote: null,
    matches: [
      "Geospatial visualisation — directly relevant to the global geography dimension of the Women Leaders directory",
      "KPI design and structured data analysis — shows analytical rigour beyond visual design",
      "Power BI proficiency — confirms familiarity with the tools referenced in the ToR",
      "Shows ability to read complex datasets and surface meaningful patterns",
    ],
    tags: ["Power BI", "Geospatial viz", "Data analysis", "Dashboard design"],
  },
];

export default function SectionExamples() {
  const [active, setActive] = useState('rafikey');
  const ex = examples.find(e => e.id === active);

  return (
    <div className="max-w-4xl mx-auto px-6 py-24">
      <div className="section-badge bg-teal-light text-teal-dark">Profile & experience</div>
      <h2 className="text-4xl font-serif text-ink mb-4">Selected work.<br /><span className="text-teal italic">Relevant to this brief.</span></h2>
      <p className="text-gray-600 text-lg mb-10 max-w-2xl">
        Examples framed against the Transform Health ToR requirements. Full CV attached separately.
      </p>

      {/* Example tabs */}
      <div className="flex flex-wrap gap-3 mb-8">
        {examples.map(e => (
          <button key={e.id} onClick={() => setActive(e.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${active === e.id ? 'bg-ink text-white border-ink' : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'}`}>
            <span className="font-mono text-xs opacity-50">{e.order}</span>
            {e.title}
          </button>
        ))}
      </div>

      {ex && (
        <div className="card">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${ex.priorityColor}`}>{ex.priority}</span>
                {ex.link && (
                  <a href={ex.link} target="_blank" rel="noopener noreferrer"
                    className="text-xs text-teal underline hover:no-underline">{ex.linkLabel}</a>
                )}
              </div>
              <h3 className="font-serif text-2xl text-ink">{ex.title}</h3>
              <div className="text-sm text-gray-700 mt-0.5">{ex.subtitle}</div>
            </div>
          </div>

          <p className="text-sm text-gray-700 leading-relaxed mb-5">{ex.summary}</p>

          {ex.videoLink && (
            <div className="mb-5">
              <div className="text-xs font-semibold tracking-widest uppercase text-gray-700 mb-2">Admin dashboard walkthrough</div>
              <iframe 
                src="https://drive.google.com/file/d/17TNt35CkR-pn1wF9QJW5dmDgJPienuKZ/preview" 
                className="w-full aspect-video rounded-lg border border-gray-200"
                allow="autoplay"
                title="Admin dashboard walkthrough"
              />
            </div>
          )}

          <div className="mb-5">
            <div className="text-xs font-semibold tracking-widest uppercase text-gray-700 mb-3">Directly answers these ToR requirements</div>
            <div className="flex flex-col gap-2">
              {ex.matches.map(m => (
                <div key={m} className="flex gap-3 text-sm text-gray-700 leading-relaxed">
                  <span className="text-teal font-bold flex-shrink-0">✓</span>
                  <span>{m}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
            {ex.tags.map(t => <span key={t} className="tag">{t}</span>)}
          </div>
        </div>
      )}
    </div>
  );
}
