import React, { useState } from 'react';
import { LEADERS } from '../data';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';

const expertiseCounts = () => {
  const counts = {};
  LEADERS.forEach(l => l.expertise.forEach(e => { counts[e] = (counts[e] || 0) + 1; }));
  return Object.entries(counts).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
};

const sectorCounts = () => {
  const counts = {};
  LEADERS.forEach(l => { counts[l.sector] = (counts[l.sector] || 0) + 1; });
  return Object.entries(counts).map(([name, value]) => ({ name, value }));
};

const regionCounts = () => {
  const counts = {};
  LEADERS.forEach(l => { counts[l.region] = (counts[l.region] || 0) + 1; });
  return Object.entries(counts).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
};

const featuredLeaders = () => LEADERS.filter(l => l.featured);

const ROSE = '#C8506A';
const TEAL = '#1A7B72';
const COLORS = [TEAL, '#2B9E94', '#3DB8AD', ROSE, '#D4687F', '#E08090', '#5A8FD4', '#7AAEE0'];

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

const countryCoordinates = {
  "USA": [-95.7129, 37.0902],
  "Kenya": [37.9062, -0.0236],
  "India": [78.9629, 20.5937],
  "Jordan": [36.2384, 30.5852],
  "Brazil": [-51.9253, -14.2350],
  "Nigeria": [8.6753, 9.0820],
  "China": [104.1954, 35.8617],
  "South Africa": [22.9375, -30.5595],
};

const layers = [
  {
    id: "stats", title: "Live representation stats", badge: "Layer 1",
    badgeColor: "bg-teal text-white",
    desc: "A hero stats bar at the top of the directory shows total leaders, countries, and expertise areas — updating live as filters are applied. Filtering to 'Sub-Saharan Africa + AI/ML' instantly shows matching leaders.",
    tech: "Pure JavaScript · Zero additional library · Zero cost",
  },
  {
    id: "map", title: "Interactive world map", badge: "Layer 2",
    badgeColor: "bg-rose text-white",
    desc: "A dot map shows leader density by country. Clicking a country filters the directory — the map and directory work as one exploration interface. A user immediately sees women digital health leaders distributed across Africa, Asia, Latin America.",
    tech: "React Simple Maps · Open source · Zero cost",
  },
  {
    id: "charts", title: "Expertise & sector breakdown", badge: "Layer 3",
    badgeColor: "bg-purple-600 text-white",
    desc: "Visual breakdown of which expertise areas and sectors are represented — and where gaps exist. This serves Transform Health's equity mandate directly: making visible not just who is in the database, but what the database reveals about the landscape.",
    tech: "Recharts · Open source · Zero cost",
  },
  {
    id: "featured", title: "Featured leaders & editorial control", badge: "Layer 4",
    badgeColor: "bg-amber-500 text-white",
    desc: "A checkbox column in Google Sheets ('Featured: TRUE/FALSE') lets the team surface specific leaders for campaigns, thematic spotlights, or regional focus weeks — full editorial control with zero developer involvement.",
    tech: "Google Sheets checkbox · No code · Zero cost",
  },
];

