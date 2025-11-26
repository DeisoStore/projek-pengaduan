package id.go.beacukai.pengaduanonline.controller;

import id.go.beacukai.pengaduanonline.model.Laporan;
import id.go.beacukai.pengaduanonline.repository.LaporanRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.theokanning.openai.service.OpenAiService;
import com.theokanning.openai.completion.chat.*;

import java.util.*;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/api/chatbot")
@CrossOrigin(origins = "*")
public class ChatbotController {

    private final String API_KEY = "";
    private final LaporanRepository laporanRepository;

    public ChatbotController(LaporanRepository laporanRepository) {
        this.laporanRepository = laporanRepository;
    }

    @PostMapping("/ask")
    public ResponseEntity<?> askChatbot(@RequestBody Map<String, String> request) {

        String userMessage = filterProfanity(request.get("message")).toLowerCase();

        if (userMessage.contains("cara lapor") || userMessage.contains("bagaimana membuat laporan")) {
            String jawabanTetap = getCaraLapor();
            return ResponseEntity.ok(Map.of("reply", jawabanTetap));
        }

        OpenAiService service = new OpenAiService(API_KEY);

        ChatMessage systemMessage = new ChatMessage("system",
                """
                Kamu adalah *SIPUMA Virtual Assistant*, chatbot resmi layanan pengaduan Direktorat Jenderal Bea dan Cukai.

                🎯 Fokus utama:
                - Menangani pertanyaan terkait pengaduan kepabeanan dan cukai.
                - Menjelaskan prosedur pengaduan, alur tindak lanjut, jenis pelanggaran, dan informasi resmi pelayanan publik.
                - Membantu pengecekan status laporan jika user memberikan ID laporan.
                - Jika di tanya cara melakukan pembuatan laporan maka ai harus menjawab dengan baik seperti dan tersusun 


                🛑 Batasan wajib:
                - Jika user bertanya hal di luar layanan Bea Cukai, pengaduan publik, kepabeanan, atau cukai → TOLAK dengan sopan.
                - Tidak boleh menjawab pertanyaan tentang teknologi, agama, politik, matematika, hiburan, coding, kesehatan, atau topik di luar domain.
                - Jangan pernah meng generate jawaban berbeda. tetap gunakan balasan yang sama sesuai dengan SOP CS Bea Cukai.
                🧠 Perilaku:
                - Jika user memberikan ID, ekstrak dan balas: CEK_STATUS:<ID>
                - Jika pertanyaan relevan, jawab profesional.
                - Jika tidak jelas, minta klarifikasi.
                - Jika permintaan di luar kewenangan, arahkan ke kanal resmi.
                - Jika Pelapor menyapa halo dan sejenisnya maka cukup menjawab ",elamat datang! Ada yang bisa saya bantu terkait pengaduan Bea dan Cukai?"(jawaban tetap)

                🗣 Gaya Bicara:
                - Formal, sopan, profesional ala customer service bea cukai.
                - Tidak menggunakan emotikon atau bahasa gaul.
                
                Jika user pelapor bertanya untuk minta bantuan buatkan laporan dia atau fitur bea cukai lainnya yang belum bisa dilakukan maka jawabannya "Mohon maaf fitur ini sedang dalam pengembangan."(jawaban tetap)

                📌 Penolakan:
                - selalu menjawab "Maaf, layanan ini hanya menangani informasi terkait pengaduan Bea dan Cukai." jika diluar konteks(jangan ubah template ini)

                 Jika user menanyakan "cara lapor" atau "bagaimana membuat laporan" dan sejenisnya, jawab selalu dengan template berikut (tidak boleh diganti atau diubah):
                        "Cara membuat laporan pengaduan:
                        1. Masuk ke menu sebelah kiri, klik "Buat Laporan Pengaduan".
                        2. Isi semua data yang dibutuhkan sesuai laporan Anda.
                        3. Periksa kembali data, lalu klik "Kirim".
                        4. Simpan ID laporan untuk pengecekan status.
                Kamu harus mempertahankan karakter sebagai asisten resmi SIPUMA."
                """);

        ChatMessage userMsg = new ChatMessage("user", userMessage);

        ChatCompletionRequest completionRequest = ChatCompletionRequest.builder()
                .model("gpt-4o-mini")
                .messages(List.of(systemMessage, userMsg))
                .maxTokens(200)
                .temperature(0.2)
                .build();

        ChatCompletionResult result = service.createChatCompletion(completionRequest);
        String aiReply = result.getChoices().get(0).getMessage().getContent();

        // ======== Cek status laporan ========
        if (aiReply.startsWith("CEK_STATUS:")) {
            try {
                Long laporanId = Long.parseLong(aiReply.replace("CEK_STATUS:", "").trim());
                Optional<Laporan> laporan = laporanRepository.findById(laporanId);

                if (laporan.isPresent()) {
                    Laporan data = laporan.get();
                    String jawabanDB =
                            "Status laporan ID " + laporanId + ":\n" +
                            "- Nama Pelapor: " + data.getNamaPelapor() + "\n" +
                            "- Kategori: " + data.getKategoriLaporan() + "\n" +
                            "- Status: " + data.getStatus() + "\n" +
                            "- Tanggal Lapor: " + data.getTanggalLapor();

                    return ResponseEntity.ok(Map.of("reply", jawabanDB));
                } else {
                    return ResponseEntity.ok(Map.of("reply", "Maaf, laporan dengan ID " + laporanId + " tidak ditemukan."));
                }

            } catch (NumberFormatException e) {
                return ResponseEntity.ok(Map.of("reply", "Format ID laporan tidak valid."));
            }
        }

        return ResponseEntity.ok(Map.of("reply", aiReply));
    }

