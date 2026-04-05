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
  p3: "This project focused on the mechanical and optical design of a Newtonian reflecting telescope, with particular emphasis on CAD modeling and component integration. Based on optical requirements such as focal length, aperture, and alignment, I developed a parametric model in Fusion 360 that organizes the telescope into functional modules: primary mirror support, an adjustable midsection, and the secondary mirror and eyepiece assembly. The design prioritizes adjustability and manufacturability, incorporating 3D-printed components with controlled tolerances that allow variations in mirror separation and the use of different eyepieces without compromising alignment. The final structure is stable, modular, and reproducible, directly translating optical calculations into a functional physical system validated through assembly and experimental testing.",
  p4: "This project was developed for the Materials Characterization course and focuses on the design of a vacuum chamber for the electrical characterization of potential carbon-based sensors. Since my university does not currently have the equipment required to perform this type of analysis under controlled vacuum conditions, I designed this system as a proposal to enable future experimental studies. The chamber was conceived to provide a controlled environment for analyzing the electrical behavior of carbon materials while integrating vacuum generation, pressure measurement, thermal control, and electrical feedthroughs. This project connects materials science, instrumentation, and engineering design to create a functional platform for evaluating the potential of carbon-based materials as sensing devices.",
  p5: "This project was developed for the Quantum Systems Analysis course and explores the dynamics of quantum particles confined in one-dimensional potential wells. Through analytical derivations and numerical simulations in MATLAB, I studied the time evolution of wave functions in both infinite and finite potential wells, demonstrating phenomena such as quantum revivals, probability density oscillations, and the effect of initial momentum on particle dynamics. The work covers normalization of eigenstates, computation of expansion coefficients, and visualization of probability densities and expected position values across different initial conditions including stationary Gaussian pulses and traveling wave packets.",
  p6: "This project was developed for the Quantum Systems Analysis course and extends the study of quantum mechanics to three-dimensional systems. It covers the numerical evaluation of spherical harmonics, the expansion of arbitrary functions defined on the unit sphere in terms of this orthonormal basis, and the dynamics of a free particle confined to a spherical surface. As applied examples, I modeled the harmonic spectrum of a tennis ball surface function illustrating the Gibbs phenomenon from its seam discontinuity and computed measurement probabilities for energy and angular momentum from a Gaussian wave packet initial state. Visualizations were produced using the Hammer cartographic projection to map spherical data onto a two-dimensional plane.",
  p7: "This project was developed for the Foundations of Electrodynamics course and investigates the magnetic fields generated by two distinct configurations: a point charge in circular motion and a steady current-carrying loop. For the discrete charge case, I derived the time-dependent magnetic field analytically in cylindrical coordinates and computed the Lorentz forces between two interacting charges moving in different geometries. For the current loop, I used the Biot–Savart law combined with complete elliptic integrals to obtain closed-form expressions for both the magnetic field and the magnetic vector potential, verifying their mutual consistency and confirming that the Coulomb gauge condition is satisfied.",
  p8: "This project involves my work in Monterrey Rocket Lab, where I focus on the design, analysis, and testing of solid rocket propulsion systems. As part of the propulsion team, I contribute to the development of motors by integrating principles of thermodynamics, fluid dynamics, and combustion into practical engineering solutions. My work includes the characterization of propellants, analysis of burn behavior, and interpretation of experimental data from static tests, connecting theoretical models with real system performance. This process requires both computational tools and hands-on experimentation, from understanding internal ballistics to evaluating how design parameters affect thrust, pressure, and overall system efficiency.",
  p9: "This project consists of the creation and implementation of Motores de Ideas, a STEM outreach initiative developed to inspire middle school students in Capana Altamira to continue their education and explore opportunities in science and engineering. I designed the program from the ground up, structuring sessions that introduce fundamental concepts in physics and mathematics through clear explanations, real-world examples, and hands-on activities. The initiative focuses on making abstract ideas accessible and engaging, helping students build intuition and confidence in subjects that are often perceived as difficult. By combining theory with practical challenges, the program encourages critical thinking, curiosity, and problem-solving, while motivating students to see education as a pathway to future opportunities in STEM fields.",
  p10: "This project explores the synthesis and physical characterization of carbon nanotubes (CNTs), materials with exceptional mechanical, electrical, and thermal properties that position them as key candidates for next-generation sensors, composites, and energy systems. The first part of the project covers the synthesis process, examining the conditions and methods used to produce CNTs with controlled properties. The second part focuses on their characterization using spectroscopic and microscopic techniques, including Raman spectroscopy, UV-Vis absorption, and electron microscopy, to assess structural quality, purity, and physical behavior. Together, these two reports document the full pipeline from material production to property evaluation, connecting synthesis decisions to measurable outcomes in the final material."
};

