import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter, Routes, Route, Link } from "react-router";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./config/firebase";
import { useEffect, useState } from "react";
import Header from "./components/Header";


function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                console.log("user is logged in")
                setUser(user);
            } else {
                console.log("user is not logged in")
            }
        })
    }, [])

    return (
        <>
            <BrowserRouter>
                <Header user={user} setUser={setUser} />
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="login" element={<Login setUser={setUser} />} />
                    <Route path="register" element={<Register />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
