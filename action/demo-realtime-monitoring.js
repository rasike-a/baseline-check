#!/usr/bin/env node

/**
 * Real-time Monitoring Demo
 * Demonstrates the powerful real-time monitoring capabilities
 */

import fs from 'node:fs';
import path from 'node:path';
import { RealtimeMonitor } from './src/monitoring/realtime-monitor.js';
import { AlertSystem } from './src/monitoring/alert-system.js';
import { RealtimeDashboard } from './src/monitoring/realtime-dashboard.js';

console.log('🚀 Baseline Check Tool - Real-time Monitoring Demo');
console.log('==================================================\n');

async function createDemoFiles() {
  const demoDir = './demo-monitoring';
  
  // Create demo directory
  if (!fs.existsSync(demoDir)) {
    fs.mkdirSync(demoDir, { recursive: true });
  }
  
  // Create demo files with different types of issues
  const demoFiles = {
    'good-code.js': `// Good, baseline-compatible code
const element = document.getElementById('app');
element.innerHTML = '<h1>Hello World</h1>';

// Using modern but well-supported features
const data = { name: 'John', age: 30 };
const { name, age } = data;

// CSS Grid with fallback
const gridStyle = \`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
\`;

// Fallback for older browsers
if (!CSS.supports('display', 'grid')) {
  element.style.display = 'flex';
  element.style.flexWrap = 'wrap';
}`,

    'problematic-code.js': `// Code with compatibility issues
const element = document.querySelector('.container');

// Using CSS Grid without fallback
element.style.display = 'grid';
element.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))';

// Using modern features without checking support
element.style.backdropFilter = 'blur(10px)';
element.style.scrollBehavior = 'smooth';

// Using eval (security risk)
const userCode = 'console.log("Hello")';
eval(userCode);

// Performance issues
for (let i = 0; i < 10000; i++) {
  document.querySelector('.item').style.display = 'none';
}`,

    'react-component.jsx': `import React, { useState, useEffect } from 'react';

// React component with modern features
const ModernComponent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Using modern fetch API
    fetch('/api/data')
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, []);

  // Using CSS-in-JS with modern features
  const styles = {
    container: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '20px',
      padding: '20px'
    },
    card: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '12px',
      padding: '20px',
      color: 'white',
      backdropFilter: 'blur(10px)'
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      {data?.map(item => (
        <div key={item.id} style={styles.card}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ModernComponent;`,

    'styles.css': `/* Modern CSS with potential compatibility issues */
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
}

.card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  padding: 20px;
  color: white;
  backdrop-filter: blur(10px);
  scroll-behavior: smooth;
}

/* CSS Custom Properties */
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --spacing: 20px;
}

/* Modern selectors */
.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
}

/* CSS Grid with subgrid (very new) */
.grid-container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
}

.grid-item {
  display: grid;
  grid-template-rows: subgrid;
}`,

    'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Modern Web App</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <div class="card">
            <h1>Welcome to Modern Web</h1>
            <p>This app uses cutting-edge web features</p>
        </div>
        <div class="card">
            <h2>Features</h2>
            <ul>
                <li>CSS Grid Layout</li>
                <li>CSS Custom Properties</li>
                <li>Modern JavaScript</li>
                <li>React Components</li>
            </ul>
        </div>
    </div>
    
    <script type="module" src="good-code.js"></script>
    <script type="module" src="problematic-code.js"></script>
</body>
</html>`
  };
  
  // Write demo files
  for (const [filename, content] of Object.entries(demoFiles)) {
    const filePath = path.join(demoDir, filename);
    fs.writeFileSync(filePath, content);
    console.log(`📝 Created: ${filename}`);
  }
  
  return demoDir;
}

async function runDemo() {
  try {
    // Create demo files
    console.log('📁 Creating demo files...');
    const demoDir = await createDemoFiles();
    console.log(`✅ Demo files created in: ${demoDir}\n`);
    
    // Initialize monitoring system
    console.log('🔧 Initializing monitoring system...');
    const monitor = new RealtimeMonitor({
      watchPaths: [demoDir],
      pollInterval: 2000, // 2 seconds for demo
      enableAlerts: true,
      alertThresholds: {
        riskScore: 60,
        compatibilityScore: 70
      }
    });
    
    const alertSystem = new AlertSystem({
      notificationChannels: ['console', 'file'],
      alertHistoryPath: './demo-alert-history.json'
    });
    
    const dashboard = new RealtimeDashboard({
      theme: 'dark',
      title: 'Baseline Check - Real-time Demo'
    });
    
    // Setup event handlers
    let alertCount = 0;
    
    monitor.on('alert', async (alert) => {
      alertCount++;
      console.log(`\n🚨 Alert #${alertCount}: ${alert.message}`);
      await alertSystem.processAlert(alert);
    });
    
    monitor.on('fileAnalyzed', ({ filePath, analysis }) => {
      const fileName = path.basename(filePath);
      console.log(`✅ Analyzed: ${fileName} (Risk: ${analysis.riskScore}%, Compat: ${analysis.compatibilityScore}%)`);
    });
    
    monitor.on('error', (error) => {
      console.error(`❌ Monitor error: ${error.message}`);
    });
    
    // Start monitoring
    console.log('🚀 Starting real-time monitoring...');
    await monitor.start();
    
    // Generate dashboard
    console.log('🌐 Generating real-time dashboard...');
    const dashboardPath = await dashboard.start(monitor, alertSystem);
    console.log(`📊 Dashboard: file://${path.resolve(dashboardPath)}\n`);
    
    console.log('👀 Monitoring demo files for changes...');
    console.log('💡 Try editing the files in the demo-monitoring directory to see real-time alerts!');
    console.log('🛑 Press Ctrl+C to stop monitoring\n');
    
    // Show initial analysis
    console.log('📊 Initial Analysis Results:');
    const stats = monitor.getStats();
    console.log(`   Files monitored: ${stats.totalFiles}`);
    console.log(`   Cached analyses: ${stats.cachedAnalyses}`);
    
    const analysisSummary = monitor.getAnalysisSummary();
    console.log(`   Average risk score: ${analysisSummary.averageRiskScore}%`);
    console.log(`   Average compatibility: ${analysisSummary.averageCompatibilityScore}%`);
    console.log(`   Critical issues: ${analysisSummary.criticalIssues}\n`);
    
    // Keep the process running
    process.on('SIGINT', async () => {
      console.log('\n\n🛑 Stopping monitoring demo...');
      monitor.stop();
      
      // Show final statistics
      const finalStats = alertSystem.getStats();
      console.log('\n📊 Final Statistics:');
      console.log(`   Total alerts: ${finalStats.total}`);
      console.log(`   Active alerts: ${finalStats.active}`);
      console.log(`   Alerts in last hour: ${finalStats.last1h}`);
      
      if (Object.keys(finalStats.bySeverity).length > 0) {
        console.log('\n   By Severity:');
        Object.entries(finalStats.bySeverity).forEach(([severity, count]) => {
          const icon = severity === 'critical' ? '🔴' : 
                      severity === 'high' ? '🟠' : 
                      severity === 'medium' ? '🟡' : '🟢';
          console.log(`     ${icon} ${severity}: ${count}`);
        });
      }
      
      console.log('\n✅ Demo completed!');
      console.log(`📊 Dashboard saved: ${dashboardPath}`);
      console.log(`📝 Alert history: ./demo-alert-history.json`);
      
      // Cleanup
      if (fs.existsSync('./demo-alert-history.json')) {
        fs.unlinkSync('./demo-alert-history.json');
      }
      
      process.exit(0);
    });
    
    // Keep alive
    setInterval(() => {}, 1000);
    
  } catch (error) {
    console.error('❌ Demo failed:', error.message);
    process.exit(1);
  }
}

// Run the demo
runDemo();
