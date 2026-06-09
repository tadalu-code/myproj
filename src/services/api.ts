const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.nongduocmiennam.vn:5056/api";

if (typeof window === 'undefined') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}
// ======================= GIAO DIỆN CHUNG =======================

// Lấy Menu điều hướng
export async function getNavigation() {
  try {
    const res = await fetch(`${BASE_URL}/navigation/public/shows`);
    const data = await res.json();
    return data?.data || [];
  } catch (error) {
    return [];
  }
}

// Lấy dữ liệu các khối trên Trang chủ 
export async function getHomePageSections() {
  try {
    const res = await fetch(`${BASE_URL}/page-section/public/shows?pageSlug=trang-chu`);
    const data = await res.json();
    return data?.data || [];
  } catch (error) {
    return [];
  }
}

// ======================= BÀI VIẾT =======================

// 1. Lấy bài viết cho Trang Chủ (limit 3)
export async function getPost() {
  try {
    const res = await fetch(`${BASE_URL}/post/public/shows?page=1&limit=3`, {
      headers: { "Accept": "application/json" },
      cache: "no-store"
    });
    const result = await res.json();
    if (result?.data?.posts && Array.isArray(result.data.posts)) {
      return result.data.posts;
    }
    return [];
  } catch (error) {
    return [];
  }
}

// 2. Lấy danh sách bài viết (Có trả về tổng số để làm phân trang)
export async function getArticlesList(page = 1, limit = 10) {
  try {
    const res = await fetch(`${BASE_URL}/post/public/shows?page=${page}&limit=${limit}`, {
      headers: { "Accept": "application/json" },
      cache: "no-store"
    });
    const result = await res.json();
    return {
      items: result?.data?.posts || result?.data?.data || [],
      total: result?.data?.totalItems || 0
    };
  } catch (error) {
    return { items: [], total: 0 };
  }
}

// 3. Lấy tất cả bài viết (Dùng cho trang danh sách /bai-viet)
export async function getAllPosts(page = 1, limit = 10) {
  try {
    const res = await fetch(`${BASE_URL}/post/public/shows?page=${page}&limit=${limit}`, { cache: "no-store" });
    const result = await res.json();
    return result?.data?.data || result?.data?.posts || result?.data || [];
  } catch (error) {
    return [];
  }
}

// 4. Lấy chi tiết bài viết (Có dự phòng)
export async function getPostDetail(slug: string) {
  try {
    const res = await fetch(`${BASE_URL}/post/public/show-by-slug/${encodeURIComponent(slug)}`, { cache: "no-store" });
    if (res.ok) {
      const result = await res.json();
      return result.data || result;
    }
    const res2 = await fetch(`${BASE_URL}/post/show/${encodeURIComponent(slug)}`, { cache: "no-store" });
    const result2 = await res2.json();
    return result2.data || result2;
  } catch (error) {
    return null;
  }
}

// 5. Lấy bài viết liên quan theo Topic
export async function getRelatedPosts(topicSlug: string) {
  try {
    const res = await fetch(`${BASE_URL}/post/public/shows?topicSlug=${topicSlug}&page=1&limit=5`, { cache: "no-store" });
    const result = await res.json();
    return result?.data?.posts || result?.data?.data || result?.data || [];
  } catch (error) {
    return [];
  }
}

// 6. Lấy bài viết theo danh mục (Topic)
export async function getPostsByTopic(topicSlug: string, page: number = 1, limit: number = 10) {
  try {
    const res = await fetch(`${BASE_URL}/post/public/shows?topicSlug=${topicSlug}&page=${page}&limit=${limit}`, { cache: 'no-store' });
    const result = await res.json();
    return result.data || { posts: [] }; 
  } catch (error) {
    return { posts: [] };
  }
}

// 7. Lấy bình luận bài viết
export async function getPostComments(postId: number | string) {
  try {
    const res = await fetch(`${BASE_URL}/comment/post/public/shows?ableId=${postId}`, { cache: 'no-store' });
    if (!res.ok) return [];
    const result = await res.json();
    return result?.data?.data || result?.data || [];
  } catch (error) {
    return [];
  }
}

