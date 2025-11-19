
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TutorialView from './components/TutorialView';
import QuizView from './components/QuizView';
import AuraBotView from './components/AuraBotView';
import { TUTORIAL_SECTIONS } from './constants';
import type { ViewType } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('tutorial');
  const [activeSectionId, setActiveSectionId] = useState<string>(TUTORIAL_SECTIONS[0].id);

  const renderContent = () => {
    switch (currentView) {
      case 'tutorial':
        return <TutorialView activeSectionId={activeSectionId} setActiveSectionId={setActiveSectionId} />;
      case 'quiz':
        return <QuizView />;
      case 'aurabot':
        return <AuraBotView />;
      default:
        return <TutorialView activeSectionId={activeSectionId} setActiveSectionId={setActiveSectionId} />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen font-sans bg-aura-bg">
      <Sidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
        // FIX: Corrected typo from `active-sectionId` to `activeSectionId`.
        activeSectionId={activeSectionId}
        setActiveSectionId={setActiveSectionId}
      />
      <main className="flex-1 p-4 sm:p-6 md:p-10 overflow-y-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;