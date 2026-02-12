import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './Testimonials.module.css';

const testimonials = [
    {
        id: 1,
        name: 'Sarah Johnson',
        role: 'Adventure Blogger',
        text: 'NomadGear made our family camping trip unforgettable. The quality of equipment is outstanding!',
        rating: 5,
        initial: 'S',
    },
    {
        id: 2,
        name: 'John Davis',
        role: 'Outdoor Enthusiast',
        text: 'Best rental service I\'ve used. Everything was clean, well-maintained, and delivered on time.',
        rating: 5,
        initial: 'J',
    },
    {
        id: 3,
        name: 'Mike Chen',
        role: 'Weekend Warrior',
        text: 'Affordable prices and amazing customer service. Will definitely rent from NomadGear again!',
        rating: 5,
        initial: 'M',
    },
    {
        id: 4,
        name: 'Emily Brown',
        role: 'Nature Lover',
        text: 'The gear selection is fantastic. Perfect for both beginners and experienced campers.',
        rating: 5,
        initial: 'E',
    },
];

const Testimonials = () => {
    const orbitRef = useRef(null);

    useEffect(() => {
        const orbit = orbitRef.current;
        if (!orbit) return;

        // Slow orbital rotation
        gsap.to(orbit, {
            rotation: 360,
            duration: 60,
            ease: 'none',
            repeat: -1,
        });

        // Counter-rotate cards to keep them upright
        const cards = orbit.querySelectorAll(`.${styles['testimonial-card']}`);
        cards.forEach((card) => {
            gsap.to(card, {
                rotation: -360,
                duration: 60,
                ease: 'none',
                repeat: -1,
            });
        });
    }, []);

    const handleCardHover = (e) => {
        const orbit = orbitRef.current;
        gsap.to(orbit, {
            rotation: `+=${0}`,
            duration: 0.3,
            overwrite: false,
        });
    };

    return (
        <section className={styles.testimonials}>
            <div className={styles.testimonials__header}>
                <h2 className={styles.testimonials__title}>What our customers say</h2>
            </div>

            <div ref={orbitRef} className={styles.testimonials__orbit}>
                <div className={styles.testimonials__core}>TRUST</div>

                {testimonials.map((testimonial) => (
                    <div
                        key={testimonial.id}
                        className={styles['testimonial-card']}
                        onMouseEnter={handleCardHover}
                    >
                        <div className={styles['testimonial-card__header']}>
                            <div className={styles['testimonial-card__avatar']}>{testimonial.initial}</div>
                            <div>
                                <div className={styles['testimonial-card__name']}>{testimonial.name}</div>
                                <div className={styles['testimonial-card__role']}>{testimonial.role}</div>
                            </div>
                        </div>
                        <p className={styles['testimonial-card__text']}>{testimonial.text}</p>
                        <div className={styles['testimonial-card__rating']}>
                            {'★'.repeat(testimonial.rating)}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;
