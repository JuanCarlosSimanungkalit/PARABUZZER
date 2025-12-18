# 🔍 Backend Errors Debugging

## Errors Received

```
500 - /api/influencers (Internal Server Error)
401 - /api/auth/login (Unauthorized)
```

---

## Root Cause Analysis

### ❌ Possible Causes

1. **Database Tables Not Created**
   - Supabase SQL schema not run
   - Tables missing: `influencers`, `profiles`, `auth_users`, etc.

2. **Wrong Service Role Key**
   - Invalid or expired Supabase service role key
   - Key doesn't match project

3. **Wrong Supabase Project**
   - Pointing to empty/different project
   - No data in database

4. **Triggers Not Set**
   - `handle_new_user` trigger missing
   - Auto profile creation fails

5. **RLS Policies Blocking**
   - Row Level Security blocking queries
   - Service role key should bypass RLS

---

## Solution: Step-by-Step Verification

### Step 1: Verify Supabase Database

**Open:** https://app.supabase.com → Project: `owahwnqzzsjrjsmitiui`

**Check Tables Exist:**
```sql
-- Run in SQL Editor
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';
```

Should show:
- ✅ `profiles`
- ✅ `influencers`
- ✅ `reviews`
- ✅ `bookings`
- ✅ `transactions`
- ✅ `chats`
- ✅ `influencer_photos`

**If tables missing:** Run [DATABASE_SCHEMA.sql](../DATABASE_SCHEMA.sql) content

### Step 2: Check Service Role Key

**Get from Supabase:**

1. https://app.supabase.com
2. Settings → API
3. Find **service_role secret** (NOT anon public)
4. Copy it

**Verify in Backend:**

Check `.env`:
```
SUPABASE_SERVICE_ROLE_KEY=[should-be-long-jwt-or-key]
```

**Test it locally:**
```javascript
// Create test script
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://owahwnqzzsjrjsmitiui.supabase.co",
  "sb_publishable_xmPmY-dbAGNOG7GcI_02YA_3pHVSgHS"  // Service role key
);

// Test query
const { data, error } = await supabase
  .from("influencers")
  .select("*");

console.log(data, error);
```

### Step 3: Check Railway Logs

**Open:** https://railway.app

1. Select PARABUZZER project
2. Click Backend
3. Go to Deployments tab
4. Click latest deployment
5. View logs

**Look for:**
- ✅ `Backend running on port 5000` (good)
- ❌ Database connection errors
- ❌ Invalid key errors
- ❌ Missing table errors

### Step 4: Test Endpoints Locally

```bash
# Test influencers endpoint
cd backend
npm run dev

# In another terminal:
curl -X GET http://localhost:5000/api/influencers

# Check console for error message
```

---

## Common Errors & Fixes

### Error 500 - getAllInfluencers

**Most likely:** Tables don't exist or bad key

**Fix:**
1. Verify `influencers` table exists in Supabase
2. Check service role key in .env
3. Test locally: `npm run dev`
4. Check console for exact error

### Error 401 - Login

**Most likely:** JWT token validation issue

**Check:**
- JWT_SECRET in .env
- Auth middleware in routes

**Fix:**
1. Verify `profiles` table exists
2. Verify auth trigger exists:
   ```sql
   SELECT * FROM pg_trigger WHERE tgname = 'on_auth_user_created';
   ```
3. If missing, run database schema SQL

---

## Quick Checklist

- [ ] Supabase project opened
- [ ] All tables visible in SQL Editor
- [ ] Service role key copied & updated in .env
- [ ] Backend test locally: `npm run dev`
- [ ] API endpoints respond without error
- [ ] Railway logs show "Backend running on port 5000"
- [ ] Check Railway deployment is latest
- [ ] Database trigger `on_auth_user_created` exists

---

## Manual Database Setup (If Needed)

**If tables missing, run this SQL in Supabase SQL Editor:**

Copy all content from: [DATABASE_SCHEMA.sql](../DATABASE_SCHEMA.sql)

Paste into Supabase SQL Editor and click **Run**

---

## Next Steps

1. **Check Supabase tables exist**
2. **Verify service role key correct**
3. **Test backend locally**
4. **Check Railway logs**
5. **Update Railway deployment if needed**

---

**Help:** Check file contents in the error logs to see exact issue

