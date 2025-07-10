import { NativeBiometric } from "capacitor-native-biometric";

/**
 * Memeriksa apakah autentikasi biometrik tersedia di perangkat.
 * @returns {Promise<boolean>} - Mengembalikan true jika tersedia, false jika tidak.
 */
export const isBiometricAvailable = async (): Promise<boolean> => {
  try {
    const result = await NativeBiometric.isAvailable();
    return result.isAvailable;
  } catch (error) {
    console.error("Error saat memeriksa biometrik:", error);
    return false;
  }
};

/**
 * Memulai proses verifikasi identitas biometrik.
 * @returns {Promise<boolean>} - Mengembalikan true jika verifikasi berhasil, false jika gagal.
 */
export const verifyBiometricIdentity = async (): Promise<boolean> => {
  try {
    await NativeBiometric.verifyIdentity({
      title: "Verifikasi Identitas",
      subtitle: "Gunakan sidik jari untuk masuk",
      description: "Posisikan jari Anda pada sensor.",
    });
    // Jika berhasil, promise akan resolve tanpa error.
    return true;
  } catch (error) {
    // Jika gagal atau dibatalkan, promise akan reject.
    console.warn("Verifikasi biometrik gagal atau dibatalkan.", error);
    return false;
  }
};
