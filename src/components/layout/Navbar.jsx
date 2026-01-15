import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import styles from './Navbar.module.css';
import Modal from '../common/Modal';
import { useTheme } from '../../context/ThemeContext';
import logoLight from '../../assets/1.png';
import logoDark from '../../assets/2.png';

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isHelpOpen, setIsHelpOpen] = React.useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleHelp = (e) => {
        e.preventDefault();
        setIsHelpOpen(!isHelpOpen);
        if (isMenuOpen) setIsMenuOpen(false);
    };

    return (
        <>
            <nav className={styles.navbar}>
                <div className={styles.container}>
                    <Link to="/" className={styles.logo}>
                        <img src={theme === 'light' ? logoLight : logoDark} alt="Bit Prompt Studio" className={styles.logoIcon} />
                        <span className={styles.logoText}>Bit Prompt Studio</span>
                    </Link>

                    <div className={styles.links}>
                        {/* <a href="#" className={styles.link}>Features</a>
                        <a href="#" className={styles.link}>Use Cases</a>
                        <a href="#" className={styles.link}>Pricing</a>
                        <a href="#" className={styles.link}>Enterprise</a> */}
                    </div>

                    <div className={styles.actions}>
                        <button
                            onClick={toggleTheme}
                            className={styles.themeToggle}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-main)', display: 'flex', alignItems: 'center', padding: '0.5rem' }}
                            aria-label="Toggle theme"
                        >
                            <span className="material-icons">
                                {theme === 'light' ? 'dark_mode' : 'light_mode'}
                            </span>
                        </button>
                        <button onClick={toggleHelp} className={styles.link} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', padding: '0' }}>
                            Ayuda
                        </button>
                        <Link to="/login" className={styles.link}>Log in</Link>
                        {/* <Link to="/signup">
                            <Button>Get Started</Button>
                        </Link> */}
                    </div>

                    <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ''}`} onClick={toggleMenu}>
                        <span className="material-icons">{isMenuOpen ? 'close' : 'menu'}</span>
                    </div>

                    {isMenuOpen && (
                        <div className={styles.mobileDropdown}>
                            {/* <a href="#" className={styles.mobileLink}>Features</a>
                        <a href="#" className={styles.mobileLink}>Use Cases</a>
                        <a href="#" className={styles.mobileLink}>Pricing</a>
                        <a href="#" className={styles.mobileLink}>Enterprise</a> */}
                            <button
                                onClick={toggleHelp}
                                className={styles.mobileLink}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', width: '100%' }}
                            >
                                Ayuda
                            </button>
                            <Link to="/login" className={styles.mobileLink}>Log in</Link>
                            {/* <Link to="/signup">
                            <Button className={styles.mobileCta}>Get Started</Button>
                        </Link> */}
                        </div>
                    )}
                </div>
            </nav>

            <Modal isLoggedIn={false} isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} title="Ayuda">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <p>El proyecto BIT PROMPT Studio se encarga del manejo de prompts.</p>
                    <a
                        href="https://registro-actividades.grupobusiness.it/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: '500' }}
                    >
                        https://registro-actividades.grupobusiness.it/
                    </a>
                </div>
            </Modal>
        </>
    );
};

export default Navbar;
