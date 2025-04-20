import { Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';
import About from './pages/About/about';
import Register from './pages/Register/register';
import Login from './pages/Login/login';
import Error from './pages/Error/error';
import Home from './pages/Home/home';
import LibraryProfile from './pages/LibraryProfile/libraryProfile';
import Footer from './pages/Footer/footer';
import Header from './pages/Header/header';
import AlotOfBook from './pages/AlotOfBook/alotofBook';
import LibraryDetail from './pages/LibraryDetail/libraryDetail';
import Books from './pages/Books/books';
import AddBook from './pages/AddBook/addbook';
import OneAddBook from'./pages/OneAddBook/oneaddbook'
import LibraryList from './pages/LibraryList/libraryList';
const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return <Navigate to="/login" />;
    }
    return <>{children}</>;
};


const App = () => {

    const content = (
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/about"
                    element={
                        <ProtectedRoute>
                            <About />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/librarydetail"
                    element={
                        <ProtectedRoute>
                            <LibraryDetail />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/librarylist"
                    element={
                        <ProtectedRoute>
                            <LibraryList />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/books"
                    element={
                        <ProtectedRoute>
                            <Books />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/addbook"
                    element={
                        <ProtectedRoute>
                            <AddBook />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/oneaddbook"
                    element={
                        <ProtectedRoute>
                            <OneAddBook />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/libraryprofile"
                    element={
                        <ProtectedRoute>
                            <LibraryProfile />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/alotofbook"
                    element={
                        <ProtectedRoute>
                            <AlotOfBook />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/footer"
                    element={
                        <ProtectedRoute>
                            <Footer />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/header"
                    element={
                        <ProtectedRoute>
                            <Header />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/error"
                    element={
                        <ProtectedRoute>
                            <Error />
                        </ProtectedRoute>
                    }
                />
                <Route path="*" element={<Navigate to="/error" />} />
            </Routes>
    );

    return content;
};

export default App;