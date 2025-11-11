// Anger Management Quotes Collection
const angerQuotes = [
    {
        text: "Orang yang dapat mengendalikan amarahnya telah menaklukkan musuh yang paling kuat.",
        author: "Confucius"
    },
    {
        text: "Kedamaian tidak dapat dijaga dengan kekuatan; kedamaian hanya dapat dicapai dengan pengertian.",
        author: "Albert Einstein"
    },
    {
        text: "Marah itu mudah. Tapi marah kepada orang yang tepat, dengan tingkat yang tepat, pada waktu yang tepat, untuk tujuan yang tepat, dan dengan cara yang tepat - itu tidak mudah.",
        author: "Aristoteles"
    },
    {
        text: "Kamu tidak bisa mengendalikan apa yang terjadi padamu, tapi kamu bisa mengendalikan bagaimana kamu meresponsnya.",
        author: "Epictetus"
    },
    {
        text: "Amarah adalah emosi yang harus dikendalikan oleh akal. Tanpa kontrol rasional, amarah menghancurkan kebijaksanaan.",
        author: "Plato"
    },
    {
        text: "Cara terbaik untuk mengatasi amarah adalah dengan menunda tindakan.",
        author: "Seneca"
    },
    {
        text: "Dalam momen amarah, berhitunglah sampai sepuluh sebelum berbicara. Jika sangat marah, berhitunglah sampai seratus.",
        author: "Thomas Jefferson"
    },
    {
        text: "Amarah adalah angin yang mematikan pelita pikiran. Penjagaan terhadap amarah adalah penjagaan terhadap kebijaksanaan.",
        author: "Robert Green Ingersoll"
    },
    {
        text: "Respons amarah yang berulang menciptakan chronic inflammation yang merusak kesehatan jangka panjang.",
        author: "Dr. Janice Kiecolt-Glaser"
    },
    {
        text: "Breathing techniques dapat mengaktifkan parasympathetic nervous system dan meredakan amarah.",
        author: "Dr. Andrew Weil"
    },
    {
        text: "Lemah adalah orang yang tidak bisa memaafkan. Pengampunan adalah sifat orang yang kuat.",
        author: "Mahatma Gandhi"
    },
    {
        text: "Pengampunan adalah wewangian yang dipancarkan violet pada tumit yang menginjaknya.",
        author: "Mark Twain"
    },
    {
        text: "Tolaklah kejahatan itu dengan kebaikan. Kami lebih mengetahui apa yang mereka sifatkan.",
        author: "Qur’an, Al-Mu'minun (23): 96"
    },
    {
        text: "Dan bersabarlah kamu dan kesabaranmu itu semata-mata dengan pertolongan Allah dan janganlah kamu bersedih hati terhadap mereka dan janganlah kamu bersempit dada terhadap apa yang mereka tipu dayakan.",
        author: "Qur’an, An-Nahl (16): 127"
    },
    {
        text: "Dan adapun orang yang takut kepada kebesaran Tuhannya dan menahan diri dari keinginan hawa nafsunya, maka sesungguhnya surgalah tempat tinggalnya.",
        author: "Qur’an, An-Nazi'at (79): 40-41"
    },
    {
        text: "Sesungguhnya orang yang kuat adalah orang yang dapat mengendalikan dirinya ketika marah.",
        author: "HR. Bukhari Muslim"
    },
    {
        text: "Ingat, amarah adalah emosi yang natural, yang terpenting adalah bagaimana kita mengelolanya dengan baik.",
        author: "Me 😊"
    }
];

// PERBAIKAN: currentQuoteIndex dimulai dari -1 agar quote pertama dimulai dari index 0
let currentQuoteIndex = -1;
let punchCount = 0;
let isBreathing = false;
let breathingInterval;
let isCooldownMode = false;
let cooldownTimer;
let lastLightningTime = 0;
let lightningCooldown = 3000; // 3 seconds between lightning strikes

// Progress tracking
let totalPunches = 0;
let breathingSessions = 0;

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    setupEventListeners();
});

