# 🔐 PARABUZZERR - Deployment Credentials & URLs

> ⚠️ **JANGAN SHARE FILE INI!** Simpan di tempat aman.
> ⚠️ **JANGAN COMMIT KE GIT!** Ignore file ini di .gitignore

---

## 🗄️ Supabase Credentials

Dari: https://app.supabase.com → Settings → API

```
Project Name:     [your-project-name]
Project URL:      https://[your-project-id].supabase.co
Anon Key:         [long-key-here]
Service Role Key: [long-key-here]
```

**Dimana digunakan:**
- `SUPABASE_URL` → Backend & Frontend
- `SUPABASE_KEY` → Frontend
- `SUPABASE_SERVICE_ROLE_KEY` → Backend only

---

## 🚀 Railway Backend

Dari: https://railway.app → Project → Settings

```
App Name:        parabuzzer-backend
Railway Domain:  https://[your-app-id].up.railway.app
Environment:     production
```

**Environment Variables di Railway:**
```
PORT=5000
NODE_ENV=production
SUPABASE_URL=[paste-from-above]
SUPABASE_KEY=[paste-from-above]
SUPABASE_SERVICE_ROLE_KEY=[paste-from-above]
CORS_ORIGIN=https://parabuzzer.vercel.app
```

**Health Check URL:**
```
https://[your-railway-domain]/api/
```

---

## 🎨 Vercel Frontend

Dari: https://vercel.com → Project → Settings

```
Project Name:    parabuzzer
Vercel Domain:   https://parabuzzer.vercel.app
GitHub Repo:     https://github.com/[your-user]/PARABUZZERR
```

**Environment Variables di Vercel:**
```
VITE_SUPABASE_URL=[paste-from-supabase]
VITE_SUPABASE_ANON_KEY=[paste-from-supabase]
VITE_API_URL=https://[your-railway-domain]/api
```

---

## 📋 Quick Links

```
Supabase Dashboard:     https://app.supabase.com
Railway Dashboard:      https://railway.app
Vercel Dashboard:       https://vercel.com
GitHub Repository:      https://github.com/[your-user]/PARABUZZERR
```

---

## ✅ Deployment Status

| Service | Status | URL | Last Updated |
|---------|--------|-----|--------------|
| Database (Supabase) | [ ] | https://app.supabase.com | |
| Backend (Railway) | [ ] | https://[domain].up.railway.app | |
| Frontend (Vercel) | [ ] | https://parabuzzer.vercel.app | |

---

## 🔄 How to Update

### Update Supabase Credentials
1. Go to https://app.supabase.com → Project
2. Settings → API
3. Copy Project URL & Keys
4. Update di .env di backend
5. Update di environment variables di Railway
6. Update di environment variables di Vercel

### Update Database Schema
1. Go to Supabase SQL Editor
2. Paste SQL queries
3. Run
4. No need to redeploy backend/frontend

### Update Backend Code
1. Push ke GitHub
2. Railway otomatis redeploy dari main branch
3. Monitor Railway logs
4. Check health: curl https://[domain]/api/

### Update Frontend Code
1. Push ke GitHub
2. Vercel otomatis redeploy dari main branch
3. Monitor Vercel deployment logs
4. Auto preview untuk pull requests

---

## 🆘 Emergency Contacts

- Supabase Support: https://supabase.com/help
- Railway Support: https://railway.app/support
- Vercel Support: https://vercel.com/support

---

**Created:** December 18, 2025  
**Status:** Ready for Deployment
