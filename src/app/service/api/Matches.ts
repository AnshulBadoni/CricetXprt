import { getOptions } from "./header";

const BASE_URL = 'https://cf816022d4fe.ngrok-free.app/matches';
export const getLiveMatch = async () => {
    // const url = `${BASE_URL}/cricket-livescores`;
    const url = `${BASE_URL}/live`;

    try {
        const response = await fetch(url, getOptions);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getUpcomingMatchesData = async () => {
    const url = `${BASE_URL}/upcoming`;

    try {
        const response = await fetch(url, getOptions);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getRecentMatchesData = async () => {
    const url = `${BASE_URL}/recent`;

    try {
        const response = await fetch(url, getOptions);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getMatchDetailsData = async (matchId: string) => {
    const url = `${BASE_URL}/matchid=${matchId}/details`;

    try {
        const response = await fetch(url, getOptions);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getMatchInfoData = async (matchId: string) => {
    const url = `${BASE_URL}/cricket-match-info?matchid=${matchId}`;

    try {
        const response = await fetch(url, getOptions);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
        return [];
    }
}


export const getScoreBoard = async (matchId: string) => {
    const url = `${BASE_URL}/matchid=${matchId}/scoreboard`;

    try {
        const response = await fetch(url, getOptions);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
        return [];
    }
}
