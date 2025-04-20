import { useEffect, useState } from "react";
import Header from "../Header/header";
import Footer from "../Footer/footer";
import { Pagination } from 'antd';
import { IoBookOutline, IoLibraryOutline, IoPersonOutline } from "react-icons/io5";
import "../../styles/books.scss";

interface Book {
    id: number;
    library: number;
    name: string;
    author: string;
    publisher: string;
    quantity_in_library: number;
}

const Books = () => {
    const [allBooks, setAllBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    const getBooks = async () => {
        setLoading(true);
        try {
            const response = await fetch("https://s-libraries.uz/api/v1/books/books/");
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setAllBooks(data);
        } catch (error) {
            console.error("Error fetching books:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getBooks();
    }, []);

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentBooks = allBooks.slice(startIndex, endIndex);

    return (
        <>
            <Header />
            <div className="btns">
                <button onClick={() => window.location.href = "/oneaddbook"}>
                    + bittalab kitob qoshish
                </button>
            </div>
            <div className="btn">
                <button onClick={() => window.location.href = "/addbook"}>
                    + Kitoblar ro'yxati boyicha qo'shish
                    <div id="clip">
                        <div id="leftTop" className="corner"></div>
                        <div id="rightBottom" className="corner"></div>
                        <div id="rightTop" className="corner"></div>
                        <div id="leftBottom" className="corner"></div>
                    </div>
                    <span id="rightArrow" className="arrow"></span>
                    <span id="leftArrow" className="arrow"></span>
                </button>
            </div>

            <div className="books">
                {loading ? (
                    <div className="loading-wrapper">
                        <div className="ball-1"></div>
                        <div className="ball-2"></div>
                    </div>
                ) : (
                    currentBooks.map((book) => (
                        <div className="book" key={book.id}>
                            <div className="book-image">
                                <img
                                    src="/images/beatiful book.jpg"
                                    alt={book.name}
                                />
                            </div>
                            <h2>{book.name}</h2>
                            <p>
                                <strong><IoPersonOutline /> Muallif:</strong>
                                <span>{book.author}</span>
                            </p>
                            <p>
                                <strong><IoLibraryOutline /> Nashriyot:</strong>
                                <span>{book.publisher}</span>
                            </p>
                            <p>
                                <strong><IoBookOutline /> Soni:</strong>
                                <span>{book.quantity_in_library}</span>
                            </p>
                        </div>
                    ))
                )}
            </div>
            <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={allBooks.length}
                onChange={(page, pageSize) => {
                    setCurrentPage(page);
                    setPageSize(pageSize);
                }}
                style={{
                    margin: "20px auto",
                    textAlign: "center",
                    padding: "20px 0"
                }}
            />

            <Footer />
        </>
    );
};

export default Books;
