/**
 * Akshendra's Portfolio Controller
 * Supports clickable project cards, multi-image/video galleries,
 * full-screen media expander lightbox, and booking modal.
 */

document.addEventListener('DOMContentLoaded', () => {
  renderProjects();
  initMediaLightbox();
  initBookingModal();
  initMobileMenu();
});

const BOOKING_URL = 'https://cal.com/aksh.automates/project-consultation';

let currentProject = null;
let currentGalleryIndex = 0;

/* ==========================================================================
   1. RENDER FEATURED PROJECTS
   ========================================================================== */
function renderProjects() {
  const container = document.getElementById('projects-grid');
  if (!container || typeof projectsData === 'undefined') return;

  container.innerHTML = projectsData.map((project) => {
    const isVideo = project.mediaType === 'video';
    const mediaBadge = isVideo ? '▶ Video Preview' : '🔍 Click to Expand';
    const previewUrl = project.posterUrl || project.mediaUrl;

    return `
      <article class="project-card" data-project-id="${project.id}" tabindex="0" role="button" aria-label="Open ${project.title}">
        <!-- Thumbnail / Media Preview -->
        <div class="project-thumbnail-wrap">
          ${isVideo && previewUrl.endsWith('.mp4') ? `
            <video src="${previewUrl}" muted playsinline loop onmouseover="this.play()" onmouseout="this.pause()" class="project-thumbnail-img"></video>
          ` : `
            <img src="${previewUrl}" alt="${project.title}" class="project-thumbnail-img" loading="lazy" />
          `}
          <div class="media-expand-overlay">
            <span class="expand-badge-pill">${mediaBadge}</span>
          </div>
        </div>

        <!-- Content -->
        <div class="project-card-content">
          <div class="project-category-tag">${project.category}</div>
          <h3 class="project-card-title">${project.title}</h3>
          
          <div class="project-card-description">
            <p>${project.problem.split(/[.!?](?:\s|$)/)[0]}.</p>
          </div>

          ${project.tags && project.tags.length ? `
            <div class="project-tags-wrap">
              ${project.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}
            </div>
          ` : ''}

          <div class="project-view-details" aria-hidden="true">View details <span>→</span></div>
        </div>
      </article>
    `;
  }).join('');

  // Attach click listeners to cards
  const cards = container.querySelectorAll('.project-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const projectId = card.dataset.projectId;
      openMediaLightbox(projectId);
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const projectId = card.dataset.projectId;
        openMediaLightbox(projectId);
      }
    });
  });
}

/* ==========================================================================
   2. MEDIA LIGHTBOX / FULL-SCREEN EXPANDER (PICTURES & VIDEOS)
   ========================================================================== */
function initMediaLightbox() {
  const lightbox = document.getElementById('media-lightbox');
  const closeBtn = document.getElementById('lightbox-close-btn');

  if (!lightbox) return;

  if (closeBtn) {
    closeBtn.addEventListener('click', closeMediaLightbox);
  }

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeMediaLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;

    if (e.key === 'Escape') {
      closeMediaLightbox();
    } else if (e.key === 'ArrowRight') {
      navigateGallery(1);
    } else if (e.key === 'ArrowLeft') {
      navigateGallery(-1);
    }
  });
}

