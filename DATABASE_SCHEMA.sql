-- ============================================
-- PARABUZZERR - Complete Database Schema
-- Run semua queries ini di Supabase SQL Editor
-- ============================================

-- ============================================
-- 1. PROFILES TABLE (untuk setiap user)
-- ============================================
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name text,
  role text DEFAULT 'user', -- user | admin | influencer
  avatar_url text,
  created_at timestamp with time zone DEFAULT now()
);

-- ============================================
-- 2. INFLUENCERS TABLE (influencer profiles)
-- ============================================
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

-- ============================================
-- 3. REVIEWS TABLE (ratings & comments)
-- ============================================
CREATE TABLE reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  influencer_id uuid REFERENCES influencers(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id),
  rating integer CHECK (rating BETWEEN 1 AND 5),
  comment text,
  created_at timestamp DEFAULT now()
);

-- ============================================
-- 4. BOOKINGS TABLE (campaign bookings)
-- ============================================
CREATE TABLE bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  influencer_id uuid REFERENCES influencers(id) ON DELETE CASCADE,
  user_id uuid,
  campaign_name text,
  note text,
  status text DEFAULT 'pending', -- pending | confirmed | completed | cancelled
  created_at timestamp DEFAULT now()
);

-- ============================================
-- 5. TRANSACTIONS TABLE (payment tracking)
-- ============================================
CREATE TABLE transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id),
  influencer_id uuid REFERENCES influencers(id),
  amount integer,
  status text DEFAULT 'pending', -- pending | paid | done
  created_at timestamp DEFAULT now()
);

-- ============================================
-- 6. INFLUENCER_PHOTOS TABLE (portfolio images)
-- ============================================
CREATE TABLE influencer_photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  influencer_id uuid REFERENCES influencers(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  created_at timestamp DEFAULT now()
);

-- ============================================
-- 7. CHATS TABLE (messaging system)
-- ============================================
CREATE TABLE chats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES bookings(id) ON DELETE CASCADE,
  sender_id uuid REFERENCES profiles(id),
  message text,
  created_at timestamp with time zone DEFAULT now()
);

-- ============================================
-- 8. TRIGGERS & FUNCTIONS
-- ============================================

-- Function untuk auto-create profile saat user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id)
  VALUES (new.id);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger yang menjalankan function di atas
CREATE OR REPLACE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- 9. ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS di tabel-tabel penting
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE influencers ENABLE ROW LEVEL SECURITY;

-- Policy: User hanya bisa lihat booking mereka atau booking influencer mereka
CREATE POLICY "User read own bookings"
ON bookings FOR SELECT
USING (
  auth.uid() = user_id OR 
  influencer_id IN (
    SELECT id FROM influencers WHERE user_id = auth.uid()
  )
);

-- Policy: Chat access - hanya user & influencer dari booking tersebut
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

-- Policy: User bisa baca profile sendiri
CREATE POLICY "Users can view own profile"
ON profiles FOR SELECT
USING (auth.uid() = id);

-- Policy: Influencer bisa dibaca public (untuk listing)
CREATE POLICY "Influencers are public"
ON influencers FOR SELECT
USING (true);

-- Policy: Reviews bisa dibaca public
CREATE POLICY "Reviews are public"
ON reviews FOR SELECT
USING (true);

-- ============================================
-- 10. STORAGE POLICIES (untuk avatar/images)
-- ============================================

-- PUBLIC bucket untuk avatars
CREATE POLICY "Public read avatars"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');

CREATE POLICY "Allow upload avatar"
ON storage.objects FOR INSERT
TO authenticated
USING (bucket_id = 'avatars');

CREATE POLICY "Allow update own avatar"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'avatars' AND auth.uid()::text = owner);

CREATE POLICY "Allow delete own avatar"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'avatars' AND auth.uid()::text = owner);

-- ============================================
-- 11. INDEXES (untuk performa)
-- ============================================

CREATE INDEX idx_influencers_user_id ON influencers(user_id);
CREATE INDEX idx_reviews_influencer_id ON reviews(influencer_id);
CREATE INDEX idx_reviews_user_id ON reviews(user_id);
CREATE INDEX idx_bookings_influencer_id ON bookings(influencer_id);
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_chats_booking_id ON chats(booking_id);
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_influencer_photos_influencer_id ON influencer_photos(influencer_id);

-- ============================================
-- 12. HELPER QUERIES
-- ============================================

-- View semua users & roles
SELECT id, name, role, created_at FROM profiles ORDER BY created_at DESC;

-- View semua influencers
SELECT id, username, price, followers, created_at FROM influencers ORDER BY created_at DESC;

-- View semua bookings dengan status
SELECT 
  b.id, 
  b.campaign_name, 
  b.status, 
  i.username, 
  b.created_at 
FROM bookings b
JOIN influencers i ON b.influencer_id = i.id
ORDER BY b.created_at DESC;

-- View rating average per influencer
SELECT 
  i.id,
  i.username,
  COUNT(r.id) as total_reviews,
  ROUND(AVG(r.rating), 2) as avg_rating
FROM influencers i
LEFT JOIN reviews r ON i.id = r.influencer_id
GROUP BY i.id, i.username
ORDER BY avg_rating DESC;

-- ============================================
-- NOTES:
-- ============================================
-- 1. Setup Storage bucket "avatars" di Supabase Console
-- 2. RLS sudah dikonfigurasi untuk keamanan
-- 3. Trigger otomatis bikin profile saat user signup
-- 4. Gunakan Supabase client untuk query data
-- 5. Backup database regularly
-- ============================================
