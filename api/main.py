from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import json

app = FastAPI()

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update this with your frontend domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Sample flashcard data
flashcards = [
    {
        "id": 1,
        "front": "What is Deep Learning?",
        "back": "A subset of machine learning using neural networks with multiple layers.",
        "category": "Deep Learning",
        "difficulty": "Beginner"
    },
    {
        "id": 2,
        "front": "What is Backpropagation?",
        "back": "An algorithm for training neural networks that calculates gradients by working backwards from the output layer.",
        "category": "Deep Learning",
        "difficulty": "Intermediate"
    }
]

class Flashcard(BaseModel):
    front: str
    back: str
    category: str
    difficulty: str

@app.get("/")
async def read_root():
    return {"status": "API is running"}

@app.get("/api/flashcards/")
async def get_flashcards(
    category: Optional[str] = None,
    difficulty: Optional[str] = None
):
    filtered_cards = flashcards
    if category:
        filtered_cards = [card for card in filtered_cards if card["category"] == category]
    if difficulty:
        filtered_cards = [card for card in filtered_cards if card["difficulty"] == difficulty]
    return filtered_cards

@app.post("/api/flashcards/")
async def create_flashcard(flashcard: Flashcard):
    new_id = max([card["id"] for card in flashcards], default=0) + 1
    new_card = {"id": new_id, **flashcard.dict()}
    flashcards.append(new_card)
    return new_card