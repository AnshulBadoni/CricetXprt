export const raiseQuery = async (input: string, messages: { role: string; content: string; time: string }[]) => {
    try {
        const response = await fetch("http://localhost:5000/support/query", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                question: input,
                history: messages,
            }),
        });
        return response;
    } catch (error) {
        console.error("Error raising query:", error);
        throw error;
    }
}