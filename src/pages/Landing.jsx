import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/common/Button';
import styles from './Landing.module.css';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import logoLight from '../assets/1.png';
import logoDark from '../assets/2.png';

const Landing = () => {
    const { theme } = useTheme();
    return (
        <div className="landing-page">
            <Navbar />

            <main>
                {/* Hero Section */}
                <section className={styles.hero}>
                    <div className={styles.heroGradient}></div>
                    <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                        <div className={styles.newBadge}>
                            <span className={styles.newBadgeDot}></span>
                            New: Version 2.0 Released
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <img src={theme === 'light' ? logoLight : logoDark} alt="Bit Prompt Studio" style={{ height: '12rem', width: 'auto' }} />
                        </div>

                        <h1 className={styles.title}>
                            Domina tus <span className={styles.highlight}>Prompts de IA</span> <br /> como un experto.
                        </h1>

                        <p className={styles.subtitle}>
                            Gestiona, versiona y prueba prompts de IA como código. Colabora con tu equipo y lleva tus prompts a nivel profesional.
                        </p>

                        <div className={styles.heroButtons}>
                            {/* <Link to="/signup">
                                <Button variant="primary" style={{ fontSize: '1.125rem', padding: '0.75rem 2rem' }}>
                                    Start Building Free
                                </Button>
                            </Link>
                            <Button variant="ghost" style={{ fontSize: '1.125rem', padding: '0.75rem 2rem', border: '1px solid var(--border-current)' }}>
                                Watch Demo
                            </Button> */}
                        </div>
                    </div>
                </section>

                {/* Value Proposition Section */}
                <section className={styles.section} style={{ backgroundColor: 'var(--surface-current)' }}>
                    <div className="container">
                        <div className={styles.sectionTitle}>
                            <h2 className={styles.sectionHeading}>¿Por qué usar Bit Prompt Studio y no solo una IA tradicional?</h2>
                        </div>

                        {/* Problem Statement */}
                        <div style={{ maxWidth: '800px', margin: '0 auto 4rem auto', textAlign: 'center' }}>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-main)' }}>El problema de usar IA sin estructura</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem', lineHeight: '1.7' }}>
                                Las IAs generativas son potentes, pero no entienden los lineamientos internos de tu empresa, tu arquitectura, ni tus estándares de calidad.
                                Un prompt incompleto o mal diseñado produce respuestas inconsistentes, código que no cumple normas internas y resultados que requieren múltiples iteraciones.
                            </p>
                        </div>

                        {/* Comparison Graphics */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '5rem' }}>
                            {/* Bad Prompt Card */}
                            <div style={{ padding: '2.5rem', borderRadius: '1.5rem', background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)', position: 'relative', overflow: 'hidden' }}>
                                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: '#ef4444' }}></div>
                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem', color: '#ef4444' }}>
                                    <span className="material-icons" style={{ fontSize: '2.5rem', marginRight: '1rem' }}>error_outline</span>
                                    <div>
                                        <div style={{ textTransform: 'uppercase', fontSize: '0.875rem', fontWeight: '600', opacity: 0.8 }}>Sin estructura</div>
                                        <h3 style={{ fontWeight: 'bold', fontSize: '1.5rem', margin: 0 }}>Prompt Incompleto</h3>
                                    </div>
                                </div>
                                <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-muted)', fontSize: '1.125rem' }}>
                                    <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'start' }}><span className="material-icons" style={{ fontSize: '1.5rem', marginRight: '0.75rem', color: '#ef4444' }}>close</span>Ambiguo o genérico</li>
                                    <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'start' }}><span className="material-icons" style={{ fontSize: '1.5rem', marginRight: '0.75rem', color: '#ef4444' }}>close</span>No define contexto ni rol</li>
                                    <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'start' }}><span className="material-icons" style={{ fontSize: '1.5rem', marginRight: '0.75rem', color: '#ef4444' }}>close</span>Ignora estándares</li>
                                    <li style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'start' }}><span className="material-icons" style={{ fontSize: '1.5rem', marginRight: '0.75rem', color: '#ef4444' }}>close</span>Resultados impredecibles</li>
                                </ul>
                                <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', fontWeight: '600', fontSize: '1.125rem' }}>
                                    Resultado: Corrección manual y pérdida de tiempo.
                                </div>
                            </div>

                            {/* Good Prompt Card */}
                            <div style={{ padding: '2.5rem', borderRadius: '1.5rem', background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.3)', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 40px -10px rgba(16, 185, 129, 0.1)' }}>
                                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: '#10b981' }}></div>
                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem', color: '#10b981' }}>
                                    <span className="material-icons" style={{ fontSize: '2.5rem', marginRight: '1rem' }}>verified</span>
                                    <div>
                                        <div style={{ textTransform: 'uppercase', fontSize: '0.875rem', fontWeight: '600', opacity: 0.8 }}>Con Bit Prompt Studio</div>
                                        <h3 style={{ fontWeight: 'bold', fontSize: '1.5rem', margin: 0 }}>Prompt Profesional</h3>
                                    </div>
                                </div>
                                <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-muted)', fontSize: '1.125rem' }}>
                                    <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'start' }}><span className="material-icons" style={{ fontSize: '1.5rem', marginRight: '0.75rem', color: '#10b981' }}>check</span>Contexto, objetivo y rol definidos</li>
                                    <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'start' }}><span className="material-icons" style={{ fontSize: '1.5rem', marginRight: '0.75rem', color: '#10b981' }}>check</span>Lineamientos técnicos incluidos</li>
                                    <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'start' }}><span className="material-icons" style={{ fontSize: '1.5rem', marginRight: '0.75rem', color: '#10b981' }}>check</span>Versionado y probado</li>
                                    <li style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'start' }}><span className="material-icons" style={{ fontSize: '1.5rem', marginRight: '0.75rem', color: '#10b981' }}>check</span>Reutilizable y consistente</li>
                                </ul>
                                <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid rgba(16, 185, 129, 0.3)', color: '#10b981', fontWeight: '600', fontSize: '1.125rem' }}>
                                    Resultado: Respuestas precisas y listas para usar.
                                </div>
                            </div>
                        </div>

                        {/* Benefits Grid */}
                        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                            <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Cómo Bit Prompt Studio mejora el uso de la IA</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem' }}>Bit Prompt Studio no reemplaza a la IA, la potencia.</p>
                        </div>

                        <div className={styles.grid}>
                            <FeatureCard icon="tune" title="Estandarización" desc="Define prompts profesionales según los lineamientos exactos de tu empresa." />
                            <FeatureCard icon="history" title="Versionado y Pruebas" desc="Prueba y versiona prompts antes de usarlos en producción." />
                            <FeatureCard icon="hub" title="Centralización" desc="Centraliza el conocimiento del equipo y evita errores repetidos." />
                            <FeatureCard icon="trending_up" title="Productividad Real" desc="Reduce iteraciones y retrabajo. Convierte prompts en activos." />
                        </div>

                        {/* Stats Section */}
                        <div style={{ marginTop: '5rem', marginBottom: '5rem' }}>
                            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                                <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Impacto Medible en Datos Reales</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem' }}>La ingeniería de prompts no es solo "pedirle cosas a la IA". Es una disciplina técnica.</p>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                                <div style={{ padding: '2rem', borderRadius: '1rem', background: 'var(--bg-card)', border: '1px solid var(--border-current)', textAlign: 'center' }}>
                                    <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--primary-color)', marginBottom: '0.5rem' }}>+40%</div>
                                    <h4 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Aumento de Productividad</h4>
                                    <p style={{ color: 'var(--text-muted)' }}>
                                        "El uso de prompts estructurados puede aumentar la productividad de los desarrolladores entre un 20 % y 40 %."
                                    </p>
                                </div>

                                <div style={{ padding: '2rem', borderRadius: '1rem', background: 'var(--bg-card)', border: '1px solid var(--border-current)', textAlign: 'center' }}>
                                    <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--primary-color)', marginBottom: '0.5rem' }}>45%</div>
                                    <h4 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Mayor Precisión</h4>
                                    <p style={{ color: 'var(--text-muted)' }}>
                                        "Prompts estructurados pueden mejorar la precisión de los resultados de IA hasta en un 45 % frente a prompts libres."
                                    </p>
                                </div>

                                <div style={{ padding: '2rem', borderRadius: '1rem', background: 'var(--bg-card)', border: '1px solid var(--border-current)', textAlign: 'center' }}>
                                    <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--primary-color)', marginBottom: '0.5rem' }}>⚡</div>
                                    <h4 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Máximo Desempeño</h4>
                                    <p style={{ color: 'var(--text-muted)' }}>
                                        "Usuarios con prompts bien optimizados logran resultados más eficientes y de mayor calidad con menos iteraciones."
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div style={{ textAlign: 'center', marginTop: '4rem', marginBottom: '2rem' }}>
                            <h2 className={styles.sectionHeading} style={{ fontSize: '2.5rem', margin: 0, color: 'var(--text-main)' }}>
                                No es otra IA. Es la forma correcta de usarla.
                            </h2>
                        </div>
                    </div>
                </section>


            </main>

            <Footer />
        </div>
    );
};

const FeatureCard = ({ icon, title, desc }) => (
    <div className={styles.featureCard}>
        <div className={styles.featureIcon}>
            <span className="material-icons" style={{ fontSize: '2rem' }}>{icon}</span>
        </div>
        <h4 className={styles.featureTitle}>{title}</h4>
        <p className={styles.featureDesc}>{desc}</p>
    </div>
);

export default Landing;
