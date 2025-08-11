"use client"
import Navbar from '@/app/components/Navbar';
import { useState } from 'react';

type Match = {
    id: string;
    tournament: string;
    tournamentLogo: string;
    homeTeam: string;
    awayTeam: string;
    homeScore?: string;
    awayScore?: string;
    time: string;
    status: 'live' | 'finished' | 'upcoming';
    overs?: string;
    homeLogo: string;
    awayLogo: string;
    venue: string;
    matchType: 'T20' | 'ODI' | 'Test' | 'The Hundred';
    highlights?: string;
};

const PremiumCricketApp = () => {
    const [activeTab, setActiveTab] = useState<'live' | 'recent' | 'upcoming'>('live');

    // Premium cricket data with enhanced details
    const matches: Match[] = [
        {
            id: '1',
            tournament: 'Indian Premier League',
            tournamentLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/95/Indian_Premier_League_Official_Logo.svg/1200px-Indian_Premier_League_Official_Logo.svg.png',
            homeTeam: 'Mumbai Indians',
            awayTeam: 'Chennai Super Kings',
            homeScore: '189/5 (20)',
            awayScore: '175/8 (20)',
            time: 'Today • 19:30',
            status: 'finished',
            homeLogo: 'https://img.icons8.com/color/96/mumbai-indians.png',
            awayLogo: 'https://img.icons8.com/color/96/chennai-super-kings.png',
            venue: 'Wankhede Stadium, Mumbai',
            matchType: 'T20',
            highlights: 'https://example.com/highlights/1'
        },
        {
            id: '2',
            tournament: 'ICC World Test Championship',
            tournamentLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5c/ICC_World_Test_Championship.png/220px-ICC_World_Test_Championship.png',
            homeTeam: 'Australia',
            awayTeam: 'England',
            homeScore: '327 & 224/4',
            awayScore: '283',
            time: 'Live • Day 3',
            status: 'live',
            overs: 'Session 2 • 43.2 ov',
            homeLogo: 'https://img.icons8.com/color/96/australia-cricket.png',
            awayLogo: 'https://img.icons8.com/color/96/england-cricket.png',
            venue: 'The Gabba, Brisbane',
            matchType: 'Test'
        },
        {
            id: '3',
            tournament: 'The Hundred',
            tournamentLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/The_Hundred_logo.svg/1200px-The_Hundred_logo.svg.png',
            homeTeam: 'Oval Invincibles',
            awayTeam: 'Manchester Originals',
            homeScore: '165/7 (100)',
            awayScore: '158/9 (100)',
            time: 'Yesterday • 18:30',
            status: 'finished',
            homeLogo: 'https://img.icons8.com/color/96/oval-invincibles.png',
            awayLogo: 'https://img.icons8.com/color/96/manchester-originals.png',
            venue: 'The Oval, London',
            matchType: 'The Hundred',
            highlights: 'https://example.com/highlights/3'
        },
        {
            id: '4',
            tournament: 'ICC Men\'s T20 World Cup',
            tournamentLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5f/ICC_T20_World_Cup_2024_Logo.png/220px-ICC_T20_World_Cup_2024_Logo.png',
            homeTeam: 'India',
            awayTeam: 'Pakistan',
            time: 'Sun, Jun 9 • 14:30',
            status: 'upcoming',
            homeLogo: 'https://img.icons8.com/color/96/india-cricket.png',
            awayLogo: 'https://img.icons8.com/color/96/pakistan-cricket.png',
            venue: 'Melbourne Cricket Ground',
            matchType: 'T20'
        }
    ];

    const filteredMatches = matches.filter((match) => {
        if (activeTab === 'live') return match.status === 'live';
        if (activeTab === 'recent') return match.status === 'finished';
        if (activeTab === 'upcoming') return match.status === 'upcoming';
        return true;
    });

    return (
        <div className="min-h-screen bg-neutral-950 text-white">
            {/* Header - Inspired by Netflix */}
            <div className="pb-44">
                <Navbar />
            </div>
            {/* Main Content - Inspired by Instagram's clean layout */}
            <main className="px-6 pb-16 -mt-16 max-w-7xl mx-auto">
                {/* Tab Navigation - Inspired by Spotify */}
                <div className="flex border-b border-gray-800 mb-8">
                    <button
                        onClick={() => setActiveTab('live')}
                        className={`pb-4 px-6 font-medium text-sm relative ${activeTab === 'live' ? 'text-white' : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        Live Matches
                        {activeTab === 'live' && (
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-600 rounded-t"></div>
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab('recent')}
                        className={`pb-4 px-6 font-medium text-sm relative ${activeTab === 'recent' ? 'text-white' : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        Recent Matches
                        {activeTab === 'recent' && (
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-600 rounded-t"></div>
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab('upcoming')}
                        className={`pb-4 px-6 font-medium text-sm relative ${activeTab === 'upcoming' ? 'text-white' : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        Upcoming
                        {activeTab === 'upcoming' && (
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-600 rounded-t"></div>
                        )}
                    </button>
                </div>

                {/* Tournament Filter - Inspired by Netflix */}
                <div className="flex space-x-3 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                    <button className="whitespace-nowrap px-4 py-2 bg-gray-900 rounded-full text-sm font-medium">
                        All Tournaments
                    </button>
                    <button className="whitespace-nowrap px-4 py-2 bg-gray-800 rounded-full text-sm font-medium hover:bg-gray-700">
                        IPL
                    </button>
                    <button className="whitespace-nowrap px-4 py-2 bg-gray-800 rounded-full text-sm font-medium hover:bg-gray-700">
                        World Cup
                    </button>
                    <button className="whitespace-nowrap px-4 py-2 bg-gray-800 rounded-full text-sm font-medium hover:bg-gray-700">
                        The Hundred
                    </button>
                    <button className="whitespace-nowrap px-4 py-2 bg-gray-800 rounded-full text-sm font-medium hover:bg-gray-700">
                        Test Matches
                    </button>
                </div>

                {/* Matches Grid - Inspired by Netflix/Spotify */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredMatches.length === 0 ? (
                        <div className="col-span-full py-16 text-center">
                            <div className="mx-auto w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-medium mb-1">No {activeTab} matches</h3>
                            <p className="text-gray-400 max-w-md mx-auto">
                                {activeTab === 'live'
                                    ? 'There are currently no live matches. Check back later!'
                                    : activeTab === 'recent'
                                        ? 'No recent matches available at the moment'
                                        : 'No upcoming matches scheduled yet'}
                            </p>
                        </div>
                    ) : (
                        filteredMatches.map((match) => (
                            <div key={match.id} className="bg-gray-900 rounded-xl overflow-hidden hover:bg-gray-800 transition group">
                                {/* Tournament Header */}
                                <div className="p-4 pb-2 flex items-center">
                                    <div className="w-8 h-8 rounded-md overflow-hidden mr-3">
                                        <img
                                            src={match.tournamentLogo}
                                            alt={match.tournament}
                                            width={32}
                                            height={32}
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-sm line-clamp-1">{match.tournament}</h3>
                                        <div className="flex items-center mt-1">
                                            <span className="text-xs text-gray-400">{match.venue}</span>
                                            <span className="mx-2 text-gray-600">•</span>
                                            <span className="text-xs px-2 py-0.5 bg-gray-800 rounded-full text-gray-300">
                                                {match.matchType}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Teams and Score */}
                                <div className="p-4 pt-2">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 rounded-full bg-gray-800 p-1 mr-3">
                                                <img
                                                    src={match.homeLogo}
                                                    alt={match.homeTeam}
                                                    width={40}
                                                    height={40}
                                                    className="object-contain"
                                                />
                                            </div>
                                            <span className="font-medium">{match.homeTeam}</span>
                                        </div>
                                        {match.homeScore && (
                                            <div className="text-right">
                                                <span className="font-bold">{match.homeScore.split(' ')[0]}</span>
                                                <span className="text-xs text-gray-400 block">{match.homeScore.split(' ')[1]}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 rounded-full bg-gray-800 p-1 mr-3">
                                                <img
                                                    src={match.awayLogo}
                                                    alt={match.awayTeam}
                                                    width={40}
                                                    height={40}
                                                    className="object-contain"
                                                />
                                            </div>
                                            <span className="font-medium">{match.awayTeam}</span>
                                        </div>
                                        {match.awayScore && (
                                            <div className="text-right">
                                                <span className="font-bold">{match.awayScore.split(' ')[0]}</span>
                                                <span className="text-xs text-gray-400 block">{match.awayScore.split(' ')[1]}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Match Status Bar */}
                                <div className="px-4 pb-4">
                                    <div className="border-t border-gray-800 pt-3">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                {match.status === 'live' && (
                                                    <div className="flex items-center">
                                                        <span className="w-2 h-2 rounded-full bg-red-500 mr-2 animate-pulse"></span>
                                                        <span className="text-xs font-medium text-red-500">LIVE</span>
                                                        <span className="text-xs text-gray-400 ml-2">{match.overs}</span>
                                                    </div>
                                                )}
                                                {match.status === 'finished' && (
                                                    <div className="flex items-center">
                                                        <span className="text-xs font-medium text-gray-400">COMPLETED</span>
                                                        {match.highlights && (
                                                            <button className="ml-3 text-xs font-medium text-blue-400 hover:text-blue-300 flex items-center">
                                                                Highlights
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                                </svg>
                                                            </button>
                                                        )}
                                                    </div>
                                                )}
                                                {match.status === 'upcoming' && (
                                                    <div className="flex items-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-gray-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        <span className="text-xs text-gray-400">{match.time}</span>
                                                    </div>
                                                )}
                                            </div>
                                            <button className="text-xs font-medium bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded-full transition flex items-center">
                                                {match.status === 'live' ? 'Watch' : 'Details'}
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>


        </div >
    );
};

export default PremiumCricketApp;