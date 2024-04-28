from llm import LLM
import re
import threading
from threading import Thread
from langchain_core.pydantic_v1 import BaseModel
from prompts import QUALITY_PROMPT, QUALITY_PROMPT_GITHUB, SCALE, MAGNITUDE, POTENTIAL, NOVELTY, IMMEDIACY, ACTIONABILITY, POSITIVITY, CREDIBILITY

class ScoreModel:
    def __init__(self):
        self.LLM_API_FUNC = LLM()
        self.factors = [SCALE, MAGNITUDE, POTENTIAL, NOVELTY, IMMEDIACY, ACTIONABILITY, POSITIVITY, CREDIBILITY]


    def predict(self, source, data):
        scores = []
        threads = []
        score_lock = threading.Lock()

        class Score(BaseModel):
            score: float

        def predict_score(factor):
            if source == "github":
                prompt = QUALITY_PROMPT_GITHUB.format(
                    source=source, title=data["title"], fulltext=data["fulltext"],
                    stars=data["stars"], forks=data["forks"], factor=factor)
            else:
                prompt = QUALITY_PROMPT.format(
                    source=source, title=data["title"], description=data["description"],
                    fulltext=data["fulltext"], factor=factor)

            res = self.LLM_API_FUNC.predict_structured(prompt, Score)
            with score_lock:
                scores.append(res.score)

        for factor in self.factors:
            thread = Thread(target=predict_score, args=(factor,))
            threads.append(thread)
            thread.start()

        for thread in threads:
            thread.join()

        avg = sum(scores) / len(scores) if scores else 0
        return avg





