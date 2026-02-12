import { useRef, useState } from 'react';
import styles from './CTA.module.css';

const CTA = () => {
    const [email, setEmail] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const backgroundRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Email submitted:', email);
        setEmail('');
    };

    return (
        <section className={styles.cta}>
            <div
                ref={backgroundRef}
                className={`${styles.cta__background} ${isFocused ? styles.blurred : ''}`}
            ></div>

            <div className={styles.cta__content}>
                <h2 className={styles.cta__title}>Join the club</h2>
                <p className={styles.cta__description}>
                    Subscribe to get exclusive deals, camping tips, and early access to new gear.
                </p>

                <form onSubmit={handleSubmit} className={styles.cta__form}>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        className={styles.cta__input}
                        required
                    />
                    <button type="submit" className={styles.cta__submit}>
                        Subscribe
                    </button>
                </form>
            </div>
        </section>
    );
};

export default CTA;