function openMediaLightbox(projectId) {
  if (typeof projectsData === 'undefined') return;
  const project = projectsData.find(p => p.id === projectId);
  if (!project) return;

  currentProject = project;
  currentGalleryIndex = 0;

  const lightbox = document.getElementById('media-lightbox');
  const badge = document.getElementById('lightbox-badge');
  const title = document.getElementById('lightbox-title');
  const problem = document.getElementById('lightbox-problem');
  const solution = document.getElementById('lightbox-solution');
  const result = document.getElementById('lightbox-result');
  const tools = document.getElementById('lightbox-tools');
  const link = document.getElementById('lightbox-project-link');

  // Populate Meta & Texts
  if (badge) badge.textContent = project.category;
  if (title) title.textContent = project.title;
  if (problem) problem.textContent = project.problem;
  if (solution) solution.textContent = project.solution;
  if (result) result.textContent = project.result;

  if (tools) {
    tools.innerHTML = project.tags && project.tags.length
      ? `<span class="lightbox-tools-label">Tools used</span>${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}`
      : '';
    tools.style.display = project.tags && project.tags.length ? 'flex' : 'none';
  }

  if (link) {
    if (project.projectUrl && project.projectUrl !== '#') {
      link.href = project.projectUrl;
      link.style.display = 'inline-flex';
    } else {
      link.style.display = 'none';
    }
  }

  renderActiveMedia();
  renderGalleryThumbnails();

  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function renderActiveMedia() {
  const viewer = document.getElementById('lightbox-viewer');
  if (!viewer || !currentProject) return;

  // Determine media item: gallery array or single fallback
  const gallery = currentProject.gallery && currentProject.gallery.length 
    ? currentProject.gallery 
    : [{ type: currentProject.mediaType || 'image', url: currentProject.mediaUrl }];

  const currentItem = gallery[currentGalleryIndex] || gallery[0];
  const isVideo = currentItem.type === 'video';

  if (isVideo) {
    if (currentItem.url.includes('youtube.com') || currentItem.url.includes('loom.com') || currentItem.url.includes('vimeo.com')) {
      viewer.innerHTML = `
        <div class="video-embed-wrap">
          <iframe src="${currentItem.url}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      `;
    } else {
      viewer.innerHTML = `
        <video controls autoplay playsinline class="lightbox-expanded-video">
          <source src="${currentItem.url}" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      `;
    }
  } else {
    viewer.innerHTML = `
      <div class="lightbox-image-container" id="lightbox-img-wrap" title="Click to expand full screen on this page">
        <img src="${currentItem.url}" alt="${currentProject.title}" class="lightbox-expanded-img" id="active-lightbox-img" />
        <div class="zoom-hint-pill">🔍 Click to zoom full screen</div>
      </div>
    `;

    const imgWrap = document.getElementById('lightbox-img-wrap');
    if (imgWrap) {
      imgWrap.addEventListener('click', () => {
        openInPageFullscreen(currentItem.url, currentProject.title);
      });
    }
  }
}

function renderGalleryThumbnails() {
  const container = document.getElementById('lightbox-gallery-nav');
  if (!container || !currentProject) return;

  const gallery = currentProject.gallery;
  if (!gallery || gallery.length <= 1) {
    container.style.display = 'none';
    return;
  }

  container.style.display = 'flex';
  container.innerHTML = gallery.map((item, idx) => `
    <button 
      class="gallery-thumb-btn ${idx === currentGalleryIndex ? 'active' : ''}" 
      onclick="setGalleryIndex(${idx})"
      aria-label="View media ${idx + 1}"
    >
      ${item.type === 'video' ? '▶ Video' : `<img src="${item.url}" alt="Thumbnail ${idx + 1}" />`}
    </button>
  `).join('');
}

function setGalleryIndex(index) {
  currentGalleryIndex = index;
  renderActiveMedia();
  renderGalleryThumbnails();
}

function navigateGallery(direction) {
  if (!currentProject || !currentProject.gallery || currentProject.gallery.length <= 1) return;
  const len = currentProject.gallery.length;
  currentGalleryIndex = (currentGalleryIndex + direction + len) % len;
  renderActiveMedia();
  renderGalleryThumbnails();
}

function closeMediaLightbox() {
  const lightbox = document.getElementById('media-lightbox');
  const viewer = document.getElementById('lightbox-viewer');
  closeInPageFullscreen();
  if (lightbox) {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    if (viewer) {
      viewer.innerHTML = '';
    }
  }
}

/* ==========================================================================
   IN-PAGE FULLSCREEN MEDIA ZOOM OVERLAY (NO NEW TABS)
   ========================================================================== */
function openInPageFullscreen(url, title) {
  let overlay = document.getElementById('inpage-fullscreen-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'inpage-fullscreen-overlay';
    overlay.className = 'inpage-fullscreen-overlay';
    overlay.innerHTML = `
      <button class="fullscreen-close-btn" id="fs-close-btn" title="Close zoom (Esc)">✕</button>
      <div class="fullscreen-content-wrap">
        <img id="fs-expanded-img" src="" alt="" />
      </div>
      <div class="fs-hint-bar">Click anywhere or press Esc to exit full screen</div>
    `;
    document.body.appendChild(overlay);

    overlay.addEventListener('click', (e) => {
      if (e.target.id !== 'fs-expanded-img') {
        closeInPageFullscreen();
      }
    });

    const closeBtn = document.getElementById('fs-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', closeInPageFullscreen);
    }
  }

  const fsImg = document.getElementById('fs-expanded-img');
  if (fsImg) {
    fsImg.src = url;
    fsImg.alt = title || 'Expanded View';
  }

  overlay.classList.add('active');
}

function closeInPageFullscreen() {
  const overlay = document.getElementById('inpage-fullscreen-overlay');
  if (overlay && overlay.classList.contains('active')) {
    overlay.classList.remove('active');
  }
}

/* ==========================================================================
   3. BOOKING / CONTACT MODAL
   ========================================================================== */
function initBookingModal() {
  const triggerBtns = document.querySelectorAll('.open-booking-modal');

  triggerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.assign(BOOKING_URL);
    });
  });
}

/* ==========================================================================
   4. MOBILE MENU
   ========================================================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      const isVisible = navLinks.style.display === 'flex';
      if (isVisible) {
        navLinks.style.display = 'none';
        menuBtn.textContent = '☰';
      } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.backgroundColor = '#0b0c0e';
        navLinks.style.padding = '1.5rem';
        navLinks.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
        menuBtn.textContent = '✕';
      }
    });
  }
}
