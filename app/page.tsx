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

export type Experience = {
  title: string;
  content: string;
  content2?: string;
  content3?: string;
  highlights?: string[];
  ctas?: string[];
};

const experience: Experience[] = [
  {
    title: 'Neptune Finance',
    content:
      'Most of my experience with modern frontend frameworks comes from leading the development of the <a href="https://app.nept.finance" target="_blank" rel="noopener noreferrer"><strong>Neptune Finance</strong></a> web application — a borrowing and lending platform built with CosmWasm and deployed on the <a href="https://injective.com" target="_blank" rel="noopener noreferrer"><strong>Injective</strong></a> blockchain. My responsibilities have spanned across frontend engineering, UI/UX design, branding, deployments, and overall user experience strategy.',
    content2:
      'The interface is developed using Next.js and Tailwind CSS, with additional UI components from Material UI and Daisy UI. I&apos;ve also utilized Figma and Midjourney to establish the product&apos;s visual identity and design language. To streamline design and development, I built a custom Figma component library and created reusable assets for marketing materials.',
    content3:
      'Recent work includes launching <a href="https://app.nept.finance/staking" target="_blank" rel="noopener noreferrer"><strong>Staking</strong></a> and <a href="https://app.nept.finance/airdrop" target="_blank" rel="noopener noreferrer"><strong>Airdrop</strong></a> pages in support of the NEPT token release, and building <a href="https://app.nept.finance/pool/?poolType=astroport&poolContract=inj18ucwme9nyemev9cjhy6jtagtu4laxh7ztzeqqc" target="_blank" rel="noopener noreferrer"><strong>Pool</strong></a> pages that integrates <a href="https://docs.mito.fi/integration/permissionless-vaults" target="_blank" rel="noopener noreferrer"><strong>Mito</strong></a> and <a href="https://docs.astroport.fi/docs/develop/tutorials/farming/providing-withdrawing-liquidity" target="_blank" rel="noopener noreferrer"><strong>Astroport</strong></a> smart contracts and LP tokens. I introduced novel UX patterns to improve the user experience around liquidity management and implemented gated protocol features for NEPT stakers.',
    highlights: [
      'TypeScript',
      'React',
      'Next.js',
      'CW3 Multisig',
      'CW4 Governance',
      '3rd Party Smart Contracts',
      'InfluxDB',
      'Tailwind',
      'Material UI',
      'Daisy UI',
      'FontAwesome',
      'UI/UX Design',
      'Figma',
      'Midjourney',
      'Fleek',
    ],
    ctas: ['https://app.nept.finance'],
  },
  {
    title: 'Cryptech',
    content:
      'In addition to the Neptune dapp, I led production of the <a href="https://nept.finance" target="_blank" rel="noopener noreferrer"><strong>Neptune Landing</strong></a> site. For the landing pages, I adopted a creative approach to design, integrating time-series data of interest rates into the visual elements to highlight the core focus of the lending market.',
    content2:
      'I also developed the <a href="https://nept.finance" target="_blank" rel="noopener noreferrer"><strong>Cryptech Developments</strong></a> website for the company behind Neptune. I leveraged elements from the logo to guide the design and added mouse parallax effects to enhance the visual appeal and interactivity.',
    content3:
      'Other contributions to Cryptech and Neptune include the creation of token listings and the development of adapters for various platforms such as <a href="https://github.com/cosmos/chain-registry/commit/62b3fa019a0db5a277925859999ab430420a3fa6" target="_blank" rel="noopener noreferrer"><strong>Cosmos Chain Registry</strong></a>, <a href="https://github.com/InjectiveLabs/injective-ts/pull/413" target="_blank" rel="noopener noreferrer"><strong>Injective Labs</strong></a>, <a href="https://github.com/chainapsis/keplr-contract-registry/pull/14" target="_blank" rel="noopener noreferrer"><strong>Keplr Contract Registry</strong></a>, and <a href="https://github.com/DefiLlama/DefiLlama-Adapters/pull/10034" target="_blank" rel="noopener noreferrer"><strong>DeFi Llama Adapters</strong></a>.',
    highlights: [
      'Javascript',
      'TypeScript',
      'React',
      'Next.js',
      'InfluxDB',
      'Tailwind',
      'FontAwesome',
      'UI/UX Design',
      'Figma',
      'Midjourney',
    ],
    ctas: ['https://cryptech.dev/', 'https://nept.finance'],
  },
  {
    title: 'Injective CW3 Multisig',
    content:
      'Neptune Finance identified a gap in the support for the <a href="https://github.com/cryptechdev/cw3-injective-multisig-dapp" target="_blank" rel="noopener noreferrer"><strong>CW3 Fixed Multisig</strong></a> smart contract standard on the Injective blockchain. As part of the Cosmos ecosystem, we were able to leverage open-source software deployed on other platforms. By refactoring a decentralized application (dapp) from <a href="https://github.com/public-awesome/cw3-fixed-multisig-dapp" target="_blank" rel="noopener noreferrer"><strong>Stargaze</strong></a>, originally developed for <a href="https://github.com/ebaker/cw3-fixed-multisig-dapp" target="_blank" rel="noopener noreferrer"><strong>Juno</strong></a>, Neptune successfully brought this essential service to Injective.',
    content2:
      'The most significant challenge in porting this Cosmos repository was adapting it to the EVM-compatible architecture of Injective. While the dapp was able to query contracts, the transaction submission process required refactoring for compatibility with the <a href="https://www.npmjs.com/package/@injectivelabs/sdk-ts" target="_blank" rel="noopener noreferrer"><strong>Injective SDK</strong></a>. Additionally, several quality enhancements were implemented, such as decoding messages from Base64 and enabling formatted output for improved debugging and error detection. I also incorporated local storage functionality to cache frequently accessed contracts, optimizing performance.',
    highlights: ['TypeScript', 'React', 'Next.js', 'CW3 Multisig', 'Tailwind', 'Vercel'],
    ctas: ['https://multisig.nept.finance/'],
  },
  {
    title: 'Cosmoverse 2023 / Hackathons',
    content:
      'Collaborating with <a href="https://designdao.io/" target="_blank" rel="noopener noreferrer"><strong>DesignDAO</strong></a>, I built a dynamic schedule page for <a href="https://github.com/1biest/cosmoverse-schedule" target="_blank" rel="noopener noreferrer"><strong>Cosmoverse 2023</strong></a> referencing Google Sheets for easy upkeep and edits of the schedule. The schedule page was constructed as a javascript embed object into a Framer website, the CMS of choice by DesignDAO.',
    content2:
      'I have also participated in HackFS 2022, where our team produced <a href="https://ethglobal.com/showcase/dyve-pxsz9" target="_blank" rel="noopener noreferrer"><strong>Dyve</strong></a>, an NFT shorting primitive that allows users to lend, rent or short NFTs. The project was winner of 🏊‍♂️ NFTPort — Pool Prize, 🥈 Covalent — Best Use, and 5️⃣ Polygon — Top 5. I also participated in ETHOnline 2024, where our project <a href="https://www.figma.com/design/zqDRj40RQEJDNxCKbYrJBr/Turing.bet?node-id=1-2&t=LGO7IYPWtFLn5SsU-1" target="_blank" rel="noopener noreferrer"><strong>Turing.Bet</strong></a> was a dapp to wager if content was real vs AI generated where I developed the UI/UX.',
    highlights: ['Javascript', 'React', 'Framer', 'Figma'],
    ctas: ['https://cosmoverse.org/', 'https://ethglobal.com/showcase/dyve-pxsz9'],
  },
  {
    title: 'Personal Projects',
    content:
      'I have also developed other projects outside of the Web3 ecosystem, including a marketplace for <a href="https://worldantiques.ca/" target="_blank" rel="noopener noreferrer"><strong>World Antiques and Collectables</strong></a>, a marketing site for <a href="https://dungarvancreek.com/" target="_blank" rel="noopener noreferrer"><strong>Dungarvan Creek Vacation Rental</strong></a>, personal apps and sites.',
    highlights: ['TypeScript', 'React', 'Next.js', 'Tailwind', 'Vercel'],
    ctas: ['https://worldantiques.ca/'],
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
  ['/cosmoverse-schedule-commit-log.csv', '/dyve-commit-log.csv', '/turing-bet-commit-log.csv'],
  [
    '/init-commit-log.csv',
    '/cv-commit-log.csv',
    'world-antiques-commit-log.csv',
    'aleo-biest-token-commit-log.csv',
    'world-antiques-commit-log.csv',
    'stakefolio-commit-log.csv',
    'tashina-cv-commit-log.csv',
    'aab-commit-log.csv',
    'dungarvan-creek-commit-log.csv',
  ],
];

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
              <h2 className="text-lg pb-1 font-bold">Web3 Frontend Engineer</h2>
            </div>
            <div className="flex flex-col gap-4 text-[#99ACC7]">
              <p className="">
                I build elegant frontend interfaces for smart contract based decentralized
                applications.
              </p>
              <p className="">
                My GitHub exprience is <span className="inline sm:hidden">below</span>
                <span className="hidden sm:inline">on the right</span>, but my journey didn&apos;t
                start there. I have several years of experience in web design & development, graphic
                design, motion graphics, and marketing, including my time with{' '}
                <span className="font-bold">
                  <a href="https://stake.fish/" target="_blank" rel="noopener noreferrer">
                    stake.fish
                  </a>
                </span>
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
                    color={index === highlightIndex ? ThemeAccentColor : '#99ACC7'}
                    aggregateWeek={false}
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
