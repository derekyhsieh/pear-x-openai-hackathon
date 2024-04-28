# from tagging import TaggingModel
from dotenv import load_dotenv
# from database import Database
import requests 
import json

load_dotenv()
# tagger = TaggingModel()

def send_results(index=0):
    url = 'https://pearx-backend.fly.dev/score'
    with open('data.json', 'r') as file:
        data = json.load(file)
    d = data["results"][index]
    if d['source'] == "arxiv":
        d['content'] = d['description']
    elif d['source'] == "github":
        if not d['title']:
            return
        d['description'] = d['content']

    response = requests.post(url, json=d)
    if response.status_code != 200:
        print(response.text, index)
    return response.text
from concurrent.futures import ThreadPoolExecutor

def threaded_send_results():
    with ThreadPoolExecutor(max_workers=10) as executor:
        for i in range(0, 1000):
            executor.submit(send_results, i)

threaded_send_results()





# print(send_results(0))

# # print(tagger.predict(text))

# database = Database()
# # tags = tagger.predict(text)
# # data = {
# #     "quality": 0.8,  # Assuming quality score is not available at this point
# #     "tags": tags,
# #     "source": "https://github.com",
# #     "text": text,
# #     "type": "news",
# #     "date": 159000000
# # }
# # database.insert(data)
# articles = database.get_articles(['china', "technology"], 158000000)
# print(articles)
# article = database.get_article(list(articles.keys())[0])
# print(article)

