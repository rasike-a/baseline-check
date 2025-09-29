# Baseline Check

A comprehensive tool for checking web features against baseline browser compatibility. Helps developers identify which modern web features they're using and whether they have broad browser support.

## Features

- 🔍 **Comprehensive Scanning**: Detects 30+ modern web APIs, CSS features, and JavaScript syntax
- 🌐 **Browser Compatibility**: Uses official MDN Browser Compatibility Data
- 📊 **Multiple Output Formats**: JSON, Markdown, and HTML reports
- ⚙️ **Configurable**: Customize feature detection patterns and file scanning
- 🚀 **CLI & Programmatic API**: Use as a command-line tool or import in your code
- 📱 **Modern Dashboard**: Web interface for visualizing results

## Installation

```bash
# Install dependencies
cd action
npm install

# Make CLI globally available (optional)
npm link
```

## Quick Start

```bash
# Run complete pipeline
npm run start run

# Or use individual commands
npm run scan -- --paths "src,docs" --out "report.json"
npm run check -- --report "report.json"
```

## CLI Usage

### Commands

#### `scan` - Scan codebase for features
```bash
baseline-check scan [options]

Options:
  -p, --paths <paths>     Comma-separated paths to scan (default: ".")
  -o, --out <file>        Output file for scan results (default: "baseline-report.json")
  -c, --config <file>     Configuration file path
```

#### `check` - Check feature compatibility
```bash
baseline-check check [options]

Options:
  -r, --report <file>     Input report file from scan (required)
  -o, --out <file>        Output file for compatibility results
```

#### `report` - Generate summary report
```bash
baseline-check report [options]

Options:
  -r, --report <file>     Input report file (default: "baseline-report.json")
  -f, --format <format>   Output format: markdown, json, html (default: "markdown")
  -o, --out <file>        Output file
```

#### `run` - Complete pipeline
```bash
baseline-check run [options]

Options:
  -p, --paths <paths>     Comma-separated paths to scan (default: ".")
  -o, --out <file>        Output file for final results (default: "baseline-report.json")
  -c, --config <file>     Configuration file path
  --no-check              Skip compatibility checking
  --no-report             Skip report generation
```

#### `init` - Initialize configuration
```bash
baseline-check init [options]

Options:
  -f, --force             Overwrite existing config file
```

## Configuration

Create a `baseline-check.config.js` file to customize behavior:

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
  
  // Custom feature detection rules
  features: {
    'custom-feature': { 
      re: /customPattern/g, 
      category: 'api' 
    }
  },
  
  // Browser support thresholds
  baseline: {
    minBrowsers: 3, // Minimum number of browsers for baseline status
    browsers: ['chrome', 'firefox', 'safari', 'edge']
  }
};
```

## Detected Features

### Web APIs
- `fetch()` API
- Clipboard API (`writeText`, `readText`)
- WebSocket
- IntersectionObserver, ResizeObserver, MutationObserver
- `requestAnimationFrame`, `requestIdleCallback`
- URL API (`createObjectURL`, `revokeObjectURL`)
- AbortController, AbortSignal
- Promise methods (`allSettled`, `any`)
- BigInt

### HTML Elements
- `<dialog>`, `<details>`, `<summary>`

### CSS Features
- `:has()` pseudo-class
- Container queries (`@container`)
- CSS Grid, Flexbox
- Custom properties (`var(--*)`)
- `clamp()`, `min()`, `max()` functions
- Logical properties
- `backdrop-filter`, `scroll-behavior`

### JavaScript Syntax
- Optional chaining (`?.`)
- Nullish coalescing (`??`)
- Dynamic imports (`import()`)
- Top-level await

## Programmatic API

```javascript
import { scan, check, generateSummary } from './src/index.js';

// Scan for features
const scanResult = await scan({
  paths: ['src', 'docs'],
  out: 'scan-report.json'
});

// Check compatibility
const checkResult = await check({
  report: 'scan-report.json',
  out: 'final-report.json'
});

// Generate summary
const summary = await generateSummary({
  report: 'final-report.json',
  format: 'markdown'
});
```

## Report Structure

```json
{
  "metadata": {
    "scannedFiles": 150,
    "processedFiles": 148,
    "errorCount": 2,
    "generatedAt": "2024-01-15T10:30:00.000Z",
    "version": "2.0.0"
  },
  "results": [
    {
      "feature": "window.fetch",
      "status": "baseline_like",
      "files": ["src/api.js", "src/utils.js"],
      "count": 2,
      "mdn": "https://developer.mozilla.org/en-US/docs/Web/API/fetch",
      "browsers": {
        "chrome": [{"version": "42"}],
        "firefox": [{"version": "39"}],
        "safari": [{"version": "10.1"}]
      }
    }
  ]
}
```

## Status Types

- **`baseline_like`**: Supported in 3+ major browsers
- **`risky`**: Limited browser support
- **`unknown`**: No compatibility data available

## Dashboard

The dashboard provides a web interface for viewing results:

1. Run the scan and check pipeline
2. Copy the generated `baseline-report.json` to the `dashboard/` directory
3. Open `dashboard/index.html` in your browser

## GitHub Actions Integration

Create `.github/workflows/baseline-check.yml`:

```yaml
name: Baseline Compatibility Check
on:
  pull_request:
  push:
    branches: [main]

jobs:
  baseline:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          
      - name: Install dependencies
        run: |
          cd action
          npm ci
          
      - name: Run baseline check
        run: |
          cd action
          npm run start run -- --paths "../" --out "../baseline-report.json"
          
      - name: Upload report
        uses: actions/upload-artifact@v4
        with:
          name: baseline-report
          path: baseline-report.json
          
      - name: Generate PR comment
        if: github.event_name == 'pull_request'
        run: |
          cd action
          npm run start report -- --report "../baseline-report.json" --format markdown > comment.md
          gh pr comment ${{ github.event.pull_request.number }} --body-file comment.md
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Changelog

### v2.0.0
- Complete rewrite with modular architecture
- Enhanced CLI with Commander.js
- Expanded feature detection (30+ features)
- Multiple output formats (JSON, Markdown, HTML)
- Configuration system
- Better error handling and validation
- Improved dashboard
- Programmatic API

### v1.0.0
- Initial release
- Basic feature scanning
- MDN compatibility checking
- Simple CLI interface
