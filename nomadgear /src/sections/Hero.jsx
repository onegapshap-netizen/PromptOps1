import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Hero.module.css';
import heroBg from '../assets/images/hero-bg.png';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const heroRef = useRef(null);
    const imageRef = useRef(null);
    const headlineRef = useRef(null);
    const descriptionRef = useRef(null);
    const ctaRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero image entrance - scale down and remove blur
            gsap.to(imageRef.current, {
                scale: 1,
                filter: 'blur(0px)',
                duration: 1.5,
                ease: 'expo.out',
            });

            // Split text animation for headline
            const headline = headlineRef.current;
            const text = headline.textContent;
            headline.innerHTML = '';

            const words = text.split(' ');
            words.forEach((word, wordIndex) => {
                const wordSpan = document.createElement('span');
                wordSpan.className = styles.hero__headline_word;
                wordSpan.style.marginRight = '0.3em';

                word.split('').forEach((char) => {
                    const charSpan = document.createElement('span');
                    charSpan.className = styles.hero__headline_char;
                    charSpan.textContent = char;
                    wordSpan.appendChild(charSpan);
                });

                headline.appendChild(wordSpan);
            });

            // Animate each character
            gsap.to(`.${styles.hero__headline_char}`, {
                y: 0,
                duration: 1.0,
                ease: 'expo.out',
                stagger: 0.05,
                delay: 0.2,
            });

            // Description fade up
            gsap.to(descriptionRef.current, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power2.out',
                delay: 0.4,
            });

            // CTA magnetic pop
            gsap.to(ctaRef.current, {
                scale: 1,
                opacity: 1,
                duration: 0.6,
                ease: 'elastic.out(1, 0.5)',
                delay: 0.6,
            });

            // Scroll parallax effect
            ScrollTrigger.create({
                trigger: heroRef.current,
                start: 'top top',
                end: 'bottom top',
                scrub: true,
                onUpdate: (self) => {
                    const progress = self.progress;
                    gsap.to(imageRef.current, {
                        y: `${progress * 30}%`,
                        ease: 'none',
                    });
                    gsap.to(headlineRef.current, {
                        opacity: 1 - progress,
                        filter: `blur(${progress * 10}px)`,
                        ease: 'none',
                    });
                },
            });
        }, heroRef);

        // Particle system
        const canvas = canvasRef.current;
        const ctx2d = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const particleCount = 50;

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 3 + 1;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
                this.opacity = Math.random() * 0.3;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;
            }

            draw() {
                ctx2d.fillStyle = `rgba(254, 250, 224, ${this.opacity})`;
                ctx2d.beginPath();
                ctx2d.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx2d.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        function animateParticles() {
            ctx2d.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((particle) => {
                particle.update();
                particle.draw();
            });
            requestAnimationFrame(animateParticles);
        }

        animateParticles();

        // Magnetic CTA effect
        const cta = ctaRef.current;
        const handleMouseMove = (e) => {
            const rect = cta.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const deltaX = e.clientX - centerX;
            const deltaY = e.clientY - centerY;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

            if (distance < 100) {
                const strength = (100 - distance) / 100;
                gsap.to(cta, {
                    x: deltaX * strength * 0.3,
                    y: deltaY * strength * 0.3,
                    duration: 0.3,
                    ease: 'power2.out',
                });
            } else {
                gsap.to(cta, {
                    x: 0,
                    y: 0,
                    duration: 0.5,
                    ease: 'elastic.out(1, 0.5)',
                });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            ctx.revert();
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <section ref={heroRef} className={styles.hero}>
            <div className={styles.hero__background}>
                <img ref={imageRef} src={heroBg} alt="Camping by the lake" />
            </div>
            <div className={styles.hero__overlay}></div>
            <div className={styles.hero__glow}></div>
            <canvas ref={canvasRef} className={styles.hero__particles}></canvas>

            <div className={styles.hero__content}>
                <h1 ref={headlineRef} className={styles.hero__headline}>
                    Find your next adventure
                </h1>
                <p ref={descriptionRef} className={styles.hero__description}>
                    We provide the best camping gear for your next adventure. Rent from us and explore the world.
                </p>
                <button ref={ctaRef} className={styles.hero__cta}>
                    <span>Book now</span>
                </button>
            </div>
        </section>
    );
};

export default Hero;
