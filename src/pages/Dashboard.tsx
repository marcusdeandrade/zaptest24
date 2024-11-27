import React from 'react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  Cell
} from 'recharts';
import { MessageSquare, Users, Clock, Zap } from 'lucide-react';

// Metrics data
const metrics = [
  { icon: MessageSquare, label: 'Total Conversations', value: '2,345', change: '+12%' },
  { icon: Users, label: 'Active Users', value: '432', change: '+8%' },
  { icon: Clock, label: 'Avg. Response Time', value: '1.2m', change: '-15%' },
  { icon: Zap, label: 'Messages Today', value: '1,234', change: '+23%' },
];

// Chart data
const messageActivityData = [
  { time: '00:00', messages: 450 },
  { time: '04:00', messages: 200 },
  { time: '08:00', messages: 800 },
  { time: '12:00', messages: 1200 },
  { time: '16:00', messages: 1500 },
  { time: '20:00', messages: 900 },
];

const userEngagementData = [
  { day: 'Mon', users: 320 },
  { day: 'Tue', users: 420 },
  { day: 'Wed', users: 380 },
  { day: 'Thu', users: 450 },
  { day: 'Fri', users: 400 },
  { day: 'Sat', users: 280 },
  { day: 'Sun', users: 350 },
];

const responseTimeData = [
  { name: '< 1min', value: 30 },
  { name: '1-5min', value: 40 },
  { name: '5-15min', value: 15 },
  { name: '15-30min', value: 10 },
  { name: '> 30min', value: 5 },
];

const performanceData = [
  { subject: 'Response Rate', A: 90 },
  { subject: 'Satisfaction', A: 85 },
  { subject: 'Resolution', A: 88 },
  { subject: 'Engagement', A: 82 },
  { subject: 'Retention', A: 78 },
  { subject: 'Growth', A: 85 },
];

const COLORS = ['#22c55e', '#3b82f6', '#eab308', '#f97316', '#ef4444'];

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <metric.icon className="h-6 w-6 text-gray-400" />
              <span className="ml-2 text-sm font-medium text-gray-500">{metric.label}</span>
            </div>
            <div className="mt-2 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">{metric.value}</p>
              <p className="ml-2 text-sm font-medium text-green-600">{metric.change}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Message Activity */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Message Activity</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={messageActivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="messages" 
                  stroke="#3b82f6" 
                  fill="#3b82f6" 
                  fillOpacity={0.1} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Engagement */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">User Engagement</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={userEngagementData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="users" fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Response Time Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Response Time Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={responseTimeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label
                >
                  {responseTimeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Metrics</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={performanceData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis domain={[0, 100]} />
                <Radar
                  name="Performance"
                  dataKey="A"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.2}
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}