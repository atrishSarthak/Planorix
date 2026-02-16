# PLANORIX Deployment Guide

## 🚀 Quick Deploy to Vercel

### Step 1: Prepare Your Code

```bash
# Make sure everything is committed
git status

# If you have uncommitted changes
git add .
git commit -m "Ready for deployment"
```

### Step 2: Push to GitHub

```bash
# If you haven't initialized git yet
git init
git branch -M main

# Add your GitHub repository
git remote add origin https://github.com/YOUR_USERNAME/planorix.git

# Push to GitHub
git push -u origin main
```

### Step 3: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `build/client`
   - **Install Command**: `npm install`

5. Add Environment Variable:
   - **Key**: `VITE_PUTER_WORKER_URL`
   - **Value**: `https://brave-mouse-4972.puter.work`

6. Click "Deploy"

### Step 4: Automatic Deployments

Once deployed, Vercel will automatically:
- ✅ Deploy on every push to `main` branch
- ✅ Create preview deployments for pull requests
- ✅ Run builds and show deployment status

## 🔄 Making Updates

```bash
# Make your changes
# ... edit files ...

# Commit and push
git add .
git commit -m "Add new feature"
git push

# Vercel will automatically deploy! 🎉
```

## 🔧 Troubleshooting

### Build Fails
- Check Vercel build logs
- Ensure all dependencies are in `package.json`
- Verify environment variables are set

### Worker Not Responding
- Verify worker URL is correct
- Check Puter worker is deployed and running
- Test worker endpoint directly

### CORS Issues
- Ensure worker has proper CORS headers
- Check `lib/puter.worker.js` is deployed to Puter

## 📊 Monitoring

After deployment:
- Check Vercel Analytics for traffic
- Monitor Puter usage for API limits
- Watch for errors in Vercel logs

## 🎯 Production Checklist

- [ ] Environment variables configured
- [ ] Puter worker deployed and tested
- [ ] Custom domain configured (optional)
- [ ] Error tracking setup (optional)
- [ ] Analytics configured (optional)

---

**Need Help?** Check Vercel docs or Puter documentation.
