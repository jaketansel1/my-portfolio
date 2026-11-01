import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The contact page became a global panel; old links open it on the homepage.
  async redirects() {
    return [{ source: "/contact", destination: "/?contact", permanent: false }];
  },
};

export default nextConfig;
