import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Hub.module.css'; // Reusing Hub styles
import Sidebar from '../components/layout/Sidebar';
import { getPrompts } from '../services/api';
import { useAuth } from '../context/AuthContext';

const MyPrompts = () => {
    const { user, loading: authLoading } = useAuth(); // Use auth context to get synced user
    const isAuthenticated = !!user;
    const navigate = useNavigate();

    const [prompts, setPrompts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Get current user's DB ID
    const userId = user?.id; // Assumes 'id' is the property name for DB ID

    useEffect(() => {
        if (!isAuthenticated) {
            setLoading(false);
            return;
        }

        const fetchUserPrompts = async () => {
            try {
                setLoading(true);
                // Call API with authorId
                const result = await getPrompts({
                    authorId: userId,
                    page: 1,
                    pageSize: 50 // Fetch more for this view? or default 20
                });

                // API returns { data: [...] } based on example
                if (result && Array.isArray(result.data)) {
                    setPrompts(result.data);
                } else if (Array.isArray(result)) {
                    // Fallback if API changed
                    setPrompts(result);
                } else {
                    setPrompts([]);
                }
            } catch (err) {
                console.error("Error fetching user prompts:", err);
                setError("No se pudieron cargar tus prompts.");
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchUserPrompts();
        }
    }, [isAuthenticated, userId]);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }).format(date);
    };

    return (
        <div className={styles.container}>
            {/* Sidebar Component */}
            <Sidebar />

            {/* Main Content */}
            <main className={styles.mainContent}>

                {/* Mis Prompts Section - reusing topPromptsSection style */}
                <section className={styles.topPromptsSection} style={{ flex: 1, height: '100%' }}>
                    <div className={styles.sectionHeader}>
                        <span className="material-icons" style={{ color: 'var(--color-primary)' }}>folder_special</span>
                        Mis Prompts
                    </div>

                    {loading && <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>Cargando prompts...</div>}

                    {error && <div style={{ padding: '2rem', textAlign: 'center', color: '#ef4444' }}>{error}</div>}

                    {!loading && !error && prompts.length === 0 && (
                        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                            Aún no has creado ningún prompt.
                        </div>
                    )}

                    {!loading && !error && prompts.length > 0 && (
                        <div className={styles.promptsList}>
                            {prompts.map(prompt => (
                                <div key={prompt.id} className={styles.promptCard}>
                                    {/* Left: Info */}
                                    <div className={styles.cardLeft}>
                                        <h3 className={styles.promptTitle}>{prompt.title}</h3>
                                        <p className={styles.promptDesc}>{prompt.description}</p>
                                        <div className={styles.promptAuthor}>
                                            <span className="material-icons" style={{ fontSize: '0.9rem' }}>schedule</span>
                                            <span>Actualizado el {formatDate(prompt.updatedAt)}</span>
                                        </div>
                                    </div>

                                    {/* Center: Tags (if any - structure provides tags: []) */}
                                    <div className={styles.cardCenter}>
                                        {prompt.tags && prompt.tags.map((tag, idx) => (
                                            <span key={idx} className={styles.tag}>{tag.name || tag}</span>
                                        ))}
                                    </div>

                                    {/* Right: Metrics & Actions */}
                                    <div className={styles.cardRight}>
                                        <div className={styles.metric} title="Puntuación">
                                            <span className="material-icons" style={{ fontSize: '1rem', marginRight: '0.25rem' }}>star</span>
                                            <span className={styles.rating}>{prompt.bestVersionScore || 0}</span>%
                                        </div>
                                        <div className={styles.metric} title="Vistas">
                                            <span className="material-icons" style={{ fontSize: '1rem', marginRight: '0.25rem' }}>visibility</span>
                                            {prompt.viewCount || 0}
                                        </div>
                                        <div className={styles.metric} title="Usos">
                                            <span className="material-icons" style={{ fontSize: '1rem', marginRight: '0.25rem' }}>download</span>
                                            {prompt.useCount || 0}
                                        </div>

                                        <button className={styles.editBtn} onClick={() => navigate(`/editor/${prompt.id}`)}>
                                            <span className="material-icons" style={{ fontSize: '1.25rem' }}>edit</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

            </main>
        </div>
    );
};

export default MyPrompts;
