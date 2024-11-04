import axios from "axios";
import { store } from "../redux/store";
import { getKeyCert } from "../common/funcs/optionConvert";

const axiosClient = axios.create({
  headers: {
    "content-type": "application/json",
  },
  baseURL:
    process.env.NODE_ENV == "development"
      ? process.env.REACT_PUBLIC_API_URL_DEV
      : process.env.REACT_PUBLIC_API_URL_PRODUCTION,
  timeout: 15000,
  timeoutErrorMessage: "Timeout error request",
});
axiosClient.interceptors.request.use(
  async function (config) {
    // Làm gì đó trước khi request dược gửi đi
    const token = store.getState().auth.token;
    config.headers.Authorization = token ? "Bearer" + token : null;

    if (!(config.data instanceof FormData)) {
      config.data = {
        ...getKeyCert(),
        ...config.data,
      };
    }

    return config;
  },
  function (error) {
    // Làm gì đó với lỗi request
    return Promise.reject(error);
  }
);

// Thêm một bộ đón chặn response
axiosClient.interceptors.response.use(
  function (response) {
    // Bất kì mã trạng thái nào nằm trong tầm 2xx đều khiến hàm này được trigger
    if (response && response.data) {
      return response.data;
    }
    // Làm gì đó với dữ liệu response
    return response;
  },
  function (error) {
    // Bất kì mã trạng thái nào lọt ra ngoài tầm 2xx đều khiến hàm này được trigger\
    if (error.response && error.response.data) {
      throw error.response.data;
    }

    if (!axios.isCancel(error)) throw error;
    // Làm gì đó với lỗi response
  }
);
