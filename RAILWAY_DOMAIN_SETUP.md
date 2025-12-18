# ✅ Railway Domain Setup Complete

## Domain Configuration

**Railway Backend Domain:**
```
https://mindful-celebration-production-e95e.up.railway.app
```

**API Endpoint:**
```
https://mindful-celebration-production-e95e.up.railway.app/api
```

---

## Files Updated

### 1. Frontend (.env)
```
VITE_SUPABASE_URL=https://owahwnqzzsjrjsmitiui.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_xmPmY-dbAGNOG7GcI_02YA_3pHVSgHS
VITE_API_URL=https://mindful-celebration-production-e95e.up.railway.app/api
```

### 2. Backend (.env)
```
PORT=5000
NODE_ENV=production
SUPABASE_URL=https://owahwnqzzsjrjsmitiui.supabase.co
SUPABASE_KEY=sb_publishable_xmPmY-dbAGNOG7GcI_02YA_3pHVSgHS
SUPABASE_SERVICE_ROLE_KEY=sb_publishable_xmPmY-dbAGNOG7GcI_02YA_3pHVSgHS
CORS_ORIGIN=https://parabuzzer.vercel.app,http://localhost:3000,http://localhost:5173
JWT_SECRET=parabuzzer-secret
```

---

## Next Steps

### Step 1: Verify Railway Backend
```bash
curl https://mindful-celebration-production-e95e.up.railway.app/api/
```

Should return API response (not error)

### Step 2: Test Frontend Locally
```bash
cd frontend
npm run dev
```

Open browser → http://localhost:5173
Test API calls → should connect to Railway

### Step 3: Update Railway Environment Variables
1. Go to https://railway.app
2. Select PARABUZZER project → Backend
3. Variables tab
4. Add/Update:
   - `CORS_ORIGIN=https://parabuzzer.vercel.app,http://localhost:3000,http://localhost:5173`

### Step 4: Deploy
```bash
git add -A
git commit -m "config: Update environment variables with Railway domain"
git push upstream main
```

---

## Testing

### Test Backend API
```bash
# Health check
curl https://mindful-celebration-production-e95e.up.railway.app/api/

# With auth routes (example)
curl https://mindful-celebration-production-e95e.up.railway.app/api/auth/
```

### Test Frontend Connection
1. Open browser: http://localhost:5173
2. Check DevTools → Network tab
3. Make any API call
4. Verify request goes to: `https://mindful-celebration-production-e95e.up.railway.app/api/...`

---

## Troubleshooting

### CORS Error di Browser?
**Solution:**
- Backend must have CORS_ORIGIN configured
- Update Railway environment variable
- Redeploy or restart

### 404 API Not Found?
**Solution:**
- Verify endpoint exists in backend
- Check routes files
- Check backend logs in Railway

### Connection Refused?
**Solution:**
- Verify Railway backend is running (green status)
- Check domain is correct
- Wait a minute & try again

---

## Architecture Now

```
Frontend (Vercel)
    ↓ https request ↓
Backend (Railway: mindful-celebration-production-e95e.up.railway.app)
    ↓ SQL queries ↓
Database (Supabase: owahwnqzzsjrjsmitiui.supabase.co)
```

---

**Status:** ✅ Ready for Vercel Deployment

**Next:** Deploy frontend to Vercel
