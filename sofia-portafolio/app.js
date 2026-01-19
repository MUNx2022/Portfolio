/* =========================
   NAV (Home / Projects / CV)
   ========================= */

const buttons = document.querySelectorAll(".folder-tile");
const views = document.querySelectorAll(".view");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.view;

    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    views.forEach(view => {
      view.classList.remove("active");
      if (view.id === target) view.classList.add("active");
    });
  });
});

/* =========================
   PROJECTS
   ========================= */

const projectButtons = document.querySelectorAll(".project-folder");
const detailTitle = document.getElementById("detailTitle");
const detailTag = document.getElementById("detailTag");
const detailDesc = document.getElementById("detailDesc");
const projectDetail = document.getElementById("projectDetail");
const projectsIndex = document.getElementById("projectsIndex");

const pdfBox = document.getElementById("pdfBox");
const mediaBox = document.getElementById("mediaBox");
const pdfDownload = document.getElementById("pdfDownload");
const backToIndex = document.getElementById("backToIndex");

// Where we inject the iframe (the div that currently says "PDF preview area ...")
const pdfPlaceholder = pdfBox?.querySelector(".pdf-placeholder");

const descriptions = {
  p1: "This project explores the redesign of a rotary cutting blade using biomimetic principles inspired by humpback whale flippers. These flippers feature tubercles along their leading edge that help control flow, delay separation, and reduce aerodynamic losses. Based on physical analysis and flow simulations, a new blade geometry with a wavy leading edge was developed and modeled in SolidWorks, allowing air and particles to be more efficiently channeled toward the blade tips. This reduces material recirculation, improves debris evacuation after impact, and promotes a more uniform pressure distribution, which can lead to lower wear, reduced torque demand, and more efficient cutting. The result is a design that blends physics, nature, and simulation to propose a smarter and more efficient alternative to conventional blades.",
  p2: "This project focuses on understanding and optimizing the annealing of steel coils, a thermal process in which temperature and time control the final microstructure and mechanical properties of the material. Using thousands of real furnace runs, I built a data analysis pipeline that links process variables such as thermal cycles, saturation times, coil geometry, and furnace configuration to outcomes like strength, elongation, and yield point. Through statistical analysis and dimensionality reduction (PCA), the model reveals how different furnace conditions can produce markedly different mechanical behavior even for the same steel grade, highlighting the physical trade-offs imposed by annealing. These insights are integrated into an interactive interface that allows users to explore scenarios, compare configurations, and guide thermal process decisions within physical constraints.",
  p3: "Optical design, component selection, and fabrication workflow for a Newtonian telescope prototype.",
  p4: "Exploration of simulated annealing and random models with emphasis on optimization and stochastic behavior.",
  p5: "Fundamental quantum model: infinite potential well in 1D, eigenstates, energy levels, and boundary conditions.",
  p6: "3D quantum systems: spherical harmonics, central potentials, and interpretation of angular momentum states.",
  p7: "Derivation and visualization of magnetic fields from charges in circular motion using electrodynamics and math tools.",
  p8: "Experimental rocketry work, testing, builds, and documentation (media-focused showcase).",
  p9: "STEM outreach program: teaching engineering fundamentals through hands-on activities and team mentoring."
};

function setPdfViewer(pdfUrl) {
  if (!pdfBox || !pdfDownload || !pdfPlaceholder) return;

  // show pdf box
  pdfBox.classList.remove("hidden");

  // Inject clean iframe preview
  pdfPlaceholder.innerHTML = `
    <iframe
      class="project-pdf-frame"
      src="${pdfUrl}#view=FitH"
      title="Project PDF Preview">
    </iframe>
  `;

  // Download button
  pdfDownload.href = pdfUrl;
  pdfDownload.textContent = "Download PDF";
  pdfDownload.setAttribute("download", "");
}

function clearPdfViewer() {
  if (!pdfBox || !pdfDownload || !pdfPlaceholder) return;

  // Clear iframe / content
  pdfPlaceholder.innerHTML = `PDF preview area (iframe or PDF.js later)`;

  // Reset download button
  pdfDownload.href = "#";
  pdfDownload.textContent = "Download (soon)";
  pdfDownload.removeAttribute("download");
}

