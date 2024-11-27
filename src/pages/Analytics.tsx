import React from 'react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  Cell
} from 'recharts';
import { MetricsGrid } from '../components/analytics/MetricsGrid';
import { ConversationStats } from '../components/analytics/ConversationStats';

const messageData = [
  { hour: '00:00', messages: 120, responses: 115 },
  { hour: '04:00', messages: 80, responses: 75 },
  { hour: '08:00', messages: 250, responses: 240 },
  { hour: '12:00', messages: 380, responses: 365 },
  { hour: '16:00', messages: 420, responses: 410 },
  { hour: '20:00', messages: 280, responses: 270 },
];

const userEngagementData = [
  { day: 'Mon', active: 320, new: 45 },
  { day: 'Tue', active: 380, new: 52 },
  { day: 'Wed', active: 420, new: 38 },
  { day: 'Thu', active: 380, new: 42 },
  { day: 'Fri', active: 400, new: 35 },
  { day: 'Sat', active: 280, new: 28 },
  { day: 'Sun', active: 350, new: 30 },
];

const responseTimeData = [
  { name: '< 1min', value: 30 },
  { name: '1-5min', value: 40 },
  { name: '5-15min', value: 15 },
  { name: '15-30min', value: 10 },
  { name: '> 30min', value: 5 },
];

const satisfactionData = [
  { month: 'Jan', satisfaction: 85, engagement: 78 },
  { month: 'Feb', satisfaction: 88, engagement: 82 },
  { month: 'Mar', satisfaction: 87, engagement: 85 },
  { month: 'Apr', satisfaction: 89, engagement: 87 },
  { month: 'May', satisfaction: 92, engagement: 90 },
  { month: 'Jun', satisfaction: 90, engagement: 88 },
];

const COLORS = ['#22c55e', '#3b82f6', '#eab308', '#f97316', '#ef4444'];

export function Analytics() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
      <MetricsGrid />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Message Activity Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Message Activity</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={messageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="messages" 
                  stroke="#3b82f6" 
                  fill="#3b82f6" 
                  fillOpacity={0.1}
                  name="Messages"
                />
                <Area 
                  type="monotone" 
                  dataKey="responses" 
                  stroke="#22c55e" 
                  fill="#22c55e" 
                  fillOpacity={0.1}
                  name="Responses"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Engagement Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">User Engagement</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={userEngagementData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="active" name="Active Users" fill="#3b82f6" />
                <Bar dataKey="new" name="New Users" fill="#22c55e" />
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

        {/* Satisfaction Trends */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Satisfaction Trends</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={satisfactionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="satisfaction" 
                  name="Satisfaction" 
                  stroke="#22c55e" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="engagement" 
                  name="Engagement" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}