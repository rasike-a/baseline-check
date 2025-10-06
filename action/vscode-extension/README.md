# Baseline Check Tool - VS Code Extension

A comprehensive VS Code extension for web compatibility analysis and optimization. This extension integrates the Baseline Check Tool directly into your VS Code workflow, providing real-time analysis, automatic fixes, and detailed reporting.

## Features

### 🔍 **Comprehensive Analysis**
- **Baseline Compatibility** - Check web features against baseline browser support
- **Performance Analysis** - Detect and fix performance issues automatically
- **Security Analysis** - Identify security vulnerabilities and provide fixes
- **Accessibility Analysis** - Ensure WCAG compliance and accessibility best practices
- **SEO Analysis** - Optimize for search engines and improve discoverability
- **Bundle Analysis** - Analyze and optimize JavaScript bundles

### 🚀 **Real-time Monitoring**
- **File Watching** - Monitor file changes and run analysis automatically
- **Live Diagnostics** - See issues directly in the editor with inline markers
- **Status Bar Integration** - Quick access to analysis results and commands
- **Output Panel** - Detailed analysis logs and recommendations

### 🛠️ **Developer Experience**
- **Code Snippets** - Pre-built snippets for common patterns with baseline checks
- **Command Palette** - Easy access to all analysis commands
- **Context Menus** - Right-click integration for files and folders
- **Webview Dashboard** - Interactive results panel with statistics and actions

### ⚡ **Automatic Fixes**
- **Auto-fix Issues** - Automatically fix common compatibility and performance issues
- **Smart Recommendations** - AI-powered suggestions for optimization
- **Code Generation** - Generate fallback code and polyfills automatically

## Installation

### From VS Code Marketplace
1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search for "Baseline Check Tool"
4. Click Install

### From Source
1. Clone this repository
2. Run `npm install` in the `vscode-extension` directory
3. Run `npm run compile` to build the extension
4. Press F5 to run the extension in a new Extension Development Host window

## Usage

### Quick Start
1. Open a web project in VS Code
2. Use `Ctrl+Shift+P` to open the command palette
3. Type "Baseline Check" to see all available commands
4. Select "Scan for Baseline Compatibility" to start analysis

### Commands

#### Core Analysis
- **`baseline-check.scan`** - Scan current file or workspace for compatibility issues
- **`baseline-check.analyze`** - Run comprehensive analysis across all categories
- **`baseline-check.dashboard`** - Open interactive dashboard with results

#### Specialized Analysis
- **`baseline-check.performance`** - Performance analysis and optimization
- **`baseline-check.security`** - Security vulnerability detection
- **`baseline-check.accessibility`** - Accessibility compliance checking
- **`baseline-check.seo`** - SEO optimization analysis
- **`baseline-check.bundle`** - JavaScript bundle analysis

#### Monitoring & Automation
- **`baseline-check.monitor`** - Start real-time file monitoring
- **`baseline-check.stopMonitor`** - Stop monitoring
- **`baseline-check.fixIssues`** - Automatically fix detected issues
- **`baseline-check.generateReport`** - Generate detailed analysis report

### Code Snippets

The extension provides intelligent code snippets for common patterns:

#### JavaScript/TypeScript
- `baseline-check` - Add baseline compatibility comment
- `feature-detect` - Feature detection pattern
- `modern-js` - Modern JavaScript feature detection
- `async-fallback` - Async/await with Promise fallback
- `fetch-fallback` - Fetch API with XMLHttpRequest fallback

#### HTML
- `baseline-check-html` - HTML baseline compatibility comment
- `modern-html` - Modern HTML5 elements
- `responsive-img` - Responsive images with fallbacks
- `form-validation` - Forms with progressive enhancement
- `semantic-html` - Semantic HTML structure

#### CSS
- `baseline-check-css` - CSS baseline compatibility comment
- `css-grid-fallback` - CSS Grid with Flexbox fallback
- `css-custom-props` - CSS Custom Properties with fallbacks
- `flexbox-layout` - Flexbox layout patterns
- `responsive-css` - Responsive design patterns

