// Rest and Recovery Quotes Collection
const restQuotes = [
    {
        text: "Kamu tidak perlu membuktikan dirimu kepada siapa pun. Kamu sudah lebih dari cukup.",
        author: "Maya Angelou"
    },
    {
        text: "Terkadang hal paling revolusioner yang dapat kamu lakukan adalah beristirahat.",
        author: "Nap Ministry"
    },
    {
        text: "Istirahat bukan berarti tidak melakukan apa-apa. Istirahat adalah memperbaiki diri.",
        author: "Daniel W. Josselyn"
    },
    {
        text: "Alam memiliki ritme istirahat dan aktivitas. Manusia bijak mengikuti ritme ini.",
        author: "Seneca"
    },
    {
        text: "Hidup seperti naik sepeda. Untuk menjaga keseimbangan, kamu harus terus bergerak. Tapi terkadang, kamu juga perlu berhenti untuk tidak jatuh.",
        author: "Albert Einstein (adaptasi)"
    },
    {
        text: "Mengabaikan kelelahan adalah bentuk ketidakadilan terhadap diri sendiri.",
        author: "John Stuart Mill"
    },
    {
        text: "Mengakui bahwa kamu perlu bantuan bukanlah kegagalan, itu adalah keberanian.",
        author: "Barack Obama"
    },
    {
        text: "Seperti busur yang selalu ditarik akan patah, manusia yang tidak pernah beristirahat akan hancur.",
        author: "Confucius"
    },
    {
        text: "Otak yang kelelahan tidak dapat berfungsi optimal. Istirahat adalah kebutuhan biologis, bukan kemewahan.",
        author: "Dr. Matthew Walker"
    },
    {
        text: "Dari perspektif evolusi, kemampuan merasakan kelelahan adalah adaptasi survival yang penting.",
        author: "Dr. Randolph Nesse"
    },
    {
        text: "Dan Kami jadikan tidurmu untuk istirahat. Dan Kami jadikan malam sebagai pakaian (penutup). Dan Kami jadikan siang untuk mencari penghidupan.",
        author: "Qur’an, An-Naba (75): 9-11"
    },
    {
        text: "Allah tidak membebani seseorang melainkan sesuai dengan kesanggupannya.",
        author: "Qur’an, Al-Baqarah (2): 286"
    },
    {
        text: "Ketika kamu merasa cobaan atau musibah yang sedang kamu hadapi begitu berat. Ingatlah bahwa Allah tidak membebani seseorang melainkan sesuai dengan kesanggupannya. Itu berarti Allah yakin padamu bahwa hanya kamulah orang kuat yang dapat mengahadapi cobaan tersebut.",
        author: "Me 😊"
    },
    {
        text: "Terima kasih karena tidak pernah menyerah hingga sampai di titik ini. Kamu hebat.",
        author: "Me 😊"
    },
    {
        text: "Bangga rasanya melihatmu bertahan, berjuang, dan tetap melangkah hingga sejauh ini.",
        author: "Me 😊"
    },
    {
        text: "Kelelahan bukanlah tanda kegagalan. Itu adalah tanda bahwa kamu telah melakukan yang terbaik.",
        author: "Instagram’s quote"
    }
];

// Global variables
let currentQuoteIndex = -1;
let isNightMode = false;
let currentAudio = null; // FIXED: Single audio system
let energyLevel = 25;
let reminderInterval;

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    setupEventListeners();
    setupAudioSystem(); // FIXED: Separate audio setup
});

// Initialize page elements and animations
function initializePage() {
    displayInitialQuote();
    
    setTimeout(() => {
        document.getElementById('quoteContainer').classList.add('show');
    }, 1000);
    
    createStars();
    createClouds();
    createSoftGlows();
    startGentleReminders();
    updateEnergyMeter();
}

// Display initial quote
function displayInitialQuote() {
    currentQuoteIndex = 0;
    const quote = restQuotes[currentQuoteIndex];
    
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
    document.getElementById('restBtn').addEventListener('click', handleRestButtonClick);
    document.getElementById('relaxBtn').addEventListener('click', handleRelaxButtonClick);
    document.getElementById('energyBtn').addEventListener('click', handleEnergyButtonClick);
    document.getElementById('sleepBtn').addEventListener('click', handleSleepButtonClick);
    
    // Night mode toggle
    document.getElementById('nightModeToggle').addEventListener('click', toggleNightMode);
    
    // Cozy chair click
    document.getElementById('relaxationZone').addEventListener('click', handleChairClick);
    
    // Mouse move effects
    document.addEventListener('mousemove', handleMouseMove);
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyPress);
}

