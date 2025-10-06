# 🚀 VS Code Extension Demo Guide

## **Quick Demo (5 minutes)**

### **Step 1: Launch the Extension**
```bash
# Open VS Code with the extension
code .

# Press F5 to launch Extension Development Host
# A new VS Code window will open with the extension loaded
```

### **Step 2: Open Demo Project**
1. In the Extension Development Host window: `File > Open Folder`
2. Select the `demo-project` folder
3. You should see the extension activate in the status bar

### **Step 3: Test Core Features**

#### **A. Run a Quick Scan**
1. Press `Ctrl+Shift+P`
2. Type "Baseline Check: Scan"
3. Select "Scan for Baseline Compatibility"
4. Watch the analysis run in the Output panel
5. Check the Problems panel (`Ctrl+Shift+M`) for issues

#### **B. View Results in Sidebar**
1. Look for the "Baseline Check" icon in the Activity Bar (left sidebar)
2. Click on it to see the results panel
3. You should see statistics and individual feature results

#### **C. Test Code Snippets**
1. Open `app.js`
2. Type `baseline-check` and press Tab
3. You should see a baseline check comment inserted
4. Try other snippets: `feature-detect`, `modern-js`, `async-fallback`

#### **D. Test HTML Snippets**
1. Open `index.html`
2. Type `baseline-check-html` and press Tab
3. Try other snippets: `modern-html`, `responsive-img`, `semantic-html`

#### **E. Test CSS Snippets**
1. Open `styles.css`
2. Type `baseline-check-css` and press Tab
3. Try other snippets: `css-grid-fallback`, `flexbox-layout`, `responsive-css`

### **Step 4: Test Advanced Features**

#### **A. Run Full Analysis**
1. Press `Ctrl+Shift+P`
2. Type "Baseline Check: Run Full Analysis"
3. This will run all analysis types and open a dashboard

#### **B. Test Specialized Analysis**
1. Try "Baseline Check: Performance Analysis"
2. Try "Baseline Check: Security Analysis"
3. Try "Baseline Check: Accessibility Analysis"

#### **C. Test Real-time Monitoring**
1. Press `Ctrl+Shift+P`
2. Type "Baseline Check: Start Real-time Monitoring"
3. Make a change to any file
4. Watch the extension detect and analyze the change

#### **D. Test Context Menus**
1. Right-click on `app.js` in the Explorer
2. You should see "Scan for Baseline Compatibility" option
3. Right-click on a folder to see "Run Full Analysis" option

### **Step 5: Test Configuration**

#### **A. Open Settings**
1. Press `Ctrl+,` to open Settings
2. Search for "baseline-check"
3. Try changing some settings:
   - Enable/disable auto-scan
   - Enable/disable notifications
   - Change file size limits

#### **B. Test Workspace Settings**
1. Create `.vscode/settings.json` in demo project:
```json
{
  "baseline-check.enabled": true,
  "baseline-check.autoScan": true,
  "baseline-check.showNotifications": true
}
```

## **What You Should See**

### **Status Bar**
- Shows "Baseline Check" button
- After scanning: "Baseline: X ✅ Y ⚠️ Z ❓"

### **Problems Panel**
- Lists all baseline compatibility issues
- Each issue shows:
  - Severity level (Warning, Info)
  - Feature name
  - File location
  - Description

### **Sidebar Panel**
- Three cards showing counts: Baseline, Risky, Unknown
- List of individual features with:
  - Feature name
  - Status badge
  - File information
  - MDN links

### **Output Panel**
- Detailed analysis logs
- Error messages (if any)
- Progress information

### **Code Snippets**
- Intelligent code completion
- Baseline compatibility comments
- Feature detection patterns
- Modern syntax with fallbacks

## **Demo Script for Presentations**

### **1. Introduction (30 seconds)**
"This is the Baseline Check Tool VS Code Extension. It helps developers ensure their web code is compatible with baseline browsers."

### **2. Quick Scan (1 minute)**
"Let me show you how it works. I'll run a quick scan on this demo project..."
- Press `Ctrl+Shift+P`
- Type "Baseline Check: Scan"
- Show results in Problems panel

### **3. Sidebar Results (30 seconds)**
"Here you can see the results in the sidebar panel with statistics and individual features..."

### **4. Code Snippets (1 minute)**
"One of the coolest features is the intelligent code snippets..."
- Show JavaScript snippets
- Show HTML snippets
- Show CSS snippets

### **5. Advanced Analysis (1 minute)**
"For more comprehensive analysis, you can run specialized checks..."
- Show Performance Analysis
- Show Security Analysis
- Show Accessibility Analysis

### **6. Real-time Monitoring (30 seconds)**
"You can also enable real-time monitoring to catch issues as you code..."
- Enable monitoring
- Make a file change
- Show automatic analysis

### **7. Wrap-up (30 seconds)**
"This extension integrates seamlessly into your VS Code workflow, helping you build more compatible web applications."

## **Troubleshooting**

### **If Extension Doesn't Load**
1. Check Output panel for errors
2. Reload window: `Ctrl+Shift+P` > "Developer: Reload Window"
3. Restart VS Code

### **If Commands Don't Work**
1. Ensure Baseline Check Tool is installed in demo project
2. Check that you're in the Extension Development Host window
3. Verify the extension is activated

### **If Snippets Don't Work**
1. Ensure file has correct language mode
2. Check that snippets are properly loaded
3. Try typing the snippet prefix and pressing Tab

---

**Happy Demo-ing! 🎉**
