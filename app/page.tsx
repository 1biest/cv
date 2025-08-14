'use client';

import { useEffect, useState } from 'react';
import BackgroundFX from './Components/BackgroundFx';
import GithubStats from './Components/GithubStats';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import SocialLinks from './Components/SocialLinks';
import SectionContent from './Components/SectionContent';
import { ThemeAccentColor } from './config';
import { useSwipeable } from 'react-swipeable';
import { Project, ProjectsData } from './types/projects';
import projectsData from './data/projects.json';

export type Experience = Project;

const experience: Experience[] = (projectsData as ProjectsData).projects;

const githubStatsData = projectsData.projects.map((project) => project.githubStats);

export default function Home() {
  const [highlightIndex, setHighlightIndex] = useState<number>(0);
  const [showBackgroundFX, setShowBackgroundFX] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [swiping, setSwiping] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowBackgroundFX(true);
    }, 0);

    return () => clearTimeout(timeout);
  }, []);

  const swipeHandlers = useSwipeable({
    onSwiping: (eventData) => {
      setSwipeOffset(eventData.deltaX);
      setSwiping(true);
    },
    onSwiped: (eventData) => {
      const isSwipeLeft = eventData.dir === 'Left';
      const isSwipeRight = eventData.dir === 'Right';

      if (isSwipeLeft) {
        setHighlightIndex((prev) => (prev + 1) % githubStatsData.length);
      } else if (isSwipeRight) {
        setHighlightIndex((prev) => (prev - 1 + githubStatsData.length) % githubStatsData.length);
      }

      setSwipeOffset(0);
      setSwiping(false);
    },
    trackTouch: true,
    trackMouse: false,
  });

  return (
    <>
      <div
        className={`grid grid-cols-3 h-full gap-10 px-4 sm:px-20 pt-4 sm:pt-20 selection:bg-[var(--theme-accent)] selection:text-[#101322]`}
        style={{ '--theme-accent': ThemeAccentColor } as React.CSSProperties}
      >
        <div className="relative lg:fixed col-span-3 lg:col-span-1 w-full lg:w-[28%] lg:max-w-[600px] flex flex-col gap-6 pr-8 cursor-default">
          <div
            className="flex flex-col gap-8 lg:max-h-[calc(100vh-220px)] overflow-y-auto relative"
            style={{
              maskImage: 'linear-gradient(to bottom, black 90%, transparent)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 90%, transparent)',
            }}
          >
            <div className="flex flex-col gap-2">
              <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#dde5ed] to-[#99ACC7] leading-18">
                Logan Biesterfeldt
              </h1>
              <h2 className="text-lg pb-1 font-bold">
                Senior Frontend Engineer · UI/UX Specialist · Web3 Product Innovator
              </h2>
            </div>
            <div className="flex flex-col gap-4 text-[#99ACC7]">
              <p>
                I design and build high-performance, user-centric interfaces for smart
                contract-powered decentralized applications—bridging technical precision with
                product-driven design.
              </p>
              <p>
                My work spans DeFi platforms, DAO tooling, and on-chain analytics, backed by years
                in web development, branding, motion graphics, and marketing. Previously, I crafted
                educational experiences and protocol visuals with{' '}
                <span className="font-bold">
                  <a href="https://stake.fish/" target="_blank" rel="noopener noreferrer">
                    stake.fish
                  </a>
                </span>{' '}
                and{' '}
                <span className="font-bold">
                  <a href="https://www.f2pool.com/" target="_blank" rel="noopener noreferrer">
                    f2pool
                  </a>
                </span>
                .
              </p>
            </div>
            <div className="flex flex-col gap-1 text-xs py-8 pb-12">
              {experience.map((exp, index) => (
                <span
                  key={index}
                  className={`cursor-pointer hover:text-[color:var(--accent-color)] ${
                    index === highlightIndex ? 'text-[color:var(--accent-color)]' : ''
                  }`}
                  onClick={() => setHighlightIndex(index)}
                >
                  {exp.title}
                </span>
              ))}
            </div>
          </div>
        </div>
        <SocialLinks />
        <div className="col-span-3 lg:col-span-2 lg:col-start-2 max-w-[1200px] flex flex-col gap-4">
          <div className="relative h-full">
            <div className="absolute inset-0 h-full">
              {githubStatsData.map((urls, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 grid grid-cols-7 pointer-events-${index === highlightIndex ? 'auto' : 'none'}`}
                  style={{ zIndex: index === highlightIndex ? 50 : 30 }}
                >
                  <GithubStats
                    fetchUrl={urls}
                    color={ThemeAccentColor}
                    aggregateWeek={false}
                    isActive={index === highlightIndex}
                    activeKey={highlightIndex}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-start mb-8 gap-4">
            <div
              className="flex flex-col gap-8 pl-[120px] cursor-default w-full overflow-hidden"
              {...swipeHandlers}
            >
              <div className="flex justify-start gap-2 text-2xl">
                <div
                  className={`relative px-2 group cursor-pointer z-30 ${swipeOffset < 0 ? 'text-[color:var(--accent-color)]' : ''}`}
                  onClick={() =>
                    setHighlightIndex(
                      (prev) => (prev - 1 + githubStatsData.length) % githubStatsData.length
                    )
                  }
                >
                  <button className={`relative transition z-40 pointer-events-none`}>
                    <FontAwesomeIcon icon={faCaretLeft} />
                  </button>
                </div>
                <div
                  className={`relative px-2 group cursor-pointer z-30 ${swipeOffset > 0 ? 'text-[color:var(--accent-color)]' : ''}`}
                  onClick={() => setHighlightIndex((prev) => (prev + 1) % githubStatsData.length)}
                >
                  <button className={`relative transition z-40 pointer-events-none`}>
                    <FontAwesomeIcon icon={faCaretRight} />
                  </button>
                </div>
              </div>
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(${swiping ? `${0 + swipeOffset}px` : `0%`})`,
                }}
              >
                <SectionContent experience={experience} highlightIndex={highlightIndex} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {showBackgroundFX && <BackgroundFX />}
    </>
  );
}
