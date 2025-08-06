const BASE_URL = 'http://194.238.18.204:5000/auth';

export const signin = async ({ email, password }: { email: string, password: string }) => {
    const url = `${BASE_URL}/signin`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Failed to fetch auth data", error);
        return [];
    }
}

export const signup = async ({ username, email, password, phone }: { username: string, email: string, password: string, phone?: string }) => {
    const url = `${BASE_URL}/signup`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password, phone }),
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Failed to fetch auth data", error);
        return [];
    }
}