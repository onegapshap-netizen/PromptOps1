import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Products.module.css';

gsap.registerPlugin(ScrollTrigger);

const products = [
    {
        id: 1,
        title: 'Weekend Light Kit',
        description: 'Perfect for 1-2 people weekend camping trips',
        price: '$49',
        gradient: 'linear-gradient(135deg, #3a5a40 0%, #588157 100%)',
    },
    {
        id: 2,
        title: 'Family Camping',
        description: 'Everything you need for the whole family',
        price: '$129',
        gradient: 'linear-gradient(135deg, #bc6c25 0%, #dda15e 100%)',
    },
    {
        id: 3,
        title: 'Solo Adventure',
        description: 'Lightweight gear for solo explorers',
        price: '$39',
        gradient: 'linear-gradient(135deg, #283618 0%, #606c38 100%)',
    },
    {
        id: 4,
        title: 'Group Camping',
        description: 'Large tents and gear for groups of 6+',
        price: '$199',
        gradient: 'linear-gradient(135deg, #344e41 0%, #588157 100%)',
    },
];

const Products = () => {
    const sectionRef = useRef(null);
    const trackRef = useRef(null);
    const progressBarRef = useRef(null);
    const [hoveredId, setHoveredId] = useState(null);

    useEffect(() => {
        const section = sectionRef.current;
        const track = trackRef.current;
        const progressBar = progressBarRef.current;

        // Calculate scroll distance
        const trackWidth = track.scrollWidth;
        const viewportWidth = window.innerWidth;
        const scrollDistance = trackWidth - viewportWidth;

        // Pin section and scroll horizontally
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: 'top top',
                end: () => `+=${scrollDistance * 1.5}`,
                scrub: 1,
                pin: true,
                anticipatePin: 1,
            },
        });

        tl.to(track, {
            x: -scrollDistance,
            ease: 'none',
        });

        // Progress bar
        ScrollTrigger.create({
            trigger: section,
            start: 'top top',
            end: () => `+=${scrollDistance * 1.5}`,
            scrub: 1,
            onUpdate: (self) => {
                gsap.to(progressBar, {
                    scaleX: self.progress,
                    ease: 'none',
                });
            },
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => {
                if (trigger.vars.trigger === section) {
                    trigger.kill();
                }
            });
        };
    }, []);

    return (
        <section ref={sectionRef} className={styles.products} id="products">
            <div className={styles.products__header}>
                <h2 className={styles.products__title}>Our Products</h2>
            </div>

            <div className={styles.products__scroll_container}>
                <div ref={trackRef} className={styles.products__track}>
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className={`${styles['product-card']} ${hoveredId && hoveredId !== product.id ? styles.dimmed : ''
                                }`}
                            onMouseEnter={() => setHoveredId(product.id)}
                            onMouseLeave={() => setHoveredId(null)}
                        >
                            <div
                                className={styles['product-card__image-wrapper']}
                                style={{ background: product.gradient }}
                            >
                                {/* Placeholder gradient instead of image */}
                            </div>
                            <div className={styles['product-card__content']}>
                                <h3 className={styles['product-card__title']}>{product.title}</h3>
                                <p className={styles['product-card__description']}>{product.description}</p>
                                <div className={styles['product-card__footer']}>
                                    <div className={styles['product-card__price']}>
                                        <span className={styles['product-card__price-tag']}>per day</span>
                                        {product.price}
                                    </div>
                                    <button className={styles['product-card__cta']}>Rent Now</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.products__progress}>
                <div ref={progressBarRef} className={styles.products__progress_bar}></div>
            </div>
        </section>
    );
};

export default Products;
