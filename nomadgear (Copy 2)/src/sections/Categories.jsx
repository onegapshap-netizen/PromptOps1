import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Categories.module.css';
import categoryTents from '../assets/images/category-tents.png';
import categorySleepingBags from '../assets/images/category-sleeping-bags.png';
import categoryBackpacks from '../assets/images/category-backpacks.png';
import categoryAccessories from '../assets/images/category-accessories.png';

gsap.registerPlugin(ScrollTrigger);

const categories = [
    {
        id: 1,
        title: 'Tents',
        description: 'Shelter for all weather',
        image: categoryTents,
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 20h18L12 3 3 20z" />
                <path d="M9.5 12.5L12 3l2.5 9.5" />
            </svg>
        ),
    },
    {
        id: 2,
        title: 'Sleeping Bags',
        description: 'Rest under the stars',
        image: categorySleepingBags,
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="16" rx="2" />
                <path d="M7 4v16M17 4v16" />
            </svg>
        ),
    },
    {
        id: 3,
        title: 'Backpacks',
        description: 'Carry your adventure',
        image: categoryBackpacks,
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
            </svg>
        ),
    },
    {
        id: 4,
        title: 'Accessories',
        description: 'Essential gear',
        image: categoryAccessories,
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
            </svg>
        ),
    },
];

const Categories = () => {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Title reveal
            ScrollTrigger.create({
                trigger: titleRef.current,
                start: 'top 80%',
                onEnter: () => {
                    gsap.to(titleRef.current, {
                        clipPath: 'inset(0 0 0% 0)',
                        duration: 1.0,
                        ease: 'expo.out',
                    });
                },
                once: true,
            });

            // Cards parallax
            gsap.utils.toArray(`.${styles['category-card']}`).forEach((card, index) => {
                const multiplier = [0, -20, -60, -40][index] || 0;

                ScrollTrigger.create({
                    trigger: card,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                    onUpdate: (self) => {
                        gsap.to(card, {
                            y: self.progress * multiplier,
                            ease: 'none',
                        });
                    },
                });

                // Card entrance animation
                gsap.from(card, {
                    opacity: 0,
                    y: 50,
                    duration: 0.8,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        once: true,
                    },
                    delay: index * 0.1,
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleMouseMove = (e, cardRef) => {
        const card = cardRef;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * 10;
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(card, {
            rotateX: -rotateX,
            rotateY: rotateY,
            duration: 0.3,
            ease: 'power2.out',
        });
    };

    const handleMouseLeave = (cardRef) => {
        gsap.to(cardRef, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)',
        });
    };

    return (
        <section ref={sectionRef} className={styles.categories} id="categories">
            <h2 ref={titleRef} className={styles.categories__title}>
                Browse by category
            </h2>
            <div className={styles.categories__grid}>
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className={styles['category-card']}
                        onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
                        onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                    >
                        <div className={styles['category-card__image-wrapper']}>
                            <img
                                src={category.image}
                                alt={category.title}
                                className={styles['category-card__image']}
                            />
                        </div>
                        <div className={styles['category-card__content']}>
                            <div className={styles['category-card__icon']}>
                                {category.icon}
                                <svg className={styles['category-card__icon-circle']} viewBox="0 0 56 56">
                                    <circle cx="28" cy="28" r="25" />
                                </svg>
                            </div>
                            <h3 className={styles['category-card__title']}>{category.title}</h3>
                            <p className={styles['category-card__description']}>{category.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Categories;
