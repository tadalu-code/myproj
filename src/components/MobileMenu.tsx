"use client";

import { useState } from "react";
import Link from "next/link";
import { X, ChevronDown } from "lucide-react";

export default function MobileMenu({ navItems }: { navItems: any[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  const toggleSubMenu = (id: string) => {
    setOpenSubMenu(openSubMenu === id ? null : id);
  };

  return (
    <>
      {/* NÚT 3 GẠCH */}
      <button onClick={() => setIsOpen(true)} className="outline-none">
        <img
          src="https://nongduocmiennam.vn/images/icons/icons8-menu-50.png"
          alt="Menu"
          className="w-[32px] h-[32px] object-contain"
        />
      </button>

      {/* BACKDROP */}
      <div
        className={`fixed inset-0 bg-black/60 z-[99998] transition-opacity duration-500 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* SIDEBAR */}
      <aside
        className="fixed top-0 left-0 h-full bg-white z-[99999] shadow-2xl transition-transform duration-[600ms] ease-in-out flex flex-col"
        style={{
          width: "min(80vw, 290px)",
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        {/* Header: Logo + nút X */}
        <div className="px-5 py-4 flex justify-between items-center bg-white border-b border-gray-200">
          <img
            src="https://nongduocmiennam.vn/logo512.png"
            alt="Logo"
            className="h-[60px] w-auto"
          />
          {/* Nút X đơn giản, không viền */}
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-800 transition-colors"
          >
            <X size={22} strokeWidth={1.5} />
          </button>
        </div>

        {/* Danh sách menu — BỎ TRANG CHỦ cứng */}
        <div className="flex-1 overflow-y-auto">
          <ul className="flex flex-col">
            {navItems.map((item) => {
              const hasChildren = item.children && item.children.length > 0;
              const isSubOpen = openSubMenu === item.id;

              return (
                <li key={item.id} className="border-b border-gray-200 flex flex-col">
                  <div className="flex items-center justify-between">
                    <Link
                      href={
                        item.title.toLowerCase() === "sản phẩm"
                          ? "/san-pham"
                          : item.url || "#"
                      }
                      onClick={() => !hasChildren && setIsOpen(false)}
                      className="flex-1 px-5 py-3 text-[#028046] font-bold uppercase text-[13px] tracking-wide"
                    >
                      {item.title}
                    </Link>

                    {hasChildren && (
                      <button
                        onClick={() => toggleSubMenu(item.id)}
                        className="px-4 py-3 text-[#028046]"
                      >
                        <ChevronDown
                          size={16}
                          className={`transition-transform duration-300 ${
                            isSubOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  {/* Dropdown menu con */}
                  {hasChildren && (
                    <div
                      className={`overflow-hidden transition-all duration-300 bg-gray-50 ${
                        isSubOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <ul className="flex flex-col border-t border-gray-200">
                        {item.children.map((child: any) => (
                          <li key={child.id} className="border-b border-gray-100 last:border-0">
                            <Link
                              href={child.url || "#"}
                              onClick={() => setIsOpen(false)}
                              className="block pl-8 pr-5 py-2.5 text-[13px] text-gray-600 font-medium hover:text-[#028046]"
                            >
                              {child.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </>
  );
}