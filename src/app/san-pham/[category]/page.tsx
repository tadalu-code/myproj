import ProductList from "@/components/ProductList";
import { getCategories } from "@/services/api";
import type { Metadata } from "next";

// Map slug → tên hiển thị (fallback nếu API không trả về)
const CATEGORY_NAMES: Record<string, string> = {
  "tat-ca": "Tất cả sản phẩm",
  "thuoc-tru-co-dai": "Thuốc trừ cỏ dại",
  "thuoc-tru-benh-hai-cay-trong": "Thuốc trừ bệnh hại cây trồng",
  "thuoc-tru-sau": "Thuốc trừ sâu",
  "phan-bon": "Phân bón",
};

async function getCategoryName(slug: string): Promise<string> {
  // Thử lấy từ map cứng trước
  if (CATEGORY_NAMES[slug]) return CATEGORY_NAMES[slug];
  // Nếu không có thì gọi API
  try {
    const categories = await getCategories();
    const found = categories.find(
      (c: any) => c.slug === slug || c.categorySlug === slug
    );
    if (found?.name) return found.name;
  } catch {
    // Không làm gì
  }
  // Fallback: đổi slug thành chữ thường có dấu cách
  return slug.replace(/-/g, " ");
}

// ─── SEO: generateMetadata ────────────────────────────────────────────────────
export async function generateMetadata(
  { params }: { params: Promise<{ category: string }> }
): Promise<Metadata> {
  const { category } = await params;
  const categoryName = await getCategoryName(category);

  const title = `${categoryName} | Nông Dược Miền Nam`;
  const description = `Xem danh sách ${categoryName.toLowerCase()} chất lượng cao của Công ty TNHH Nông Dược Miền Nam — chuyên cung cấp thuốc bảo vệ thực vật trên toàn quốc.`;
  const canonicalUrl = `https://nongduocmiennam.vn/san-pham/${category}`;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Nông Dược Miền Nam",
      locale: "vi_VN",
      type: "website",
      images: [
        {
          url: "https://nongduocmiennam.vn/logo512.png",
          width: 512,
          height: 512,
          alt: categoryName,
        },
      ],
    },
  };
}
// ─────────────────────────────────────────────────────────────────────────────

// ─── Sửa bug: đọc đúng `category` từ params thay vì hardcode "tat-ca" ────────
export default async function SanPhamDanhMuc({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  return <ProductList activeCat={category} />;
}