import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import '../Styles/style.css'

export default function MainLayout({children}){
    return(
    <>
<Navbar/>
<div className="main">
    {children}
</div>
<Footer/>
</>
    );
}