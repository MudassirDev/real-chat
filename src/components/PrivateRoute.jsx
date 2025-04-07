import { Navigate } from "react-router";

function PrivateRoute({ user, loading, children }) {
    if (loading) return null;
    if (!user) return <Navigate to="/login" />;
    return children;
}

export default PrivateRoute;
