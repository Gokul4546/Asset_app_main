import React, { useState } from 'react';
import { Plus, Edit, Trash2, Bell, Mail, MessageSquare, AlertTriangle, Clock, CheckCircle, Settings } from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(true);
  const [pushEnabled, setPushEnabled] = useState(false);

  const alertRules = [
    {
      id: 1,
      name: 'Audit Overdue Alert',
      status: 'Active',
      condition: 'Audit overdue > 7 days',
      recipients: 'Auditors, Admin',
      description: 'Trigger when audit is overdue by more than 7 days',
      priority: 'High'
    },
    {
      id: 2,
      name: 'Transfer Delay Warning',
      status: 'Active',
      condition: 'Transfer pending > 24 hours',
      recipients: 'Transfer Manager, Admin',
      description: 'Alert when transfer is pending for more than 24 hours',
      priority: 'Medium'
    },
    {
      id: 3,
      name: 'Maintenance SLA Breach',
      status: 'Critical',
      condition: 'Maintenance overdue > SLA days',
      recipients: 'IT Team, Finance, Admin',
      description: 'Critical alert when maintenance SLA is breached',
      priority: 'Critical'
    },
    {
      id: 4,
      name: 'Asset Not Found',
      status: 'Inactive',
      condition: 'Asset status = Not Found',
      recipients: 'Zone Managers, Admin',
      description: 'Alert when asset is marked as not found during audit',
      priority: 'High'
    }
  ];

  const recentAlerts = [
    {
      id: 1,
      title: 'Maintenance SLA breached for Asset #AT-2025-001',
      description: '2 hours ago • IT Equipment',
      priority: 'Critical',
      icon: AlertTriangle
    },
    {
      id: 2,
      title: 'Audit overdue for North Zone - Depot A',
      description: '5 hours ago • 23 assets pending',
      priority: 'Warning',
      icon: Clock
    },
    {
      id: 3,
      title: 'Transfer pending approval for 8 hours',
      description: '1 day ago • Transfer ID: TR-2025-045',
      priority: 'Info',
      icon: CheckCircle
    },
    {
      id: 4,
      title: 'Asset not found during audit',
      description: '2 days ago • Asset #AT-2025-078 • South Zone',
      priority: 'Alert',
      icon: AlertTriangle
    }
  ];

  const userRolePreferences = [
    {
      role: 'Admin',
      preferences: ['All Alerts', 'Email', 'SMS'],
      editLink: 'Edit'
    },
    {
      role: 'Auditors',
      preferences: ['Audit Related', 'Email'],
      editLink: 'Edit'
    },
    {
      role: 'Finance',
      preferences: ['Critical Only', 'Email'],
      editLink: 'Edit'
    },
    {
      role: 'IT Support',
      preferences: ['Maintenance', 'Email', 'SMS'],
      editLink: 'Edit'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'text-red-600';
      case 'Warning': return 'text-amber-600';
      case 'Info': return 'text-blue-600';
      case 'Alert': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Notifications & Alerts</h1>
          <p className="text-gray-600">Configure alert rules and notification preferences</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Alert Rules */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Alert Rules</h3>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm">
              <Plus className="h-4 w-4" />
              Add Rule
            </button>
          </div>

          <div className="space-y-4">
            {alertRules.map((rule) => (
              <div key={rule.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <h4 className="font-semibold text-gray-900">{rule.name}</h4>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(rule.status)}`}>
                        {rule.status}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">{rule.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Condition:</span>
                        <span className="ml-2 font-medium text-gray-900">{rule.condition}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Recipients:</span>
                        <span className="ml-2 font-medium text-gray-900">{rule.recipients}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <button className="text-indigo-600 hover:text-indigo-700">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="space-y-6">
          {/* Delivery Methods */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Notification Preferences</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Delivery Methods</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-600" />
                      <span className="text-sm text-gray-700">Email</span>
                    </div>
                    <button
                      onClick={() => setEmailEnabled(!emailEnabled)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        emailEnabled ? 'bg-indigo-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          emailEnabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-gray-600" />
                      <span className="text-sm text-gray-700">SMS</span>
                    </div>
                    <button
                      onClick={() => setSmsEnabled(!smsEnabled)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        smsEnabled ? 'bg-indigo-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          smsEnabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bell className="h-4 w-4 text-gray-600" />
                      <span className="text-sm text-gray-700">Push Notifications</span>
                    </div>
                    <button
                      onClick={() => setPushEnabled(!pushEnabled)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        pushEnabled ? 'bg-indigo-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          pushEnabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* User Role Preferences */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">User Role Preferences</h4>
                <div className="space-y-3">
                  {userRolePreferences.map((pref, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{pref.role}</p>
                        <p className="text-xs text-gray-500">{pref.preferences.join(', ')}</p>
                      </div>
                      <button className="text-xs text-indigo-600 hover:text-indigo-700">
                        {pref.editLink}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* SLA Configuration */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">SLA Configuration</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Audit SLA (days)</span>
                    <input type="number" value="7" className="w-16 px-2 py-1 text-sm border border-gray-200 rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Transfer SLA (hours)</span>
                    <input type="number" value="24" className="w-16 px-2 py-1 text-sm border border-gray-200 rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Maintenance SLA (days)</span>
                    <input type="number" value="5" className="w-16 px-2 py-1 text-sm border border-gray-200 rounded" />
                  </div>
                </div>
              </div>

              <button className="w-full py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm">
                Save Configuration
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Recent Alerts</h3>
          <button className="text-sm text-indigo-600 hover:text-indigo-700">View All</button>
        </div>
        
        <div className="space-y-4">
          {recentAlerts.map((alert) => {
            const Icon = alert.icon;
            return (
              <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center ${getPriorityColor(alert.priority)}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{alert.title}</h4>
                  <p className="text-sm text-gray-500 mt-1">{alert.description}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  alert.priority === 'Critical' ? 'bg-red-100 text-red-800' :
                  alert.priority === 'Warning' ? 'bg-amber-100 text-amber-800' :
                  alert.priority === 'Info' ? 'bg-blue-100 text-blue-800' :
                  'bg-orange-100 text-orange-800'
                }`}>
                  {alert.priority}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};