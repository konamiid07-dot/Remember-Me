// ===== MOOD CONTENT DATA =====
const moodContent = {
  happy: {
    title: "Celebrating Your Joy! 😊",
    subtitle: "Your happiness is beautiful and deserves to be celebrated",
    quote: {
      text: "Happiness is not something ready-made. It comes from your own actions.",
      author: "Dalai Lama"
    },
    activities: [
      {
        icon: "📝",
        title: "Gratitude Journal",
        description: "Write down 3 things you're grateful for today"
      },
      {
        icon: "🎵",
        title: "Happy Playlist",
        description: "Listen to music that amplifies your joy"
      },
      {
        icon: "🤳",
        title: "Capture the Moment",
        description: "Take a selfie or photo of something beautiful"
      },
      {
        icon: "💌",
        title: "Share the Love",
        description: "Send a kind message to someone special"
      },
      {
        icon: "🌱",
        title: "Plant Seeds",
        description: "Think about future goals while you're feeling positive"
      },
      {
        icon: "🎨",
        title: "Creative Expression",
        description: "Draw, paint, or create something inspired by your mood"
      }
    ],
    encouragement: "Your joy is contagious and beautiful. Keep shining and spreading positivity to the world around you. You deserve all the happiness you're feeling right now."
  },
  sad: {
    title: "Finding Comfort & Healing 😢",
    subtitle: "It's okay to feel sad. You're not alone in this moment",
    quote: {
      text: "The way sadness works is one of the strange riddles of the world. If you are stricken with a great sadness, you may feel as if you have been set aflame.",
      author: "Lemony Snicket"
    },
    activities: [
      {
        icon: "🫂",
        title: "Virtual Hug",
        description: "Wrap your arms around yourself and feel supported"
      },
      {
        icon: "☕",
        title: "Warm Comfort",
        description: "Make yourself a warm drink and savor it slowly"
      },
      {
        icon: "📖",
        title: "Gentle Reading",
        description: "Read something that brings you peace"
      },
      {
        icon: "🛁",
        title: "Self-Care Ritual",
        description: "Take a warm bath or do something nurturing"
      },
      {
        icon: "🎭",
        title: "Feel It Out",
        description: "Let yourself cry if you need to - it's healing"
      },
      {
        icon: "🌙",
        title: "Rest Time",
        description: "Give yourself permission to rest and be gentle"
      }
    ],
    encouragement: "It's brave of you to acknowledge your sadness. Remember that this feeling is temporary, and you have the strength to get through this. Be gentle with yourself."
  },
  angry: {
    title: "Channeling Your Energy 😠",
    subtitle: "Your anger is valid. Let's transform it into positive action",
    quote: {
      text: "Anger is an acid that can do more harm to the vessel in which it is stored than to anything on which it is poured.",
      author: "Mark Twain"
    },
    activities: [
      {
        icon: "🥊",
        title: "Physical Release",
        description: "Do jumping jacks, push-ups, or punch a pillow"
      },
      {
        icon: "🫁",
        title: "Deep Breathing",
        description: "Take 10 deep breaths: 4 counts in, 4 out"
      },
      {
        icon: "📝",
        title: "Write It Out",
        description: "Journal your feelings without censoring yourself"
      },
      {
        icon: "🚶",
        title: "Power Walk",
        description: "Take a brisk walk to clear your mind"
      },
      {
        icon: "🎯",
        title: "Problem Solving",
        description: "Channel anger into finding solutions"
      },
      {
        icon: "🧘",
        title: "Mindful Pause",
        description: "Take 5 minutes to center yourself"
      }
    ],
    encouragement: "Your anger shows that you care deeply about something important. Use this energy wisely and remember that you have the power to create positive change."
  },
  exhausted: {
    title: "Rest & Recharge 😴",
    subtitle: "You've been working hard. It's time to restore your energy",
    quote: {
      text: "Take rest; a field that has rested gives a bountiful crop.",
      author: "Ovid"
    },
    activities: [
      {
        icon: "💤",
        title: "Power Nap",
        description: "Take a 20-minute nap to restore energy"
      },
      {
        icon: "🧘‍♀️",
        title: "Gentle Meditation",
        description: "Try a 5-minute guided relaxation"
      },
      {
        icon: "🌿",
        title: "Nature Sounds",
        description: "Listen to calming sounds of nature"
      },
      {
        icon: "💧",
        title: "Hydrate",
        description: "Drink a full glass of water slowly"
      },
      {
        icon: "🍃",
        title: "Fresh Air",
        description: "Step outside for a few minutes"
      },
      {
        icon: "📱",
        title: "Digital Detox",
        description: "Put your phone away for 30 minutes"
      }
    ],
    encouragement: "You've been carrying so much, and it's completely natural to feel tired. Rest is not a luxury—it's necessary. Give yourself permission to slow down and recharge."
  }
};

