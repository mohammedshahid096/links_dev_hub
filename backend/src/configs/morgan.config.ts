import fs from "fs";
import path from "path";
import morgan from "morgan";

const morganFormat = {
  COMBINE: "combined",
  TINY: "tiny",
  DEV: "dev",
  SHORT: "short",
  COMMON: "common",
};

const morganConfigFunction = () => {
  const logsDir = path.join(__dirname, "../../logs");
  const logFile = path.join(logsDir, "app-http.log");

  // 1. Ensure logs directory exists
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
  }
  const morganFilePath = fs.createWriteStream(logFile, {
    flags: "a",
  });

  const morganConfig = morgan(morganFormat.COMBINE, { stream: morganFilePath });
  return morganConfig;
};

export default morganConfigFunction;
