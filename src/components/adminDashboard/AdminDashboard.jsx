"use client";

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import styles from "./adminDashboard.module.css";

const AdminDashboard = ({ postStats, userStats }) => {
  // Merge stats into a single data array for comparison
  // We'll use a Map to handle dates efficiently
  const dateMap = new Map();

  postStats.forEach(item => {
    dateMap.set(item._id, { name: item._id.slice(5), stories: item.count, users: 0 });
  });

  userStats.forEach(item => {
    if (dateMap.has(item._id)) {
      dateMap.get(item._id).users = item.count;
    } else {
      dateMap.set(item._id, { name: item._id.slice(5), stories: 0, users: item.count });
    }
  });

  const combinedData = Array.from(dateMap.values()).sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className={styles.container}>
      <div className={styles.chartWrapper}>
        <h2 className={styles.title}>Growth & Activity (Last 30 Days)</h2>
        <div className={styles.chartContainer}>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={combinedData}>
              <defs>
                <linearGradient id="colorStories" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7c4dff" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#7c4dff" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00e5ff" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#00e5ff" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis 
                dataKey="name" 
                stroke="#666" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false}
                minTickGap={10}
              />
              <YAxis 
                stroke="#666" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "rgba(10, 10, 46, 0.95)", 
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "1rem",
                  color: "#fff",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
                }}
                itemStyle={{ color: "#fff", fontSize: "0.8rem" }}
              />
              <Area
                type="monotone"
                dataKey="stories"
                stroke="#7c4dff"
                fillOpacity={1}
                fill="url(#colorStories)"
                strokeWidth={3}
                name="New Stories"
              />
              <Area
                type="monotone"
                dataKey="users"
                stroke="#00e5ff"
                fillOpacity={1}
                fill="url(#colorUsers)"
                strokeWidth={3}
                name="New Explorers"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className={styles.legend}>
          <div className={styles.legendItem}>
            <span className={`${styles.dot} ${styles.storiesDot}`} />
            <span>Stories Published</span>
          </div>
          <div className={styles.legendItem}>
            <span className={`${styles.dot} ${styles.usersDot}`} />
            <span>New Users</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
