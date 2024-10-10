import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function HomePage() {
    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div>
                <h1> Body </h1>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
}

export default HomePage;
