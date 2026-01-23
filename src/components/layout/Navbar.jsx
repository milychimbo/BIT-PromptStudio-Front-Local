import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import styles from './Navbar.module.css';
import { useTheme } from '../../context/ThemeContext';
import logoLight from '../../assets/1.png';
import logoDark from '../../assets/2.png';
import { useMsal, useIsAuthenticated } from '@azure/msal-react';
import { loginRequest } from '../../authConfig';

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const { instance } = useMsal();
    const isAuthenticated = useIsAuthenticated();

    const handleLogin = () => {
        instance.loginRedirect(loginRequest).catch(e => console.log(e));
    };

    const handleLogout = () => {
        instance.logoutRedirect().catch(e => console.log(e));
    };

    const handleGuestLogin = () => {
        navigate('/hub');
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



                        {isAuthenticated ? (
                            <button onClick={handleLogout} className={styles.link} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', padding: '0' }}>
                                Log out
                            </button>
                        ) : (
                            <button onClick={handleLogin} className={styles.link} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', padding: '0' }}>
                                Log in
                            </button>
                        )}
                        <button onClick={handleGuestLogin} className={styles.guestButton}>
                            <span className="material-icons" style={{ fontSize: '1.2rem' }}>person</span>
                            Ingresar como invitado
                        </button>
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
                                onClick={handleGuestLogin}
                                className={styles.guestButton}
                                style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}
                            >
                                <span className="material-icons" style={{ fontSize: '1.2rem' }}>person</span>
                                Ingresar como invitado
                            </button>
                            <Link to="/login" className={styles.mobileLink}>Log in</Link>
                            {/* <Link to="/signup">
                            <Button className={styles.mobileCta}>Get Started</Button>
                        </Link> */}
                        </div>
                    )}
                </div>
            </nav>
        </>
    );
};

export default Navbar;
