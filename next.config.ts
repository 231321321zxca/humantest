/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // ← これを追加！(HTMLとして出力する設定)
  images: {
    unoptimized: true, // ← これも追加！(画像最適化を無効化しないとエラーになる)
  },
};

export default nextConfig;