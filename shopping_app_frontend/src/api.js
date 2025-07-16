const API_URL = "http://localhost:3001"; // Update to backend base

// Helper for REST requests
export async function apiRequest(endpoint, method = "GET", body = null, token = null) {
  const headers = {
    "Content-Type": "application/json",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const resp = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!resp.ok) {
    let msg = "Unknown error";
    try {
      const data = await resp.json();
      msg = data.detail || JSON.stringify(data);
    } catch {
      msg = await resp.text();
    }
    throw new Error(msg);
  }
  if (resp.status === 204) return null;
  return resp.json();
}

// PUBLIC_INTERFACE
export const AuthAPI = {
  register: (username, password) =>
    apiRequest("/register", "POST", { username, password }),
  login: (username, password) =>
    apiRequest("/login", "POST", { username, password }),
  me: (token) => apiRequest("/me", "GET", null, token),
};

export const ProductAPI = {
  list: () => apiRequest("/products"),
  get: (id) => apiRequest(`/products/${id}`),
};

export const CartAPI = {
  get: (token) => apiRequest("/cart", "GET", null, token),
  add: (productId, quantity, token) =>
    apiRequest("/cart/add", "POST", { product_id: productId, quantity }, token),
  update: (productId, quantity, token) =>
    apiRequest("/cart/update", "POST", { product_id: productId, quantity }, token),
  remove: (productId, token) =>
    apiRequest("/cart/remove", "POST", { product_id: productId }, token),
  clear: (token) => apiRequest("/cart/clear", "POST", null, token),
};

export const OrderAPI = {
  checkout: (token) => apiRequest("/orders/checkout", "POST", null, token),
  list: (token) => apiRequest("/orders", "GET", null, token),
};
