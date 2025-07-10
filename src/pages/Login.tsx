import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyBiometricIdentity } from "../biometricVerification";
import { Mail, Lock, Fingerprint, Eye, EyeOff, Loader2 } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isBiometricLoading, setIsBiometricLoading] = useState(false);

  // Fungsi untuk simulasi delay
  const fakeNetworkDelay = () => new Promise((res) => setTimeout(res, 1000));

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    await fakeNetworkDelay();

    localStorage.setItem("isLoggedIn", "true");
    navigate("/");

    setIsLoading(false);
  };

  const handleFingerprintLogin = async () => {
    setIsBiometricLoading(true);

    const isVerified = await verifyBiometricIdentity();
    if (isVerified) {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/");
    } else {
      alert("Autentikasi sidik jari gagal atau dibatalkan.");
    }

    setIsBiometricLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 font-sans">
      <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-xl shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Selamat Datang</h1>
          <p className="mt-1 text-gray-600">Masuk untuk melanjutkan</p>
        </div>

        <form className="space-y-4" onSubmit={handleLogin}>
          {/* Input Email */}
          <div className="relative">
            <Mail className="absolute w-5 h-5 text-gray-400 top-1/2 left-3 -translate-y-1/2" />
            <input
              type="email"
              placeholder="Email"
              required
              className="w-full pl-10 pr-4 py-2.5 text-gray-800 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          {/* Input Password dengan Ikon Mata */}
          <div className="relative">
            <Lock className="absolute w-5 h-5 text-gray-400 top-1/2 left-3 -translate-y-1/2" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              className="w-full pl-10 pr-10 py-2.5 text-gray-800 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-white-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Tombol Login */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-3 mt-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-colors flex justify-center items-center disabled:opacity-75"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : "Login"}
            </button>
          </div>
        </form>

        <div className="flex items-center">
          <div className="flex-grow h-px bg-gray-200"></div>
          <span className="px-4 text-xs text-gray-400">Atau</span>
          <div className="flex-grow h-px bg-gray-200"></div>
        </div>

        <button
          onClick={handleFingerprintLogin}
          disabled={isBiometricLoading}
          className="w-full flex items-center justify-center px-4 py-2.5 font-semibold text-white-600 bg-white border-2 border-white-600 rounded-lg hover:bg-white-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white-600 transition-colors disabled:opacity-75"
        >
          {isBiometricLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
              <Fingerprint className="w-5 h-5 mr-2" />
              Masuk dengan Sidik Jari
            </>
          )}
        </button>

        <div className="text-sm text-center text-gray-500">
          Belum punya akun?{" "}
          <a
            href="/register"
            className="font-semibold text-blue-600 hover:underline"
          >
            Daftar
          </a>
        </div>
      </div>
    </div>
  );
}
