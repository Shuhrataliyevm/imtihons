import { useEffect, useState } from "react";
import { getAccessToken, refreshAccessToken } from "../../utils/auth";
import Header from '../Header/header';
import Footer from '../Footer/footer';
import "../../styles/libraryprofile.scss";

interface User {
  id: number;
  name: string;
  phone: string;
}

interface Profile {
  user: User;
  image: string | null;
  address: string;
  social_media: Record<string, any>;
  can_rent_books: boolean;
  latitude: number | null;
  longitude: number | null;
}

const LibraryProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async (token: string) => {
      const res = await fetch("https://s-libraries.uz/api/v1/auth/profile/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw res;

      const data: Profile = await res.json();
      setProfile(data);
    };

    const loadProfile = async () => {
      let token = getAccessToken();
      if (!token) {
        setError("Token topilmadi");
        setLoading(false);
        return;
      }

      try {
        await fetchProfile(token);
      } catch (err: any) {
        if (err.status === 401) {
          try {
            const newToken = await refreshAccessToken();
            if (newToken) {
              await fetchProfile(newToken);
            } else {
              throw new Error("Yangi token olinmadi");
            }
          } catch (refreshErr) {
            setError("Token yangilashda xatolik yuz berdi");
          }
        } else {
          setError("Foydalanuvchi ma'lumotlarini olishda xatolik yuz berdi");
        }
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  if (loading) return <p className="loading-text">Yuklanmoqda...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <>
      <Header />
      <div className="profile-container">
        {profile ? (
          <div className="profile-card">
            <h2 className="profile-title">Foydalanuvchi profili</h2>
            <div className="profile-info">
              <p><strong>Ism:</strong> {profile.user?.name}</p>
              <p><strong>Telefon raqami:</strong> {profile.user?.phone}</p>
              <p><strong>Manzil:</strong> {profile.address}</p>
              <p><strong>Ijtimoiy tarmoqlar:</strong> {Object.keys(profile.social_media || {}).length ? "Mavjud" : "Mavjud emas"}</p>
              <p><strong>Kitob ijaraga olish huquqi:</strong> {profile.can_rent_books ? "Ha" : "Yo'q"}</p>
            </div>
          </div>
        ) : (
          <p>Foydalanuvchi ma'lumotlari mavjud emas</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default LibraryProfile;
