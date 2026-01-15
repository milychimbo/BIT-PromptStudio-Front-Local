import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import Button from '../components/common/Button';
import styles from './PromptLibrary.module.css';

const PromptLibrary = () => {
    const prompts = [
        { id: 1, name: "SEO Article Generator", desc: "Generates SEO-optimized articles based on keywords and tone.", category: "Marketing", updated: "2h ago" },
        { id: 2, name: "Python Refactor", desc: "Refactors Python code to follow PEP8 and improve performance.", category: "Dev", updated: "1d ago" },
        { id: 3, name: "Email Cold Outreach", desc: "Drafts personalized cold emails to prospects.", category: "Sales", updated: "3d ago" },
        { id: 4, name: "SQL Query Builder", desc: "Translates natural language to complex SQL queries.", category: "Data", updated: "4d ago" },
        { id: 5, name: "Unit Test Writer", desc: "Generates Jest unit tests for React components.", category: "Dev", updated: "1w ago" },
    ];

    return (
        <DashboardLayout>
            <div className={styles.header}>
                <h2 className={styles.title}>Your Library</h2>
                <div className={styles.controls}>

                    <Button variant="ghost">Filter</Button>

                    <Button to="/editor">
                        <span className="material-icons" style={{ marginRight: '0.5rem' }}>add</span>
                        New Prompt
                    </Button>
                </div>
            </div>

            <div className={styles.grid}>
                {prompts.map(prompt => (
                    <div key={prompt.id} className={styles.card}>
                        <div className={styles.cardHeader}>
                            <div className={styles.icon}>
                                <span className="material-icons">auto_awesome</span>
                            </div>
                            <span className={styles.badge}>{prompt.category}</span>
                        </div>
                        <h3 className={styles.name}>{prompt.name}</h3>
                        <p className={styles.desc}>{prompt.desc}</p>
                        <div className={styles.meta}>
                            <span>Updated {prompt.updated}</span>
                            <span>v1.0</span>
                        </div>
                    </div>
                ))}
            </div>
        </DashboardLayout>
    );
};

export default PromptLibrary;
