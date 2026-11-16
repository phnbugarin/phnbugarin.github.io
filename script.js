/* =====================================================
   EDIT YOUR PROJECTS HERE
   -----------------------------------------------------
   youtube: paste a full YouTube link OR just the video ID.
   date:    YYYY-MM — used only to sort (newest on top).
   ===================================================== */
const PROJECTS = [
  {
    title: "HeraPrint Advertisement III",
    date: "2026-10",
    category: "Commercial",
    youtube: "https://youtu.be/mfZ5EOYXKv0",
    description:
      "A marketing-focused video for HeraPrint designed to strengthen brand awareness and showcase its print-on-demand offerings through engaging promotional content.",
    role: "Video Editor & Voice Over",
  },
  {
    title: "HeraPrint Advertisement II",
    date: "2026-09",
    category: "Commercial",
    youtube: "https://youtu.be/IMpIZoIhR_k",
    description:
      "A promotional video developed for HeraPrint, focusing on the platform's products and creative possibilities. Visual storytelling presents the brand and connects with potential customers.",
    role: "Video Editor & Voice Over",
  },
  {
    title: "HeraPrint Advertisement I",
    date: "2026-08",
    category: "Commercial",
    youtube: "https://youtu.be/WnTjlZa7W1w",
    description:
      "A promotional advertisement for HeraPrint, the Philippines' first print-on-demand marketplace. Introduces the platform and shows artists how to turn their designs into merchandise.",
    role: "Video Editor & Voice Over",
  },
  {
    title: "Church Tour Video",
    date: "2026-04",
    category: "Community",
    youtube: "https://youtu.be/vVrRSIn_DjU",
    description:
      "A virtual chapel tour introducing viewers to the facilities and spaces of The Church of Jesus Christ of Latter-day Saints, helping visitors get familiar with the chapel and its environment.",
    role: "Video Editor",
  },
  {
    title: "Mananatili - School Project",
    date: "2025-04",
    category: "Community",
    youtube: "https://youtu.be/BJmRkZk6gLo",
    description:
      "This is a video where I pretended to sing Mananatili by the band Cup of Joe. It is a group school project for Media Literacy but I decided to do it individually instead of joining any group.",
    role: "Video Editor",
  },
  {
    title: "FSY 2023 — Event Highlights",
    date: "2023-07",
    category: "Church",
    youtube: "https://youtu.be/_y9Xca4Hc5A",
    description:
      "A video documenting the five-day FSY 2023 experience — memorable moments, activities, performances and interactions, edited to capture the energy and friendships of the event.",
    role: "Video Editor",
  },
  {
    title: "FSY 2023 — Event Invitation Trailer",
    date: "2023-06",
    category: "Church",
    youtube: "https://youtu.be/t1IxkozsOJc",
    description:
      "An introductory promotional video for For the Strength of Youth (FSY) 2023, created to introduce the event and encourage youth participation through engaging visuals.",
    role: "Video Editor",
  },
  {
    title: "CCAHS-PA — Club Introduction & Orientation",
    date: "2023-03",
    category: "School",
    youtube: "https://youtu.be/YzG-Sl0LsmQ",
    description:
      "A series of promotional and informational videos introducing CCAHS-PA, its activities and its membership registration, including a collaboration with Tarlac State University.",
    role: "Videographer & Video Editor",
    recognition: "Media Arts Award",
  },
  {
    title: "Padayon — Cultural Show Trailer",
    date: "2023-02",
    category: "School",
    youtube: "https://youtu.be/f48TBTaxo7I",
    description:
      "A promotional trailer for Padayon, a school cultural show celebrating Filipino heritage, traditions and identity — told through visual storytelling and cinematic editing.",
    role: "Videographer & Video Editor",
    extra: "School Video Editor",
    recognition: "Media Arts Award",
  },
  {
    title: "Earthquakes",
    date: "2022-09",
    category: "School",
    youtube: "https://youtu.be/AoRoAQ5PZSo",
    description:
      "An educational short film made as a 10th grade school project. It covers the essential W's of earthquake preparedness: what to know and what to do before, during and after an earthquake.",
    role: "Director of Photography, Videographer & Video Editor",
  },
];

/* ---------- helpers ---------- */
const $ = (s, el = document) => el.querySelector(s);
const root = $("#timeline-root");
const filtersEl = $("#filters");

const parseYouTubeId = (v) => {
  if (!v) return "";
  const m = String(v).match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
  if (m) return m[1];
  return /^[\w-]{11}$/.test(v) ? v : "";
};

const esc = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );

