# MCP Server Test Script

Write-Host "🧪 Testing MCP Memory Server..." -ForegroundColor Cyan
Write-Host ""

# Start the server in the background
$job = Start-Job -ScriptBlock {
    Set-Location "C:\Users\veere\OneDrive\Desktop\Dev\mcp-server-project"
    node src/index.js
}

Start-Sleep -Seconds 2

# Send initialization message
$initMessage = @'
{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"test-client","version":"1.0.0"}}}
'@

Write-Host "📤 Sending initialization..." -ForegroundColor Yellow
$initMessage | node src/index.js

Write-Host ""
Write-Host "✅ If you see responses above, your server is working!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Stop this test: Ctrl+C"
Write-Host "2. Configure Claude Desktop (see README_GUIDE.md)"
Write-Host "3. Restart Claude Desktop"
Write-Host "4. Ask Claude to store and query memories!"

# Cleanup
Stop-Job $job
Remove-Job $job
