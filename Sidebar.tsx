
import React from 'react';
import { TUTORIAL_SECTIONS } from '../constants';
import type { ViewType } from '../types';

interface SidebarProps {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  activeSectionId: string;
  setActiveSectionId: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView, activeSectionId, setActiveSectionId }) => {
  const handleNavClick = (view: ViewType, sectionId?: string) => {
    setCurrentView(view);
    if (view === 'tutorial' && sectionId) {
      setActiveSectionId(sectionId);
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const NavItem: React.FC<{
    onClick: () => void;
    isActive: boolean;
    children: React.ReactNode;
    isSubItem?: boolean;
  }> = ({ onClick, isActive, children, isSubItem = false }) => {
    const activeClasses = 'bg-aura-secondary text-white';
    const inactiveClasses = 'hover:bg-aura-primary hover:text-white';
    const padding = isSubItem ? 'pl-10 pr-4 py-2' : 'px-4 py-3';

    return (
      <li>
        <button
          onClick={onClick}
          className={`w-full text-left transition-colors duration-200 ${padding} ${isActive ? activeClasses : inactiveClasses}`}
        >
          {children}
        </button>
      </li>
    );
  };

  return (
    <aside className="w-full md:w-64 lg:w-72 bg-aura-surface text-aura-text-dim flex-shrink-0">
      <div className="p-4 border-b border-aura-primary">
        <h1 className="text-2xl font-bold text-white">AuraBook</h1>
        <p className="text-sm">Interactive Tutorial</p>
      </div>
      <nav>
        <ul>
          <NavItem onClick={() => setCurrentView('tutorial')} isActive={currentView === 'tutorial'}>
            📖 Tutorial
          </NavItem>
          {currentView === 'tutorial' && (
            <ul className="border-l-2 border-aura-primary ml-4">
              {TUTORIAL_SECTIONS.map(section => (
                <NavItem
                  key={section.id}
                  onClick={() => handleNavClick('tutorial', section.id)}
                  isActive={activeSectionId === section.id}
                  isSubItem={true}
                >
                  {section.title}
                </NavItem>
              ))}
            </ul>
          )}
          <NavItem onClick={() => setCurrentView('quiz')} isActive={currentView === 'quiz'}>
            🧠 Quiz
          </NavItem>
          <NavItem onClick={() => setCurrentView('aurabot')} isActive={currentView === 'aurabot'}>
            🤖 AuraBot AI
          </NavItem>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
