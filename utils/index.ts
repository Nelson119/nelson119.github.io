/**
 * 解析 URL，使用 import 動態載入 assets 目錄的資源，並回傳一個響應式物件
 * @param url - 相對路徑，例如 '/images/home/people1.png' 或 '~/public/images/home/people1.png'
 * @returns 一個響應式物件，包含 url 屬性，表示完整的 URL 路徑
 */
export const resolveUrl = (url: string) => {
  return new URL(url).href; // 回傳響應式物件
};
