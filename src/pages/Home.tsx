import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Landmark, Coins, Gem, ArrowUpRight } from "lucide-react";

// Struktur data aset (tidak ada perubahan)
const userAssets = [
  {
    icon: <Landmark size={22} className="text-green-600" />,
    name: "Saldo USD",
    amount: "$7,800.00",
    value: "Rp 122.460.000",
    bgColor: "bg-green-100",
  },
  {
    icon: <Coins size={22} className="text-blue-600" />,
    name: "Saldo IDR",
    amount: "Rp 50.000.000.000",
    value: "Rp 50 Miliar",
    bgColor: "bg-blue-100",
  },
  {
    icon: <Gem size={22} className="text-amber-600" />,
    name: "Emas",
    amount: "50 Kg",
    value: "Rp 65.25 Miliar",
    bgColor: "bg-amber-100",
  },
];

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  const userName = "Farhan";

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* ================= HEADER YANG DIPERBAIKI ================= */}
      <header className="bg-white sticky top-0 z-10 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Blok Info Pengguna */}
            <div className="flex items-center gap-x-3">
              {/* Avatar */}
              <div className="flex-shrink-0 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center font-bold text-white text-lg">
                {userName.charAt(0)}
              </div>
              {/* Teks Sapaan dan Nama */}
              <div className="flex flex-col">
                <h1 className="text-base font-bold text-gray-900 -mt-0.5">
                  {userName}
                </h1>
              </div>
            </div>

            {/* Tombol Logout */}
            <button
              onClick={handleLogout}
              className="p-2 text-white-500 rounded-full hover:bg-gray-100"
              aria-label="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>
      {/* ========================================================== */}

      {/* Konten Utama */}
      <main className="max-w-4xl mx-auto p-4 sm:p-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800">Ringkasan Aset</h2>
        </div>

        {/* Kartu Total Aset */}
        <div className="p-6 bg-blue-600 text-white rounded-xl shadow-lg mb-6">
          <p className="text-sm text-blue-200">Total Estimasi Nilai Aset</p>
          <p className="text-3xl font-bold mt-1">Rp 115,37 Miliar</p>
          <div className="flex items-center mt-2 text-sm text-blue-200">
            <ArrowUpRight size={16} className="mr-1" />
            <span>Naik 5.2% bulan ini</span>
          </div>
        </div>

        {/* Daftar Aset */}
        <div className="space-y-3">
          {userAssets.map((asset, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-500 transition-all duration-200 cursor-pointer"
            >
              <div
                className={`w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-lg ${asset.bgColor}`}
              >
                {asset.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 truncate">
                  {asset.name}
                </p>
                <p className="text-sm text-gray-500 truncate">{asset.amount}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-semibold text-gray-900">{asset.value}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
