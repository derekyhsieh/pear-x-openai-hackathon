export async function GET_NEWS() {
    try {
        const query = "technology";
        const apiKey = process.env.NEWS_API_KEY; // Make sure you have defined this environment variable
        const baseURL = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;
        const response = await fetch(baseURL);


        if (!response.ok) {
            throw new Error("Failed to fetch data from News API");
        }

        const data = await response.json();
        console.log('Num news articles: ' + data.articles.length)

        return { news: data };
    } catch (error: any) {
        console.error("Error during fetching news:", error);
        return { error: error.message };
    }
}
