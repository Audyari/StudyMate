# Study Guide Creator - Task Breakdown

## Phase 1: Setup & Planning (1-2 hari)
- [ ] **Task 1.1** - Riset kompetitor (30 menit)
  - Cek Quizlet, Anki, StudyBlue
  - Catat fitur yang mereka punya
- [ ] **Task 1.2** - Buat wireframe sederhana (1 jam)
  - Sketsa layout upload file
  - Sketsa tampilan hasil (flashcard/mindmap)
- [ ] **Task 1.3** - Pilih tech stack (30 menit)
  - Backend: Python + Flask/FastAPI
  - Frontend: HTML + CSS + vanilla JS (simple)
  - AI: OpenAI API/Gemini API + custom prompts
  - Libraries: PyPDF2, python-docx, streamlit (optional)

## Phase 2: MVP Core Features (1 minggu)

### Week 1: Basic File Processing
- [ ] **Task 2.1** - Setup Python environment (30 menit)
  - `pip install flask PyPDF2 python-docx openai python-dotenv`
  - Buat virtual environment
  - Setup folder structure
- [ ] **Task 2.2** - Buat file upload endpoint (2 jam)
  - Flask route untuk upload file
  - Validasi file PDF/DOCX/TXT
- [ ] **Task 2.3** - Text extraction functions (3 jam)
  - Function `extract_from_pdf()` dengan PyPDF2
  - Function `extract_from_docx()` dengan python-docx
  - Function `extract_from_txt()` 
  - Test dengan sample files

### Week 2: AI Integration & Prompt Engineering (Bahasa Indonesia)
- [ ] **Task 2.4** - Setup AI client (1 jam)
  - Install openai library
  - Setup .env untuk API key
  - Test connection dengan prompt bahasa Indonesia
- [ ] **Task 2.5** - Design prompts Indonesia untuk flashcard (3 jam)
  - **Prompt v1**: "Buatlah 10 kartu belajar dari teks berikut..."
  - **Prompt v2**: Dengan konteks pendidikan Indonesia
  - **Prompt v3**: Output format JSON terstruktur
  - Test dengan materi kuliah Indonesia (Pancasila, Sejarah, etc)
- [ ] **Task 2.6** - Buat template prompt Indonesia (2 jam)
  - Template flashcard: "Pertanyaan: ... Jawaban: ..."
  - Template kuis: "Soal pilihan ganda tentang..."
  - Template rangkuman: "Buatlah ringkasan dari materi..."
  - Function `generate_content_id(teks, tipe_format, gaya_belajar)`

### Week 3: Display Results
- [ ] **Task 2.7** - Buat flashcard component (3 jam)
  - Card flip animation CSS
  - Next/previous button
- [ ] **Task 2.8** - Connect everything (2 jam)
  - Upload → Extract → AI → Display
  - Test end-to-end flow

## Phase 3: Enhancement (1-2 minggu)

### Multiple Study Formats
- [ ] **Task 3.1** - Buat quiz component (4 jam)
  - Multiple choice format
  - Score tracking
- [ ] **Task 3.2** - Mind map generator (6 jam)
  - Pakai library D3.js atau Vis.js
  - Parse AI output jadi nodes/edges
- [ ] **Task 3.3** - Summary generator (2 jam)
  - Prompt AI buat rangkuman
  - Tampilan clean reading

### User Experience
- [ ] **Task 3.4** - Learning style selector (2 jam)
  - Radio button: Visual/Audio/Kinesthetic  
  - Adjust AI prompt based on selection
- [ ] **Task 3.5** - Progress tracking (3 jam)
  - LocalStorage untuk save progress
  - Progress bar component
- [ ] **Task 3.6** - Export feature (2 jam)
  - Export flashcard ke PDF
  - Download as JSON

## Phase 4: Polish & Deploy (3-5 hari)
- [ ] **Task 4.1** - UI/UX improvements (4 jam)
  - Better styling dengan Tailwind/Bootstrap
  - Responsive design
- [ ] **Task 4.2** - Error handling (2 jam)
  - Loading states
  - Error messages yang user-friendly
- [ ] **Task 4.3** - Testing (2 jam)
  - Test dengan berbagai jenis PDF
  - Test di mobile
- [ ] **Task 4.4** - Deploy (2 jam)
  - Frontend ke Vercel/Netlify
  - Backend ke Railway/Render

