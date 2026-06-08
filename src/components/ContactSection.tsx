'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

const ContactFormSection = () => {
  const pathname = usePathname();

  if (pathname.startsWith('/san-pham')) {
    return null;
  }

  return (
    <section id="contact-section" className="py-8 md:py-12 bg-white flex justify-center items-center px-4 sm:px-6">
      <div
        className="w-full max-w-[1300px] rounded-[10px] shadow-xl text-white relative overflow-hidden px-4 sm:px-8 md:px-14 lg:px-[60px] py-8 md:py-10"
        style={{
          backgroundImage: 'linear-gradient(to bottom, rgb(99, 216, 89), rgb(2, 128, 70))'
        }}
      >
        <div
          className="absolute inset-0 z-0 pointer-events-none bg-no-repeat bg-cover opacity-[0.1]"
          style={{
            backgroundPosition: 'center',
            mixBlendMode: 'soft-light'
          }}
        ></div>

        <div className="relative z-10">
          {/* TIÊU ĐỀ - thêm tracking rộng hơn */}
          <div className="text-center mb-6">
            <h2
              className="font-black text-[16px] sm:text-[28px] md:text-[36px] mb-2 uppercase"
              style={{ fontFamily: 'Oswald, sans-serif', letterSpacing: '0.0005em' }}
            >
              Hân hạnh được hỗ trợ quý khách
            </h2>
            <p className="text-[13px] md:text-[16px] opacity-90 max-w-5xl mx-auto font-medium">
              Quý khách vui lòng điền thông tin bên dưới và gửi. Chúng tôi sẽ tiếp nhận và liên hệ lại trong thời gian sớm nhất.
            </p>
          </div>

          {/* FORM - gap nhỏ hơn */}
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
            <input
              type="text"
              placeholder="Họ và tên"
              className="w-full px-3 py-2 rounded-[4px] text-gray-700 bg-white outline-none text-[14px] placeholder:text-gray-700 shadow-sm"
            />

            <input
              type="text"
              placeholder="Điện thoại"
              className="w-full px-3 py-2 rounded-[4px] text-gray-700 bg-white outline-none text-[14px] placeholder:text-gray-700 shadow-sm"
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full px-3 py-2 rounded-[4px] text-gray-700 bg-white outline-none text-[14px] placeholder:text-gray-700 shadow-sm"
            />

            <input
              type="text"
              placeholder="Tiêu đề"
              className="w-full px-3 py-2 rounded-[4px] text-gray-700 bg-white outline-none text-[14px] placeholder:text-gray-700 shadow-sm"
            />

            <div className="md:col-span-2">
              <textarea
                placeholder="Nội dung"
                rows={3}
                className="w-full px-3 py-2 rounded-[4px] text-gray-700 bg-white outline-none text-[14px] placeholder:text-gray-700 shadow-sm"
              ></textarea>
            </div>

            <div className="md:col-span-2 flex justify-center mt-2">
              <button
                type="submit"
                className="text-white font-black py-3 px-6 rounded-[4px] shadow-lg transition-all duration-300 uppercase tracking-widest text-[15px]"
                style={{
                  background: "linear-gradient(90deg, rgb(216, 0, 0) 0%, rgb(245, 2, 0) 50%, rgb(187, 1, 0) 100%)"
                }}
              >
                Gửi
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;