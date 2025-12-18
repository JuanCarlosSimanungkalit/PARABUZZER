# 🎯 PARABUZZERR Deployment - Quick Start Guide

Panduan lengkap untuk deploy PARABUZZERR:
- **Frontend** → Vercel
- **Backend** → Railway  
- **Database** → Supabase

---

## 📚 Dokumentasi yang Sudah Disiapkan

Baca file-file ini dalam urutan ini:

### 1. **START HERE** → [DATABASE_SCHEMA.sql](DATABASE_SCHEMA.sql)
   - Schema lengkap untuk Supabase
   - Copy-paste semua ke Supabase SQL Editor
   - ⏱️ Waktu: 5 menit

### 2. **PRE-DEPLOYMENT** → [PRE_DEPLOYMENT_TESTING.md](PRE_DEPLOYMENT_TESTING.md)
   - Cek semua fungsi berjalan di local
   - Test semua fitur
   - Verifikasi database
   - ⏱️ Waktu: 30 menit

### 3. **DEPLOYMENT STEPS** → [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
   - Step-by-step deploy ke Vercel, Railway, Supabase
   - Screenshots & link berguna
   - Troubleshooting guide
   - ⏱️ Waktu: 60 menit

### 4. **CHECKLIST** → [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)
   - Tracking semua tahapan
   - Sub-tasks terperinci
   - Post-deployment verification
   - ⏱️ Waktu: Ongoing

### 5. **CREDENTIALS** → [CREDENTIALS_TEMPLATE.md](CREDENTIALS_TEMPLATE.md)
   - Tempat menyimpan credentials
   - Update URLs setelah deployment
   - Quick reference links
   - ⚠️ **JANGAN COMMIT KE GIT!**

---

## 🚀 Step-by-Step Deployment (Quick Path)

### Phase 1: Setup Supabase (5 menit)

```bash
# 1. Buat Supabase project di https://app.supabase.com
# 2. Copy Project URL & Anon Key dari Settings → API
# 3. Buka SQL Editor
# 4. Copy-paste semua dari DATABASE_SCHEMA.sql
# 5. Run semua queries
# 6. Verify database dengan test queries di file
```

✅ **Result:** Database live dengan semua tables & RLS

---

### Phase 2: Setup Local Development (10 menit)

```bash
# Backend
cd backend
cp .env.example .env
# Edit .env dengan Supabase credentials
npm install
npm run dev
# Test: curl http://localhost:5000/api/

# Frontend
cd frontend
cp .env.example .env.local
# Edit .env.local dengan Supabase credentials
npm install
npm run dev
# Test: http://localhost:5173
```

✅ **Result:** Local development working

---

### Phase 3: Test Semua Fitur (30 menit)

Buka [PRE_DEPLOYMENT_TESTING.md](PRE_DEPLOYMENT_TESTING.md) dan test:
- Backend endpoints
- Frontend pages
- Database operations
- User flows (login → booking → chat, etc)
- Error handling
- Mobile responsiveness

✅ **Result:** Semua fitur verified working

---

### Phase 4: Deploy Backend ke Railway (20 menit)

```bash
# 1. Push code ke GitHub (jika belum)
git add .
git commit -m "Deployment ready"
git push origin main

# 2. Buka https://railway.app
# 3. Login dengan GitHub
# 4. Create project → Import from GitHub
# 5. Select repository: PARABUZZERR
# 6. Root directory: backend
# 7. Add environment variables:
#    - PORT=5000
#    - NODE_ENV=production
#    - SUPABASE_URL=<paste-url>
#    - SUPABASE_KEY=<paste-key>
#    - SUPABASE_SERVICE_ROLE_KEY=<paste-key>
#    - CORS_ORIGIN=https://parabuzzer.vercel.app (update later)

# 8. Deploy
# 9. Copy Railway domain: https://[your-domain].up.railway.app
# 10. Test: curl https://[your-domain].up.railway.app/api/
```

✅ **Result:** Backend live di Railway

---

### Phase 5: Deploy Frontend ke Vercel (15 menit)

```bash
# 1. Buka https://vercel.com
# 2. Login dengan GitHub
# 3. Import project → select PARABUZZERR
# 4. Framework: Vite
# 5. Root directory: frontend
# 6. Add environment variables:
#    - VITE_SUPABASE_URL=<paste-url>
#    - VITE_SUPABASE_ANON_KEY=<paste-key>
#    - VITE_API_URL=https://[your-railway-domain]/api

# 7. Deploy
# 8. Copy Vercel domain: https://parabuzzer.vercel.app
# 9. Test di browser
```

