# 🔑 Get Supabase Credentials

## Di Supabase Dashboard - Dapatkan 3 hal ini:

### 1. Project URL ✅ (sudah ada)
```
https://owahwnqzzsjrjsmitiui.supabase.co
```

### 2. Anon Key (Public) ✅ (sudah ada)
```
sb_publishable_xmPmY-dbAGNOG7GcI_02YA_3pHVSgHS
```

### 3. Service Role Key ❌ (PERLU DICARI!)

**Untuk get Service Role Key:**

1. Buka https://app.supabase.com
2. Login dengan akun yang ada
3. Pilih project: **owahwnqzzsjrjsmitiui**
4. Di sidebar, klik **Settings** (icon roda gigi di bawah)
5. Pilih **API**
6. Cari section **service_role secret** atau **Secret key (service_role)**
7. COPY key yang panjang (bukan yang anon public)
8. Paste di sini:

```
SUPABASE_SERVICE_ROLE_KEY = [PASTE DISINI]
```

---

## ⚠️ PENTING

- **Anon Key** boleh di-share (public safe)
- **Service Role Key** JANGAN di-share (sensitive!)
- Jangan commit ke Git

---

## Struktur Key

Service Role Key biasanya berbentuk:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93YWh3bnF6enNqcmpzbWl0aXVpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc...
```

Atau bisa bentuk lain seperti:
```
sb_[random-characters]
```

---

**Sudah dapat Service Role Key? Update di Railway Environment Variables!**
