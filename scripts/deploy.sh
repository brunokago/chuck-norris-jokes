#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🚀 Starting deployment to GitHub Pages...${NC}"

# Step 1: Build the project
echo -e "${YELLOW}📦 Building project...${NC}"
pnpm build

# Check if build was successful
if [ ! -d "dist/public" ]; then
  echo -e "${RED}❌ Build failed! dist/public directory not found.${NC}"
  exit 1
fi

echo -e "${GREEN}✅ Build successful!${NC}"

# Step 2: Navigate to dist/public
cd dist/public

# Step 3: Initialize git in dist/public
echo -e "${YELLOW}📝 Preparing deployment files...${NC}"
git init
git add .
git commit -m "Deploy: $(date)"

# Step 4: Add remote and push to gh-pages branch
echo -e "${YELLOW}🔗 Connecting to GitHub...${NC}"

# Check if remote already exists
if git remote get-url origin > /dev/null 2>&1; then
  git remote set-url origin https://github.com/YOUR_USERNAME/chuck-norris-jokes.git
else
  git remote add origin https://github.com/YOUR_USERNAME/chuck-norris-jokes.git
fi

echo -e "${YELLOW}📤 Pushing to gh-pages branch...${NC}"
git push -u origin HEAD:gh-pages --force

if [ $? -eq 0 ]; then
  echo -e "${GREEN}✅ Deployment complete!${NC}"
  echo -e "${GREEN}🌐 Your site is live at: https://YOUR_USERNAME.github.io/chuck-norris-jokes${NC}"
  echo -e "${YELLOW}⏳ Note: It may take 1-2 minutes for changes to appear.${NC}"
else
  echo -e "${RED}❌ Deployment failed!${NC}"
  exit 1
fi

# Navigate back to project root
cd ../..
