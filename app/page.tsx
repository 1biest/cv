'use client';

import { useState } from 'react';
import BackgroundFX from './Components/BackgroundFx';
import GithubStats from './Components/GithubStats';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight, faFilePdf } from '@fortawesome/free-solid-svg-icons';

const experience = [
  {
    title: 'Neptune Finance',
    content:
      'Most of my experience with modern frontend frameworks comes from leading the development of the <a href="https://app.nept.finance" target="_blank" rel="noopener noreferrer"><strong>Neptune Finance</strong></a> web application — a borrowing and lending platform built with CosmWasm and deployed on the <a href="https://injective.com" target="_blank" rel="noopener noreferrer"><strong>Injective</strong></a> blockchain. My responsibilities have spanned across frontend engineering, UI/UX design, branding, deployments, and overall user experience strategy.',
    content2:
      'The interface is developed using Next.js and Tailwind CSS, with additional UI components from Material UI and Daisy UI. I’ve also utilized Figma and Midjourney to establish the product’s visual identity and design language. To streamline design and development, I built a custom Figma component library and created reusable assets for marketing materials.',
    content3:
      'Recent work includes launching Staking and Airdrop pages in support of the NEPT token release, and building Pool pages that integrates Mito and Astroport smart contracts and LP tokens. I introduced novel UX patterns to improve the user experience around liquidity management and implemented gated staking and governance features for NEPT holders.',
    highlights: [
      'TypeScript',
      'CW3 Multisig',
      'CW4 Governance',
      '3rd Party Smart Contracts',
      'InfluxDB',
      'Next.js',
      'Tailwind',
      'Material UI',
      'Daisy UI',
      'FontAwesome',
      'UI/UX Design',
      'Figma',
      'Midjourney',
      'Fleek',
    ],
    ctas: [['Neptune Finance', 'https://app.nept.finance']],
  },
  {
    title: 'Cryptech',
    content: 'Integrated Ethereum smart contracts using ethers.js.',
  },
  {
    title: 'Injective CW3 Multisig',
    content: 'Integrated Ethereum smart contracts using ethers.js.',
  },
  {
    title: 'Cosmoverse Schedule',
    content: 'Integrated Ethereum smart contracts using ethers.js.',
  },
  {
    title: 'Hackathons',
    content: 'Dyve and Turing Bet.',
  },
  {
    title: 'Personal Projects',
    content:
      'I have also developed other projects outside of the Web3 ecosystem, including a marketplace for an antiques and collectables company, a marketing site for a vacation rental, and personal apps and sites',
  },
  {
    title: 'Highlights',
    content: 'Built responsive Web3 interfaces using React and Next.js.',
    highlights: ['TypeScript', 'CW3 Smart Contract', '3rd Party Smart Contract'],
  },
];

const githubStatsData = [
  ['/neptune-webapp-commit-log.csv'],
  [
    '/neptune-landing-commit-log.csv',
    '/macro-web-commit-log.csv',
    '/cryptech-website-commit-log.csv',
  ],
  ['/cw3-multisig-commit-log.csv', '/neptune-foundation-commit-log.csv'],
  ['/cosmoverse-schedule-commit-log.csv'],
  ['/dyve-commit-log.csv', '/turing-bet-commit-log.csv'],
  ['/init-commit-log.csv', '/cv-commit-log.csv'],
  [''],
];

const githubHighlightData = [
  [''],
  ['/neptune-webapp-commit-log-astroport-slice.csv'],
  ['/neptune-webapp-commit-log-nept-slice.csv'],
];

