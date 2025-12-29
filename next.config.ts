import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import path from "path";
import { fileURLToPath } from "url";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import rehypePrism from "rehype-prism-plus";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  serverExternalPackages: ["gray-matter"],
  typedRoutes: true,
  experimental: {
    optimizePackageImports: ["date-fns"],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "~": path.resolve(__dirname, "src"),
      "@": path.resolve(__dirname, "src"),
      "@content": path.resolve(__dirname, "content"),
    };
    return config;
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
    rehypePlugins: [[rehypePrism, { ignoreMissing: true }]],
  },
});

export default withMDX(nextConfig);