// FIXED: Separate audio system setup
function setupAudioSystem() {
    console.log('Setting up audio system...');
    
    const soundButtons = document.querySelectorAll('.sound-btn');
    console.log(`Found ${soundButtons.length} sound buttons`);
    
    soundButtons.forEach(btn => {
        const soundType = btn.getAttribute('data-sound');
        console.log(`Setting up button: ${soundType}`);
        
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log(`Button clicked: ${soundType}`);
            
            if (soundType === 'stop') {
                stopAudio();
            } else {
                playAudio(soundType);
            }
        });
    });
    
    // Test file accessibility
    const testPaths = [
        'music/Rain Sounds.mp3',
        'music/Ocean Sounds.mp3', 
        'music/Forest Sounds.mp3'
    ];
    
    testPaths.forEach(path => {
        fetch(path)
            .then(response => {
                if (response.ok) {
                    console.log('✅ File accessible:', path);
                } else {
                    console.log('❌ File not accessible:', path, response.status);
                }
            })
            .catch(error => {
                console.log('❌ File test failed:', path, error);
            });
    });
}

// FIXED: Single audio system
function playAudio(soundType) {
    console.log('Playing:', soundType);
    
    // Stop current audio if playing
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null; // Clear reference
    }
    
    // Path to audio file
    let audioPath = '';
    switch(soundType) {
        case 'rain':
            audioPath = 'music/Rain Sounds.mp3';
            break;
        case 'ocean':
            audioPath = 'music/Ocean Sounds.mp3';
            break;
        case 'forest':
            audioPath = 'music/Forest Sounds.mp3';
            break;
        default:
            console.error('Unknown sound type:', soundType);
            return;
    }
    
    // Create new audio object
    currentAudio = new Audio(audioPath);
    currentAudio.loop = true;
    currentAudio.volume = 0.5;
    
    // Add small delay to ensure previous audio is fully stopped
    setTimeout(() => {
        if (currentAudio) {
            currentAudio.play()
                .then(() => {
                    console.log('Successfully playing:', soundType);
                    updateSoundIndicator(soundType + ' is playing');
                    highlightSoundButton(soundType);
                })
                .catch(error => {
                    console.error('Error playing audio:', error);
                    console.log('Trying alternative approach...');
                    // Try loading first
                    currentAudio.load();
                    setTimeout(() => {
                        currentAudio.play().catch(e => {
                            alert('Cannot play ' + soundType + ': ' + e.message);
                        });
                    }, 100);
                });
        }
    }, 100);
}

// FIXED: Single stop function
function stopAudio() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null;
        console.log('Audio stopped');
        updateSoundIndicator('🔇 Silent');
        highlightSoundButton(null);
    }
}

// FIXED: Clear sound indicator function
function updateSoundIndicator(text) {
    const indicator = document.getElementById('soundIndicator');
    if (indicator) {
        indicator.textContent = text;
    }
}

// FIXED: Clear button highlight function with original colors
function highlightSoundButton(activeType) {
    const buttons = document.querySelectorAll('.sound-btn');
    buttons.forEach(btn => {
        const btnType = btn.getAttribute('data-sound');
        if (btnType === activeType) {
            // Keep original color but add glow and scale effect
            btn.style.boxShadow = '0 0 15px rgba(255, 255, 255, 0.6)';
            btn.style.transform = 'scale(0.95)';
            btn.style.opacity = '1';
            btn.classList.add('active');
        } else {
            // Reset to default style
            btn.style.boxShadow = '';
            btn.style.transform = 'scale(1)';
            btn.style.opacity = '0.8';
            btn.classList.remove('active');
        }
    });
}

// Handle rest button click
function handleRestButtonClick() {
    const quoteContainer = document.getElementById('quoteContainer');
    const quoteText = document.getElementById('quoteText');
    const quoteAuthor = document.getElementById('quoteAuthor');
    
    const button = document.getElementById('restBtn');
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = '';
    }, 200);
    
    quoteContainer.classList.remove('show');
    
    setTimeout(() => {
        currentQuoteIndex = (currentQuoteIndex + 1) % restQuotes.length;
        const quote = restQuotes[currentQuoteIndex];
        
        quoteText.textContent = `"${quote.text}"`;
        quoteAuthor.textContent = `- ${quote.author}`;
        
        quoteContainer.classList.add('show');
        
        setTimeout(createSoftGlows, 300);
    }, 400);
}

