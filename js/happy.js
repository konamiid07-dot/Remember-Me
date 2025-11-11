// Happy Quotes Collection
const happyQuotes = [
    {
        text: "Berbahagialah untuk momen ini. Momen ini adalah hidupmu.",
        author: "Omar Khayyam"
    },
    {
        text: "Kebahagiaan bukanlah sesuatu yang sudah jadi. Ia berasal dari tindakanmu sendiri.",
        author: "Dalai Lama"
    },
    {
        text: "Selalu arahkan wajahmu ke sinar matahari—dan bayangan akan jatuh di belakangmu.",
        author: "Walt Whitman"
    },
    {
        text: "Sangat sedikit yang dibutuhkan untuk hidup bahagia; semuanya ada dalam dirimu dan cara berpikirmu.",
        author: "Marcus Aurelius"
    },
    {
        text: "Kebahagiaan adalah tujuan tertinggi dari aktivitas manusia.",
        author: "Aristoteles"
    },
    {
        text: "kebahagiaan adalah buah dari kebijaksanaan.",
        author: "Socrates"
    },
    {
        text: "Setiap hari baru adalah kesempatan baru untuk bahagia.",
        author: "Seneca"
    },
    {
        text: "Saat-saat kebahagiaan yang kita nikmati datang tiba-tiba. Bukan kita yang meraihnya, melainkan dia yang menangkap kita.",
        author: "Ashley Montagu"
    },
    {
        text: "Walau kebahagiaan melupakanmu untuk sesaat, jangan sampai kamu melupakannya sepenuhnya.",
        author: "Jacques Prévert"
    },
    {
        text: "Tersenyumlah, itu adalah kunci yang cocok dengan gembok hati setiap orang.",
        author: "Anthony J. D'Angelo"
    },
    {
        text: "Jika kamu bersyukur, niscaya Allah akan menambah nikmat kepadamu.",
        author: "Qur'an, Ibrahim (14): 7"
    },
    {
        text: "Dan jika kamu menghitung nikmat Allah, niscaya kamu tidak akan mampu menghitungnya.",
        author: "Qur'an, Ibrahim (14): 34"
    },
    {
        text: "Dan rahmat-Ku meliputi segala sesuatu.",
        author: "Qur'an, Al-A'raf (7): 156"
    },
    {
        text: "Senyummu kepada saudaramu adalah sedekah.",
        author: "HR. Tirmidzi"
    },
    {
        text: "Ekspresikan kebahagiaanmu lewat senyum manismu itu, agar dunia pun dapat merasakan hangatnya kebahagiaan itu.",
        author: "Me😊"
    },
    {
        text: "Senyummu menjadi salah satu alasan sederhana mengapa dunia terasa lebih indah.",
        author: "Me😊"
    },
    {
        text: "Kurasa tak butuh menjelaskan lagi dengan banyak kata bahwa kebahagian itu benar adanya, yaitu ada di diri kamu sendiri.",
        author: "Me😊"
    },
    {
        text: "Bahagia sejati bukanlah teriakan kegembiraan, melainkan tenangnya jiwa yang merasa diterima dan dicintai, apa adanya.",
        author: "Instagram's quote"
    },
    {
        text: "Orang-orang paling bahagia bukanlah yang memiliki segalanya yang terbaik, tetapi mereka yang membuat segalanya menjadi terbaik.",
        author: "Instagram's quote"
    }
];

// Variables - removed happiness meter related variables
let currentQuoteIndex = -1;
let isCalmMode = false;
let quotesRead = 0;
let celebrationsCount = 0;
let joyActivitiesCount = 0;
let gratitudeExpressed = [];

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    setupEventListeners();
});

// Initialize page elements and animations
function initializePage() {
    // Display first quote when page loads
    displayInitialQuote();
    
    // Show initial quote with animation
    setTimeout(() => {
        document.getElementById('quoteContainer').classList.add('show');
    }, 500);
    
    // Show calm mode button after some interaction
    setTimeout(() => {
        document.getElementById('calmBtn').classList.add('show');
    }, 3000);
    
    // Start gentle sakura petals (reduced amount)
    createSakuraPetals();
    
    // Set up recurring effects with longer intervals
    setInterval(() => {
        if (!isCalmMode) createSakuraPetals();
    }, 12000);
}

// Display first quote when page loads
function displayInitialQuote() {
    currentQuoteIndex = 0; // Start from first quote
    const quote = happyQuotes[currentQuoteIndex];
    
    const quoteText = document.getElementById('quoteText');
    const quoteAuthor = document.getElementById('quoteAuthor');
    
    if (quoteText && quoteAuthor) {
        quoteText.textContent = `"${quote.text}"`;
        quoteAuthor.textContent = `- ${quote.author}`;
    }
}

