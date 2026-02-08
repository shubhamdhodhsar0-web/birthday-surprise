// ═══════════════════════════════════════════════════════════
// SCENE MANAGEMENT SYSTEM
// ═══════════════════════════════════════════════════════════

class SceneManager {
    constructor() {
        this.currentScene = 0;
        this.scenes = [
            'scene-balloon',
            'scene-birthday',
            'scene-memories',
            'scene-heart',
            'scene-letter',
            'scene-final'
        ];
        this.init();
    }

    init() {
        this.setupBalloonScene();
        this.setupBirthdayScene();
        this.setupMemoriesScene();
        this.setupHeartScene();
        this.setupLetterScene();
        this.setupFinalScene();
    }

    showScene(sceneIndex) {
        // Hide all scenes
        this.scenes.forEach((sceneId) => {
            const scene = document.getElementById(sceneId);
            scene.classList.remove('active');
        });

        // Show target scene
        const targetScene = document.getElementById(this.scenes[sceneIndex]);
        targetScene.classList.add('active');

        this.currentScene = sceneIndex;
    }

    nextScene() {
        if (this.currentScene < this.scenes.length - 1) {
            this.showScene(this.currentScene + 1);
        } else {
            // End of experience
            this.endExperience();
        }
    }

    previousScene() {
        if (this.currentScene > 0) {
            this.showScene(this.currentScene - 1);
        }
    }

    endExperience() {
        console.log('Experience completed! 💕');
        // Optional: Add replay functionality
        setTimeout(() => {
            this.showScene(0);
        }, 3000);
    }

    // ═══════════════════════════════════════════════════════════
    // SCENE 1: BALLOON INTRO
    // ═══════════════════════════════════════════════════════════

    setupBalloonScene() {
        // Create stars
        this.createStars();

        // Tap button event
        const tapButton = document.querySelector('#scene-balloon .tap-button');
        tapButton.addEventListener('click', () => this.balloonTapped());
        tapButton.addEventListener('touchend', () => this.balloonTapped());
    }

