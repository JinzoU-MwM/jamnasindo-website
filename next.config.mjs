/** @type {import("next").NextConfig} */
const nextConfig = {
  // better-sqlite3 adalah native addon — jangan di-bundle/trace oleh Next,
  // load sebagai modul Node biasa agar tidak "Module did not self-register"
  // di route handler / server runtime.
  serverExternalPackages: ["better-sqlite3"],
};
export default nextConfig;
