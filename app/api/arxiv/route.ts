
import arxiv from "arxiv-api";
import axios from 'axios';
const pdfUtil = require('pdf-to-text');
import fs from 'fs';

async function getText(paper: any) {
  console.log('get text');
  let url = paper.id;
  let pdfUrl = url.replace('abs', 'pdf');
  console.log(pdfUrl);
  try {
    const response = await axios({
      url: pdfUrl,
      method: 'GET',
      responseType: 'arraybuffer'
    });
    fs.writeFileSync('temp.pdf', response.data);
    console.log('got response');
    return await new Promise((resolve, reject) => {
      pdfUtil.pdfToText('temp.pdf', (err: any, data: any) => {
        if (err) reject(err);
        console.log(paper);
        resolve({
          ...paper,
          content: data
        });
      });
    });
  } catch (e) {
    console.log(e);
    return {
      ...paper,
      content: null,
      error: e
    };
  }
}

export async function GET_ARXIV() {
  try {
    const papers = await arxiv.search({
      searchQueryParams: [
        {
          include: [{ name: "a" }, ],
        },
      ],
      start: 0,
      sortBy: "lastUpdatedDate",
      maxResults: 300,
    });
    let promises = papers.map((a: any) => getText(a));
    let results = await Promise.all(promises);
    return { papers: results };
  } catch (error: any) {
    console.error("Error during scraping:", error);
    return { error: error.message };
  }
}

export async function GET() {
  return Response.json(await GET_ARXIV());
}