// Set up all event listeners
function setupEventListeners() {
    // Button event listeners
    document.getElementById('quoteBtn').addEventListener('click', handleQuoteButtonClick);
    document.getElementById('celebrateBtn').addEventListener('click', handleCelebrateButtonClick);
    document.getElementById('shareBtn').addEventListener('click', handleShareButtonClick);
    document.getElementById('calmBtn').addEventListener('click', handleCalmButtonClick);
    
    // Activity cards
    document.getElementById('smileCard').addEventListener('click', () => handleActivityClick('smile'));
    document.getElementById('hugCard').addEventListener('click', () => handleActivityClick('hug'));
    document.getElementById('danceCard').addEventListener('click', () => handleActivityClick('dance'));
    
    // Gratitude buttons
    const gratitudeButtons = document.querySelectorAll('.gratitude-btn');
    gratitudeButtons.forEach(btn => {
        btn.addEventListener('click', handleGratitudeClick);
    });

    // HOME BUTTON ANIMATION - TAMBAHKAN BAGIAN INI
const homeButton = document.querySelector('.back-button');
if (homeButton) {
    homeButton.addEventListener('mousedown', function(e) {
        this.style.transform = 'scale(0.95)';
    });
    
    homeButton.addEventListener('mouseup', function(e) {
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
    
    homeButton.addEventListener('mouseleave', function(e) {
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
    
    homeButton.addEventListener('touchstart', function(e) {
        this.style.transform = 'scale(0.95)';
    });
    
    homeButton.addEventListener('touchend', function(e) {
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
    
    homeButton.addEventListener('click', function(e) {
        createSparkleEffect(
            this.offsetLeft + this.offsetWidth / 2,
            this.offsetTop + this.offsetHeight / 2
        );
    });
}
    
    // Mouse move sparkle effect (reduced frequency)
    document.addEventListener('mousemove', handleMouseMove);
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyPress);
}

// Handle quote button click - sequential quotes
function handleQuoteButtonClick() {
    const quoteContainer = document.getElementById('quoteContainer');
    const quoteText = document.getElementById('quoteText');
    const quoteAuthor = document.getElementById('quoteAuthor');
    
    quotesRead++;
    
    // Add click animation to button
    const button = document.getElementById('quoteBtn');
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = '';
    }, 150);
    
    // Hide current quote with fade out animation
    quoteContainer.classList.remove('show');
    
    setTimeout(() => {
        // Get next quote sequentially
        currentQuoteIndex = (currentQuoteIndex + 1) % happyQuotes.length;
        const quote = happyQuotes[currentQuoteIndex];
        
        // Update quote content
        quoteText.textContent = `"${quote.text}"`;
        quoteAuthor.textContent = `- ${quote.author}`;
        
        // Show new quote with fade in animation
        quoteContainer.classList.add('show');
        
        // Optional: Show quote position indicator in console
        console.log(`Quote ${currentQuoteIndex + 1} dari ${happyQuotes.length}`);
        
        // Add gentle effects
        setTimeout(createMiniConfetti, 200);
    }, 300);
}

// Handle celebrate button click
function handleCelebrateButtonClick() {
    const joyActivities = document.getElementById('joyActivities');
    const gratitudeZone = document.getElementById('gratitudeZone');
    
    celebrationsCount++;
    
    // Hide gratitude zone if shown
    gratitudeZone.classList.remove('show');
    
    // Toggle joy activities
    if (joyActivities.classList.contains('show')) {
        joyActivities.classList.remove('show');
    } else {
        joyActivities.classList.add('show');
    }
    
    // Create celebration effects
    createConfetti();
    
    // Add button effect
    const button = document.getElementById('celebrateBtn');
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = '';
    }, 150);
}

// Handle share button click
function handleShareButtonClick() {
    const gratitudeZone = document.getElementById('gratitudeZone');
    const joyActivities = document.getElementById('joyActivities');
    
    // Hide joy activities if shown
    joyActivities.classList.remove('show');
    
    // Toggle gratitude zone
    if (gratitudeZone.classList.contains('show')) {
        gratitudeZone.classList.remove('show');
    } else {
        gratitudeZone.classList.add('show');
    }
    
    // Add button effect
    const button = document.getElementById('shareBtn');
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = '';
    }, 150);
    
    // Create gentle sparkles
    setTimeout(() => {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                createSparkleEffect(
                    Math.random() * window.innerWidth,
                    Math.random() * window.innerHeight * 0.6
                );
            }, i * 200);
        }
    }, 100);
}

