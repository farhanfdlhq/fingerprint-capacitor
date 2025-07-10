import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  AlertCircle,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";

// Tipe data untuk menyimpan pesan error
interface FormErrors {
  nama?: string;
  email?: string;
  password?: string;
}

export default function Register() {
  const navigate = useNavigate();

  // State untuk menyimpan nilai input
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // State untuk menyimpan pesan error
  const [errors, setErrors] = useState<FormErrors>({});

  // State untuk visibilitas password
  const [showPassword, setShowPassword] = useState(false);

  // State untuk loading
  const [isLoading, setIsLoading] = useState(false);

  // Fungsi untuk simulasi delay (bisa dihapus saat terhubung ke backend)
  const fakeNetworkDelay = () => new Promise((res) => setTimeout(res, 1000));

  // Fungsi untuk validasi
  const validate = () => {
    const newErrors: FormErrors = {};

    if (!nama) {
      newErrors.nama = "Nama lengkap wajib diisi.";
    }

    if (!email) {
      newErrors.email = "Email wajib diisi.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Format email tidak valid.";
    }

    if (!password) {
      newErrors.password = "Password wajib diisi.";
    } else if (password.length < 8) {
      newErrors.password = "Password minimal harus 8 karakter.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validate()) {
      setIsLoading(true);
      await fakeNetworkDelay();

      console.log("Registrasi berhasil", { nama, email, password });
      navigate("/login");

      setIsLoading(false);
    } else {
      console.log("Validasi gagal, registrasi dibatalkan.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 font-sans">
      <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-xl shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Buat Akun</h1>
          <p className="mt-1 text-gray-600">Mulai perjalanan Anda</p>
        </div>

        <form className="space-y-4" onSubmit={handleRegister} noValidate>
          {/* Input Nama Lengkap */}
          <div>
            <div className="relative">
              <User className="absolute w-5 h-5 text-gray-400 top-1/2 left-3 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Nama Lengkap"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                onBlur={validate}
                required
                className={`w-full pl-10 pr-4 py-2.5 text-gray-800 bg-gray-100 border rounded-lg transition ${
                  errors.nama ? "border-red-500" : "border-gray-200"
                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
            </div>
            {errors.nama && (
              <p className="mt-1.5 flex items-center text-xs text-red-600">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.nama}
              </p>
            )}
          </div>

          {/* Input Email */}
          <div>
            <div className="relative">
              <Mail className="absolute w-5 h-5 text-gray-400 top-1/2 left-3 -translate-y-1/2" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={validate}
                required
                className={`w-full pl-10 pr-4 py-2.5 text-gray-800 bg-gray-100 border rounded-lg transition ${
                  errors.email ? "border-red-500" : "border-gray-200"
                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
            </div>
            {errors.email && (
              <p className="mt-1.5 flex items-center text-xs text-red-600">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.email}
              </p>
            )}
          </div>

          {/* Input Password dengan Ikon Mata */}
          <div>
            <div className="relative">
              <Lock className="absolute w-5 h-5 text-gray-400 top-1/2 left-3 -translate-y-1/2" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={validate}
                required
                className={`w-full pl-10 pr-10 py-2.5 text-gray-800 bg-gray-100 border rounded-lg transition ${
                  errors.password ? "border-red-500" : "border-gray-200"
                } focus:outline-none focus:ring-2 focus:ring-white-500 focus:border-transparent`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-white-500 hover:text-white-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1.5 flex items-center text-xs text-red-600">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.password}
              </p>
            )}
          </div>

          {/* Tombol Daftar */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-3 mt-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-colors flex justify-center items-center disabled:opacity-75"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : "Daftar"}
            </button>
          </div>
        </form>

        <div className="text-sm text-center text-gray-500">
          Sudah punya akun?{" "}
          <a
            href="/login"
            className="font-semibold text-blue-600 hover:underline"
          >
            Login
          </a>
        </div>
      </div>
    </div>
  );
}
