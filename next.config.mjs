import withPWA from "next-pwa";

const config = {
  experimental: { appDir: true },
  reactStrictMode: true,
};

export default withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
})(config);