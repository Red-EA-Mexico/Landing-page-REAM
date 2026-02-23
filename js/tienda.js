/**
 * Tienda — Red EA México
 * Carga productos desde data/tienda.json, proyectos desde data/projects.json.
 * Cada producto muestra qué financia, el área de impacto (con imagen) y el proyecto vinculado.
 */
(function () {
  'use strict';

  const FALLBACK_AREAS = [
    { id: 'educacion-ai-safety', nombre: 'Educación en AI Safety', imagen: '', descripcionCorta: 'Sesiones de discusión y formación técnica en seguridad de la IA' },
    { id: 'ai-governance', nombre: 'Educación en AI Governance', imagen: '', descripcionCorta: 'Sesiones de discusión en Gobernanza y políticas para el desarrollo responsable de la IA' },
    { id: 'seguridad-informacion', nombre: 'Seguridad de la información', imagen: '', descripcionCorta: 'Sesiones de discusión y formación técnica en seguridad de la información' },
    { id: 'animal-welfare', nombre: 'Animal Welfare', imagen: '', descripcionCorta: 'Sesiones de discusión y formación técnica en mejorar el Bienestar animal y defensa de los animales con IA' },
  ];

  const FALLBACK_PRODUCTS = [
    { id: 'prod-1', nombre: 'Playera AI Safety', descripcion: 'Playera negra unisex.', precio: '350', moneda: 'MXN', imagen: '', categoria: 'Ropa', link: '', financia: '1 sesión de formación estudiantil', areaImpacto: 'educacion-ai-safety' },
    { id: 'prod-2', nombre: 'Playera Red EA México', descripcion: 'Playera unisex con logo de la Red.', precio: '350', moneda: 'MXN', imagen: '', categoria: 'Ropa', link: '', financia: 'Sesiones de organización con grupos locales', areaImpacto: 'educacion-ai-safety' },
    { id: 'prod-3', nombre: 'Playera AI & Animal Welfare', descripcion: 'Playera unisex con logo de la Red.', precio: '350', moneda: 'MXN', imagen: '', categoria: 'Ropa', link: '', financia: '1 sesión de formación estudiantil', areaImpacto: 'educacion-ai-animal-welfare' },
    { id: 'prod-3', nombre: 'Playera AI & Seguridad de la información', descripcion: 'Playera unisex con logo de la Red.', precio: '350', moneda: 'MXN', imagen: '', categoria: 'Ropa', link: '', financia: '1 sesión de formación estudiantil', areaImpacto: 'educacion-seguridad-informacion' },
    { id: 'prod-3', nombre: 'Tote bag Animal Welfare', descripcion: 'Bolsa de tela reutilizable con diseño de la Red.', precio: '250', moneda: 'MXN', imagen: '', categoria: 'Accesorios', link: '', financia: 'Investigación en bienestar animal y defensa de los animales con IA', areaImpacto: 'ai-governance' },
    { id: 'prod-4', nombre: 'Lanyards', descripcion: 'Cintas para portar tus pins y badges de la Red EA.', precio: '150', moneda: 'MXN', imagen: '', categoria: 'Accesorios', link: '', financia: '1 sesión de formación estudiantil', areaImpacto: 'educacion-ai-safety', proyectoSlug: '' },
    { id: 'prod-5', nombre: 'Sticker pack', descripcion: 'Set de stickers con frases de EA.', precio: '99', moneda: 'MXN', imagen: '', categoria: 'Accesorios', link: '', financia: 'Difusión y materiales para nuevos miembros', areaImpacto: 'educacion-ai-safety', proyectoSlug: '' },
  ];

  function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function getAreaById(areas, id) {
    if (!id || !Array.isArray(areas)) return null;
    return areas.find((a) => a.id === id) || null;
  }

  function getProjectBySlug(projects, slug) {
    if (!slug || !Array.isArray(projects)) return null;
    return projects.find((p) => (p.slug || '').toLowerCase() === String(slug).toLowerCase()) || null;
  }

  function renderArea(area) {
    const imgSrc = area.imagen && String(area.imagen).trim() ? area.imagen : '';
    const imgHtml = imgSrc
      ? `<img src="${escapeHtml(imgSrc)}" alt="${escapeHtml(area.nombre)}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling&&this.nextElementSibling.classList.remove('tienda-area-placeholder--hidden');">`
      : '';
    const placeholderClass = imgSrc ? 'tienda-area-placeholder tienda-area-placeholder--hidden' : 'tienda-area-placeholder';
    return `
      <div class="tienda-area-card" data-area="${escapeHtml(area.id)}">
        <div class="tienda-area-image-wrap">
          ${imgHtml}
          <div class="${placeholderClass}" aria-hidden="true"><span>${escapeHtml((area.nombre || '').charAt(0))}</span></div>
        </div>
        <div class="tienda-area-body">
          <span class="tienda-area-name">${escapeHtml(area.nombre || '')}</span>
          ${area.descripcionCorta ? `<span class="tienda-area-desc">${escapeHtml(area.descripcionCorta)}</span>` : ''}
        </div>
      </div>
    `;
  }

  function renderProduct(p, areas, projects) {
    const imgSrc = p.imagen && String(p.imagen).trim() ? p.imagen : '';
    const imgHtml = imgSrc
      ? `<img src="${escapeHtml(imgSrc)}" alt="${escapeHtml(p.nombre)}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling&&this.nextElementSibling.classList.remove('tienda-card-placeholder--hidden');">`
      : '';
    const placeholderClass = imgSrc ? 'tienda-card-placeholder tienda-card-placeholder--hidden' : 'tienda-card-placeholder';
    const precioStr = p.moneda ? `${p.moneda} $${escapeHtml(p.precio)}` : `$${escapeHtml(p.precio)}`;
    const hasLink = p.link && String(p.link).trim();

    const area = getAreaById(areas, p.areaImpacto);
    const project = getProjectBySlug(projects, p.proyectoSlug);
    const proyectosUrl = 'index.html#Curriculums';

    let impactBlock = '';
    if (area) {
      const areaImg = area.imagen && String(area.imagen).trim()
        ? `<img src="${escapeHtml(area.imagen)}" alt="" class="tienda-card-impact-img" loading="lazy" onerror="this.style.display='none'">`
        : '';
      impactBlock = `
        <div class="tienda-card-impact" aria-label="Área de impacto">
          ${areaImg}
          <span class="tienda-card-impact-name">${escapeHtml(area.nombre)}</span>
        </div>
      `;
    }

    const financiaBlock = p.financia
      ? `<p class="tienda-card-financia">Esta compra financia <strong>${escapeHtml(p.financia)}</strong>.</p>`
      : '';

    const projectBlock = project
      ? `<a href="${escapeHtml(proyectosUrl)}" class="tienda-card-proyecto-link">Ver proyecto: ${escapeHtml(project.nombre)}</a>`
      : '';

    const productCta = hasLink
      ? `<a href="${escapeHtml(p.link)}" target="_blank" rel="noopener" class="tienda-card-cta">Ver producto</a>`
      : '';

    const inner = `
      <div class="tienda-card-image-wrap">
        ${imgHtml}
        <div class="${placeholderClass}" aria-hidden="true"><span>${escapeHtml((p.nombre || '').charAt(0))}</span></div>
      </div>
      <div class="tienda-card-body">
        <h3 class="tienda-card-title">${escapeHtml(p.nombre || '')}</h3>
        ${financiaBlock}
        ${impactBlock}
        ${p.descripcion ? `<p class="tienda-card-desc">${escapeHtml(p.descripcion)}</p>` : ''}
        <p class="tienda-card-price">${precioStr}</p>
        ${projectBlock}
        ${productCta}
      </div>
    `;
    return `<article class="tienda-card" data-id="${escapeHtml(p.id)}">${inner}</article>`;
  }

  function init() {
    const grid = document.getElementById('tienda-grid');
    const empty = document.getElementById('tienda-empty');
    const countEl = document.getElementById('tienda-count');
    const areasEl = document.getElementById('tienda-areas');

    const loadProjects = fetch('data/projects.json')
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => (data && data.projects) || [])
      .catch(() => []);

    const loadTienda = fetch('data/tienda.json')
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        if (!data) return { areasClave: FALLBACK_AREAS, products: FALLBACK_PRODUCTS };
        return {
          areasClave: Array.isArray(data.areasClave) ? data.areasClave : FALLBACK_AREAS,
          products: Array.isArray(data.products) ? data.products : FALLBACK_PRODUCTS,
        };
      })
      .catch(() => ({ areasClave: FALLBACK_AREAS, products: FALLBACK_PRODUCTS }));

    Promise.all([loadTienda, loadProjects]).then(([tienda, projects]) => {
      const products = tienda.products || [];
      const areas = tienda.areasClave || [];

      if (countEl) countEl.textContent = products.length;

      if (areas.length && areasEl) {
        areasEl.innerHTML = '<h2 class="tienda-areas-title">Áreas que apoyas</h2><div class="tienda-areas-grid">' + areas.map(renderArea).join('') + '</div>';
        areasEl.classList.remove('tienda-areas--hidden');
      } else if (areasEl) {
        areasEl.classList.add('tienda-areas--hidden');
      }

      if (products.length === 0) {
        if (grid) grid.innerHTML = '';
        if (empty) empty.style.display = 'block';
        return;
      }

      if (empty) empty.style.display = 'none';
      if (grid) grid.innerHTML = products.map((p) => renderProduct(p, areas, projects)).join('');
    });
  }

  const navToggle = document.querySelector('.nav-toggle');
  const navMain = document.querySelector('.nav-main');
  if (navToggle && navMain) {
    navToggle.addEventListener('click', () => navMain.classList.toggle('is-open'));
  }

  init();
})();
