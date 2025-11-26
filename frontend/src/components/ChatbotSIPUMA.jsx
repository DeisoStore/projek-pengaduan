import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./ChatbotSIPUMA.css"; // 

const ChatbotSIPUMA = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Halo! Saya adalah layanan asisten virtual SIPUMA. Ada yang bisa saya bantu terkait layanan pengaduan?" },
  ]);

  const [input, setInput] = useState("");
  
  // Ref untuk auto-scroll ke pesan terbawah
  const messagesEndRef = useRef(null);

  // Fungsi untuk scroll ke bawah setiap ada pesan baru
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input; // Simpan input untuk dikirim
    setInput(""); // Kosongkan input form segera agar responsif

    try {
      const response = await axios.post(
        "http://localhost:8080/api/chatbot/ask",
        { message: currentInput },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const botReply = response.data.reply || "Maaf, saya tidak mengerti pertanyaan Anda.";
      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
      
    } catch (error) {
      console.error("API Error:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Maaf, terjadi gangguan koneksi pada server kami." },
      ]);
    }
  };

  // Fitur kirim dengan tekan tombol Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="sipuma-container">
      {/* Bagian Header (Sesuai CSS baru) */}
      <div className="sipuma-header">
        <h4>SIPUMA Assistant</h4>
        <p>Layanan Informasi & Pengaduan Online</p>
      </div>

      {/* Area Chat */}
      <div className="sipuma-chatbox">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`sipuma-message ${msg.sender}`} // Class dinamis: 'user' atau 'bot'
          >
            {/* Bubble Wrapper untuk styling teks */}
            <div className="bubble">
              {msg.text}
            </div>
          </div>
        ))}
        {/* Elemen dummy invisible untuk target auto-scroll */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="sipuma-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Ketik keluhan atau pertanyaan Anda..."
        />
        <button onClick={handleSend} aria-label="Kirim Pesan">
          {/* Kosong karena CSS menanganinya dengan content '➤' */}
        </button>
      </div>
    </div>
  );
};

export default ChatbotSIPUMA;