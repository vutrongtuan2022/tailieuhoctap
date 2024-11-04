// App.js
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { publicRouter } from "./router";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Tạo một QueryClient mới cho TanStack Query
const queryClient = new QueryClient();

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="App">
            <Routes>
              {publicRouter.map((route, index) => {
                const Page = route.component;
                const isProtectedRoute = route.path !== "/"; // Giả sử chỉ Login là công khai
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      isProtectedRoute ? (
                        <PrivateRoute>
                          <Page />
                        </PrivateRoute>
                      ) : (
                        <Page />
                      )
                    }
                  />
                );
              })}
              {/* Redirect đến Login nếu không tìm thấy route */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </Router>
      </QueryClientProvider>
    </AuthProvider>
  );
}

// Component PrivateRoute kiểm tra xác thực người dùng
function PrivateRoute({ children }) {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/" />;
}

export default App;
