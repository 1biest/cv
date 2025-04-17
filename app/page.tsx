'use client';

import { useState } from 'react';
import BackgroundFX from './Components/BackgroundFx';
import GithubStats from './Components/GithubStats';

const experience = [
  {
    title: 'Ledger Integration',
    content: 'Built responsive Web3 interfaces using React and Next.js.',
    highlights: ['TypeScript', 'CW3 Smart Contract', '3rd Party Smart Contract'],
  },
  {
    title: 'Smart Contract Integrator',
    content: 'Integrated Ethereum smart contracts using ethers.js.',
  },
];

const githubStatsData = [
  ['/init-commit-log.csv', '/cv-commit-log.csv'],
  ['/dyve-commit-log.csv', '/turing-bet-commit-log.csv'],
  ['/neptune-landing-commit-log.csv'],
  ['/neptune-webapp-commit-log.csv'],
  ['/cw3-multisig-commit-log.csv', '/neptune-foundation-commit-log.csv'],
  ['/cosmoverse-schedule-commit-log.csv'],
  ['/macro-web-commit-log.csv', '/cryptech-website-commit-log.csv'],
];

export default function Home() {
  const [highlightIndex, setHighlightIndex] = useState<number>(0);

  return (
    <>
      <div className="grid grid-cols-3 gap-10 px-20 pt-20">
        <div className="col-span-3 lg:col-span-1 flex flex-col gap-3">
          <h1 className="text-5xl">Logan Biesterfeldt</h1>
          <h2 className="text-lg pb-1 font-bold">Web3 Frontend Engineer</h2>
          <p className="text-[#99ACC7]">
            I build elegant frontend interfaces for smart contract based decentralized applications.
          </p>
        </div>
        <div className="col-span-3 lg:col-span-2 max-w-[1200px] flex flex-col gap-4">
          {/* <h1 className="text-4xl font-bold">Logan Biesterfeldt</h1>
          <h2 className="text-2xl font-semibold text-[#99ACC7] hover:text-[#EAC99C]">
            Software Engineer
          </h2> */}
          {/* <p className="text-[#99ACC7]">
            I am a software engineer with a passion for building scalable and efficient
            applications. I have experience in a variety of programming languages and frameworks,
            and I am always eager to learn new technologies.
          </p> */}

          {/* Experience Section */}
          <div className="mb-8 gap-4">
            <div className="relative w-full h-full">
              {githubStatsData.map((urls, index) => (
                <div key={index} className="absolute inset-0 grid grid-cols-7">
                  <GithubStats
                    fetchUrl={urls}
                    color={index === highlightIndex ? '#EBCB8E' : '#99ACC7'}
                    aggregateWeek={false}
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-4 pl-24">
              {experience.map((item, index) => (
                <div key={index} className="relative px-4 py-3 group flex flex-col gap-2">
                  <h4 className="text-xl font-bold group-hover:text-[#EBCB8E] z-30 relative pointer-events-none transition duration-300 ease-in-out">
                    {item.title}
                  </h4>
                  <p className="text-[#99ACC7] z-30 relative pointer-events-none">{item.content}</p>
                  <div className="flex gap-2 py-1 z-30 relative pointer-events-none">
                    {item.highlights?.map((highlight, index) => (
                      <div
                        key={index}
                        className="bg-[#EBCB8E] rounded text-[#131A28] text-xs p-1 px-2 cursor-default"
                      >
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-[#1F2C40] rounded-lg absolute inset-0 z-0 opacity-0 hover:opacity-50 backdrop-blur-sm border  border-white/10 border-t-white/30 backdrop-blur-md transition duration-300 ease-in-out"></div>
                </div>
              ))}

              <div className="flex justify-start gap-2 mb-2 pr-1 text-2xl px-4">
                <button
                  onClick={() =>
                    setHighlightIndex(
                      (prev) => (prev - 1 + githubStatsData.length) % githubStatsData.length
                    )
                  }
                  className="text-[#99ACC7] hover:text-[#EBCB8E] transition"
                >
                  ←
                </button>
                <button
                  onClick={() => setHighlightIndex((prev) => (prev + 1) % githubStatsData.length)}
                  className="text-[#99ACC7] hover:text-[#EBCB8E] transition"
                >
                  →
                </button>
              </div>
              <div className="grow"></div>
            </div>
          </div>
        </div>
      </div>

      <BackgroundFX />
    </>
  );
}