// ===== UTILITY FUNCTIONS =====
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const DOM = {
  get(selector) {
    try {
      return document.querySelector(selector);
    } catch (error) {
      console.warn(`Invalid selector: ${selector}`);
      return null;
    }
  },

  getAll(selector) {
    try {
      return [...document.querySelectorAll(selector)];
    } catch (error) {
      console.warn(`Invalid selector: ${selector}`);
      return [];
    }
  },

  create(tag, options = {}) {
    try {
      const element = document.createElement(tag);
      if (options.className) element.className = options.className;
      if (options.id) element.id = options.id;
      if (options.content) element.textContent = options.content;
      if (options.html) element.innerHTML = options.html;
      if (options.attributes) {
        Object.entries(options.attributes).forEach(([key, value]) => {
          element.setAttribute(key, value);
        });
      }
      return element;
    } catch (error) {
      console.error('Failed to create element:', error);
      return null;
    }
  }
};

// ===== TOAST MANAGER =====
const Toast = {
  container: null,
  
  init() {
    this.container = DOM.get('#toast-container');
    if (!this.container) {
      this.container = DOM.create('div', {
        id: 'toast-container',
        className: 'toast-container',
        attributes: {
          'aria-live': 'assertive',
          'role': 'alert'
        }
      });
      document.body.appendChild(this.container);
    }
  },

  show(message, type = 'info', duration = 4000) {
    this.init();
    
    // Remove existing toasts
    this.container.querySelectorAll('.toast').forEach(toast => toast.remove());

    const toast = DOM.create('div', {
      className: `toast toast-${type}`,
      attributes: { 'role': 'alert' },
      html: `
        <div class="toast-content">
          <span class="toast-message">${message}</span>
        </div>
      `
    });

    this.container.appendChild(toast);

    // Show animation
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    // Auto-hide
    if (duration > 0) {
      setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
      }, duration);
    }
  },

  success(message) { this.show(message, 'success', 3000); },
  error(message) { this.show(message, 'error', 6000); },
  info(message) { this.show(message, 'info', 4000); }
};

// ===== LOADING MANAGER =====
const LoadingManager = {
  element: null,
  
  init() {
    this.element = DOM.get('#loading-screen');
  },

  show(text = 'Loading...') {
    if (this.element) {
      const textElement = this.element.querySelector('.loading-text');
      if (textElement) textElement.textContent = text;
      this.element.classList.remove('hidden');
    }
  },

  hide() {
    if (this.element) {
      this.element.classList.add('hidden');
    }
  }
};

// ===== APP STATE MANAGER =====
const AppState = {
  currentView: 'home',
  selectedMood: null,
  
  setView(view) {
    this.currentView = view;
    this.updateViews();
  },
  
  updateViews() {
    const homeView = DOM.get('#home-view');
    const moodView = DOM.get('#mood-view');
    
    if (homeView && moodView) {
      if (this.currentView === 'home') {
        homeView.classList.add('active');
        moodView.classList.remove('active');
      } else if (this.currentView === 'mood') {
        homeView.classList.remove('active');
        moodView.classList.add('active');
      }
    }
  }
};

