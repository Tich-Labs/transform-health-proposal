import React from 'react';

const problems = [
  { icon: "🔍", title: "No search or filtering", desc: "Users cannot search by name, expertise, geography or sector. Discovery is impossible at scale." },
  { icon: "📱", title: "Not mobile-optimised", desc: "Static Canva layouts break on mobile — the majority of how global health professionals browse." },
  { icon: "🔄", title: "Manual updates required", desc: "Every new profile requires design work in Canva. Non-technical staff cannot update independently." },
  { icon: "📈", title: "Does not scale", desc: "At 50 profiles the format is unwieldy. At 200+ it becomes unusable." },
];

const needs = [
  { label: "Discovery", desc: "Filterable by geography, expertise, sector, role, language — combinable, live-updating" },
  { label: "Storytelling", desc: "Visual layer that shows what the data reveals about women in digital health globally" },
  { label: "Future growth", desc: "Architecture that scales without cost, with non-technical content management built in" },
  { label: "Public-facing", desc: "Embeddable on transformhealthcoalition.org, accessible, on-brand, mobile-first" },
];

export default function SectionBrief() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24">
      <div className="section-badge bg-teal-light text-teal-dark">Understanding the brief</div>
      <h2 className="text-4xl font-serif text-ink mb-4">This is not a dashboard.<br /><span className="text-teal italic">It's a people discovery product.</span></h2>
      <p className="text-gray-600 text-lg mb-12 max-w-2xl">
        The ToR references Tableau and Power BI — but those tools are built for analytical charts and KPIs. What Transform Health actually needs is closer to a WHO expert finder or TED speaker directory.
      </p>

      <h3 className="text-xl font-serif text-ink mb-6">Why the current Canva version fails</h3>
      <div className="grid sm:grid-cols-2 gap-4 mb-14">
        {problems.map(p => (
          <div key={p.title} className="card flex gap-4">
            <span className="text-2xl">{p.icon}</span>
            <div>
              <div className="font-medium text-ink mb-1">{p.title}</div>
              <div className="text-sm text-gray-600 leading-relaxed">{p.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <h3 className="text-xl font-serif text-ink mb-6">What the product actually needs to do</h3>
      <div className="grid sm:grid-cols-2 gap-4 mb-12">
        {needs.map(n => (
          <div key={n.label} className="callout callout-teal">
            <div className="text-xs font-semibold tracking-widest uppercase text-teal mb-2">{n.label}</div>
            <div className="text-sm text-ink/70 leading-relaxed">{n.desc}</div>
          </div>
        ))}
      </div>

      <div className="callout callout-rose">
        <div className="text-xs font-semibold tracking-widest uppercase text-rose mb-2">The right framing</div>
        <p className="text-sm text-ink/70 leading-relaxed">
          Tableau and Power BI are excellent for analytical dashboards — charts, KPIs, trend analysis. Embedded as a public-facing profile explorer, they produce a clunky, chart-heavy experience that does not support rich profile cards, bios, or brand-consistent presentation. The approach in this proposal delivers a richer, more accessible, and more on-brand result at <strong>zero ongoing cost</strong>.
        </p>
      </div>
    </div>
  );
}