/* newest first */
const sorted = [...PROJECTS].sort((a, b) => b.date.localeCompare(a.date));

/* ---------- build filters ---------- */
const categories = ["All", ...new Set(sorted.map((p) => p.category))];
categories.forEach((c, i) => {
  const b = document.createElement("button");
  b.className = "chip" + (i === 0 ? " is-active" : "");
  b.textContent = c;
  b.dataset.cat = c;
  filtersEl.appendChild(b);
});

/* ---------- build timeline ---------- */
const byYear = sorted.reduce((acc, p) => {
  const y = p.date.slice(0, 4);
  (acc[y] ||= []).push(p);
  return acc;
}, {});

Object.keys(byYear)
  .sort((a, b) => b - a)
  .forEach((year) => {
    const group = document.createElement("div");
    group.className = "year-group";
    group.dataset.year = year;
    group.innerHTML = `<div class="year"><span>${year}</span></div>`;

    byYear[year].forEach((p, idx) => {
      const id = parseYouTubeId(p.youtube);

      const el = document.createElement("article");
      el.className = "entry";
      el.dataset.category = p.category;
      el.innerHTML = `
        <button class="video" type="button" aria-label="Play ${esc(p.title)}" data-id="${id}">
          <img class="video__thumb" src="https://img.youtube.com/vi/${id}/hqdefault.jpg" alt="${esc(p.title)} thumbnail" loading="lazy" />
          <span class="video__play"></span>
        </button>
        <div class="entry__body">
          <h3 class="entry__title">${esc(p.title)}</h3>
          <p class="entry__desc">${esc(p.description)}</p>
          <dl class="entry__rows">
            <div><dt>Role</dt><dd>${esc(p.role)}</dd></div>
            ${p.extra ? `<div><dt>Also</dt><dd>${esc(p.extra)}</dd></div>` : ""}
          </dl>
          ${p.recognition ? `<span class="badge">${esc(p.recognition)}</span>` : ""}
        </div>`;
      group.appendChild(el);
    });
    root.appendChild(group);
  });

/* ---------- video click → embed ---------- */
root.addEventListener("click", (e) => {
  const btn = e.target.closest(".video");
  if (!btn || btn.querySelector("iframe")) return;
  const id = btn.dataset.id;
  if (!id) return;
  btn.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0" title="YouTube video" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
});

/* ---------- filters ---------- */
filtersEl.addEventListener("click", (e) => {
  const chip = e.target.closest(".chip");
  if (!chip) return;
  filtersEl
    .querySelectorAll(".chip")
    .forEach((c) => c.classList.toggle("is-active", c === chip));
  const cat = chip.dataset.cat;
  document.querySelectorAll(".entry").forEach((en) => {
    en.classList.toggle(
      "is-hidden",
      cat !== "All" && en.dataset.category !== cat,
    );
  });
  document.querySelectorAll(".year-group").forEach((g) => {
    const any = [...g.querySelectorAll(".entry")].some(
      (en) => !en.classList.contains("is-hidden"),
    );
    g.style.display = any ? "" : "none";
  });
  updateProgress();
});

/* ---------- reveal on scroll ---------- */
const io = new IntersectionObserver(
  (entries) =>
    entries.forEach(
      (en) => en.isIntersecting && en.target.classList.add("is-visible"),
    ),
  { threshold: 0.15 },
);
document.querySelectorAll(".entry").forEach((el) => io.observe(el));

/* ---------- timeline progress line ---------- */
const progress = $("#progress");
function updateProgress() {
  const rect = root.getBoundingClientRect();
  const view = window.innerHeight * 0.6;
  const filled = Math.min(Math.max(view - rect.top, 0), rect.height);
  progress.style.height = filled + "px";
}
window.addEventListener("scroll", updateProgress, { passive: true });
window.addEventListener("resize", updateProgress);
updateProgress();

/* ---------- stats, year ---------- */
const years = sorted.map((p) => +p.date.slice(0, 4));
const first = Math.min(...years);

const targets = {
  projects: PROJECTS.length,
  years: new Date().getFullYear() - first + 1,
};
document.querySelectorAll("[data-count]").forEach((el) => {
  const to = targets[el.dataset.count];
  let n = 0;
  const step = () => {
    n += Math.max(1, Math.round(to / 20));
    el.textContent =
      Math.min(n, to) + (el.dataset.count === "projects" ? "+" : "");
    if (n < to) requestAnimationFrame(step);
  };
  new IntersectionObserver(([en], ob) => {
    if (en.isIntersecting) {
      step();
      ob.disconnect();
    }
  }).observe(el);
});

$("#year").textContent = new Date().getFullYear();
