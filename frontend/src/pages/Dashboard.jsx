import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';


const SvgIcon = ({ children, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

const LogoIcon = () => (
  <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
    <path d="M4 14L14 4L24 14L14 24L4 14Z" fill="url(#dbg1)" opacity=".9" />
    <path d="M8 14L14 8L20 14L14 20L8 14Z" fill="url(#dbg2)" />
    <defs>
      <linearGradient id="dbg1" x1="4" y1="4" x2="24" y2="24">
        <stop stopColor="#6c63ff" /><stop offset="1" stopColor="#22d3ee" />
      </linearGradient>
      <linearGradient id="dbg2" x1="8" y1="8" x2="20" y2="20">
        <stop stopColor="#fff" stopOpacity=".8" /><stop offset="1" stopColor="#a78bfa" stopOpacity=".4" />
      </linearGradient>
    </defs>
  </svg>
);

const LeadsIcon = () => (
  <SvgIcon>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </SvgIcon>
);

const TasksIcon = () => (
  <SvgIcon>
    <path d="M9 11l3 3L22 4" />
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
  </SvgIcon>
);

const UsersIcon = () => (
  <SvgIcon>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </SvgIcon>
);

const RevenueIcon = () => (
  <SvgIcon>
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </SvgIcon>
);

const LogoutIcon = () => (
  <SvgIcon>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </SvgIcon>
);

const BellIcon = () => (
  <SvgIcon>
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </SvgIcon>
);

const SearchIcon = () => (
  <SvgIcon>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </SvgIcon>
);

const MenuIcon = () => (
  <SvgIcon>
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6"  x2="21" y2="6"  />
    <line x1="3" y1="18" x2="21" y2="18" />
  </SvgIcon>
);


const Avatar = ({ name, size = 34 }) => {
  const palette = ['#6c63ff', '#22d3ee', '#34d399', '#f87171', '#fbbf24', '#a78bfa'];
  const color   = palette[name.charCodeAt(0) % palette.length];
  const color2  = palette[(name.charCodeAt(0) + 2) % palette.length];
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: `linear-gradient(135deg, ${color}, ${color2})`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size / 2.8, fontWeight: 700, color: '#fff', flexShrink: 0,
    }}>
      {initials}
    </div>
  );
};

const LeadStatusBadge = ({ status }) => {
  const styles = {
    hot:       { color: '#f87171', bg: 'rgba(248,113,113,.12)' },
    warm:      { color: '#fbbf24', bg: 'rgba(251,191,36,.12)'  },
    cold:      { color: '#60a5fa', bg: 'rgba(96,165,250,.12)'  },
    converted: { color: '#34d399', bg: 'rgba(52,211,153,.12)'  },
  };
  const s = styles[status] || { color: '#9090bb', bg: 'rgba(144,144,187,.12)' };
  return (
    <span style={{
      padding: '3px 10px', borderRadius: 99, fontSize: 11,
      fontWeight: 600, color: s.color, background: s.bg,
      textTransform: 'capitalize',
    }}>
      {status}
    </span>
  );
};

const TaskStatusBadge = ({ status }) => {
  const styles = {
    pending:     { color: '#fbbf24', bg: 'rgba(251,191,36,.12)',   label: 'Pending'     },
    'in-progress': { color: '#6c63ff', bg: 'rgba(108,99,255,.14)', label: 'In Progress' },
    done:        { color: '#34d399', bg: 'rgba(52,211,153,.12)',   label: 'Done'        },
  };
  const s = styles[status] || { color: '#9090bb', bg: 'rgba(144,144,187,.12)', label: status };
  return (
    <span style={{ padding: '3px 10px', borderRadius: 99, fontSize: 11, fontWeight: 600, color: s.color, background: s.bg }}>
      {s.label}
    </span>
  );
};

const PriorityBadge = ({ priority }) => {
  const styles = {
    high:   { color: '#f87171', bg: 'rgba(248,113,113,.1)'  },
    medium: { color: '#fbbf24', bg: 'rgba(251,191,36,.1)'   },
    low:    { color: '#34d399', bg: 'rgba(52,211,153,.1)'   },
  };
  const s = styles[priority] || { color: '#9090bb', bg: 'rgba(144,144,187,.1)' };
  return (
    <span style={{
      padding: '2px 9px', borderRadius: 99, fontSize: 10,
      fontWeight: 700, color: s.color, background: s.bg,
      textTransform: 'uppercase', letterSpacing: '.5px',
    }}>
      {priority}
    </span>
  );
};

const UserStatusBadge = ({ status }) => {
  const isActive = status === 'active';
  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: isActive ? '#34d399' : '#9090bb' }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: isActive ? '#34d399' : '#9090bb', display: 'inline-block' }} />
      {isActive ? 'Active' : 'Inactive'}
    </span>
  );
};


