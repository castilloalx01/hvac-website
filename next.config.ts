import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    cacheComponents: true,
    // Lets phones on the local Wi-Fi load dev assets when opening http://<this PC's IP>:3000 (dev server only).
    // One entry per Wi-Fi network used for testing.
    allowedDevOrigins: ["10.0.0.*", "172.25.195.*"],
    partialPrefetching: true,
    turbopack: {
        rules: {
            "*.css": {
                loaders: ["@tailwindcss/turbopack"],
                as: "*.css",
            },
        },
    },
};

export default nextConfig;
