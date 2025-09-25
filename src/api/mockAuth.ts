export type VerifyResponse = { success: boolean; message: string };
export type LoginResponse = {
  success: boolean;
  requires2FA: boolean;
  message: string;
};

export async function mockLogin(
  email: string,
  password: string
): Promise<LoginResponse> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (navigator.onLine === false) {
        reject(new Error("Network error"));
        return;
      }

      if (email === "user@test.com" && password === "password123") {
        resolve({
          success: true,
          requires2FA: true,
          message: "Login successful. Please verify 2FA.",
        });
      } else {
        reject({ status: 401, message: "Invalid email or password" });
      }
    }, 1200);
  });
}

export async function mockVerifyCode(code: string): Promise<VerifyResponse> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (navigator.onLine === false) {
        reject(new Error("Network error"));
        return;
      }

      if (code === "123456") {
        resolve({ success: true, message: "Verification successful" });
      } else if (code === "000000") {
        reject({ status: 500, message: "Server error" });
      } else {
        reject({ status: 401, message: "Invalid code" });
      }
    }, 1200);
  });
}
