export default {
  // Auto-generated config for React
  patterns: [
    "**/*.{js,jsx,ts,tsx}",
    "**/*.css",
    "**/*.scss"
],
  ignore: [
    "**/node_modules/**",
    "**/build/**",
    "**/dist/**",
    "**/coverage/**",
    "**/.next/**"
],
  features: {
    "React.Fragment": {
        "re": {},
        "category": "react"
    },
    "React.Suspense": {
        "re": {},
        "category": "react"
    },
    "React.lazy": {
        "re": {},
        "category": "react"
    },
    "React.memo": {
        "re": {},
        "category": "react"
    },
    "React.useEffect": {
        "re": {},
        "category": "react"
    },
    "React.useState": {
        "re": {},
        "category": "react"
    },
    "React.useCallback": {
        "re": {},
        "category": "react"
    },
    "React.useMemo": {
        "re": {},
        "category": "react"
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
  }
};