function setPdfViewer(pdfUrl, pdfUrl2) {
  if (!pdfBox || !pdfDownload || !pdfPlaceholder) return;

  pdfBox.classList.remove("hidden");

  // Render toggle buttons if two PDFs exist
  const topbar = pdfBox.querySelector(".pdf-topbar");
  if (pdfUrl2 && topbar) {
    topbar.innerHTML = `
      <div class="pdf-toggle">
        <button class="pdf-toggle-btn active" data-pdf="${pdfUrl}">Synthesis</button>
        <button class="pdf-toggle-btn" data-pdf="${pdfUrl2}">Characterization</button>
      </div>
      <a id="pdfDownload" class="pdf-download" href="${pdfUrl}" download>Download</a>
    `;

    topbar.querySelectorAll(".pdf-toggle-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        topbar.querySelectorAll(".pdf-toggle-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const url = btn.dataset.pdf;
        pdfPlaceholder.innerHTML = `
          <iframe class="project-pdf-frame" src="${url}#view=FitH" title="Project PDF Preview"></iframe>
        `;
        topbar.querySelector("#pdfDownload").href = url;
      });
    });
  } else if (topbar) {
    topbar.innerHTML = `
      <span class="pdf-label">PDF Preview</span>
      <a id="pdfDownload" class="pdf-download" href="${pdfUrl}" download>Download</a>
    `;
  }

  pdfPlaceholder.innerHTML = `
    <iframe
      class="project-pdf-frame"
      src="${pdfUrl}#view=FitH"
      title="Project PDF Preview">
    </iframe>
  `;
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
    });

    next?.addEventListener("click", () => {
      idx = (idx + 1) % items.length;
      renderSlide();
    });

    mediaPlaceholder.querySelectorAll(".dot").forEach(d => {
      d.addEventListener("click", () => {
        idx = Number(d.dataset.dot);
        renderSlide();
      });
    });
  }

  renderSlide();
}


projectButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const id = btn.dataset.project;
    const title = btn.dataset.title;
    const tag = btn.dataset.tag;
    const hasPdf = btn.dataset.hasPdf === "true";
    const pdfUrl = btn.dataset.pdf || "";
    const pdfUrl2 = btn.dataset.pdf2 || "";
    const mediaStr = btn.dataset.media || "";
    const extLink = btn.dataset.link || "";

    detailTitle.textContent = title || "Project";
    detailTag.textContent = tag || "";
    detailDesc.textContent = descriptions[id] || "Project description coming soon.";

    // Instagram / external link button
    const detailActions = document.querySelector(".detail-actions");
    const existingExtBtn = detailActions?.querySelector(".ext-link-btn");
    if (existingExtBtn) existingExtBtn.remove();
    if (extLink && detailActions) {
      const extBtn = document.createElement("a");
      extBtn.href = extLink;
      extBtn.target = "_blank";
      extBtn.rel = "noreferrer";
      extBtn.className = "ghost-btn ext-link-btn";
      extBtn.textContent = "Instagram ↗";
      detailActions.appendChild(extBtn);
    }

    if (hasPdf && pdfUrl) {
      mediaBox?.classList.add("hidden");
      clearMediaGallery();
      setPdfViewer(pdfUrl, pdfUrl2);
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