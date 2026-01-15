import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { fixPrompt } from '../services/api';
import Styles from './PromptEditor.module.css';

const PromptEditor = () => {
    const [promptText, setPromptText] = useState('');
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [lastAnalyzedPrompt, setLastAnalyzedPrompt] = useState('');
    const [promptName, setPromptName] = useState('Nombre del Prompt');

    const getColorForScore = (score) => {
        if (score >= 80) return 'bgGreen';
        if (score >= 60) return 'bgLightGreen';
        if (score >= 40) return 'bgYellow';
        if (score >= 20) return 'bgOrange';
        return 'bgRed';
    };

    // Reset results when prompt is edited
    useEffect(() => {
        if (promptText !== lastAnalyzedPrompt && results) {
            setResults(null);
        }
    }, [promptText, lastAnalyzedPrompt, results]);

    const handleCheck = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fixPrompt(promptText);

            // Map API response to UI format
            const anatomia = response.analisis_anatomia;
            const metrics = [
                { label: 'Rol', score: anatomia.rol.porcentaje, color: getColorForScore(anatomia.rol.porcentaje) },
                { label: 'Objetivo', score: anatomia.objetivo.porcentaje, color: getColorForScore(anatomia.objetivo.porcentaje) },
                { label: 'Alcance', score: anatomia.alcance.porcentaje, color: getColorForScore(anatomia.alcance.porcentaje) },
                { label: 'Tono', score: anatomia.tono.porcentaje, color: getColorForScore(anatomia.tono.porcentaje) },
                { label: 'Estructura', score: anatomia.estructura.porcentaje, color: getColorForScore(anatomia.estructura.porcentaje) },
                { label: 'Herramientas', score: anatomia.uso_herramientas.porcentaje, color: getColorForScore(anatomia.uso_herramientas.porcentaje) },
                { label: 'Detalle', score: anatomia.nivel_detalle.porcentaje, color: getColorForScore(anatomia.nivel_detalle.porcentaje) },
                { label: 'Interacción', score: anatomia.interaccion_cierre.porcentaje, color: getColorForScore(anatomia.interaccion_cierre.porcentaje) },
            ];

            const score = response.porcentaje_calidad;
            let verdict = 'Medio';
            let gradeColor = 'gradeYellow';

            if (score < 30) {
                verdict = 'Bajo';
                gradeColor = 'gradeRed';
            } else if (score >= 80) {
                verdict = 'Alto';
                gradeColor = 'gradeGreen';
            }

            setResults({
                metrics,
                totalScore: score,
                verdict: verdict,
                gradeColor: gradeColor,
                tips: response.sugerencias.join('\n'),
                improvedPrompt: response.prompt_mejorado,
                problems: response.problemas_detectados
            });
            setLastAnalyzedPrompt(promptText); // Track the analyzed prompt
            setPromptName(response.nombre_prompt || 'Nombre del Prompt'); // Update prompt name from API
        } catch (err) {
            setError('Error al analizar el prompt. Por favor, verifica la conexión con el servidor.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const showToastNotification = (message) => {
        setToastMessage(message);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 1000);
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(promptText);
            showToastNotification('Copiado');
        } catch (err) {
            console.error('Error al copiar:', err);
            showToastNotification('Error al copiar');
        }
    };

    const handleImprove = () => {
        if (results && results.improvedPrompt) {
            setShowModal(true);
        } else {
            showToastNotification('Analiza primero');
        }
    };

    const confirmImprove = () => {
        setPromptText(results.improvedPrompt);
        setShowModal(false);
        showToastNotification('Prompt mejorado');
    };

    const handleDownload = () => {
        const blob = new Blob([promptText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'prompt.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        showToastNotification('Descargado');
    };

    const handleReset = () => {
        setPromptText('');
        setResults(null);
        setError(null);
        setLoading(false);
        setPromptName('Nombre del Prompt');
        setLastAnalyzedPrompt('');
        showToastNotification('Editor reiniciado');
    };

    return (
        <DashboardLayout>
            <div className={Styles.container}>
                {/* Main Editor Area */}
                <div className={Styles.mainArea}>
                    <div className={Styles.header}>
                        <div className={Styles.title}>{promptName}</div>
                        <div className={Styles.meta}>
                            Autor: <span className={Styles.author}>Emily Chimbo</span>
                        </div>
                        {/* <div className={Styles.meta}>
                            Descripción: Este es un prompt diseñado para generar Scripts de prueba a partir del DEF. :.......
                        </div> */}
                    </div>

                    <div style={{ marginBottom: '0.25rem', fontSize: '0.875rem', fontWeight: 600 }}>Prompt:</div>
                    <div className={Styles.editorSection}>
                        <textarea
                            className={Styles.editorTextarea}
                            value={promptText}
                            onChange={(e) => setPromptText(e.target.value)}
                            placeholder="Ingresa tu prompt aquí..."
                        />
                    </div>

                    <div className={Styles.actionButtons}>
                        <button
                            className={Styles.btnReset}
                            onClick={handleReset}
                            title="Reiniciar editor"
                        >
                            <span className="material-icons">refresh</span>
                        </button>
                        <button
                            className={Styles.btnCheck}
                            onClick={handleCheck}
                            disabled={loading}
                        >
                            {loading ? 'Analizando...' : 'Check'}
                        </button>
                        <button
                            className={Styles.btnSave}
                            onClick={handleImprove}
                            disabled={!results}
                        >
                            Mejorar
                        </button>
                        <button className={Styles.btnSave}>Guardar</button>
                    </div>

                    <div className={Styles.bottomToolbar}>
                        <button className={Styles.toolbarBtn} onClick={handleCopy}>COPIAR</button>
                        <button className={Styles.toolbarBtn} onClick={handleDownload}>DESCARGAR</button>
                    </div>
                </div>

                {/* Sidebar Results */}
                <div className={Styles.sidebar}>
                    <div className={Styles.resultsPanel}>
                        <div className={Styles.resultsHeader}>
                            <span className="material-icons" style={{ fontSize: '1.25rem', marginRight: '0.5rem' }}>insights</span>
                            Análisis del Prompt
                        </div>
                        {error && (
                            <div style={{ padding: '1rem', color: '#cc0000', fontSize: '0.875rem' }}>
                                {error}
                            </div>
                        )}
                        {loading && (
                            <div style={{ padding: '2rem', textAlign: 'center', color: '#888', fontStyle: 'italic' }}>
                                Analizando prompt...
                            </div>
                        )}
                        {results && !loading && (
                            <div className={Styles.metricList}>
                                {results.metrics.map((metric, index) => (
                                    <div key={index} className={Styles.metricRow}>
                                        <div className={Styles.metricLabel}>{metric.label}</div>
                                        <div className={`${Styles.metricBarContainer} ${Styles[metric.color]}`}>
                                            {metric.score}%
                                        </div>
                                    </div>
                                ))}
                                <div className={Styles.gradeBox}>
                                    <div className={Styles.gradeLabel}>Calificación Final</div>
                                    <div className={`${Styles.gradeResult} ${Styles[results.gradeColor]}`}>
                                        <div className={Styles.gradeScore}>{results.totalScore}%</div>
                                        <div className={Styles.gradeVerdict}>{results.verdict}</div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {!results && !loading && !error && (
                            <div style={{ padding: '2rem', textAlign: 'center', color: '#888', fontStyle: 'italic' }}>
                                Click "Check" to analyze prompt
                            </div>
                        )}
                    </div>

                    <div className={Styles.tipsPanel}>
                        <div className={Styles.tipsTitle}>
                            <span className="material-icons" style={{ fontSize: '1rem', marginRight: '0.5rem' }}>lightbulb</span>
                            Tips
                        </div>
                        {results && results.tips && (
                            <div className={Styles.tipsMessages}>
                                {results.tips.split('\n').filter(tip => tip.trim()).map((tip, index) => (
                                    <div key={index} className={Styles.tipBubble}>
                                        <div className={Styles.tipIcon}>💡</div>
                                        <div className={Styles.tipText}>{tip}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                        {!results && (
                            <div className={Styles.tipsPlaceholder}>
                                Las sugerencias aparecerán aquí después del análisis
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Toast Notification */}
            {showToast && (
                <div className={Styles.toast}>
                    {toastMessage}
                </div>
            )}

            {/* Modal for Improve Confirmation */}
            {showModal && (
                <div className={Styles.modalOverlay} onClick={() => setShowModal(false)}>
                    <div className={Styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <h3 className={Styles.modalTitle}>¿Aplicar prompt mejorado?</h3>
                        <p className={Styles.modalText}>
                            Esto reemplazará tu prompt actual con la versión mejorada sugerida por el análisis.
                        </p>
                        <div className={Styles.modalActions}>
                            <button className={Styles.modalBtnCancel} onClick={() => setShowModal(false)}>
                                Cancelar
                            </button>
                            <button className={Styles.modalBtnConfirm} onClick={confirmImprove}>
                                Aplicar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
};

export default PromptEditor;
