# 🚨 CORS Error Fix

## Problem
```
Access to XMLHttpRequest at 'https://mindful-celebration-production-e95e.up.railway.app/api/...' 
from origin 'https://parabuzzerrr-git-main-juan-carlos-simanungkalits-projects.vercel.app' 
has been blocked by CORS policy
```

## Root Cause
**Vercel frontend domain tidak ada di Railway backend CORS_ORIGIN list**

- Vercel deployment domain: `https://parabuzzerrr-git-main-juan-carlos-simanungkalits-projects.vercel.app`
- Backend CORS_ORIGIN: hanya allow `https://parabuzzer.vercel.app` (wrong!)

---

## Solution

### ✅ Step 1: Update Backend .env (LOCAL)
File sudah di-update dengan CORS_ORIGIN yang benar:
```
CORS_ORIGIN=https://parabuzzerrr-git-main-juan-carlos-simanungkalits-projects.vercel.app,https://parabuzzer.vercel.app,http://localhost:3000,http://localhost:5173
```

### ✅ Step 2: Update Railway Environment Variables (IMPORTANT!)

1. Buka https://railway.app
2. Select PARABUZZER project
3. Click **Backend** service
4. Go to **Variables** tab
5. Find `CORS_ORIGIN` variable
6. **REPLACE** dengan:
```
CORS_ORIGIN=https://parabuzzerrr-git-main-juan-carlos-simanungkalits-projects.vercel.app,https://parabuzzer.vercel.app,http://localhost:3000,http://localhost:5173
```

7. Click **Save**
8. Wait untuk auto-redeploy (2-3 menit)
9. Check logs untuk "Backend running on port 5000"

---

## Testing

Setelah Railway redeploy:

1. Refresh Vercel frontend di browser (Ctrl+F5)
2. Try login atau fetch influencers
3. No more CORS error! ✅

---

## Why This Happened

Vercel memberikan subdomain yang unik per deployment:
- Branch: `main` → `parabuzzerrr-git-main-juan-carlos-simanungkalits-projects.vercel.app`
- Production domain: `parabuzzer.vercel.app` (custom domain, jika setup)

Backend harus allow BOTH untuk flexibility.

---

## Quick Checklist

- [ ] Backend .env updated (LOCAL)
- [ ] Railway Variables tab opened
- [ ] CORS_ORIGIN variable updated
- [ ] Saved & waiting for redeploy
- [ ] Check Railway logs (green status)
- [ ] Refresh Vercel frontend
- [ ] Test API call - no CORS error ✅

---

**Status:** Waiting for Railway Redeploy
