import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import Styles from './Dashboard.module.css';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const { theme, toggleTheme } = useTheme();
    const { user } = useAuth();

    return (
        <DashboardLayout>
            <header className={Styles.header}>
                <div>
                    <h2 className={Styles.pageTitle}>Dashboard</h2>
                    <p className={Styles.pageSubtitle}>Welcome back! Here's what's happening with your prompts.</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.25rem' }}>
                    <div className={Styles.welcomeMessage}>
                        Bienvenido, {user?.name || 'usuario'}
                    </div>
                    <div className={Styles.headerActions}>
                        <div className={Styles.searchWrapper} style={{ flex: 1 }}>
                            <span className="material-icons">search</span>
                            <input type="text" placeholder="Search prompts..." className={Styles.searchInput} />
                        </div>
                        <button className={Styles.iconButton}><span className="material-icons">notifications_none</span></button>
                        <button className={Styles.iconButton} onClick={toggleTheme}>
                            <span className="material-icons">{theme === 'light' ? 'dark_mode' : 'light_mode'}</span>
                        </button>
                    </div>
                </div>

            </header>

            {/* Stats Grid */}
            <div className={Styles.statsGrid}>
                <StatsCard
                    label="Total Prompts"
                    value="1,248"
                    change="+12%"
                    icon="token"
                    color="primary"
                />
                <StatsCard
                    label="Executions this week"
                    value="8,502"
                    change="+5.4%"
                    icon="play_arrow"
                    color="blue"
                />
                <StatsCard
                    label="Active Collections"
                    value="24"
                    change="0%"
                    icon="folder"
                    color="purple"
                />
                <StatsCard
                    label="Favorites"
                    value="128"
                    change="+3 new"
                    icon="star"
                    color="orange"
                />
            </div>

            <div className={Styles.contentGrid}>
                {/* Recent Prompts Table */}
                <div className={Styles.card}>
                    <div className={Styles.cardHeader}>
                        <h3>Recent Prompts</h3>
                        <a href="#" className={Styles.linkPrimary}>View all</a>
                    </div>
                    <table className={Styles.table}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Last Used</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <TableRow name="Customer Support Persona" version="v2.4" category="Support" time="2 hours ago" status="Active" icon="CS" color="blue" />
                            <TableRow name="JSON Structure Validator" version="v1.1" category="Development" time="5 hours ago" status="Active" icon="JS" color="purple" />
                            <TableRow name="Marketing Copy Generator" version="v3.0" category="Marketing" time="Yesterday" status="Draft" icon="M" color="orange" />
                            <TableRow name="SQL Query Helper" version="v1.0" category="Data" time="2 days ago" status="Active" icon="SQ" color="teal" />
                        </tbody>
                    </table>
                </div>

                {/* Categories & Tips */}
                <div className={Styles.sideColumn}>
                    <div className={`${Styles.card} ${Styles.categoriesCard}`}>
                        <h3>Top Categories</h3>
                        <div className={Styles.categoryList}>
                            <CategoryItem name="Coding Assistants" count="342 prompts" percent="45%" icon="code" color="indigo" />
                            <CategoryItem name="Content Writing" count="215 prompts" percent="28%" icon="edit_note" color="pink" />
                            <CategoryItem name="Education" count="120 prompts" percent="15%" icon="school" color="green" />
                            <CategoryItem name="Others" count="85 prompts" percent="12%" icon="more_horiz" color="gray" />
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

const StatsCard = ({ label, value, change, icon, color }) => (
    <div className={Styles.statsCard}>
        <div className={Styles.statsHeader}>
            <div className={`${Styles.iconBox} ${Styles['icon-' + color]}`}>
                <span className="material-icons">{icon}</span>
            </div>
            <span className={Styles.changeBadge}>{change}</span>
        </div>
        <div className={Styles.statsValue}>{value}</div>
        <div className={Styles.statsLabel}>{label}</div>
    </div>
);

const TableRow = ({ name, version, category, time, status, icon, color }) => (
    <tr>
        <td>
            <div className={Styles.nameCell}>
                <div className={`${Styles.avatar} ${Styles['avatar-' + color]}`}>{icon}</div>
                <div>
                    <div className={Styles.pName}>{name}</div>
                    <div className={Styles.pVersion}>{version}</div>
                </div>
            </div>
        </td>
        <td><span className={Styles.badge}>{category}</span></td>
        <td className={Styles.mutedText}>{time}</td>
        <td>
            <div className={Styles.statusCell}>
                <span className={`${Styles.statusDot} ${status === 'Active' ? Styles.active : Styles.draft}`}></span>
                {status}
            </div>
        </td>
        <td>
            <button className={Styles.iconButtonSm}><span className="material-icons">edit</span></button>
        </td>
    </tr>
);

const CategoryItem = ({ name, count, percent, icon, color }) => (
    <div className={Styles.categoryItem}>
        <div className={Styles.categoryLeft}>
            <div className={`${Styles.catIcon} ${Styles['icon-' + color]}`}>
                <span className="material-icons">{icon}</span>
            </div>
            <div>
                <div className={Styles.catName}>{name}</div>
                <div className={Styles.catCount}>{count}</div>
            </div>
        </div>
        <div className={Styles.catPercent}>{percent}</div>
    </div>
);

export default Dashboard;
