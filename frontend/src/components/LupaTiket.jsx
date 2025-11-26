import { useState } from "react";
import "./LupaTiket.css";
import axios from "axios";

const LupaTiket = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8080/api/lupa-tiket", {
                email: email
            });

            setMessage(response.data.message);
            setIsError(false);

        } catch (error) {
            setMessage(
                error.response?.data?.message || "Terjadi kesalahan pada server."
            );
            setIsError(true);
        }
    };

    return (
        <div className="lupa-tiket-container">
            <h2 className="lupa-tiket-title">Kehilangan Nomor TIket</h2>
            <p className="lupa-tiket-subtitle">
                Masukkan email yang Anda gunakan saat membuat laporan.
            </p>

            <form className="lupa-tiket-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email Anda</label>
                    <input
                        type="email"
                        placeholder="contoh: nama@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <button className="lupa-tiket-btn" type="submit">
                    Kirim Nomor Tiket ke Email
                </button>
            </form>

            {message && (
                <div
                    className={`lupa-tiket-alert ${
                        isError ? "alert-error" : "alert-success"
                    }`}
                >
                    {message}
                </div>
            )}
        </div>
    );
};

export default LupaTiket;