## Quick Wins untuk Mulai Hari Ini (30 menit each)
1. **Setup Python virtual environment** dan install libraries
2. **Buat simple Flask app** dengan "Halo Dunia"
3. **Test PyPDF2** dengan file PDF berbahasa Indonesia
4. **Write first prompt Indonesia** dan test dengan ChatGPT/Claude
5. **Daftar API key** OpenAI/Gemini

## Keunggulan Pakai Bahasa Indonesia:
- **Market gap** - tools serupa kebanyakan English
- **Natural untuk user** - mahasiswa Indonesia lebih nyaman
- **Cultural context** - AI bisa kasih contoh yang relatable
- **Less competition** - differentiator yang kuat

## Bonus: Prompt Engineering Indonesia (Deep Dive)
- [ ] **Task PE.1** - Prompt untuk gaya belajar Indonesia (2 jam)
  - Visual: "Buatlah analogi yang mudah dipahami mahasiswa Indonesia..."
  - Auditori: "Jelaskan dengan storytelling dan contoh sehari-hari..."
  - Kinestetik: "Berikan contoh praktis dan latihan yang bisa dikerjakan..."
- [ ] **Task PE.2** - Context-aware prompts Indonesia (2 jam)
  - Deteksi mata kuliah: "Jika ini materi Ekonomi, gunakan contoh UMKM..."
  - Adjust ke level: SMA, D3, S1, S2
  - Gunakan terminologi Indonesia yang tepat
- [ ] **Task PE.3** - Output formatting Indonesia (2 jam)
  - JSON dengan key bahasa Indonesia: {"pertanyaan": "...", "jawaban": "..."}
  - Format sesuai kurikulum Indonesia
  - Handle bahasa campuran (Indonesia + English terms)

## Contoh Prompt Templates Indonesia:

### Template Flashcard:
```
Kamu adalah asisten belajar untuk mahasiswa Indonesia. 
Dari teks materi kuliah berikut, buatlah 10 kartu belajar (flashcard) dalam bahasa Indonesia.

Format output JSON:
{
  "kartu_belajar": [
    {
      "pertanyaan": "...",
      "jawaban": "...",
      "tingkat_kesulitan": "mudah/sedang/sulit"
    }
  ]
}

Pastikan:
- Pertanyaan mudah dipahami mahasiswa Indonesia  
- Jawaban singkat dan jelas
- Gunakan istilah yang familiar di Indonesia
- Berikan contoh konkret jika perlu

Materi: {text_input}
```

### Template Quiz:
```
Buatlah 5 soal pilihan ganda dari materi berikut untuk mahasiswa Indonesia.

Format JSON:
{
  "soal_quiz": [
    {
      "pertanyaan": "...",
      "pilihan": ["A. ...", "B. ...", "C. ...", "D. ..."],
      "jawaban_benar": "A",
      "penjelasan": "..."
    }
  ]
}

Materi: {text_input}
```

## Tips Eksekusi:
- **Mulai dari task terkecil** - jangan langsung coding AI
- **Test setiap step** - jangan numpuk semuanya
- **Focus MVP dulu** - fitur fancy belakangan
- **Time box** - kasih deadline untuk setiap task
- **Document progress** - catat apa yang berhasil/gagal

## Success Metrics MVP:
- Upload PDF ✓
- Extract text ✓  
- Generate 5-10 flashcards ✓
- Display dengan flip animation ✓
- Total waktu development: 2-3 minggu part-time

## Update Progress Terbaru
- **Task 2.1**: Setup Python environment selesai
- **Task 2.2**: Buat file upload endpoint selesai
- **Task 2.3**: Text extraction functions selesai
- **Task 2.4**: Setup AI client selesai
- **Task 2.5**: Design prompts Indonesia untuk flashcard selesai
- **Task 2.6**: Buat template prompt Indonesia selesai
- **Task 2.7**: Buat flashcard component selesai
- **Task 2.8**: Connect everything selesai

## Tambahan Informasi Prompt Engineering
- **Prompt Engineering**: Proses mendesain prompt yang efektif untuk AI
- **Prompt Template**: Template yang digunakan untuk membuat prompt
- **Context-aware Prompts**: Prompts yang dapat menyesuaikan dengan konteks materi
- **Output Formatting**: Format output yang dihasilkan oleh AI