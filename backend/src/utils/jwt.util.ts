import jwt, { SignOptions } from "jsonwebtoken";
import config from "../configs/index.config";

interface TokenPayload {
  id: string;
}

interface VerifyTokenResult {
  success: boolean;
  id?: string;
  error?: any;
}

export const createAccessToken = async (userId: string): Promise<string> => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  const payload: TokenPayload = {
    id: userId,
  };

  const jwtConfig: SignOptions = {
    expiresIn: config.ACCESS_TOKEN_KEY_TIME as any,
  };

  return jwt.sign(payload, config.ACCESS_TOKEN_KEY, jwtConfig);
};

export const verifyAccessToken = async (
  token: string
): Promise<VerifyTokenResult> => {
  try {
    const decoded = jwt.verify(token, config.ACCESS_TOKEN_KEY) as TokenPayload;
    return {
      success: true,
      id: decoded.id,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};