export default function Home() {
  const [highlightIndex, setHighlightIndex] = useState<number>(0);

  return (
    <>
      <div className="grid grid-cols-3 gap-10 px-20 pt-20 selection:bg-[#EBCB8E] selection:text-[#101322]">
        <div className="relative lg:fixed col-span-3 lg:col-span-1 w-full lg:w-[28%] lg:max-w-[600px] flex flex-col gap-6 pr-8 cursor-default">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <h1 className="text-5xl font-bold">Logan Biesterfeldt</h1>
              <h2 className="text-lg pb-1 font-bold">Web3 Frontend Engineer</h2>
            </div>
            <div className="flex flex-col gap-4 text-[#99ACC7]">
              <p className="">
                I build elegant frontend interfaces for smart contract based decentralized
                applications.
              </p>
              <p className="">
                My GitHub exprience is on the right, but my journey didn&apos;t start there. I have
                several years of experience in graphic design, motion graphics, and marketing,
                including my time with{' '}
                <span className="font-bold">
                  <a href="https://stake.fish/" target="_blank" rel="noopener noreferrer">
                    stake.fish
                  </a>
                </span>
              </p>
            </div>
            <div className="flex flex-col gap-1 text-xs pt-8">
              {experience.map((exp, index) => (
                <span
                  key={index}
                  className={`${index === highlightIndex ? 'text-[#EBCB8E]' : ''} cursor-pointer hover:text-[#EBCB8E]`}
                  onClick={() => setHighlightIndex(index)}
                >
                  {exp.title}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="relative lg:fixed bottom-0 left-0 px-0 lg:px-20 pb-10 lg:pb-20 flex gap-6">
          <div
            className="relative px-4 w-36 h-11 py-2 group cursor-pointer z-30 text-2xl"
            onClick={() => setHighlightIndex((prev) => (prev + 1) % githubStatsData.length)}
          >
            <div className="bg-[#1F2C40] rounded-lg absolute inset-0 z-0 opacity-20 hover:opacity-50 backdrop-blur-sm border  border-white/10 border-t-white/30 backdrop-blur-md transition duration-300 ease-in-out"></div>
            <button className="relative flex group-hover:text-[#EBCB8E] transition z-40 pt-[2px] pointer-events-none">
              <FontAwesomeIcon icon={faFilePdf} />
              <span className="pl-2 w-20 text-lg">Resume</span>
            </button>
          </div>
        </div>
        <div className="col-span-3 lg:col-span-2 lg:col-start-2 max-w-[1200px] flex flex-col gap-4">
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
          <div className="flex justify-start mb-8 gap-4">
            <div className="relative h-full bg-red-300">
              <div className="absolute inset-0 h-full">
                <div className="relative opacity-50 z-10">
                  <GithubStats
                    fetchUrl={githubHighlightData[0]}
                    color="#EBCB8E"
                    aggregateWeek={true}
                  />
                </div>
                {githubStatsData.map((urls, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 grid grid-cols-7 z-30 ${index === highlightIndex ? 'pointer-events-auto' : 'pointer-events-none'}`}
                  >
                    <GithubStats
                      fetchUrl={urls}
                      color={index === highlightIndex ? '#EBCB8E' : '#99ACC7'}
                      aggregateWeek={false}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-8 pl-[100px] cursor-default">
              <div className="max-w-[1000px] relative flex flex-col gap-6">
                <h4 className="text-3xl font-bold">{experience[highlightIndex].title || ''}</h4>
                <div className="flex flex-col prose prose-invert max-w-none gap-4">
                  <p
                    className="text-[#99ACC7] z-30 relative"
                    dangerouslySetInnerHTML={{ __html: experience[highlightIndex].content || '' }}
                  />
                  <p
                    className="text-[#99ACC7] z-30 relative"
                    dangerouslySetInnerHTML={{ __html: experience[highlightIndex].content2 || '' }}
                  />
                  <p
                    className="text-[#99ACC7] z-30 relative"
                    dangerouslySetInnerHTML={{ __html: experience[highlightIndex].content3 || '' }}
                  />
                </div>
                <div className="flex flex-wrap gap-2 py-1 z-30 relative pointer-events-none">
                  {experience[highlightIndex].highlights &&
                    experience[highlightIndex].highlights?.map((highlight, index) => (
                      <div
                        key={index}
                        className="bg-[#EBCB8E] rounded text-[#131A28] text-xs p-1 px-2 cursor-default"
                      >
                        <span>{highlight}</span>
                      </div>
                    ))}
                </div>
                {/* <div className="bg-[#1F2C40] rounded-lg absolute inset-0 z-0 opacity-0 hover:opacity-50 backdrop-blur-sm border  border-white/10 border-t-white/30 backdrop-blur-md transition duration-300 ease-in-out"></div> */}
              </div>
              <div className="flex justify-start gap-2 mb-2 pr-1 text-2xl">
                <div
                  className="relative px-4 py-1 group cursor-pointer z-30"
                  onClick={() =>
                    setHighlightIndex(
                      (prev) => (prev - 1 + githubStatsData.length) % githubStatsData.length
                    )
                  }
                >
                  <div className="bg-[#1F2C40] rounded-lg absolute inset-0 z-0 opacity-20 hover:opacity-50 backdrop-blur-sm border  border-white/10 border-t-white/30 backdrop-blur-md transition duration-300 ease-in-out"></div>
                  <button className="relative group-hover:text-[#EBCB8E] transition z-40 pt-[2px] pointer-events-none">
                    <FontAwesomeIcon icon={faCaretLeft} />
                  </button>
                </div>
                <div
                  className="relative px-4 py-1 group cursor-pointer z-30"
                  onClick={() => setHighlightIndex((prev) => (prev + 1) % githubStatsData.length)}
                >
                  <div className="bg-[#1F2C40] rounded-lg absolute inset-0 z-0 opacity-20 hover:opacity-50 backdrop-blur-sm border  border-white/10 border-t-white/30 backdrop-blur-md transition duration-300 ease-in-out"></div>
                  <button className="relative group-hover:text-[#EBCB8E] transition z-40 pt-[2px] pointer-events-none">
                    <FontAwesomeIcon icon={faCaretRight} />
                  </button>
                </div>
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
