import dotenv from "dotenv";
type Environment = "development" | "production";

interface Config {
  PORT: number | string;
  DEVELOPMENT_MODE: Environment;
  CORS_ALLOW_ORIGINS: string[];
  ACCESS_TOKEN_KEY: string;
  ACCESS_TOKEN_KEY_TIME: string;
  CLERK_WEBHOOK_SECRET: string | null;
  CLERK_SECRET_KEY: string;
}

dotenv.config();

const config: Config = {
  PORT: process.env.PORT || 8001,
  DEVELOPMENT_MODE:
    (process.env.DEVELOPMENT_MODE as Environment) || "development",
  CORS_ALLOW_ORIGINS: process.env.ALLOW_ORIGINS_ACCESS
    ? JSON.parse(process.env.ALLOW_ORIGINS_ACCESS)
    : ["http://localhost:3000"],
  ACCESS_TOKEN_KEY: process.env.ACCESS_TOKEN_KEY || "something",
  ACCESS_TOKEN_KEY_TIME: process.env.ACCESS_TOKEN_KEY_TIME || "1D",
  CLERK_WEBHOOK_SECRET: process.env.CLERK_WEBHOOK_SECRET || null,
  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY || "",
};

export default config;
