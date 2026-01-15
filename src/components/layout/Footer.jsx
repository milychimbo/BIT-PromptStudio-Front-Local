import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    <div className={styles.brand}>
                        <div className={styles.logo}>Bit Prompt Studio</div>
                        <p className={styles.desc}>
                            The ultimate toolkit for the AI-native developer. Manage prompts, test models, and deploy with confidence.
                        </p>
                    </div>

                    <div className={styles.column}>
                        <h4>Product</h4>
                        <ul>
                            <li><a href="#">Features</a></li>
                            <li><a href="#">Integrations</a></li>
                            <li><a href="#">Pricing</a></li>
                            <li><a href="#">Changelog</a></li>
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <h4>Resources</h4>
                        <ul>
                            <li><a href="#">Documentation</a></li>
                            <li><a href="#">API Reference</a></li>
                            <li><a href="#">Community</a></li>
                            <li><a href="#">Blog</a></li>
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <h4>Company</h4>
                        <ul>
                            <li><a href="#">About</a></li>
                            <li><a href="#">Careers</a></li>
                            <li><a href="#">Legal</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p>© 2023 Bit Prompt Studio. All rights reserved.</p>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
