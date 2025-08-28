import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../features/auth/authSlice"; // path apne project ke hisaab se adjust karo

const SocialLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (credentialResponse) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/google-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: credentialResponse.credential }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("✅ Google Login success:", data);

        // Token save
        localStorage.setItem("token", data.token);

        // Redux me user set karo
        dispatch(setUser(data.user));

        // Home pe le jao
        navigate("/");
      } else {
        console.error("❌ Login failed:", data.message);
      }
    } catch (err) {
      console.error("Server error:", err);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-6 bg-white p-6 rounded-xl shadow-lg border border-gray-200 text-center">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">
        Or sign in with
      </h3>

      <div className="flex items-center justify-center gap-4">
        <GoogleLogin
          onSuccess={handleLogin}
          onError={() => console.error("Google login failed")}
        />
      </div>

      <div className="mt-4 text-gray-500 text-sm">
        Your credentials are safe with us. 🔒
      </div>
    </div>
  );
};

export default SocialLogin;