function clearMediaGallery() {
  if (!mediaBox) return;
  const mediaPlaceholder = mediaBox.querySelector(".media-placeholder");
  if (!mediaPlaceholder) return;
  mediaPlaceholder.innerHTML = "3–4 images/videos gallery goes here";
}

let carouselTimer = null;

function stopCarousel() {
  if (carouselTimer) {
    clearInterval(carouselTimer);
    carouselTimer = null;
  }
}

function renderMediaGallery(mediaStr) {
  if (!mediaBox) return;

  const mediaPlaceholder = mediaBox.querySelector(".media-placeholder");
  if (!mediaPlaceholder) return;

  stopCarousel();

  if (!mediaStr || !mediaStr.trim()) {
    mediaPlaceholder.innerHTML = "3–4 images/videos gallery goes here";
    return;
  }

  const items = mediaStr.split("|").map(s => s.trim()).filter(Boolean);
  let idx = 0;

  function isVideo(src) {
    const lower = src.toLowerCase();
    return lower.endsWith(".mp4") || lower.endsWith(".webm");
  }

  function renderSlide() {
    const src = items[idx];

    const slideHtml = isVideo(src)
      ? `<video class="carousel-media" src="${src}" controls preload="metadata"></video>`
      : `<img class="carousel-media" src="${src}" alt="Project media ${idx + 1}" />`;

    mediaPlaceholder.innerHTML = `
      <div class="carousel">
        <div class="carousel-stage">
          ${slideHtml}
        </div>

        <div class="carousel-ui">
          <button class="carousel-btn" id="carPrev" type="button" aria-label="Previous">◀</button>
          <div class="carousel-dots" aria-label="Slides">
            ${items.map((_, i) => `
              <button class="dot ${i === idx ? "active" : ""}" data-dot="${i}" type="button" aria-label="Go to slide ${i + 1}"></button>
            `).join("")}
          </div>
          <button class="carousel-btn" id="carNext" type="button" aria-label="Next">▶</button>
        </div>
      </div>
    `;

    const prev = mediaPlaceholder.querySelector("#carPrev");
    const next = mediaPlaceholder.querySelector("#carNext");

    prev?.addEventListener("click", () => {
      idx = (idx - 1 + items.length) % items.length;
      renderSlide();
      restartAuto();
    });

    next?.addEventListener("click", () => {
      idx = (idx + 1) % items.length;
      renderSlide();
      restartAuto();
    });

    mediaPlaceholder.querySelectorAll(".dot").forEach(d => {
      d.addEventListener("click", () => {
        idx = Number(d.dataset.dot);
        renderSlide();
        restartAuto();
      });
    });
  }

  function restartAuto() {
    stopCarousel();
    carouselTimer = setInterval(() => {
      idx = (idx + 1) % items.length;
      renderSlide();
    }, 3500);
  }

  renderSlide();
  restartAuto();
}


projectButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const id = btn.dataset.project;
    const title = btn.dataset.title;
    const tag = btn.dataset.tag;
    const hasPdf = btn.dataset.hasPdf === "true";
    const pdfUrl = btn.dataset.pdf || "";
    const mediaStr = btn.dataset.media || "";

    detailTitle.textContent = title || "Project";
    detailTag.textContent = tag || "";
    detailDesc.textContent = descriptions[id] || "Project description coming soon.";

    if (hasPdf && pdfUrl) {
      // show pdf, hide media
      mediaBox?.classList.add("hidden");
      clearMediaGallery();
      setPdfViewer(pdfUrl);
      pdfBox?.classList.remove("hidden");
    } else {
      // show media, hide pdf
      pdfBox?.classList.add("hidden");
      clearPdfViewer();
      mediaBox?.classList.remove("hidden");
      renderMediaGallery(mediaStr);
    }

    // smooth scroll to detail
    projectDetail?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

backToIndex?.addEventListener("click", () => {
  projectsIndex?.scrollIntoView({ behavior: "smooth", block: "start" });
});
