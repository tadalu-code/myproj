'use client';

import { useState } from 'react';
import RegisterModal from './RegisterModal';

export default function RegisterSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const bgImage = 'https://nongduocmiennam.vn/images/types-of-training.png';

  return (
    <>
      <section
        className="w-full relative overflow-hidden flex items-center min-h-[300px]"
        style={{ padding: '48px 0' }}
      >

        {/* LỚP NỀN */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: '50% 50%'
          }}
        >
          <div className="absolute inset-0 bg-white/20"></div>
        </div>

        {/* NỘI DUNG CHÍNH */}
        <div className="max-w-[1340px] mx-auto relative z-10 w-full px-6">
          <div className="flex flex-col items-center text-center gap-16">

            <div className="max-w-4xl">
              <h2 className="text-[#028046] text-[26px] sm:text-[34px] md:text-[44px] font-bold uppercase font-oswald-force leading-tight tracking-normal ">
                CÁC SẢN PHẨM CỦA CHÚNG TÔI
              </h2>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  const section = document.getElementById('contact-section');
                  if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="relative text-white px-8 py-3 rounded-[8px] font-semibold text-[18px] shadow-lg active:scale-95 transition-all cursor-pointer"
                style={{
                  background: "linear-gradient(90deg, rgb(216, 0, 0) 0%, rgb(245, 2, 0) 50%, rgb(187, 1, 0) 100%)"
                }}
              >
                Đăng ký nhận tư vấn
              </button>
            </div>

          </div>
        </div>
      </section>

      <RegisterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}