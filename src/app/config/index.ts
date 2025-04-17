import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join((process.cwd(), ".env")) });

export default {
  app_name: process.env.APP_NAME,
  NODE_ENV: process.env.NODE_ENV!,
  port: process.env.PORT!,
  db_url: process.env.DATABASE_URL!,

  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS!,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET!,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN!,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET!,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN!,
  jwt_otp_secret: process.env.JWT_OTP_SECRET!,
  jwt_pass_reset_secret: process.env.JWT_PASS_RESET_SECRET!,
  jwt_pass_reset_expires_in: process.env.JWT_PASS_RESET_EXPIRES_IN!,
};
