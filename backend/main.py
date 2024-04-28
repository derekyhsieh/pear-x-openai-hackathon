import uvicorn
import httpx
import time
from fastapi import FastAPI, HTTPException
from quality import ScoreModel
from tagging import TaggingModel
from pydantic import BaseModel
from typing import Optional, List
from starlette.responses import Response
from dotenv import load_dotenv
from database import Database
import json
from fastapi.middleware.cors import CORSMiddleware



load_dotenv()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

score_model = ScoreModel()
tagging_model = TaggingModel()
database = Database()

class Item(BaseModel):
    source: Optional[str] = None
    title: Optional[str] = None
    description: Optional[str] = None
    content: Optional[str] = None
    url: str
    stars: Optional[int] = None
    tags: Optional[str] = None
    forks: Optional[int] = None
    citations: Optional[int] = None
    journal: Optional[str] = None
    claps: Optional[int] = None
    comments: Optional[int] = None

@app.post("/score")
async def score(item: Item):
    """
    Input:
        - source (github, arxiv, news)
        - data 
            - url
            - title
            - shortened description
            - full content
            - github (stars, forks)
    Output:
        - quality score  
        - tagging
    """
    data = item.dict()
    content = {
        'title': data.get('title'),
        'description': data.get('description'),
        'fulltext': data.get('content'),
        'stars': data.get('stars'), 
        'forks': data.get('forks'),
        "source": data.get("source"), # type
        "url": data.get("url")
    }

    try:
        quality_scores = score_model.predict(content["source"], content)
        # quality_scores = 0.9
        tags = tagging_model.predict(content['fulltext']) 
        data_to_insert = {
            "quality": quality_scores,
            "tags": tags,
            "source": content["url"],
            "text": content['fulltext'],
            "description": content['description'],
            "title": content['title'],
            "type": content["source"],
            "date": time.time()
        }
        database.insert(data_to_insert)
        return {'quality': quality_scores, 'tags': tags, "insert": "success"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


class ArticleRequest(BaseModel):
    tags: List[str]
    date: int

@app.post("/get_articles")
async def get_articles(request: ArticleRequest):
    """
    Input:
        - tags
        - date
    Output:
        - status message
    """
    tags = request.tags
    date = request.date
    try:
        articles = database.get_articles(tags, date)
        retrieved = database.retrieve_articles(list(articles.keys()))
        
        for article in retrieved:
            if article:
                match = {}
                for tag in articles[article['id']]['tags']:
                    match[tag['text']] = tag['score']
                article['match'] = match
        
        return {'status': 'success', 'articles': retrieved}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8080)