const Dashboard = () => {
  const { user, logout, API } = useAuth();
  const navigate = useNavigate();

  const [activeTab,   setActiveTab]   = useState('leads');
  const [leads,       setLeads]       = useState([]);
  const [tasks,       setTasks]       = useState([]);
  const [users,       setUsers]       = useState([]);
  const [stats,       setStats]       = useState(null);
  const [loading,     setLoading]     = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

 
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [s, l, t, u] = await Promise.all([
          axios.get(`${API}/dashboard/stats`),
          axios.get(`${API}/dashboard/leads`),
          axios.get(`${API}/dashboard/tasks`),
          axios.get(`${API}/dashboard/users`),
        ]);
        setStats(s.data.stats);
        setLeads(l.data.leads);
        setTasks(t.data.tasks);
        setUsers(u.data.users);
      } catch (err) {
        console.error('Dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [API]);

  const handleLogout = () => { logout(); navigate('/login'); };

  const switchTab = (tab) => {
    setActiveTab(tab);
    setSearchQuery('');
    setSidebarOpen(false);
  };

  /* ── Filtered data ── */
  const q = searchQuery.toLowerCase();
  const filteredLeads = leads.filter(l =>
    l.name.toLowerCase().includes(q) || l.company.toLowerCase().includes(q)
  );
  const filteredTasks = tasks.filter(t =>
    t.title.toLowerCase().includes(q) || t.assignee.toLowerCase().includes(q)
  );
  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
  );

  const navItems = [
    { id: 'leads', label: 'Leads',  Icon: LeadsIcon },
    { id: 'tasks', label: 'Tasks',  Icon: TasksIcon },
    { id: 'users', label: 'Users',  Icon: UsersIcon },
  ];

  /* ── Loading screen ── */
  if (loading) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        height: '100vh', background: 'var(--bg)', flexDirection: 'column', gap: 16,
      }}>
        <div style={{
          width: 42, height: 42,
          border: '3px solid var(--border2)',
          borderTopColor: 'var(--accent)',
          borderRadius: '50%',
          animation: 'spin .7s linear infinite',
        }} />
        <p style={{ color: 'var(--txt2)', fontSize: 13 }}>Loading workspace…</p>
      </div>
    );
  }


  return (
    <div className="db-root">

      {/* ── Sidebar ── */}
      <aside className={`db-sidebar ${sidebarOpen ? 'is-open' : ''}`}>
        <div className="sb-brand" onClick={() => setSidebarOpen(false)}>
          <LogoIcon /><span>Leads Management</span>
        </div>

        {/* Mini stats */}
        {stats && (
          <div className="sb-mini-stats">
            {[
              ['Leads', stats.totalLeads,  '#6c63ff'],
              ['Tasks', stats.totalTasks,  '#22d3ee'],
              ['Users', stats.totalUsers,  '#34d399'],
            ].map(([lbl, val, clr]) => (
              <div className="sb-mini-stat" key={lbl}>
                <span style={{ color: clr, fontFamily: 'var(--ff-head)', fontSize: 20, fontWeight: 700 }}>{val}</span>
                <span style={{ color: 'var(--txt3)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '.5px' }}>{lbl}</span>
              </div>
            ))}
          </div>
        )}

        {/* Nav */}
        <nav className="sb-nav">
          <span className="sb-nav-label">Main Menu</span>
          {navItems.map(({ id, label, Icon: NavIcon }) => (
            <button
              key={id}
              className={`sb-nav-item ${activeTab === id ? 'active' : ''}`}
              onClick={() => switchTab(id)}
            >
              <NavIcon />{label}
              {activeTab === id && <span className="sb-active-dot" />}
            </button>
          ))}
        </nav>

        <button className="sb-logout-btn" onClick={handleLogout}>
          <LogoutIcon /> Sign Out
        </button>
      </aside>

      {/* Backdrop (mobile) */}
      {sidebarOpen && <div className="sb-backdrop" onClick={() => setSidebarOpen(false)} />}

      {/* ── Main content ── */}
      <div className="db-main">

        {/* Topbar */}
        <header className="db-topbar">
          <button className="hamburger-btn" onClick={() => setSidebarOpen(p => !p)}>
            <MenuIcon />
          </button>

          <div className="topbar-title-group">
            <h1 className="topbar-title">
              {navItems.find(n => n.id === activeTab)?.label}
            </h1>
            <span className="topbar-count">
              {activeTab === 'leads' && `${filteredLeads.length} records`}
              {activeTab === 'tasks' && `${filteredTasks.length} records`}
              {activeTab === 'users' && `${filteredUsers.length} members`}
            </span>
          </div>

          <div className="topbar-actions">
            <div className="search-bar">
              <SearchIcon />
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={`Search ${activeTab}…`}
              />
              {searchQuery && (
                <button className="search-clear" onClick={() => setSearchQuery('')}>✕</button>
              )}
            </div>
            <button className="icon-action-btn"><BellIcon /></button>
            <div className="user-chip">
              <Avatar name={user?.name || 'U'} size={30} />
              <div className="user-chip-info">
                <span className="uc-name">{user?.name}</span>
                <span className="uc-role">{user?.role}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Stats row */}
        {stats && (
          <div className="stats-grid">
            {[
              { label: 'Total Leads',   value: stats.totalLeads,                         color: '#6c63ff', Icon: LeadsIcon   },
              { label: 'Open Tasks',    value: stats.totalTasks,                          color: '#22d3ee', Icon: TasksIcon   },
              { label: 'Team Members',  value: stats.totalUsers,                          color: '#34d399', Icon: UsersIcon   },
              { label: 'Revenue',       value: `₹${(stats.revenue / 1000).toFixed(0)}K`, color: '#fbbf24', Icon: RevenueIcon },
            ].map(({ label, value, color, Icon: StatIcon }, i) => (
              <div className="stat-card" key={label} style={{ animationDelay: `${i * 0.07}s` }}>
                <div className="stat-icon" style={{ background: `${color}18`, color }}>
                  <StatIcon />
                </div>
                <div>
                  <div className="stat-value" style={{ color }}>{value}</div>
                  <div className="stat-label">{label}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Tab content ── */}
        <div className="tab-content">

          {/* LEADS */}
          {activeTab === 'leads' && (
            <div className="data-table-card fade-in">
              <div className="table-scroll-wrap">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Contact</th>
                      <th>Company</th>
                      <th>Status</th>
                      <th>Deal Value</th>
                      <th>Source</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeads.length === 0 ? (
                      <tr><td colSpan="6" className="empty-row">No leads found matching "{searchQuery}"</td></tr>
                    ) : filteredLeads.map(lead => (
                      <tr key={lead.id}>
                        <td>
                          <div className="cell-user">
                            <Avatar name={lead.name} size={34} />
                            <div>
                              <div className="cell-name">{lead.name}</div>
                              <div className="cell-sub">{lead.email}</div>
                            </div>
                          </div>
                        </td>
                        <td><span className="cell-secondary">{lead.company}</span></td>
                        <td><LeadStatusBadge status={lead.status} /></td>
                        <td><span className="cell-value">{lead.value}</span></td>
                        <td><span className="cell-secondary">{lead.source}</span></td>
                        <td><span className="cell-muted">{lead.date}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TASKS */}
          {activeTab === 'tasks' && (
            <div className="data-table-card fade-in">
              <div className="table-scroll-wrap">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Task Title</th>
                      <th>Priority</th>
                      <th>Status</th>
                      <th>Assignee</th>
                      <th>Category</th>
                      <th>Due Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTasks.length === 0 ? (
                      <tr><td colSpan="6" className="empty-row">No tasks found matching "{searchQuery}"</td></tr>
                    ) : filteredTasks.map(task => (
                      <tr key={task.id}>
                        <td>
                          <span
                            className="cell-name"
                            style={{
                              textDecoration: task.status === 'done' ? 'line-through' : 'none',
                              opacity: task.status === 'done' ? 0.55 : 1,
                              maxWidth: 260, display: 'inline-block',
                            }}
                          >
                            {task.title}
                          </span>
                        </td>
                        <td><PriorityBadge priority={task.priority} /></td>
                        <td><TaskStatusBadge status={task.status} /></td>
                        <td>
                          <div className="cell-user">
                            <Avatar name={task.assignee} size={26} />
                            <span className="cell-secondary">{task.assignee}</span>
                          </div>
                        </td>
                        <td>
                          <span className="category-tag">{task.category}</span>
                        </td>
                        <td><span className="cell-muted">{task.dueDate}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* USERS */}
          {activeTab === 'users' && (
            <div className="data-table-card fade-in">
              <div className="table-scroll-wrap">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Member</th>
                      <th>Role</th>
                      <th>Department</th>
                      <th>Status</th>
                      <th>Tasks Done</th>
                      <th>Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.length === 0 ? (
                      <tr><td colSpan="6" className="empty-row">No users found matching "{searchQuery}"</td></tr>
                    ) : filteredUsers.map(u => (
                      <tr key={u.id}>
                        <td>
                          <div className="cell-user">
                            <Avatar name={u.name} size={36} />
                            <div>
                              <div className="cell-name">{u.name}</div>
                              <div className="cell-sub">{u.email}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span style={{
                            padding: '3px 10px', borderRadius: 99, fontSize: 11,
                            fontWeight: 600, background: 'rgba(108,99,255,.12)', color: 'var(--accent2)',
                          }}>
                            {u.role}
                          </span>
                        </td>
                        <td><span className="cell-secondary">{u.department}</span></td>
                        <td><UserStatusBadge status={u.status} /></td>
                        <td>
                          <div className="task-progress">
                            <div className="task-progress-bar">
                              <div
                                className="task-progress-fill"
                                style={{ width: `${Math.min((u.tasks / 70) * 100, 100)}%` }}
                              />
                            </div>
                            <span className="task-progress-num">{u.tasks}</span>
                          </div>
                        </td>
                        <td><span className="cell-muted">{u.joined}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>{/* /tab-content */}
      </div>{/* /db-main */}
    </div>/* /db-root */
  );
};

export default Dashboard;
