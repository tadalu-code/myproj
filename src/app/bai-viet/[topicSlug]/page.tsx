import { getPostsByTopic } from "@/services/api";
import Link from "next/link";
import { Home } from "lucide-react";
import { getBreadcrumbInfo } from "@/utils/breadcrumb";
import type { Metadata } from "next";

// ─── SEO: generateMetadata ────────────────────────────────────────────────────
export async function generateMetadata(
  { params }: { params: Promise<{ topicSlug: string }> }
): Promise<Metadata> {
  const { topicSlug } = await params;
  const breadcrumb = getBreadcrumbInfo(topicSlug);
  const topicName = breadcrumb.currentName;

  const title = `${topicName} | Nông Dược Miền Nam`;
  const description = `Tổng hợp bài viết về ${topicName.toLowerCase()} — kiến thức chuyên sâu về bảo vệ thực vật, phòng trừ dịch hại từ Nông Dược Miền Nam.`;
  const canonicalUrl = `https://nongduocmiennam.vn/bai-viet/${topicSlug}`;

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
          alt: topicName,
        },
      ],
    },
  };
}
// ─────────────────────────────────────────────────────────────────────────────

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

export default async function DiseaseCategoryPage({ params }: { params: Promise<{ topicSlug: string }> }) {
  const { topicSlug } = await params;
  const breadcrumb = getBreadcrumbInfo(topicSlug);

  const data = await getPostsByTopic(topicSlug, 1, 10);
  const articles = data?.posts || data?.data?.posts || [];
  const relatedPosts = articles.slice(0, 5);

  return (
    <div className="bg-[#f4f4f4] min-h-screen text-gray-800 font-sans">
      {/* BREADCRUMB */}
      <div className="max-w-[1340px] mx-auto px-4 py-4">
        <nav className="flex items-center gap-1 md:gap-2 text-[12px] md:text-[14px] overflow-hidden">
          <Link href="/" className="flex items-center gap-1 hover:underline text-[#028046] whitespace-nowrap shrink-0">
            <Home size={14} /> Trang chủ
          </Link>
          <span className="text-gray-300 shrink-0">/</span>
          {breadcrumb.parentName && (
            <>
              <Link href={breadcrumb.parentLink!} className="hover:underline text-[#028046] whitespace-nowrap shrink-0 hidden sm:block">
                {breadcrumb.parentName}
              </Link>
              <span className="text-gray-300 shrink-0 hidden sm:block">/</span>
            </>
          )}
          <span className="font-bold text-[#028046] truncate min-w-0">{breadcrumb.currentName}</span>
        </nav>
      </div>

      {/* MAIN CONTENT */}
      <main className="max-w-[1340px] mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">

          {/* DANH SÁCH BÀI VIẾT */}
          <div className="md:col-span-9 min-w-0">
            {articles.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-500 text-[16px] font-medium">Không có dữ liệu bài viết</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {articles.map((item: any) => {
                  const imgs = parseImages(item.thumbnail || item.imagesUrl);
                  return (
                    <Link
                      key={item.id}
                      href={`/bai-viet/${topicSlug}/${item.slug}`}
                      className="group block bg-white rounded-[4px] shadow-sm hover:shadow-lg transition-shadow overflow-hidden"
                    >
                      <div className="aspect-[16/9] overflow-hidden bg-gray-100">
                        <img
                          src={imgs[0] || "https://placehold.co/600x400"}
                          alt={item.title || item.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-[#007d3d] font-bold text-[17px] leading-snug mb-1.5 line-clamp-2 group-hover:underline">
                          {item.title || item.name}
                        </h3>
                        <p className="text-[#333] text-[14px] leading-relaxed line-clamp-3">
                          {item.short_description || item.description || "Nhấn để xem chi tiết bài viết..."}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* SIDEBAR */}
          <aside className="md:col-span-3 sticky min-w-0 top-24">
            <div className="bg-white rounded-[4px] shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-white px-4 py-3 border-b border-gray-200">
                <h4 className="text-[#007d3d] font-bold text-[15px]">Bài viết liên quan</h4>
              </div>
              <div className="p-2 space-y-1">
                {relatedPosts.map((related: any) => {
                  const rImgs = parseImages(related.thumbnail || related.imagesUrl);
                  return (
                    <Link key={related.id} href={`/bai-viet/${topicSlug}/${related.slug}`} className="flex flex-col gap-1.5 p-1.5 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-all group">
                      <div className="w-full aspect-video rounded overflow-hidden shadow-sm">
                        <img src={rImgs[0] || "https://placehold.co/600x400"} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" alt={related.title || related.name} />
                      </div>
                      <h5 className="text-[14px] font-medium text-[#333] leading-snug group-hover:text-[#007d3d] transition-colors line-clamp-2">{related.title || related.name}</h5>
                    </Link>
                  );
                })}
              </div>
            </div>
          </aside>

        </div>
      </main>
    </div>
  );
}