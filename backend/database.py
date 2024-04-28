import hashlib
import time
from pinecone import Pinecone, ServerlessSpec
from llm import LLM

pc = Pinecone(api_key="602fe619-c247-4cca-839f-44c5bdff1c2c")

class Database:
    def __init__(self):
        self.index_names = ["articles", "tags"]
        existing_indexes = [index_info["name"] for index_info in pc.list_indexes()]
        self.indexes = {}
        for index_name in self.index_names:
            if index_name not in existing_indexes:
                pc.create_index(
                    name=index_name,
                    dimension=1 if index_name == "articles" else 3072,
                    metric="cosine",
                    spec=ServerlessSpec(
                        cloud="aws",
                        region="us-east-1"
                    )
                )
                while not pc.describe_index(index_name).status['ready']:
                    time.sleep(1)
            self.indexes[index_name] = pc.Index(index_name)
            time.sleep(1)
            self.indexes[index_name].describe_index_stats()
        self.llm = LLM()

    def insert(self, data):
        """
        data: 
            quality:
            tags: [{text, embed}]
            source:
            text: 
            description:
            title:
            type: 
            date:
        """
        md5_hash = hashlib.md5()
        md5_hash.update(data['source'].encode('utf-8'))
        hashed_source = md5_hash.hexdigest() 
        self.indexes['articles'].upsert(vectors=[{"id": hashed_source, "values": [0.1], "metadata": {"quality": data['quality'], "tags": [ x['text'] for x in data['tags'] ], "type": data['type'], "source": data['source'], "text": data['text'], "title": data['title'], "description": data['description'], "date": data['date']}}])
        for tag in data['tags']:
            self.indexes['tags'].upsert(vectors=[{"id": hashed_source + "-" + tag['text'], "values": tag['embedding'], "metadata": {"text": tag['text'], "quality": data['quality'], "date": data['date']}}])
    
    def get_by_tag(self, tag, date_threshold):
        query_results = self.indexes['tags'].query(
            vector=tag, 
            top_k=200, 
            include_values=False,
            include_metadata=True,
            filter={"date": {"$gte": date_threshold}}
        )
        sorted_results = sorted(query_results['matches'], key=lambda item: item['metadata']['quality'], reverse=True)
        return sorted_results
    
    def get_articles(self, tags, date_threshold):
        embeds = self.llm.embed(tags)
        embeds = [embeds.data[i].embedding for i in range(len(embeds.data))]
        articles = {}
        for embed in embeds:
            results = self.get_by_tag(embed, date_threshold)
            unique_results = {}
            
            for result in results:
                id = result['id'].split("-")[0]
                if id not in unique_results or unique_results[id]['score'] < result['score']:
                    unique_results[id] = result

            for id, result in unique_results.items():
                if id not in articles:
                    articles[id] = {
                        'date': result['metadata']['date'],
                        'quality': result['metadata']['quality'],
                        'tags': [{'text': result['metadata']['text'], 'score': result['score']}]
                    }
                else:
                    articles[id]['tags'].append({'text': result['metadata']['text'], 'score': result['score']})
        return articles 

    def retrieve_articles(self, tag_ids):

        ids = []
        for tag in tag_ids:
            hashed_source = tag.split("-")[0]
            ids.append(hashed_source)

        fetched_articles = self.indexes['articles'].fetch(ids).vectors
        articles = []

        for id in ids:
            articles.append(fetched_articles.get(id, None))

        final = []
        for article in articles:
            new_dict = {}
            keys = ['id', 'metadata'] # fuck lazy import
            for a in keys:
                if a != 'values':
                    new_dict[a] = article[a]
            final.append(new_dict)
                
        return final

