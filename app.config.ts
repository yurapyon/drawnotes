import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
  server: {
    compatibilityDate: "2025-01-13",
  },
  vite: {
    ssr: { external: ["@prisma/client"] },
  },
});
