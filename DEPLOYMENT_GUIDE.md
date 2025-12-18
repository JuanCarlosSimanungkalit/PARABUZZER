# Panduan Deployment: Frontend (Vercel) + Backend (Railway)

## 📋 Prerequisites

1. **GitHub Repository** - Push semua code ke GitHub
2. **Supabase Account** - Setup database
3. **Vercel Account** - https://vercel.com
4. **Railway Account** - https://railway.app

---

## 🗄️ Step 1: Setup Database di Supabase

### 1.1 Buat Project Supabase
- Kunjungi https://app.supabase.com
- Buat project baru
- Copy **Project URL** dan **Anon Key** dari Settings → API

### 1.2 Setup Database Schema
1. Buka SQL Editor di Supabase
2. Copy-paste semua SQL queries dari `database_schema.sql` (lihat di bawah)
3. Run semua queries

### Database Schema:
```sql
-- 1. Profiles Table
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name text,
  role text DEFAULT 'user',
  avatar_url text,
  created_at timestamp with time zone DEFAULT now()
);

-- 2. Influencers Table
CREATE TABLE influencers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id),
  username text,
  bio text,
  price integer,
  platform text,
  followers integer,
  created_at timestamp DEFAULT now()
);

-- 3. Reviews Table
CREATE TABLE reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  influencer_id uuid REFERENCES influencers(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id),
  rating integer CHECK (rating BETWEEN 1 AND 5),
  comment text,
  created_at timestamp DEFAULT now()
);

-- 4. Bookings Table
CREATE TABLE bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  influencer_id uuid REFERENCES influencers(id) ON DELETE CASCADE,
  user_id uuid,
  campaign_name text,
  note text,
  status text DEFAULT 'pending',
  created_at timestamp DEFAULT now()
);

-- 5. Transactions Table
CREATE TABLE transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id),
  influencer_id uuid REFERENCES influencers(id),
  amount integer,
  status text DEFAULT 'pending',
  created_at timestamp DEFAULT now()
);

-- 6. Influencer Photos Table
CREATE TABLE influencer_photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  influencer_id uuid REFERENCES influencers(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  created_at timestamp DEFAULT now()
);

-- 7. Chats Table
CREATE TABLE chats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES bookings(id) ON DELETE CASCADE,
  sender_id uuid REFERENCES profiles(id),
  message text,
  created_at timestamp with time zone DEFAULT now()
);

-- 8. Trigger untuk Auto Create Profile
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id)
  VALUES (new.id);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();

-- 9. Row Level Security (RLS) Policies
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "User read own bookings"
ON bookings FOR SELECT
USING (auth.uid() = user_id OR 
       influencer_id IN (
         SELECT id FROM influencers WHERE user_id = auth.uid()
       ));

CREATE POLICY "Chat access"
ON chats FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM bookings
    WHERE bookings.id = chats.booking_id
    AND (
      bookings.user_id = auth.uid()
      OR bookings.influencer_id IN (
        SELECT id FROM influencers WHERE user_id = auth.uid()
      )
    )
  )
);

-- 10. Storage Policies untuk Avatar
CREATE POLICY "Public read avatars"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');

CREATE POLICY "Allow upload avatar"
ON storage.objects FOR INSERT
TO authenticated
USING (bucket_id = 'avatars');
```

### 1.3 Setup Storage Bucket
1. Buka Storage → Buckets
2. Create bucket baru bernama `avatars`
3. Set ke Public
4. Policies sudah ada di SQL di atas

---

## 🚀 Step 2: Deploy Backend ke Railway

### 2.1 Prepare Backend
1. Pastikan file `.env` sudah ada:
```
PORT=5000
NODE_ENV=production
SUPABASE_URL=<paste-project-url>
SUPABASE_KEY=<paste-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<paste-service-role-key>
CORS_ORIGIN=https://your-vercel-domain.vercel.app
```

2. Update backend untuk support production:
```javascript
// src/app.js
const allowedOrigins = process.env.CORS_ORIGIN 
  ? process.env.CORS_ORIGIN.split(',') 
  : ['http://localhost:3000'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
```

### 2.2 Deploy ke Railway
1. Buka https://railway.app
2. Login dengan GitHub
3. Click **+ New Project** → **Deploy from GitHub repo**
4. Select repository `PARABUZZERR`
5. Select root directory: `backend`
6. Klik Deploy

### 2.3 Configure Environment Variables di Railway
1. Di Railway dashboard, buka project
2. Click **Variables** tab
3. Add semua env variables:
   - `PORT=5000`
   - `NODE_ENV=production`
   - `SUPABASE_URL=<paste-url>`
   - `SUPABASE_KEY=<paste-key>`
   - `SUPABASE_SERVICE_ROLE_KEY=<paste-key>`
   - `CORS_ORIGIN=https://parabuzzer.vercel.app` (sesuaikan dengan domain Vercel Anda)

4. Click **Deploy**
5. Copy domain Railway (misal: `https://parabuzzer-backend.up.railway.app`)

---

## 🎨 Step 3: Deploy Frontend ke Vercel

### 3.1 Update Frontend Environment
Buat file `.env.production` di folder `frontend/`:
```
VITE_SUPABASE_URL=<paste-supabase-url>
VITE_SUPABASE_ANON_KEY=<paste-supabase-key>
VITE_API_URL=https://parabuzzer-backend.up.railway.app/api
```

### 3.2 Update API Client
Update [frontend/src/services/api.js](frontend/src/services/api.js):
```javascript
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const api = axios.create({
  baseURL: apiUrl,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### 3.3 Deploy ke Vercel
1. Buka https://vercel.com
2. Click **Add New** → **Project**
3. Import GitHub repository `PARABUZZERR`
4. Framework Preset: **Vite**
5. Root Directory: `frontend`
6. Environment Variables:
   ```
   VITE_SUPABASE_URL=<paste-url>
   VITE_SUPABASE_ANON_KEY=<paste-key>
   VITE_API_URL=https://parabuzzer-backend.up.railway.app/api
   ```
7. Click **Deploy**

---

## ✅ Post-Deployment Checklist

- [ ] Database schema sudah jalan di Supabase
- [ ] Backend running di Railway (test dengan `curl https://parabuzzer-backend.up.railway.app/api/health`)
- [ ] Frontend running di Vercel
- [ ] CORS sudah dikonfigurasi dengan benar
- [ ] Semua environment variables sudah set
- [ ] Login berfungsi
- [ ] API calls berfungsi
- [ ] File upload berfungsi

---

## 🔄 Update Database Schema (Kapan Saja)

1. Buka Supabase SQL Editor
2. Jalankan query baru
3. Tidak perlu redeploy backend/frontend

---

## 🐛 Troubleshooting

### CORS Error
**Solusi**: Pastikan `CORS_ORIGIN` di Railway sesuai dengan domain Vercel
```
CORS_ORIGIN=https://parabuzzer.vercel.app
```

### Backend bukan 404
**Solusi**: Check Railway logs untuk error details

### Database Connection Error
**Solusi**: 
- Verifikasi `SUPABASE_URL` dan `SUPABASE_KEY` benar
- Check Supabase Project Settings untuk copy credentials yang tepat

### Build Error di Vercel
**Solusi**: 
- Check Vercel build logs
- Pastikan semua dependencies sudah di install
- Verifikasi env variables

---

## 📞 Helpful Links

- Railway Docs: https://docs.railway.app
- Vercel Docs: https://vercel.com/docs
- Supabase Docs: https://supabase.com/docs
