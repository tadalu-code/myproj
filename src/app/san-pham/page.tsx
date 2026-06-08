import ProductList from "@/components/ProductList";
import type { Metadata } from "next";

// ─── SEO: Metadata tĩnh cho trang Sản phẩm ───────────────────────────────────
export const metadata: Metadata = {
  title: "Sản phẩm | Nông Dược Miền Nam",
  description:
    "Danh mục sản phẩm thuốc bảo vệ thực vật, phân bón, thuốc trừ sâu, thuốc trừ bệnh, thuốc trừ cỏ của Công ty TNHH Nông Dược Miền Nam.",
  alternates: { canonical: "https://nongduocmiennam.vn/san-pham" },
  openGraph: {
    title: "Sản phẩm | Nông Dược Miền Nam",
    description:
      "Danh mục sản phẩm thuốc bảo vệ thực vật, phân bón, thuốc trừ sâu, thuốc trừ bệnh, thuốc trừ cỏ của Công ty TNHH Nông Dược Miền Nam.",
    url: "https://nongduocmiennam.vn/san-pham",
    siteName: "Nông Dược Miền Nam",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: "https://nongduocmiennam.vn/logo512.png",
        width: 512,
        height: 512,
        alt: "Sản phẩm Nông Dược Miền Nam",
      },
    ],
  },
};
// ─────────────────────────────────────────────────────────────────────────────

export default function SanPhamTatCa() {
  // Dùng "tat-ca" để API lấy toàn bộ sản phẩm [cite: 105]
  return <ProductList activeCat="tat-ca" />;
}


// import { getProducts, getNavigation } from "@/services/api";
// import Link from "next/link";

// export default async function SanPhamPage({ 
//   params 
// }: { 
//   params: Promise<{ category?: string[] }> 
// }) {
//   // 1. Xử lý Params (Next.js 15)
//   const resolvedParams = await params;
//   const activeCat = resolvedParams.category?.[0] || "tat-ca";

//   // 2. Lấy dữ liệu
//   const [products, navData] = await Promise.all([
//     getProducts(activeCat),
//     getNavigation()
//   ]);

//   const filterCategories = [
//     { title: "Tất cả", slug: "tat-ca" },
//     { title: "Thuốc trừ cỏ dại", slug: "thuoc-tru-co-dai" },
//     { title: "Thuốc trừ bệnh hại cây trồng", slug: "thuoc-tru-benh-hai-cay-trong" },
//     { title: "Thuốc trừ sâu", slug: "thuoc-tru-sau" },
//     { title: "Phân bón", slug: "phan-bon" },
//   ];

//   return (
//     <div className="bg-[#f4f4f4] min-h-screen flex flex-col font-sans text-gray-800">

//       {/* CHỈNH LỀ: max-w-[1340px] và px-6 để khít tuyệt đối với Header */}
//       <main className="flex-grow max-w-[1340px] mx-auto px-6 py-8 w-full">

//         {/* THANH TÌM KIẾM */}
//         <div className="max-w-xl mx-auto mb-10 relative">
//           <input 
//             type="text" 
//             placeholder="Tìm kiếm sản phẩm..." 
//             className="w-full border border-gray-200 rounded-full py-2.5 px-6 pr-12 outline-none focus:border-[#00a651] transition-all text-[14px] shadow-sm bg-[#fcfcfc]"
//           />
//           <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#00a651]">
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//             </svg>
//           </button>
//         </div>

//         {/* BỘ LỌC DANH MỤC */}
//         <div className="flex flex-wrap justify-start gap-2 mb-10">
//           {filterCategories.map((cat) => {
//             const isActive = activeCat === cat.slug;
//             return (
//               <Link
//                 key={cat.slug}
//                 href={cat.slug === "tat-ca" ? "/san-pham" : `/san-pham/${cat.slug}`}
//                 className={`px-6 py-2 rounded-full text-[13px] font-bold transition-all border ${
//                   isActive
//                     ? "bg-[#007bff] text-white border-[#007bff] shadow-md" 
//                     : "bg-[#f2f2f2] text-gray-600 border-transparent hover:bg-gray-200"
//                 }`}
//               >
//                 {cat.title}
//               </Link>
//             );
//           })}
//         </div>

//         {/* LƯỚI SẢN PHẨM: 5 cột trên màn hình lớn để trông chuyên nghiệp hơn */}
//         {products && products.length > 0 ? (
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
//             {products.map((product: any) => (
//               <Link 
//                 href={`/san-pham/chi-tiet/${product.slug || product.id}`} 
//                 key={product.id}
//                 // Thêm "group" để kích hoạt hover cho các thành phần bên trong
//                 className="group bg-white rounded-xl border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-[#00a651]/30 flex flex-col overflow-hidden p-2"
//               >
//                 {/* Khu vực ảnh */}
//                 <div className="relative aspect-square w-full bg-white flex items-center justify-center p-4 overflow-hidden">
//                   <img 
//                     src={product.imagesUrl?.[0] || "https://placehold.co/400x400?text=Sản+Phẩm"} 
//                     alt={product.name} 
//                     className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-110"
//                   />
//                 </div>

//                 {/* Khu vực thông tin */}
//                 <div className="p-3 pt-2 flex flex-col flex-grow text-center">
//                   <h3 className="text-gray-800 text-[14px] font-bold line-clamp-2 min-h-[40px] mb-4 group-hover:text-[#00a651] transition-colors duration-300">
//                     {product.name}
//                   </h3>
                  
//                   <div className="mt-auto">
//                     {/* Nút Liên hệ tự đổi màu khi rê chuột vào Card */}
//                     <div className="w-full py-2.5 bg-[#007bff] text-white font-black text-center rounded-lg text-[12px] group-hover:bg-[#0056b3] transition-all duration-300 uppercase tracking-wider">
//                       Liên hệ
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-32 text-gray-400 text-[15px] border-2 border-dashed border-gray-100 rounded-2xl">
//             Hiện chưa có sản phẩm nào trong danh mục này.
//           </div>
//         )}
//       </main>

  
//     </div>
//   );
// }