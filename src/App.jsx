import React, { useState } from 'react';
import Nav from './components/Nav';
import SectionOverview from './components/SectionOverview';
import SectionBrief from './components/SectionBrief';
import SectionPlatform from './components/SectionPlatform';
import SectionVisualisation from './components/SectionVisualisation';
import SectionDirectory from './components/SectionDirectory';
import SectionQuestions from './components/SectionQuestions';
import SectionExamples from './components/SectionExamples';
// import SectionFee from './components/SectionFee';
import { NAV_SECTIONS } from './data';

const SECTIONS = {
  overview: SectionOverview,
  brief: SectionBrief,
  platform: SectionPlatform,
  visualisation: SectionVisualisation,
  directory: SectionDirectory,
  questions: SectionQuestions,
  examples: SectionExamples,
  fee: SectionFee,
};

export default function App() {
  const [active, setActive] = useState('overview');
  const Section = SECTIONS[active];
  const currentIndex = NAV_SECTIONS.findIndex(s => s.id === active);
  const prevSection = currentIndex > 0 ? NAV_SECTIONS[currentIndex - 1] : null;
  const nextSection = currentIndex < NAV_SECTIONS.length - 1 ? NAV_SECTIONS[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-cream">
      <Nav active={active} onNav={setActive} />
      <main className="pt-16">
        <Section onNav={setActive} />
      </main>
      {active !== 'overview' && (
        <>
          <div className="flex items-center justify-center gap-4 py-6">
            {prevSection ? (
              <button onClick={() => setActive(prevSection.id)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-teal bg-white border border-gray-200 rounded-full hover:border-teal transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                {prevSection.label}
              </button>
            ) : <div></div>}
            <span className="text-xs text-gray-400">{currentIndex + 1}/{NAV_SECTIONS.length}</span>
            {nextSection ? (
              <button onClick={() => setActive(nextSection.id)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-teal bg-white border border-gray-200 rounded-full hover:border-teal transition-colors">
                {nextSection.label}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            ) : <div></div>}
          </div>
          <footer className="border-t border-gray-200 px-6 py-5 text-center text-xs text-gray-700">
            <img src={process.env.PUBLIC_URL + "/images/logo.svg"} alt="Transform Health" className="h-6 mx-auto mb-2" />
            Women Leaders in Digital Health · Technical Proposal by Naijeria Toweett · March 2026
          </footer>
        </>
      )}
    </div>
  );
}
