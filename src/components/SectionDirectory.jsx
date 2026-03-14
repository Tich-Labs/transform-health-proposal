import React, { useState, useMemo } from 'react';
import { LEADERS, REGIONS, EXPERTISE_AREAS, SECTORS } from '../data';

function ProfileCard({ leader, onClick }) {
  return (
    <div onClick={() => onClick(leader)}
      className="card cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group">
      {leader.featured && (
        <div className="text-xs font-semibold tracking-widest uppercase text-rose mb-3">★ Featured</div>
      )}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal to-rose flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          {leader.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-medium text-ink text-sm leading-tight">{leader.name}</div>
          <div className="text-xs text-gray-700 mt-0.5 leading-tight">{leader.role}</div>
          <div className="text-xs text-teal font-medium mt-0.5">{leader.org}</div>
        </div>
      </div>
      <p className="text-xs text-gray-600 leading-relaxed mb-3 line-clamp-2">{leader.bio}</p>
      <div className="flex flex-wrap gap-1 mb-2">
        {leader.expertise.map(e => <span key={e} className="tag text-xs">{e}</span>)}
      </div>
      <div className="flex items-center gap-3 text-xs text-gray-700 mt-2 pt-2 border-t border-gray-100">
        <span>📍 {leader.country}</span>
        <span>· {leader.sector}</span>
      </div>
    </div>
  );
}

function ProfileModal({ leader, onClose }) {
  if (!leader) return null;
  return (
    <div className="fixed inset-0 bg-gray-900/60 z-50 flex items-center justify-center p-6" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-lg w-full p-8 shadow-xl" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="float-right text-gray-700 hover:text-gray-700 text-xl leading-none">✕</button>
        <div className="flex items-center gap-4 mb-5">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal to-rose flex items-center justify-center text-white font-bold text-xl">
            {leader.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
          <div>
            <h3 className="font-serif text-xl text-ink">{leader.name}</h3>
            <div className="text-sm text-gray-700">{leader.role}</div>
            <div className="text-sm text-teal font-medium">{leader.org}</div>
          </div>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed mb-5">{leader.bio}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {leader.expertise.map(e => <span key={e} className="tag">{e}</span>)}
        </div>
        <div className="grid grid-cols-2 gap-3 text-xs">
          {[
            { label: "Country", val: leader.country },
            { label: "Region", val: leader.region },
            { label: "Sector", val: leader.sector },
            { label: "Language", val: leader.language },
          ].map(r => (
            <div key={r.label} className="bg-gray-50 rounded-lg p-2">
              <div className="text-gray-700 uppercase tracking-wider text-xs mb-0.5">{r.label}</div>
              <div className="text-gray-700 font-medium">{r.val}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SectionDirectory() {
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('All regions');
  const [expertise, setExpertise] = useState('All expertise');
  const [sector, setSector] = useState('All sectors');
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => LEADERS.filter(l => {
    const matchSearch = !search || l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.org.toLowerCase().includes(search.toLowerCase()) ||
      l.bio.toLowerCase().includes(search.toLowerCase()) ||
      l.expertise.some(e => e.toLowerCase().includes(search.toLowerCase()));
    const matchRegion = region === 'All regions' || l.region === region;
    const matchExpertise = expertise === 'All expertise' || l.expertise.includes(expertise);
    const matchSector = sector === 'All sectors' || l.sector === sector;
    return matchSearch && matchRegion && matchExpertise && matchSector;
  }), [search, region, expertise, sector]);

  const totalCountries = new Set(filtered.map(l => l.country)).size;

  return (
    <div className="max-w-5xl mx-auto px-6 py-24">
      <div className="section-badge bg-rose-light text-rose-dark">Live directory demo</div>
      <h2 className="text-4xl font-serif text-ink mb-4">Try the directory.<br /><span className="text-rose italic">Search, filter, explore.</span></h2>
      <p className="text-gray-600 text-lg mb-8 max-w-2xl">
        This is a working prototype using sample data. In production, profiles load live from Google Sheets — updated by the Transform Health team with no developer involvement.
      </p>

      {/* Live stats bar */}
      <div className="flex gap-6 mb-6 p-4 bg-teal-light rounded-xl">
        <div><span className="text-2xl font-serif text-teal">{filtered.length}</span><span className="text-xs text-gray-700 ml-1">leaders</span></div>
        <div><span className="text-2xl font-serif text-teal">{totalCountries}</span><span className="text-xs text-gray-700 ml-1">countries</span></div>
        {search || region !== 'All regions' || expertise !== 'All expertise' || sector !== 'All sectors' ? (
          <button onClick={() => { setSearch(''); setRegion('All regions'); setExpertise('All expertise'); setSector('All sectors'); }}
            className="ml-auto text-xs text-rose underline hover:no-underline">Clear filters</button>
        ) : null}
      </div>

      {/* Search + filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, org, expertise..."
          className="flex-1 min-w-[200px] px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 bg-white" />
        <select value={region} onChange={e => setRegion(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 bg-white text-gray-700">
          {REGIONS.map(r => <option key={r}>{r}</option>)}
        </select>
        <select value={expertise} onChange={e => setExpertise(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 bg-white text-gray-700">
          {EXPERTISE_AREAS.map(r => <option key={r}>{r}</option>)}
        </select>
        <select value={sector} onChange={e => setSector(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 bg-white text-gray-700">
          {SECTORS.map(r => <option key={r}>{r}</option>)}
        </select>
      </div>

      {/* Cards grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-700">
          <div className="text-4xl mb-3">🔍</div>
          <div className="text-sm">No leaders match these filters. <button onClick={() => { setSearch(''); setRegion('All regions'); setExpertise('All expertise'); setSector('All sectors'); }} className="text-rose underline">Clear all</button></div>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(l => <ProfileCard key={l.id} leader={l} onClick={setSelected} />)}
        </div>
      )}

      <ProfileModal leader={selected} onClose={() => setSelected(null)} />

      <div className="mt-10 callout callout-teal text-sm text-gray-600 leading-relaxed">
        <strong className="text-teal">In production:</strong> Profile data loads from a Google Sheet via the Sheets API. The Transform Health team edits rows directly — new leaders appear on the live directory within minutes, with no developer involvement required.
      </div>
    </div>
  );
}
