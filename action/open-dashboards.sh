#!/bin/bash

# Baseline Check Tool - Dashboard Launcher
# Opens the dashboard hub in the default browser

echo "🚀 Opening Baseline Check Tool Dashboard Hub..."

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Open the dashboard hub
if command -v open &> /dev/null; then
    # macOS
    open "$SCRIPT_DIR/dashboards/index.html"
elif command -v xdg-open &> /dev/null; then
    # Linux
    xdg-open "$SCRIPT_DIR/dashboards/index.html"
elif command -v start &> /dev/null; then
    # Windows
    start "$SCRIPT_DIR/dashboards/index.html"
else
    echo "❌ Could not open browser automatically"
    echo "📂 Please open: $SCRIPT_DIR/dashboards/index.html"
fi

echo "✅ Dashboard Hub opened!"
echo ""
echo "💡 All dashboards open in new tabs - keep the hub open!"
echo ""
echo "Available Dashboards:"
echo "  📊 Chart Showcase: dashboards/demos/demo-charts.html"
echo "  🧪 Chart Testing: dashboards/demos/test-charts.html"
echo "  ⚡ Real-time Monitor: dashboards/realtime/realtime-dashboard.html"
echo "  📈 Advanced Charts: dashboards/charts/charts-dashboard.html"
echo "  📋 Demo Report: dashboards/static/working-report.html"
echo "  📊 Real Report: dashboards/static/real-report.html"
