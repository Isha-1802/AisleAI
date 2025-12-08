# 🚀 DEPLOYMENT INSTRUCTIONS - DELETE ACCOUNT FIX

## ✅ Changes Made

### 1. **Frontend Changes**
- ✅ Fixed `Profile.jsx` to use environment variable instead of hardcoded localhost
- ✅ Created `.env` file with production backend URL
- ✅ Created `.env.production` file for Vercel deployment

### 2. **Backend Changes**
- ✅ Updated CORS configuration to allow your production frontend URL
- ✅ Added support for both Vercel production and preview URLs

---

## 📋 DEPLOYMENT STEPS

### **Step 1: Deploy Backend to Render**

1. **Commit and push your backend changes:**
   ```bash
   cd /Users/ishitathakur/Desktop/AisleAII
   git add backend/src/server.js
   git commit -m "fix: update CORS to allow production frontend URL"
   git push
   ```

2. **Render will automatically redeploy** (if auto-deploy is enabled)
   - Or manually trigger a deploy from Render dashboard
   - Wait for deployment to complete
   - Verify at: https://aisleai-8.onrender.com

---

### **Step 2: Deploy Frontend to Vercel**

#### **Option A: Set Environment Variable in Vercel Dashboard (RECOMMENDED)**

1. Go to your Vercel project: https://vercel.com/dashboard
2. Click on your project: `aisle-ai-4avu`
3. Go to **Settings** → **Environment Variables**
4. Add a new variable:
   - **Name:** `VITE_API_URL`
   - **Value:** `https://aisleai-8.onrender.com/api`
   - **Environment:** Select all (Production, Preview, Development)
5. Click **Save**
6. Go to **Deployments** tab
7. Click **Redeploy** on the latest deployment

#### **Option B: Push Code Changes**

```bash
cd /Users/ishitathakur/Desktop/AisleAII
git add frontend/src/pages/Profile.jsx frontend/.env frontend/.env.production
git commit -m "fix: use environment variable for API URL in Profile page"
git push
```

Vercel will automatically redeploy.

---

## 🧪 TESTING

After both deployments complete:

1. **Visit your production site:** https://aisle-ai-4avu.vercel.app
2. **Log in** to your account
3. **Go to Profile page**
4. **Click "Delete Account"**
5. **Confirm the deletion**
6. **Verify:**
   - You should see "Account deleted successfully" message
   - You should be logged out
   - Account should be removed from MongoDB

---

## 🔍 TROUBLESHOOTING

### If delete still doesn't work:

1. **Check browser console** (F12) for errors
2. **Verify environment variable in Vercel:**
   - Go to Vercel Dashboard → Settings → Environment Variables
   - Confirm `VITE_API_URL` is set correctly
3. **Check Render logs:**
   - Go to Render Dashboard → Your service → Logs
   - Look for CORS errors or 404 errors
4. **Clear browser cache** and try again

### Common Issues:

- **CORS Error:** Backend needs to be redeployed with updated CORS settings
- **404 Error:** Frontend is still using localhost - environment variable not set in Vercel
- **401 Error:** Token expired - log out and log back in

---

## 📝 WHAT WAS THE PROBLEM?

The `Profile.jsx` file was hardcoded to use `http://localhost:5001/api`, which only works on your local machine. When deployed to Vercel, it was trying to connect to localhost instead of your Render backend at `https://aisleai-8.onrender.com/api`.

**The fix:** Changed it to use `import.meta.env.VITE_API_URL` like all your other pages, and configured the environment variable to point to your production backend.

---

## ✨ NEXT STEPS

After successful deployment:
1. Test the delete account feature on production
2. Test all other features to ensure nothing broke
3. Consider adding a "Are you absolutely sure?" double confirmation for account deletion
4. Consider sending a confirmation email before deleting the account

---

**Need help?** Check the logs in Render and Vercel dashboards, or test locally first with `npm run dev` in both frontend and backend.
