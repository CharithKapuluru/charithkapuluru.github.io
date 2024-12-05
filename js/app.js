// Core application functionality

class AIDevHub {
    constructor() {
        this.initializePlayground();
        this.initializeAPIDemo();
        this.setupEventListeners();
    }

    initializePlayground() {
        const codeEditor = document.querySelector('#code-editor');
        const languageButtons = document.querySelectorAll('.language-button');
        const runButton = document.querySelector('#run-code');

        if (languageButtons) {
            languageButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    languageButtons.forEach(btn => btn.classList.remove('bg-blue-600'));
                    e.target.classList.add('bg-blue-600');
                    this.updateEditorLanguage(e.target.dataset.language);
                });
            });
        }

        if (runButton) {
            runButton.addEventListener('click', () => this.runCode());
        }
    }

    initializeAPIDemo() {
        const demoButtons = document.querySelectorAll('.api-demo-button');
        demoButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const demoType = e.target.dataset.demo;
                this.runAPIDemo(demoType);
            });
        });
    }

    setupEventListeners() {
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        // Mobile menu toggle
        const mobileMenuButton = document.querySelector('#mobile-menu-button');
        const mobileMenu = document.querySelector('#mobile-menu');
        
        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }
    }

    updateEditorLanguage(language) {
        const codeEditor = document.querySelector('#code-editor');
        const sampleCode = {
            python: `# AI Code Example
import tensorflow as tf

# Create a simple neural network
model = tf.keras.Sequential([
    tf.keras.layers.Dense(128, activation='relu'),
    tf.keras.layers.Dense(10, activation='softmax')
])`,
            javascript: `// AI Code Example
const tf = require('@tensorflow/tfjs');

// Create a simple neural network
const model = tf.sequential();
model.add(tf.layers.dense({units: 128, activation: 'relu'}));
model.add(tf.layers.dense({units: 10, activation: 'softmax'}));`
        };

        if (codeEditor) {
            codeEditor.textContent = sampleCode[language] || sampleCode.python;
        }
    }

    async runCode() {
        const outputArea = document.querySelector('#code-output');
        if (outputArea) {
            outputArea.textContent = 'Running code...';
            // Implement actual code execution here
            setTimeout(() => {
                outputArea.textContent = 'Code execution complete!';
            }, 1000);
        }
    }

    async runAPIDemo(demoType) {
        const resultArea = document.querySelector(`#${demoType}-result`);
        if (resultArea) {
            resultArea.textContent = 'Processing...';
            
            try {
                // Simulate API call
                const response = await this.mockAPICall(demoType);
                resultArea.textContent = JSON.stringify(response, null, 2);
            } catch (error) {
                resultArea.textContent = `Error: ${error.message}`;
            }
        }
    }

    mockAPICall(type) {
        const mockResponses = {
            text: {
                generated_text: "This is a sample AI-generated text response.",
                confidence: 0.95
            },
            image: {
                classifications: [
                    { label: "cat", confidence: 0.98 },
                    { label: "animal", confidence: 0.99 }
                ]
            }
        };

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(mockResponses[type]);
            }, 1000);
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.aiDevHub = new AIDevHub();
});