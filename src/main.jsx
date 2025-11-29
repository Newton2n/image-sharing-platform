import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { store } from "./store/store.js";
import { Provider } from "react-redux";
import { AuthLayout } from "./components/index.js";
import Home from "./components/Pages/Home.jsx";
import SignupPage from "./components/Pages/Signup.jsx";
import LoginPage from "./components/Pages/Login.jsx";
import EditPost from "./components/Pages/EditPost.jsx";
import EditProfile from "./components/Pages/EditProfile.jsx";
import AddPost from "./components/Pages/AddPost.jsx";
import Profile from "./components/Pages/Profile.jsx";
import Post from "./components/Pages/Post.jsx";
import { ErrorBoundary } from "./components/index.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactLenis from "lenis/react"; //Smooth scroll animation
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      { path: "", element: <Home /> },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <LoginPage />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <SignupPage />
          </AuthLayout>
        ),
      },
      {
        path: "/profile/:userId",
        element: (
          <AuthLayout authentication={true}>
            <Profile />
          </AuthLayout>
        ),
      },
      {
        path: "/add-post",
        element: (
          <AuthLayout authentication={true}>
            {" "}
            <AddPost />
          </AuthLayout>
        ),
      },
      {
        path: "/add-post",
        element: (
          <AuthLayout authentication={true}>
            {" "}
            <AddPost />
          </AuthLayout>
        ),
      },
      {
        path: "/edit-post/:postId",
        element: (
          <AuthLayout authentication={true}>
            {" "}
            <EditPost />
          </AuthLayout>
        ),
      },
      {
        path: "/edit-profile",
        element: (
          <AuthLayout authentication={true}>
            {" "}
            <EditProfile />
          </AuthLayout>
        ),
      },
      {
        path: "/post/:postId",
        element: (
          <AuthLayout authentication={true}>
            {" "}
            <Post />
          </AuthLayout>
        ),
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ReactLenis
      root
      options={{
        lerp: 0.06, // smoother inertia
        duration: 1.3, // longer easing curve
        smoothWheel: true,
        smoothTouch: false,
        wheelMultiplier: 0.9, // reduces aggressive scroll jumps
        touchMultiplier: 1.5,
        orientation: "vertical",
        gestureOrientation: "vertical",
      }}
    >
      <RouterProvider router={router} />
    </ReactLenis>
  </Provider>
);
