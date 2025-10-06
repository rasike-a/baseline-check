# VS Code Extension Testing Checklist

## 🚀 **Quick Start Testing**

### **Prerequisites**
- [ ] VS Code 1.74.0+ installed
- [ ] Node.js 16.x+ installed
- [ ] Baseline Check Tool installed locally in demo project

### **Setup**
1. **Open Extension in VS Code:**
   ```bash
   cd vscode-extension
   code .
   ```

2. **Launch Extension:**
   - Press `F5` or `Run > Start Debugging`
   - New "Extension Development Host" window opens

3. **Open Demo Project:**
   - In Extension Development Host: `File > Open Folder`
   - Select `demo-project` folder

## 🧪 **Feature Testing**

### **1. Extension Activation**
- [ ] Extension loads without errors
- [ ] Status bar shows "Baseline Check" button
- [ ] Welcome message appears
- [ ] Sidebar panel is visible

### **2. Command Palette Testing**
Press `Ctrl+Shift+P` and test each command:

#### **Core Commands**
- [ ] `Baseline Check: Scan for Baseline Compatibility`
  - Should scan current file or workspace
  - Results appear in Problems panel
  - Status bar updates with counts

- [ ] `Baseline Check: Run Full Analysis`
  - Should run comprehensive analysis
  - Output appears in Output panel
  - Dashboard opens in browser

- [ ] `Baseline Check: Open Dashboard`
  - Should open interactive dashboard
  - Shows analysis results and charts

#### **Specialized Analysis Commands**
- [ ] `Baseline Check: Performance Analysis`
  - Should run performance analysis
  - Results in Output panel

- [ ] `Baseline Check: Security Analysis`
  - Should run security analysis
  - Results in Output panel

- [ ] `Baseline Check: Accessibility Analysis`
  - Should run accessibility analysis
  - Results in Output panel

- [ ] `Baseline Check: SEO Analysis`
  - Should run SEO analysis
  - Results in Output panel

- [ ] `Baseline Check: Bundle Analysis`
  - Should run bundle analysis
  - Results in Output panel

#### **Monitoring Commands**
- [ ] `Baseline Check: Start Real-time Monitoring`
  - Should start file watching
  - Status bar shows "Monitoring..."

- [ ] `Baseline Check: Stop Monitoring`
  - Should stop monitoring
  - Status bar returns to normal

#### **Utility Commands**
- [ ] `Baseline Check: Fix Issues Automatically`
  - Should attempt to fix issues
  - Shows fix results

- [ ] `Baseline Check: Generate Report`
  - Should generate baseline-report.json
  - File appears in workspace

### **3. Context Menu Testing**
Right-click on files and test:

#### **File Context Menu**
- [ ] Right-click on `.js` file
  - Should show "Scan for Baseline Compatibility" option
  - Should work when clicked

- [ ] Right-click on `.html` file
  - Should show "Scan for Baseline Compatibility" option
  - Should work when clicked

- [ ] Right-click on `.css` file
  - Should show "Scan for Baseline Compatibility" option
  - Should work when clicked

#### **Folder Context Menu**
- [ ] Right-click on folder
  - Should show "Run Full Analysis" option
  - Should work when clicked

### **4. Editor Integration Testing**

#### **Diagnostics**
- [ ] Open `app.js` file
- [ ] Run scan command
- [ ] Check Problems panel (`Ctrl+Shift+M`)
- [ ] Should see baseline compatibility issues
- [ ] Issues should have proper severity levels
- [ ] Click on issues to see details

#### **Status Bar**
- [ ] Status bar shows scan results
- [ ] Format: "Baseline: X ✅ Y ⚠️ Z ❓"
- [ ] Click status bar to run scan

### **5. Sidebar Panel Testing**

#### **Results Panel**
- [ ] Panel shows analysis statistics
- [ ] Three cards: Baseline, Risky, Unknown
- [ ] Results list shows individual features
- [ ] Each result shows:
  - Feature name
  - Status badge
  - File information
  - MDN link (if available)

#### **Panel Actions**
- [ ] "Scan" button works
- [ ] "Dashboard" button opens dashboard
- [ ] "Fix" button attempts fixes

### **6. Code Snippets Testing**

#### **JavaScript Snippets**
1. Open `app.js`
2. Type `baseline-check` and press Tab
3. Should insert baseline check comment
4. Test other snippets:
   - `feature-detect`
   - `modern-js`
   - `async-fallback`
   - `fetch-fallback`

#### **HTML Snippets**
1. Open `index.html`
2. Type `baseline-check-html` and press Tab
3. Should insert HTML baseline check comment
4. Test other snippets:
   - `modern-html`
   - `responsive-img`
   - `form-validation`
   - `semantic-html`

#### **CSS Snippets**
1. Open `styles.css`
2. Type `baseline-check-css` and press Tab
3. Should insert CSS baseline check comment
4. Test other snippets:
   - `css-grid-fallback`
   - `css-custom-props`
   - `flexbox-layout`
   - `responsive-css`

### **7. Configuration Testing**

#### **Settings**
1. Open Settings (`Ctrl+,`)
2. Search for "baseline-check"
3. Test changing settings:
   - Enable/disable auto-scan
   - Enable/disable notifications
   - Change file size limits
   - Enable/disable analysis types

#### **Workspace Settings**
1. Create `.vscode/settings.json` in demo project
2. Add baseline-check settings
3. Verify settings are applied

### **8. Error Handling Testing**

#### **Missing Tool**
- [ ] Rename `node_modules/.bin/baseline-check`
- [ ] Try running scan command
- [ ] Should show appropriate error message

#### **Invalid Files**
- [ ] Try scanning non-web files
- [ ] Should handle gracefully

#### **Large Files**
- [ ] Test with files exceeding size limit
- [ ] Should skip or handle appropriately

### **9. Performance Testing**

#### **Large Projects**
- [ ] Test with multiple files
- [ ] Monitor memory usage
- [ ] Check for performance issues

#### **Real-time Monitoring**
- [ ] Enable monitoring
- [ ] Make file changes
- [ ] Verify debouncing works
- [ ] Check for memory leaks

## 🐛 **Common Issues & Solutions**

### **Issue: "Baseline Check Tool not found"**
**Solution:** Ensure tool is installed locally:
```bash
cd demo-project
npm install baseline-check-tool
```

### **Issue: Extension not activating**
**Solution:** Check Output panel for errors, ensure all dependencies installed

### **Issue: Commands not appearing**
**Solution:** Reload window (`Ctrl+Shift+P` > "Developer: Reload Window")

### **Issue: Snippets not working**
**Solution:** Ensure file has correct language mode (JavaScript, HTML, CSS)

## ✅ **Success Criteria**

The extension is working correctly if:
- [ ] All commands execute without errors
- [ ] Diagnostics appear in Problems panel
- [ ] Status bar shows correct information
- [ ] Sidebar panel displays results
- [ ] Code snippets work in all supported languages
- [ ] Dashboard opens and shows data
- [ ] Real-time monitoring works
- [ ] Configuration settings are respected

## 📊 **Test Results**

| Feature | Status | Notes |
|---------|--------|-------|
| Extension Activation | ⬜ | |
| Command Palette | ⬜ | |
| Context Menus | ⬜ | |
| Diagnostics | ⬜ | |
| Status Bar | ⬜ | |
| Sidebar Panel | ⬜ | |
| Code Snippets | ⬜ | |
| Configuration | ⬜ | |
| Error Handling | ⬜ | |
| Performance | ⬜ | |

---

**Happy Testing! 🚀**
