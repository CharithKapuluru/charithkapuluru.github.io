// Code Generator functionality
async function generateCode() {
    const language = document.getElementById('language-select').value;
    const codeInput = document.getElementById('code-input').value;
    const loadingIndicator = document.querySelector('.loading-indicator');

    try {
        // Show loading state
        const generateBtn = document.querySelector('button[onclick="generateCode()"]');
        generateBtn.disabled = true;
        generateBtn.innerHTML = '<span class="loading-spinner"></span> Generating...';

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Generate code based on language
        let generatedCode = '';
        switch(language) {
            case 'python':
                generatedCode = generatePythonCode(codeInput);
                break;
            case 'javascript':
                generatedCode = generateJavaScriptCode(codeInput);
                break;
            case 'java':
                generatedCode = generateJavaCode(codeInput);
                break;
            default:
                generatedCode = '// Language not supported';
        }

        // Update the code input with generated code
        document.getElementById('code-input').value = generatedCode;

        // Show success message
        showToast('Code generated successfully!', 'success');
    } catch (error) {
        showToast('Error generating code', 'error');
    } finally {
        // Reset button state
        const generateBtn = document.querySelector('button[onclick="generateCode()"]');
        generateBtn.disabled = false;
        generateBtn.textContent = 'Generate';
    }
}

// Helper functions for code generation
function generatePythonCode(input) {
    // Basic code generation example
    return `def process_data():
    # Generated from: ${input}
    try:
        result = ${input}
        return result
    except Exception as e:
        print(f"Error: {e}")
        return None

# Call the function
result = process_data()
print(result)`;
}

function generateJavaScriptCode(input) {
    return `function processData() {
    // Generated from: ${input}
    try {
        const result = ${input};
        return result;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}

// Call the function
const result = processData();
console.log(result);`;
}

function generateJavaCode(input) {
    return `public class DataProcessor {
    public static void main(String[] args) {
        // Generated from: ${input}
        try {
            System.out.println(${input});
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
        }
    }
}`;
}

// AI Model Playground functionality
async function runModel() {
    const modelType = document.getElementById('model-select').value;
    const prompt = document.getElementById('prompt-input').value;
    const runBtn = document.querySelector('button[onclick="runModel()"]');

    try {
        // Show loading state
        runBtn.disabled = true;
        runBtn.innerHTML = '<span class="loading-spinner"></span> Running...';

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Process based on model type
        let result = '';
        switch(modelType) {
            case 'text':
                result = `Generated text based on prompt: "${prompt}"
\nThis is a simulated response that would come from an AI text generation model.`;
                break;
            case 'image':
                result = 'Image generation capability would be integrated here with actual API calls to services like DALL-E or Stable Diffusion.';
                break;
            case 'code':
                result = `// Generated code suggestion\nfunction suggestedCode() {\n    // Based on prompt: "${prompt}"\n    // Code completion would be provided here\n}`;
                break;
            default:
                result = 'Model type not supported';
        }

        // Show result in modal
        showResultModal(result);
        showToast('Model ran successfully!', 'success');
    } catch (error) {
        showToast('Error running model', 'error');
    } finally {
        // Reset button state
        runBtn.disabled = false;
        runBtn.textContent = 'Run';
    }
}

// UI Helper functions
function showResultModal(content) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class='bg-gray-800 p-8 rounded-lg max-w-2xl w-full'>
            <h3 class='text-xl font-bold mb-4'>Result</h3>
            <div class='bg-gray-700 p-4 rounded-lg mb-4 whitespace-pre-wrap'>${content}</div>
            <button onclick='this.parentElement.parentElement.remove()' 
                    class='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg'>
                Close
            </button>
        </div>
    `;
    document.body.appendChild(modal);
}

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `fixed bottom-4 right-4 px-6 py-3 rounded-lg text-white ${type === 'error' ? 'bg-red-600' : 'bg-green-600'}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// Initialize event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Add loading spinner styles
    const style = document.createElement('style');
    style.textContent = `
        .loading-spinner {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 2px solid rgba(255,255,255,0.3);
            border-radius: 50%;
            border-top-color: white;
            animation: spin 1s ease-in-out infinite;
        }

        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
});
