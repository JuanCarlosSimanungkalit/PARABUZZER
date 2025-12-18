# 🚨 Critical: Database Schema Setup Required

## Status Check

❌ **Database tables NOT created** → Causing 500 errors
❌ **Service role key issue** → Causing 401 errors  
❌ **Frontend route missing** → Causing 404 on /login

---

## FIX #1: CREATE DATABASE TABLES (PRIORITY 1)

### Step 1: Open Supabase
→ https://app.supabase.com → Project: **owahwnqzzsjrjsmitiui**

### Step 2: Go to SQL Editor
Menu sidebar → **SQL Editor**

### Step 3: Copy & Paste Schema
**Copy everything from:** [DATABASE_SCHEMA.sql](DATABASE_SCHEMA.sql)

**Important sections to include:**
```sql
-- 1. Create PROFILES table
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  ...
);

-- 2. Create INFLUENCERS table
CREATE TABLE influencers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ...
);

-- 3. Create all other tables
-- (reviews, bookings, transactions, chats, influencer_photos)

-- 4. Create TRIGGER for auto-profile
CREATE OR REPLACE FUNCTION public.handle_new_user()...

-- 5. Create RLS POLICIES
ALTER TABLE ... ENABLE ROW LEVEL SECURITY;

-- 6. Create STORAGE POLICIES
CREATE POLICY "Public read avatars"...
```

### Step 4: Execute
Click **Run** button (top right)

### Step 5: Verify Success
Run this query:
```sql
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```

Should show 7 tables:
```
chats
influencer_photos
influencers
profiles
reviews
bookings
transactions
```

---

## FIX #2: CHECK RAILWAY LOGS (PRIORITY 2)

### Step 1: Open Railway
→ https://railway.app → PARABUZZER → Backend

### Step 2: View Logs
Click **Deployments** tab → Latest → View **Build Logs** & **Runtime Logs**

### Step 3: Look For
- ❌ "Cannot find table 'influencers'" → Need to run SQL schema
- ❌ "Invalid service role key" → Need to check .env
- ❌ "Connection refused" → Database not accessible

### Step 4: Share Error
Copy exact error message and we'll fix it

---

## FIX #3: VERIFY SERVICE ROLE KEY (PRIORITY 2B)

### Check Current Key
`backend/.env`:
```
SUPABASE_SERVICE_ROLE_KEY=?
```

### Get Correct Key
1. Supabase Settings → API
2. Look for "service_role" section
3. Copy the KEY (long string starting with `eyJ` or `sb_`)

### Update .env
```
SUPABASE_SERVICE_ROLE_KEY=[paste-exact-key-here]
```

### Test Locally
```bash
cd backend
npm run dev
```

Try:
```bash
curl http://localhost:5000/api/influencers
```

Should return `[]` (empty array), not error

---

## FIX #4: FRONTEND ROUTING (PRIORITY 3)

The 404 on `/login` means route not found.

Check: [frontend/src/routes/AppRoutes.jsx](../frontend/src/routes/AppRoutes.jsx)

Should have:
```javascript
<Route path="/login" element={<Login />} />
```

---

## Complete Checklist

- [ ] Run DATABASE_SCHEMA.sql in Supabase
- [ ] Verify all 7 tables created
- [ ] Check Railway logs for errors
- [ ] Verify service role key in .env
- [ ] Test backend locally: `npm run dev`
- [ ] Test endpoint: `curl http://localhost:5000/api/influencers`
- [ ] Verify frontend routes have /login
- [ ] Push changes to GitHub
- [ ] Wait for Railway redeploy
- [ ] Test in Vercel

---

## QUICK SUMMARY

```
DATABASE NOT SETUP = 500 errors
SERVICE KEY WRONG = 401 errors  
ROUTE MISSING = 404 errors

FIX: Run SQL schema → Check logs → Verify key → Test locally
```

---

**Start with:** Database schema SQL execution (Step 1 above)
