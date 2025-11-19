
import React, { useEffect } from 'react';
import { TUTORIAL_SECTIONS } from '../constants';
import type { ContentItem } from '../types';
import CodeBlock from './CodeBlock';

interface TutorialViewProps {
    activeSectionId: string;
    setActiveSectionId: (id: string) => void;
}

const TutorialView: React.FC<TutorialViewProps> = ({ activeSectionId, setActiveSectionId }) => {

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSectionId(entry.target.id);
                    }
                });
            },
            { rootMargin: '-20% 0px -80% 0px', threshold: 0 }
        );

        TUTORIAL_SECTIONS.forEach((section) => {
            const el = document.getElementById(section.id);
            if (el) observer.observe(el);
        });

        return () => {
            TUTORIAL_SECTIONS.forEach((section) => {
                const el = document.getElementById(section.id);
                if (el) observer.unobserve(el);
            });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderContentItem = (item: ContentItem, index: number) => {
        switch (item.type) {
            case 'heading':
                // FIX: Replaced `keyof JSX.IntrinsicElements` with a specific string literal union type to resolve the "Cannot find namespace 'JSX'" and subsequent element type errors.
                const Tag = `h${item.level}` as 'h2' | 'h3';
                return <Tag key={index} className="text-2xl font-bold mt-8 mb-4 text-white border-b-2 border-aura-primary pb-2">{item.text}</Tag>;
            case 'paragraph':
                return <p key={index} className="my-4 leading-relaxed" dangerouslySetInnerHTML={{__html: item.text.replace(/`([^`]+)`/g, '<code class="bg-aura-primary text-aura-secondary px-1 py-0.5 rounded text-sm font-mono">$1</code>')}}></p>;
            case 'code':
                return <CodeBlock key={index} code={item.code} />;
            case 'list':
                return (
                    <ul key={index} className="list-disc list-inside my-4 space-y-2 pl-4">
                        {item.items.map((li, i) => <li key={i} dangerouslySetInnerHTML={{__html: li.replace(/`([^`]+)`/g, '<code class="bg-aura-primary text-aura-secondary px-1 py-0.5 rounded text-sm font-mono">$1</code>')}}></li>)}
                    </ul>
                );
            default:
                return null;
        }
    };

    return (
        <div>
            <h1 className="text-4xl font-bold mb-2 text-white">Aura Language Tutorial</h1>
            <p className="text-lg text-aura-text-dim mb-8">An interactive guide to the features and syntax of Aura.</p>
            {TUTORIAL_SECTIONS.map(section => (
                <section key={section.id} id={section.id} className="scroll-mt-20">
                    <h2 className="text-3xl font-bold mt-12 mb-6 text-white border-l-4 border-aura-secondary pl-4">{section.title}</h2>
                    {section.content.map(renderContentItem)}
                </section>
            ))}
        </div>
    );
};

export default TutorialView;