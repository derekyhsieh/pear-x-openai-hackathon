import arxiv from "arxiv-api";
export async function GET() {
  try {
    const papers = await arxiv.search({
      searchQueryParams: [
        {
          include: [{ name: "RNN" }, { name: "Deep learning" }],
          exclude: [{ name: "LSTM" }],
        },
        {
          include: [{ name: "GAN" }],
        },
      ],
      start: 0,
      maxResults: 10,
    });

    console.log(papers);
    return Response.json({ papers: papers });
  } catch (error) {
    console.error("Error during scraping:", error);
    return Response.json({ error: error.message });
  }
}
