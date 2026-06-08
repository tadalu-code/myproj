'use client';

import React from 'react';

const PartnerSection = () => {
  return (
    <section 
      className="relative w-full overflow-hidden flex items-center justify-center bg-[#dee2e6] py-12"
    >
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ 
          backgroundImage: `url('https://nongduocmiennam.vn/images/partner.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          mixBlendMode: 'multiply',
          opacity: 0.9,
        }}
      ></div>

      <div className="max-w-[1340px] mx-auto px-6 relative z-10 text-center">
        
        <h2 className="text-[#028046] font-bold text-[26px] sm:text-[44px] md:text-[50px] uppercase mb-[30px] font-oswald-force">
          Đối tác của chúng tôi
        </h2>

        <p className="text-[#212529] text-[16px] md:text-[18px] leading-[24px] max-w-4xl mx-auto font-normal">
          Chất lượng uy tín, hợp tác và gắn bó với các đối tác trong quá trình hoạt động kinh doanh.
        </p>

      </div>
    </section>
  );
};

export default PartnerSection;