export default function SectionVisualisation({ onNavigate }) {
  const [activeLayer, setActiveLayer] = useState('stats');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const expertiseData = expertiseCounts();
  const sectorData = sectorCounts();
  const regionData = regionCounts();
  const featured = featuredLeaders();

  const totalCountries = new Set(LEADERS.map(l => l.country)).size;
  const totalExpertise = new Set(LEADERS.flatMap(l => l.expertise)).size;

  const countryLeaderCount = LEADERS.reduce((acc, l) => {
    acc[l.country] = (acc[l.country] || 0) + 1;
    return acc;
  }, {});

  const handleCountryClick = (countryName) => {
    setSelectedCountry(countryName);
    if (onNavigate && countryName) {
      onNavigate('directory');
    }
  };

  const renderPreview = () => {
    switch (activeLayer) {
      case 'stats':
        return (
          <div>
            <div className="text-sm font-medium text-gray-700 mb-4 pb-2 border-b border-gray-200">
              Live data preview — sample dataset
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { num: LEADERS.length, label: "Leaders" },
                { num: totalCountries, label: "Countries" },
                { num: totalExpertise, label: "Expertise areas" },
              ].map(s => (
                <div key={s.label} className="callout callout-teal text-center">
                  <div className="text-3xl font-serif text-teal mb-1">{s.num}</div>
                  <div className="text-xs text-gray-700">{s.label}</div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-4">Stats update live as users apply filters — try selecting "Sub-Saharan Africa" in the directory.</p>
          </div>
        );

      case 'map':
        return (
          <div>
            <div className="text-sm font-medium text-gray-700 mb-4 pb-2 border-b border-gray-200">
              Live data preview — sample dataset (click a marker to explore)
            </div>
            <div className="card p-0 overflow-hidden" style={{ height: 400 }}>
              <ComposableMap projection="geoMercator" projectionConfig={{ scale: 120 }} style={{ width: '100%', height: '100%' }}>
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const countryName = geo.properties.name;
                      const hasLeaders = LEADERS.some(l => l.country === countryName);
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill={hasLeaders ? '#D0EDEB' : '#E5E7EB'}
                          stroke="#fff"
                          strokeWidth={0.5}
                          style={{
                            default: { outline: 'none' },
                            hover: { fill: hasLeaders ? '#1A7B72' : '#D1D5DB', outline: 'none', cursor: 'pointer' },
                            pressed: { outline: 'none' },
                          }}
                          onClick={() => handleCountryClick(countryName)}
                        />
                      );
                    })
                  }
                </Geographies>
                {Object.entries(countryCoordinates).map(([country, coords]) => {
                  const count = countryLeaderCount[country] || 0;
                  if (count === 0) return null;
                  return (
                    <Marker key={country} coordinates={coords} onClick={() => handleCountryClick(country)}>
                      <circle r={4 + count * 2} fill={ROSE} stroke="#fff" strokeWidth={2} className="cursor-pointer hover:r-6" style={{ cursor: 'pointer' }} />
                      <text textAnchor="middle" y={-12} style={{ fontFamily: 'system-ui', fontSize: '10px', fill: '#333', fontWeight: 500 }}>
                        {country}: {count}
                      </text>
                    </Marker>
                  );
                })}
              </ComposableMap>
            </div>
            {selectedCountry && (
              <div className="mt-3 p-3 bg-teal-light border border-teal rounded-lg">
                <div className="text-sm font-medium text-teal-dark">
                  Selected: {selectedCountry} ({countryLeaderCount[selectedCountry] || 0} leaders)
                </div>
                <button onClick={() => onNavigate && onNavigate('directory')} className="text-xs text-teal underline mt-1">
                  Click to explore in directory →
                </button>
              </div>
            )}
            <p className="text-xs text-gray-500 mt-4">
              <strong>Interactive features:</strong> Hover over countries to see leader counts. Click any marker or country to filter the directory. Try Kenya (3 leaders), USA, India, Brazil, Nigeria, South Africa.
            </p>
          </div>
        );

      case 'charts':
        return (
          <div>
            <div className="text-sm font-medium text-gray-700 mb-4 pb-2 border-b border-gray-200">
              Live data preview — sample dataset
            </div>
            <div className="card mb-6 p-6">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-6 bg-teal rounded-full"></div>
                <div className="text-sm font-semibold tracking-wide text-gray-800">Expertise areas represented</div>
              </div>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={expertiseData} layout="vertical" margin={{ left: 10, right: 30, top: 10, bottom: 10 }} barCategoryGap={4}>
                  <XAxis type="number" tick={{ fontSize: 11, fill: '#888' }} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: '#555' }} width={180} axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ fontSize: 12, borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    cursor={{ fill: '#f3f4f6' }}
                  />
                  <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={22}>
                    {expertiseData.map((entry, i) => (
                      <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-6 bg-rose rounded-full"></div>
                  <div className="text-sm font-semibold tracking-wide text-gray-800">Leaders by sector</div>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie 
                      data={sectorData} 
                      dataKey="value" 
                      nameKey="name" 
                      cx="50%" 
                      cy="50%" 
                      innerRadius={50}
                      outerRadius={75} 
                      paddingAngle={3}
                      label={({name, percent}) => `${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {sectorData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="none" />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ fontSize: 12, borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap justify-center gap-3 mt-2">
                  {sectorData.map((item, i) => (
                    <div key={item.name} className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }}></div>
                      <span className="text-xs text-gray-600">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-6 bg-purple-500 rounded-full"></div>
                  <div className="text-sm font-semibold tracking-wide text-gray-800">Leaders by region</div>
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={regionData} margin={{ left: 10, right: 20, bottom: 70, top: 10 }}>
                    <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#555' }} angle={-45} textAnchor="end" interval={0} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: '#888' }} axisLine={false} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ fontSize: 12, borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                      cursor={{ fill: '#f3f4f6' }}
                    />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={28}>
                      {regionData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        );

      case 'featured':
        return (
          <div>
            <div className="text-sm font-medium text-gray-700 mb-4 pb-2 border-b border-gray-200">
              Live data preview — sample dataset
            </div>
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <div className="text-xs font-semibold tracking-widest uppercase text-gray-700">Featured leaders</div>
                <span className="text-xs text-teal bg-teal-light px-2 py-1 rounded-full">{featured.length} featured</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {featured.map(leader => (
                  <div key={leader.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <img 
                      src={leader.image} 
                      alt={leader.name}
                      className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                    />
                    <div>
                      <div className="font-medium text-sm text-ink">{leader.name}</div>
                      <div className="text-xs text-gray-600">{leader.role}</div>
                      <div className="text-xs text-teal mt-1">{leader.country}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="text-xs font-medium text-amber-800 mb-1">How to manage featured leaders:</div>
                <div className="text-xs text-amber-700">Add a column "Featured" in Google Sheets. Enter TRUE for leaders you want to feature. The directory automatically updates — no code needed.</div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-24">
      <div className="section-badge bg-purple-100 text-purple-700">Visualisation & storytelling</div>
      <h2 className="text-4xl font-serif text-ink mb-4">The layer most<br /><span className="text-teal italic">applicants will miss.</span></h2>
      <p className="text-gray-600 text-lg mb-12 max-w-2xl">
        "Supports discovery, storytelling and future growth" means the data should <em>say something</em> — not just be filterable. Four visualisation layers, all within the proposed zero-cost stack.
      </p>

      {/* Layer selector */}
      <div className="flex flex-wrap gap-3 mb-8">
        {layers.map(l => (
          <button key={l.id} onClick={() => setActiveLayer(l.id)}
            className={`flex flex-col items-center px-4 py-3 rounded-xl text-sm font-medium transition-all min-w-[140px] ${activeLayer === l.id ? 'bg-ink text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full mb-1 ${activeLayer === l.id ? 'bg-white/20 text-white' : l.badgeColor}`}>{l.badge}</span>
            <span className="text-xs">{l.title}</span>
          </button>
        ))}
      </div>

      {/* Active layer detail */}
      {layers.map(l => activeLayer === l.id && (
        <div key={l.id} className="card mb-8">
          <div className="flex flex-col items-center text-center mb-4">
            <span className={`text-xs font-bold px-3 py-1 rounded-full mb-3 ${l.badgeColor}`}>{l.badge}</span>
            <h3 className="font-serif text-xl text-ink">{l.title}</h3>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed max-w-lg">{l.desc}</p>
          </div>
          <div className="text-xs font-medium text-teal bg-teal-light rounded-lg px-3 py-2 inline-block">{l.tech}</div>
        </div>
      ))}

      {/* Layer-specific preview */}
      {renderPreview()}
    </div>
  );
}
