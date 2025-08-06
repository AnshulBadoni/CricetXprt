// app/(root)/matches/[matchId]/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { MatchInfo, ScoreboardResponse, Player, Innings } from '@/app/types'
import { getMatchInfoData, getScoreBoard } from '@/app/service/api/Matches'
import Link from 'next/link'
import Navbar from '@/app/components/Navbar'

type TabType = 'summary' | 'first-innings' | 'second-innings' | 'squads'

export default function Page() {
    const params = useParams()
    const router = useRouter()
    const matchId = params.matchId as string
    const [activeTab, setActiveTab] = useState<TabType>('summary')

    const [matchInfo, setMatchInfo] = useState<MatchInfo | null>(null)
    const [scoreboard, setScoreboard] = useState<ScoreboardResponse['response'] | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<boolean>(false)

    useEffect(() => {
        if (!matchId) return

        const fetchData = async () => {
            try {
                setLoading(true)
                setError(false)

                const [matchInfoRes, scoreboardRes] = await Promise.all([
                    getMatchInfoData(matchId),
                    getScoreBoard(matchId)
                ])

                setMatchInfo(matchInfoRes.response.matchInfo)
                setScoreboard(scoreboardRes.response)
            } catch (err) {
                console.error(err)
                setError(true)
            } finally {
                setLoading(false)
            }
        }

        const timer = setTimeout(fetchData, 300)
        return () => clearTimeout(timer)
    }, [matchId])

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        )
    }

    if (error || !matchInfo || !scoreboard) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 py-28">
                {/* <Head>
                    <title>Match Not Found | Cricket App</title>
                    <meta name="description" content="Match details not available" />
                </Head> */}

                {/* Include Navbar */}
                <Navbar />

                <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
                    <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700">
                        <div className="p-8 sm:p-10 text-center">
                            <div className="flex justify-center mb-6">
                                <div className="bg-red-900/30 p-4 rounded-full border border-red-800/50">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                </div>
                            </div>

                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-100 mb-3">
                                Match Data Unavailable
                            </h2>

                            <p className="text-gray-400 mb-8 max-w-md mx-auto">
                                We couldn't retrieve the details for this match. This might be due to a network issue or the match might not exist in our database.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    onClick={() => router.refresh()}
                                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all flex items-center justify-center shadow-sm hover:shadow-md hover:shadow-blue-500/20"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                    Try Again
                                </button>

                                <Link
                                    href="/matches"
                                    className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-gray-100 font-medium rounded-lg transition-all flex items-center justify-center shadow-sm hover:shadow-md hover:shadow-gray-500/10"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                    </svg>
                                    Browse Matches
                                </Link>

                                <Link
                                    href="/"
                                    className="px-6 py-3 border border-gray-600 hover:bg-gray-700/50 text-gray-200 font-medium rounded-lg transition-all flex items-center justify-center shadow-sm hover:shadow-md hover:shadow-gray-500/5"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                    Return Home
                                </Link>
                            </div>
                        </div>

                        <div className="bg-gray-900/50 px-6 py-4 border-t border-gray-700">
                            <p className="text-sm text-gray-500 text-center">
                                If this problem persists, please contact support
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short'
        })
    }

    const renderTeamSquad = (teamName: string, squad: Player[] | undefined) => {
        if (!squad || !Array.isArray(squad)) {
            return (
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">{teamName} Squad</h3>
                    <p className="text-gray-500">Squad information not available</p>
                </div>
            )
        }

        return (
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">{teamName} Squad</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {squad.map((player, index) => (
                        <div key={index} className="bg-white p-3 rounded-lg border border-gray-200 hover:border-blue-200 transition-colors shadow-xs">
                            <span className="text-gray-800">{player.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    const renderBattingTable = (innings: Innings, title: string) => {
        return (
            <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">{title} Batting</h3>
                <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-xs">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="py-3 px-4 text-left text-gray-600 text-sm font-medium">Batter</th>
                                <th className="py-3 px-4 text-right text-gray-600 text-sm font-medium">Runs</th>
                                <th className="py-3 px-4 text-right text-gray-600 text-sm font-medium">Balls</th>
                                <th className="py-3 px-4 text-right text-gray-600 text-sm font-medium">4s</th>
                                <th className="py-3 px-4 text-right text-gray-600 text-sm font-medium">6s</th>
                                <th className="py-3 px-4 text-right text-gray-600 text-sm font-medium">SR</th>
                                <th className="py-3 px-4 text-left text-gray-600 text-sm font-medium">Dismissal</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {innings.batters.map((batter, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                    <td className="py-3 px-4 font-medium text-gray-800">{batter.name}</td>
                                    <td className="py-3 px-4 text-right">{batter.runs}</td>
                                    <td className="py-3 px-4 text-right">{batter.balls}</td>
                                    <td className="py-3 px-4 text-right">{batter.fours}</td>
                                    <td className="py-3 px-4 text-right">{batter.sixes}</td>
                                    <td className="py-3 px-4 text-right">{batter.strikeRate}</td>
                                    <td className="py-3 px-4 text-gray-500">{batter.dismissal}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className="bg-gray-50">
                            <tr>
                                <td className="py-2 px-4 font-medium text-gray-600">Extras</td>
                                <td className="py-2 px-4 text-right">{innings.extras.runs}</td>
                                <td colSpan={4} className="py-2 px-4 text-gray-500 text-sm">{innings.extras.details}</td>
                                <td className="py-2 px-4"></td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 font-medium text-gray-600">Total</td>
                                <td className="py-2 px-4 text-right font-bold">{innings.total.runs}</td>
                                <td colSpan={5} className="py-2 px-4 text-gray-500 text-sm">{innings.total.details}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        )
    }

    const renderBowlingTable = (innings: Innings, title: string) => {
        return (
            <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">{title} Bowling</h3>
                <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-xs">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="py-3 px-4 text-left text-gray-600 text-sm font-medium">Bowler</th>
                                <th className="py-3 px-4 text-right text-gray-600 text-sm font-medium">Overs</th>
                                <th className="py-3 px-4 text-right text-gray-600 text-sm font-medium">Maidens</th>
                                <th className="py-3 px-4 text-right text-gray-600 text-sm font-medium">Runs</th>
                                <th className="py-3 px-4 text-right text-gray-600 text-sm font-medium">Wickets</th>
                                <th className="py-3 px-4 text-right text-gray-600 text-sm font-medium">Wides</th>
                                <th className="py-3 px-4 text-right text-gray-600 text-sm font-medium">No Balls</th>
                                <th className="py-3 px-4 text-right text-gray-600 text-sm font-medium">Econ</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {innings.bowlers.map((bowler, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                    <td className="py-3 px-4 font-medium text-gray-800">{bowler.name}</td>
                                    <td className="py-3 px-4 text-right">{bowler.overs}</td>
                                    <td className="py-3 px-4 text-right">{bowler.maidens}</td>
                                    <td className="py-3 px-4 text-right">{bowler.runs}</td>
                                    <td className="py-3 px-4 text-right">{bowler.wickets}</td>
                                    <td className="py-3 px-4 text-right">{bowler.wides}</td>
                                    <td className="py-3 px-4 text-right">{bowler.noBalls}</td>
                                    <td className="py-3 px-4 text-right">{bowler.eco}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

    const renderFallOfWickets = (innings: Innings, title: string) => {
        if (!innings.fallOfWickets?.detail || innings.fallOfWickets.detail.length === 0) {
            return null
        }

        return (
            <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">{title} Fall of Wickets</h3>
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-xs">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                        {innings.fallOfWickets.detail.map((wicket, index) => (
                            <div key={index} className="bg-gray-50 p-3 rounded-lg border border-gray-200 hover:border-blue-200 transition-colors">
                                <p className="font-medium text-gray-800">{wicket.name}</p>
                                <p className="text-sm text-gray-600">{wicket.score}</p>
                                <p className="text-xs text-gray-500">{wicket.overs} overs</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    const renderTabContent = () => {
        switch (activeTab) {
            case 'summary':
                return (
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                            <h2 className="text-xl font-bold mb-4 text-gray-800">Match Summary</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <h3 className="text-md font-semibold mb-2 text-gray-600">Toss</h3>
                                    <p className="text-gray-800">{matchInfo.Toss}</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <h3 className="text-md font-semibold mb-2 text-gray-600">Umpires</h3>
                                    <p className="text-gray-800">{matchInfo.Umpires}</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <h3 className="text-md font-semibold mb-2 text-gray-600">Match Referee</h3>
                                    <p className="text-gray-800">{matchInfo['Match Referee']}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                            <h2 className="text-xl font-bold mb-4 text-gray-800">Match Result</h2>
                            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                <p className="text-blue-800 font-medium">{matchInfo.Result || 'Match in progress'}</p>
                            </div>
                        </div>
                    </div>
                )
            case 'first-innings':
                return (
                    <div className="space-y-6">
                        {renderBattingTable(scoreboard.firstInnings, 'First Innings')}
                        {renderBowlingTable(scoreboard.firstInnings, 'First Innings')}
                        {renderFallOfWickets(scoreboard.firstInnings, 'First Innings')}
                    </div>
                )
            case 'second-innings':
                return (
                    <div className="space-y-6">
                        {renderBattingTable(scoreboard.secondInnings, 'Second Innings')}
                        {renderBowlingTable(scoreboard.secondInnings, 'Second Innings')}
                        {renderFallOfWickets(scoreboard.secondInnings, 'Second Innings')}
                    </div>
                )
            case 'squads':
                return (
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                            {renderTeamSquad('Qatar', matchInfo['Qatar Squad'])}
                            {renderTeamSquad('Saudi Arabia', matchInfo['Saudi Arabia Squad'])}

                            {matchInfo.Bench && (
                                <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <h3 className="text-md font-semibold mb-2 text-gray-600">Bench</h3>
                                    <p className="text-gray-800">{matchInfo.Bench}</p>
                                </div>
                            )}
                        </div>
                    </div>
                )
            default:
                return null
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            {/* <Head>
                <title>{matchInfo.Match} | Cricket Match Details</title>
                <meta name="description" content={`Details for ${matchInfo.Match}`} />
            </Head> */}

            <div className="container mx-auto px-4 py-8 max-w-7xl">
                {/* Match Header */}
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm mb-6">
                    <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{matchInfo.Match}</h1>
                                <div className="flex items-center mt-2">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${matchInfo.Status?.includes('won') ? 'bg-green-100 text-green-800' :
                                        matchInfo.Status?.includes('Match') ? 'bg-blue-100 text-blue-800' :
                                            'bg-gray-100 text-gray-800'
                                        }`}>
                                        {matchInfo.Status || 'Match'}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-500">{matchInfo.Series}</span>
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm">
                            <div className="flex items-center text-gray-600">
                                <svg className="w-5 h-5 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span>{formatDate(matchInfo.Date)}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                                <svg className="w-5 h-5 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>{matchInfo.Venue}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="mb-6">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8 overflow-x-auto">
                            <button
                                onClick={() => setActiveTab('summary')}
                                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'summary'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                Summary
                            </button>
                            <button
                                onClick={() => setActiveTab('first-innings')}
                                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'first-innings'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                1st Innings
                            </button>
                            <button
                                onClick={() => setActiveTab('second-innings')}
                                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'second-innings'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                2nd Innings
                            </button>
                            <button
                                onClick={() => setActiveTab('squads')}
                                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'squads'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                Squads
                            </button>
                        </nav>
                    </div>
                </div>

                {/* Tab Content */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    {renderTabContent()}
                </div>
            </div>
        </div>
    )
}