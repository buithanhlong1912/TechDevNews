import * as React from "react";
import AdminHeader from "../components/writer/admin/admin-header/AdminHeader";
import AdminDashboard from "../components/writer/admin/dashboard/AdminDashboard";
import Auth from "../guard/AuthGuard";

const Admin = () => {
  return (
    <Auth orRedirectTo="/admin/login">
      <AdminHeader />
      <AdminDashboard />
    </Auth>
  );
};

export default Admin;
