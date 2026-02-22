import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  Outlet,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ClubePage from "./pages/ClubePage";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import NotFound from "./pages/NotFound";
import AdminEventsPage from "./pages/AdminEventsPage";
import AdminEventListPage from "./pages/AdminEventListPage";
import AdminEventRegistrationsPage from "./pages/AdminEventRegistrationsPage";
import AdminContactPage from "./pages/AdminContactPage";
import AdminMembersPage from "./pages/AdminMembersPage";
import AdminLogin from "./pages/AdminLogin";
import MemberLogin from "./pages/MemberLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

const Layout = () => {
  return (
    <AuthProvider>
      <Navbar />
      <Outlet />
    </AuthProvider>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/clubs" element={<ClubePage />} />
      <Route path="/about" element={<About />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/events" element={<Events />} />
      <Route path="/events/:eventId" element={<EventDetail />} />

      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/member-login" element={<MemberLogin />} />
      <Route
        path="/admin/events"
        element={
          <ProtectedRoute>
            <AdminEventListPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/event-form"
        element={
          <ProtectedRoute>
            <AdminEventsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/events/:eventId/registrations"
        element={
          <ProtectedRoute>
            <AdminEventRegistrationsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/contacts"
        element={
          <ProtectedRoute>
            <AdminContactPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/members"
        element={
          <ProtectedRoute>
            <AdminMembersPage />
          </ProtectedRoute>
        }
      />

      {/* 404 Catch-all route - must be last */}
      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
