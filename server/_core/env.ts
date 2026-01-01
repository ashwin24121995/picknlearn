// Lazy-loaded environment variables to avoid build-time evaluation
// This ensures Railway build doesn't fail looking for secrets during build phase

function getEnv(key: string, defaultValue: string = ""): string {
  return process.env[key] ?? defaultValue;
}

export const ENV = {
  get appId() {
    return getEnv("VITE_APP_ID");
  },
  get cookieSecret() {
    return getEnv("JWT_SECRET");
  },
  get databaseUrl() {
    return getEnv("DATABASE_URL");
  },
  get isProduction() {
    return process.env.NODE_ENV === "production";
  },
  get forgeApiUrl() {
    return getEnv("BUILT_IN_FORGE_API_URL");
  },
  get forgeApiKey() {
    return getEnv("BUILT_IN_FORGE_API_KEY");
  },
};
