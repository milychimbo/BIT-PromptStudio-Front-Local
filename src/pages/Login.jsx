import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMsal, useIsAuthenticated } from '@azure/msal-react';
import { loginRequest } from '../authConfig';
import Button from '../components/common/Button';
import styles from './Login.module.css';
import { useTheme } from '../context/ThemeContext';
import logoLight from '../assets/1.png';
import logoDark from '../assets/2.png';

const Login = () => {
    const { theme } = useTheme();
    const { instance } = useMsal();
    const isAuthenticated = useIsAuthenticated();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/hub');
        }
    }, [isAuthenticated, navigate]);

    const handleLogin = (e) => {
        e.preventDefault();
        instance.loginRedirect(loginRequest).catch(e => {
            console.error(e);
        });
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
                        <div style={{ padding: '0 2rem' }}>
                            <p style={{ textAlign: 'center', marginBottom: '2rem', color: '#666' }}>
                                Accede con tu cuenta corporativa de Microsoft
                            </p>
                            <Button
                                type="button"
                                onClick={handleLogin}
                                className="w-full justify-center"
                                style={{ width: '100%', marginBottom: '1rem' }}
                            >
                                <span className="material-icons" style={{ marginRight: '0.5rem' }}>login</span>
                                Iniciar Sesión con Microsoft
                            </Button>
                        </div>

                        {/* 
                        <div className={styles.divider}>
                            <span className={styles.dividerText}>O continúa con</span>
                        </div>

                        <button type="button" className={styles.googleBtn}>
                            <span style={{ marginRight: '0.5rem', fontWeight: 'bold' }}>G</span> Iniciar sesión con Google
                        </button>
                        */}
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
