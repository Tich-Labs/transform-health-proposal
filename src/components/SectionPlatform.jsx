import React from 'react';

const stack = [
  { layer: "Data layer", tool: "Google Sheets", cost: "$0 forever", detail: "The team edits profiles in a Google Sheet — a tool they already use. Each row is a leader. The free Sheets API serves data live to the frontend. No new accounts, no new tools, no record limits.", color: "bg-teal-light border-teal/20", badge: "bg-teal text-white" },
  { layer: "Frontend", tool: "React + Tailwind CSS", cost: "$0 forever", detail: "A custom React application renders the public directory with full design control — matching Transform Health brand guidelines precisely. Built-in search, multi-filter, profile cards, map, and charts. Fully mobile-responsive (desktop + mobile) and WCAG 2.1 AA accessible.", color: "bg-rose-light border-rose/20", badge: "bg-rose text-white" },
  { layer: "Hosting", tool: "GitHub Pages", cost: "$0 forever", detail: "Deployed free to GitHub Pages. Delivered as a single iframe embed line for the Transform Health website. No server infrastructure, no DevOps, no ongoing maintenance cost.", color: "bg-amber-50 border-amber-200", badge: "bg-amber-500 text-white" },
  { layer: "Visualisation", tool: "Recharts + Leaflet.js", cost: "$0 forever", detail: "Open-source libraries for the world map (Leaflet / React Simple Maps) and expertise charts (Recharts). Both are free, well-documented, and integrate directly into the React frontend.", color: "bg-purple-50 border-purple-200", badge: "bg-purple-600 text-white" },
];

const comparison = [
  { option: "★ Google Sheets + React + GitHub Pages", cost: "$0 forever", updates: "Edit Google Sheet", recommended: true },
  { option: "Notion + React + GitHub Pages", cost: "$0 free tier", updates: "Edit Notion database", recommended: false },
  { option: "Supabase + React + Vercel", cost: "$0 free tier", updates: "Supabase table editor", recommended: false },
  { option: "Airtable + React + GitHub Pages", cost: "$0–20/mo", updates: "Edit Airtable rows", recommended: false },
  { option: "Tableau / Power BI", cost: "$70+/mo", updates: "Developer required", recommended: false },
];

export default function SectionPlatform() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24">
      <div className="section-badge bg-teal-light text-teal-dark">Platform recommendation</div>
      <h2 className="text-4xl font-serif text-ink mb-4">Zero cost.<br /><span className="text-teal italic">No lock-in. No new tools.</span></h2>
      <p className="text-gray-600 text-lg mb-12 max-w-2xl">
        The recommended stack keeps every layer at zero ongoing cost — using tools Transform Health's team almost certainly already knows. Delivers a fully responsive (desktop + mobile) directory, WCAG 2.1 AA accessible, at zero ongoing cost.
      </p>

      <div className="flex flex-col gap-4 mb-14">
        {stack.map((s, i) => (
          <div key={s.layer} className={`rounded-xl border p-5 ${s.color}`}>
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center gap-2 min-w-[80px]">
                <span className="text-xs font-medium text-gray-700 uppercase tracking-wider">{s.layer}</span>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${s.badge}`}>{s.cost}</span>
              </div>
              <div className="flex-1">
                <div className="font-serif text-lg text-ink mb-1">{s.tool}</div>
                <div className="text-sm text-gray-700 leading-relaxed">{s.detail}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h3 className="text-xl font-serif text-ink mb-4">Platform comparison</h3>
      <div className="overflow-x-auto rounded-xl border border-gray-200 mb-10">
        <table className="w-full text-sm">
          <thead className="bg-ink text-white">
            <tr>
              <th className="text-left px-4 py-3 font-medium">Option</th>
              <th className="text-left px-4 py-3 font-medium">Cost</th>
              <th className="text-left px-4 py-3 font-medium">Non-tech updates</th>
            </tr>
          </thead>
          <tbody>
            {comparison.map((c, i) => (
              <tr key={c.option} className={`border-t border-gray-100 ${c.recommended ? 'bg-teal-light font-medium' : i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                <td className={`px-4 py-3 ${c.recommended ? 'text-teal-dark' : 'text-gray-700'}`}>{c.option}</td>
                <td className={`px-4 py-3 ${c.recommended ? 'text-teal-dark' : 'text-gray-700'}`}>{c.cost}</td>
                <td className={`px-4 py-3 ${c.recommended ? 'text-teal-dark' : 'text-gray-700'}`}>{c.updates}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="rounded-xl border-2 border-teal p-6 bg-teal-light/30">
          <div className="text-xs font-bold text-teal mb-2">Option 1: Recommended</div>
          <div className="font-serif text-lg text-ink mb-3">Google Sheets + React</div>
          <ul className="text-sm text-gray-700 space-y-2">
            <li className="flex gap-2"><span className="text-teal font-bold">✓</span> Zero ongoing cost</li>
            <li className="flex gap-2"><span className="text-teal font-bold">✓</span> Team already knows Google Sheets</li>
            <li className="flex gap-2"><span className="text-teal font-bold">✓</span> Full design control</li>
            <li className="flex gap-2"><span className="text-teal font-bold">✓</span> Non-technical updates in minutes</li>
          </ul>
        </div>
        <div className="rounded-xl border border-gray-200 p-6 bg-white">
          <div className="text-xs font-bold text-gray-500 mb-2">Option 2: Alternative</div>
          <div className="font-serif text-lg text-ink mb-3">Notion + React</div>
          <ul className="text-sm text-gray-700 space-y-2">
            <li className="flex gap-2"><span className="text-gray-400">•</span> Richer content handling</li>
            <li className="flex gap-2"><span className="text-gray-400">•</span> Still zero cost</li>
            <li className="flex gap-2"><span className="text-gray-400">•</span> If team prefers Notion</li>
            <li className="flex gap-2"><span className="text-gray-400">•</span> Slightly more complex setup</li>
          </ul>
        </div>
      </div>

      <div className="mt-8 callout callout-teal">
        <div className="text-xs font-semibold tracking-widest uppercase text-teal mb-2">Non-technical update workflow</div>
        <p className="text-sm text-gray-700 leading-relaxed">
          The Transform Health team opens the Google Sheet → adds a row for a new leader or edits an existing profile → changes appear on the live public directory within minutes. No developer required, no deployment step, no pull requests. Photos go to a shared Google Drive folder; the URL is pasted into the profile row.
        </p>
      </div>
    </div>
  );
}