// ===== MOOD MANAGER =====
const MoodManager = {
  init() {
    this.attachEventListeners();
    this.setupKeyboardNavigation();
    this.setupAccessibility();
  },

  attachEventListeners() {
    // Mood button clicks
    const moodButtons = DOM.getAll('.mood-btn');
    moodButtons.forEach(button => {
      const handleClick = debounce(async (e) => {
        const mood = e.currentTarget.dataset.mood;
        await this.handleMoodSelection(mood, button);
      }, 300);

      button.addEventListener('click', handleClick);
      
      // Keyboard support
      button.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick(e);
        }
      });

      // Enhanced interaction effects
      this.addInteractionEffects(button);
    });

    // Back button
    const backButton = DOM.get('#back-to-home');
    if (backButton) {
      backButton.addEventListener('click', () => {
        this.showHomeView();
      });
    }
  },

  addInteractionEffects(button) {
    // Hover effects
    button.addEventListener('mouseenter', () => {
      if (!button.disabled) {
        button.classList.add('hover-active');
      }
    });

    button.addEventListener('mouseleave', () => {
      button.classList.remove('hover-active');
    });

    // Focus effects
    button.addEventListener('focus', () => {
      button.classList.add('focus-active');
    });

    button.addEventListener('blur', () => {
      button.classList.remove('focus-active');
    });
  },

  setupKeyboardNavigation() {
    const container = DOM.get('.buttons-container');
    if (!container) return;

    container.addEventListener('keydown', (e) => {
      const buttons = DOM.getAll('.mood-btn:not([disabled])');
      const currentIndex = buttons.findIndex(btn => btn === e.target);
      
      if (currentIndex === -1) return;

      let nextIndex;
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          nextIndex = (currentIndex + 1) % buttons.length;
          e.preventDefault();
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          nextIndex = currentIndex === 0 ? buttons.length - 1 : currentIndex - 1;
          e.preventDefault();
          break;
        case 'Home':
          nextIndex = 0;
          e.preventDefault();
          break;
        case 'End':
          nextIndex = buttons.length - 1;
          e.preventDefault();
          break;
        default:
          return;
      }

      buttons[nextIndex]?.focus();
    });
  },

  setupAccessibility() {
    // Set initial ARIA states
    const buttons = DOM.getAll('.mood-btn');
    buttons.forEach((btn, index) => {
      btn.setAttribute('tabindex', index === 0 ? '0' : '-1');
    });
  },

  async handleMoodSelection(mood, button) {
    try {
      // Prevent multiple selections
      if (button.disabled || AppState.selectedMood) return;
      
      // Visual feedback
      button.classList.add('selected');
      AppState.selectedMood = mood;

      // Update ARIA states
      this.updateAriaStates(button);
      
      // Show loading
      LoadingManager.show(`Preparing your ${mood} experience...`);

      // Add UX delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Show mood content
      this.showMoodContent(mood);
      
      LoadingManager.hide();
      Toast.success(`${mood.charAt(0).toUpperCase() + mood.slice(1)} mood selected!`);

    } catch (error) {
      console.error('Mood selection failed:', error);
      Toast.error('Something went wrong. Please try again.');
      this.resetButtonsState();
      LoadingManager.hide();
    }
  },

  showMoodContent(mood) {
    const content = moodContent[mood];
    if (!content) return;

    const moodContentElement = DOM.get('#mood-content');
    if (!moodContentElement) return;

    // Generate mood content HTML
    const html = `
      <div class="mood-header">
        <h2 class="mood-title">
          <span class="mood-icon">${this.getMoodIcon(mood)}</span>
          ${content.title}
        </h2>
        <p class="mood-subtitle">${content.subtitle}</p>
      </div>

      <div class="quote-section">
        <div class="quote-text">"${content.quote.text}"</div>
        <div class="quote-author">— ${content.quote.author}</div>
      </div>

      <div class="activities-section">
        <h3 class="activities-title">Gentle Activities for You</h3>
        <div class="activities-grid">
          ${content.activities.map(activity => `
            <div class="activity-card" tabindex="0" role="button" data-activity="${activity.title}">
              <span class="activity-icon">${activity.icon}</span>
              <h4 class="activity-title">${activity.title}</h4>
              <p class="activity-description">${activity.description}</p>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="encouragement-section">
        <p>${content.encouragement}</p>
      </div>
    `;

    moodContentElement.innerHTML = html;
    
    // Add activity click handlers
    this.setupActivityHandlers();
    
    // Change view
    AppState.setView('mood');
    
    // Focus management
    const backButton = DOM.get('#back-to-home');
    if (backButton) {
      backButton.focus();
    }
  },

  setupActivityHandlers() {
    const activityCards = DOM.getAll('.activity-card');
    activityCards.forEach(card => {
      card.addEventListener('click', () => {
        const activity = card.getAttribute('data-activity');
        this.handleActivityClick(activity);
      });

      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const activity = card.getAttribute('data-activity');
          this.handleActivityClick(activity);
        }
      });
    });
  },

  handleActivityClick(activityTitle) {
    Toast.success(`Great choice! "${activityTitle}" is a wonderful way to care for yourself.`);
    
    // Special interactions for certain activities
    if (activityTitle === 'Deep Breathing') {
      this.startBreathingExercise();
    } else if (activityTitle === 'Virtual Hug') {
      this.showVirtualHug();
    }
  },

  startBreathingExercise() {
    const modal = DOM.create('div', {
      className: 'breathing-modal',
      html: `
        <div class="breathing-overlay"></div>
        <div class="breathing-content">
          <h3>Breathing Exercise</h3>
          <div class="breathing-circle"></div>
          <p class="breathing-instruction">Inhale as the circle grows, exhale as it shrinks</p>
          <button class="close-breathing">Close</button>
        </div>
      `
    });

    // Add styles
    modal.style.cssText = `
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      color: white;
      text-align: center;
      flex-direction: column;
      gap: 20px;
      padding: 20px;
    `;

    const circle = modal.querySelector('.breathing-circle');
    circle.style.cssText = `
      width: 200px;
      height: 200px;
      border-radius: 50%;
      background: linear-gradient(135deg, #667eea, #764ba2);
      margin: 30px auto;
      animation: breathe 8s infinite;
    `;

    const closeBtn = modal.querySelector('.close-breathing');
    closeBtn.style.cssText = `
      background: rgba(255, 255, 255, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.3);
      color: white;
      padding: 10px 20px;
      border-radius: 25px;
      cursor: pointer;
      font-size: 14px;
      margin-top: 20px;
    `;

    // Add breathing animation
    const style = DOM.create('style', {
      content: `
        @keyframes breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.5); }
        }
      `
    });
    document.head.appendChild(style);

    document.body.appendChild(modal);

    // Close handler
    modal.querySelector('.close-breathing').addEventListener('click', () => {
      modal.remove();
      style.remove();
    });

    // Auto close after 2 minutes
    setTimeout(() => {
      if (modal.parentNode) {
        modal.remove();
        style.remove();
      }
    }, 120000);
  },

  showVirtualHug() {
    const hugMessage = DOM.create('div', {
      className: 'virtual-hug',
      html: `
        <div class="hug-content">
          <div class="hug-emoji">🫂</div>
          <p>Sending you a warm, gentle hug. You are not alone.</p>
        </div>
      `
    });

    hugMessage.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(255, 255, 255, 0.95);
      padding: 30px;
      border-radius: 20px;
      text-align: center;
      box-shadow: 0 20px 40px rgba(0,0,0,0.3);
      z-index: 10000;
      animation: hugFade 3s ease-in-out;
    `;

    const style = DOM.create('style', {
      content: `
        @keyframes hugFade {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
          20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        }
        .hug-emoji { font-size: 4rem; margin-bottom: 10px; }
      `
    });

    document.head.appendChild(style);
    document.body.appendChild(hugMessage);

    setTimeout(() => {
      hugMessage.remove();
      style.remove();
    }, 3000);
  },

  showHomeView() {
    AppState.selectedMood = null;
    AppState.setView('home');
    
    // Reset button states
    this.resetButtonsState();
    
    // Focus management
    const firstMoodBtn = DOM.get('.mood-btn');
    if (firstMoodBtn) {
      firstMoodBtn.focus();
    }
  },

  updateAriaStates(selectedButton) {
    const buttons = DOM.getAll('.mood-btn');
    buttons.forEach(btn => {
      btn.setAttribute('aria-checked', btn === selectedButton ? 'true' : 'false');
    });
  },

  resetButtonsState() {
    const buttons = DOM.getAll('.mood-btn');
    buttons.forEach((btn, index) => {
      btn.classList.remove('selected', 'disabled');
      btn.disabled = false;
      btn.setAttribute('aria-checked', 'false');
      btn.setAttribute('tabindex', index === 0 ? '0' : '-1');
    });
  },

  getMoodIcon(mood) {
    const icons = {
      happy: '😊',
      sad: '😢',
      angry: '😠',
      exhausted: '😴'
    };
    return icons[mood] || '🌸';
  }
};