### Configuration

The extension can be configured through VS Code settings:

```json
{
  "baseline-check.enabled": true,
  "baseline-check.autoScan": false,
  "baseline-check.autoFix": false,
  "baseline-check.showNotifications": true,
  "baseline-check.includeNodeModules": false,
  "baseline-check.maxFileSize": 1048576,
  "baseline-check.performance.enabled": true,
  "baseline-check.security.enabled": true,
  "baseline-check.accessibility.enabled": true,
  "baseline-check.seo.enabled": true,
  "baseline-check.bundle.enabled": true,
  "baseline-check.monitoring.enabled": false,
  "baseline-check.monitoring.debounceMs": 1000
}
```

### Workspace Integration

The extension integrates seamlessly with VS Code workspaces:

1. **File Explorer Integration** - Right-click on files/folders to run analysis
2. **Editor Integration** - Right-click in editor for file-specific analysis
3. **Status Bar** - Quick access to scan commands and results
4. **Problems Panel** - Issues appear in the Problems panel with detailed information
5. **Output Panel** - Detailed analysis logs and recommendations

### Real-time Monitoring

Enable real-time monitoring to automatically analyze files as you work:

1. Run `baseline-check.monitor` command
2. Files will be analyzed automatically when saved (if auto-scan is enabled)
3. Results appear in the sidebar panel and Problems panel
4. Use `baseline-check.stopMonitor` to stop monitoring

## Requirements

- VS Code 1.74.0 or higher
- Node.js 16.x or higher (for the underlying Baseline Check Tool)
- Supported file types: `.js`, `.ts`, `.jsx`, `.tsx`, `.html`, `.css`, `.scss`, `.sass`

## Extension Settings

| Setting | Description | Default |
|---------|-------------|---------|
| `baseline-check.enabled` | Enable/disable the extension | `true` |
| `baseline-check.autoScan` | Automatically scan files on save | `false` |
| `baseline-check.autoFix` | Automatically fix issues when possible | `false` |
| `baseline-check.showNotifications` | Show notifications for analysis results | `true` |
| `baseline-check.includeNodeModules` | Include node_modules in analysis | `false` |
| `baseline-check.maxFileSize` | Maximum file size to analyze (bytes) | `1048576` |
| `baseline-check.performance.enabled` | Enable performance analysis | `true` |
| `baseline-check.security.enabled` | Enable security analysis | `true` |
| `baseline-check.accessibility.enabled` | Enable accessibility analysis | `true` |
| `baseline-check.seo.enabled` | Enable SEO analysis | `true` |
| `baseline-check.bundle.enabled` | Enable bundle analysis | `true` |
| `baseline-check.monitoring.enabled` | Enable real-time monitoring | `false` |
| `baseline-check.monitoring.debounceMs` | Debounce time for file changes (ms) | `1000` |

## Troubleshooting

### Common Issues

1. **"Baseline Check Tool not found"**
   - Ensure the Baseline Check Tool is installed: `npm install -g baseline-check-tool`
   - Check that it's in your PATH or install it locally in your project

2. **Analysis not running**
   - Check the Output panel for error messages
   - Ensure you have a workspace folder open
   - Verify file permissions

3. **Performance issues**
   - Disable real-time monitoring if not needed
   - Increase the debounce time for file changes
   - Exclude large directories like `node_modules`

### Debug Mode

To enable debug logging:
1. Open VS Code settings
2. Search for "baseline-check"
3. Enable "Show Notifications" to see detailed error messages
4. Check the Output panel for detailed logs

## Contributing

Contributions are welcome! Please see the main project repository for contribution guidelines.

## License

This extension is part of the Baseline Check Tool project. See the main project for license information.

## Support

- **Issues**: Report issues on the main project repository
- **Documentation**: See the main project documentation
- **Discussions**: Join discussions in the project repository

---

**Made with ❤️ for the web development community**
