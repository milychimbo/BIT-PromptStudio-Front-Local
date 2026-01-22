import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useMsal, useIsAuthenticated } from '@azure/msal-react';
import { useTheme } from '../../context/ThemeContext';
import logoLight from '../../assets/1.png';
import logoDark from '../../assets/2.png';
import Button from '../common/Button';
import styles from './Sidebar.module.css';

const Sidebar = ({ isOpen, onClose }) => {
    const { accounts } = useMsal();
    const isAuthenticated = useIsAuthenticated();
    const { theme } = useTheme();

    const user = isAuthenticated && accounts[0] ? {
        name: accounts[0].name,
        email: accounts[0].username,
        avatar: null // MSAL doesn't give avatar URL directly without Graph call
    } : null;

    const sidebarClass = `${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`;

    return (
        <aside className={sidebarClass}>

            <div className={styles.header}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', color: 'inherit' }}>
                    <img src={theme === 'light' ? logoLight : logoDark} alt="Bit Prompt Studio" className={styles.logoIcon} />
                    <h1 className={styles.title}>Bit Prompt Studio</h1>
                </Link>
            </div>

            <div className={styles.createButtonWrapper}>
                <Button to="/editor" className={styles.createButton}>
                    <span className="material-icons">add</span> Nuevo Prompt
                </Button>
            </div>

            <nav className={styles.nav}>
                {/* <NavLink to="/dashboard" className={({ isActive }) => `${styles.link} ${isActive ? styles.linkActive : ''}`}>
                    <span className="material-icons">dashboard</span> Dashboard
                </NavLink>
                <NavLink to="/library" className={({ isActive }) => `${styles.link} ${isActive ? styles.linkActive : ''}`}>
                    <span className="material-icons">library_books</span> My Prompts
                </NavLink>
                <NavLink to="/collections" className={({ isActive }) => `${styles.link} ${isActive ? styles.linkActive : ''}`}>
                    <span className="material-icons">category</span> Collections
                </NavLink>
                <NavLink to="/analytics" className={({ isActive }) => `${styles.link} ${isActive ? styles.linkActive : ''}`}>
                    <span className="material-icons">analytics</span> Analytics
                </NavLink>
                <NavLink to="/team" className={({ isActive }) => `${styles.link} ${isActive ? styles.linkActive : ''}`}>
                    <span className="material-icons">group</span> Team
                </NavLink> */}
            </nav>

            <div className={styles.footer}>
                {/* <div className={styles.link} style={{ marginBottom: '0.5rem', cursor: 'pointer' }}>
                    <span className="material-icons">settings</span> Settings
                </div> */}
                {user && (
                    <div className={styles.userProfile}>
                        {user.avatar ? (
                            <img src={user.avatar} alt="User" style={{ width: '2rem', height: '2rem', borderRadius: '50%' }} />
                        ) : (
                            <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', backgroundColor: '#EA580C', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                                {user.name.charAt(0)}
                            </div>
                        )}
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontWeight: 500, fontSize: '0.875rem', color: 'var(--text-main)' }}>{user.name}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Pro Plan</div>
                        </div>
                    </div>
                )}
            </div>
        </aside>
    );
};

export default Sidebar;