// Initialize page elements and animations
function initializePage() {
    // PERBAIKAN: Tampilkan quote pertama saat halaman dimuat
    displayInitialQuote();
    
    // Show initial quote with animation
    setTimeout(() => {
        document.getElementById('quoteContainer').classList.add('show');
    }, 500);
    
    // Start fire sparks animation
    createFireSparks();
    
    // Set up recurring effects with cooldown
    setInterval(() => {
        if (!isCooldownMode) createFireSparks();
    }, 6000);
    
    setInterval(() => {
        if (canCreateLightning()) createLightning();
    }, 8000);
}

// PERBAIKAN: Fungsi baru untuk menampilkan quote pertama
function displayInitialQuote() {
    currentQuoteIndex = 0; // Mulai dari quote pertama
    const quote = angerQuotes[currentQuoteIndex];
    
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
    document.getElementById('releaseBtn').addEventListener('click', handleReleaseButtonClick);
    document.getElementById('punchBtn').addEventListener('click', handlePunchButtonClick);
    document.getElementById('breatheBtn').addEventListener('click', handleBreatheButtonClick);
    document.getElementById('cooldownBtn').addEventListener('click', handleCooldownButtonClick);
    
    // Punch bag click
    document.getElementById('punchBag').addEventListener('click', handlePunchBagClick);
    
    // Mouse move explosion effect (reduced frequency)
    document.addEventListener('mousemove', handleMouseMove);
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyPress);
}

// PERBAIKAN: Handle release button click - sekarang berurutan
function handleReleaseButtonClick() {
    if (isCooldownMode) {
        showCooldownMessage("Take a moment to breathe first before releasing more anger");
        return;
    }
    
    const quoteContainer = document.getElementById('quoteContainer');
    const quoteText = document.getElementById('quoteText');
    const quoteAuthor = document.getElementById('quoteAuthor');
    
    // Add click animation to button
    const button = document.getElementById('releaseBtn');
    button.style.transform = 'scale(0.9)';
    setTimeout(() => {
        button.style.transform = '';
    }, 100);
    
    // Hide current quote with fade out animation
    quoteContainer.classList.remove('show');
    
    setTimeout(() => {
        // PERBAIKAN: Ambil quote berikutnya secara berurutan
        currentQuoteIndex = (currentQuoteIndex + 1) % angerQuotes.length;
        const quote = angerQuotes[currentQuoteIndex];
        
        // Update quote content
        quoteText.textContent = `"${quote.text}"`;
        quoteAuthor.textContent = `- ${quote.author}`;
        
        // Show new quote with fade in animation
        quoteContainer.classList.add('show');
        
        // PERBAIKAN: Tampilkan indikator posisi quote (opsional)
        console.log(`Anger Quote ${currentQuoteIndex + 1} dari ${angerQuotes.length}`);
        
        // Create gentle effects
        setTimeout(createMiniFireSparks, 200);
    }, 250);
}

// Handle punch button click
function handlePunchButtonClick() {
    if (isCooldownMode) {
        showCooldownMessage("Focus on breathing exercises instead of punching during cooldown");
        return;
    }
    
    const punchBag = document.getElementById('punchBag');
    const breathingCircle = document.getElementById('breathingCircle');
    const cooldownZone = document.getElementById('cooldownZone');
    
    // Hide other elements
    breathingCircle.classList.remove('show');
    cooldownZone.classList.remove('show');
    stopBreathing();
    
    // Toggle punch bag
    if (punchBag.classList.contains('show')) {
        punchBag.classList.remove('show');
    } else {
        punchBag.classList.add('show');
    }
    
    // Add button effect
    const button = document.getElementById('punchBtn');
    button.style.transform = 'scale(0.9)';
    setTimeout(() => {
        button.style.transform = '';
    }, 100);
}