    createStars() {
        const starsContainer = document.querySelector('.stars-container');
        const starCount = window.innerWidth > 768 ? 50 : 30;

        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.animationDelay = Math.random() * 3 + 's';
            starsContainer.appendChild(star);
        }
    }

    balloonTapped() {
        // Create burst effect
        this.createBalloonBurst();

        // Disable button
        const tapButton = document.querySelector('#scene-balloon .tap-button');
        tapButton.disabled = true;

        // Fade out and transition
        setTimeout(() => {
            this.nextScene();
        }, 600);
    }

    createBalloonBurst() {
        const balloon = document.querySelector('.balloon-body');
        const container = document.querySelector('.balloon-container');

        // Burst animation
        balloon.style.animation = 'none';
        balloon.style.transform = 'scale(0)';
        balloon.style.opacity = '0';

        // Create particles
        const particleCount = 30;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.innerHTML = '❤️';
            particle.style.position = 'absolute';
            particle.style.fontSize = '20px';
            particle.style.left = '50%';
            particle.style.top = '50%';
            particle.style.pointerEvents = 'none';

            const angle = (i / particleCount) * Math.PI * 2;
            const velocity = 5 + Math.random() * 5;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;

            container.appendChild(particle);

            // Animate particle
            let x = 0,
                y = 0;
            const animate = () => {
                x += vx;
                y += vy;
                particle.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
                particle.style.opacity = Math.max(0, 1 - y / 200);

                if (y < 200) {
                    requestAnimationFrame(animate);
                } else {
                    particle.remove();
                }
            };
            animate();
        }
    }

    // ═══════════════════════════════════════════════════════════
    // SCENE 2: BIRTHDAY CELEBRATION
    // ═══════════════════════════════════════════════════════════

    setupBirthdayScene() {
        const scene = document.getElementById('scene-birthday');

        // Observe when scene becomes active
        scene.addEventListener('transitionend', () => {
            if (scene.classList.contains('active')) {
                this.startBirthdayAnimation();
            }
        });

        // Manual trigger for immediate start
        if (scene.classList.contains('active')) {
            this.startBirthdayAnimation();
        }

        // Animate character text
        this.animateCharacters();

        // Create floating hearts
        this.createFloatingHearts('scene-birthday');

        // Music button
        this.setupMusicControl();

        // Show question after delay
        setTimeout(() => {
            if (this.currentScene === 1) {
                this.showQuestionCard();
            }
        }, 10000);

        // Question buttons
        const btnYes = document.querySelector('#scene-birthday .btn-yes');
        const btnNo = document.querySelector('#scene-birthday .btn-no');

        if (btnYes) {
            btnYes.addEventListener('click', () => this.handleYesClick());
        }
        if (btnNo) {
            btnNo.addEventListener('click', () => this.handleNoClick());
        }
    }

    startBirthdayAnimation() {
        // Create continuous fireworks
        this.createFireworksEffect();
    }

    animateCharacters() {
        const chars = document.querySelectorAll('#scene-birthday .char');
        chars.forEach((char, index) => {
            char.style.animationDelay = index * 0.05 + 's';
        });
    }

    createFloatingHearts(sceneId) {
        const container = document.querySelector(`#${sceneId} .floating-hearts-container`);
        if (!container) return;

        const hearts = ['❤️', '💕', '💖', '💗', '💝'];
        const heartCount = window.innerWidth > 768 ? 15 : 10;

        for (let i = 0; i < heartCount; i++) {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.bottom = '-50px';
            heart.style.animationDelay = Math.random() * 6 + 's';
            heart.style.animationDuration = 6 + Math.random() * 2 + 's';

            container.appendChild(heart);

            // Recreate heart after animation ends
            setTimeout(() => {
                setInterval(() => {
                    if (heart.parentNode) {
                        const newHeart = heart.cloneNode(true);
                        newHeart.style.animationDelay = '0s';
                        container.appendChild(newHeart);
                        setTimeout(() => newHeart.remove(), 8000);
                    }
                }, 2000);
            }, 8000);
        }
    }

    createFireworksEffect() {
        const container = document.querySelector('#scene-birthday .fireworks-container');
        if (!container) return;

        const createFirework = () => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight * 0.6;

            const colors = ['#ff1744', '#ff6b9d', '#ffd700', '#00d4ff', '#ff00ff'];
            const color = colors[Math.floor(Math.random() * colors.length)];

            for (let i = 0; i < 8; i++) {
                const particle = document.createElement('div');
                particle.className = 'firework-particle';
                particle.style.left = x + 'px';
                particle.style.top = y + 'px';
                particle.style.backgroundColor = color;
                particle.style.boxShadow = `0 0 10px ${color}`;

                container.appendChild(particle);

                const angle = (i / 8) * Math.PI * 2;
                const velocity = 5 + Math.random() * 5;
                const vx = Math.cos(angle) * velocity;
                const vy = Math.sin(angle) * velocity;

                let px = 0,
                    py = 0;
                const animate = () => {
                    px += vx;
                    py += vy;
                    vy += 0.1; // Gravity

                    particle.style.transform = `translate(${px}px, ${py}px)`;
                    particle.style.opacity = Math.max(0, 1 - py / 200);

                    if (py < 200) {
                        requestAnimationFrame(animate);
                    } else {
                        particle.remove();
                    }
                };
                animate();
            }
        };

        // Create fireworks periodically
        setInterval(createFirework, 600);
    }

    setupMusicControl() {
        const musicBtn = document.getElementById('music-toggle');
        const audio = document.getElementById('background-music');

        if (musicBtn && audio) {
            musicBtn.addEventListener('click', () => {
                if (audio.paused) {
                    audio.play();
                    musicBtn.classList.add('playing');
                    musicBtn.textContent = '🔇 Music';
                } else {
                    audio.pause();
                    musicBtn.classList.remove('playing');
                    musicBtn.textContent = '🔊 Music';
                }
            });
        }
    }

    showQuestionCard() {
        const questionCard = document.querySelector('#scene-birthday .question-card');
        if (questionCard) {
            questionCard.classList.remove('hidden');
        }
    }

    handleYesClick() {
        // Hide question card
        const questionCard = document.querySelector('#scene-birthday .question-card');
        questionCard.classList.add('hidden');

        // Transition to next scene
        setTimeout(() => {
            this.nextScene();
        }, 500);
    }

    handleNoClick() {
        // Show retry message
        const questionCard = document.querySelector('#scene-birthday .question-card');
        const retryMessage = document.querySelector('#scene-birthday .retry-message');

        questionCard.classList.add('hidden');
        retryMessage.classList.remove('hidden');

        // Return to balloon scene
        setTimeout(() => {
            retryMessage.classList.add('hidden');
            this.showScene(0);
        }, 3000);
    }

    // ═══════════════════════════════════════════════════════════
    // SCENE 3: MEMORIES PAGE
    // ═══════════════════════════════════════════════════════════

    setupMemoriesScene() {
        const btnNext = document.querySelector('#scene-memories .btn-next');
        if (btnNext) {
            btnNext.addEventListener('click', () => this.nextScene());
        }
    }

    // ═══════════════════════════════════════════════════════════
    // SCENE 4: HEART INTERACTION
    // ═══════════════════════════════════════════════════════════

    setupHeartScene() {
        const heartIcon = document.querySelector('#scene-heart .heart-icon');
        if (heartIcon) {
            heartIcon.addEventListener('click', () => this.handleHeartTap());
            heartIcon.addEventListener('touchend', (e) => {
                e.preventDefault();
                this.handleHeartTap();
            });
        }
    }

    handleHeartTap() {
        const heartIcon = document.querySelector('#scene-heart .heart-icon');
        heartIcon.style.animation = 'none';

        // Trigger burst animation
        setTimeout(() => {
            this.nextScene();
        }, 600);
    }

    // ═══════════════════════════════════════════════════════════
    // SCENE 5: LOVE LETTER
    // ═══════════════════════════════════════════════════════════

    setupLetterScene() {
        const btnNext = document.querySelector('#scene-letter .btn-next');
        if (btnNext) {
            btnNext.addEventListener('click', () => this.nextScene());
        }

        // Create floating hearts
        this.createFloatingHeartsInLetter();
    }

    createFloatingHeartsInLetter() {
        const container = document.querySelector('#scene-letter .floating-hearts-container-letter');
        if (!container) return;

        const heartCount = window.innerWidth > 768 ? 8 : 5;
        for (let i = 0; i < heartCount; i++) {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.innerHTML = '💕';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.bottom = '-50px';
            heart.style.fontSize = '20px';
            heart.style.animationDelay = Math.random() * 6 + 's';

            container.appendChild(heart);
        }
    }

    // ═══════════════════════════════════════════════════════════
    // SCENE 6: FINAL MESSAGE
    // ═══════════════════════════════════════════════════════════

    setupFinalScene() {
        // Create floating elements
        this.createFloatingHeartsInFinal();
        this.createFloatingStars();

        // Auto end after delay
        setTimeout(() => {
            if (this.currentScene === 5) {
                this.endExperience();
            }
        }, 6000);
    }

    createFloatingHeartsInFinal() {
        const container = document.querySelector('#scene-final .floating-hearts-container-final');
        if (!container) return;

        const heartCount = window.innerWidth > 768 ? 12 : 8;
        for (let i = 0; i < heartCount; i++) {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.innerHTML = '❤️';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.bottom = '-50px';
            heart.style.fontSize = '28px';
            heart.style.animationDelay = Math.random() * 8 + 's';
            heart.style.animationDuration = 8 + Math.random() * 2 + 's';

            container.appendChild(heart);
        }
    }

    createFloatingStars() {
        const container = document.querySelector('#scene-final .floating-stars-container');
        if (!container) return;

        const starCount = window.innerWidth > 768 ? 15 : 10;
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'floating-star';
            star.innerHTML = '⭐';
            star.style.left = Math.random() * 100 + '%';
            star.style.bottom = '-50px';
            star.style.animationDelay = Math.random() * 8 + 's';
            star.style.animationDuration = 8 + Math.random() * 2 + 's';

            container.appendChild(star);
        }
    }
}

// ═══════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════

function playSound(frequency = 800, duration = 100) {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = frequency;
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration / 1000);
    } catch (e) {
        console.log('Web Audio API not supported');
    }
}

// ═══════════════════════════════════════════════════════════
// INITIALIZE APP
// ═══════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
    const sceneManager = new SceneManager();

    // Show first scene
    sceneManager.showScene(0);

    // Optional: Add keyboard navigation for testing
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            sceneManager.nextScene();
        }
        if (e.key === 'ArrowLeft') {
            sceneManager.previousScene();
        }
    });

    // Prevent pinch zoom on mobile
    document.addEventListener('gesturestart', (e) => {
        e.preventDefault();
    });
});

// Prevent accidental scrolling
window.addEventListener('touchmove', (e) => {
    if (e.target.closest('.photo-gallery, #scene-memories')) {
        return;
    }
    e.preventDefault();
});