import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import {
  getGoogleAuthUrl,
  getGoogleProfile,
  getGithubAuthUrl,
  getGithubProfile,
} from "../utils/oauthProviders.js";

// Shared by both providers — finds a user by their provider ID, or by
// email if they'd previously signed up via OTP, or creates a brand new
// user. This is the "one true path" every OAuth login converges through.
async function findOrCreateOAuthUser({ providerField, providerId, email, name }) {
  let user = await User.findOne({ [providerField]: providerId });
  if (user) return user;

  // They might already have an account from OTP/register with this email —
  // link the OAuth ID to it instead of creating a duplicate account.
  user = await User.findOne({ email: email.toLowerCase().trim() });
  if (user) {
    user[providerField] = providerId;
    await user.save();
    return user;
  }

  return User.create({
    name: name || email.split("@")[0],
    email: email.toLowerCase().trim(),
    [providerField]: providerId,
  });
}

function issueCookieAndRedirect(res, user) {
  const token = generateToken(user._id);
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
  // Redirect to a dedicated frontend route rather than "/", so the
  // frontend has one clear place to read auth state and route the user
  // onward (e.g. to their dashboard) after an OAuth round trip.
  res.redirect(`${process.env.CLIENT_URL}/auth/callback`);
}

export function googleRedirect(req, res) {
  res.redirect(getGoogleAuthUrl());
}

export async function googleCallback(req, res) {
  try {
    const { code } = req.query;
    if (!code) return res.redirect(`${process.env.CLIENT_URL}/login?error=oauth_failed`);

    const profile = await getGoogleProfile(code);
    const user = await findOrCreateOAuthUser({
      providerField: "googleId",
      providerId: profile.id,
      email: profile.email,
      name: profile.name,
    });

    issueCookieAndRedirect(res, user);
  } catch (err) {
    console.error("Google OAuth failed:", err);
    res.redirect(`${process.env.CLIENT_URL}/login?error=oauth_failed`);
  }
}

export function githubRedirect(req, res) {
  res.redirect(getGithubAuthUrl());
}

export async function githubCallback(req, res) {
  try {
    const { code } = req.query;
    if (!code) return res.redirect(`${process.env.CLIENT_URL}/login?error=oauth_failed`);

    const profile = await getGithubProfile(code);
    const user = await findOrCreateOAuthUser({
      providerField: "githubId",
      providerId: profile.id.toString(),
      email: profile.email,
      name: profile.name || profile.login,
    });

    issueCookieAndRedirect(res, user);
  } catch (err) {
    console.error("GitHub OAuth failed:", err);
    res.redirect(`${process.env.CLIENT_URL}/login?error=oauth_failed`);
  }
}

// GET /api/auth/me
// Called by the frontend on page load to check "is someone logged in,
// and who". Relies entirely on the httpOnly cookie the browser already
// sends automatically — no token handling needed on the frontend at all.
export async function getCurrentUser(req, res) {
  // `protect` middleware already verified the cookie and attached req.user
  // before this function ever runs — so if we're here, they're logged in.
  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  });
}

// POST /api/auth/logout
export function logoutUser(req, res) {
  // Clearing a cookie means setting one with the same name that expires
  // immediately. The options here (httpOnly, sameSite, secure) must match
  // exactly what was used to set it originally, or some browsers won't
  // actually clear it.
  res.cookie("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: new Date(0),
  });
  res.json({ message: "Logged out successfully" });
}