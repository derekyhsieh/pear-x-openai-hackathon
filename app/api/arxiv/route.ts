import arxiv from "arxiv-api";
export async function GET() {
  try {
    const papers = await arxiv.search({
      searchQueryParams: [
        {
          include: [{ name: "a" }, ],
        },
      ],
      start: 0,
      sortBy: "lastUpdatedDate",
      maxResults: 10,
    });

    console.log(papers);
    return Response.json({ papers: papers });
  } catch (error) {
    console.error("Error during scraping:", error);
    return Response.json({ error: error.message });
  }
}
