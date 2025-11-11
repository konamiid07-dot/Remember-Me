
onload = () => {
  const c = setTimeout(() => {
    document.body.classList.remove("not-loaded");

    const titles = ('Stay healthy and keep smiling😊').split('')
    const titleElement = document.getElementById('title');
    let index = 0;

    function appendTitle() {
      if (index < titles.length) {
        titleElement.innerHTML += titles[index];
        index++;
        setTimeout(appendTitle, 250); // 1000ms delay
      }
    }

    appendTitle();

    clearTimeout(c);
  }, 1000);
};


// ----------------------
// Tambahkan ini di bawah
// ----------------------
window.addEventListener('DOMContentLoaded', () => {
  const shouldPlay = localStorage.getItem("playMusic");
  if (shouldPlay === "true") {
    const audio = document.getElementById('bg-music');
    audio.play().catch(err => console.log("Autoplay blocked:", err));
    // reset flag biar ga auto play kalau reload
    localStorage.removeItem("playMusic");
  }
});

// Jika Anda sudah punya fungsi untuk membuat bintang, tambahkan ini:
function createTwinklingStars() {
    const night = document.querySelector('.night'); // atau container bintang Anda
    
    // Hapus bintang lama jika ada
    const existingStars = night.querySelectorAll('.sparkle');
    existingStars.forEach(star => star.remove());
    
    // Buat bintang baru dengan animasi
    for (let i = 0; i < 200; i++) {
        const star = document.createElement('div');
        
        // Random class untuk variasi animasi
        const animations = ['sparkle', 'sparkle-fast', 'sparkle-slow'];
        const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
        
        star.className = randomAnimation;
        star.style.position = 'absolute';
        star.style.width = Math.random() * 3 + 1 + 'px';
        star.style.height = star.style.width;
        star.style.background = 'white';
        star.style.borderRadius = '50%';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        
        // Random delay untuk efek natural
        star.style.animationDelay = Math.random() * 4 + 's';
        
        night.appendChild(star);
    }
}

// Panggil fungsi ini
createTwinklingStars();