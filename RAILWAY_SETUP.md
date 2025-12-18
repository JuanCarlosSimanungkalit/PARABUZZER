# 🚀 Railway Setup - Environment Variables

## Problem
Backend crash dengan error: `Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL`

Penyebabnya: **Environment variables tidak ter-set di Railway**

---

## ✅ Solution

### Step 1: Update Credentials di Supabase

**Perlu dapatkan Service Role Key:**

1. Buka https://app.supabase.com
2. Select project Anda: `owahwnqzzsjrjsmitiui`
3. Settings → API
4. Cari **service_role secret** (jangan yang `anon public` key)
5. Copy service role key

### Step 2: Update Environment Variables di Railway

1. Buka https://railway.app
2. Select PARABUZZER project
3. Click **Backend** service
4. Go to **Variables** tab

**Add/Update setiap variable (EXACT):**

```
PORT=5000
NODE_ENV=production
SUPABASE_URL=https://owahwnqzzsjrjsmitiui.supabase.co
SUPABASE_KEY=sb_publishable_xmPmY-dbAGNOG7GcI_02YA_3pHVSgHS
SUPABASE_SERVICE_ROLE_KEY=[PASTE_SERVICE_ROLE_KEY_HERE]
CORS_ORIGIN=https://parabuzzer.vercel.app
JWT_SECRET=parabuzzer-secret
```

### Step 3: Verify di Railway

1. Copy-paste value dengan EXACT (tanpa extra spaces)
2. Klik **Save**
3. Railway akan auto-redeploy
4. Monitor logs untuk verify

---

## 📋 Environment Variables Checklist

| Variable | Value | Source |
|----------|-------|--------|
| `PORT` | `5000` | Fixed |
| `NODE_ENV` | `production` | Fixed |
| `SUPABASE_URL` | `https://owahwnqzzsjrjsmitiui.supabase.co` | Supabase Settings |
| `SUPABASE_KEY` | `sb_publishable_xmPmY-dbAGNOG7GcI_02YA_3pHVSgHS` | Supabase Settings |
| `SUPABASE_SERVICE_ROLE_KEY` | `[Long key starting with 'eyJ...']` | Supabase Settings → API |
| `CORS_ORIGIN` | `https://parabuzzer.vercel.app` | Your Vercel domain |
| `JWT_SECRET` | `parabuzzer-secret` | Fixed |

---

## 🔍 Debugging Tips

**Jika masih error setelah update:**

1. **Check Railway logs:**
   - Click Backend service
   - Go to **Deployments** tab
   - Click latest deployment
   - Check logs untuk error

2. **Verify format:**
   - URL harus dengan `https://` 
   - Jangan ada trailing spaces
   - Keys harus exact copy-paste

3. **Restart/Redeploy:**
   - Delete current deployment
   - Click **Deploy** again

---

## 📝 Steps Lengkap untuk Fix

### A. Get Service Role Key dari Supabase

```
1. https://app.supabase.com
2. Projects → owahwnqzzsjrjsmitiui
3. Settings (icon roda gigi)
4. API → "service_role" (bukan yang anon)
5. Copy the key
```

### B. Update di Railway

```
1. https://railway.app
2. Projects → PARABUZZER
3. Click Backend
4. Variables tab
5. Add all 8 variables from checklist above
6. Click Save
7. Wait for auto-redeploy
```

### C. Verify

```
1. Check Deployments tab
2. Wait for green checkmark
3. Check logs untuk "Backend running on port 5000"
```

---

## ✨ Expected Result

Setelah setup benar:

✅ Railway shows green status
✅ Logs show: `Backend running on port 5000`
✅ API calls work dari frontend
✅ No "Invalid supabaseUrl" errors

---

**Status:** Ready for Railway Setup
