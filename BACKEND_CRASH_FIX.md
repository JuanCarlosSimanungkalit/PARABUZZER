# 🚨 Backend Crash di Railway - ROOT CAUSE ANALYSIS

## Error Message
```
Error: Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.
```

---

## Root Cause

### ❌ PROBLEM #1: Environment Variables Not Set
Railway deployment tidak memiliki environment variables yang benar.

**Hasil:**
- `process.env.SUPABASE_URL` = `undefined`
- Supabase client error: "Invalid URL"

### ❌ PROBLEM #2: Wrong Service Role Key
Backend memerlukan **Service Role Key** (backend secret), bukan Anon Key.

**Backend code:**
```javascript
const supabase = createClient(
  process.env.SUPABASE_URL,           // https://owahwnqzzsjrjsmitiui.supabase.co
  process.env.SUPABASE_SERVICE_ROLE_KEY  // ← Ini WAJIB ada & correct
);
```

### ❌ PROBLEM #3: OLD Credentials in .env
File `.env` lokal masih punya credentials lama dari project sebelumnya.

---

## Solution (3 Steps)

### Step 1: Get Service Role Key dari Supabase
```
https://app.supabase.com 
  → Settings → API 
  → Copy "service_role secret"
```

### Step 2: Update .env Lokal
```
SUPABASE_URL=https://owahwnqzzsjrjsmitiui.supabase.co
SUPABASE_KEY=sb_publishable_xmPmY-dbAGNOG7GcI_02YA_3pHVSgHS
SUPABASE_SERVICE_ROLE_KEY=[PASTE_SERVICE_ROLE_KEY]
```

### Step 3: Add Variables ke Railway
```
https://railway.app
  → PARABUZZER → Backend 
  → Variables tab
  → Add semua 8 variables dari checklist
  → Save & Auto-Redeploy
```

---

## Verification Checklist

**Sebelum Railway dapat running:**

- [ ] Service Role Key sudah didapat dari Supabase
- [ ] Environment variables di-update di .env lokal
- [ ] Backend test locally: `npm run dev` ✅
- [ ] Railway Variables updated dengan semua 8 variables
- [ ] Railway auto-redeploy completed
- [ ] Railway logs menunjukkan: "Backend running on port 5000"
- [ ] Tidak ada "Invalid supabaseUrl" errors

---

## Environment Variables yang WAJIB

| Var | Value | Status |
|-----|-------|--------|
| PORT | 5000 | ✅ |
| NODE_ENV | production | ✅ |
| SUPABASE_URL | https://owahwnqzzsjrjsmitiui.supabase.co | ✅ |
| SUPABASE_KEY | sb_publishable_xmPmY-dbAGNOG7GcI_02YA_3pHVSgHS | ✅ |
| SUPABASE_SERVICE_ROLE_KEY | [MISSING] | ❌ NEED THIS |
| CORS_ORIGIN | https://parabuzzer.vercel.app | ⏳ |
| JWT_SECRET | parabuzzer-secret | ✅ |

---

## Why This Error Happens

1. **Manual Deployment di Railway** memerlukan manual setup environment variables
2. **Deploy dari GitHub** tidak auto-copy `.env` file (for security)
3. **Supabase client validation** strict: URL harus `https://` dan valid

---

## Quick Fix Checklist

```bash
# 1. Verify credentials in Supabase
# 2. Copy Service Role Key
# 3. Update .env locally
# 4. Test locally: npm run dev
# 5. Add variables to Railway
# 6. Wait for redeploy
# 7. Check logs
```

---

## Files Updated

✅ [backend/.env](backend/.env) - Updated dengan Supabase baru
✅ [RAILWAY_SETUP.md](RAILWAY_SETUP.md) - Setup guide
✅ [GET_SUPABASE_CREDENTIALS.md](GET_SUPABASE_CREDENTIALS.md) - Credential guide

---

**Next Step:** Follow [RAILWAY_SETUP.md](RAILWAY_SETUP.md)