    // Jawaban tetap cara lapor
    private String getCaraLapor() {
        return """
                Cara membuat laporan pengaduan:
                1. Masuk ke menu sebelah kiri, klik "Buat Laporan Pengaduan".
                2. Isi semua data yang dibutuhkan sesuai laporan Anda.
                3. Periksa kembali data, lalu klik "Kirim".
                4. Simpan ID laporan untuk pengecekan status.
                """;
    }

    // Filter kata kasar
    private String filterProfanity(String input) {
        if (input == null) return null;

        String[] badWords = {
                "anjing", "anjg", "anj", "4nj1ng", "4njing", "a.n.j.i.n.g",
                "bangsat", "bgsd", "bgst", "bangsd", "b4ngs4t",
                "kontol", "kntl", "k0nt0l", "kontl", "k0ntl",
                "memek", "mmk", "m3m3k", "m3mek",
                "tai", "tae", "t4i", "t4e",
                "perek", "p3rek", "prk",
                "sinting", "gila", "g1la",
                "babi", "b4b1", "b4bi",
                "keparat", "kpr4t",
                "goblok", "gblk", "goblk", "g0blok",
                "tolol", "t0lol", "tll",
                "idiot", "id1ot",
                "jancuk", "jancok", "jancuq", "j4ncuk",
                "fuck", "fck", "fuk", "fucc", "f*ck", "f**k",
                "shit", "sh1t", "sh!t", "sht",
                "bitch", "b1tch", "btch",
                "asshole", "a$$hole", "ashole",
                "bastard", "b@stard", "bast*rd",
                "f.ck", "f-k", "f_k",
                "s.hit", "s-h-i-t",
                "b!tch",
                "k*ntol", "k@n7ol",
                "m.mek", "m-ek", "me*k",
                "anjay", "anjayy", "anjai", "anjiy", "anjyng", "anjaii",
                "k0nt01", "kon7ol", "kont0l",
                "m3m3q", "memeq", "mmq",
                "b4ngs4d", "bangsadd",
                "fcku", "fckoff", "fckyou"
        };

        String clean = input.toLowerCase();

        for (String bad : badWords) {
            clean = clean.replaceAll(Pattern.quote(bad), "*****");
        }

        return clean;
    }
}
