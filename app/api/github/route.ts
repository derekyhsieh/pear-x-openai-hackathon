 export async function GET_GITHUB() {
  const perPage = 300;
  try {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=created:>2023-01-01&sort=stars&order=desc&per_page=${perPage}`,
      {
        method: "GET",
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data from GitHub API");
    }

    const data = await response.json();

    const repoDataPromises = data.items.map(async (item: any) => {
      const readmeContent = await fetchReadme(item.full_name);
      return {
        name: item.name,
        description: item.description,
        url: `https://github.com/${item.full_name}`,
        stars: item.stargazers_count,
        forks: item.forks_count,
        readmeContent: readmeContent,
      };
    });

    const repoData = await Promise.all(repoDataPromises);

    return { trendingRepos: repoData };
  } catch (error) {
    console.log("ERROR", error);
  }
}

async function fetchReadme(repoFullName: string) {
  const url = `https://raw.githubusercontent.com/${repoFullName}/main/README.md`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const content = await response.text();
    return content;
  } catch (error) {
    console.error("Failed to fetch README.md:", error);
    return "";
  }
}