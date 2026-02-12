import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Destinations.module.css';

gsap.registerPlugin(ScrollTrigger);

const destinations = [
    {
        id: 1,
        location: 'Alpine Lake',
        description: 'Crystal clear waters surrounded by snow-capped peaks',
        gradient: 'linear-gradient(135deg, #4a90e2 0%, #67b26f 100%)',
    },
    {
        id: 2,
        location: 'Redwoods',
        description: 'Ancient forests with towering giants',
        gradient: 'linear-gradient(135deg, #283618 0%, #588157 100%)',
    },
    {
        id: 3,
        location: 'Coastal Camp',
        description: 'Ocean views and sandy beaches',
        gradient: 'linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)',
    },
    {
        id: 4,
        location: 'Desert Oasis',
        description: 'Starry nights and endless horizons',
        gradient: 'linear-gradient(135deg, #dda15e 0%, #bc6c25 100%)',
    },
];

const Destinations = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Fast scroll for even columns
            gsap.utils.toArray(`.${styles['destination-card']}:nth-child(even)`).forEach((card) => {
                ScrollTrigger.create({
                    trigger: sectionRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                    onUpdate: (self) => {
                        gsap.to(card, {
                            y: -100 * self.progress,
                            ease: 'none',
                        });
                    },
                });
            });

            // Normal scroll for odd columns
            gsap.utils.toArray(`.${styles['destination-card']}:nth-child(odd)`).forEach((card) => {
                gsap.from(card, {
                    opacity: 0,
                    y: 50,
                    duration: 1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 80%',
                        once: true,
                    },
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className={styles.destinations} id="destinations">
            <div className={styles.destinations__header}>
                <h2 className={styles.destinations__title}>Destinations</h2>
            </div>

            <div className={styles.destinations__grid}>
                {destinations.map((destination) => (
                    <div key={destination.id} className={styles['destination-card']}>
                        <div
                            className={styles['destination-card__image']}
                            style={{ background: destination.gradient }}
                        />
                        <div className={styles['destination-card__overlay']}>
                            <h3 className={styles['destination-card__location']}>{destination.location}</h3>
                            <p className={styles['destination-card__description']}>{destination.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Destinations;
