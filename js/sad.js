// Comfort Quotes Collection
const comfortQuotes = [
    {
        text: "Bintang-bintang tidak dapat bersinar tanpa kegelapan.",
        author: "D.H. Sidebottom"
    },
    {
        text: "Kamu lebih berani dari yang kamu percaya, lebih kuat dari yang kamu tampakkan, dan lebih dicintai dari yang kamu pikirkan.",
        author: "A.A. Milne"
    },
    {
        text: "Tidak ada yang lebih mulia daripada hati yang dapat menanggung penderitaan dengan tenang.",
        author: "Aristoteles"
    },
    {
        text: "Yang terdalam dari segala emosi adalah kesedihan, karena di dalamnya tersimpan kebijaksanaan.",
        author: "Socrates"
    },
    {
        text: "Dari penderitaan muncul jiwa-jiwa terkuat; karakter yang paling masif dipenuhi dengan luka.",
        author: "Khalil Gibran"
    },
    {
        text: "Hidup bukanlah tentang menunggu badai berlalu, tetapi belajar menari di tengah hujan.",
        author: "Vivian Greene"
    },
    {
        text: "Bahkan malam yang paling gelap akan berakhir dan matahari akan terbit.",
        author: "Victor Hugo"
    },
    {
        text: "Resiliensi bukanlah tentang tidak pernah jatuh, tetapi tentang bagaimana kita bangkit.",
        author: "Dr. Ann Masten"
    },
    {
        text: "Kamu tidak bisa kembali dan mengubah awal, tapi kamu bisa mulai dari sekarang dan mengubah akhir.",
        author: "C.S. Lewis"
    },
    {
        text: "Bunga yang mekar paling lambat sering kali yang paling indah.",
        author: "Matshona Dhliwayo"
    },
    {
        text: "Janganlah kamu bersikap lemah, dan janganlah pula kamu bersedih hati, padahal kamulah orang-orang yang paling tinggi (derajatnya), jika kamu orang-orang yang beriman.",
        author: "Qur'an, Ali Imran (3): 139"
    },
    {
        text: "Maka bersabarlah kamu, karena sesungguhnya janji Allah itu benar.",
        author: "Qur'an, Ar-Rum (30): 60"
    },
    {
        text: "Allah tidak membebani seseorang melainkan sesuai dengan kesanggupannya.",
        author: "Qur'an, Al-Baqarah (2): 286"
    },
    {
        text: "Tidaklah seorang muslim ditimpa gangguan berupa penyakit atau selainnya, melainkan Allah akan menggugurkan kesalahan-kesalahannya sebagaimana pohon menggugurkan daun-daunnya.",
        author: "HR. Bukhari Muslim"
    },
    {
        text: "Ketika kamu merasa cobaan atau musibah yang sedang kamu hadapi begitu berat. Ingatlah bahwa Allah tidak membebani seseorang melainkan sesuai dengan kesanggupannya; dan itu berarti Allah yakin padamu bahwa hanya kamulah orang kuat yang dapat mengahadapi cobaan tersebut.",
        author: "Me😊"
    },
    {
        text: "Jangan pernah menyalahkan dirimu sendiri atas apa yang menimpamu saat ini.",
        author: "Me😊"
    },
    {
        text: "Ketika orang lain berlaku buruk padamu, itu bukan salahmu, itu adalah salah mereka karena telah berlaku buruk.",
        author: "Me😊"
    },
    {
        text: "Kamu lebih berharga dari apa yang kamu pikirkan.",
        author: "Me😊"
    },
    {
        text: "Semua hal baik akan datang padamu di waktu yang tepat.",
        author: "Me😊"
    },
    {
        text: "Yang kamu butuhkan adalah seseorang yang selalu duduk bersamamu dalam kegelapan.",
        author: "Instagram's quote"
    },
    {
        text: "Kupu-kupu tidak tahu betapa indahnya dia sampai dia terbang.",
        author: "Instagram's quote"
    }
];

// PERBAIKAN: currentQuoteIndex dimulai dari -1 agar quote pertama dimulai dari index 0
let currentQuoteIndex = -1;
let hugCount = 0;
let supportToolsUsed = 0;
let hopeStepsClicked = [];
let isBreathing = false;
let breathingInterval;

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
    }, 800);
    
    // Start gentle rain animation
    createGentleRain();
    
    // Start comfort bubbles
    createComfortBubbles();
    
    // Set up recurring animations
    setInterval(() => createComfortBubbles(), 15000);
    setInterval(() => createGentleRain(), 18000);
}

