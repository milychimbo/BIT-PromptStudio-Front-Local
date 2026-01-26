import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import { useTheme } from '../context/ThemeContext';
import Sidebar from '../components/layout/Sidebar';
import styles from './Hub.module.css';
import { getPrompts } from '../services/api';

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
    const [prompts, setPrompts] = React.useState([]);

    React.useEffect(() => {
        const fetchPrompts = async () => {
            try {
                const result = await getPrompts();
                if (result && Array.isArray(result.data)) {
                    setPrompts(result.data);
                } else if (Array.isArray(result)) {
                    setPrompts(result);
                } else {
                    setPrompts([]);
                }
            } catch (e) {
                console.error("Failed to load prompts", e);
                setPrompts([]);
            }
        };
        fetchPrompts();
    }, []);

    return (
        <div className={styles.container}>
            {/* Section 1: Sidebar */}
            <Sidebar />

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
                        {prompts.map(prompt => (
                            <div key={prompt.id} className={styles.promptCard}>
                                {/* Left: Info */}
                                <div className={styles.cardLeft}>
                                    <h3 className={styles.promptTitle}>{prompt.title}</h3>
                                    <p className={styles.promptDesc}>{prompt.description}</p>
                                    <div className={styles.promptAuthor}>
                                        <div className={styles.authorAvatar}></div>
                                        <span>{prompt.creatorName}</span>
                                    </div>
                                </div>

                                {/* Center: Tags */}
                                <div className={styles.cardCenter}>
                                    {prompt.tags && prompt.tags.map((tag, idx) => (
                                        <span key={idx} className={styles.tag}>{tag.name || tag}</span>
                                    ))}
                                </div>

                                {/* Right: Metrics & Actions */}
                                <div className={styles.cardRight}>
                                    <div className={styles.metric}>
                                        <span className="material-icons" style={{ fontSize: '1rem', marginRight: '0.25rem' }}>star</span>
                                        <span className={styles.rating}>{prompt.bestVersionScore}</span>%
                                    </div>
                                    {/*<div className={styles.metric}>
                                        <span className="material-icons" style={{ fontSize: '1rem', marginRight: '0.25rem' }}>thumb_up</span>
                                        {prompt.likes}
                                    </div>*/}
                                    <div className={styles.metric}>
                                        <span className="material-icons" style={{ fontSize: '1rem', marginRight: '0.25rem' }}>visibility</span>
                                        {prompt.viewCount}
                                    </div>
                                    <div className={styles.metric}>
                                        <span className="material-icons" style={{ fontSize: '1rem', marginRight: '0.25rem' }}>download</span>
                                        {prompt.useCount}
                                    </div>
                                    {isAuthenticated && (
                                        <>
                                            <button className={styles.editBtn}>
                                                <span className="material-icons" style={{ fontSize: '1.25rem' }}>edit</span>
                                            </button>
                                        </>
                                    )}

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