// ===== TIME GREETING MANAGER =====
const TimeGreeting = {
  element: null,
  
  init() {
    this.element = DOM.get('#time-greeting');
    if (this.element) {
      this.updateGreeting();
      this.show();
    }
  },

  updateGreeting() {
    const hour = new Date().getHours();
    let icon, text;

    if (hour >= 5 && hour < 12) {
      icon = '🌅';
      text = 'Good morning, Sintia!';
    } else if (hour >= 12 && hour < 17) {
      icon = '☀️';
      text = 'Good afternoon, Sintia!';
    } else if (hour >= 17 && hour < 21) {
      icon = '🌆';
      text = 'Good evening, Sintia!';
    } else {
      icon = '🌙';
      text = 'Good night, Sintia!';
    }

    const iconEl = this.element.querySelector('.greeting-icon');
    const textEl = this.element.querySelector('.greeting-text');
    
    if (iconEl) iconEl.textContent = icon;
    if (textEl) textEl.textContent = text;
  },

  show() {
    setTimeout(() => {
      if (this.element) {
        this.element.classList.add('show');
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
          this.hide();
        }, 5000);
      }
    }, 2000);
  },

  hide() {
    if (this.element) {
      this.element.classList.remove('show');
    }
  }
};

// ===== MODAL MANAGER =====
const ModalManager = {
  modal: null,
  isOpen: false,

  init() {
    this.modal = DOM.get('#help-modal');
    if (!this.modal) return;

    this.attachEventListeners();
  },

  attachEventListeners() {
    // Help button trigger
    const helpBtn = DOM.get('.help-button');
    if (helpBtn) {
      helpBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.show();
      });
    }

    // Close handlers
    const closeBtn = this.modal.querySelector('.modal-close');
    const gotItBtn = this.modal.querySelector('.modal-got-it');
    const overlay = this.modal.querySelector('.modal-overlay');

    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.hide());
    }

    if (gotItBtn) {
      gotItBtn.addEventListener('click', () => this.hide());
    }

    if (overlay) {
      overlay.addEventListener('click', () => this.hide());
    }

    // Keyboard handlers
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.hide();
      }
    });

    // Focus trap
    this.modal.addEventListener('keydown', (e) => {
      if (e.key === 'Tab' && this.isOpen) {
        this.trapFocus(e);
      }
    });
  },

  trapFocus(e) {
    const focusableElements = this.modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  },

  show() {
    if (this.modal) {
      this.isOpen = true;
      this.modal.classList.add('show');
      this.modal.setAttribute('aria-hidden', 'false');
      
      // Focus first focusable element
      const firstFocusable = this.modal.querySelector('button, [href]');
      if (firstFocusable) {
        firstFocusable.focus();
      }

      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    }
  },

  hide() {
    if (this.modal) {
      this.isOpen = false;
      this.modal.classList.remove('show');
      this.modal.setAttribute('aria-hidden', 'true');
      
      // Restore body scroll
      document.body.style.overflow = '';
      
      // Return focus to trigger
      const helpBtn = DOM.get('.help-button');
      if (helpBtn) {
        helpBtn.focus();
      }
    }
  }
};

