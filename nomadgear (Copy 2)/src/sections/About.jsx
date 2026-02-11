import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './About.module.css';
import aboutBg from '../assets/images/about-bg.png';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const sectionRef = useRef(null);
    const imageWrapperRef = useRef(null);
    const imageRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Morph animation on scroll
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
                onUpdate: (self) => {
                    const progress = self.progress;
                    const radius1 = 30 + progress * 30;
                    const radius2 = 70 - progress * 30;
                    const radius3 = 60 - progress * 20;
                    const radius4 = 40 + progress * 20;

                    gsap.to(imageWrapperRef.current, {
                        borderRadius: `${radius1}% ${radius2}% ${radius3}% ${radius4}% / ${radius4}% ${radius3}% ${radius2}% ${radius1}%`,
                        ease: 'none',
                    });
                },
            });

            // Image scale on scroll
            ScrollTrigger.create({
                trigger: imageWrapperRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
                onUpdate: (self) => {
                    const progress = self.progress;
                    gsap.to(imageRef.current, {
                        scale: 1.2 - progress * 0.2,
                        ease: 'none',
                    });
                },
            });

            // Content slide in
            gsap.from(`.${styles.about__title}`, {
                x: 50,
                opacity: 0,
                duration: 1,
                ease: 'expo.out',
                scrollTrigger: {
                    trigger: contentRef.current,
                    start: 'top 70%',
                    once: true,
                },
            });

            gsap.from(`.${styles.about__body}`, {
                x: 50,
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out',
                delay: 0.2,
                scrollTrigger: {
                    trigger: contentRef.current,
                    start: 'top 70%',
                    once: true,
                },
            });

            gsap.from(`.${styles.about__cta}`, {
                x: 50,
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out',
                delay: 0.4,
                scrollTrigger: {
                    trigger: contentRef.current,
                    start: 'top 70%',
                    once: true,
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className={styles.about} id="about">
            <div className={styles.about__container}>
                <div ref={imageWrapperRef} className={styles.about__image_wrapper}>
                    <img ref={imageRef} src={aboutBg} alt="Camping experience" className={styles.about__image} />
                    <div className={styles.about__badge}>Est. 2020</div>
                </div>

                <div ref={contentRef} className={styles.about__content}>
                    <h2 className={styles.about__title}>The best camping gear</h2>
                    <p className={styles.about__body}>
                        We provide the best camping gear for your next adventure. Rent from us and explore the world.
                        Our equipment is carefully selected and maintained to ensure your outdoor experience is safe,
                        comfortable, and unforgettable.
                    </p>
                    <button className={styles.about__cta}>
                        Explore
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default About;
