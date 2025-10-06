# 🔍 Baseline Check Tool

[![CI/CD Pipeline](https://github.com/baseline-check/baseline-check/workflows/CI/CD%20Pipeline/badge.svg)](https://github.com/baseline-check/baseline-check/actions)
[![Security Scan](https://github.com/baseline-check/baseline-check/workflows/Security%20Scan/badge.svg)](https://github.com/baseline-check/baseline-check/actions)
[![NPM Version](https://img.shields.io/npm/v/baseline-check-tool.svg)](https://www.npmjs.com/package/baseline-check-tool)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **A comprehensive, AI-powered web compatibility analysis tool that helps developers identify modern web features and ensure baseline browser support.**

## 🚀 **What is Baseline Check?**

Baseline Check is an advanced tool that analyzes your web codebase to identify modern web features and assess their compatibility with baseline browsers. It helps developers make informed decisions about feature usage, provides smart recommendations, and ensures your web applications work reliably across different browsers.

### **🎯 Key Benefits**
- **🔍 Comprehensive Analysis**: Detects 70+ modern web APIs, CSS features, and JavaScript syntax
- **🤖 AI-Powered Insights**: Smart recommendations and automatic code fixes
- **📊 Rich Visualizations**: Interactive dashboards and detailed reports
- **⚡ Real-time Monitoring**: Live file watching with instant feedback
- **🛠️ Developer Tools**: VS Code extension, CLI, and programmatic API
- **🔒 Security & Quality**: Built-in security, accessibility, and SEO analysis

---

## 📦 **Installation**

### **Quick Start (Recommended)**
```bash
# One-time usage
npx baseline-check-tool init
npx baseline-check-tool run

# Or install globally
npm install -g baseline-check-tool
baseline-check-tool init
baseline-check-tool run
```

### **Project Integration**
```bash
# As a dev dependency
npm install --save-dev baseline-check-tool

# Initialize configuration
npx baseline-check-tool init

# Run analysis
npx baseline-check-tool run
```

---

## 🎯 **Core Features**

### **1. 🔍 Enhanced Feature Detection**
- **70+ Modern Features**: Web APIs, CSS, HTML, JavaScript, Framework-specific
- **Smart Detection**: Context-aware pattern matching
- **Framework Support**: React, Vue, Angular, Svelte, Next.js, Nuxt.js
- **Custom Patterns**: Define your own detection rules

### **2. 🌐 Browser Compatibility Analysis**
- **MDN BCD Integration**: Official browser compatibility data
- **Baseline Classification**: Features categorized as baseline, risky, or unknown
- **Multi-browser Support**: Chrome, Firefox, Safari, Edge analysis
- **Support Matrices**: Detailed browser version compatibility

### **3. 🤖 AI-Powered Analysis**
- **Smart Recommendations**: Context-aware suggestions for risky features
- **Automatic Code Fixes**: AI-powered code improvements
- **Learning System**: Adapts to your codebase patterns
- **Risk Assessment**: Intelligent scoring and prioritization

### **4. 📊 Advanced Analytics & Monitoring**
- **Real-time Monitoring**: Live file watching with instant analysis
- **Trend Analysis**: Track feature adoption over time
- **Performance Metrics**: Bundle size, load time, optimization opportunities
- **Usage Analytics**: Comprehensive reporting and insights

---

## 🛠️ **Analysis Modules**

### **🔒 Security Analysis**
```bash
baseline-check-tool security --paths "src"
baseline-check-tool security-dashboard
```
- **Vulnerability Detection**: XSS, CSRF, Injection attacks
- **Security Headers**: Missing security configurations
- **Secret Detection**: Hardcoded credentials and API keys
- **OWASP Compliance**: Industry-standard security practices

### **♿ Accessibility Analysis**
```bash
baseline-check-tool accessibility --paths "src"
baseline-check-tool accessibility-dashboard
```
- **WCAG Compliance**: A, AA, AAA level checking
- **Color Contrast**: Automated contrast ratio analysis
- **Keyboard Navigation**: Focus management and tab order
- **Screen Reader Support**: ARIA attributes and semantic HTML

### **🔍 SEO Optimization**
```bash
baseline-check-tool seo --paths "src"
baseline-check-tool seo-dashboard
```
- **Technical SEO**: Meta tags, sitemaps, structured data
- **Content Analysis**: H1 tags, keyword density, content length
- **Performance SEO**: Page speed, image optimization
- **Mobile SEO**: Viewport, touch targets, responsive design

### **⚡ Performance Analysis**
```bash
baseline-check-tool performance --paths "src"
baseline-check-tool performance-dashboard
```
- **Bundle Analysis**: Size optimization, code splitting
- **Performance Bottlenecks**: Large files, synchronous operations
- **Optimization Recommendations**: Automatic performance improvements
- **Bundle Visualization**: Interactive dependency graphs

### **📦 Bundle Analysis**
```bash
baseline-check-tool bundle --paths "src"
baseline-check-tool bundle-dashboard
```
- **Dependency Analysis**: Large dependencies, duplicates
- **Tree Shaking**: Unused code detection
- **Compression**: Gzip/Brotli optimization
- **Caching**: Cache busting and optimization

---

## 🎨 **Interactive Dashboards**

### **📊 Real-time Dashboard**
```bash
baseline-check-tool monitor --paths "src"
```
- **Live Statistics**: Real-time feature counts and trends
- **Interactive Charts**: Bar, line, and pie charts
- **Alert System**: Configurable notifications and warnings
- **File Watching**: Automatic re-analysis on file changes

### **📈 Analytics Dashboard**
```bash
baseline-check-tool analytics
```
- **Trend Analysis**: Feature adoption over time
- **Risk Scoring**: Comprehensive risk assessment
- **Performance Metrics**: Load times and optimization scores
- **Export Options**: JSON, CSV, and HTML reports

### **🎯 Specialized Dashboards**
- **Security Dashboard**: Vulnerability overview and remediation
- **Accessibility Dashboard**: WCAG compliance and recommendations
- **SEO Dashboard**: Search optimization insights
- **Performance Dashboard**: Speed and optimization metrics
- **Bundle Dashboard**: Dependency and size analysis

---

## 🛠️ **Developer Tools**

### **🔌 VS Code Extension**
```bash
# Install from VS Code Marketplace
# Or install locally
cd action/vscode-extension
npm install
npm run compile
```

**Features:**
- **Sidebar Panel**: Real-time analysis results
- **Inline Diagnostics**: Code warnings and suggestions
- **Command Palette**: Quick access to all features
- **Interactive UI**: Beautiful visualizations and filtering
- **Auto-scan**: Automatic analysis on file save

### **⚡ CLI Commands**

#### **Core Commands**
```bash
# Complete analysis pipeline
baseline-check-tool run --paths "src"

# Individual analysis steps
baseline-check-tool scan --paths "src"
baseline-check-tool check --report "baseline-report.json"
baseline-check-tool report --format html

# Interactive mode
baseline-check-tool interactive
```

#### **Analysis Commands**
```bash
# Security analysis
baseline-check-tool security --paths "src"

# Accessibility analysis
baseline-check-tool accessibility --paths "src"

# SEO analysis
baseline-check-tool seo --paths "src"

# Performance analysis
baseline-check-tool performance --paths "src"

# Bundle analysis
baseline-check-tool bundle --paths "src"
```

#### **AI-Powered Features**
```bash
# AI analysis and recommendations
baseline-check-tool ai-analyze --paths "src"

# Automatic code fixing
baseline-check-tool ai-fix --paths "src"

# AI learning and personalization
baseline-check-tool ai-learn --paths "src"
```

#### **Framework Integration**
```bash
# Setup for specific frameworks
baseline-check-tool setup --framework react --github-action --vscode
baseline-check-tool setup --framework vue --github-action
baseline-check-tool setup --framework angular --github-action
```

---

## ⚙️ **Configuration**

### **Configuration File (`baseline-check.config.js`)**
```javascript
export default {
  // File patterns to scan
  patterns: [
    '**/*.{js,ts,tsx,jsx,css,html}',
    '**/*.vue',
    '**/*.svelte'
  ],
  
  // Directories to ignore
  ignore: [
    '**/node_modules/**',
    '**/dist/**',
    '**/build/**',
    '**/.git/**',
    '**/coverage/**'
  ],
  
  // Feature detection settings
  features: {
    preset: 'default', // 'minimal', 'modern', 'react', 'vue', 'angular', 'pwa'
    custom: {
      'my-feature': { 
        re: /myPattern/g, 
        category: 'api' 
      }
    }
  },
  
  // Browser support thresholds
  baseline: {
    minBrowsers: 3,
    browsers: ['chrome', 'firefox', 'safari', 'edge']
  },
  
  // Performance settings
  performance: {
    maxFileSize: 1024 * 1024, // 1MB
    concurrentFiles: 10,
    cacheResults: true
  },
  
  // AI settings
  ai: {
    enabled: true,
    openaiApiKey: process.env.OPENAI_API_KEY,
    localAnalysis: true
  },
  
  // Monitoring settings
  monitoring: {
    enabled: true,
    watchPaths: ['src'],
    alertThresholds: {
      risky: 5,
      unknown: 10
    }
  }
};
```

---

## 🎯 **Detected Features**

### **Web APIs (30+ features)**
- `fetch()`, `WebSocket`, `IntersectionObserver`
- `Clipboard API`, `WebRTC`, `Service Workers`
- `AbortController`, `Promise.allSettled`, `BigInt`
- `requestAnimationFrame`, `requestIdleCallback`

### **CSS Features (20+ features)**
- `:has()` pseudo-class, Container queries
- CSS Grid, Flexbox, Custom properties
- `clamp()`, `min()`, `max()` functions
- Logical properties, `backdrop-filter`

### **HTML Elements (10+ features)**
- `<dialog>`, `<details>`, `<summary>`
- `<template>`, `<slot>`, Custom elements

### **JavaScript Syntax (15+ features)**
- Optional chaining (`?.`), Nullish coalescing (`??`)
- Dynamic imports, Top-level await
- Private fields, Static blocks

### **Framework Features (20+ features)**
- React: Hooks, Context, Suspense
- Vue: Composition API, Teleport, Suspense
- Angular: Signals, Standalone components
- Svelte: Stores, Actions, Transitions

---

## 📊 **Output Formats**

### **JSON Reports**
```json
{
  "metadata": {
    "scannedFiles": 150,
    "processedFiles": 148,
    "generatedAt": "2024-01-15T10:30:00Z"
  },
  "detected": [
    {
      "feature": "fetch",
      "files": ["src/api.js", "src/utils.js"],
      "count": 5,
      "status": "baseline_like"
    }
  ],
  "results": [
    {
      "feature": "fetch",
      "status": "baseline_like",
      "browsers": {
        "chrome": "42+",
        "firefox": "39+",
        "safari": "10.1+",
        "edge": "14+"
      },
      "recommendations": []
    }
  ]
}
```

### **HTML Dashboards**
- **Interactive Visualizations**: Charts, graphs, and tables
- **Real-time Updates**: Live data refresh
- **Responsive Design**: Works on all devices
- **Export Options**: PDF, PNG, SVG

### **Markdown Reports**
- **GitHub-friendly**: Perfect for PR comments
- **Structured Format**: Easy to read and share
- **Actionable Items**: Clear next steps

---

## 🚀 **CI/CD Integration**

### **GitHub Actions**
```yaml
name: Baseline Check
on: [push, pull_request]

jobs:
  baseline-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install -g baseline-check-tool
      - run: baseline-check-tool run --paths "src"
      - uses: actions/upload-artifact@v3
        with:
          name: baseline-report
          path: baseline-report.json
```

### **Docker Support**
```dockerfile
FROM node:18-alpine
RUN npm install -g baseline-check-tool
COPY . .
RUN baseline-check-tool run
```

---

## 📈 **Analytics & Monitoring**

### **Usage Analytics**
- **Feature Adoption**: Track which features are being used
- **Risk Trends**: Monitor risky feature usage over time
- **Performance Metrics**: Bundle size and optimization scores
- **Team Insights**: Collaboration and code quality metrics

### **Real-time Monitoring**
- **File Watching**: Automatic re-analysis on changes
- **Alert System**: Configurable notifications
- **Dashboard Updates**: Live statistics and charts
- **Performance Tracking**: Continuous optimization monitoring

---

## 🤝 **Contributing**

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### **Development Setup**
```bash
# Clone the repository
git clone https://github.com/your-org/baseline-check.git
cd baseline-check

# Install dependencies
cd action
npm install

# Run tests
npm test

# Build the project
npm run build
```

---

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 **Acknowledgments**

- **MDN Web Docs** for browser compatibility data
- **OpenAI** for AI-powered analysis capabilities
- **VS Code** for the excellent extension platform
- **The web development community** for feedback and contributions

---

## 📞 **Support**

- **Documentation**: [Full Documentation](docs/)
- **Issues**: [GitHub Issues](https://github.com/your-org/baseline-check/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-org/baseline-check/discussions)
- **Email**: support@baseline-check.dev

---

<div align="center">

**Made with ❤️ for the web development community**

[Website](https://baseline-check.dev) • [Documentation](https://docs.baseline-check.dev) • [Changelog](CHANGELOG.md) • [Roadmap](ROADMAP.md)

</div>