// ===== ACCESSIBILITY MANAGER =====
const AccessibilityManager = {
  init() {
    this.setupFocusManagement();
    this.setupReducedMotion();
    this.setupAriaLive();
    this.setupColorScheme();
  },

  setupFocusManagement() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-navigation');
    });

    const skipLink = DOM.get('.skip-link');
    if (skipLink) {
      skipLink.addEventListener('click', (e) => {
        e.preventDefault();
        const target = DOM.get(skipLink.getAttribute('href'));
        if (target) {
          target.focus();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  },

  setupReducedMotion() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleReducedMotion = (mediaQuery) => {
      if (mediaQuery.matches) {
        document.body.classList.add('reduce-motion');
      } else {
        document.body.classList.remove('reduce-motion');
      }
    };

    handleReducedMotion(prefersReducedMotion);
    if (prefersReducedMotion.addListener) {
      prefersReducedMotion.addListener(handleReducedMotion);
    } else {
      prefersReducedMotion.addEventListener('change', handleReducedMotion);
    }
  },

  setupAriaLive() {
    const liveRegion = DOM.create('div', {
      id: 'aria-live-region',
      className: 'visually-hidden',
      attributes: {
        'aria-live': 'polite',
        'aria-atomic': 'true'
      }
    });
    document.body.appendChild(liveRegion);
  },

  setupColorScheme() {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleColorScheme = (mediaQuery) => {
      if (mediaQuery.matches) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
    };

    handleColorScheme(darkModeQuery);
    if (darkModeQuery.addListener) {
      darkModeQuery.addListener(handleColorScheme);
    } else {
      darkModeQuery.addEventListener('change', handleColorScheme);
    }
  },

  announce(message) {
    const liveRegion = DOM.get('#aria-live-region');
    if (liveRegion) {
      liveRegion.textContent = message;
      
      setTimeout(() => {
        liveRegion.textContent = '';
      }, 1000);
    }
  }
};

// ===== AUDIO MANAGER =====
const AudioManager = {
  audio: null,
  isPlaying: false,
  userInteracted: false,

  init() {
    this.audio = DOM.get('#bg-music');
    if (!this.audio) return;

    // Set up audio properties
    this.audio.volume = 0.15;
    this.audio.loop = true;
    
    // Wait for user interaction
    this.setupUserInteractionListener();
  },

  setupUserInteractionListener() {
    const enableAudio = () => {
      this.userInteracted = true;
      this.tryPlayAudio();
      
      // Remove listeners after first interaction
      ['click', 'keydown', 'touchstart'].forEach(event => {
        document.removeEventListener(event, enableAudio);
      });
    };

    ['click', 'keydown', 'touchstart'].forEach(event => {
      document.addEventListener(event, enableAudio, { once: true });
    });
  },

  async tryPlayAudio() {
    if (!this.audio || !this.userInteracted || this.isPlaying) return;

    try {
      await this.audio.play();
      this.isPlaying = true;
      console.log('Background music started');
    } catch (error) {
      console.log('Audio autoplay blocked:', error.message);
    }
  },

  stop() {
    if (this.audio && this.isPlaying) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.isPlaying = false;
    }
  }
};

