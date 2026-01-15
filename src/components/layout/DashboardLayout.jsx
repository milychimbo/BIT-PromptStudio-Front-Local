import React, { useState } from 'react';
import Sidebar from './Sidebar';
import styles from './DashboardLayout.module.css';

const DashboardLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className={styles.container}>
            {/* Mobile Header */}
            <header className={styles.mobileHeader}>
                <div className={styles.mobileLogo}>
                    <div className={styles.logoIcon}>B</div>
                    <span className={styles.mobileTitle}>Bit Prompt Studio</span>
                </div>
                <button className={styles.menuButton} onClick={toggleSidebar}>
                    <span className="material-icons">{isSidebarOpen ? 'close' : 'menu'}</span>
                </button>
            </header>

            {/* Sidebar with mobile state */}
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div className={styles.overlay} onClick={() => setIsSidebarOpen(false)} />
            )}

            <main className={styles.main}>
                <div className={styles.content}>
                    {children}
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
