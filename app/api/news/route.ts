export async function GET() {
    try {
        const query = "technology";
        const apiKey = process.env.NEWS_API_KEY; // Make sure you have defined this environment variable
        const baseURL = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;
        const response = await fetch(baseURL);

        if (!response.ok) {
            throw new Error("Failed to fetch data from News API");
        }

        const data = await response.json();

        return new Response(JSON.stringify({ news: data }), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("Error during fetching news:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}
