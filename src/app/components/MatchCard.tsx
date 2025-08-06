// Cricket Match Card Component
export const MatchCard = ({ match }: { match: any }) => (
    <div className="relative bg-[url('/images/pitch-texture.jpg')] bg-cover bg-center rounded-xl overflow-hidden border border-amber-700/30 shadow-lg">
        {/* Stadium overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 to-slate-950/90"></div>

        {/* Card header with tournament logo */}
        <div className="relative z-10 p-4 border-b border-amber-700/30 flex justify-between items-center">
            <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                    <TrophyIcon className="w-3 h-3 text-slate-900" />
                </div>
                <span className="text-xs font-medium text-amber-300">{match.tournament}</span>
            </div>
            <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-full flex items-center">
                <span className="w-2 h-2 rounded-full bg-red-400 mr-1 animate-pulse"></span>
                LIVE
            </span>
        </div>

        {/* Teams display with cricket-specific styling */}
        <div className="relative z-10 p-4">
            <div className="flex items-center justify-between">
                {/* Home team */}
                <div className="flex flex-col items-center w-2/5">
                    <div className="relative">
                        <img
                            src={match.teams.home.logo}
                            alt={match.teams.home.code}
                            className="w-14 h-14 object-contain"
                        />
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-amber-600 text-xs px-2 py-0.5 rounded-full whitespace-nowrap">
                            {match.teams.home.code}
                        </div>
                    </div>
                    <div className="mt-4 text-center">
                        <p className="text-2xl font-bold font-mono text-amber-200">{match.teams.home.score.split(' ')[0]}</p>
                        <p className="text-xs text-amber-400/80 mt-1">{match.teams.home.score.split(' ')[1]}</p>
                    </div>
                </div>

                {/* VS divider with match status */}
                <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-slate-900 border-2 border-amber-600 flex items-center justify-center">
                        <span className="text-xs font-bold">VS</span>
                    </div>
                    <div className="mt-3 px-3 py-1 bg-amber-900/50 text-amber-300 rounded-full text-xs max-w-[120px] text-center">
                        {match.status}
                    </div>
                </div>

                {/* Away team */}
                <div className="flex flex-col items-center w-2/5">
                    <div className="relative">
                        <img
                            src={match.teams.away.logo}
                            alt={match.teams.away.code}
                            className="w-14 h-14 object-contain"
                        />
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-amber-600 text-xs px-2 py-0.5 rounded-full whitespace-nowrap">
                            {match.teams.away.code}
                        </div>
                    </div>
                    <div className="mt-4 text-center">
                        <p className="text-2xl font-bold font-mono text-amber-200">{match.teams.away.score.split(' ')[0]}</p>
                        <p className="text-xs text-amber-400/80 mt-1">{match.teams.away.score.split(' ')[1]}</p>
                    </div>
                </div>
            </div>

            {/* Pitch progress bar */}
            <div className="mt-6">
                <div className="relative h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-amber-500 to-amber-300"
                        style={{ width: '65%' }}
                    ></div>
                    <div className="absolute top-0 left-[65%] w-1.5 h-full bg-amber-300"></div>
                </div>
                <div className="flex justify-between text-xs text-amber-400/80 mt-1">
                    <span>RR: 5.87</span>
                    <span>Req: 3.19</span>
                </div>
            </div>
        </div>

        {/* Betting action footer */}
        <div className="relative z-10 bg-slate-900/70 border-t border-amber-700/30 p-3">
            <div className="grid grid-cols-2 gap-2">
                <button
                    onClick={() => placeBet('Match Winner', match.teams.home.name, match.odds.home)}
                    className="bg-gradient-to-b from-slate-800 to-slate-900 hover:from-amber-900/40 hover:to-amber-900/20 border border-amber-700/30 rounded-lg p-2 transition-all"
                >
                    <div className="text-xs text-amber-300/80">{match.teams.home.code}</div>
                    <div className="text-lg font-bold text-amber-300">{match.odds.home.toFixed(2)}</div>
                </button>
                <button
                    onClick={() => placeBet('Match Winner', match.teams.away.name, match.odds.away)}
                    className="bg-gradient-to-b from-slate-800 to-slate-900 hover:from-amber-900/40 hover:to-amber-900/20 border border-amber-700/30 rounded-lg p-2 transition-all"
                >
                    <div className="text-xs text-amber-300/80">{match.teams.away.code}</div>
                    <div className="text-lg font-bold text-amber-300">{match.odds.away.toFixed(2)}</div>
                </button>
            </div>
        </div>
    </div>
)

const placeBet = (type: string, team: string, odds: number) => { }
// Trophy icon component
export const TrophyIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4H5z" />
    </svg>
)