// Handle breathe button click
function handleBreatheButtonClick() {
    const breathingCircle = document.getElementById('breathingCircle');
    const punchBag = document.getElementById('punchBag');
    const cooldownZone = document.getElementById('cooldownZone');
    
    // Hide other elements
    punchBag.classList.remove('show');
    cooldownZone.classList.remove('show');
    
    // Toggle breathing circle
    if (breathingCircle.classList.contains('show')) {
        breathingCircle.classList.remove('show');
        stopBreathing();
    } else {
        breathingCircle.classList.add('show');
        startGuidedBreathing();
    }
    
    // Add button effect
    const button = document.getElementById('breatheBtn');
    button.style.transform = 'scale(0.9)';
    setTimeout(() => {
        button.style.transform = '';
    }, 100);
}

// Handle cooldown button click
function handleCooldownButtonClick() {
    if (isCooldownMode) {
        exitCooldownMode();
    } else {
        enterCooldownMode();
    }
}

// Handle punch bag click
function handlePunchBagClick() {
    if (isCooldownMode) return;
    
    const punchBag = document.getElementById('punchBag');
    const punchImpact = document.getElementById('punchImpact');
    const punchCounter = document.getElementById('punchCounter');
    
    punchCount++;
    totalPunches++;
    
    // Update punch counter
    punchCounter.textContent = `Punches: ${punchCount}`;
    
    // Add punch impact animation
    punchImpact.classList.remove('hit');
    setTimeout(() => {
        punchImpact.classList.add('hit');
    }, 10);
    
    // Shake the punch bag
    punchBag.style.transform = 'rotate(-5deg)';
    setTimeout(() => {
        punchBag.style.transform = 'rotate(5deg)';
    }, 50);
    setTimeout(() => {
        punchBag.style.transform = 'rotate(0deg)';
    }, 100);
    
    // Create explosion effect
    createExplosionAt(punchBag.offsetLeft + 75, punchBag.offsetTop + 100);
    
    // Create fire sparks
    createMiniFireSparks();
    
    // Show breathing suggestion after 15+ punches
    if (punchCount >= 15 && punchCount % 5 === 0) {
        showBreathingSuggestion();
    }
    
    // Encourage message after several punches
    if (punchCount % 10 === 0) {
        showEncouragement();
    }
}

// Start guided breathing with countdown
function startGuidedBreathing() {
    const breathText = document.getElementById('breathText');
    const breathCounter = document.getElementById('breathCounter');
    const breathingCircle = document.getElementById('breathingCircle');
    
    isBreathing = true;
    breathingSessions++;
    
    // Add guided class for special styling
    breathingCircle.classList.add('guided');
    
    let phase = 'in'; // 'in', 'hold', 'out'
    let count = 4;
    
    breathingInterval = setInterval(() => {
        if (!isBreathing) return;
        
        breathCounter.textContent = count;
        
        if (phase === 'in') {
            breathText.textContent = 'Breathe In...';
            if (count <= 0) {
                phase = 'hold';
                count = 2;
            } else {
                count--;
            }
        } else if (phase === 'hold') {
            breathText.textContent = 'Hold...';
            if (count <= 0) {
                phase = 'out';
                count = 6;
            } else {
                count--;
            }
        } else if (phase === 'out') {
            breathText.textContent = 'Breathe Out...';
            if (count <= 0) {
                phase = 'in';
                count = 4;
            } else {
                count--;
            }
        }
    }, 1000);
}

// Stop breathing exercise
function stopBreathing() {
    isBreathing = false;
    const breathingCircle = document.getElementById('breathingCircle');
    breathingCircle.classList.remove('guided');
    
    if (breathingInterval) {
        clearInterval(breathingInterval);
    }
}

// Enter cooldown mode
function enterCooldownMode() {
    isCooldownMode = true;
    const body = document.body;
    const cooldownZone = document.getElementById('cooldownZone');
    const cooldownBtn = document.getElementById('cooldownBtn');
    const punchBag = document.getElementById('punchBag');
    const breathingCircle = document.getElementById('breathingCircle');
    
    // Visual changes
    body.classList.add('cooldown-mode');
    cooldownZone.classList.add('show');
    cooldownBtn.textContent = '🔥 Re-energize';
    
    // Hide other elements
    punchBag.classList.remove('show');
    breathingCircle.classList.remove('show');
    stopBreathing();
    
    // Apply cooldown styling to punch bag
    punchBag.classList.add('cooldown');
    
    // Start cooldown timer
    startCooldownTimer();
}