// PERBAIKAN: Fungsi baru untuk menampilkan quote pertama
function displayInitialQuote() {
    currentQuoteIndex = 0; // Mulai dari quote pertama
    const quote = comfortQuotes[currentQuoteIndex];
    
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
    document.getElementById('comfortBtn').addEventListener('click', handleComfortButtonClick);
    document.getElementById('hugBtn').addEventListener('click', handleHugButtonClick);
    document.getElementById('supportBtn').addEventListener('click', handleSupportButtonClick);
    document.getElementById('hopeBtn').addEventListener('click', handleHopeButtonClick);
    
    // Hug circle click
    document.getElementById('hugZone').addEventListener('click', handleHugCircleClick);
    
    // Support tool clicks
    document.getElementById('breatheTool').addEventListener('click', () => handleToolClick('breathe'));
    document.getElementById('journalTool').addEventListener('click', () => handleToolClick('journal'));
    document.getElementById('musicTool').addEventListener('click', () => handleToolClick('music'));
    document.getElementById('natureTool').addEventListener('click', () => handleToolClick('nature'));
    
    // Hope step clicks
    const hopeSteps = document.querySelectorAll('.hope-step');
    hopeSteps.forEach(step => {
        step.addEventListener('click', handleHopeStepClick);
    });
    
    // Breathing controls
    document.getElementById('startBreathBtn').addEventListener('click', startBreathingExercise);
    document.getElementById('stopBreathBtn').addEventListener('click', stopBreathingExercise);
    
    // Mouse move sparkle effect (very subtle)
    document.addEventListener('mousemove', handleMouseMove);
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyPress);
}

// PERBAIKAN: Handle comfort button click - sekarang berurutan
function handleComfortButtonClick() {
    const quoteContainer = document.getElementById('quoteContainer');
    const quoteText = document.getElementById('quoteText');
    const quoteAuthor = document.getElementById('quoteAuthor');
    
    // Add gentle click animation to button
    const button = document.getElementById('comfortBtn');
    button.style.transform = 'scale(0.98)';
    setTimeout(() => {
        button.style.transform = '';
    }, 200);
    
    // Hide current quote with fade out animation
    quoteContainer.classList.remove('show');
    
    setTimeout(() => {
        // PERBAIKAN: Ambil quote berikutnya secara berurutan
        currentQuoteIndex = (currentQuoteIndex + 1) % comfortQuotes.length;
        const quote = comfortQuotes[currentQuoteIndex];
        
        // Update quote content
        quoteText.textContent = `"${quote.text}"`;
        quoteAuthor.textContent = `- ${quote.author}`;
        
        // Show new quote with fade in animation
        quoteContainer.classList.add('show');
        
        // PERBAIKAN: Tampilkan indikator posisi quote (opsional)
        console.log(`Comfort Quote ${currentQuoteIndex + 1} dari ${comfortQuotes.length}`);
        
        // Create gentle effects
        setTimeout(createMiniComfortBubbles, 300);
    }, 400);
}

// Handle hug button click
function handleHugButtonClick() {
    const hugZone = document.getElementById('hugZone');
    const supportTools = document.getElementById('supportTools');
    const hopeActivities = document.getElementById('hopeActivities');
    const breathingExercise = document.getElementById('breathingExercise');
    
    // Hide other zones
    supportTools.classList.remove('show');
    hopeActivities.classList.remove('show');
    breathingExercise.classList.remove('show');
    stopBreathingExercise();
    
    // Toggle hug zone
    if (hugZone.classList.contains('show')) {
        hugZone.classList.remove('show');
    } else {
        hugZone.classList.add('show');
    }
    
    // Add button effect
    const button = document.getElementById('hugBtn');
    button.style.transform = 'scale(0.98)';
    setTimeout(() => {
        button.style.transform = '';
    }, 200);
}

// Handle support button click
function handleSupportButtonClick() {
    const supportTools = document.getElementById('supportTools');
    const hugZone = document.getElementById('hugZone');
    const hopeActivities = document.getElementById('hopeActivities');
    const breathingExercise = document.getElementById('breathingExercise');
    
    // Hide other zones
    hugZone.classList.remove('show');
    hopeActivities.classList.remove('show');
    breathingExercise.classList.remove('show');
    stopBreathingExercise();
    
    // Toggle support tools
    if (supportTools.classList.contains('show')) {
        supportTools.classList.remove('show');
    } else {
        supportTools.classList.add('show');
    }
    
    // Add button effect
    const button = document.getElementById('supportBtn');
    button.style.transform = 'scale(0.98)';
    setTimeout(() => {
        button.style.transform = '';
    }, 200);
}

