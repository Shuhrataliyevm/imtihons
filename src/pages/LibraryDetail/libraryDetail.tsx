import Header from "../Header/header"
import Footer from "../Footer/footer"
import "../../styles/librarydetail.scss"
import { useEffect, useState } from "react"
import { IoLocationOutline, IoBookOutline, IoCheckmarkCircleOutline, IoCloseCircleOutline } from "react-icons/io5"
import { Pagination } from "antd"

interface Library {
    id: number;
    name: string;
    image: string | null;
    address: string;
    total_books: number;
    is_active: boolean;
}

const LibraryDetail = () => {
    const [libraries, setLibraries] = useState<Library[]>([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(6)

    const getLibraries = async () => {
        setLoading(true)
        try {
            const response = await fetch("https://s-libraries.uz/api/v1/libraries/libraries/")
            if (!response.ok) {
                throw new Error("Network response was not ok")
            }
            const data = await response.json()
            setLibraries(data)
        } catch (error) {
            console.error("Error fetching libraries:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getLibraries()
    }, [])

    const indexOfLast = currentPage * pageSize
    const indexOfFirst = indexOfLast - pageSize
    const currentLibraries = libraries.slice(indexOfFirst, indexOfLast)

    return (
        <div>
            <Header />
            <div className="libry">
            <h1>Kutubxonalar</h1>
            </div>
            <div className="books">
                {loading ? (
                    <div className="loading-wrapper">
                        <div className="ball-1"></div>
                        <div className="ball-2"></div>
                    </div>
                ) : (
                    currentLibraries.map((library) => (
                        <div className="book" key={library.id}>
                            <div className="book-image">
                                <img
                                    src={library.image || "/images/new book picturwes.jpg"}
                                    alt={library.name}
                                />
                            </div>
                            <h2>{library.name}</h2>
                            <p>
                                <strong><IoLocationOutline /> Manzil:</strong>
                                <span>{library.address}</span>
                            </p>
                            <p>
                                <strong><IoBookOutline /> Kitoblar soni:</strong>
                                <span>{library.total_books}</span>
                            </p>
                            <p>
                                <strong>{library.is_active ? <IoCheckmarkCircleOutline /> : <IoCloseCircleOutline />} Holati:</strong>
                                <span>{library.is_active ? "Faol" : "Faol emas"}</span>
                            </p>
                        </div>
                    ))
                )}
            </div>

            <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={libraries.length}
                onChange={(page, size) => {
                    setCurrentPage(page)
                    setPageSize(size)
                }}
                style={{
                    margin: "20px auto",
                    textAlign: "center",
                    padding: "20px 0",
                    position: "relative",
                    top: "20px",
                }}
            />

            <Footer />
        </div>
    )
}

export default LibraryDetail