// Exit cooldown mode
function exitCooldownMode() {
    isCooldownMode = false;
    const body = document.body;
    const cooldownZone = document.getElementById('cooldownZone');
    const cooldownBtn = document.getElementById('cooldownBtn');
    const punchBag = document.getElementById('punchBag');
    
    // Visual changes
    body.classList.remove('cooldown-mode');
    cooldownZone.classList.remove('show');
    cooldownBtn.textContent = '❄️ Cool Down';
    
    // Reset punch bag styling
    punchBag.classList.remove('cooldown');
    
    // Stop cooldown timer
    if (cooldownTimer) {
        clearInterval(cooldownTimer);
    }
    
    // Reset some counters for fresh start
    punchCount = Math.floor(punchCount / 2); // Reduce but don't reset completely
}

// Start cooldown timer - REVISED: No pressure timer
function startCooldownTimer() {
    const cooldownTimerElement = document.getElementById('cooldownTimer');
    
    // Just set a supportive message instead of countdown
    cooldownTimerElement.textContent = 'Continue breathing exercises or step away when ready';
    
    // Optional: After some time, show additional supportive message
    setTimeout(() => {
        if (isCooldownMode) {
            cooldownTimerElement.textContent = 'Take as much time as you need - you\'re in control';
        }
    }, 30000); // After 30 seconds, show this supportive message
}

