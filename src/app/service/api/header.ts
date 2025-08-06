export const getOptions = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true', // 👈 explicitly tell ngrok to skip
    'User-Agent': 'vercel-fetch-client', // 👈 also works as alternative
  },
};
