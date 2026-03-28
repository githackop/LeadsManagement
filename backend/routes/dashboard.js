const express = require('express');
const router  = express.Router();
const { protect } = require('../middleware/auth');

// GET /api/dashboard/stats
router.get('/stats', protect, (_req, res) => {
  res.json({
    success: true,
    stats: { totalLeads: 128, totalTasks: 47, totalUsers: 23, revenue: 84200 }
  });
});

// GET /api/dashboard/leads
router.get('/leads', protect, (_req, res) => {
  res.json({
    success: true,
    leads: [
      { id: 1, name: 'Arjun Mehta',    company: 'TechNova Solutions', email: 'arjun@technova.com',   status: 'hot',       value: '₹2,40,000', source: 'LinkedIn',  date: '2024-01-15' },
      { id: 2, name: 'Priya Sharma',   company: 'Zenith Enterprises',  email: 'priya@zenith.com',     status: 'warm',      value: '₹1,85,000', source: 'Referral',  date: '2024-01-14' },
      { id: 3, name: 'Rohan Kapoor',   company: 'Digital Minds',       email: 'rohan@dminds.io',      status: 'cold',      value: '₹95,000',   source: 'Website',   date: '2024-01-13' },
      { id: 4, name: 'Sneha Reddy',    company: 'FutureBuild Corp',    email: 'sneha@futurebuild.com', status: 'hot',       value: '₹3,20,000', source: 'Email',     date: '2024-01-12' },
      { id: 5, name: 'Vikram Singh',   company: 'CloudBase Inc',       email: 'vikram@cloudbase.in',  status: 'warm',      value: '₹1,50,000', source: 'Cold Call', date: '2024-01-11' },
      { id: 6, name: 'Ananya Patel',   company: 'InnovateSoft',        email: 'ananya@isoft.com',     status: 'converted', value: '₹4,10,000', source: 'LinkedIn',  date: '2024-01-10' },
    ]
  });
});

// GET /api/dashboard/tasks
router.get('/tasks', protect, (_req, res) => {
  res.json({
    success: true,
    tasks: [
      { id: 1, title: 'Update CRM records for Q1 leads',       priority: 'high',   status: 'in-progress', assignee: 'Arjun Mehta',  dueDate: '2024-01-20', category: 'CRM'     },
      { id: 2, title: 'Prepare monthly performance report',    priority: 'high',   status: 'pending',     assignee: 'Priya Sharma', dueDate: '2024-01-18', category: 'Reports' },
      { id: 3, title: 'Follow up with TechNova client',        priority: 'medium', status: 'done',        assignee: 'Rohan Kapoor', dueDate: '2024-01-16', category: 'Sales'   },
      { id: 4, title: 'Schedule team training session',        priority: 'low',    status: 'pending',     assignee: 'Sneha Reddy',  dueDate: '2024-01-25', category: 'HR'      },
      { id: 5, title: 'Review and approve new proposals',      priority: 'high',   status: 'in-progress', assignee: 'Vikram Singh', dueDate: '2024-01-17', category: 'Sales'   },
      { id: 6, title: 'Integrate payment gateway module',      priority: 'medium', status: 'done',        assignee: 'Ananya Patel', dueDate: '2024-01-15', category: 'Dev'     },
      { id: 7, title: 'Design landing page for new product',   priority: 'medium', status: 'in-progress', assignee: 'Arjun Mehta',  dueDate: '2024-01-22', category: 'Design'  },
    ]
  });
});

// GET /api/dashboard/users
router.get('/users', protect, (_req, res) => {
  res.json({
    success: true,
    users: [
      { id: 1, name: 'Arjun Mehta',  email: 'arjun@company.com',  role: 'Admin',     department: 'Engineering', status: 'active',   joined: '2023-03-10', tasks: 42 },
      { id: 2, name: 'Priya Sharma', email: 'priya@company.com',  role: 'Manager',   department: 'Sales',       status: 'active',   joined: '2023-05-22', tasks: 38 },
      { id: 3, name: 'Rohan Kapoor', email: 'rohan@company.com',  role: 'Developer', department: 'Engineering', status: 'active',   joined: '2023-07-15', tasks: 55 },
      { id: 4, name: 'Sneha Reddy',  email: 'sneha@company.com',  role: 'Designer',  department: 'Design',      status: 'inactive', joined: '2023-08-01', tasks: 29 },
      { id: 5, name: 'Vikram Singh', email: 'vikram@company.com', role: 'Developer', department: 'Engineering', status: 'active',   joined: '2023-09-12', tasks: 61 },
      { id: 6, name: 'Ananya Patel', email: 'ananya@company.com', role: 'Analyst',   department: 'Marketing',   status: 'active',   joined: '2023-11-03', tasks: 33 },
    ]
  });
});

module.exports = router;