// Show breathing suggestion
function showBreathingSuggestion() {
    const suggestion = document.createElement('div');
    suggestion.textContent = 'Try some guided breathing to center yourself.';
    suggestion.style.cssText = `
        position: fixed;
        top: 30%;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(218, 165, 32, 0.95);
        color: white;
        padding: 15px 25px;
        border-radius: 20px;
        font-size: 1.1rem;
        font-weight: bold;
        z-index: 1001;
        box-shadow: 0 5px 20px rgba(0,0,0,0.3);
        animation: suggestionFade 3s ease-out forwards;
        cursor: pointer;
    `;
    
    // Add click to activate breathing
    suggestion.addEventListener('click', () => {
        handleBreatheButtonClick();
        suggestion.remove();
    });
    
    // Add animation keyframes if not exists
    if (!document.getElementById('suggestion-style')) {
        const style = document.createElement('style');
        style.id = 'suggestion-style';
        style.textContent = `
            @keyframes suggestionFade {
                0% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
                20% { opacity: 1; transform: translateX(-50%) translateY(0); }
                80% { opacity: 1; transform: translateX(-50%) translateY(0); }
                100% { opacity: 0; transform: translateX(-50%) translateY(20px); }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(suggestion);
    
    // Remove suggestion after animation
    setTimeout(() => {
        if (suggestion.parentNode) {
            suggestion.remove();
        }
    }, 3000);
}

// Handle mouse move for explosion effects (reduced frequency)
function handleMouseMove(e) {
    // Create explosion effect with 1% chance (reduced)
    if (!isCooldownMode && Math.random() < 0.01) {
        createExplosionAt(e.clientX, e.clientY);
    }
}

// Handle keyboard shortcuts
function handleKeyPress(e) {
    switch(e.key) {
        case ' ':
        case 'Enter':
            e.preventDefault();
            if (!isCooldownMode) handleReleaseButtonClick();
            break;
        case 'p':
        case 'P':
            if (!isCooldownMode) handlePunchButtonClick();
            break;
        case 'b':
        case 'B':
            handleBreatheButtonClick();
            break;
        case 'c':
        case 'C':
            handleCooldownButtonClick();
            break;
        case 'f':
        case 'F':
            if (!isCooldownMode) createFireSparks();
            break;
    }
}

// Check if lightning can be created (cooldown system)
function canCreateLightning() {
    if (isCooldownMode) return false;
    
    const now = Date.now();
    if (now - lastLightningTime > lightningCooldown) {
        lastLightningTime = now;
        return true;
    }
    return false;
}

// Create explosion effect at specific coordinates
function createExplosionAt(x, y) {
    const explosion = document.createElement('div');
    explosion.className = 'explosion';
    explosion.style.left = x + 'px';
    explosion.style.top = y + 'px';
    
    document.body.appendChild(explosion);
    
    // Remove explosion after animation
    setTimeout(() => {
        if (explosion.parentNode) {
            explosion.remove();
        }
    }, 1000);
}

// Create fire sparks animation
function createFireSparks() {
    const fireContainer = document.getElementById('fireContainer');
    const sparkCount = isCooldownMode ? 10 : 20; // Reduced sparks in cooldown
    
    for (let i = 0; i < sparkCount; i++) {
        setTimeout(() => {
            const spark = document.createElement('div');
            spark.className = 'spark';
            spark.style.left = Math.random() * 100 + 'vw';
            spark.style.animationDuration = (Math.random() * 2 + 1.5) + 's';
            spark.style.animationDelay = Math.random() * 2 + 's';
            
            fireContainer.appendChild(spark);
            
            // Remove spark after animation
            setTimeout(() => {
                if (spark.parentNode) {
                    spark.remove();
                }
            }, 4000);
        }, i * 100);
    }
}

// Create smaller fire sparks for interactions
function createMiniFireSparks() {
    const fireContainer = document.getElementById('fireContainer');
    const sparkCount = isCooldownMode ? 5 : 12;
    
    for (let i = 0; i < sparkCount; i++) {
        const spark = document.createElement('div');
        spark.className = 'spark';
        spark.style.left = (Math.random() * 60 + 20) + 'vw'; // More centered
        spark.style.animationDuration = (Math.random() * 1.5 + 1) + 's';
        spark.style.animationDelay = Math.random() * 0.5 + 's';
        
        fireContainer.appendChild(spark);
        
        // Remove mini spark after animation
        setTimeout(() => {
            if (spark.parentNode) {
                spark.remove();
            }
        }, 2500);
    }
}

// Create lightning effect
function createLightning() {
    const lightningContainer = document.getElementById('lightningContainer');
    const lightningCount = isCooldownMode ? 1 : 2; // Reduced lightning in cooldown
    
    for (let i = 0; i < lightningCount; i++) {
        setTimeout(() => {
            const lightning = document.createElement('div');
            lightning.className = 'lightning';
            lightning.style.left = Math.random() * 100 + 'vw';
            lightning.style.transform = `rotate(${Math.random() * 6 - 3}deg)`;
            
            lightningContainer.appendChild(lightning);
            
            // Remove lightning after animation
            setTimeout(() => {
                if (lightning.parentNode) {
                    lightning.remove();
                }
            }, 500);
        }, i * 150);
    }
}

// Show cooldown message when blocked buttons are clicked
function showCooldownMessage(message) {
    const cooldownMsg = document.createElement('div');
    cooldownMsg.textContent = message;
    cooldownMsg.style.cssText = `
        position: fixed;
        top: 25%;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(135, 206, 235, 0.95);
        color: white;
        padding: 15px 25px;
        border-radius: 20px;
        font-size: 1rem;
        font-weight: bold;
        z-index: 1001;
        box-shadow: 0 5px 20px rgba(0,0,0,0.3);
        animation: cooldownMessageFade 3s ease-out forwards;
        max-width: 300px;
        text-align: center;
        border: 2px solid rgba(176, 224, 230, 0.8);
    `;
    
    // Add cooldown message animation if not exists
    if (!document.getElementById('cooldown-message-style')) {
        const style = document.createElement('style');
        style.id = 'cooldown-message-style';
        style.textContent = `
            @keyframes cooldownMessageFade {
                0% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
                15% { opacity: 1; transform: translateX(-50%) translateY(0); }
                85% { opacity: 1; transform: translateX(-50%) translateY(0); }
                100% { opacity: 0; transform: translateX(-50%) translateY(20px); }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(cooldownMsg);
    
    // Remove message after animation
    setTimeout(() => {
        if (cooldownMsg.parentNode) {
            cooldownMsg.remove();
        }
    }, 3000);
}
function showEncouragement() {
    const messages = [
        "Let it all out!",
        "You're doing great! Keep going!",
        "Feel that energy leaving your body!",
        "Channel that energy!",
        "You're in control!"
    ];
    
    const message = messages[Math.floor(Math.random() * messages.length)];
    
    // Create temporary encouragement element
    const encouragement = document.createElement('div');
    encouragement.textContent = message;
    encouragement.style.cssText = `
        position: fixed;
        top: 20%;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(255, 69, 0, 0.9);
        color: white;
        padding: 15px 30px;
        border-radius: 25px;
        font-size: 1.2rem;
        font-weight: bold;
        z-index: 1000;
        box-shadow: 0 5px 20px rgba(0,0,0,0.3);
        animation: encourageAnimation 2s ease-out forwards;
    `;
    
    // Add encouragement animation keyframes to document
    if (!document.getElementById('encourage-style')) {
        const style = document.createElement('style');
        style.id = 'encourage-style';
        style.textContent = `
            @keyframes encourageAnimation {
                0% { opacity: 0; transform: translateX(-50%) scale(0.8); }
                20% { opacity: 1; transform: translateX(-50%) scale(1); }
                80% { opacity: 1; transform: translateX(-50%) scale(1); }
                100% { opacity: 0; transform: translateX(-50%) scale(0.8); }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(encouragement);
    
    // Remove encouragement after animation
    setTimeout(() => {
        if (encouragement.parentNode) {
            encouragement.remove();
        }
    }, 2000);
}

// PERBAIKAN: Fungsi baru untuk mendapatkan quote berurutan
function getNextAngerQuote() {
    currentQuoteIndex = (currentQuoteIndex + 1) % angerQuotes.length;
    return angerQuotes[currentQuoteIndex];
}

// PERBAIKAN: Fungsi baru untuk mendapatkan quote saat ini
function getCurrentAngerQuote() {
    return angerQuotes[currentQuoteIndex];
}

// PERBAIKAN: Fungsi baru untuk reset ke quote pertama
function resetToFirstAngerQuote() {
    currentQuoteIndex = 0;
    const quote = angerQuotes[currentQuoteIndex];
    
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
    // Remove old sparks
    const oldSparks = document.querySelectorAll('.spark');
    if (oldSparks.length > 30) { // Only cleanup if too many
        oldSparks.forEach((spark, index) => {
            if (index < oldSparks.length - 20 && spark.parentNode) {
                spark.remove();
            }
        });
    }
    
    // Remove old lightning
    const oldLightning = document.querySelectorAll('.lightning');
    oldLightning.forEach(lightning => {
        if (lightning.parentNode) {
            lightning.remove();
        }
    });
    
    // Remove old explosions
    const oldExplosions = document.querySelectorAll('.explosion');
    oldExplosions.forEach(explosion => {
        if (explosion.parentNode) {
            explosion.remove();
        }
    });
}

// Clean up effects every 30 seconds to prevent memory leaks
setInterval(cleanupEffects, 30000);

// Export functions for potential external use
window.AngerPage = {
    createFireSparks,
    createLightning,
    getNextAngerQuote,
    getCurrentAngerQuote,
    resetToFirstAngerQuote,
    handleReleaseButtonClick,
    handlePunchButtonClick,
    handleBreatheButtonClick,
    handleCooldownButtonClick,
    startGuidedBreathing,
    stopBreathing,
    enterCooldownMode,
    exitCooldownMode,
    // PERBAIKAN: Tambahan info tentang quote
    getCurrentQuoteIndex: () => currentQuoteIndex,
    getTotalQuotes: () => angerQuotes.length,
    getQuoteProgress: () => `${currentQuoteIndex + 1}/${angerQuotes.length}`
};

// Cleanup when page unloads
window.addEventListener('beforeunload', function() {
    if (breathingInterval) {
        clearInterval(breathingInterval);
    }
    if (cooldownTimer) {
        clearInterval(cooldownTimer);
    }
});