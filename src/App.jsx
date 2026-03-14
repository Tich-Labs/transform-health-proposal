import React, { useState } from 'react';
import Nav from './components/Nav';
import SectionOverview from './components/SectionOverview';
import SectionBrief from './components/SectionBrief';
import SectionPlatform from './components/SectionPlatform';
import SectionVisualisation from './components/SectionVisualisation';
import SectionDirectory from './components/SectionDirectory';
import SectionQuestions from './components/SectionQuestions';
import SectionExamples from './components/SectionExamples';
import SectionFee from './components/SectionFee';

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

  return (
    <div className="min-h-screen bg-cream">
      <Nav active={active} onNav={setActive} />
      <main className="pt-16">
        <Section onNav={setActive} />
      </main>
      {active !== 'overview' && (
        <footer className="border-t border-gray-200 px-6 py-5 text-center text-xs text-gray-700">
          <img src={process.env.PUBLIC_URL + "/images/logo.svg"} alt="Transform Health" className="h-6 mx-auto mb-2" />
          Women Leaders in Digital Health · Technical Proposal by Naijeria Toweett · March 2026
        </footer>
      )}
    </div>
  );
}
