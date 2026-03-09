import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAdminPasscode, setAdminAuthenticated } from "../../lib/adminAuth";

const AdminLogin = () => {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const fromPath = location.state?.from || "/u/a/admin";

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const expectedPasscode = getAdminPasscode();

    if (passcode === expectedPasscode) {
      setAdminAuthenticated();
      navigate(fromPath, { replace: true });
      return;
    }

    setError("Invalid passcode.");
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-black px-4 py-8 text-white">
      <div className="mx-auto mt-10 w-full max-w-md rounded-xl border border-white/20 bg-white/5 p-6 shadow-xl">
        <h1 className="mb-2 text-2xl font-bold">Admin Login</h1>
        <p className="mb-6 text-sm text-white/75">
          Enter admin passcode to access user management.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="admin-passcode" className="mb-2 block text-sm text-white/80">
              Passcode
            </label>
            <input
              id="admin-passcode"
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full rounded-md border border-white/20 bg-black/30 px-3 py-2.5 outline-none transition focus:border-white/50"
              placeholder="Enter passcode"
            />
          </div>

          {error ? <p className="text-sm text-red-300">{error}</p> : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-white px-4 py-2.5 font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Checking..." : "Login"}
          </button>
        </form>

        <Link
          to="/"
          className="mt-5 inline-block text-sm text-blue-300 transition hover:text-blue-200 hover:underline"
        >
          Back To Home
        </Link>
      </div>
    </div>
  );
};

export default AdminLogin;
