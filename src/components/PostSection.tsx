import Link from "next/link";
import HomeSectionLayout from "./HomeSectionLayout";
import { getPost } from "@/services/api";

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

export default async function PostSection() {
  const posts = await getPost();

  return (
    <HomeSectionLayout title="Tin tức & Sự kiện" subTitle="Tin tức mới nhất" viewAllLink="/bai-viet">
      {posts && posts.length > 0 ? (
        posts.map((news: any) => {
          const imgs = parseImages(news.thumbnail || news.imagesUrl || news.avatar || news.image);
          const topicSlug = news.topic?.slug || news.category_slug || "tin-tuc";
          const cleanDesc = (news.description || news.short_description || news.summary || "").replace(/<[^>]+>/g, '').substring(0, 110) + "...";

          return (
            <Link href={`/bai-viet/${topicSlug}/${news.slug}`} key={news.id} className="bg-white p-4 rounded-[6px] shadow border border-gray-100 flex flex-col h-full hover:-translate-y-2 transition-transform duration-300 group">
              <div className="aspect-[4/3] w-full mb-4 overflow-hidden rounded-[4px] bg-gray-50">
                <img src={imgs[0] || "https://nongduocmiennam.vn/images/default-thumbnail.jpg"} alt={news.title || news.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <h4 className="font-bold text-[15px] text-[#333] mb-2 leading-snug line-clamp-2 group-hover:text-[#007d3d] transition-colors">
                {news.title || news.name}
              </h4>
              <p className="text-[13px] text-gray-600 line-clamp-2 mt-auto leading-relaxed">{cleanDesc}</p>
            </Link>
          );
        })
      ) : (
        <div className="col-span-3 text-center py-10 text-gray-400 italic">Đang cập nhật bài viết...</div>
      )}
    </HomeSectionLayout>
  );
}