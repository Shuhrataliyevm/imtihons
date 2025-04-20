import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    IoBookOutline,
    IoLibraryOutline,
    IoPersonOutline,
    IoAddCircleOutline,
    IoCheckmarkCircleOutline
} from 'react-icons/io5';
import Header from '../Header/header';
import Footer from '../Footer/footer';
import { getAccessToken, refreshAccessToken } from '../../utils/auth';
import '../../styles/addbook.scss';

interface BookData {
    name: string;
    author: string;
    publisher: string;
    quantity_in_library: number;
}

const oneaddbook: React.FC = () => {
    const navigate = useNavigate();
    const [bookData, setBookData] = useState<BookData>({
        name: '',
        author: '',
        publisher: '',
        quantity_in_library: 1
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const isFormValid =
        bookData.name.trim() &&
        bookData.author.trim() &&
        bookData.publisher.trim() &&
        bookData.quantity_in_library > 0;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid) return;

        setLoading(true);
        setError(null);

        try {
            let token = getAccessToken();
            if (!token) {
                throw new Error("Token topilmadi. Iltimos, qaytadan tizimga kiring.");
            }

            let response = await fetch('https://s-libraries.uz/api/v1/books/books/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify([bookData]) 
            });

            if (response.status === 401) {
                const newToken = await refreshAccessToken();
                token = newToken;

                response = await fetch('https://s-libraries.uz/api/v1/books/books/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify([bookData])
                });
            }

            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage = errorData?.non_field_errors?.[0] || errorData.message || 'Kitob qo\'shishda xatolik yuz berdi';
                throw new Error(errorMessage);
            }

            setSuccess(true);
            setTimeout(() => {
                navigate('/books');
            }, 2000);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Kitob qo\'shishda xatolik yuz berdi');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-container">
            <Header />
            <div className="add-book-container">
                <div className="form-card">
                    <h2><IoAddCircleOutline /> Yangi kitob qo'shish</h2>

                    {success && <p className="success-message"><IoCheckmarkCircleOutline /> Kitob muvaffaqiyatli qo'shildi!</p>}
                    {error && <p className="error-message">⚠️ {error}</p>}

                    <form onSubmit={handleSubmit}>
                        <label>
                            <IoBookOutline /> Kitob nomi
                            <input
                                type="text"
                                value={bookData.name}
                                onChange={(e) => setBookData({ ...bookData, name: e.target.value })}
                                placeholder="Kitob nomini kiriting"
                                disabled={loading}
                                required
                            />
                        </label>

                        <label>
                            <IoPersonOutline /> Muallif
                            <input
                                type="text"
                                value={bookData.author}
                                onChange={(e) => setBookData({ ...bookData, author: e.target.value })}
                                placeholder="Muallif ismini kiriting"
                                disabled={loading}
                                required
                            />
                        </label>

                        <label>
                            <IoLibraryOutline /> Nashriyot
                            <input
                                type="text"
                                value={bookData.publisher}
                                onChange={(e) => setBookData({ ...bookData, publisher: e.target.value })}
                                placeholder="Nashriyot nomini kiriting"
                                disabled={loading}
                                required
                            />
                        </label>

                        <label>
                            <IoBookOutline /> Nusxalar soni
                            <input
                                type="number"
                                value={bookData.quantity_in_library}
                                onChange={(e) => setBookData({ ...bookData, quantity_in_library: parseInt(e.target.value) })}
                                min="1"
                                placeholder="Nusxalar soni"
                                disabled={loading}
                                required
                            />
                        </label>

                        <button
                        onClick={()=>window.location.href="/books"}
                            type="submit"
                            className={`submit-button ${loading ? 'loading' : ''}`}
                            disabled={!isFormValid || loading || success}
                        >
                            {loading ? 'Qo\'shilmoqda...' : 'Kitobni qo\'shish'}
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default oneaddbook;
