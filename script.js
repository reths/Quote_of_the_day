
document.addEventListener('DOMContentLoaded', function() {
    const quoteText = document.getElementById('quote-text');
    const quoteAuthor = document.getElementById('quote-author');
    const newQuoteBtn = document.getElementById('new-quote-btn');
    const loading = document.getElementById('loading');
    const quoteBox = document.querySelector('.quote-box');
    const currentDate = document.getElementById('current-date');

    // Display current date
    function displayCurrentDate() {
        const today = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        currentDate.textContent = today.toLocaleDateString('en-US', options);
    }

    async function fetchQuote() {
        try {
            // Show loading state
            showLoading();
            
            const response = await fetch('https://api.quotable.io/random');
            
            if (!response.ok) {
                throw new Error('Failed to fetch quote');
            }
            
            const data = await response.json();
            
            // Hide loading and show quote
            hideLoading();
            displayQuote(data.content, data.author);
            
        } catch (error) {
            console.error('Error fetching quote:', error);
            hideLoading();
            displayQuote(
                'The only way to do great work is to love what you do.',
                'Steve Jobs'
            );
        }
    }

    function displayQuote(content, author) {
        // Add fade effect
        quoteBox.style.opacity = '0';
        
        setTimeout(() => {
            quoteText.textContent = content;
            quoteAuthor.textContent = author;
            quoteBox.style.opacity = '1';
        }, 150);
    }

    function showLoading() {
        newQuoteBtn.disabled = true;
        newQuoteBtn.textContent = 'Loading...';
        loading.style.display = 'flex';
        quoteBox.style.display = 'none';
    }

    function hideLoading() {
        newQuoteBtn.disabled = false;
        newQuoteBtn.textContent = 'New Quote';
        loading.style.display = 'none';
        quoteBox.style.display = 'block';
    }

    // Event listener for the button
    newQuoteBtn.addEventListener('click', fetchQuote);

    // Display current date
    displayCurrentDate();
    
    // Load initial quote
    fetchQuote();
});
