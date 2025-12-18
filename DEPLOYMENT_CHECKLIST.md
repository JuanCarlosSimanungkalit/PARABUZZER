# PARABUZZERR Deployment Checklist

## 📋 Step-by-Step Deployment Guide

### Phase 1: Setup Supabase Database ✅

#### Sub-task 1.1: Database Creation
- [ ] Buat Supabase project baru
- [ ] Copy Project URL dari Settings → API
- [ ] Copy Anon Key dari Settings → API
- [ ] Copy Service Role Key dari Settings → API

#### Sub-task 1.2: Run SQL Migrations
- [ ] Buka SQL Editor di Supabase
- [ ] Run semua CREATE TABLE statements:
  - [ ] `profiles` table
  - [ ] `influencers` table
  - [ ] `reviews` table
  - [ ] `bookings` table
  - [ ] `transactions` table
  - [ ] `influencer_photos` table
  - [ ] `chats` table
- [ ] Run trigger untuk auto-create profiles
- [ ] Enable Row Level Security (RLS)
- [ ] Setup Storage bucket `avatars`
- [ ] Setup RLS policies untuk storage

#### Sub-task 1.3: Verify Database
- [ ] Test profiles table (select * from profiles)
- [ ] Test insert data
- [ ] Verify triggers bekerja

---

### Phase 2: Prepare Backend untuk Production 🚀

#### Sub-task 2.1: Environment Configuration
- [ ] Copy `.env.example` ke `.env`
- [ ] Fill semua Supabase credentials:
  ```
  SUPABASE_URL=<your-url>
  SUPABASE_KEY=<your-key>
  SUPABASE_SERVICE_ROLE_KEY=<your-key>
  ```
- [ ] Set `NODE_ENV=production`
- [ ] Set `PORT=5000`

#### Sub-task 2.2: Code Verification
- [ ] Check semua routes ada di app.js
- [ ] Verify CORS configuration
- [ ] Verify error handling
- [ ] Test locally: `npm run dev`
- [ ] Test API endpoints dengan Postman

#### Sub-task 2.3: Push to GitHub
- [ ] Add `.env` ke `.gitignore` ✅
- [ ] Git add, commit, push semua file
- [ ] Verify repository structure di GitHub

---

### Phase 3: Deploy Backend ke Railway 🎯

#### Sub-task 3.1: Railway Setup
- [ ] Create Railway account
- [ ] Login dengan GitHub
- [ ] Create new project
- [ ] Select repository `PARABUZZERR`
- [ ] Select root directory: `backend`

#### Sub-task 3.2: Configure Environment Variables
- [ ] Add `PORT=5000`
- [ ] Add `NODE_ENV=production`
- [ ] Add `SUPABASE_URL`
- [ ] Add `SUPABASE_KEY`
- [ ] Add `SUPABASE_SERVICE_ROLE_KEY`
- [ ] Add `CORS_ORIGIN` (akan update setelah Vercel deploy)

#### Sub-task 3.3: Deploy & Verify
- [ ] Click Deploy button
- [ ] Monitor Railway logs
- [ ] Wait untuk deployment selesai
- [ ] Copy Railway domain (misal: `https://parabuzzer-backend.up.railway.app`)
- [ ] Test backend health: `curl https://parabuzzer-backend.up.railway.app/api/`

---

### Phase 4: Prepare Frontend untuk Production 🎨

#### Sub-task 4.1: Environment Configuration
- [ ] Create `.env.production` di folder frontend:
  ```
  VITE_SUPABASE_URL=<paste-supabase-url>
  VITE_SUPABASE_ANON_KEY=<paste-supabase-key>
  VITE_API_URL=https://parabuzzer-backend.up.railway.app/api
  ```
- [ ] Keep `.env.local` untuk development

#### Sub-task 4.2: Update API Client
- [ ] Verify [frontend/src/services/api.js](frontend/src/services/api.js) sudah update
- [ ] Verify env variable `VITE_API_URL` digunakan
- [ ] Test locally dengan production API

#### Sub-task 4.3: Build Test
- [ ] Run `npm run build` di folder frontend
- [ ] Check untuk errors
- [ ] Verify output di `dist/` folder

