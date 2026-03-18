/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-sync-scripts */
"use client";

import React, { useEffect, useRef } from 'react';
import Head from 'next/head';

// We'll use a dynamic import for Chart.js if possible, or just link it via CDN in this conversion
export default function DashboardPage() {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Load Chart.js from CDN for simplicity in this conversion
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/chart.js";
    script.async = true;
    script.onload = () => {
      if (chartRef.current && (window as any).Chart) {
        const ctx = chartRef.current.getContext('2d');
        new (window as any).Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Hospital Renovation', 'School Construction', 'Road Bridge', 'Community Water', 'Market Complex'],
            datasets: [{
              label: 'Planned Progress',
              data: [80, 60, 40, 30, 50],
              backgroundColor: 'rgba(37, 99, 235, 0.5)',
              borderColor: 'rgba(37, 99, 235, 1)',
              borderWidth: 1
            }, {
              label: 'Actual Progress',
              data: [75, 45, 20, 5, 35],
              backgroundColor: 'rgba(16, 185, 129, 0.5)',
              borderColor: 'rgba(16, 185, 129, 1)',
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                max: 100,
                ticks: {
                  callback: function(value: any) {
                    return value + '%';
                  }
                }
              }
            }
          }
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="dashboard-body">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      <style jsx global>{`
        :root {
          --primary: #2563eb;
          --primary-dark: #1d4ed8;
          --secondary: #0f766e;
          --dark: #1e293b;
          --light: #f8fafc;
          --gray: #94a3b8;
          --success: #10b981;
          --warning: #f59e0b;
          --danger: #ef4444;
        }

        .dashboard-body {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f1f5f9;
          color: var(--dark);
          display: flex;
          min-height: 100vh;
        }

        /* Sidebar */
        .sidebar {
          width: 280px;
          background: linear-gradient(180deg, var(--primary) 0%, var(--primary-dark) 100%);
          color: white;
          padding: 20px 0;
          display: flex;
          flex-direction: column;
          box-shadow: 3px 0 15px rgba(0,0,0,0.1);
          z-index: 100;
        }

        .logo {
          display: flex;
          align-items: center;
          padding: 0 25px 20px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          margin-bottom: 20px;
        }

        .logo i {
          font-size: 28px;
          margin-right: 12px;
          background: white;
          color: var(--primary);
          width: 45px;
          height: 45px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logo h1 {
          font-size: 22px;
          font-weight: 700;
        }

        .nav-item {
          display: flex;
          align-items: center;
          padding: 14px 25px;
          margin: 5px 0;
          border-left: 4px solid transparent;
          transition: all 0.3s;
          cursor: pointer;
          font-weight: 500;
        }

        .nav-item:hover, .nav-item.active {
          background: rgba(255,255,255,0.1);
          border-left: 4px solid white;
        }

        .nav-item i {
          margin-right: 15px;
          font-size: 18px;
          width: 25px;
          text-align: center;
        }

        /* Main Content */
        .main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        /* Header */
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 30px;
          background: white;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          z-index: 10;
        }

        .search-bar {
          display: flex;
          align-items: center;
          background: var(--light);
          border-radius: 30px;
          padding: 10px 20px;
          width: 400px;
        }

        .search-bar input {
          border: none;
          background: transparent;
          padding: 5px 10px;
          width: 100%;
          font-size: 16px;
          outline: none;
        }

        .user-actions {
          display: flex;
          align-items: center;
        }

        .notification, .user-profile {
          position: relative;
          margin-left: 20px;
          cursor: pointer;
        }

        .notification i, .user-profile img {
          font-size: 22px;
          color: var(--dark);
        }

        .notification .badge {
          position: absolute;
          top: -5px;
          right: -5px;
          background: var(--danger);
          color: white;
          font-size: 12px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .user-profile img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
        }

        /* Dashboard */
        .dashboard {
          padding: 30px;
          flex: 1;
          overflow-y: auto;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .dashboard-header h2 {
          font-size: 28px;
          font-weight: 700;
          color: var(--dark);
        }

        .btn {
          padding: 12px 25px;
          border-radius: 8px;
          border: none;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          transition: all 0.3s;
        }

        .btn i {
          margin-right: 8px;
        }

        .btn-primary {
          background: var(--primary);
          color: white;
        }

        .btn-primary:hover {
          background: var(--primary-dark);
        }

        .btn-secondary {
          background: var(--secondary);
          color: white;
        }

        .btn-secondary:hover {
          background: #0e6a62;
        }

        /* Cards */
        .cards-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 25px;
          margin-bottom: 30px;
        }

        .card {
          background: white;
          border-radius: 15px;
          padding: 25px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
          transition: transform 0.3s;
        }

        .card:hover {
          transform: translateY(-5px);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .card-title {
          font-size: 18px;
          font-weight: 600;
          color: var(--dark);
        }

        .card-icon {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
        }

        .bg-blue {
          background: rgba(37, 99, 235, 0.1);
          color: var(--primary);
        }

        .bg-teal {
          background: rgba(15, 118, 110, 0.1);
          color: var(--secondary);
        }

        .bg-orange {
          background: rgba(245, 158, 11, 0.1);
          color: var(--warning);
        }

        .card-value {
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 10px;
        }

        .card-info {
          font-size: 14px;
          color: var(--gray);
          display: flex;
          align-items: center;
        }

        .card-info.success {
          color: var(--success);
        }

        .card-info.danger {
          color: var(--danger);
        }

        /* Charts & Tables */
        .row {
          display: flex;
          gap: 25px;
          margin-bottom: 30px;
        }

        .col {
          flex: 1;
          background: white;
          border-radius: 15px;
          padding: 25px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
        }

        .col-2 {
          flex: 2;
        }

        .col-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .col-title {
          font-size: 20px;
          font-weight: 600;
        }

        .table {
          width: 100%;
          border-collapse: collapse;
        }

        .table th {
          text-align: left;
          padding: 12px 15px;
          font-weight: 600;
          color: var(--gray);
          border-bottom: 2px solid var(--light);
        }

        .table td {
          padding: 15px;
          border-bottom: 1px solid var(--light);
        }

        .table tr:last-child td {
          border-bottom: none;
        }

        .status {
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 500;
        }

        .status.completed {
          background: rgba(16, 185, 129, 0.1);
          color: var(--success);
        }

        .status.in-progress {
          background: rgba(245, 158, 11, 0.1);
          color: var(--warning);
        }

        .status.pending {
          background: rgba(148, 163, 184, 0.1);
          color: var(--gray);
        }

        .project-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 18px;
        }
        
        .activity-item {
          margin-bottom: 20px;
        }
        
        .activity-header {
          display: flex;
          gap: 12px;
          margin-bottom: 5px;
        }
        
        .activity-title {
          font-weight: 600;
          font-size: 14px;
        }
        
        .activity-time {
          font-size: 12px;
          color: var(--gray);
        }
        
        .activity-desc {
          font-size: 13px;
          color: var(--slate);
          padding-left: 52px;
        }
        
        .progress-bar {
          background: var(--light);
          height: 8px;
          border-radius: 4px;
          margin-bottom: 5px;
        }
        
        .template-item {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 20px;
          cursor: pointer;
        }
        
        .template-icon {
          width: 45px;
          height: 45px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        }
        
        .template-title {
          font-weight: 600;
          font-size: 15px;
        }
        
        .template-desc {
          font-size: 12px;
          color: var(--gray);
        }

        .footer {
          text-align: center;
          padding: 20px;
          color: var(--gray);
          font-size: 14px;
          border-top: 1px solid var(--light);
        }

        @media (max-width: 1200px) {
          .row {
            flex-direction: column;
          }

          .sidebar {
            width: 80px;
          }

          .logo h1, .nav-item span {
            display: none;
          }

          .logo {
            justify-content: center;
            padding: 15px;
          }

          .logo i {
            margin: 0;
          }

          .nav-item {
            justify-content: center;
            padding: 20px 0;
          }

          .nav-item i {
            margin: 0;
            font-size: 22px;
          }

          .search-bar {
            width: 250px;
          }
        }
      `}</style>

      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">
          <i className="fas fa-hard-hat"></i>
          <h1>ConstructPro</h1>
        </div>
        <div className="nav-item active">
          <i className="fas fa-home"></i>
          <span>Dashboard</span>
        </div>
        <div className="nav-item">
          <i className="fas fa-tasks"></i>
          <span>Projects</span>
        </div>
        <div className="nav-item">
          <i className="fas fa-file-invoice"></i>
          <span>BOQ Builder</span>
        </div>
        <div className="nav-item">
          <i className="fas fa-calendar-alt"></i>
          <span>Work Plans</span>
        </div>
        <div className="nav-item">
          <i className="fas fa-chart-line"></i>
          <span>Progress Tracking</span>
        </div>
        <div className="nav-item">
          <i className="fas fa-file-contract"></i>
          <span>Reports</span>
        </div>
        <div className="nav-item">
          <i className="fas fa-file-certificate"></i>
          <span>Certificates</span>
        </div>
        <div className="nav-item">
          <i className="fas fa-users"></i>
          <span>Team</span>
        </div>
        <div className="nav-item">
          <i className="fas fa-cog"></i>
          <span>Settings</span>
        </div>
        <div className="nav-item" style={{ marginTop: 'auto' }}>
          <i className="fas fa-question-circle"></i>
          <span>Help Center</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <div className="header">
          <div className="search-bar">
            <i className="fas fa-search"></i>
            <input type="text" placeholder="Search projects, documents, or team members..." />
          </div>
          <div className="user-actions">
            <div className="notification">
              <i className="fas fa-bell"></i>
              <div className="badge">3</div>
            </div>
            <div className="user-profile">
              <img src="https://randomuser.me/api/portraits/men/41.jpg" alt="User" />
            </div>
          </div>
        </div>

        {/* Dashboard */}
        <div className="dashboard">
          <div className="dashboard-header">
            <h2>Project Dashboard</h2>
            <button className="btn btn-primary">
              <i className="fas fa-plus"></i> New Project
            </button>
          </div>

          {/* Stats Cards */}
          <div className="cards-container">
            <div className="card">
              <div className="card-header">
                <div className="card-title">Active Projects</div>
                <div className="card-icon bg-blue">
                  <i className="fas fa-folder-open"></i>
                </div>
              </div>
              <div className="card-value">18</div>
              <div className="card-info success">
                <i className="fas fa-arrow-up"></i> 4 new this month
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <div className="card-title">Completed BOQs</div>
                <div className="card-icon bg-teal">
                  <i className="fas fa-file-invoice"></i>
                </div>
              </div>
              <div className="card-value">47</div>
              <div className="card-info success">
                <i className="fas fa-arrow-up"></i> 12 this month
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <div className="card-title">Pending Approvals</div>
                <div className="card-icon bg-orange">
                  <i className="fas fa-clock"></i>
                </div>
              </div>
              <div className="card-value">8</div>
              <div className="card-info danger">
                <i className="fas fa-exclamation-circle"></i> 3 overdue
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <div className="card-title">Team Members</div>
                <div className="card-icon bg-blue">
                  <i className="fas fa-users"></i>
                </div>
              </div>
              <div className="card-value">24</div>
              <div className="card-info">
                <i className="fas fa-user-plus"></i> 2 recently added
              </div>
            </div>
          </div>

          {/* Charts & Tables */}
          <div className="row">
            <div className="col col-2">
              <div className="col-header">
                <div className="col-title">Project Progress</div>
                <button className="btn btn-secondary">
                  <i className="fas fa-download"></i> Export Report
                </button>
              </div>
              <canvas id="progressChart" ref={chartRef} height="250"></canvas>
            </div>

            <div className="col">
              <div className="col-header">
                <div className="col-title">Recent Activity</div>
                <i className="fas fa-ellipsis-h"></i>
              </div>
              <div className="activity-list">
                <div className="activity-item">
                  <div className="activity-header">
                    <div className="project-avatar">HP</div>
                    <div>
                      <div className="activity-title">Hospital Renovation</div>
                      <div className="activity-time">10 minutes ago</div>
                    </div>
                  </div>
                  <div className="activity-desc">BOQ updated by Sarah Johnson</div>
                </div>

                <div className="activity-item">
                  <div className="activity-header">
                    <div className="project-avatar" style={{ backgroundColor: 'var(--secondary)' }}>SC</div>
                    <div>
                      <div className="activity-title">School Construction</div>
                      <div className="activity-time">2 hours ago</div>
                    </div>
                  </div>
                  <div className="activity-desc">Progress report generated</div>
                </div>

                <div className="activity-item">
                  <div className="activity-header">
                    <div className="project-avatar" style={{ backgroundColor: 'var(--warning)' }}>RB</div>
                    <div>
                      <div className="activity-title">Road Bridge</div>
                      <div className="activity-time">5 hours ago</div>
                    </div>
                  </div>
                  <div className="activity-desc">Payment certificate approved</div>
                </div>

                <div className="activity-item">
                  <div className="activity-header">
                    <div className="project-avatar" style={{ backgroundColor: 'var(--danger)' }}>CW</div>
                    <div>
                      <div className="activity-title">Community Water</div>
                      <div className="activity-time">Yesterday</div>
                    </div>
                  </div>
                  <div className="activity-desc">New work plan created from BOQ</div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col col-2">
              <div className="col-header">
                <div className="col-title">Recent Projects</div>
                <button className="btn btn-primary">
                  <i className="fas fa-eye"></i> View All
                </button>
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th>Project</th>
                    <th>Client</th>
                    <th>BOQ Status</th>
                    <th>Progress</th>
                    <th>Team</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="activity-header">
                        <div className="project-avatar">HP</div>
                        <div>
                          <div className="activity-title">Hospital Renovation</div>
                          <div className="activity-time">NGO Project</div>
                        </div>
                      </div>
                    </td>
                    <td>Health Partners</td>
                    <td><span className="status completed">Completed</span></td>
                    <td>
                      <div className="progress-bar">
                        <div style={{ width: '75%', background: 'var(--success)', height: '8px', borderRadius: '4px' }}></div>
                      </div>
                      <div>75%</div>
                    </td>
                    <td>8 members</td>
                    <td>
                      <button className="btn" style={{ padding: '5px 10px', fontSize: '14px' }}>
                        <i className="fas fa-edit"></i>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="activity-header">
                        <div className="project-avatar" style={{ backgroundColor: 'var(--secondary)' }}>SC</div>
                        <div>
                          <div className="activity-title">School Construction</div>
                          <div className="activity-time">Government Project</div>
                        </div>
                      </div>
                    </td>
                    <td>Education Ministry</td>
                    <td><span className="status in-progress">In Progress</span></td>
                    <td>
                      <div className="progress-bar">
                        <div style={{ width: '45%', background: 'var(--warning)', height: '8px', borderRadius: '4px' }}></div>
                      </div>
                      <div>45%</div>
                    </td>
                    <td>12 members</td>
                    <td>
                      <button className="btn" style={{ padding: '5px 10px', fontSize: '14px' }}>
                        <i className="fas fa-edit"></i>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="activity-header">
                        <div className="project-avatar" style={{ backgroundColor: 'var(--warning)' }}>RB</div>
                        <div>
                          <div className="activity-title">Road Bridge</div>
                          <div className="activity-time">Infrastructure</div>
                        </div>
                      </div>
                    </td>
                    <td>City Council</td>
                    <td><span className="status completed">Completed</span></td>
                    <td>
                      <div className="progress-bar">
                        <div style={{ width: '20%', background: 'var(--danger)', height: '8px', borderRadius: '4px' }}></div>
                      </div>
                      <div>20%</div>
                    </td>
                    <td>6 members</td>
                    <td>
                      <button className="btn" style={{ padding: '5px 10px', fontSize: '14px' }}>
                        <i className="fas fa-edit"></i>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="activity-header">
                        <div className="project-avatar" style={{ backgroundColor: 'var(--danger)' }}>CW</div>
                        <div>
                          <div className="activity-title">Community Water</div>
                          <div className="activity-time">NGO Project</div>
                        </div>
                      </div>
                    </td>
                    <td>WaterAid</td>
                    <td><span className="status pending">Pending</span></td>
                    <td>
                      <div className="progress-bar">
                        <div style={{ width: '5%', background: 'var(--gray)', height: '8px', borderRadius: '4px' }}></div>
                      </div>
                      <div>5%</div>
                    </td>
                    <td>4 members</td>
                    <td>
                      <button className="btn" style={{ padding: '5px 10px', fontSize: '14px' }}>
                        <i className="fas fa-edit"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="col">
              <div className="col-header">
                <div className="col-title">NGO Templates</div>
                <i className="fas fa-ellipsis-h"></i>
              </div>
              <div className="template-list">
                <div className="template-item">
                  <div className="template-icon" style={{ background: 'rgba(37, 99, 235, 0.1)', color: 'var(--primary)' }}>
                    <i className="fas fa-hospital"></i>
                  </div>
                  <div className="template-details">
                    <div className="template-title">Health Clinic Template</div>
                    <div className="template-desc">WHO-compliant for NGO projects</div>
                  </div>
                </div>

                <div className="template-item">
                  <div className="template-icon" style={{ background: 'rgba(15, 118, 110, 0.1)', color: 'var(--secondary)' }}>
                    <i className="fas fa-school"></i>
                  </div>
                  <div className="template-details">
                    <div className="template-title">School Construction</div>
                    <div className="template-desc">UNICEF standards for education</div>
                  </div>
                </div>

                <div className="template-item">
                  <div className="template-icon" style={{ background: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning)' }}>
                    <i className="fas fa-tint"></i>
                  </div>
                  <div className="template-details">
                    <div className="template-title">Water Project</div>
                    <div className="template-desc">WaterAid compliant templates</div>
                  </div>
                </div>

                <div className="template-item">
                  <div className="template-icon" style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)' }}>
                    <i className="fas fa-road"></i>
                  </div>
                  <div className="template-details">
                    <div className="template-title">Rural Road</div>
                    <div className="template-desc">World Bank standards</div>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '30px' }}>
                <div className="col-header">
                  <div className="col-title">Quick Actions</div>
                </div>
                <div className="quick-actions">
                  <button className="btn" style={{ width: '100%', marginBottom: '10px', textAlign: 'left' }}>
                    <i className="fas fa-file-invoice"></i> Create BOQ
                  </button>
                  <button className="btn" style={{ width: '100%', marginBottom: '10px', textAlign: 'left' }}>
                    <i className="fas fa-calendar-alt"></i> Generate Work Plan
                  </button>
                  <button className="btn" style={{ width: '100%', marginBottom: '10px', textAlign: 'left' }}>
                    <i className="fas fa-file-contract"></i> Create Progress Report
                  </button>
                  <button className="btn" style={{ width: '100%', marginBottom: '10px', textAlign: 'left' }}>
                    <i className="fas fa-file-certificate"></i> Generate Certificate
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="footer">
            <p>ConstructPro Project Management Platform • v2.4.1 • © 2023 All Rights Reserved</p>
          </div>
        </div>
      </div>
    </div>
  );
}
