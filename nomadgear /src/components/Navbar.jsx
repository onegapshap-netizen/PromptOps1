import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import styles from './Navbar.module.css';

const Navbar = () => {
    const navRef = useRef(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const addToCart = () => {
        setCartCount((prev) => prev + 1);
    };

    return (
        <nav
            ref={navRef}
            className={`${styles.navbar} ${isScrolled ? styles['navbar--scrolled'] : ''}`}
        >
            <div className={styles.navbar__container}>
                <div className={styles.navbar__logo}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M12 2L2 7L12 12L22 7L12 2Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M2 17L12 22L22 17"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M2 12L12 17L22 12"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    NomadGear
                </div>

                <div
                    className={`${styles.navbar__links} ${isMobileOpen ? styles['navbar__links--open'] : ''
                        }`}
                >
                    <a href="#home" className={`${styles.navbar__link} ${styles['navbar__link--active']}`}>
                        Home
                    </a>
                    <a href="#categories" className={styles.navbar__link}>
                        Categories
                    </a>
                    <a href="#products" className={styles.navbar__link}>
                        Products
                    </a>
                    <a href="#about" className={styles.navbar__link}>
                        About
                    </a>
                    <a href="#contact" className={styles.navbar__link}>
                        Contact
                    </a>
                </div>

                <div className={styles.navbar__actions}>
                    <button className={styles.navbar__action} aria-label="Search">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="11" cy="11" r="8" />
                            <path d="M21 21l-4.35-4.35" />
                        </svg>
                    </button>

                    <button className={styles.navbar__action} aria-label="Cart">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <path d="M16 10a4 4 0 0 1-8 0" />
                        </svg>
                        {cartCount > 0 && <span className={styles.navbar__cart_count}>{cartCount}</span>}
                    </button>

                    <div
                        className={styles.navbar__mobile_toggle}
                        onClick={() => setIsMobileOpen(!isMobileOpen)}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