#### Sub-task 4.4: Push to GitHub
- [ ] Git add, commit, push semua changes
- [ ] Verify di GitHub

---

### Phase 5: Deploy Frontend ke Vercel 🌍

#### Sub-task 5.1: Vercel Setup
- [ ] Create Vercel account
- [ ] Login dengan GitHub
- [ ] Click "Add New" → "Project"
- [ ] Import repository `PARABUZZERR`

#### Sub-task 5.2: Configure Project
- [ ] Framework: Vite
- [ ] Root Directory: `frontend`
- [ ] Build Command: `npm run build` (default)
- [ ] Output Directory: `dist` (default)

#### Sub-task 5.3: Environment Variables di Vercel
- [ ] Add `VITE_SUPABASE_URL`
- [ ] Add `VITE_SUPABASE_ANON_KEY`
- [ ] Add `VITE_API_URL=https://parabuzzer-backend.up.railway.app/api`

#### Sub-task 5.4: Deploy & Get Domain
- [ ] Click Deploy
- [ ] Monitor build logs
- [ ] Wait untuk deployment selesai
- [ ] Copy Vercel domain (misal: `https://parabuzzer.vercel.app`)

---

### Phase 6: Final Configuration ✨

#### Sub-task 6.1: Update CORS di Railway
- [ ] Go back ke Railway backend project
- [ ] Update env variable: `CORS_ORIGIN=https://parabuzzer.vercel.app`
- [ ] Redeploy atau auto-redeploy jika enabled

#### Sub-task 6.2: Full Testing
- [ ] Test login di production
- [ ] Test API calls
- [ ] Test file upload (avatar)
- [ ] Test database operations
- [ ] Check browser console untuk errors
- [ ] Check Railway logs
- [ ] Check Vercel deployment logs

#### Sub-task 6.3: Monitor & Setup Alerts
- [ ] Setup error tracking (optional: Sentry)
- [ ] Setup logging (Railway logs)
- [ ] Setup email alerts di Vercel (optional)

---

### Phase 7: Ongoing Maintenance 🔄

#### Sub-task 7.1: Regular Checks
- [ ] Monitor Railway CPU/Memory usage
- [ ] Monitor Vercel build times
- [ ] Check error logs weekly
- [ ] Update dependencies regularly

#### Sub-task 7.2: Database Backups
- [ ] Enable Supabase automated backups
- [ ] Test backup restoration
- [ ] Document backup schedule

---

## 🔑 Credentials Checklist

**Jangan share ini ke siapa saja!**

- [ ] Supabase Project URL: ________________
- [ ] Supabase Anon Key: ________________
- [ ] Supabase Service Role Key: ________________
- [ ] Railway Backend URL: ________________
- [ ] Vercel Frontend URL: ________________

---

## 🆘 Troubleshooting Guide

### CORS Error di Browser
```
Error: Access to XMLHttpRequest blocked by CORS policy
```
**Solution:**
1. Check Railway env: `CORS_ORIGIN=https://parabuzzer.vercel.app`
2. Trigger redeploy di Railway
3. Clear browser cache
4. Check Network tab di DevTools

### Backend 502/503 Error
**Solution:**
1. Check Railway logs untuk errors
2. Verify env variables semua ada
3. Check database connection
4. Restart Railway deployment

### Build Failed di Vercel
**Solution:**
1. Check Vercel build logs
2. Verify dependencies di package.json
3. Run `npm install` locally
4. Check env variables
5. Run `npm run build` locally untuk debug

### Database Connection Error
**Solution:**
1. Verify Supabase URL benar (tanpa `/`)
2. Verify Supabase Key benar
3. Check Supabase database is active
4. Verify networking allowed (IP whitelist)

---

## 📚 Useful Commands

```bash
# Local testing
cd backend
npm install
npm run dev

# Build frontend
cd frontend
npm install
npm run build
npm run preview

# Test API locally
curl -X GET http://localhost:5000/api/

# Check env variables di Railway
railway vars list

# View Railway logs
railway logs
```

---

**Status:** In Progress  
**Last Updated:** December 18, 2025  
**Next Step:** Start Phase 1 - Setup Supabase
