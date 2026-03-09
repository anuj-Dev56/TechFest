const ADMIN_AUTH_KEY = "techfest_admin_auth";

export function getAdminPasscode() {
  return import.meta.env.VITE_ADMIN_PASSCODE || "techfest2026";
}

export function isAdminAuthenticated() {
  return sessionStorage.getItem(ADMIN_AUTH_KEY) === "true";
}

export function setAdminAuthenticated() {
  sessionStorage.setItem(ADMIN_AUTH_KEY, "true");
}

export function clearAdminAuthenticated() {
  sessionStorage.removeItem(ADMIN_AUTH_KEY);
}
