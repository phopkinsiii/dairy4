#!/bin/bash

# Exit immediately on error
set -e

echo "🔄 Starting project sync..."

# Navigate to client and install dependencies
if [ -d "client" ]; then
  echo "📦 Installing frontend dependencies..."
  cd client
  npm install
  cd ..
else
  echo "⚠️  client directory not found."
fi

# Navigate to server and install dependencies
if [ -d "server" ]; then
  echo "📦 Installing backend dependencies..."
  cd server
  npm install
  cd ..
else
  echo "⚠️  server directory not found."
fi

# Automatically resolve merge conflicts by preferring local changes
echo "🌐 Pulling latest changes from origin..."
git pull origin master --strategy=ours || echo "⚠️ Merge failed. Please resolve conflicts manually."

echo "📤 Pushing local changes to origin..."
git add .
git commit -m "🧠 Sync from $(hostname) at $(date)" || echo "✅ Nothing to commit."
git push origin master

echo "✅ Sync complete!"
