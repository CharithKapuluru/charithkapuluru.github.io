const API_URL = 'https://charithkapuluru-github-io.vercel.app';

class FlashcardManager {
    constructor() {
        this.currentCard = 0;
        this.cards = [
            // Beginner Level Cards
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
            },
            {
                id: 3,
                front: "What is Deep Learning?",
                back: "A subset of machine learning that uses neural networks with multiple layers (deep neural networks) to progressively extract higher-level features from raw input.",
                category: "Basic AI Concepts",
                difficulty: "Beginner"
            },
            {
                id: 4,
                front: "What is a Neural Network?",
                back: "A computing system inspired by biological neural networks, consisting of interconnected nodes (neurons) that process and transmit information.",
                category: "Basic AI Concepts",
                difficulty: "Beginner"
            },
            {
                id: 5,
                front: "What is Supervised Learning?",
                back: "A type of machine learning where the model learns from labeled training data to make predictions or classifications.",
                category: "Basic AI Concepts",
                difficulty: "Beginner"
            },
            {
                id: 6,
                front: "What is Unsupervised Learning?",
                back: "A type of machine learning where the model finds patterns and relationships in unlabeled data.",
                category: "Basic AI Concepts",
                difficulty: "Beginner"
            },
            {
                id: 7,
                front: "What is Computer Vision?",
                back: "A field of AI that enables computers to derive meaningful information from digital images and videos.",
                category: "Basic AI Concepts",
                difficulty: "Beginner"
            },
            {
                id: 8,
                front: "What is Natural Language Processing (NLP)?",
                back: "A branch of AI that helps computers understand, interpret, and manipulate human language.",
                category: "Basic AI Concepts",
                difficulty: "Beginner"
            },
            {
                id: 9,
                front: "What is Reinforcement Learning?",
                back: "A type of machine learning where an agent learns to make decisions by performing actions in an environment to maximize a reward.",
                category: "Basic AI Concepts",
                difficulty: "Beginner"
            },
            {
                id: 10,
                front: "What is Data Preprocessing?",
                back: "The process of cleaning and transforming raw data into a format that's suitable for machine learning models.",
                category: "Basic AI Concepts",
                difficulty: "Beginner"
            },
            // Intermediate Level Cards
            {
                id: 11,
                front: "What is Backpropagation?",
                back: "An algorithm for training neural networks that calculates gradients by working backwards from the output layer to adjust weights and minimize error.",
                category: "Neural Networks",
                difficulty: "Intermediate"
            },
            {
                id: 12,
                front: "What is a Convolutional Neural Network (CNN)?",
                back: "A deep learning architecture particularly effective for image processing, using convolutional layers to detect features and patterns.",
                category: "Neural Networks",
                difficulty: "Intermediate"
            },
            {
                id: 13,
                front: "What is Transfer Learning?",
                back: "A machine learning technique where a pre-trained model is reused as a starting point for a new task, saving time and computational resources.",
                category: "Machine Learning",
                difficulty: "Intermediate"
            },
            {
                id: 14,
                front: "What is Gradient Descent?",
                back: "An optimization algorithm used to minimize the loss function by iteratively moving towards the minimum value.",
                category: "Machine Learning",
                difficulty: "Intermediate"
            },
            {
                id: 15,
                front: "What is Overfitting?",
                back: "When a model learns the training data too well, including noise and outliers, resulting in poor generalization to new data.",
                category: "Machine Learning",
                difficulty: "Intermediate"
            },
            {
                id: 16,
                front: "What is a Recurrent Neural Network (RNN)?",
                back: "A type of neural network designed to work with sequence data by maintaining an internal state (memory) from previous inputs.",
                category: "Neural Networks",
                difficulty: "Intermediate"
            },
            {
                id: 17,
                front: "What is the Vanishing Gradient Problem?",
                back: "A difficulty found in training neural networks where the gradient becomes extremely small, effectively preventing the network from learning.",
                category: "Neural Networks",
                difficulty: "Intermediate"
            },
            {
                id: 18,
                front: "What is Feature Extraction?",
                back: "The process of selecting or combining variables into features that make machine learning algorithms work better.",
                category: "Machine Learning",
                difficulty: "Intermediate"
            },
            {
                id: 19,
                front: "What is Cross-Validation?",
                back: "A resampling method that uses different portions of data to test and train a model on different iterations.",
                category: "Machine Learning",
                difficulty: "Intermediate"
            },
            {
                id: 20,
                front: "What is Batch Normalization?",
                back: "A technique to standardize the inputs to a network layer for each mini-batch to stabilize the learning process.",
                category: "Neural Networks",
                difficulty: "Intermediate"
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
        const difficultyElement = document.getElementById('card-difficulty');

        categoryElement.textContent = card.category;
        contentElement.textContent = this.isFlipped ? card.back : card.front;
        difficultyElement.textContent = card.difficulty;
        
        document.getElementById('card-counter').textContent = 
            `${this.currentCard + 1} / ${this.cards.length}`;
    }

    flipCard() {
        this.isFlipped = !this.isFlipped;
        
        const cardElement = document.getElementById('flashcard');
        
        cardElement.style.transform = this.isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)';
        
        setTimeout(() => {
            this.renderCard();
        }, 150);
    }

    nextCard() {
        if (this.currentCard < this.cards.length - 1) {
            this.currentCard++;
            this.isFlipped = false;
            const cardElement = document.getElementById('flashcard');
            cardElement.style.transform = 'rotateY(0deg)';
            this.renderCard();
        }
    }

    previousCard() {
        if (this.currentCard > 0) {
            this.currentCard--;
            this.isFlipped = false;
            const cardElement = document.getElementById('flashcard');
            cardElement.style.transform = 'rotateY(0deg)';
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
