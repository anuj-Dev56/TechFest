import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addCertificateUser } from "../../services/certificateUsers";
import { hasFirebaseConfig } from "../../lib/firebase";
import { clearAdminAuthenticated } from "../../lib/adminAuth";

const Admin = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const configHint = useMemo(() => {
    if (hasFirebaseConfig) {
      return "Firebase connected. New users will be available in certificate dropdown.";
    }
    return "Firebase is not configured yet. Add VITE_FIREBASE_* values in a .env file.";
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");

    if (!name.trim()) {
      setError("Please enter a user name.");
      return;
    }

    setIsSaving(true);
    try {
      await addCertificateUser(name, email);
      setMessage("User added successfully.");
      setName("");
      setEmail("");
    } catch (saveError) {
      setError(saveError.message || "Failed to add user.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    clearAdminAuthenticated();
    navigate("/u/a/admin/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-black px-4 py-8 text-white">
      <div className="mx-auto w-full max-w-2xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-bold sm:text-3xl">Admin: Add Certificate User</h1>
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="rounded-md border border-white/30 px-3 py-2 text-sm hover:bg-white/10"
            >
              Back To Home
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-md border border-red-200/40 px-3 py-2 text-sm text-red-200 hover:bg-red-500/10"
            >
              Logout
            </button>
          </div>
        </div>

        <p className="mb-6 rounded-md border border-white/20 bg-white/5 px-4 py-3 text-sm text-white/80">
          {configHint}
        </p>

        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-white/20 bg-white/5 p-5 shadow-xl sm:p-6"
        >
          <div className="space-y-5">
            <div>
              <label htmlFor="admin-name" className="mb-2 block text-sm text-white/80">
                Full Name
              </label>
              <input
                id="admin-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Aditi Sharma"
                className="w-full rounded-md border border-white/20 bg-black/30 px-3 py-2.5 outline-none transition focus:border-white/50"
              />
            </div>

            <div>
              <label htmlFor="admin-email" className="mb-2 block text-sm text-white/80">
                Email (optional)
              </label>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. user@example.com"
                className="w-full rounded-md border border-white/20 bg-black/30 px-3 py-2.5 outline-none transition focus:border-white/50"
              />
            </div>

            {error ? <p className="text-sm text-red-300">{error}</p> : null}
            {message ? <p className="text-sm text-green-300">{message}</p> : null}

            <button
              type="submit"
              disabled={isSaving}
              className="w-full rounded-md bg-white px-4 py-2.5 font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving ? "Saving User..." : "Add User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Admin;