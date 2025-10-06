# 🧪 Quick VS Code Extension Test

## ✅ **Step-by-Step Checklist**

### **Setup (2 minutes)**
- [ ] VS Code opened with extension project
- [ ] Pressed `F5` to launch Extension Development Host
- [ ] Opened `demo-project` folder in Extension Development Host
- [ ] Extension activated (status bar shows "Baseline Check")

### **Core Features (5 minutes)**
- [ ] **Command Palette Test**
  - [ ] Press `Ctrl+Shift+P`
  - [ ] Type "Baseline Check"
  - [ ] See 12+ commands listed
  - [ ] Select "Scan for Baseline Compatibility"
  - [ ] See results in Output panel

- [ ] **Sidebar Panel Test**
  - [ ] Click "Baseline Check" icon in Activity Bar
  - [ ] See three cards: Baseline, Risky, Unknown
  - [ ] See list of individual features
  - [ ] See action buttons: Scan, Dashboard, Fix

- [ ] **Problems Panel Test**
  - [ ] Press `Ctrl+Shift+M` to open Problems panel
  - [ ] See baseline compatibility issues listed
  - [ ] Click on issues to see details

### **Code Snippets (3 minutes)**
- [ ] **JavaScript Snippets**
  - [ ] Open `app.js`
  - [ ] Type `baseline-check` + Tab
  - [ ] See comment inserted
  - [ ] Try `feature-detect` + Tab
  - [ ] Try `modern-js` + Tab

- [ ] **HTML Snippets**
  - [ ] Open `index.html`
  - [ ] Type `baseline-check-html` + Tab
  - [ ] See HTML comment inserted
  - [ ] Try `responsive-img` + Tab

- [ ] **CSS Snippets**
  - [ ] Open `styles.css`
  - [ ] Type `baseline-check-css` + Tab
  - [ ] See CSS comment inserted
  - [ ] Try `css-grid-fallback` + Tab

### **Advanced Features (5 minutes)**
- [ ] **Specialized Analysis**
  - [ ] Try "Performance Analysis" command
  - [ ] Try "Security Analysis" command
  - [ ] Try "Accessibility Analysis" command
  - [ ] See results in Output panel

- [ ] **Context Menus**
  - [ ] Right-click on `app.js` in Explorer
  - [ ] See "Scan for Baseline Compatibility" option
  - [ ] Right-click on folder
  - [ ] See "Run Full Analysis" option

- [ ] **Real-time Monitoring**
  - [ ] Try "Start Real-time Monitoring" command
  - [ ] Make a change to any file
  - [ ] See automatic analysis (if auto-scan enabled)

### **Dashboard Test (2 minutes)**
- [ ] **Open Dashboard**
  - [ ] Try "Open Dashboard" command
  - [ ] Dashboard opens in browser
  - [ ] See interactive charts and results
  - [ ] Navigate between different analysis types

## 🎯 **Success Indicators**

### **✅ Extension is Working If:**
- Status bar shows "Baseline Check" button
- Command palette shows 12+ baseline check commands
- Sidebar panel displays results with statistics
- Code snippets work in all supported file types
- Problems panel shows baseline compatibility issues
- Context menus show baseline check options
- Dashboard opens and displays data

### **❌ Something's Wrong If:**
- No "Baseline Check" in status bar
- Commands not found in command palette
- Sidebar panel is empty or shows errors
- Snippets don't work
- No issues in Problems panel
- Dashboard doesn't open or shows errors

## 🚨 **Troubleshooting**

### **If Extension Doesn't Load:**
1. Check Output panel for errors
2. Reload window: `Ctrl+Shift+P` → "Developer: Reload Window"
3. Restart VS Code

### **If Commands Don't Work:**
1. Ensure you're in Extension Development Host window
2. Check that demo-project folder is open
3. Verify extension is activated

### **If No Results:**
1. Run scan command first
2. Check Output panel for errors
3. Ensure Baseline Check Tool is working

---

**Total Testing Time: ~15 minutes**
**Expected Result: Fully functional VS Code extension! 🎉**
