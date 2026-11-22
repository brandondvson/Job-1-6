const articles = [
    {
        id: 1,
        title: "Penerapan Struktur Kode Modular Bantu Perawatan Proyek Web",
        category: "teknologi",
        author: "Redaksi Teknologi",
        date: "20 November 2026",
        summary: "Memisahkan markup HTML, styling CSS, dan logika JavaScript memudahkan tim pengembang melacak bug serta menambah fitur baru.",
        content: [
            "Dalam pengembangan aplikasi web modern, pemisahan tanggung jawab menjadi praktik dasar yang menjaga kode tetap rapi dan mudah dibaca.",
            "HTML berfungsi sebagai kerangka semantik dokumen, CSS mengatur tata letak dan tampilan visual, sementara JavaScript menangani interaksi pengguna serta manipulasi DOM.",
            "Dengan struktur yang terpisah, pengembang dapat memperbarui desain tanpa merusak logika skrip maupun struktur konten."
        ]
    },
    {
        id: 2,
        title: "Metode Active Recall dan Spaced Repetition Meningkatkan Retensi Materi",
        category: "pendidikan",
        author: "Tim Edukasi",
        date: "19 November 2026",
        summary: "Menguji ingatan secara aktif dan mengulang materi pada interval waktu tertentu terbukti lebih efektif dibanding membaca ulang pasif.",
        content: [
            "Banyak pelajar menghabiskan waktu berjam-jam membaca ulang catatan tanpa benar-benar menguji pemahaman mereka sendiri.",
            "Teknik active recall mendorong otak mengambil informasi dari memori, sedangkan spaced repetition menjadwalkan pengulangan sebelum informasi memudar.",
            "Kombinasi keduanya membantu siswa memahami konsep inti sekaligus menghemat waktu belajar jangka panjang."
        ]
    },
    {
        id: 3,
        title: "Panduan Perawatan Berkala Skutik Harian agar Tetap Responsif",
        category: "otomotif",
        author: "Meja Otomotif",
        date: "18 November 2026",
        summary: "Pemeriksaan tekanan ban, kondisi rem, serta sistem kelistrikan dan pencahayaan menjadi kunci kenyamanan berkendara harian.",
        content: [
            "Kendaraan yang dipakai setiap hari membutuhkan pengecekan rutin agar performa mesin dan pengereman tetap optimal.",
            "Pastikan tekanan angin ban sesuai rekomendasi pabrikan, cek keausan kampas rem, dan periksa sambungan kabel lampu atau aksesori tambahan.",
            "Perawatan preventif kecil secara rutin jauh lebih hemat dibandingkan perbaikan darurat di jalan."
        ]
    },
    {
        id: 4,
        title: "Menata Ruang Kerja Minimalis untuk Menjaga Fokus Seharian",
        category: "gaya-hidup",
        author: "Rubrik Produktivitas",
        date: "17 November 2026",
        summary: "Pencahayaan yang cukup, meja bebas distraksi, dan jeda istirahat teratur membantu menjaga konsentrasi saat bekerja atau belajar.",
        content: [
            "Lingkungan fisik berpengaruh besar terhadap tingkat fokus dan kelelahan mata sepanjang hari.",
            "Menyimpan barang yang tidak diperlukan di luar jangkauan meja membantu mengurangi distraksi visual saat mengerjakan tugas.",
            "Padukan tata ruang yang rapi dengan jeda singkat setiap beberapa puluh menit agar energi mental tetap terjaga."
        ]
    }
];

let activeCategory = "all";
let searchQuery = "";

const newsGrid = document.getElementById("newsGrid");
const headlineBanner = document.getElementById("headlineBanner");
const sectionTitle = document.getElementById("sectionTitle");
const newsCount = document.getElementById("newsCount");
const emptyState = document.getElementById("emptyState");
const searchInput = document.getElementById("searchInput");
const categoryButtons = document.querySelectorAll(".cat-btn");
const resetHome = document.getElementById("resetHome");

const articleModal = document.getElementById("articleModal");
const closeModal = document.getElementById("closeModal");
const modalCategory = document.getElementById("modalCategory");
const modalTitle = document.getElementById("modalTitle");
const modalMeta = document.getElementById("modalMeta");
const modalBody = document.getElementById("modalBody");

function renderDate() {
    const dateEl = document.getElementById("currentDate");
    const now = new Date();
    dateEl.textContent = now.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}

function renderHeadline() {
    const lead = articles[0];
    headlineBanner.innerHTML = `
        <span class="headline-label">Berita Utama</span>
        <h1>${lead.title}</h1>
        <p>${lead.summary}</p>
        <div class="meta-text">${lead.author} &bull; ${lead.date} &bull; Klik untuk baca selengkapnya</div>
    `;
    headlineBanner.onclick = () => openArticleModal(lead);
}

function getFilteredArticles() {
    return articles.filter((item) => {
        const matchCategory = activeCategory === "all" || item.category === activeCategory;
        const keyword = searchQuery.trim().toLowerCase();
        const matchSearch =
            keyword === "" ||
            item.title.toLowerCase().includes(keyword) ||
            item.summary.toLowerCase().includes(keyword);
        return matchCategory && matchSearch;
    });
}

function renderNewsList() {
    const filtered = getFilteredArticles();
    newsGrid.innerHTML = "";

    sectionTitle.textContent =
        activeCategory === "all" ? "Berita Terbaru" : `Kategori: ${activeCategory.replace("-", " ")}`;
    newsCount.textContent = `${filtered.length} artikel`;

    if (filtered.length === 0) {
        emptyState.classList.remove("is-hidden");
        return;
    }

    emptyState.classList.add("is-hidden");

    filtered.forEach((article) => {
        const card = document.createElement("article");
        card.className = "news-card";
        card.innerHTML = `
            <div>
                <span class="badge">${article.category.replace("-", " ")}</span>
                <h3>${article.title}</h3>
                <p>${article.summary}</p>
            </div>
            <div class="card-footer">
                <span class="meta-text">${article.date}</span>
                <button type="button" class="read-btn" data-id="${article.id}">Baca &rarr;</button>
            </div>
        `;

        card.querySelector(".read-btn").addEventListener("click", () => openArticleModal(article));
        newsGrid.appendChild(card);
    });
}

function openArticleModal(article) {
    modalCategory.textContent = article.category.replace("-", " ");
    modalTitle.textContent = article.title;
    modalMeta.textContent = `${article.author} • ${article.date}`;
    modalBody.innerHTML = article.content.map((paragraph) => `<p>${paragraph}</p>`).join("");
    articleModal.classList.remove("is-hidden");
}

function closeArticleModal() {
    articleModal.classList.add("is-hidden");
}

categoryButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        categoryButtons.forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        activeCategory = btn.dataset.category;
        renderNewsList();
    });
});

searchInput.addEventListener("input", (event) => {
    searchQuery = event.target.value;
    renderNewsList();
});

closeModal.addEventListener("click", closeArticleModal);

articleModal.addEventListener("click", (event) => {
    if (event.target === articleModal) {
        closeArticleModal();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !articleModal.classList.contains("is-hidden")) {
        closeArticleModal();
    }
});

resetHome.addEventListener("click", (event) => {
    event.preventDefault();
    activeCategory = "all";
    searchQuery = "";
    searchInput.value = "";
    categoryButtons.forEach((btn) => {
        btn.classList.toggle("is-active", btn.dataset.category === "all");
    });
    renderNewsList();
});

renderDate();
renderHeadline();
renderNewsList();