// Handle calm mode toggle
function handleCalmButtonClick() {
    const body = document.body;
    const button = document.getElementById('calmBtn');
    
    isCalmMode = !isCalmMode;
    
    if (isCalmMode) {
        body.classList.add('calm-mode');
        button.textContent = '🌈 Vibrant Mode';
    } else {
        body.classList.remove('calm-mode');
        button.textContent = '🌸 Gentle Mode';
    }
    
    // Add button effect
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = '';
    }, 150);
}

// Handle activity clicks
function handleActivityClick(activity) {
    joyActivitiesCount++;
    
    const activities = {
        smile: {
            message: 'Your smile brightened someone\'s day! 😊',
            effect: 'smile'
        },
        hug: {
            message: 'Virtual hug sent with love! 🤗',
            effect: 'hug'
        },
        dance: {
            message: 'Dance like nobody\'s watching! 💃',
            effect: 'dance'
        }
    };
    
    const selectedActivity = activities[activity];
    showActivityMessage(selectedActivity.message);
    
    // Create appropriate effects
    if (activity === 'smile') {
        createHeartEffect(document.getElementById('smileCard'));
    } else if (activity === 'hug') {
        createWarmGlow();
    } else if (activity === 'dance') {
        createMiniConfetti();
        setTimeout(createMiniConfetti, 500);
    }
}

// Handle gratitude button clicks
function handleGratitudeClick(e) {
    const gratitudeType = e.target.dataset.gratitude;
    const gratitudeMessage = document.getElementById('gratitudeMessage');
    const allButtons = document.querySelectorAll('.gratitude-btn');
    
    // Remove selected class from all buttons
    allButtons.forEach(btn => btn.classList.remove('selected'));
    
    // Add selected class to clicked button
    e.target.classList.add('selected');
    
    // Track gratitude
    if (!gratitudeExpressed.includes(gratitudeType)) {
        gratitudeExpressed.push(gratitudeType);
    }
    
    const gratitudeMessages = {
        friends: "Friendship is one of life's greatest gifts! 👫",
        family: "Family love is unconditional and eternal! 👨‍👩‍👧‍👦",
        nature: "Nature has a way of healing our souls! 🌻",
        music: "Music speaks what cannot be expressed! 🎵",
        food: "Good food brings people together! 🍕",
        me: "I know it 😄, I will always make you happy! ❤️"
    };
    
    gratitudeMessage.textContent = gratitudeMessages[gratitudeType];
    
    // Create gentle sparkle effect
    setTimeout(() => {
        createSparkleEffect(
            e.target.offsetLeft + e.target.offsetWidth / 2,
            e.target.offsetTop + e.target.offsetHeight / 2
        );
    }, 100);
}