// ===== BRAND ANIMATION MANAGER =====
const BrandAnimation = {
  init() {
    const icon = DOM.get('.brand-icon');
    if (!icon) return;

    // Enhanced interaction on hover/click
    icon.addEventListener('mouseenter', () => {
      icon.style.animation = 'gentleBounce 0.6s ease-out';
    });

    icon.addEventListener('click', () => {
      icon.style.animation = 'gentleBounce 0.4s ease-out 3';
      setTimeout(() => {
        icon.style.animation = 'gentleBounce 3s ease-in-out infinite';
      }, 1200);
    });
  }
};

// ===== BACKGROUND EFFECTS MANAGER =====
const BackgroundEffects = {
  container: null,
  isReduced: false,

  init() {
    this.container = DOM.get('.night');
    if (!this.container) {
      console.warn('Background container not found');
      return;
    }
    
    this.isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.setupMotionPreferenceListener();
  },

  setupMotionPreferenceListener() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleMotionChange = (mediaQuery) => {
      this.isReduced = mediaQuery.matches;
      if (this.isReduced) {
        this.container.style.animation = 'none';
      } else {
        this.container.style.animation = '';
      }
    };

    if (prefersReducedMotion.addListener) {
      prefersReducedMotion.addListener(handleMotionChange);
    } else {
      prefersReducedMotion.addEventListener('change', handleMotionChange);
    }
  }
};

