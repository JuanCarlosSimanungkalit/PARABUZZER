# 🧪 Pre-Deployment Testing Checklist

Jalankan semua test ini sebelum deploy ke production!

---

## ✅ Local Development Testing

### Backend Testing

```bash
cd backend
npm install
npm run dev
```

- [ ] Backend running di `http://localhost:5000`
- [ ] Tidak ada error di console
- [ ] Database connection working

**Test endpoints dengan Postman/curl:**

```bash
# Test health
curl http://localhost:5000/api/

# Test auth
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Test influencer list
curl http://localhost:5000/api/influencers
```

- [ ] Auth endpoints work
- [ ] Influencer endpoints work
- [ ] Booking endpoints work
- [ ] Review endpoints work
- [ ] Chat endpoints work

---

### Frontend Testing

```bash
cd frontend
npm install
npm run dev
```

- [ ] Frontend running di `http://localhost:5173`
- [ ] Tidak ada error di console
- [ ] Tidak ada error di browser DevTools

**Test functionality:**

- [ ] **Login Page**
  - [ ] Form validation works
  - [ ] Login dengan akun valid works
  - [ ] Redirect ke home setelah login
  - [ ] Token disimpan di localStorage

- [ ] **Home Page**
  - [ ] Influencer list load dengan benar
  - [ ] Cards render dengan benar
  - [ ] Filter/search berfungsi (kalau ada)

- [ ] **Influencer Detail Page**
  - [ ] Data influencer load
  - [ ] Reviews tampil
  - [ ] Rating stars render
  - [ ] Booking button accessible

- [ ] **Profile Page**
  - [ ] User data tampil
  - [ ] Avatar upload works
  - [ ] Edit profile works

- [ ] **Admin Dashboard** (jika ada)
  - [ ] Admin dapat akses
  - [ ] Data transactions tampil
  - [ ] Stats render dengan benar

- [ ] **API Integration**
  - [ ] All API calls successful
  - [ ] Errors handled gracefully
  - [ ] Loading states work
  - [ ] Error messages display

---

## 🗄️ Database Testing

### Test di Supabase SQL Editor

```sql
-- Check tables exist
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';

-- Check profiles
SELECT COUNT(*) as total_profiles FROM profiles;

-- Check influencers
SELECT COUNT(*) as total_influencers FROM influencers;

-- Check RLS policies
SELECT * FROM pg_policies WHERE tablename = 'bookings';

-- Test trigger
-- (Create new auth user dan verify profile auto-created)
```

- [ ] Semua tables ada
- [ ] Triggers berfungsi
- [ ] RLS policies aktif
- [ ] Data dapat di-insert/update/delete

---

## 🔗 Cross-Environment Testing

### Test Frontend + Local Backend

1. **Update Frontend API URL:**
   ```javascript
   // frontend/src/services/api.js
   baseURL: "http://localhost:5000/api"
   ```

2. **Test full flow:**
   - [ ] Frontend di `localhost:3000` (or 5173)
   - [ ] Backend di `localhost:5000`
   - [ ] Database di Supabase
   - [ ] CORS works (no errors)
   - [ ] Login works
   - [ ] API calls work
   - [ ] File uploads work

---

## 🚀 Production Simulation

### Test build process

```bash
# Frontend build
cd frontend
npm run build
npm run preview

# Verify dist folder generated
ls dist/
```

- [ ] Build successful
- [ ] No errors di build output
- [ ] Dist folder ada
- [ ] Preview berfungsi di `localhost:4173`

---

## 🔐 Security Checklist

- [ ] API keys tidak ada di frontend code
- [ ] API keys di environment variables
- [ ] CORS dikonfigurasi dengan tepat
- [ ] Authentication tokens stored securely
- [ ] Password hashing implemented (di Supabase)
- [ ] RLS policies aktif
- [ ] Sensitive data tidak log di console
- [ ] Error messages tidak expose sensitive info

---

## 📊 Performance Checklist

- [ ] Frontend load time < 3 seconds
- [ ] API response time < 1 second
- [ ] No console warnings/errors
- [ ] Memory usage normal
- [ ] CPU usage normal
- [ ] Database queries optimized
- [ ] Images optimized
- [ ] Bundle size reasonable

---

## 🧩 Integration Testing

### Test critical user flows

1. **New User Registration Flow**
   - [ ] User can register
   - [ ] Email verification works
   - [ ] Profile auto-created
   - [ ] User can login
   - [ ] Can set avatar
   - [ ] Can update profile

2. **Influencer Booking Flow**
   - [ ] Can view influencers
   - [ ] Can view influencer details
   - [ ] Can create booking
   - [ ] Booking saved to database
   - [ ] Can see booking history
   - [ ] Can message influencer via chat

3. **Admin Flow** (jika applicable)
   - [ ] Admin dapat login
   - [ ] Can view all transactions
   - [ ] Can view all bookings
   - [ ] Can manage users

4. **Payment Flow** (jika applicable)
   - [ ] Can initiate payment
   - [ ] Payment confirmed
   - [ ] Transaction saved
   - [ ] Status updated

---

## 📝 Browser Compatibility

Test di beberapa browsers:

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

**Checklist per browser:**
- [ ] Layout responsive
- [ ] Forms work
- [ ] API calls work
- [ ] Storage works
- [ ] No console errors

---

## 📱 Mobile Testing

- [ ] Navbar responsive
- [ ] Forms mobile-friendly
- [ ] Touch interactions work
- [ ] File upload works on mobile
- [ ] Images load correctly
- [ ] Performance acceptable on 3G
- [ ] Battery usage normal

---

## 🐛 Error Handling

Test error scenarios:

```javascript
// Test network error
// Turn off backend → see error message

// Test invalid token
// Clear localStorage → try API call → see error

// Test validation error
// Submit form dengan invalid data → see error message

// Test server error
// Force 500 error → see error message
```

- [ ] Network errors handled
- [ ] Auth errors handled
- [ ] Validation errors shown
- [ ] Server errors caught
- [ ] User gets useful messages
- [ ] Retry mechanism works

---

## ✨ Final Verification

- [ ] All features working
- [ ] No broken links
- [ ] No 404s
- [ ] No console errors
- [ ] No security issues
- [ ] No performance issues
- [ ] Responsive design works
- [ ] Accessibility acceptable

---

## 🚢 Ready to Deploy!

Bila semua checklist di atas ✅, siap untuk deploy ke:
1. Supabase (database)
2. Railway (backend)
3. Vercel (frontend)

---

**Date:** _____________  
**Tested By:** _____________  
**Status:** [ ] PASSED [ ] FAILED

---

## 📌 Notes

```
[Tulis catatan apapun di sini sebelum deploy]




```

---

Setelah semua selesai, ikuti **DEPLOYMENT_GUIDE.md**
