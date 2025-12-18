# 🔍 Diagnostic: 500 & 401 Errors Persisting

## Current Errors
```
500: /api/influencers
401: /api/auth/login
404: /login
```

Even though you ran the SQL schema.

---

## 🧪 Diagnostic Checklist

### Question 1: Verify Correct Project

**Which Supabase project did you run SQL in?**

Expected: `owahwnqzzsjrjsmitiui`

**Verify:**
1. https://app.supabase.com
2. Check project name at top-left
3. Should match `owahwnqzzsjrjsmitiui`

If WRONG project → Run SQL in correct project!

---

### Question 2: Verify Tables Created

**Go to:** https://app.supabase.com → `owahwnqzzsjrjsmitiui` → SQL Editor

**Run:**
```sql
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```

**Expected result:** 7 tables
```
bookings
chats
influencer_photos
influencers
profiles
reviews
transactions
```

**If you see:**
- ✅ All 7 tables → Database created ✓
- ❌ Fewer tables → SQL didn't run completely
- ❌ No tables → Ran SQL in wrong project

---

### Question 3: Verify Service Role Key

**Get from:** https://app.supabase.com → Settings → API

**Look for:** "service_role" (SECRET key, not public anon)

**Should look like:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3M...
```

**Check in backend/.env:**
```
SUPABASE_SERVICE_ROLE_KEY=?
```

**Is it:**
- ✅ Present and long (JWT token)? 
- ❌ Empty or short?
- ❌ Says "sb_..."? (that's anon key, not service role)

---

## 🛠️ If Tables Missing

**If SQL query shows NO tables (or fewer than 7):**

1. Verify you're in correct project: `owahwnqzzsjrjsmitiui`
2. Open DATABASE_SCHEMA.sql from repository
3. Copy ALL content
4. Paste in SQL Editor
5. Click Run
6. Wait for success message
7. Run verification query again

---

## 🛠️ If Service Role Key Wrong

**If key is empty or looks wrong:**

1. Go to Supabase Settings → API
2. Find "service_role secret" section
3. Copy the long key (starts with `eyJ`)
4. Update backend/.env:
   ```
   SUPABASE_SERVICE_ROLE_KEY=[paste-long-key]
   ```
5. Commit & push:
   ```bash
   git add -A
   git commit -m "fix: Update service role key"
   git push upstream main
   ```
6. Wait for Railway redeploy (2-3 min)
7. Test again

---

## 🔧 Test Locally

```bash
cd backend
npm run dev
```

Try:
```bash
curl http://localhost:5000/api/influencers
```

**If works locally but not on Railway:**
- Service role key not updated in Railway env vars
- Check: https://railway.app → Backend → Variables
- Update SUPABASE_SERVICE_ROLE_KEY

---

## 📋 Quick Verification

Answer these questions:

```
1. Correct Supabase project? (owahwnqzzsjrjsmitiui)
   [ ] Yes
   [ ] No - different project
   [ ] Not sure

2. All 7 tables created? (verify with SQL query)
   [ ] Yes - all 7 shown
   [ ] No - fewer tables
   [ ] Not sure - didn't check

3. Service role key present? (in backend/.env)
   [ ] Yes - long JWT token
   [ ] No - empty or wrong
   [ ] Not sure

4. Backend works locally?
   [ ] Yes - returns []
   [ ] No - returns error
   [ ] Not tested
```

---

## 🚨 Most Likely Issues

**Ranked by probability:**

1. **Service role key wrong/empty** (80% chance)
   - Fix: Update .env with correct key, redeploy

2. **SQL not run in correct project** (15% chance)
   - Fix: Verify project, run SQL again

3. **SQL didn't execute completely** (4% chance)
   - Fix: Copy full schema again, run

4. **Other issue** (1% chance)
   - Escalate with error details

---

## 🆘 Need Help?

Provide:
1. Output of table verification SQL query
2. Content of backend/.env (hide actual key)
3. Error from Railway logs
4. Output of local `curl` test

---

**Next step:** Answer the 4 questions above and we'll fix it!
