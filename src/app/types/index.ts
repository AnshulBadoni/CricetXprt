
export interface Player {
    id: string
    name: string
}

export interface MatchInfo {
    Match: string
    Date: string
    Toss: string
    Time: string
    Venue: string
    Umpires: string
    'Match Referee': string
    'Qatar Squad': Player[]
    Bench: string
    'Support Staff': string
    'Saudi Arabia Squad': Player[]
    Result?: string
    Series?: string
    Status?: string
}

export interface MatchInfoResponse {
    status: string
    response: {
        matchInfo: MatchInfo
    }
}

export interface Batter {
    name: string
    dismissal: string
    runs: string
    balls: string
    fours: string
    sixes: string
    strikeRate: string
}

export interface Bowler {
    name: string
    overs: string
    maidens: string
    runs: string
    wickets: string
    noBalls: string
    wides: string
    eco: string
}

export interface FallOfWicket {
    name: string
    score: string
    overs: string
}

export interface Innings {
    batters: Batter[]
    didNotBat: any
    fallOfWickets: {
        label: string
        detail: FallOfWicket[]
    }
    bowlers: Bowler[]
    extras: {
        details: string
        runs: string
    }
    total: {
        details: string
        runs: string
    }
    powerplays: {
        label: string
        overs: string
        runs: string
    }
}

export interface ScoreboardResponse {
    status: string
    response: {
        firstInnings: Innings
        secondInnings: Innings
    }
}