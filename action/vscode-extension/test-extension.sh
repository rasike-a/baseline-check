#!/bin/bash

echo "🧪 VS Code Extension Testing Script"
echo "=================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the vscode-extension directory"
    exit 1
fi

echo "✅ Found extension package.json"

# Check if baseline-check-tool is installed in demo project
if [ ! -d "demo-project/node_modules" ]; then
    echo "📦 Installing baseline-check-tool in demo project..."
    cd demo-project
    npm install baseline-check-tool
    cd ..
fi

echo "✅ Baseline Check Tool is available"

# Test the tool works
echo "🔍 Testing Baseline Check Tool..."
cd demo-project
if npx baseline-check --version > /dev/null 2>&1; then
    echo "✅ Baseline Check Tool is working"
else
    echo "❌ Baseline Check Tool is not working"
    exit 1
fi

# Test scanning
echo "🔍 Testing scan functionality..."
if npx baseline-check scan . > /dev/null 2>&1; then
    echo "✅ Scan functionality works"
else
    echo "❌ Scan functionality failed"
    exit 1
fi

cd ..

# Check if extension compiles
echo "🔨 Testing extension compilation..."
if npm run compile > /dev/null 2>&1; then
    echo "✅ Extension compiles successfully"
else
    echo "❌ Extension compilation failed"
    exit 1
fi

# Check if build works
echo "🔨 Testing extension build..."
if npm run build > /dev/null 2>&1; then
    echo "✅ Extension builds successfully"
else
    echo "❌ Extension build failed"
    exit 1
fi

echo ""
echo "🎉 All tests passed! The extension is ready for testing in VS Code."
echo ""
echo "Next steps:"
echo "1. Run 'code .' to open VS Code"
echo "2. Press F5 to launch Extension Development Host"
echo "3. Open the demo-project folder"
echo "4. Test the commands using Ctrl+Shift+P"
echo ""
echo "See TESTING_CHECKLIST.md for detailed testing instructions."
