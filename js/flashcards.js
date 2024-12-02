const API_URL = 'https://charithkapuluru-github-io.vercel.app';

class FlashcardManager {
    constructor() {
        this.currentCard = 0;
        this.cards = [
            // Your existing cards array here
        ];
        this.isFlipped = false;
    }

    renderCard() {
        const card = this.cards[this.currentCard];
        if (!card) return;

        // Update front of card
        document.getElementById('card-category-front').textContent = card.category;
        document.getElementById('card-difficulty-front').textContent = card.difficulty;
        document.getElementById('card-content-front').textContent = card.front;

        // Update back of card
        document.getElementById('card-category-back').textContent = card.category;
        document.getElementById('card-difficulty-back').textContent = card.difficulty;
        document.getElementById('card-content-back').textContent = card.back;
        
        // Update counter
        document.getElementById('card-counter').textContent = 
            `${this.currentCard + 1} / ${this.cards.length}`;
    }

    flipCard() {
        this.isFlipped = !this.isFlipped;
        const cardElement = document.getElementById('flashcard');
        cardElement.classList.toggle('flipped');
    }

    nextCard() {
        if (this.currentCard < this.cards.length - 1) {
            this.currentCard++;
            this.isFlipped = false;
            const cardElement = document.getElementById('flashcard');
            cardElement.classList.remove('flipped');
            this.renderCard();
        }
    }

    previousCard() {
        if (this.currentCard > 0) {
            this.currentCard--;
            this.isFlipped = false;
            const cardElement = document.getElementById('flashcard');
            cardElement.classList.remove('flipped');
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