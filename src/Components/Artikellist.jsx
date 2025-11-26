import React, { useState, useEffect, useRef } from "react";
import Dumyfoto from '/dumy1.jpg'; 
import Dumyfoto2 from '/dumy2.jpg'; 
import Dumyfoto3 from '/dumy3.jpg'; 
import Dumyfoto4 from '/dumy4.jpg'; 
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { createObserver } from "../Hooks/Script";

export default function Artikel() {
  const [perview, setPerview] = useState(4);
  const [swiperActive, setSwiperActive] = useState(false);
  const swiperElementRef = useRef(null);
  const swiperInstanceRef = useRef(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const handleResize = () => {
      if (mediaQuery.matches) {
        setPerview(1);
      } else {
        setPerview(4);
      }
    };

    handleResize();
    mediaQuery.addEventListener("change", handleResize);

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  useEffect(() => {
    const observerCallback = (isVisible) => {
      if (isVisible) {
        setSwiperActive(true);
        if (swiperInstanceRef.current) {
          swiperInstanceRef.current.slideTo(0, 0);
        }
      } else {
        setSwiperActive(false);
      }
    };

    const observer = createObserver(swiperElementRef.current, observerCallback);

    return () => {
      if (swiperElementRef.current) {
        observer.unobserve(swiperElementRef.current);
      }
    };
  }, []);

  return (
    <div className="artikel-list">
      <div ref={swiperElementRef}>
        <div className={swiperActive ? 'opacity-100' : 'opacity-0'}>
          
          <Swiper
            onSwiper={(swiper) => {
              swiperInstanceRef.current = swiper;
            }}
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={perview}
            coverflowEffect={{
              rotate: 10,
              stretch: 20,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={true}
            modules={[Autoplay, EffectCoverflow, Pagination]}
            className={`mySwiper ${swiperActive ? '' : 'hidden'}`}
          >
             <SwiperSlide>
          <div className="card">
            <img srcSet={Dumyfoto} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Menolak Lupa 8 mei 1993</h5>
              <p className="card-text">dr. Mun’im Idries melihat dua hasil visum yang dilakukan oleh Marsinah. Pada hasil visum kedua, 
                ditemukan bahwa terdapat tulang kemaluan kiri yang patah berkeping-keping.
                <b>“Melihat lubang kecil dengan kerusakan yang masif, apa kalau bukan luka tembak?" kata Mun’im Idries.....</b></p>
              <a href="#" className="btn ">Terus Membaca..</a>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="card">
            <img srcSet={Dumyfoto2} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Perempuan Melawan???</h5>
              <p className="card-text">suara perempuan semakin nyaring terdengar, menuntut penghapusan kekerasan berbasis gender, kesetaraan dalam dunia kerja, serta keterlibatan dalam pengambilan keputusan politik. Kini, di era digital, gerakan perempuan semakin masif dengan kampanye daring, diskusi publik, 
                hingga aksi turun ke jalan</p>
              <a href="#" className="btn ">Terus Membaca...</a>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="card">
            <img srcSet={Dumyfoto3} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Aksi Kamisan!</h5>
              <p className="card-text">
                ”Setiap ganti presiden selalu menjanjikan soal penegakan hak asasi manusia, soal penyelesaian kasus pelanggaran HAM berat. Tapi, kami tetap ada karena selalu dikhianati," ujar Suciwati.
               </p>
              <a href="#" className="btn ">Terus Membaca...</a>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="card">
            <img srcSet={Dumyfoto4} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Pendidikan Indonesia Tertinggal?</h5>
              <p className="card-text">Pendidikan di Indonesia masih tertinggal dibandingkan negara-negara lain di dunia. Hal ini tentu membuat banyak pihak khawatir terhadap masa depan generasi Indonesia. Mereka khawatir jika pendidikan kita terus tertinggal, maka generasi Indonesia akan tersingkir dari persaingan global.</p>
              <a href="#" className="btn ">Terus Membaca...</a>
            </div>
          </div>
        </SwiperSlide>
            <div className="swiper-pagination mt-12"></div>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
