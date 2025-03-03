import axios from "axios";
import _ from "lodash";
import { createBrowserHistory } from "history";
const history = createBrowserHistory();

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true,
});

// Response interceptor: Trích xuất dữ liệu trả về
instance.interceptors.response.use(
   
  (response) => {
    // Nếu thành công, trả về dữ liệu (response.data)
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;

    // Kiểm tra nếu status là 403 (hoặc 401 nếu server trả về 401) và request chưa được retry
    if (
      error.response &&
      error.response.status === 403 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // Lấy refreshToken từ sessionStorage
        const refreshToken = sessionStorage.getItem("refreshToken");
        if (!refreshToken) {
          // Nếu không có refreshToken, trả về lỗi (hoặc chuyển hướng đăng nhập)
          return Promise.reject(error);
        }

        // Gửi request refresh token với payload là object chứa refreshToken
        const res = await axios.post("http://localhost:8080/api/auth/refresh", {
          refreshToken,
        });

        if (res.status === 200) {
          // Lấy access token mới từ response (lấy từ res.data)
          const newAccessToken = res.data.accessToken;
          // Lưu access token mới vào sessionStorage
          sessionStorage.setItem("accessToken", newAccessToken);

          // Cập nhật header Authorization cho request gốc
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

          // Gửi lại request gốc với access token mới
          return instance(originalRequest);
        }
      } catch (refreshError) {
        console.log("Refresh token failed:", refreshError);
        history.push("/login");
        return Promise.reject(refreshError);
      }
    }

    // Nếu không phải lỗi 403 hoặc đã retry rồi, trả về lỗi
    return Promise.reject(error);
  }
);

// Request interceptor: Thêm header Authorization cho mỗi request
instance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${sessionStorage.getItem(
      "accessToken"
    )}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
