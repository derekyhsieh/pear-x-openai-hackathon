
import { GET_ARXIV } from '../arxiv/route';
import { GET_GITHUB } from '../github/route';
import { GET_NEWS } from '../news/route';

export async function GET() {
    let results : any = [];
    let arxiv = await GET_ARXIV();
    for (let ar of arxiv.papers!) {
        results.push({
            url: ar.id,
            title: ar.title,
            description: ar.summary,
            content: ar.content,
            source: 'arxiv'
        });
    }
    let github = await GET_GITHUB();
    for (let gr of github?.trendingRepos!) {
        results.push({
            url: gr.url,
            title: gr.description,
            stars: gr.stars,
            forks: gr.forks,
            content: gr.readmeContent,
            source: 'github'
        });
    }
    let news = await GET_NEWS();
    console.log(news);
    for (let nr of news?.news!.articles) {
        results.push({
            url: nr.url,
            title: nr.title,
            description: nr.description,
            content: nr.content,
            source: 'news'
        });
    }
    return Response.json({
        results
    });
}
