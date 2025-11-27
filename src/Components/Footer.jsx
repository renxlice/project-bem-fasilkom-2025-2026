import React from "react"

export default function Footer(){
    return(
<footer className="row row-cols-3 d-flex align-items-center  align-content-center justifty-content-center" id="contac">
    <div className="col d-flex align-items-center align-content-center justifty-content-center mt-4">
        <img srcSet="/logo_fasilkom.png" className="img-fluid" alt=""  width="25%" height="100vh"/>
        <div className="d-flex flex-column pt-3 ">
            <h5 className="text-white">BEM FASILKOM MERCU BUANA</h5>
            <p className="text-white"><i>NAWASENA</i></p>
        </div>
    </div>
    <div className="col ms-auto d-flex flex-column justify-content-center align-items-center align-content-center">
        <h5 className="text-white pt-4 mt-3">Contac Us</h5>
        <br></br>
        <div className="d-flex flex-row gap-4 social ">
            <a href="mailto:?subject=halooo%20bem%20fasilkom!"><i className="bi bi-envelope-at"></i></a>
            <a href="https://www.instagram.com/bemfasilkom.umb?igsh=MTN6N2N2ZWp3Ymc2bw=="><i className="bi bi-instagram"></i></a>
            <a href="https://www.linkedin.com/company/badan-eksekutif-mahasiswa-bem-fa/"><i className="bi bi-linkedin"></i></a>
            <a href="https://www.tiktok.com/@bemfasilkom.umb?_r=1&_t=ZS-91ctYXeIMar"><i className="bi bi-tiktok"></i></a>
        </div>
    </div>
    <div className="text-center copy text-white p-3 d-flex w-100 justify-content-center align-items-center">
        ©2024 Copyright.
        <a className="text-white" href="/"><i>BEM FASILKOM UMB NAWASENA</i></a>
    </div>
    <div className="text-center copy text-white mb-2 d-flex w-100 justify-content-center align-items-center">

    </div>
</footer>
    );
}