import { getOptions } from "./header";

const BASE_URL = 'http://194.238.18.204:5000/matches/players?teamId=2';
export const getPlayersData = async () => {
    const url = `${BASE_URL}`;

    try {
        const response = await fetch(url, getOptions);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Failed to fetch players data", error);
        return [];
    }
}