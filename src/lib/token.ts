import { message } from "antd";

export function getExpiryFromToken(token: string): Date {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return new Date(payload.exp * 1000);
  } catch (e) {
    message.error("Invalid token");
    throw e;
  }
}

export function getTimeoutFromToken(token: string): number {
  try {
    const expiry = getExpiryFromToken(token);
    return expiry.getTime() - Date.now();
  } catch (e) {
    message.error("Invalid token");
    throw e;
  }
}
