# Deploy Chuck Norris Jokes App to GitHub Pages

This guide will walk you through deploying your React app to GitHub Pages step by step.

## Prerequisites

- A GitHub account
- Git installed on your computer
- Your project files ready

## Step 1: Create a GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in to your account
2. Click the **+** icon in the top right corner and select **New repository**
3. Name your repository `chuck-norris-jokes` (or any name you prefer)
4. Choose **Public** (required for GitHub Pages free tier)
5. Do NOT initialize with README, .gitignore, or license (we'll add these)
6. Click **Create repository**

## Step 2: Initialize Git Locally

Open your terminal and navigate to your project directory:

```bash
cd chuck-norris-jokes
```

Initialize git and connect to GitHub:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Chuck Norris Jokes App"

# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/chuck-norris-jokes.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

## Step 3: Update package.json

Open `package.json` and modify the scripts section to add deployment scripts:

```json
"scripts": {
  "dev": "vite --host",
  "build": "vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist",
  "start": "NODE_ENV=production node dist/index.js",
  "preview": "vite preview --host",
  "check": "tsc --noEmit",
  "format": "prettier --write .",
  "deploy": "bash scripts/deploy.sh"
}
```

## Step 4: Create Deployment Script

Create a new file `scripts/deploy.sh` in your project root:

```bash
#!/bin/bash

# Build the project
echo "Building project..."
pnpm build

# Check if build was successful
if [ ! -d "dist/public" ]; then
  echo "Build failed! dist/public directory not found."
  exit 1
fi

# Initialize git in dist/public if needed
cd dist/public

# Initialize a new git repo in the dist folder
git init
git add .
git commit -m "Deploy: $(date)"

# Add remote and push to gh-pages branch
git remote add origin https://github.com/YOUR_USERNAME/chuck-norris-jokes.git 2>/dev/null || true
git push -u origin HEAD:gh-pages --force

echo "✅ Deployment complete! Visit: https://YOUR_USERNAME.github.io/chuck-norris-jokes"
```

Make the script executable:

```bash
chmod +x scripts/deploy.sh
```

## Step 5: Update Vite Configuration

Open `vite.config.ts` and add the base path configuration:

```typescript
export default defineConfig({
  plugins,
  base: '/chuck-norris-jokes/',  // Add this line
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  // ... rest of config
});
```

**Important:** Replace `chuck-norris-jokes` with your actual repository name if different.

## Step 6: Build and Deploy

Run the deployment command:

```bash
pnpm deploy
```

This will:
1. Build your project
2. Create a `gh-pages` branch
3. Push the built files to GitHub Pages

## Step 7: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top right)
3. Scroll down to **Pages** section (left sidebar)
4. Under **Source**, select **Deploy from a branch**
5. Select **gh-pages** as the branch
6. Select **/ (root)** as the folder
7. Click **Save**

GitHub will show you a message: "Your site is live at `https://YOUR_USERNAME.github.io/chuck-norris-jokes`"

## Step 8: Verify Deployment

Wait 1-2 minutes for GitHub to build and deploy your site, then visit:

```
https://YOUR_USERNAME.github.io/chuck-norris-jokes
```

Your app should now be live!

## Troubleshooting

### Issue: "A deploy is only possible from inside a workspace"

**Solution:** Use the bash script method (Step 4) instead of `gh-pages` package. The script handles deployment correctly.

### Issue: Site shows 404 error

**Solution:** Make sure the `base` path in `vite.config.ts` matches your repository name exactly.

```typescript
base: '/chuck-norris-jokes/',  // Must match your repo name
```

### Issue: Assets not loading (CSS/JS broken)

**Solution:** 
1. Check that `base` in `vite.config.ts` is correct
2. Verify the build output is in `dist/public` directory
3. Check GitHub Pages settings point to `gh-pages` branch

### Issue: Blank page or routing issues

**Solution:** The app uses client-side routing which should work fine with the base path. If you encounter issues, you can use hash-based routing by updating the routing configuration.

### Issue: Changes not showing after deployment

**Solution:** 
1. Hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)
2. Clear browser cache
3. Wait 1-2 minutes for GitHub Pages to update

## Making Updates

After making changes to your code:

```bash
# Commit changes to main branch
git add .
git commit -m "Your commit message"
git push origin main

# Deploy to GitHub Pages
pnpm deploy
```

## Important Notes

- **Repository must be public** for free GitHub Pages hosting
- **First deployment may take 1-2 minutes** to appear
- **GitHub Pages updates** whenever you push to the `gh-pages` branch
- **Keep your main branch** separate from the `gh-pages` branch
- **Base path is important** - it must match your repository name

## Quick Reference Commands

```bash
# Build locally to test
pnpm build

# Preview production build
pnpm preview

# Deploy to GitHub Pages
pnpm deploy

# Check git status
git status

# View deployment history
git log --oneline

# Check what's in dist/public
ls -la dist/public
```

## Alternative: Using GitHub Actions (Recommended)

For automatic deployment on every push to main, create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Build
        run: pnpm build
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist/public
```

Then push this file to your repository:

```bash
git add .github/workflows/deploy.yml
git commit -m "Add GitHub Actions deployment workflow"
git push origin main
```

Now every push to `main` will automatically deploy to GitHub Pages!

## File Structure After Deployment

Your repository structure should look like:

```
chuck-norris-jokes/
├── .github/
│   └── workflows/
│       └── deploy.yml          (optional, for GitHub Actions)
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── ...
│   └── public/
├── scripts/
│   └── deploy.sh               (deployment script)
├── server/
├── shared/
├── package.json
├── vite.config.ts
├── GITHUB_PAGES_GUIDE.md       (this file)
└── ... other config files
```

---

**You're all set!** Your Chuck Norris Jokes App will be live on GitHub Pages. 🎉

## Support

If you encounter issues:

1. Check that `base` in `vite.config.ts` is correct
2. Verify `dist/public` directory exists after build
3. Ensure GitHub Pages settings point to `gh-pages` branch
4. Check GitHub Actions logs if using automatic deployment
5. Clear browser cache and hard refresh the page
