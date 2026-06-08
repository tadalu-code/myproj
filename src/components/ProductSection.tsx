import Link from "next/link";
import HomeSectionLayout from "./HomeSectionLayout";
import { getProductsList } from "@/services/api";

const parseImages = (urlStr: any) => {
  try {
    if (!urlStr) return [];
    if (Array.isArray(urlStr)) return urlStr;
    const cleanJson = urlStr.trim().replace(/^['"]|['"]$/g, '').replace(/\\"/g, '"');
    const parsed = JSON.parse(cleanJson);
    return Array.isArray(parsed) ? parsed : [parsed];
  } catch {
    const regex = /https?:\/\/[^"\\\s/]+[^"\\\s]+/g;
    return urlStr?.match(regex) || [];
  }
};

export default async function HomeProductSection() {
  const IMAGE_BASE = process.env.NEXT_PUBLIC_IMAGE_URL || "https://api.nongduocmiennam.vn:5056";
  const products = await getProductsList(1, 3);

  return (
    <HomeSectionLayout title="Sản phẩm" subTitle="Sản phẩm mới nhất" viewAllLink="/san-pham">
      {products && products.length > 0 ? (
        products.map((item: any) => {
          const imgs = parseImages(item.thumbnail || item.imagesUrl);
          let imageUrl = imgs[0] || "/no-image.jpg";
          if (imageUrl.startsWith('/')) imageUrl = `${IMAGE_BASE}${imageUrl}`;

          return (
            <Link href={`/san-pham/${item.slug}`} key={item.id} className="bg-white p-4 rounded-[6px] shadow border border-gray-100 flex flex-col items-center h-full hover:-translate-y-2 transition-transform duration-300 group">
              <div className="aspect-[4/3] md:aspect-square w-full mb-4 overflow-hidden rounded-[4px] flex items-center justify-center p-2 bg-gray-50">
                <img src={imageUrl} alt={item.name} className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500" />
              </div>
              <h4 className="font-bold text-[15px] text-[#333] leading-snug line-clamp-2 w-full text-left group-hover:text-[#007d3d] transition-colors mt-auto">
                {item.name}
              </h4>
            </Link>
          );
        })
      ) : (
        <div className="col-span-3 text-center py-10 text-gray-400 italic">Đang cập nhật sản phẩm...</div>
      )}
    </HomeSectionLayout>
  );
}