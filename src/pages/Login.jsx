import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';
import styles from './Login.module.css';
import { useTheme } from '../context/ThemeContext';
import logoLight from '../assets/1.png';
import logoDark from '../assets/2.png';

const Login = () => {
    const { theme } = useTheme();
    const [email, setEmail] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        login(email);
        navigate('/editor');
    };

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <div className={styles.header}>
                    <div className={styles.logo}>
                        <img src={theme === 'light' ? logoLight : logoDark} alt="Bit Prompt Studio" style={{ height: '4rem', width: 'auto' }} />
                    </div>
                    <h1 className={styles.title}>Bit Prompt Studio</h1>
                    <p className={styles.subtitle}>Plataforma de Gestión de IA Empresarial</p>
                </div>

                <div className={styles.card}>
                    <div className={styles.bar}></div>
                    <div className={styles.cardBody}>
                        <h2 className={styles.formTitle}>Inicia sesión en tu espacio de trabajo</h2>
                        <form onSubmit={handleSubmit}>
                            <div className={styles.formGroup}>
                                <label className={styles.label} htmlFor="email">Correo electrónico de trabajo</label>
                                <div className={styles.inputWrapper}>
                                    <span className={`material-icons ${styles.inputIcon}`}>mail</span>
                                    <input
                                        type="email"
                                        id="email"
                                        className={styles.input}
                                        placeholder="nombre@empresa.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <div className={styles.row}>
                                    <label className={styles.label} htmlFor="password">Contraseña</label>
                                    <a href="#" className={styles.forgot}>¿Olvidaste tu contraseña?</a>
                                </div>
                                <div className={styles.inputWrapper}>
                                    <span className={`material-icons ${styles.inputIcon}`}>lock</span>
                                    <input type="password" id="password" className={styles.input} placeholder="••••••••" />
                                </div>
                            </div>

                            <div className={styles.checkboxRow}>
                                <input type="checkbox" id="remember" className={styles.checkbox} />
                                <label htmlFor="remember" className={styles.checkboxLabel}>Mantener sesión iniciada</label>
                            </div>

                            <Button type="submit" className="w-full justify-center" style={{ width: '100%' }}>
                                Acceder
                                <span className="material-icons" style={{ fontSize: '1rem', marginLeft: '0.5rem' }}>arrow_forward</span>
                            </Button>
                        </form>

                        <div className={styles.divider}>
                            <span className={styles.dividerText}>O continúa con</span>
                        </div>

                        <button type="button" className={styles.googleBtn}>
                            <span style={{ marginRight: '0.5rem', fontWeight: 'bold' }}>G</span> Iniciar sesión con Google
                        </button>
                    </div>
                    <div className={styles.cardFooter}>
                        Protegido por Enterprise SSO. <br />
                        <a href="#" style={{ color: 'var(--text-main)', fontWeight: 500 }}>Contacta a Soporte IT</a> si necesitas acceso.
                    </div>
                </div>

                <div className={styles.footerLinks}>
                    <a href="#">Política de Privacidad</a>
                    <span>•</span>
                    <a href="#">Términos de Servicio</a>
                </div>
            </main>
        </div>
    );
};

export default Login;