// Handle relax button click
function handleRelaxButtonClick() {
    const relaxationZone = document.getElementById('relaxationZone');
    const energyMeter = document.getElementById('energyMeter');
    const sleepSounds = document.getElementById('sleepSounds');
    
    energyMeter.classList.remove('show');
    sleepSounds.classList.remove('show');
    
    if (relaxationZone.classList.contains('show')) {
        relaxationZone.classList.remove('show');
    } else {
        relaxationZone.classList.add('show');
    }
    
    const button = document.getElementById('relaxBtn');
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = '';
    }, 200);
}

// Handle energy button click
function handleEnergyButtonClick() {
    const energyMeter = document.getElementById('energyMeter');
    const relaxationZone = document.getElementById('relaxationZone');
    const sleepSounds = document.getElementById('sleepSounds');
    
    relaxationZone.classList.remove('show');
    sleepSounds.classList.remove('show');
    
    if (energyMeter.classList.contains('show')) {
        energyMeter.classList.remove('show');
    } else {
        energyMeter.classList.add('show');
        setTimeout(() => {
            energyLevel = Math.min(energyLevel + 15, 100);
            updateEnergyMeter();
        }, 500);
    }
    
    const button = document.getElementById('energyBtn');
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = '';
    }, 200);
}

// Handle sleep button click
function handleSleepButtonClick() {
    const sleepSounds = document.getElementById('sleepSounds');
    const relaxationZone = document.getElementById('relaxationZone');
    const energyMeter = document.getElementById('energyMeter');
    
    relaxationZone.classList.remove('show');
    energyMeter.classList.remove('show');
    
    if (sleepSounds.classList.contains('show')) {
        sleepSounds.classList.remove('show');
    } else {
        sleepSounds.classList.add('show');
    }
    
    const button = document.getElementById('sleepBtn');
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = '';
    }, 200);
}

// Toggle night mode
function toggleNightMode() {
    const body = document.body;
    const toggle = document.getElementById('nightModeToggle');
    
    isNightMode = !isNightMode;
    
    if (isNightMode) {
        body.classList.add('night-mode');
        toggle.textContent = '☀️';
        createStars();
    } else {
        body.classList.remove('night-mode');
        toggle.textContent = '🌙';
    }
    
    toggle.style.transform = 'rotate(180deg)';
    setTimeout(() => {
        toggle.style.transform = '';
    }, 300);
}

// Handle chair click for relaxation
function handleChairClick() {
    const chair = document.querySelector('.cozy-chair');
    const chairText = document.querySelector('.chair-text');
    
    const originalText = chairText.textContent;
    chairText.textContent = '😌 Ahh... so peaceful';
    
    chair.style.transform = 'scale(0.98)';
    setTimeout(() => {
        chair.style.transform = '';
    }, 200);
    
    setTimeout(() => {
        chairText.textContent = originalText;
    }, 2000);
    
    energyLevel = Math.min(energyLevel + 5, 100);
    updateEnergyMeter();
    
    createSoftGlows();
}

// Handle gentle mouse move effects
function handleMouseMove(e) {
    if (Math.random() < 0.01) {
        createSoftGlowAt(e.clientX, e.clientY);
    }
}

// Handle keyboard shortcuts
function handleKeyPress(e) {
    switch(e.key) {
        case ' ':
        case 'Enter':
            e.preventDefault();
            handleRestButtonClick();
            break;
        case 'r':
        case 'R':
            handleRelaxButtonClick();
            break;
        case 'e':
        case 'E':
            handleEnergyButtonClick();
            break;
        case 's':
        case 'S':
            handleSleepButtonClick();
            break;
        case 'n':
        case 'N':
            toggleNightMode();
            break;
    }
}

// Update energy meter
function updateEnergyMeter() {
    const meterFill = document.getElementById('meterFill');
    const meterText = document.getElementById('meterText');
    
    if (meterFill) {
        meterFill.style.width = energyLevel + '%';
        
        if (energyLevel < 30) {
            meterText.textContent = 'Very Low - Rest Required';
            meterText.style.color = '#FF6B6B';
        } else if (energyLevel < 50) {
            meterText.textContent = 'Low - Take a Break';
            meterText.style.color = '#FFD93D';
        } else if (energyLevel < 80) {
            meterText.textContent = 'Moderate - Doing Better';
            meterText.style.color = '#6BCF7F';
        } else {
            meterText.textContent = 'Good - Well Rested!';
            meterText.style.color = '#4ECDC4';
        }
    }
}

// Create stars for night mode
function createStars() {
    const starsContainer = document.getElementById('starsContainer');
    starsContainer.innerHTML = '';
    
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + 'vw';
        star.style.top = Math.random() * 100 + 'vh';
        star.style.animationDelay = Math.random() * 3 + 's';
        
        starsContainer.appendChild(star);
    }
}

