# PowerShell Script to help with setup
# Run this script from the project root directory

Write-Host "================================" -ForegroundColor Cyan
Write-Host "Emergency Blood Management System" -ForegroundColor Cyan
Write-Host "Setup Helper Script" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js is installed: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js is NOT installed. Please install it from https://nodejs.org/" -ForegroundColor Red
    exit
}

# Check if npm is installed
Write-Host "Checking npm installation..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version
    Write-Host "✓ npm is installed: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ npm is NOT installed." -ForegroundColor Red
    exit
}

Write-Host ""
Write-Host "What would you like to do?" -ForegroundColor Cyan
Write-Host "1 - Install backend dependencies"
Write-Host "2 - Install frontend dependencies"
Write-Host "3 - Install both"
Write-Host "4 - Start backend server"
Write-Host "5 - Start frontend server"
Write-Host "6 - Create .env file in backend"
Write-Host "7 - Check project structure"
Write-Host "8 - Exit"
Write-Host ""

$choice = Read-Host "Enter your choice (1-8)"

switch ($choice) {
    "1" {
        Write-Host ""
        Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
        cd backend
        npm install
        Write-Host "✓ Backend dependencies installed!" -ForegroundColor Green
        cd ..
    }
    "2" {
        Write-Host ""
        Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
        cd frontend
        npm install
        Write-Host "✓ Frontend dependencies installed!" -ForegroundColor Green
        cd ..
    }
    "3" {
        Write-Host ""
        Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
        cd backend
        npm install
        Write-Host "✓ Backend dependencies installed!" -ForegroundColor Green
        cd ..
        
        Write-Host ""
        Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
        cd frontend
        npm install
        Write-Host "✓ Frontend dependencies installed!" -ForegroundColor Green
        cd ..
    }
    "4" {
        Write-Host ""
        Write-Host "Starting backend server..." -ForegroundColor Yellow
        Write-Host "Backend will run on http://localhost:5000" -ForegroundColor Cyan
        Write-Host "Press Ctrl+C to stop" -ForegroundColor Yellow
        cd backend
        npm run dev
    }
    "5" {
        Write-Host ""
        Write-Host "Starting frontend server..." -ForegroundColor Yellow
        Write-Host "Frontend will run on http://localhost:3000" -ForegroundColor Cyan
        Write-Host "Press Ctrl+C to stop" -ForegroundColor Yellow
        cd frontend
        npm start
    }
    "6" {
        Write-Host ""
        Write-Host "Creating .env file in backend folder..." -ForegroundColor Yellow
        
        $envContent = @"
MONGO_URI=mongodb://localhost:27017/blood_management
JWT_SECRET=your_super_secret_jwt_key_change_this_to_something_random
PORT=5000
NODE_ENV=development
"@
        
        Set-Content -Path "backend\.env" -Value $envContent
        Write-Host "✓ .env file created in backend folder!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Important: Edit the .env file and update:" -ForegroundColor Yellow
        Write-Host "- MONGO_URI (if using MongoDB Atlas or different local setup)"
        Write-Host "- JWT_SECRET (change to something random and long)"
    }
    "7" {
        Write-Host ""
        Write-Host "Project Structure:" -ForegroundColor Yellow
        Get-ChildItem -Recurse -Path . -Attributes Directory | 
            Where-Object { $_.FullName -notmatch "node_modules" } | 
            ForEach-Object { Write-Host $_.FullName }
    }
    "8" {
        Write-Host ""
        Write-Host "Goodbye!" -ForegroundColor Green
        exit
    }
    default {
        Write-Host "Invalid choice. Please try again." -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host "For detailed instructions, see REQUIREMENTS.md" -ForegroundColor Cyan
Write-Host "For quick reference, see QUICKSTART.md" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
