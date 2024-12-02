const API_URL = 'https://charithkapuluru-github-io.vercel.app';

class FlashcardManager {
    constructor() {
        this.currentCard = 0;
        this.cards = [];
        this.isFlipped = false;
    }

    async loadFlashcards() {
        try {
            const response = await fetch(`${API_URL}/api/flashcards/`);
            this.cards = await response.json();
            this.renderCard();
            this.updateProgress();
        } catch (error) {
            console.error('Error loading flashcards:', error);
        }
    }

    renderCard() {
        const card = this.cards[this.currentCard];
        if (!card) return;

        const cardElement = document.getElementById('flashcard');
        const contentElement = document.getElementById('card-content');
        const categoryElement = document.getElementById('card-category');

        categoryElement.textContent = card.category;
        contentElement.textContent = this.isFlipped ? card.back : card.front;
        
        // Update card counter
        document.getElementById('card-counter').textContent = 
            `${this.currentCard + 1} / ${this.cards.length}`;
    }

    flipCard() {
        this.isFlipped = !this.isFlipped;
        this.renderCard();
        
        const cardElement = document.getElementById('flashcard');
        cardElement.classList.toggle('flipped');
    }

    nextCard() {
        if (this.currentCard < this.cards.length - 1) {
            this.currentCard++;
            this.isFlipped = false;
            this.renderCard();
            document.getElementById('flashcard').classList.remove('flipped');
        }
    }

    previousCard() {
        if (this.currentCard > 0) {
            this.currentCard--;
            this.isFlipped = false;
            this.renderCard();
            document.getElementById('flashcard').classList.remove('flipped');
        }
    }

    updateProgress() {
        document.getElementById('total-cards').textContent = this.cards.length;
    }
}

const flashcardManager = new FlashcardManager();

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', () => {
    flashcardManager.loadFlashcards();
});