// Handle hope button click
function handleHopeButtonClick() {
    const hopeActivities = document.getElementById('hopeActivities');
    const hugZone = document.getElementById('hugZone');
    const supportTools = document.getElementById('supportTools');
    const breathingExercise = document.getElementById('breathingExercise');
    
    // Hide other zones
    hugZone.classList.remove('show');
    supportTools.classList.remove('show');
    breathingExercise.classList.remove('show');
    stopBreathingExercise();
    
    // Toggle hope activities
    if (hopeActivities.classList.contains('show')) {
        hopeActivities.classList.remove('show');
    } else {
        hopeActivities.classList.add('show');
    }
    
    // Add button effect
    const button = document.getElementById('hopeBtn');
    button.style.transform = 'scale(0.98)';
    setTimeout(() => {
        button.style.transform = '';
    }, 200);
}

// Handle hug circle click
function handleHugCircleClick() {
    hugCount++;
    
    const hugCounter = document.getElementById('hugCounter');
    hugCounter.textContent = `Hugs received: ${hugCount}`;
    
    // Create heart effect
    createHeartEffect(document.getElementById('hugZone'));
    
    // Create warm glow
    createWarmGlow();
    
    // Show encouraging message
    showHugMessage();
}

// Handle tool clicks
function handleToolClick(toolType) {
    supportToolsUsed++;
    
    const tools = {
        breathe: {
            message: 'Opening breathing exercise...',
            action: () => {
                document.getElementById('supportTools').classList.remove('show');
                document.getElementById('breathingExercise').classList.add('show');
            }
        },
        journal: {
            message: 'Remember: Writing down your feelings can help process them.',
            action: () => createComfortBubbles()
        },
        music: {
            message: 'Imagine your favorite calming song playing softly...',
            action: () => createGentleSparkles()
        },
        nature: {
            message: 'Close your eyes and imagine a peaceful forest or beach...',
            action: () => createNatureVisualization()
        }
    };
    
    const selectedTool = tools[toolType];
    showToolMessage(selectedTool.message);
    selectedTool.action();
}

// Handle hope step clicks
function handleHopeStepClick(e) {
    const stepData = e.currentTarget.dataset.step;
    const allSteps = document.querySelectorAll('.hope-step');
    const hopeMessage = document.getElementById('hopeMessage');
    
    // Remove selected class from all steps
    allSteps.forEach(step => step.classList.remove('selected'));
    
    // Add selected class to clicked step
    e.currentTarget.classList.add('selected');
    
    // Track hope steps
    if (!hopeStepsClicked.includes(stepData)) {
        hopeStepsClicked.push(stepData);
    }
    
    const hopeMessages = {
        support: "I will not let anyone hurt you",
        tomorrow: "Each sunrise brings new possibilities and fresh hope.",
        strength: "You've overcome challenges before - that strength is still within you.",
        growth: "Difficult times often lead to the most meaningful personal growth.",
        moments: "Joy will find its way back to you, often in the smallest moments."
    };
    
    hopeMessage.textContent = hopeMessages[stepData];
    
    // Create gentle sparkle effect
    setTimeout(() => {
        createSparkleEffect(
            e.currentTarget.offsetLeft + e.currentTarget.offsetWidth / 2,
            e.currentTarget.offsetTop + e.currentTarget.offsetHeight / 2
        );
    }, 100);
}

