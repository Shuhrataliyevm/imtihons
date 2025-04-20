"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Footer from "../Footer/footer"
import Header from "../Header/header"
import AlotOfBook from "../AlotOfBook/alotofBook"
import "../../styles/home.scss"
import "../../styles/search-results.scss"
import { IoBookOutline, IoLibraryOutline, IoPersonOutline, IoTimeOutline } from "react-icons/io5"

interface Library {
    id: number
    user: number
    image: string | null
    address: string
    social_media: {
        telegram?: string
        [key: string]: string | undefined
    }
    can_rent_books: boolean
    latitude: string
    longitude: string
    google_maps_url: string
}

interface Book {
    id: number
    name: string
    author: string
    publisher: string
    quantity_in_library: number
    library: Library
}

interface HomeData {
    total_books: number;
    total_libraries: number;
    total_users: number;
    recent_activity: string;
}

const Home = () => {
    const [searchText, setSearchText] = useState("")
    const [searchResults, setSearchResults] = useState<Book[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [hasSearched, setHasSearched] = useState(false)
    const [data, setData] = useState<HomeData | null>(null)
    const [loading, setLoading] = useState(true)

    const handleSearch = async () => {
        if (!searchText.trim()) return

        setIsLoading(true)
        setError(null)
        setHasSearched(true)

        try {
            const response = await fetch(
                `https://s-libraries.uz/api/v1/books/search/book/?q=${encodeURIComponent(searchText)}`,
            )

            if (!response.ok) {
                throw new Error(`API qaytdi: ${response.status}`)
            }

            const data = await response.json()

            const books = Array.isArray(data) ? data : data.results || [data]
            setSearchResults(books)
        } catch (err) {
            console.error("Qidiruv xatosi:", err)
            setError("Ma'lumotlarni yuklashda xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.")
            setSearchResults([])
        } finally {
            setIsLoading(false)
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        handleSearch()
    }

    const getHomeData = async () => {
        setLoading(true)
        try {
            const response = await fetch("https://s-libraries.uz/api/v1/auth/profile/")
            
            if (!response.ok) {
                throw new Error("Network response was not ok")
            }
            const data = await response.json()
            setData(data)
        } catch (error) {
            console.error("Error fetching home data:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getHomeData()
    }, [])

    return (
        <div className="Home-container">
            <Header />

            <div className="search">
                <div className="search-data">
                    <h4>
                        O'zbekiston kutubxonalaridagi <br /> kitoblarni qidiring
                    </h4>
                    <p>Ezma - bu kutubxonalarda kitoblarni izlash va topish uchun qulay va tez platforma</p>

                    <form onSubmit={handleSubmit} className="search-box">
                        <div className="input-wrapper">
                            <img style={{ position: "relative", top: "35px", left: "10px" }} src="/icons/book.svg" alt="search" />
                            <input
                                type="text"
                                placeholder="Kitob nomi yoki muallifi..."
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={!searchText.trim() || isLoading}
                            className={searchText.trim() && !isLoading ? "active-btn" : ""}
                        >
                            {isLoading ? (
                                <span>Qidirilmoqda...</span>
                            ) : (
                                <>
                                    <img src="/icons/search.svg" alt="search icon" />
                                    <span>Qidirish</span>
                                </>
                            )}
                        </button>
                    </form>

                    {hasSearched && (
                        <div onClick={()=> window.location.href =('/books')} className="search-results">
                            {isLoading ? (
                                <div className="loading">
                                    <p>Qidirilmoqda...</p>
                                </div>
                            ) : error ? (
                                <div className="error-message">
                                    <p>{error}</p>
                                </div>
                            ) : searchResults.length > 0 ? (
                                <div className="results-container">
                                    <h3>Qidiruv natijalari: {searchResults.length}</h3>
                                    <div className="books-grid">
                                        {searchResults.map((book) => (
                                            <div key={book.id} className="book-card">
                                                <div className="book-info">
                                                    <h4>{book.name}</h4>
                                                    <p className="author">Muallif: {book.author}</p>
                                                    <p className="publisher">Nashriyot: {book.publisher}</p>

                                                    <div className="library-info">
                                                        <h5>Kutubxona ma'lumotlari:</h5>
                                                        <p className="address">
                                                            <strong>Manzil:</strong> {book.library.address}
                                                        </p>

                                                        <div className="availability">
                                                            <span className={book.quantity_in_library > 0 ? "available" : "unavailable"}>
                                                                {book.quantity_in_library > 0
                                                                    ? `Mavjud: ${book.quantity_in_library} ta`
                                                                    : "Mavjud emas"}
                                                            </span>

                                                            {book.library.can_rent_books && (
                                                                <span className="can-rent">Ijaraga olish mumkin</span>
                                                            )}
                                                        </div>

                                                        <div className="library-actions">
                                                            {book.library.google_maps_url && (
                                                                <a
                                                                    href={book.library.google_maps_url}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="map-link"
                                                                >
                                                                    <img src="/icons/locatsiya.svg" alt="Location" className="icon" />
                                                                    Xaritada ko'rish
                                                                </a>
                                                            )}

                                                            {book.library.social_media?.telegram && (
                                                                <a
                                                                    href={book.library.social_media.telegram.startsWith("http")
                                                                        ? book.library.social_media.telegram
                                                                        : `https://${book.library.social_media.telegram}`}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="telegram-link"
                                                                >
                                                                    <img src="/public/images/telegram.png" alt="Telegram" className="icon" />
                                                                    Telegram
                                                                </a>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="no-results">
                                    <p>"{searchText}" bo'yicha hech qanday kitob topilmadi.</p>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="Ezma">
                        <div className="whatEzma">
                            <h5>Nima uchun Ezma?</h5>
                            <p>Ezma platformasi kitoblarni qidirish jarayonini osonlashtiradi va vaqtingizni tejaydi.</p>
                        </div>
                        <div className="question-wrapper">
                            <div className="questions">
                                <div className="text">
                                    <div className="question">
                                        <div className="question-bg">
                                            <img src="/icons/blue-search.svg" alt="Search icon" />
                                        </div>
                                    </div>
                                    <h5>Tezkor qidiruv</h5>
                                    <p>
                                        Qisqa vaqt ichida kerakli <br /> kitoblarni qidirib toping
                                    </p>
                                </div>
                            </div>

                            <div className="questions">
                                <div className="text">
                                    <div className="question">
                                        <div className="question-bg">
                                            <img src="/icons/library.svg" alt="Library icon" />
                                        </div>
                                    </div>
                                    <h5>Barcha kutubxonalar</h5>
                                    <p>
                                        O'zbekistondagi asosiy <br /> kutubxonalar bir tizimda
                                    </p>
                                </div>
                            </div>

                            <div className="questions">
                                <div className="text">
                                    <div className="question">
                                        <div className="question-bg">
                                            <img src="/icons/locatsiya.svg" alt="Time icon" />
                                        </div>
                                    </div>
                                    <h5>Qulay joylashuv</h5>
                                    <p>
                                        Eng yaqin kutubxonani xaritada <br /> ko'ring
                                    </p>
                                </div>
                            </div>

                            <div className="questions">
                                <div className="text">
                                    <div className="question">
                                        <div className="question-bg">
                                            <img src="/icons/data.svg" alt="Favorite icon" />
                                        </div>
                                    </div>
                                    <h5>Keng katalog</h5>
                                    <p>
                                        Minglab kitoblar haqida <br /> ma'lumot
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <AlotOfBook />
                    <Footer />
                </div>
            </div>

            <div className="home">
                {loading ? (
                    <div className="loading-wrapper">
                        <div className="ball-1"></div>
                        <div className="ball-2"></div>
                    </div>
                ) : data && (
                    <>
                        <div className="home-card">
                            <div className="card-image">
                                <img 
                                    src="https://source.unsplash.com/random/300x200?books" 
                                    alt="Total Books"
                                />
                            </div>
                            <h2>Jami Kitoblar</h2>
                            <p>
                                <strong><IoBookOutline /> Soni:</strong>
                                <span>{data.total_books}</span>
                            </p>
                        </div>

                        <div className="home-card">
                            <div className="card-image">
                                <img 
                                    src="https://source.unsplash.com/random/300x200?library" 
                                    alt="Total Libraries"
                                />
                            </div>
                            <h2>Jami Kutubxonalar</h2>
                            <p>
                                <strong><IoLibraryOutline /> Soni:</strong>
                                <span>{data.total_libraries}</span>
                            </p>
                        </div>

                        <div className="home-card">
                            <div className="card-image">
                                <img 
                                    src="https://source.unsplash.com/random/300x200?users" 
                                    alt="Total Users"
                                />
                            </div>
                            <h2>Jami Foydalanuvchilar</h2>
                            <p>
                                <strong><IoPersonOutline /> Soni:</strong>
                                <span>{data.total_users}</span>
                            </p>
                        </div>

                        <div className="home-card">
                            <div className="card-image">
                                <img 
                                    src="https://source.unsplash.com/random/300x200?activity" 
                                    alt="Recent Activity"
                                />
                            </div>
                            <h2>So'nggi Faoliyat</h2>
                            <p>
                                <strong><IoTimeOutline /> Vaqti:</strong>
                                <span>{data.recent_activity}</span>
                            </p>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Home;