// ===== PERFORMANCE MONITOR =====
const PerformanceMonitor = {
  init() {
    if (window.performance) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const navigation = performance.getEntriesByType('navigation')[0];
          if (navigation) {
            console.log('Performance Metrics:', {
              'DOM Ready': `${Math.round(navigation.domContentLoadedEventEnd - navigation.navigationStart)}ms`,
              'Full Load': `${Math.round(navigation.loadEventEnd - navigation.navigationStart)}ms`
            });
          }
        }, 0);
      });
    }
  }
};

// ===== FEATURE ANIMATIONS =====
const FeatureAnimations = {
  init() {
    this.setupScrollAnimations();
    this.setupHoverEffects();
  },

  setupScrollAnimations() {
    if (typeof IntersectionObserver === 'undefined') return;

    const features = DOM.getAll('.feature-item');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 150);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    features.forEach(feature => {
      feature.style.opacity = '0';
      feature.style.transform = 'translateY(30px)';
      feature.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(feature);
    });
  },

  setupHoverEffects() {
    const features = DOM.getAll('.feature-item');
    
    features.forEach(feature => {
      const icon = feature.querySelector('.feature-icon');
      
      if (icon) {
        feature.addEventListener('mouseenter', () => {
          icon.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        feature.addEventListener('mouseleave', () => {
          icon.style.transform = '';
        });
      }
    });
  }
};

// ===== SESSION MANAGER =====
const SessionManager = {
  sessionData: {},

  init() {
    this.loadSession();
  },

  saveSession(mood, data = {}) {
    try {
      this.sessionData = {
        mood: mood,
        timestamp: new Date().toISOString(),
        sessionId: Date.now().toString(36) + Math.random().toString(36).substr(2),
        ...data
      };
      
      // Store in memory for this session
      window.moodTrackerSession = this.sessionData;
      
      console.log('Session saved:', this.sessionData);
    } catch (error) {
      console.warn('Failed to save session data:', error);
    }
  },

  loadSession() {
    try {
      if (window.moodTrackerSession) {
        this.sessionData = window.moodTrackerSession;
        console.log('Session loaded:', this.sessionData);
      }
    } catch (error) {
      console.warn('Failed to load session data:', error);
    }
  },

  clearSession() {
    this.sessionData = {};
    if (window.moodTrackerSession) {
      delete window.moodTrackerSession;
    }
  }
};

// ===== ERROR HANDLER =====
const ErrorHandler = {
  init() {
    window.addEventListener('error', (e) => {
      this.handleError('Script Error', e.error);
    });

    window.addEventListener('unhandledrejection', (e) => {
      this.handleError('Promise Rejection', e.reason);
    });
  },

  handleError(type, error) {
    console.error(`${type}:`, error);
    
    // Show user-friendly error message
    if (Toast) {
      Toast.error('Something went wrong. Please try refreshing the page.');
    }
    
    // Hide loading if it's showing
    if (LoadingManager) {
      LoadingManager.hide();
    }
  }
};

// ===== MAIN APP =====
const App = {
  modules: {},
  initialized: false,

  async init() {
    try {
      console.log('🌸 Remember Me - Initializing...');
      
      // Initialize core modules first
      await this.initializeCoreModules();
      
      // Initialize feature modules
      await this.initializeFeatureModules();
      
      // Setup performance monitoring
      PerformanceMonitor.init();
      
      // Initialize error handling
      ErrorHandler.init();
      
      // Mark as initialized
      this.initialized = true;
      
      // Hide loading screen
      setTimeout(() => {
        LoadingManager.hide();
        console.log('✅ Remember Me - Ready!');
        
        // Show greeting after app loads
        if (this.modules.TimeGreeting) {
          this.modules.TimeGreeting.init();
        }
      }, 1500);

    } catch (error) {
      console.error('❌ Initialization failed:', error);
      if (Toast) {
        Toast.error('Something went wrong during initialization');
      }
      LoadingManager.hide();
    }
  },

  async initializeCoreModules() {
    const coreModules = [
      { name: 'LoadingManager', module: LoadingManager },
      { name: 'Toast', module: Toast },
      { name: 'AccessibilityManager', module: AccessibilityManager },
      { name: 'SessionManager', module: SessionManager }
    ];

    for (const { name, module } of coreModules) {
      try {
        if (typeof module.init === 'function') {
          await Promise.resolve(module.init());
        }
        
        this.modules[name] = module;
        console.log(`✓ ${name} initialized`);
        
      } catch (error) {
        console.error(`✗ Failed to initialize ${name}:`, error);
      }
    }
  },

  async initializeFeatureModules() {
    const featureModules = [
      { name: 'MoodManager', module: MoodManager },
      { name: 'ModalManager', module: ModalManager },
      { name: 'AudioManager', module: AudioManager },
      { name: 'BrandAnimation', module: BrandAnimation },
      { name: 'BackgroundEffects', module: BackgroundEffects },
      { name: 'FeatureAnimations', module: FeatureAnimations },
      { name: 'TimeGreeting', module: TimeGreeting }
    ];

    for (const { name, module } of featureModules) {
      try {
        if (typeof module.init === 'function') {
          await Promise.resolve(module.init());
        }
        
        this.modules[name] = module;
        console.log(`✓ ${name} initialized`);
        
        // Small delay for smoother UX
        await new Promise(resolve => setTimeout(resolve, 50));
        
      } catch (error) {
        console.error(`✗ Failed to initialize ${name}:`, error);
      }
    }
  },

  // Cleanup method
  destroy() {
    try {
      if (this.modules.AudioManager) {
        this.modules.AudioManager.stop();
      }
      
      if (this.modules.SessionManager) {
        this.modules.SessionManager.clearSession();
      }
      
      // Remove event listeners
      document.removeEventListener('DOMContentLoaded', this.init);
      window.removeEventListener('load', this.init);
      
      console.log('App destroyed');
    } catch (error) {
      console.error('Error during cleanup:', error);
    }
  },

  // Get module instance
  getModule(name) {
    return this.modules[name] || null;
  },

  // Check if app is ready
  isReady() {
    return this.initialized;
  }
};

// ===== INITIALIZATION LOGIC =====
// Ensure DOM is ready before initialization
function initializeApp() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => App.init(), 100);
    });
  } else {
    // DOM is already ready
    setTimeout(() => App.init(), 100);
  }
}

