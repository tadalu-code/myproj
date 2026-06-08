'use client';

import React from 'react';
import { COMPANY_NAME, COMPANY_DESCRIPTION } from '@/constants/site';

export default function AboutSection() {
  return (
    <section className="relative w-full py-8 md:py-12 bg-white overflow-hidden font-sans">
      
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src="https://nongduocmiennam.vn/images/Section02-01-8.png" 
          alt="Building Background"
          className="w-full h-full object-cover opacity-100"
        />
      </div>
      
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start relative z-10">
        
        {/* CỘT TRÁI: VIDEO */}
        <div className="w-full aspect-[16/10] bg-[#e2e4e9] rounded-sm shadow-inner border border-gray-100">
        </div>

        {/* CỘT PHẢI: NỘI DUNG */}
        <div className="flex flex-col justify-start">
          
          <h2 className="text-[26px] sm:text-[32px] md:text-[44px] font-bold text-[#028046] uppercase mb-[20px] sm:mb-[24px] font-oswald-force leading-[1.1] tracking-tight">
            {COMPANY_NAME}
          </h2>
          
          <p className="text-[15px] sm:text-[17px] md:text-[19px] text-[#028046] italic font-bold mb-6 sm:mb-8 leading-[1.6]">
            {COMPANY_DESCRIPTION}
          </p>

          {/* KHUNG TRANG TRÍ — I */}
          <div className="relative w-full min-h-[30px] rounded-[5px] border border-[#004a28] p-[10px] mb-[30px]">
            <span className="absolute -bottom-[12px] left-[20px] bg-white px-2 text-[#007a48] font-bold text-[14px] sm:text-[16px]">
              {COMPANY_NAME}
            </span>
          </div>
          
        </div>

      </div>
    </section>
  );
}