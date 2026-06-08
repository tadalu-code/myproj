'use client';

import { useState, useEffect } from 'react';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export default function RegisterModal({ isOpen, onClose, title = "HÂN HẠNH ĐƯỢC HỖ TRỢ QUÝ KHÁCH" }: RegisterModalProps) {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', subject: '', message: '' });
  const [isClosing, setIsClosing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsClosing(false);
      document.body.style.overflow = 'hidden';
    }
  }, [isOpen]);

  // Hàm đóng có animation ngược
  const handleClose = () => {
    setIsClosing(true);
    document.body.style.overflow = 'unset';
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
      onClose();
    }, 450);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleClose();
    setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">

      {/* LỚP NỀN */}
      <div
        className="absolute inset-0 bg-black/70"
        style={{
          animation: isClosing
            ? 'fadeOut 0.45s ease-in forwards'
            : 'fadeIn 0.4s ease-out forwards'
        }}
        onClick={handleClose}
      ></div>

      {/* NỘI DUNG MODAL */}
      <div
        className="w-full max-w-[1000px] rounded-[10px] shadow-2xl relative z-10"
        style={{
          backgroundImage: "linear-gradient(to bottom, rgb(105, 222, 95), rgb(2, 140, 75))",
          animation: isClosing
            ? 'modalClose 0.45s cubic-bezier(0.36, 0, 0.66, -0.56) forwards'
            : 'modalOpen 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards'
        }}
      >
        {/* Nút đóng */}
        <button
          onClick={handleClose}
          className="absolute -top-4 -right-4 z-20 w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-500 hover:text-gray-800 transition-all hover:scale-110 shadow-md border border-gray-100"
        >
          <span className="text-[20px] leading-none mb-[2px]">×</span>
        </button>

        <div className="px-4 sm:px-8 md:px-12 lg:px-[50px] py-12 md:py-15 text-white">

          {/* TIÊU ĐỀ */}
          <div className="text-center mb-6">
            <h2
              className="font-black text-[16px] sm:text-[24px] md:text-[36px] mb-2 uppercase"
              style={{ fontFamily: 'Oswald, sans-serif', letterSpacing: '0.0005em' }}
            >
              {title}
            </h2>
            <p className="text-[13px] md:text-[14px] opacity-95 max-w-5xl mx-auto font-medium">
              Quý khách vui lòng điền thông tin bên dưới và gửi. Chúng tôi sẽ tiếp nhận và liên hệ lại trong thời gian sớm nhất.
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              type="text"
              name="name"
              placeholder="Họ và tên"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2.5 rounded-[4px] text-gray-700 bg-white outline-none text-[14px] placeholder:text-gray-700 shadow-sm"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Điện thoại"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-3 py-2.5 rounded-[4px] text-gray-700 bg-white outline-none text-[14px] placeholder:text-gray-700 shadow-sm"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2.5 rounded-[4px] text-gray-700 bg-white outline-none text-[14px] placeholder:text-gray-700 shadow-sm"
              required
            />
            <input
              type="text"
              name="subject"
              placeholder="Tiêu đề"
              value={formData.subject}
              onChange={handleInputChange}
              className="w-full px-3 py-2.5 rounded-[4px] text-gray-700 bg-white outline-none text-[14px] placeholder:text-gray-700 shadow-sm"
              required
            />
            <div className="md:col-span-2">
              <textarea
                name="message"
                placeholder="Nội dung"
                rows={2}
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-3 py-2.5 rounded-[4px] text-gray-700 bg-white outline-none text-[14px] placeholder:text-gray-700 shadow-sm"
              />
            </div>

            <div className="md:col-span-2 flex justify-center mt-3">
              <button
                type="submit"
                className="text-white font-black py-2.5 px-8 rounded-[4px] shadow-lg transition-all duration-300 uppercase tracking-widest text-[14px] hover:brightness-110 active:scale-95"
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

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        @keyframes modalOpen {
          0% { opacity: 0; transform: scale(0.8) translateY(40px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes modalClose {
          0% { opacity: 1; transform: scale(1) translateY(0); }
          100% { opacity: 0; transform: scale(0.8) translateY(40px); }
        }
      `}</style>
    </div>
  );
}