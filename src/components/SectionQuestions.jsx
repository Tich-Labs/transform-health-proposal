import React, { useState } from 'react';

const groups = [
  {
    id: "data", label: "Data & profiles", color: "bg-teal-light border-teal/20", badge: "bg-teal text-white",
    questions: [
      { q: "How are women currently added to the database — nomination form or curated internally?", why: "If a submission form exists or is planned, I can pipe it into the backend so new profiles flow in automatically with a staff approval toggle — no manual data entry." },
      { q: "How many profiles does the current Canva database contain, and what fields does each profile include?", why: "This determines the data model and which filters are meaningful at launch versus aspirational." },
      { q: "Are profile photos available for all leaders, or will some profiles launch without one?", why: "Missing photos need a graceful fallback — initials or a placeholder — so visual consistency is maintained across the directory." },
    ]
  },
  {
    id: "story", label: "Visualisation & storytelling", color: "bg-rose-light border-rose/20", badge: "bg-rose text-white",
    questions: [
      { q: "Are there specific narratives you want the data to surface — geographic distribution, expertise gaps, sector diversity?", why: "This shapes whether the visualisation layer is a simple stats bar or a richer interactive map and breakdown — both achievable within budget." },
      { q: "Is the database primarily for external audiences or also internal use by the Transform Health team?", why: "External-first means the public UX is everything. Internal use may also require a richer admin view with contact history and notes." },
      { q: "What are the two or three most common use cases you want to support at launch?", why: "Concrete use cases drive filter and search design better than abstract requirements. The right filters are the ones that match real search behaviour." },
    ]
  },
  {
    id: "tech", label: "Technical & integration", color: "bg-amber-50 border-amber-200", badge: "bg-amber-500 text-white",
    questions: [
      { q: "What platform is the Transform Health website built on — WordPress, Squarespace, Webflow, or another CMS?", why: "This determines how the directory is embedded. Most platforms support iframe embeds; some also support direct component integration for a more seamless experience." },
      { q: "Does Transform Health have brand guidelines — colour palette, typography, logo usage — available to share at project start?", why: "Applied from day one, not retrofitted. If guidelines are not yet documented, I can work from visual references." },
      { q: "Who on the team will own the database post-launch — communications, policy, or a data role?", why: "I will design the handover documentation specifically for that person's technical comfort level." },
    ]
  },
  {
    id: "growth", label: "Future growth", color: "bg-purple-50 border-purple-200", badge: "bg-purple-600 text-white",
    questions: [
      { q: "Is there a vision for leaders to eventually manage or update their own profiles?", why: "Building with this in mind from the start — an auth layer, a self-edit form — is far cheaper than retrofitting it. I can lay the groundwork without fully building it now." },
      { q: "Are there plans to grow the database to 500+ profiles, and if so over what timeframe?", why: "Google Sheets supports up to 10 million cells — effectively unlimited here. But if query complexity grows significantly, I'll design a clear migration path to Supabase from the start." },
    ]
  },
];

export default function SectionQuestions() {
  const [open, setOpen] = useState({});
  const toggle = (id) => setOpen(o => ({ ...o, [id]: !o[id] }));

  return (
    <div className="max-w-4xl mx-auto px-6 py-24">
      <div className="section-badge bg-amber-100 text-amber-700">Discovery questions</div>
      <h2 className="text-4xl font-serif text-ink mb-4">Questions before<br /><span className="text-teal italic">a single line of code.</span></h2>
      <p className="text-gray-600 text-lg mb-4 max-w-2xl">
        These questions are included not to create uncertainty — but to show how I think about building the right product. The answers will shape key architecture decisions before work begins.
      </p>
      <p className="text-sm text-gray-600 mb-10">Click any question to see why it matters.</p>

      <div className="flex flex-col gap-4">
        {groups.map(g => (
          <div key={g.id} className={`rounded-xl border p-5 ${g.color}`}>
            <div className="flex items-center gap-3 mb-4">
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${g.badge}`}>{g.label}</span>
            </div>
              <div className="flex flex-col gap-3">
              {g.questions.map((item, i) => {
                const id = `${g.id}-${i}`;
                return (
                  <div key={id} className="bg-white rounded-xl overflow-hidden border border-gray-100">
                    <button onClick={() => toggle(id)}
                      className="w-full text-left px-4 py-3 flex items-start gap-3 hover:bg-gray-50 transition-colors">
                      <span className="text-gray-700 text-sm font-mono mt-0.5">{String(i + 1).padStart(2, '0')}</span>
                      <span className="text-sm text-ink font-medium leading-relaxed flex-1">{item.q}</span>
                      <span className="text-gray-700 text-sm ml-2">{open[id] ? '▲' : '▼'}</span>
                    </button>
                    {open[id] && (
                      <div className="px-4 pb-4 pt-1 border-t border-gray-100">
                        <div className="text-xs font-semibold tracking-widest uppercase text-gray-700 mb-1">Why this matters</div>
                        <p className="text-sm text-gray-600 leading-relaxed">{item.why}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
