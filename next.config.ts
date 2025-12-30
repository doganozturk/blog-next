const path = require("path");
const createMDX = require("@next/mdx");

/** @type {import('next').NextConfig} */
const nextConfig = {
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
  turbopack: {
    resolveAlias: {
      "~": path.resolve(__dirname, "src"),
      "@": path.resolve(__dirname, "src"),
      "@content": path.resolve(__dirname, "content"),
    },
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-frontmatter", "remark-mdx-frontmatter"],
    rehypePlugins: [
      [
        "rehype-pretty-code",
        {
          theme: "dark-plus",
          keepBackground: true,
        },
      ],
    ],
  },
});

module.exports = withMDX(nextConfig);
