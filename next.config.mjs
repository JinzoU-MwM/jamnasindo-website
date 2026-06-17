/** @type {import("next").NextConfig} */
const nextConfig = {
  // Native addons — jangan di-bundle/trace oleh Next, load sebagai modul Node
  // biasa agar tidak "Module did not self-register" di route handler / runtime.
  serverExternalPackages: ["better-sqlite3", "sharp"],
};
export default nextConfig;
