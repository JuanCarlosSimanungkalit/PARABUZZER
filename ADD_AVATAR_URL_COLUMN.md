# 🔧 Fix: Add Missing avatar_url Column

## The Error
```
column influencers.avatar_url does not exist
```

## The Fix

Run this SQL in Supabase SQL Editor:

```sql
-- Add avatar_url column to influencers table
ALTER TABLE influencers 
ADD COLUMN avatar_url text;

-- Verify column added
SELECT column_name FROM information_schema.columns 
WHERE table_name = 'influencers' 
ORDER BY column_name;
```

## Steps:

1. Go to: https://app.supabase.com → `owahwnqzzsjrjsmitiui` → SQL Editor
2. Paste the SQL above
3. Click **Run**
4. Should see success message
5. Verify query shows `avatar_url` in the list

## After Fix:

Test endpoint:
```bash
curl https://mindful-celebration-production-e95e.up.railway.app/api/influencers
```

Should return:
```json
[]
```

Not error! ✅

## Why This Happened

DATABASE_SCHEMA.sql tidak include `avatar_url` column di influencers table, tapi backend code expect itu.

Now fixed! 🎉