// Show activity message
function showActivityMessage(message) {
    const messageEl = document.createElement('div');
    messageEl.textContent = message;
    messageEl.style.cssText = `
        position: fixed;
        top: 25%;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(255, 154, 158, 0.95);
        color: white;
        padding: 15px 25px;
        border-radius: 20px;
        font-size: 1rem;
        font-weight: bold;
        z-index: 1001;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        animation: messageFloat 2.5s ease-out forwards;
        cursor: pointer;
    `;
    
    // Add message animation if not exists
    if (!document.getElementById('message-style')) {
        const style = document.createElement('style');
        style.id = 'message-style';
        style.textContent = `
            @keyframes messageFloat {
                0% { opacity: 0; transform: translateX(-50%) translateY(-10px); }
                20% { opacity: 1; transform: translateX(-50%) translateY(0); }
                80% { opacity: 1; transform: translateX(-50%) translateY(0); }
                100% { opacity: 0; transform: translateX(-50%) translateY(10px); }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(messageEl);
    
    // Remove message after animation
    setTimeout(() => {
        if (messageEl.parentNode) {
            messageEl.remove();
        }
    }, 2500);
}

// Handle mouse move for sparkle effects (reduced frequency)
function handleMouseMove(e) {
    // Create sparkle effect with 3% chance (reduced from 8%)
    if (Math.random() < 0.03) {
        createSparkleEffect(e.clientX, e.clientY);
    }
}

// Handle keyboard shortcuts
function handleKeyPress(e) {
    switch(e.key) {
        case ' ':
        case 'Enter':
            e.preventDefault();
            handleQuoteButtonClick();
            break;
        case 'c':
        case 'C':
            handleCelebrateButtonClick();
            break;
        case 's':
        case 'S':
            handleShareButtonClick();
            break;
        case 'm':
        case 'M':
            handleCalmButtonClick();
            break;
        case 'h':
        case 'H':
            if (!isCalmMode) createConfetti();
            break;
    }
}

// Create heart effect around element
function createHeartEffect(container) {
    const heartEmojis = ['💖', '💕', '💗', '💝', '💘'];
    
    for (let i = 0; i < 4; i++) { // Reduced from 6 to 4
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
            heart.className = 'heart';
            
            // Random positioning around the container
            const angle = (i / 4) * 2 * Math.PI;
            const radius = 25; // Reduced radius
            heart.style.left = (radius * Math.cos(angle) + container.offsetWidth / 2) + 'px';
            heart.style.top = (radius * Math.sin(angle) + container.offsetHeight / 2) + 'px';
            
            container.appendChild(heart);
            
            // Remove heart after animation
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.remove();
                }
            }, 2500);
        }, i * 150);
    }
}

// Create warm glow effect
function createWarmGlow() {
    const glow = document.createElement('div');
    glow.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        width: 200px;
        height: 200px;
        background: radial-gradient(circle, rgba(255, 154, 158, 0.4), transparent);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
        z-index: 1;
        animation: glowPulse 2s ease-out forwards;
    `;
    
    // Add glow animation if not exists
    if (!document.getElementById('glow-style')) {
        const style = document.createElement('style');
        style.id = 'glow-style';
        style.textContent = `
            @keyframes glowPulse {
                0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
                50% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
                100% { opacity: 0; transform: translate(-50%, -50%) scale(2); }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(glow);
    
    // Remove glow after animation
    setTimeout(() => {
        if (glow.parentNode) {
            glow.remove();
        }
    }, 2000);
}

// Create sparkle effect at position
function createSparkleEffect(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    
    document.body.appendChild(sparkle);
    
    // Remove sparkle after animation
    setTimeout(() => {
        if (sparkle.parentNode) {
            sparkle.remove();
        }
    }, 1500);
}

// Create gentle sakura petals (reduced amount)
function createSakuraPetals() {
    const sakuraContainer = document.getElementById('sakuraContainer');
    const petalCount = isCalmMode ? 8 : 15; // Reduced from original 50+
    
    for (let i = 0; i < petalCount; i++) {
        setTimeout(() => {
            const petal = document.createElement('div');
            petal.className = 'petal';
            petal.style.left = Math.random() * 100 + 'vw';
            petal.style.animationDuration = (Math.random() * 8 + 10) + 's'; // Slower
            petal.style.animationDelay = Math.random() * 5 + 's';
            
            sakuraContainer.appendChild(petal);
            
            // Remove petal after animation
            setTimeout(() => {
                if (petal.parentNode) {
                    petal.remove();
                }
            }, 18000);
        }, i * 200);
    }
}

// Create confetti animation (controlled)
function createConfetti() {
    const confettiContainer = document.getElementById('confettiContainer');
    const colors = ['#FF6B9D', '##4ECDC4', '#FFD93D', '#6BCF7F', '#FF8A65', '#A8E6CF'];
    const confettiCount = isCalmMode ? 15 : 30; // Reduced from 50
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            const piece = document.createElement('div');
            piece.className = 'confetti-piece';
            piece.style.left = Math.random() * 100 + 'vw';
            piece.style.background = colors[Math.floor(Math.random() * colors.length)];
            piece.style.animationDuration = (Math.random() * 2 + 2.5) + 's'; // Slightly slower
            piece.style.animationDelay = Math.random() * 1 + 's';
            
            // Random shapes (less frequent)
            if (Math.random() > 0.8) {
                piece.style.borderRadius = '0';
                piece.style.transform = 'rotate(45deg)';
            }
            
            confetti.appendChild(piece);
            confettiContainer.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.remove();
                }
            }, 5000);
        }, i * 80);
    }
}

// Create smaller confetti burst for interactions
function createMiniConfetti() {
    const confettiContainer = document.getElementById('confettiContainer');
    const colors = ['#FF6B9D', '#4ECDC4', '#FFD93D', '#6BCF7F', '#FF8A65'];
    const miniCount = isCalmMode ? 8 : 15; // Reduced from 20
    
    for (let i = 0; i < miniCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.left = (Math.random() * 60 + 20) + 'vw'; // More centered
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        piece.style.animationDuration = (Math.random() * 1.5 + 1.5) + 's';
        piece.style.animationDelay = Math.random() * 0.3 + 's';
        
        confetti.appendChild(piece);
        confettiContainer.appendChild(confetti);
        
        // Remove mini confetti after animation
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.remove();
            }
        }, 3000);
    }
}

// Get next quote function
function getNextQuote() {
    currentQuoteIndex = (currentQuoteIndex + 1) % happyQuotes.length;
    return happyQuotes[currentQuoteIndex];
}

// Get current quote function
function getCurrentQuote() {
    return happyQuotes[currentQuoteIndex];
}

// Reset to first quote function
function resetToFirstQuote() {
    currentQuoteIndex = 0;
    const quote = happyQuotes[currentQuoteIndex];
    
    const quoteText = document.getElementById('quoteText');
    const quoteAuthor = document.getElementById('quoteAuthor');
    
    if (quoteText && quoteAuthor) {
        quoteText.textContent = `"${quote.text}"`;
        quoteAuthor.textContent = `- ${quote.author}`;
    }
    
    return quote;
}

// Utility function to clean up old effects
function cleanupEffects() {
    // Remove old confetti pieces (keep only recent ones)
    const oldConfetti = document.querySelectorAll('.confetti');
    if (oldConfetti.length > 20) {
        oldConfetti.forEach((confetti, index) => {
            if (index < oldConfetti.length - 15 && confetti.parentNode) {
                confetti.remove();
            }
        });
    }
    
    // Remove old hearts
    const oldHearts = document.querySelectorAll('.heart');
    oldHearts.forEach(heart => {
        if (heart.parentNode) {
            heart.remove();
        }
    });
    
    // Remove old sparkles
    const oldSparkles = document.querySelectorAll('.sparkle');
    oldSparkles.forEach(sparkle => {
        if (sparkle.parentNode) {
            sparkle.remove();
        }
    });
    
    // Remove old petals (keep only recent ones)
    const oldPetals = document.querySelectorAll('.petal');
    if (oldPetals.length > 25) {
        oldPetals.forEach((petal, index) => {
            if (index < oldPetals.length - 20 && petal.parentNode) {
                petal.remove();
            }
        });
    }
}

// Clean up effects every 45 seconds to prevent memory leaks
setInterval(cleanupEffects, 45000);

// Export functions for potential external use
window.HappyPage = {
    createConfetti,
    createSakuraPetals,
    getNextQuote,
    getCurrentQuote,
    resetToFirstQuote,
    handleQuoteButtonClick,
    handleCelebrateButtonClick,
    handleCalmButtonClick,
    // Additional info about quotes
    getCurrentQuoteIndex: () => currentQuoteIndex,
    getTotalQuotes: () => happyQuotes.length,
    getQuoteProgress: () => `${currentQuoteIndex + 1}/${happyQuotes.length}`
};

// Add this to your existing happy.js file or create a separate file

// Home button press animation - add to setupEventListeners function or call separately
function setupHomeButtonAnimation() {
    const homeButton = document.querySelector('.back-button');
    
    if (homeButton) {
        // Mouse down event - same as other buttons
        homeButton.addEventListener('mousedown', function(e) {
            this.style.transform = 'scale(0.95)';
        });
        
        // Mouse up event - reset transform
        homeButton.addEventListener('mouseup', function(e) {
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
        
        // Mouse leave event - reset if mouse leaves while pressed
        homeButton.addEventListener('mouseleave', function(e) {
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
        
        // Touch events for mobile
        homeButton.addEventListener('touchstart', function(e) {
            this.style.transform = 'scale(0.95)';
        });
        
        homeButton.addEventListener('touchend', function(e) {
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
        
        // Click event with animation (optional - for additional feedback)
        homeButton.addEventListener('click', function(e) {
            // Create a small sparkle effect when clicked
            createSparkleEffect(
                this.offsetLeft + this.offsetWidth / 2,
                this.offsetTop + this.offsetHeight / 2
            );
        });
    }
}

// Call this function when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Your existing initialization code...
    setupHomeButtonAnimation();
});

// Alternative: Add to your existing setupEventListeners function
// Just add this code inside your existing setupEventListeners function:
/*
// Home button animation
const homeButton = document.querySelector('.back-button');
if (homeButton) {
    homeButton.addEventListener('mousedown', function(e) {
        this.style.transform = 'scale(0.95)';
    });
    
    homeButton.addEventListener('mouseup', function(e) {
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
    
    homeButton.addEventListener('mouseleave', function(e) {
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
    
    homeButton.addEventListener('touchstart', function(e) {
        this.style.transform = 'scale(0.95)';
    });
    
    homeButton.addEventListener('touchend', function(e) {
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
    
    homeButton.addEventListener('click', function(e) {
        createSparkleEffect(
            this.offsetLeft + this.offsetWidth / 2,
            this.offsetTop + this.offsetHeight / 2
        );
    });
}
*/