from llm import LLM
from langchain_core.pydantic_v1 import BaseModel, Field, validator
from typing import List
from prompts import TAG_PROMPT


class TaggingModel:
    def __init__(self):
        self.llm = LLM()
        self.prompt = TAG_PROMPT

    def predict(self, text):

        class Tag(BaseModel):
            tags: List[str]

        content = self.llm.predict_structured(self.prompt.format(text=text), schema=Tag)
        embeds = self.llm.embed(content.tags)
        embeds = [embeds.data[i].embedding for i in  range(len(embeds.data))]
        return [{"text": x, "embedding": y} for x, y in zip(content.tags, embeds)]

