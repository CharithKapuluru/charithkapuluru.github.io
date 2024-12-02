const API_URL = 'https://charithkapuluru-github-io.vercel.app';

class FlashcardManager {
    constructor() {
        this.currentCard = 0;
        this.cards = [
            {
                id: 1,
                front: "What is Artificial Intelligence (AI)?",
                back: "AI is the simulation of human intelligence by machines, enabling them to learn from experience, adjust to new inputs, and perform human-like tasks.",
                category: "Basic AI Concepts",
                difficulty: "Beginner"
            },
            {
                id: 2,
                front: "What is Machine Learning?",
                back: "A subset of AI that enables systems to learn and improve from experience without being explicitly programmed.",
                category: "Basic AI Concepts",
                difficulty: "Beginner"
            }
        ];
        this.isFlipped = false;
    }

    renderCard() {
        const card = this.cards[this.currentCard];
        if (!card) return;

        const cardElement = document.getElementById('flashcard');
        const contentElement = document.getElementById('card-content');
        const categoryElement = document.getElementById('card-category');

        categoryElement.textContent = card.category;
        contentElement.textContent = this.isFlipped ? card.back : card.front;
        
        document.getElementById('card-counter').textContent = 
            `${this.currentCard + 1} / ${this.cards.length}`;
    }

    flipCard() {
        this.isFlipped = !this.isFlipped;
        this.renderCard();
    }

    nextCard() {
        if (this.currentCard < this.cards.length - 1) {
            this.currentCard++;
            this.isFlipped = false;
            this.renderCard();
        }
    }

    previousCard() {
        if (this.currentCard > 0) {
            this.currentCard--;
            this.isFlipped = false;
            this.renderCard();
        }
    }

    updateProgress() {
        document.getElementById('total-cards').textContent = this.cards.length;
    }
}

const flashcardManager = new FlashcardManager();

document.addEventListener('DOMContentLoaded', () => {
    flashcardManager.renderCard();
    flashcardManager.updateProgress();
});