// Initialize the app
initializeApp();

// Fallback initialization in case something goes wrong
setTimeout(() => {
  if (!App.initialized) {
    console.warn('🚨 Fallback initialization triggered');
    App.init().catch(error => {
      console.error('Fallback initialization also failed:', error);
    });
  }
}, 5000);

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // Page is hidden, pause audio if playing
    if (App.modules.AudioManager) {
      App.modules.AudioManager.stop();
    }
  } else {
    // Page is visible again, restart audio if user had interacted
    if (App.modules.AudioManager && App.modules.AudioManager.userInteracted) {
      App.modules.AudioManager.tryPlayAudio();
    }
  }
});

// Handle page unload
window.addEventListener('beforeunload', () => {
  if (App.modules.SessionManager && App.modules.SessionManager.sessionData.mood) {
    console.log('User session ended:', {
      mood: App.modules.SessionManager.sessionData.mood,
      duration: Date.now() - new Date(App.modules.SessionManager.sessionData.timestamp).getTime()
    });
  }
});

// Global error boundary
window.addEventListener('error', (e) => {
  console.error('Global error caught:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('Global promise rejection caught:', e.reason);
  e.preventDefault(); // Prevent the default browser error handling
});

// Export for debugging and external access
if (typeof window !== 'undefined') {
  window.RememberMe = {
    App,
    AppState,
    Toast,
    LoadingManager,
    MoodManager,
    AudioManager,
    AccessibilityManager,
    SessionManager,
    BrandAnimation,
    BackgroundEffects,
    FeatureAnimations,
    TimeGreeting,
    ModalManager,
    moodContent,
    // Utility functions
    DOM,
    debounce
  };
  
  // Add console helper
  console.log('🌸 Remember Me loaded. Access via window.RememberMe');
}