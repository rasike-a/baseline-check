# VS Code Extension Installation Guide

This guide will help you install and set up the Baseline Check Tool VS Code Extension.

## Prerequisites

### 1. VS Code
- **Version**: 1.74.0 or higher
- **Download**: [https://code.visualstudio.com/](https://code.visualstudio.com/)

### 2. Node.js
- **Version**: 16.x or higher
- **Download**: [https://nodejs.org/](https://nodejs.org/)

### 3. Baseline Check Tool
The extension requires the Baseline Check Tool to be installed. Choose one of the following methods:

#### Option A: Global Installation (Recommended)
```bash
npm install -g baseline-check-tool
```

#### Option B: Local Installation
```bash
# In your project directory
npm install baseline-check-tool
```

#### Option C: Use from Source
```bash
# Clone the repository
git clone https://github.com/rasike-a/baseline-check.git
cd baseline-check/action
npm install
npm link
```

## Installation Methods

### Method 1: From VS Code Marketplace (When Published)
1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search for "Baseline Check Tool"
4. Click Install

### Method 2: From VSIX Package
1. Download the `.vsix` file from the releases page
2. Open VS Code
3. Go to Extensions (Ctrl+Shift+X)
4. Click the "..." menu in the Extensions panel
5. Select "Install from VSIX..."
6. Choose the downloaded `.vsix` file

### Method 3: From Source (Development)
1. Clone the repository:
   ```bash
   git clone https://github.com/rasike-a/baseline-check.git
   cd baseline-check/action/vscode-extension
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the extension:
   ```bash
   npm run build
   ```

4. Open the extension in VS Code:
   ```bash
   code .
   ```

5. Press F5 to run the extension in a new Extension Development Host window

## Configuration

### 1. Extension Settings
Open VS Code settings (Ctrl+,) and search for "baseline-check":

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

### 2. Workspace Settings
Create a `.vscode/settings.json` file in your project:

```json
{
  "baseline-check.enabled": true,
  "baseline-check.autoScan": true,
  "baseline-check.includeNodeModules": false
}
```

## Quick Start

### 1. Open a Web Project
1. Open VS Code
2. Open a folder containing web files (HTML, CSS, JavaScript, TypeScript)

### 2. Run Your First Analysis
1. Press `Ctrl+Shift+P` to open the command palette
2. Type "Baseline Check"
3. Select "Scan for Baseline Compatibility"
4. Watch the analysis run in the output panel

### 3. View Results
1. Check the Problems panel (Ctrl+Shift+M) for issues
2. Look at the status bar for a quick summary
3. Use the sidebar panel for detailed results
4. Run "Open Dashboard" to see the full report

## Testing the Extension

### Using the Demo Project
1. Open the `demo-project` folder in VS Code
2. Run the baseline check on the demo files
3. Try different analysis types (performance, security, etc.)

### Demo Project Features
The demo project includes:
- **HTML**: Semantic structure with modern elements
- **CSS**: Grid, Flexbox, Custom Properties, Container Queries
- **JavaScript**: Fetch API, Async/Await, Optional Chaining, Nullish Coalescing

## Troubleshooting

### Common Issues

#### 1. "Baseline Check Tool not found"
**Solution**: Install the Baseline Check Tool globally:
```bash
npm install -g baseline-check-tool
```

#### 2. "Command not found" errors
**Solution**: Ensure the tool is in your PATH:
```bash
which baseline-check
# or
where baseline-check
```

#### 3. Analysis not running
**Solution**: 
- Check the Output panel for error messages
- Ensure you have a workspace folder open
- Verify file permissions
- Check that the Baseline Check Tool is working: `baseline-check --version`

#### 4. Performance issues
**Solution**:
- Disable real-time monitoring if not needed
- Increase the debounce time for file changes
- Exclude large directories like `node_modules`
- Reduce the maximum file size limit

### Debug Mode
1. Open VS Code settings
2. Search for "baseline-check"
3. Enable "Show Notifications" to see detailed error messages
4. Check the Output panel for detailed logs

### Logs
- **Output Panel**: Go to View → Output → Select "Baseline Check Tool"
- **Developer Console**: Help → Toggle Developer Tools

## Uninstallation

### Remove Extension
1. Go to Extensions (Ctrl+Shift+X)
2. Find "Baseline Check Tool"
3. Click Uninstall

### Remove Baseline Check Tool (Optional)
```bash
npm uninstall -g baseline-check-tool
```

## Support

### Getting Help
- **Issues**: Report issues on the main project repository
- **Documentation**: See the main project documentation
- **Discussions**: Join discussions in the project repository

### Contributing
- Fork the repository
- Create a feature branch
- Make your changes
- Submit a pull request

## License

This extension is part of the Baseline Check Tool project. See the main project for license information.

---

**Happy coding with baseline compatibility! 🚀**
