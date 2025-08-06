const BASE_URL = `https://news.fcsapi.com/api/news?access_key={YOUR_API_KEY}&find=cricket&limit=20&country=in&search_in=title%2Cdescription`;

export const getNewsData = async () => {
    const week = new Date();
    week.setDate(week.getDate() - 7);
    const fromDate = week.toISOString().split('T')[0];

    const url = `${BASE_URL}/everything?q=cricket&from=${fromDate}&sortBy=publishedAt&apiKey=617b0e23edf64dbab68b47b39e16523d`;

    try {
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Failed to fetch news data", error);
        return [];
    }
}