// Create floating clouds
function createClouds() {
    const cloudsContainer = document.getElementById('cloudsContainer');
    let activeCloudCount = 0;
    const maxClouds = 3; // Batasi jumlah awan
    
    setInterval(() => {
        // Skip jika sudah terlalu banyak awan
        if (activeCloudCount >= maxClouds) return;
        
        const cloud = document.createElement('div');
        cloud.className = 'cloud';
        cloud.style.top = Math.random() * 40 + '%';
        cloud.style.left = '-100px';
        
        // PERBAIKAN UTAMA: Simpan durasi animasi
        const animationDuration = Math.random() * 20 + 15;
        cloud.style.animationDuration = animationDuration + 's';
        
        cloudsContainer.appendChild(cloud);
        activeCloudCount++;
        
        // PERBAIKAN UTAMA: Timeout sesuai dengan durasi animasi
        setTimeout(() => {
            if (cloud.parentNode) {
                cloud.remove();
                activeCloudCount--; // Kurangi counter
            }
        }, (animationDuration + 1) * 1000); // +1 detik buffer
        
    }, 8000);
}

// Create soft glow effects
function createSoftGlows() {
    const effectsContainer = document.getElementById('effectsContainer');
    
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const glow = document.createElement('div');
            glow.className = 'soft-glow';
            
            const size = Math.random() * 100 + 50;
            glow.style.width = size + 'px';
            glow.style.height = size + 'px';
            glow.style.left = Math.random() * 100 + 'vw';
            glow.style.top = Math.random() * 100 + 'vh';
            glow.style.animationDuration = (Math.random() * 3 + 4) + 's';
            
            effectsContainer.appendChild(glow);
            
            setTimeout(() => {
                if (glow.parentNode) {
                    glow.remove();
                }
            }, 7000);
        }, i * 500);
    }
}

// Create soft glow at specific position
function createSoftGlowAt(x, y) {
    const glow = document.createElement('div');
    glow.className = 'soft-glow';
    
    const size = Math.random() * 30 + 20;
    glow.style.width = size + 'px';
    glow.style.height = size + 'px';
    glow.style.left = x + 'px';
    glow.style.top = y + 'px';
    glow.style.animationDuration = '2s';
    
    document.body.appendChild(glow);
    
    setTimeout(() => {
        if (glow.parentNode) {
            glow.remove();
        }
    }, 2000);
}

// Start gentle reminders
function startGentleReminders() {
    const reminders = [
        "💝 Remember: It's okay to rest",
        "🌟 You're doing great, take it easy",
        "💤 Your wellbeing matters most",
        "🤗 Be kind to yourself today",
        "🌸 Rest is productive too",
        "💙 You deserve to feel peaceful",
        "🦋 Small steps are still progress"
    ];
    
    reminderInterval = setInterval(() => {
        showGentleReminder(reminders[Math.floor(Math.random() * reminders.length)]);
    }, 45000);
}

// Show gentle reminder
function showGentleReminder(message) {
    const gentleReminder = document.getElementById('gentleReminder');
    const reminderText = document.querySelector('.reminder-text');
    
    reminderText.textContent = message;
    gentleReminder.classList.add('show');
    
    setTimeout(() => {
        gentleReminder.classList.remove('show');
    }, 4000);
}

// Utility functions
function cleanupEffects() {
    const oldGlows = document.querySelectorAll('.soft-glow');
    oldGlows.forEach(glow => {
        if (glow.parentNode) {
            glow.remove();
        }
    });
    
    const oldClouds = document.querySelectorAll('.cloud');
    if (oldClouds.length > 5) {
        oldClouds.forEach((cloud, index) => {
            if (index < oldClouds.length - 5 && cloud.parentNode) {
                cloud.remove();
            }
        });
    }
}

// Cleanup intervals
setInterval(cleanupEffects, 45000);

setInterval(() => {
    if (energyLevel > 0) {
        energyLevel = Math.max(energyLevel - 1, 0);
        updateEnergyMeter();
    }
}, 60000);

// Global functions for debugging
window.testAudio = function() {
    console.log('Testing rain audio...');
    playAudio('rain');
};

window.playAudio = playAudio;
window.stopAudio = stopAudio;

// Cleanup on page unload
window.addEventListener('beforeunload', function() {
    if (currentAudio) {
        currentAudio.pause();
    }
    if (reminderInterval) {
        clearInterval(reminderInterval);
    }
});