// Start breathing exercise
function startBreathingExercise() {
    const breathingCircle = document.getElementById('breathingCircle');
    const breathText = document.getElementById('breathText');
    const breathCount = document.getElementById('breathCount');
    
    isBreathing = true;
    breathingCircle.classList.add('breathing');
    
    let phase = 'in'; // 'in', 'hold', 'out'
    let count = 4;
    
    breathingInterval = setInterval(() => {
        if (!isBreathing) return;
        
        breathCount.textContent = count;
        
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
function stopBreathingExercise() {
    isBreathing = false;
    const breathingCircle = document.getElementById('breathingCircle');
    breathingCircle.classList.remove('breathing');
    
    if (breathingInterval) {
        clearInterval(breathingInterval);
    }
}

// Show hug message
function showHugMessage() {
    const messages = [
        "You deserve all the comfort in the world.",
        "Sending you warmth and understanding.",
        "You are worthy of love and care.",
        "This hug is filled with hope for you.",
        "You are not alone in this journey."
    ];
    
    const message = messages[Math.floor(Math.random() * messages.length)];
    showMessage(message, '#DDA0DD');
}

// Show tool message
function showToolMessage(message) {
    showMessage(message, '#98FB98');
}

// Generic message display
function showMessage(message, backgroundColor) {
    const messageEl = document.createElement('div');
    messageEl.textContent = message;
    messageEl.style.cssText = `
        position: fixed;
        top: 30%;
        left: 50%;
        transform: translateX(-50%);
        background: ${backgroundColor};
        color: white;
        padding: 15px 25px;
        border-radius: 20px;
        font-size: 1rem;
        font-weight: bold;
        z-index: 1001;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        animation: messageFloat 3s ease-out forwards;
        max-width: 300px;
        text-align: center;
    `;
    
    // Add message animation if not exists
    if (!document.getElementById('message-style')) {
        const style = document.createElement('style');
        style.id = 'message-style';
        style.textContent = `
            @keyframes messageFloat {
                0% { opacity: 0; transform: translateX(-50%) translateY(-10px); }
                15% { opacity: 1; transform: translateX(-50%) translateY(0); }
                85% { opacity: 1; transform: translateX(-50%) translateY(0); }
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
    }, 3000);
}

// Handle mouse move for gentle sparkle effects
function handleMouseMove(e) {
    // Create gentle sparkle effect with 1.5% chance (very reduced)
    if (Math.random() < 0.015) {
        createSparkleEffect(e.clientX, e.clientY);
    }
}

// Handle keyboard shortcuts
function handleKeyPress(e) {
    switch(e.key) {
        case ' ':
        case 'Enter':
            e.preventDefault();
            handleComfortButtonClick();
            break;
        case 'h':
        case 'H':
            handleHugButtonClick();
            break;
        case 's':
        case 'S':
            handleSupportButtonClick();
            break;
        case 'o':
        case 'O':
            handleHopeButtonClick();
            break;
        case 'b':
        case 'B':
            if (isBreathing) {
                stopBreathingExercise();
            } else {
                startBreathingExercise();
            }
            break;
    }
}

// Create heart effect around element
function createHeartEffect(container) {
    const heartEmojis = ['💙', '💚', '🤍', '💜', '🧡'];
    
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
            heart.className = 'heart';
            
            // Random positioning around the container
            const angle = (i / 3) * 2 * Math.PI;
            const radius = 20;
            heart.style.left = (radius * Math.cos(angle) + 100) + 'px';
            heart.style.top = (radius * Math.sin(angle) + 100) + 'px';
            
            container.appendChild(heart);
            
            // Remove heart after animation
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.remove();
                }
            }, 3000);
        }, i * 300);
    }
}

// Create warm glow effect
function createWarmGlow() {
    const glow = document.createElement('div');
    glow.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        width: 300px;
        height: 300px;
        background: radial-gradient(circle, rgba(221, 160, 221, 0.3), transparent);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
        z-index: 1;
        animation: warmGlowPulse 3s ease-out forwards;
    `;
    
    // Add glow animation if not exists
    if (!document.getElementById('glow-style')) {
        const style = document.createElement('style');
        style.id = 'glow-style';
        style.textContent = `
            @keyframes warmGlowPulse {
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
    }, 3000);
}

// Create gentle sparkles
function createGentleSparkles() {
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            createSparkleEffect(
                Math.random() * window.innerWidth,
                Math.random() * window.innerHeight * 0.7
            );
        }, i * 200);
    }
}

// Create nature visualization effect
function createNatureVisualization() {
    const visualization = document.createElement('div');
    visualization.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to bottom, rgba(135, 206, 250, 0.2), rgba(152, 251, 152, 0.2));
        pointer-events: none;
        z-index: 1;
        animation: natureVisualization 4s ease-in-out forwards;
    `;
    
    // Add visualization animation if not exists
    if (!document.getElementById('nature-style')) {
        const style = document.createElement('style');
        style.id = 'nature-style';
        style.textContent = `
            @keyframes natureVisualization {
                0% { opacity: 0; }
                30% { opacity: 0.8; }
                70% { opacity: 0.8; }
                100% { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(visualization);
    
    // Remove visualization after animation
    setTimeout(() => {
        if (visualization.parentNode) {
            visualization.remove();
        }
    }, 4000);
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
    }, 2000);
}

// Create gentle rain drops
function createGentleRain() {
    const rainContainer = document.getElementById('rainContainer');
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const drop = document.createElement('div');
            drop.className = 'drop';
            drop.style.left = Math.random() * 100 + 'vw';
            drop.style.animationDuration = (Math.random() * 1 + 1.2) + 's';
            drop.style.animationDelay = Math.random() * 3 + 's';
            
            rainContainer.appendChild(drop);
            
            // Remove drop after animation
            setTimeout(() => {
                if (drop.parentNode) {
                    drop.remove();
                }
            }, 5000);
        }, i * 150);
    }
}

// Create comfort bubbles animation
function createComfortBubbles() {
    const comfortContainer = document.getElementById('comfortContainer');
    
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const bubble = document.createElement('div');
            bubble.className = 'comfort-bubble';
            
            const size = Math.random() * 15 + 8;
            bubble.style.width = size + 'px';
            bubble.style.height = size + 'px';
            bubble.style.left = Math.random() * 100 + 'vw';
            bubble.style.animationDuration = (Math.random() * 4 + 8) + 's';
            bubble.style.animationDelay = Math.random() * 4 + 's';
            
            comfortContainer.appendChild(bubble);
            
            // Remove bubble after animation
            setTimeout(() => {
                if (bubble.parentNode) {
                    bubble.remove();
                }
            }, 12000);
        }, i * 400);
    }
}

// Create smaller comfort bubbles for interactions
function createMiniComfortBubbles() {
    const comfortContainer = document.getElementById('comfortContainer');
    
    for (let i = 0; i < 6; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'comfort-bubble';
        
        const size = Math.random() * 12 + 6;
        bubble.style.width = size + 'px';
        bubble.style.height = size + 'px';
        bubble.style.left = (Math.random() * 60 + 20) + 'vw';
        bubble.style.animationDuration = (Math.random() * 3 + 5) + 's';
        bubble.style.animationDelay = Math.random() * 1.5 + 's';
        
        comfortContainer.appendChild(bubble);
        
        // Remove mini bubble after animation
        setTimeout(() => {
            if (bubble.parentNode) {
                bubble.remove();
            }
        }, 8000);
    }
}

// PERBAIKAN: Fungsi baru untuk mendapatkan quote berurutan
function getNextComfortQuote() {
    currentQuoteIndex = (currentQuoteIndex + 1) % comfortQuotes.length;
    return comfortQuotes[currentQuoteIndex];
}

// PERBAIKAN: Fungsi baru untuk mendapatkan quote saat ini
function getCurrentComfortQuote() {
    return comfortQuotes[currentQuoteIndex];
}

// PERBAIKAN: Fungsi baru untuk reset ke quote pertama
function resetToFirstComfortQuote() {
    currentQuoteIndex = 0;
    const quote = comfortQuotes[currentQuoteIndex];
    
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
    // Remove old bubbles (keep only recent ones)
    const oldBubbles = document.querySelectorAll('.comfort-bubble');
    if (oldBubbles.length > 15) {
        oldBubbles.forEach((bubble, index) => {
            if (index < oldBubbles.length - 10 && bubble.parentNode) {
                bubble.remove();
            }
        });
    }
    
    // Remove old rain drops
    const oldDrops = document.querySelectorAll('.drop');
    if (oldDrops.length > 25) {
        oldDrops.forEach((drop, index) => {
            if (index < oldDrops.length - 15 && drop.parentNode) {
                drop.remove();
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
}

// Clean up effects every 50 seconds to prevent memory leaks
setInterval(cleanupEffects, 50000);

// Export functions for potential external use
window.ComfortPage = {
    createComfortBubbles,
    createGentleRain,
    getNextComfortQuote,
    getCurrentComfortQuote,
    resetToFirstComfortQuote,
    handleComfortButtonClick,
    startBreathingExercise,
    stopBreathingExercise,
    // PERBAIKAN: Tambahan info tentang quote
    getCurrentQuoteIndex: () => currentQuoteIndex,
    getTotalQuotes: () => comfortQuotes.length,
    getQuoteProgress: () => `${currentQuoteIndex + 1}/${comfortQuotes.length}`
};

// Cleanup when page unloads
window.addEventListener('beforeunload', function() {
    if (breathingInterval) {
        clearInterval(breathingInterval);
    }
});