✅ **Result:** Frontend live di Vercel

---

### Phase 6: Update CORS & Final Tests (5 menit)

```bash
# 1. Go back ke Railway
# 2. Update CORS_ORIGIN = https://parabuzzer.vercel.app
# 3. Redeploy (auto-redeploy jika enabled)
# 4. Test dari Vercel → Railway → Supabase flow
# 5. Test login
# 6. Test API calls
# 7. Test file uploads
```

✅ **Result:** Full production deployment verified

---

## 📦 Files Created

```
backend/
  .env.example          ← Environment template
  .env                  ← Local env variables
  railway.json          ← Railway config
  vercel.json           ← Vercel config

frontend/
  .env.example          ← Environment template
  .env.local            ← Local env variables

root/
  DATABASE_SCHEMA.sql           ← Complete database schema
  DEPLOYMENT_GUIDE.md           ← Detailed guide dengan troubleshooting
  DEPLOYMENT_CHECKLIST.md       ← Tracking checklist
  CREDENTIALS_TEMPLATE.md       ← Credentials & URLs reference
  PRE_DEPLOYMENT_TESTING.md     ← Testing checklist
  QUICK_START.md                ← File ini
```

---

## 🔑 Environment Variables Summary

### Backend (.env)
```
PORT=5000
NODE_ENV=production
SUPABASE_URL=https://[project-id].supabase.co
SUPABASE_KEY=[anon-key]
SUPABASE_SERVICE_ROLE_KEY=[service-role-key]
CORS_ORIGIN=https://parabuzzer.vercel.app
```

### Frontend (.env.production)
```
VITE_SUPABASE_URL=https://[project-id].supabase.co
VITE_SUPABASE_ANON_KEY=[anon-key]
VITE_API_URL=https://[your-railway-domain]/api
```

---

## 🆘 Common Issues & Solutions

### CORS Error
```
Error: Access to XMLHttpRequest from origin blocked
```
**Fix:** Update CORS_ORIGIN di Railway backend

### Backend 502 Error
**Fix:** Check Railway logs untuk error details, verify env variables

### Frontend API calls failing
**Fix:** Verify VITE_API_URL points ke correct Railway domain

### Database connection error
**Fix:** Verify SUPABASE_URL & SUPABASE_KEY correct, check Supabase status

---

## ✅ Deployment Checklist

- [ ] Read DATABASE_SCHEMA.sql
- [ ] Setup Supabase & run SQL migrations
- [ ] Test local development (backend & frontend)
- [ ] Complete PRE_DEPLOYMENT_TESTING.md
- [ ] Push to GitHub
- [ ] Deploy backend to Railway
- [ ] Deploy frontend to Vercel
- [ ] Update CORS di Railway
- [ ] Final integration testing
- [ ] Monitor logs untuk errors
- [ ] Setup alerts (optional)

---

## 📞 Support Links

- **Supabase:** https://supabase.com/docs
- **Railway:** https://docs.railway.app
- **Vercel:** https://vercel.com/docs
- **Vite:** https://vitejs.dev
- **Express:** https://expressjs.com

---

## 🎓 Pro Tips

1. **Always test locally first** before pushing to production
2. **Monitor logs** setelah deployment
3. **Backup database** regularly
4. **Use .env files** jangan hardcode credentials
5. **Enable auto-deploy** di Railway & Vercel untuk CI/CD
6. **Setup error tracking** (Sentry, Rollbar) untuk production
7. **Use custom domain** setelah production verified
8. **Setup monitoring** untuk CPU/Memory/Error rates

---

## 📅 Timeline

- **Week 1:** Setup Supabase & local testing
- **Week 2:** Deploy infrastructure (Railway + Vercel)
- **Week 3:** Production testing & monitoring
- **Week 4+:** Optimization & scaling

---

**Status:** Ready for Deployment  
**Last Updated:** December 18, 2025  
**Next Step:** Read [DATABASE_SCHEMA.sql](DATABASE_SCHEMA.sql) & setup Supabase

---

## 🎯 Questions?

Check [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) Troubleshooting section untuk detailed solutions.

Good luck! 🚀
