import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import { useTheme } from '../context/ThemeContext';
import styles from './Hub.module.css';
import logoLight from '../assets/1.png';
import logoDark from '../assets/2.png';

const Hub = () => {
    const { theme } = useTheme();
    const isAuthenticated = useIsAuthenticated();
    const { instance } = useMsal();
    const navigate = useNavigate();

    const handleLogout = () => {
        instance.logoutRedirect({
            postLogoutRedirectUri: "/",
        });
    };

    const [filterType, setFilterType] = React.useState('Nombre');

    const topPrompts = [
        {
            id: 1,
            title: "SEO Blog Post Generator",
            desc: "Create comprehensive SEO-optimized blog posts with keyword integration.",
            author: "Emily Chimbo",
            tags: ["Marketing", "SEO", "Content"],
            rating: 4.8,
            likes: 1240,
            views: "5.2k",
            downloads: 856
        },
        {
            id: 2,
            title: "Python API Refactor Assistant",
            desc: "Expertly refactor Python legacy code to modern standards.",
            author: "Johann Calva",
            tags: ["Dev", "Python", "Clean Code"],
            rating: 4.9,
            likes: 980,
            views: "3.1k",
            downloads: 620
        },
        {
            id: 3,
            title: "React Component Unit Tester",
            desc: "Generate Jest + Testing Library test cases instantly.",
            author: "Dev Team",
            tags: ["React", "Testing", "Javascript"],
            rating: 4.5,
            likes: 750,
            views: "2.8k",
            downloads: 410
        },
        {
            id: 4,
            title: "Data Analysis SQL Helper",
            desc: "Convert plain English questions into complex SQL queries.",
            author: "Data Squad",
            tags: ["Data", "SQL", "Analytics"],
            rating: 4.7,
            likes: 620,
            views: "2.5k",
            downloads: 380
        }
    ];

    return (
        <div className={styles.container}>
            {/* Section 1: Sidebar */}
            <aside className={styles.sidebar}>
                <Link to="/" className={styles.logoArea}>
                    <img src={theme === 'light' ? logoLight : logoDark} alt="Bit Prompt Studio" className={styles.logoIcon} />
                </Link>

                <nav className={styles.nav}>
                    {isAuthenticated && (
                        <>
                            <button className={styles.navButton} onClick={() => navigate('/editor')}>
                                <span className="material-icons">add</span>
                                Nuevo Prompt
                            </button>
                            <button className={styles.navButton}>
                                <span className="material-icons">folder_special</span>
                                Mis Prompts
                            </button>
                        </>
                    )}
                    <button className={styles.navButton}>
                        <span className="material-icons">library_books</span>
                        Biblioteca
                    </button>
                </nav>

                {isAuthenticated && (
                    <div style={{ padding: '1rem', marginTop: 'auto', borderTop: '1px solid var(--color-border-light)' }}>
                        <button
                            className={styles.navButton}
                            onClick={handleLogout}
                            style={{ color: '#ef4444' }} // Red color for logout
                        >
                            <span className="material-icons">logout</span>
                            Cerrar Sesión
                        </button>
                    </div>
                )}
            </aside>

            {/* Main Content (Sections 2 & 3) */}
            <main className={styles.mainContent}>

                {/* Section 2: Chat (Visual) */}
                <section className={styles.chatSection}>
                    <div className={styles.chatMessages}>
                        <div className={styles.welcomeMessage}>
                            <h2 className={styles.welcomeTitle}>Bienvenido a Bit Prompt Studio</h2>
                            <p className={styles.welcomeSubtitle}>¿En qué puedo ayudarte hoy?</p>
                        </div>
                    </div>

                    <div className={styles.chatInputArea}>
                        <div className={styles.inputWrapper}>
                            <select
                                className={styles.filterSelect}
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                            >
                                <option value="Nombre">Nombre</option>
                                <option value="Tag">Tag</option>
                                <option value="Autor">Autor</option>
                            </select>
                            <input
                                type="text"
                                className={styles.chatInput}
                                placeholder="Busca un prompt a tu medida..."
                            />
                            <button className={styles.sendBtn}>
                                <span className="material-icons">arrow_upward</span>
                            </button>
                        </div>
                    </div>
                </section>

                {/* Section 3: Top Prompts */}
                <section className={styles.topPromptsSection}>
                    <div className={styles.sectionHeader}>
                        <span className="material-icons" style={{ color: 'var(--color-primary)' }}>trending_up</span>
                        Top Prompts
                    </div>

                    <div className={styles.promptsList}>
                        {topPrompts.map(prompt => (
                            <div key={prompt.id} className={styles.promptCard}>
                                {/* Left: Info */}
                                <div className={styles.cardLeft}>
                                    <h3 className={styles.promptTitle}>{prompt.title}</h3>
                                    <p className={styles.promptDesc}>{prompt.desc}</p>
                                    <div className={styles.promptAuthor}>
                                        <div className={styles.authorAvatar}></div>
                                        <span>{prompt.author}</span>
                                    </div>
                                </div>

                                {/* Center: Tags */}
                                <div className={styles.cardCenter}>
                                    {prompt.tags.map((tag, idx) => (
                                        <span key={idx} className={styles.tag}>{tag}</span>
                                    ))}
                                </div>

                                {/* Right: Metrics & Actions */}
                                <div className={styles.cardRight}>
                                    <div className={styles.metric}>
                                        <span className="material-icons" style={{ fontSize: '1rem', marginRight: '0.25rem' }}>star</span>
                                        <span className={styles.rating}>{prompt.rating}</span>/5
                                    </div>
                                    <div className={styles.metric}>
                                        <span className="material-icons" style={{ fontSize: '1rem', marginRight: '0.25rem' }}>thumb_up</span>
                                        {prompt.likes}
                                    </div>
                                    <div className={styles.metric}>
                                        <span className="material-icons" style={{ fontSize: '1rem', marginRight: '0.25rem' }}>visibility</span>
                                        {prompt.views}
                                    </div>
                                    <div className={styles.metric}>
                                        <span className="material-icons" style={{ fontSize: '1rem', marginRight: '0.25rem' }}>download</span>
                                        {prompt.downloads}
                                    </div>

                                    <button className={styles.editBtn}>
                                        <span className="material-icons" style={{ fontSize: '1.25rem' }}>edit</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </main>
        </div>
    );
};

export default Hub;
