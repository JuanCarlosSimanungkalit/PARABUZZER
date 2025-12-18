# 🔧 Node.js 20 Upgrade Required

## Warning Message
```
⚠️ Node.js 18 and below are deprecated and will no longer be supported 
in future versions of @supabase/supabase-js
```

## Problem
Railway backend is running **Node.js 18**, but Supabase requires **Node.js 20+**

## Solution: Already Implemented! ✅

### Changes Made:

**1. [backend/package.json](../backend/package.json)**
```json
"engines": {
  "node": ">=20.0.0",
  "npm": ">=10.0.0"
}
```

**2. [backend/railway.json](../backend/railway.json)**
```json
"build": {
  "builder": "nixpacks",
  "nixpacks": {
    "nodejs": "20"
  }
}
```

---

## 🚀 Deploy the Fix

### Step 1: Push to GitHub
```bash
git add -A
git commit -m "upgrade: Update Node.js to 20 for Supabase compatibility"
git push upstream main
```

### Step 2: Railway Auto-Redeploy
1. Go to https://railway.app
2. Backend → Deployments
3. Should auto-redeploy with Node.js 20
4. Wait for green checkmark (2-3 minutes)

### Step 3: Verify in Logs
Check Railway logs:
```
Looking for: "Node.js v20" (not v18)
```

---

## ✅ After Deployment

Warning should disappear:
- ✅ No more deprecation warnings
- ✅ Supabase JS future-proof
- ✅ Better performance

---

## 📋 What Changed

| File | Change |
|------|--------|
| package.json | Added `engines` field with Node.js 20 requirement |
| railway.json | Specified `nixpacks.nodejs: "20"` |

---

## 🧪 Test Locally

```bash
node --version
# Should show: v20.x.x or later

cd backend
npm run dev
# No more Node.js 18 deprecation warning ✅
```

---

**Status:** ✅ Configuration updated  
**Next:** Push to GitHub & wait for Railway redeploy