// 8. Lấy danh sách Chuyên mục (Topics)
export async function getTopics() {
  try {
    const res = await fetch(`${BASE_URL}/topic/public/shows`, { cache: "no-store" });
    const result = await res.json();
    // Quét tìm mảng dữ liệu chuyên mục
    if (result?.data?.topics && Array.isArray(result.data.topics)) return result.data.topics;
    return result?.data || [];
  } catch (error) {
    return [];
  }
}

// ======================= SẢN PHẨM =======================

export async function getProducts(categorySlug?: string) {
  try {
    const isAll = !categorySlug || categorySlug === 'tat-ca';
    const url = isAll 
      ? `${BASE_URL}/product/public/shows?page=1&limit=32`
      : `${BASE_URL}/product/public/shows?categorySlugs=${categorySlug}&page=1&limit=32`;

    const res = await fetch(url, {
      method: 'GET',
      headers: { "Accept": "application/json" },
      cache: 'no-store' 
    });

    const result = await res.json();
    return result.data?.products || result.data?.data || [];
  } catch (error) {
    return [];
  }
}

export async function getProductsList(page = 1, limit = 32, categorySlug = "") {
  try {
    let url = `${BASE_URL}/product/public/shows?page=${page}&limit=${limit}`;
    if (categorySlug && categorySlug !== "tat-ca") {
      url += `&categorySlugs=${categorySlug}`;
    }

    const res = await fetch(url, {
      headers: { "Accept": "application/json" },
      cache: "no-store"
    });

    if (!res.ok) return [];

    const result = await res.json();

    if (result?.data?.products && Array.isArray(result.data.products)) return result.data.products;
    if (result?.data) {
      for (const key in result.data) {
        if (Array.isArray(result.data[key])) {
          return result.data[key];
        }
      }
    }
    return [];
  } catch (error) {
    return [];
  }
}

export async function getCategories() {
  try {
    const res = await fetch(`${BASE_URL}/category/public/shows`, {
      headers: { "Accept": "application/json" },
      cache: "no-store"
    });

    if (!res.ok) return [];
    const result = await res.json();

    if (result?.data?.categories && Array.isArray(result.data.categories)) return result.data.categories;
    if (result?.data?.items && Array.isArray(result.data.items)) return result.data.items;
    if (result?.data && Array.isArray(result.data)) return result.data;
    if (Array.isArray(result)) return result;

    return [];
  } catch (error) {
    return [];
  }
}

// export async function getProductDetail(slug: string) {
//   try {
//     const res = await fetch(`${BASE_URL}/product/public/show-by-slug/${slug}`, {
//       cache: 'no-store'
//     });

//     if (!res.ok) return null;
//     const result = await res.json();
//     return result.data || result; 
//   } catch (error) {
//     return null;
//   }
// }
export async function getAllProducts() {
  try {
    const res = await fetch(`${BASE_URL}/products`, { cache: 'no-store' });
    if (!res.ok) return [];
    const result = await res.json();
    return result.data || result; // Tùy vào cấu trúc JSON của API bạn trả về
  } catch (error) {
    console.error("Lỗi fetch toàn bộ sản phẩm:", error);
    return [];
  }
}

// 2. Hàm lấy sản phẩm theo danh mục (Dùng cho trang /san-pham/[category])
export async function getProductsByCategory(categorySlug: string) {
  try {
    // API của bạn có thể nhận param ?category= hoặc tương tự
    const res = await fetch(`${BASE_URL}/products?category=${categorySlug}`, { cache: 'no-store' });
    if (!res.ok) return [];
    const result = await res.json();
    return result.data || result;
  } catch (error) {
    console.error(`Lỗi fetch sản phẩm theo danh mục ${categorySlug}:`, error);
    return [];
  }
}

// 3. Hàm lấy chi tiết một sản phẩm (Dùng cho trang /san-pham/[category]/[slug])
export async function getProductDetail(slug: string) {
  try {
    const res = await fetch(`${BASE_URL}/product/public/show-by-slug/${slug}`, {
      cache: 'no-store'
    });
    if (!res.ok) return null;
    const result = await res.json();
    return result.data || null;
  } catch (error) {
    console.error("Lỗi fetch chi tiết:", error);
    return null;
  }
}