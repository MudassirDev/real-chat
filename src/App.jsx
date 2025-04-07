import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";

import { BrowserRouter, Routes, Route } from "react-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";
import { useEffect, useState } from "react";
import Loader from "./components/Loader";
import Chat from "./components/Chat";

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user ?? null);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) return <Loader />;

    return (
        <BrowserRouter>
            <Header user={user} setUser={setUser} />
            <Routes>
                <Route
                    index
                    element={
                        <PrivateRoute user={user} loading={loading}>
                            <Home user={user} />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/chat"
                    element={
                        <PrivateRoute user={user} loading={loading}>
                            <Chat user={user} />
                        </PrivateRoute>
                    }
                />
                <Route path="login" element={<Login setUser={setUser} />} />
                <Route path="register" element={<Register setUser={setUser} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
