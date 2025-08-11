"use client"
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Slider from './components/slider';
import { getLiveMatch, getRecentMatchesData, getUpcomingMatchesData } from './service/api/Matches';
import Navbar from './components/Navbar';
import { getPlayersData } from './service/api/Players';
import Link from 'next/link';
import { getNewsData } from './service/api/News';
import { motion, Easing, Variants, easeInOut } from 'framer-motion';
import ChatBot from './components/ChatBot';
import Adbanner from './components/Adbanner';
import NativeAdBanner from './components/NativeAdBanner';

// Animation variants
const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const
    }
  }
};

const slideUp: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const scaleUp: Variants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const
    }
  }
};

const cardHover: Variants = {
  hover: {
    y: -5,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1] as const
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const buttonHover: Variants = {
  hover: {
    scale: 1.03,
    transition: { duration: 0.2, ease: easeInOut }
  },
  tap: {
    scale: 0.98
  }
};

export default function Home() {
  const [heroMatch, setHeroMatch] = useState<any>(null);
  const [liveMatches, setLiveMatches] = useState([]);
  const [upcomingMatches, setUpcomingMatches] = useState<any[]>([]);
  const [news, setNews] = useState([]);
  const [topPlayers, setTopPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [recentMatches, setRecentMatches] = useState<any[]>([]);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      const [
        featuredMatch,
        recentMatchesData,
        upcomingMatchesData,
        topPlayersData,
        newsData,
      ] = await Promise.all([
        getLiveMatch(),
        getRecentMatchesData(),
        getUpcomingMatchesData(),
        getPlayersData(),
        getNewsData(),
      ]);

      if (featuredMatch.length > 0) {
        setLiveMatches(featuredMatch.response);
        setHeroMatch(featuredMatch.response[0]);
      }

      setRecentMatches(recentMatchesData.response);
      setUpcomingMatches(upcomingMatchesData.response);
      setTopPlayers(topPlayersData.response);
      setNews(newsData.response || []);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const TeamLogo = ({ team, className = "" }: { team: any, className?: string }) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`flex items-center justify-center rounded-full bg-gradient-to-br from-neutral-800 to-neutral-900 border border-neutral-700 shadow-inner ${className}`}
    >
      {team.logo ? (
        <img
          src={team.logo}
          alt={team.short}
          className="w-full h-full object-contain"
          onError={(e: any) => {
            e.target.onerror = null;
            e.target.src = team.fallback ? team.fallback : '/flags/fallback.png';
          }}
        />
      ) : (
        <span className="text-xs font-bold">{team.fallback}</span>
      )}
    </motion.div>
  );

  const PlayerImage = ({ player, className = "" }: { player: any, className?: string }) => (
    <div className={`relative rounded-full bg-gradient-to-br from-neutral-800 to-neutral-900 border border-neutral-700 overflow-hidden ${className}`}>
      {player.image ? (
        <img
          src={player.image}
          alt={player.name}
          className="w-full h-full object-cover"
          onError={(e: any) => {
            e.target.onerror = null;
            e.target.src = player.fallback ? player.fallback : '/user.png';
          }}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-neutral-800">
          <span className="text-xs font-bold">{player.name.split(' ').map((n: string) => n[0]).join('')}</span>
        </div>
      )}
    </div>
  );

  const NewsImage = ({ item, className = "" }: { item: any, className?: string }) => (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={item.image.img ? item.image.img : '/user'}
        alt={item.title}
        className="w-full h-full object-cover"
        onError={(e: any) => {
          e.target.onerror = null;
          e.target.src = item.fallback ? item.fallback : '/user';
        }}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Head>
        <title>CricketExpert | Live Scores, News & Betting</title>
        <meta name="description" content="Premium cricket betting and live scores platform" />
      </Head>

      {/* Animated Navbar */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Navbar />
      </motion.div>

      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="relative isolate overflow-hidden bg-gray-900 min-h-screen flex items-center"
      >
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-20"
            poster="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=2400"
          >
            <source src="/videos/cricket-stadium.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-blue-900/30 to-indigo-900/95"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900/0 via-gray-900/70 to-gray-900/100"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-16 pt-40 lg:pt-0">
            {/* Left Content - Text */}
            <motion.div
              variants={slideUp}
              className="lg:w-1/2 text-center lg:text-left"
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white">
                <motion.span
                  className="bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%'],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "linear"
                  }}
                  style={{
                    backgroundSize: '200% 200%'
                  }}
                >
                  Cricket
                </motion.span>
                <br />
                <span className="text-white">Expert Platf<motion.img
                  src="/ball.png"
                  alt="o"
                  className="w-16 inline-block -mx-[10px]"
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />rm</span>
              </h1>

              <p className="mt-6 text-xl leading-8 text-gray-300 max-w-2xl">
                Real-time stats, player networking, and immersive match experiences
                powered by <span className="text-blue-400 font-medium">AI analytics</span>.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
                <Link href="/sign-in">
                  <motion.button
                    variants={buttonHover}
                    whileHover="hover"
                    whileTap="tap"
                    className="relative overflow-hidden group px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl font-semibold text-white shadow-2xl shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-300"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Join Community
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.25-7.25a.75.75 0 000-1.5H8.66l2.1-1.95a.75.75 0 10-1.02-1.1l-3.5 3.25a.75.75 0 000 1.1l3.5 3.25a.75.75 0 001.02-1.1l-2.1-1.95h4.59z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </motion.button>
                </Link>
              </div>
            </motion.div>

            {/* Right Content - Match Card */}
            <motion.div
              variants={slideUp}
              transition={{ delay: 0.2 }}
              className="lg:w-1/2 w-full max-w-2xl mt-0"
            >
              <motion.div
                variants={cardHover}
                whileHover="hover"
                className="relative rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-500"
              >
                <div className="relative z-10 bg-gradient-to-b from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-2xl overflow-hidden backdrop-blur-sm">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-gray-800 to-gray-850 px-6 py-4 flex items-center justify-between border-b border-gray-700/50">
                    <div>
                      <div className="flex items-center gap-2">
                        <motion.span
                          className="text-xs font-semibold text-blue-400 uppercase tracking-wider"
                          animate={{
                            opacity: [0.8, 1, 0.8],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity
                          }}
                        >
                          {heroMatch ? "Live Now" : "Upcoming Matches"}
                        </motion.span>
                      </div>
                      <h3 className="text-xl font-bold text-white mt-1">
                        {heroMatch ? "Live Cricket Action" : "Upcoming Cricket Action"}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-400">
                        {heroMatch ? "In Progress" : "Coming Soon"}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 text-center">
                    {heroMatch ? (
                      <>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            <TeamLogo
                              team={{
                                name: heroMatch.team_b,
                                short: heroMatch.team_b_short,
                                logo: heroMatch.team_b_img
                              }}
                              className="w-10 h-10 mr-3"
                            />
                            <div>
                              <div className="font-medium group-hover:text-blue-300 transition-colors">
                                {heroMatch.team_b_short}
                              </div>
                              <div className="text-xs text-neutral-400">
                                {heroMatch.team_b_scores}
                              </div>
                            </div>
                          </div>
                          <div className="text-sm bg-neutral-800 px-3 py-1 rounded-full">VS</div>
                          <div className="flex items-center">
                            <div>
                              <div className="font-medium text-right group-hover:text-indigo-300 transition-colors">
                                {heroMatch.team_a_short}
                              </div>
                              <div className="text-xs text-neutral-400 text-right">
                                {heroMatch.team_a_scores || 'Yet to bat'}
                              </div>
                            </div>
                            <TeamLogo
                              team={{
                                name: heroMatch.team_a,
                                short: heroMatch.team_a_short,
                                logo: heroMatch.team_a_img
                              }}
                              className="w-10 h-10 ml-3"
                            />
                          </div>
                        </div>
                        <div className="text-center text-sm mb-4">
                          <div className="font-bold">{heroMatch.team_b_scores} vs {heroMatch.team_a_scores || '0/0'}</div>
                          <div className="text-xs text-neutral-400 mt-1">{heroMatch.match_status}</div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-xs text-neutral-400">
                            Match Winner • Top Batsman
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-xs bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-1.5 rounded-full hover:opacity-90 transition-opacity"
                          >
                            Bet Now
                          </motion.button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex justify-center mb-6">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>

                        <h4 className="text-lg font-bold text-white mb-3">No Live Matches Currently</h4>
                        <p className="text-gray-400 mb-6">
                          There are no live matches happening right now. Check out upcoming matches or explore our cricket content.
                        </p>
                        {upcomingMatches?.[0]?.matchList?.[0] && (
                          <div className="mb-6">
                            <p className="text-sm text-gray-400 mb-2">Next Match:</p>
                            <motion.div
                              whileHover={{ y: -3 }}
                              className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/30"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs text-gray-400">
                                  {upcomingMatches[0].seriesName}
                                </span>
                                <span className="text-xs text-gray-400">
                                  {upcomingMatches[0].matchList[0].matchDate} •
                                  {upcomingMatches[0].matchList[0].matchTime.trim()}
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <TeamLogo
                                    team={{
                                      short: upcomingMatches[0].matchList[0].matchTitle.split(' vs ')[0],
                                      name: upcomingMatches[0].matchList[0].matchTitle.split(' vs ')[0]
                                    }}
                                    className="w-8 h-8 mr-3"
                                  />
                                  <span>{upcomingMatches[0].matchList[0].matchTitle.split(' vs ')[0]}</span>
                                </div>
                                <div className="text-xs bg-gray-700 px-2 py-1 rounded-full">VS</div>
                                <div className="flex items-center">
                                  <span>{upcomingMatches[0].matchList[0].matchTitle.split(' vs ')[1]}</span>
                                  <TeamLogo
                                    team={{
                                      short: upcomingMatches[0].matchList[0].matchTitle.split(' vs ')[1],
                                      name: upcomingMatches[0].matchList[0].matchTitle.split(' vs ')[1]
                                    }}
                                    className="w-8 h-8 ml-3"
                                  />
                                </div>
                              </div>
                              <div className="mt-2 text-xs text-gray-400">
                                {upcomingMatches[0].matchList[0].matchFormat} • {upcomingMatches[0].matchList[0].matchVenue}
                              </div>
                            </motion.div>
                          </div>
                        )}
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
                        >
                          View Upcoming Matches
                        </motion.button>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
          {/* ad banner here */}
          {/* <div className="absolute mt-16 w-full right-0 h-24 bg-gray-800 rounded-lg overflow-hidden shadow-lg"> */}
          {/* <iframe title='advertisement' src="https://www.profitableratecpm.com/pb9zgzagk?key=f15b1fc6b9effaccff8e1ae74578e79d" width="100%" height="100%"></iframe> */}
          <NativeAdBanner />
          {/* </div> */}
        </div>
      </motion.section >

      {/* Main Content */}
      < main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8" >
        {/* Featured Matches */}
        < motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }
          }
          variants={fadeIn}
          className="mb-12"
        >
          <motion.div variants={slideUp} className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Featured Matches</h2>
            <button className="text-sm text-neutral-400 hover:text-white flex items-center">
              View All
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {heroMatch ? (
              <motion.div variants={slideUp}>
                <Link href={`/matches/${heroMatch.match_id}`} className="block">
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-xl overflow-hidden hover:border-blue-500/30 transition-colors group shadow-lg"
                  >
                    <div className="p-4 border-b border-neutral-800 flex justify-between items-center bg-gradient-to-r from-neutral-900 to-neutral-800">
                      <div className="text-xs text-neutral-400">{heroMatch.series}</div>
                      <div className="flex items-center space-x-2">
                        <motion.span
                          animate={{ opacity: [0.6, 1, 0.6] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded-full flex items-center"
                        >
                          <span className="w-2 h-2 rounded-full bg-red-400 mr-1"></span>
                          LIVE
                        </motion.span>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <TeamLogo team={{ name: heroMatch.team_b, short: heroMatch.team_b_short, logo: heroMatch.team_b_img }} className="w-10 h-10 mr-3" />
                          <div>
                            <div className="font-medium group-hover:text-blue-300 transition-colors">{heroMatch.team_b_short}</div>
                            <div className="text-xs text-neutral-400">{heroMatch.team_b_scores}</div>
                          </div>
                        </div>
                        <div className="text-sm bg-neutral-800 px-3 py-1 rounded-full">VS</div>
                        <div className="flex items-center">
                          <div>
                            <div className="font-medium text-right group-hover:text-indigo-300 transition-colors">{heroMatch.team_a_short}</div>
                            <div className="text-xs text-neutral-400 text-right">{heroMatch.team_a_scores || 'Yet to bat'}</div>
                          </div>
                          <TeamLogo team={{ name: heroMatch.team_a, short: heroMatch.team_a_short, logo: heroMatch.team_a_img }} className="w-10 h-10 ml-3" />
                        </div>
                      </div>
                      <div className="text-center text-sm mb-4">
                        <div className="font-bold">{heroMatch.team_b_scores} vs {heroMatch.team_a_scores || '0/0'}</div>
                        <div className="text-xs text-neutral-400 mt-1">{heroMatch.match_status}</div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-xs text-neutral-400">
                          Match Winner • Top Batsman
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="text-xs bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-1.5 rounded-full hover:opacity-90 transition-opacity"
                        >
                          Bet Now
                        </motion.button>
                      </div>
                    </div>
                    <div className="px-4 pb-4">
                      <div className="flex justify-between">
                        <button className="flex-1 mr-2 bg-neutral-800/50 hover:bg-neutral-700/50 text-white py-2 rounded-lg text-sm font-medium transition-colors border border-neutral-700">
                          {heroMatch.min_rate.toFixed(2)}
                        </button>
                        <button className="flex-1 ml-2 bg-neutral-800/50 hover:bg-neutral-700/50 text-white py-2 rounded-lg text-sm font-medium transition-colors border border-neutral-700">
                          {heroMatch.max_rate.toFixed(2)}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ) : (
              <motion.div
                variants={slideUp}
                className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-xl overflow-hidden p-8 flex justify-center items-center h-64"
              >
                <div className="text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-gray-400">No featured matches available</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div >

        {/* Grid Layout */}
        < div className="grid grid-cols-1 lg:grid-cols-3 gap-8" >
          {/* Left Column */}
          < div className="lg:col-span-2 space-y-8" >
            {/* Recent Matches */}
            < motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-xl overflow-hidden shadow-lg"
            >
              <motion.div variants={slideUp} className="flex items-center justify-between p-4 border-b border-neutral-800 bg-gradient-to-r from-neutral-900 to-neutral-800">
                <h2 className="text-xl font-bold flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Recent Matches
                </h2>
                <button className="text-sm text-neutral-400 hover:text-white flex items-center">
                  View All
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </motion.div>

              {
                isLoading ? (
                  <motion.div variants={slideUp} className="p-8 flex justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"
                    ></motion.div>
                  </motion.div>
                ) : recentMatches?.length > 0 ? (
                  <motion.div
                    variants={staggerContainer}
                    className="divide-y divide-neutral-800 px-5"
                  >
                    {recentMatches.slice(0, 5).map((series: any) => (
                      series.matchList.slice(0, 2).map((match: any) => (
                        <motion.div
                          key={match.matchId}
                          variants={slideUp}
                        >
                          <Link href={`/matches/${match.matchId}`} className="p-4 hover:bg-neutral-800/30 transition duration-150 group block">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-xs text-neutral-400">{series.seriesName}</span>
                              <span className="text-xs text-neutral-400">{match.matchDate}</span>
                            </div>
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center w-2/5">
                                <div className="w-8 h-8 rounded-full bg-neutral-800 mr-3 flex items-center justify-center">
                                  <span className="text-xs">{match.teamOne.name?.substring(0, 2) || 'T1'}</span>
                                </div>
                                <div>
                                  <div className="font-medium group-hover:text-blue-300 transition-colors">
                                    {match.teamOne.name || 'Team 1'}
                                  </div>
                                  <div className="text-xs text-neutral-400">{match.teamOne.score || '-'}</div>
                                </div>
                              </div>
                              <div className="w-1/5 text-center px-2">
                                <div className="text-xs bg-neutral-800 px-2 py-1 rounded-full">VS</div>
                                <div className="text-xs text-neutral-400 mt-1">{match.matchStatus}</div>
                              </div>
                              <div className="flex items-center justify-end w-2/5">
                                <div className="text-right">
                                  <div className="font-medium group-hover:text-indigo-300 transition-colors">
                                    {match.teamTwo.name || 'Team 2'}
                                  </div>
                                  <div className="text-xs text-neutral-400">{match.teamTwo.score || '-'}</div>
                                </div>
                                <div className="w-8 h-8 rounded-full bg-neutral-800 ml-3 flex items-center justify-center">
                                  <span className="text-xs">{match.teamTwo.name?.substring(0, 2) || 'T2'}</span>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </motion.div>
                      ))
                    ))}
                  </motion.div>
                ) : (
                  <motion.div variants={slideUp} className="p-8 text-center text-gray-400">
                    No recent matches available
                  </motion.div>
                )
              }
            </motion.div >

            {/* News Section */}
            < motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <motion.div variants={slideUp} className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Cricket News & Highlights</h2>
                <Link href="/news" className="text-sm text-neutral-400 hover:text-white flex items-center">
                  View All
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>

              <motion.div
                variants={staggerContainer}
                className="grid grid-cols-1 sm:grid-cols-2 gap-6"
              >
                {news.slice(0, 4).map((item: any, index: number) => (
                  <motion.div
                    key={index}
                    variants={slideUp}
                    whileHover={{ y: -5 }}
                    className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-xl overflow-hidden hover:border-blue-500/30 transition-colors group shadow-lg"
                  >
                    <div className="relative h-48 bg-gradient-to-br from-neutral-800 to-neutral-900 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 to-transparent z-10"></div>
                      <NewsImage item={item} className="w-full h-full" />
                      <div className="absolute bottom-0 left-0 z-20 p-4">
                        <span className="text-xs px-2 py-1 bg-blue-500/80 rounded-full text-white">{item.author || 'Unknown'}</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold line-clamp-2 group-hover:text-blue-300 transition-colors">{item.title}</h3>
                        <span className="text-xs text-neutral-500 whitespace-nowrap ml-2">{item.time}</span>
                      </div>
                      <p className="text-sm text-neutral-400 mb-3 line-clamp-2">{item.summary}</p>
                      <a href={item.url} target='_blank' className="text-xs text-blue-400 hover:text-blue-300 flex items-center transition-colors">
                        Read More
                        <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              <Slider items={news.slice(4, 7)} />
            </motion.div >
          </div >

          {/* Right Column */}
          < div className="space-y-8" >
            {/* Upcoming Matches */}
            < motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-xl overflow-hidden shadow-lg"
            >
              <motion.div variants={slideUp} className="flex items-center justify-between p-4 border-b border-neutral-800 bg-gradient-to-r from-neutral-900 to-neutral-800">
                <h2 className="text-xl font-bold">Upcoming Matches</h2>
                <button className="text-sm text-neutral-400 hover:text-white flex items-center">
                  View All
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </motion.div>

              {
                isLoading ? (
                  <motion.div variants={slideUp} className="p-8 flex justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"
                    ></motion.div>
                  </motion.div>
                ) : upcomingMatches?.length > 0 ? (
                  <motion.div
                    variants={staggerContainer}
                    className="divide-y divide-neutral-800"
                  >
                    {upcomingMatches.slice(0, 5).map((series: any) => (
                      series.matchList.slice(0, 2).map((match: any) => (
                        <motion.div
                          key={match.matchId}
                          variants={slideUp}
                        >
                          <Link href={`/matches/${match.matchId}`}>
                            <div className="p-4 hover:bg-neutral-800/30 transition duration-150 group">
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-xs text-neutral-400">{series.seriesName}</span>
                                <span className="text-xs text-neutral-400">{match.matchDate} • {match.matchTime}</span>
                              </div>
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center">
                                  <div className="w-8 h-8 rounded-full bg-neutral-800 mr-3 flex items-center justify-center">
                                    <span className="text-xs">
                                      {match.matchTitle.split(' vs ')[0].split(' ').map((w: any) => w[0]).join('')}
                                    </span>
                                  </div>
                                  <span className="group-hover:text-blue-300 transition-colors">
                                    {match.matchTitle.split(' vs ')[0]}
                                  </span>
                                </div>
                                <div className="text-xs bg-neutral-800 px-2 py-1 rounded-full">VS</div>
                                <div className="flex items-center">
                                  <span className="group-hover:text-indigo-300 transition-colors">
                                    {match.matchTitle.split(' vs ')[1]}
                                  </span>
                                  <div className="w-8 h-8 rounded-full bg-neutral-800 ml-3 flex items-center justify-center">
                                    <span className="text-xs">
                                      {match.matchTitle.split(' vs ')[1].split(' ').map((w: any) => w[0]).join('')}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex justify-between items-center">
                                <div className="text-xs text-neutral-400">
                                  {match.matchFormat}
                                </div>
                                <div className="flex space-x-2">
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="text-xs bg-gradient-to-r from-blue-600/30 to-indigo-600/30 border border-blue-500/30 hover:border-blue-500/50 px-3 py-1 rounded-full transition-colors"
                                  >
                                    1.85
                                  </motion.button>
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="text-xs bg-gradient-to-r from-blue-600/30 to-indigo-600/30 border border-indigo-500/30 hover:border-indigo-500/50 px-3 py-1 rounded-full transition-colors"
                                  >
                                    2.10
                                  </motion.button>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </motion.div>
                      ))
                    ))}
                  </motion.div>
                ) : (
                  <motion.div variants={slideUp} className="p-8 text-center text-gray-400">
                    No upcoming matches scheduled
                  </motion.div>
                )
              }
            </motion.div >

            {/* Top Players */}
            < motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-xl overflow-hidden shadow-lg"
            >
              <motion.div variants={slideUp} className="flex items-center justify-between p-4 border-b border-neutral-800 bg-gradient-to-r from-neutral-900 to-neutral-800">
                <h2 className="text-xl font-bold">Top Tournament Players</h2>
                <button className="text-sm text-neutral-400 hover:text-white flex items-center">
                  View All
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </motion.div>

              <motion.div
                variants={staggerContainer}
                className="divide-y divide-neutral-800"
              >
                {topPlayers?.length > 0 && topPlayers.slice(0, 10).map((player: any, index: number) => (
                  <motion.div
                    key={player.id}
                    variants={slideUp}
                    whileHover={{ x: 5 }}
                    className="p-4 hover:bg-neutral-800/30 transition duration-150 group"
                  >
                    <div className="flex items-center">
                      <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-neutral-800 to-neutral-900 border border-neutral-700 overflow-hidden mr-3">
                        <img
                          src={player.image}
                          alt={player.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = '/players/fallback.png';
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline">
                          <h3 className="font-medium truncate group-hover:text-blue-300 transition-colors">
                            {player.title}
                          </h3>
                          <span className="text-xs bg-neutral-800 px-2 py-0.5 rounded-full whitespace-nowrap ml-2">
                            {player.Role.split(' ').map((word: any) => word[0]).join('')}
                          </span>
                        </div>
                        <div className="text-xs text-neutral-400 mb-1">
                          {player.Role.replace(/_/g, ' ')}
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="text-xs bg-neutral-800/50 px-2 py-0.5 rounded">
                            ID: {player.id}
                          </div>
                          <div className="text-xs bg-neutral-800/50 px-2 py-0.5 rounded">
                            {player.slug}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((_, idx) => (
                          <motion.div
                            key={idx}
                            animate={{
                              height: [`${Math.random() * 10 + 5}px`, `${Math.random() * 15 + 10}px`],
                              opacity: [0.7, 1]
                            }}
                            transition={{
                              duration: 1 + Math.random(),
                              repeat: Infinity,
                              repeatType: "reverse"
                            }}
                            className="w-4 rounded-sm bg-gradient-to-b from-blue-500 to-indigo-500 flex items-center justify-center text-[8px] font-bold"
                            title={`Recent performance ${idx + 1}`}
                          ></motion.div>
                        ))}
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-xs bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-1 rounded-full hover:opacity-90 transition-opacity"
                        onClick={() => window.open(`https://www.cricbuzz.com/profiles/${player.id}/${player.slug}`, '_blank')}
                      >
                        View Profile
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div >

            {/* Quick Bet Widget */}
            < motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={scaleUp}
              className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-xl overflow-hidden shadow-lg"
            >
              <div className="p-4 border-b border-neutral-800 bg-gradient-to-r from-blue-900/30 to-indigo-900/30">
                <h2 className="text-xl font-bold">Place Quick Bet</h2>
              </div>
              <div className="p-4">
                <div className="mb-4">
                  <label className="block text-sm text-neutral-400 mb-2">Select Match</label>
                  <select className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm">
                    {upcomingMatches?.length > 0 ? (
                      upcomingMatches[0].matchList.slice(0, 3).map((match: any) => (
                        <option key={match.matchId}>
                          {match.matchTitle} - {match.matchFormat}
                        </option>
                      ))
                    ) : (
                      <option>No upcoming matches</option>
                    )}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm text-neutral-400 mb-2">Bet Type</label>
                  <select className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm">
                    <option>Match Winner</option>
                    <option>Top Batsman</option>
                    <option>Total Runs</option>
                    <option>Toss Winner</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm text-neutral-400 mb-2">Selection</label>
                  <select className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm">
                    {upcomingMatches?.length > 0 ? (
                      <>
                        <option>{upcomingMatches[0].matchList[0].matchTitle.split(' vs ')[0]}</option>
                        <option>{upcomingMatches[0].matchList[0].matchTitle.split(' vs ')[1]}</option>
                      </>
                    ) : (
                      <>
                        <option>Team A</option>
                        <option>Team B</option>
                      </>
                    )}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm text-neutral-400 mb-2">Amount ($)</label>
                  <div className="relative">
                    <input
                      type="number"
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pl-4 pr-12 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                      placeholder="0.00"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <span className="text-neutral-400 text-sm">USD</span>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-neutral-400 mb-2">
                    <span>Potential Win</span>
                    <span className="text-blue-400">$0.00</span>
                  </div>
                  <div className="h-1 bg-neutral-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: '0%' }}
                      whileInView={{ width: '70%' }}
                      transition={{ duration: 1 }}
                      viewport={{ once: true }}
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
                    ></motion.div>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 py-3 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity flex items-center justify-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Place Bet
                </motion.button>
              </div>
            </motion.div >
          </div >
        </div >

        {/* Promotions Banner */}
        < motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideUp}
          className="mt-12 relative rounded-xl overflow-hidden shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-indigo-900/70 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-neutral-950/90 z-10"></div>
          <div className="relative z-20 p-8 md:p-12">
            <div className="max-w-2xl">
              <div className="flex items-center mb-4">
                <motion.span
                  whileHover={{ scale: 1.1 }}
                  className="text-xs font-bold bg-white text-blue-700 px-2 py-1 rounded-md mr-3"
                >
                  NEW
                </motion.span>
                <span className="text-sm text-white opacity-90">Limited Time Offer</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">100% Deposit Bonus Up To $1000</h2>
              <p className="text-neutral-200 mb-6 max-w-lg">New customers only. Min deposit $20. Wagering requirements apply.</p>
              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-2.5 bg-white text-blue-700 rounded-full font-medium hover:bg-opacity-90 transition-opacity flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4H5z" />
                  </svg>
                  Claim Now
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-2.5 bg-transparent border-2 border-white text-white rounded-full font-medium hover:bg-white/10 transition-colors flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Terms & Conditions
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div >
      </main >

      {/* Footer */}
      < motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-br from-neutral-900 to-neutral-950 border-t border-neutral-800 mt-12"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">Cricket Expert</h3>
              <p className="text-sm text-neutral-400 mb-4">The premier destination for cricket betting enthusiasts with live scores, streaming, and instant payouts.</p>
              <div className="flex space-x-4">
                <motion.a
                  whileHover={{ y: -3 }}
                  href="#"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </motion.a>
                <motion.a
                  whileHover={{ y: -3 }}
                  href="#"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </motion.a>
                <motion.a
                  whileHover={{ y: -3 }}
                  href="#"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </motion.a>
              </div>
            </div>
            <div>
              <h3 className="text-md font-bold mb-4 text-neutral-300">Sports</h3>
              <ul className="space-y-2">
                <motion.li whileHover={{ x: 3 }}><a href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">Cricket</a></motion.li>
                <motion.li whileHover={{ x: 3 }}><a href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">Football</a></motion.li>
                <motion.li whileHover={{ x: 3 }}><a href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">Tennis</a></motion.li>
                <motion.li whileHover={{ x: 3 }}><a href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">Basketball</a></motion.li>
                <motion.li whileHover={{ x: 3 }}><a href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">Esports</a></motion.li>
              </ul>
            </div>
            <div>
              <h3 className="text-md font-bold mb-4 text-neutral-300">Legal</h3>
              <ul className="space-y-2">
                <motion.li whileHover={{ x: 3 }}><a href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">Terms & Conditions</a></motion.li>
                <motion.li whileHover={{ x: 3 }}><a href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">Privacy Policy</a></motion.li>
                <motion.li whileHover={{ x: 3 }}><a href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">Responsible Gambling</a></motion.li>
                <motion.li whileHover={{ x: 3 }}><a href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">AML Policy</a></motion.li>
                <motion.li whileHover={{ x: 3 }}><a href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">Contact Us</a></motion.li>
              </ul>
            </div>
          </div>
          <div className="border-t border-neutral-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-neutral-500 mb-4 md:mb-0">
              © 2023 CricketExpert. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="text-xs text-neutral-400 flex items-center">
                <svg className="w-4 h-4 mr-1 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                18+ Only. Gambling Responsibly
              </div>
            </div>
          </div>
        </div>
      </motion.footer >
      <div>
        <ChatBot />
      </div>
      <Adbanner />

    </div >
  );
}