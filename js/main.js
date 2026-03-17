/**
 * Red de Altruismo Eficaz México — Script principal
 * Carga datos desde JSON y renderiza proyectos, organizadores, coffee chat y proyectos realizados.
 */

(function () {
  'use strict';

  const DATA_BASE = 'data';

  // Respaldo por si la página se abre desde file:// (fetch no carga JSON locales)
  const FALLBACK_ORGANIZERS = [
    {
      id: 'org-1',
      nombre: 'Jorge Castillo & Karime Pacheco',
      grupo: 'EA UPY',
      ciudad: 'Mérida',
      actividades: 'Introfellowship, coordinación con otros grupos',
      foto: 'images/organizers/maria.jpg',
      tipoGrupo: 'Universitario',
      areasInteres: 'AI Safety, Animal Welfare, INFOSEC',
      redes: {
        Instagram: 'https://www.instagram.com/ea_upy/',
        linkedin: 'https://www.linkedin.com/company/effective-altruism-upy/posts/?feedView=all',
      },
    },
    {
      id: 'org-2',
      nombre: 'Marco',
      grupo: 'AI Safety UDG',
      ciudad: 'Guadalajara',
      actividades: 'Curso AI Safety fundamentals',
      foto: 'images/grupos/CUGDL.png',
      tipoGrupo: 'Universitario',
      areasInteres: 'AI Safety',
      redes: {
        Instagram: 'https://www.instagram.com/aiscugdl/',
      },
    },
    {
      id: 'org-3',
      nombre: 'Alejandro',
      grupo: 'EA Queretaro',
      ciudad: 'Queretaro',
      actividades: 'Intro fellowship',
      foto: 'images/organizers/ana.jpg',
      tipoGrupo: 'Universitario',
      areasInteres: 'Bioseguridad',
      redes: {
        Instagram: 'https://www.instagram.com/ae_queretaro?utm_source=qr&igsh=Mmw1NTBybTZnZ291',
      },
    },
    {
      id: 'org-4',
      nombre: 'Karime Pacheco',
      grupo: 'AI Safety UPY',
      ciudad: 'Mérida',
      actividades: 'AI Safety Atlas course & sesiones técnicas de Arena',
      foto: 'images/organizers/ana.jpg',
      tipoGrupo: 'Universitario',
      areasInteres: 'AI Safety',
      redes: {
        Instagram: 'https://www.instagram.com/ai_safetyupy',
      },
    },
    {
      id: 'org-5',
      nombre: 'Fernando Castillo',
      grupo: 'INFOSEC',
      ciudad: 'Mérida',
      actividades: 'Grupo de discusión y proyectos',
      foto: 'images/organizers/ana.jpg',
      tipoGrupo: 'Nacional',
      areasInteres: 'Seguridad de la información',
      redes: {
        Instagram: 'https://www.instagram.com/threat_trackers?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
        LinkedIn: 'https://www.linkedin.com/company/threat-trackers/',
      },
    },
    {
      id: 'org-6',
      nombre: 'Janeth Valdivia, Angel Tenorio, Jason Pinelo, Dexter Gomez, Karime Pacheco',
      grupo: 'AI Safety México',
      ciudad: 'Mérida',
      actividades: 'Research, colaboración internacional, networking, sesiones mensuales',
      foto: 'images/grupos/Screenshot 2026-03-16 at 3.48.32 p.m..png',
      tipoGrupo: 'Nacional',
      areasInteres: 'AI Safety-Technical AI Governance-AI Security',
      redes: {
        linkedin: 'https://www.linkedin.com/company/ai-safety-m%C3%A9xico',
      },
    },
  ];
  const FALLBACK_PROJECTS = [
    {
      id: 'proyecto-1',
      nombre: 'Intro fellowship 5 semanas',
      areaTematica: 'Curso introductorio al Altruismo Eficaz',
      descripcion: 'Un curso adaptado por EA Alemania, EA Barcelona y EA universidades México, versión en español',
      estado: 'Disponible, incluye guía de facilitador',
      equipo: 'EA Barcelona, EA ALemania, EA Universidades México',
      resultadosMedibles: 'Evaluado con 9/10 por una cohorte latinoamericana (Chile, Argentina y México ',
      slug: 'Curriculum-EA-Intro-fellowship',
    },
    {
      id: 'proyecto-2',
      nombre: 'CPP',
      areaTematica: 'Desarrollo de carrera',
      descripcion: 'Programa de planeación de carrera',
      estado: 'Discponible con guía de facilitador y en versión para Workshop',
      equipo: 'Desarrollado para OSP y adaptado en versión Workshop por Janeth Valdivia',
      resultadosMedibles: 'Ejecutado con una cohorte es formato de discusión semanal y una cohorte en formato workshop',
      slug: 'CPP',
    },
    {
      id: 'proyecto-3',
      nombre: 'INFOSEC',
      areaTematica: 'Seguridad de la información',
      descripcion: 'Programa de 8 semanas sobre seguridad de la información.',
      estado: 'En desarrollo',
      equipo: 'Coordinación nacional',
      resultadosMedibles: '3 rondas ejecutadas satisfactoriamente, la población universitaria solicitó dar continuidad del programa en nuevas iteraciones',
      slug: 'INFOSEC',
    },
    {
      id: 'proyecto-4',
      nombre: 'Sistema de seguimiento de grupos',
      areaTematica: 'Coordinación',
      descripcion: 'Herramientas y procesos para medir actividad, retención y crecimiento de los grupos locales.',
      estado: 'En desarrollo',
      equipo: 'Noé Lozano & Janeth Valdivia',
      resultadosMedibles: 'Dashboard en uso por 6 grupos',
      slug: 'seguimiento-grupos',
    },
    {
      id: 'proyecto-5',
      nombre: 'Currículo de bienestar animal',
      areaTematica: 'Animal Welfare',
      descripcion: 'Programa de 5 semanas desarrollado por Janeth Valdivia, Patricia Huchin y Valeria Ramirez',
      estado: 'Curriculo y guía de facilitador disponible',
      equipo: 'Patricia Huchín, Valeria Ramirez y Janeth Valdivia',
      resultadosMedibles: 'Ejecutado en una ronda y calificación 10/10',
      slug: 'animal-welfare',
    },
    {
      id: 'proyecto-6',
      nombre: 'Planeación Hackathon',
      areaTematica: 'AW, INFOSEC, AI Safety, Marco ITN, Research',
      descripcion: 'Planeación disponible para iteración',
      estado: 'Guía paso a paso disponible',
      equipo: 'Janeth Valdivia, Dexter Gomez, Noé Lozano, Jason Pinelo, Isabel Montalvo, Angel Tenorio, Jorge Luis Castillo y Karime Pacheco ',
      resultadosMedibles: '5 papers, Ejecución durante la semana de Ingenierías Universidad Politécnica de Yucatán',
      slug: 'Datathon',
    },
  ];
  const FALLBACK_PROGRAMS = [
    { id: 'prog-1', nombre: 'Introducción al Altruismo Eficaz', fechas: 'Febrero – Marzo 2025', modalidad: 'Online', grupoOrganizador: 'En curso', linkAplicacion: '' },
    { id: 'prog-2', nombre: 'EAGx CDMX 2026', fechas: 'Marzo 20-22', modalidad: 'Presencial', grupoOrganizador: 'Universum UNAM', linkAplicacion: 'https://www.effectivealtruism.org/ea-global/events/eagxcdmx-2026' },
  ];
  const FALLBACK_COFFEE_CHATS = [
    { id: 'cc-1', fecha: '2025-03-15', fechaTexto: '7 de marzo, 2026', tema: 'Coffee Chat Mensual', descripcion: 'Sesiones mensuales para hablar sobre temas clave del altruismo eficaz.', modalidad: 'Online (Google Meet)', linkInscripcion: 'https://luma.com/c8qno17k', linkGrabacion: '' },
  ];
  const FALLBACK_GROUPS = [
    { id: 'Yucatán', nombre: 'EA UPY', ciudad: 'Mérida', tipo: 'Universitario', logo: 'images/UPY.png', logoOpen: 'images/3.png', anoFundacion: 2022 },
    {
      id: 'Guadalajara',
      nombre: 'EA Guadalajara',
      ciudad: 'Guadalajara',
      tipo: 'Ciudad',
      logo: 'images/grupos/EA GDJ.jpg',
      linktree: 'https://linktr.ee/eaguadalajara?utm_source=ig&utm_medium=social&utm_content=link_in_bio',
      anoFundacion: 2025,
    },
    { id: 'Queretaro', nombre: 'EA Queretaro', ciudad: 'Querétaro', tipo: 'Universitario', logo: 'images/grupos/WhatsApp Image 2026-02-18 at 20.17.54.jpeg', instagram: 'https://www.instagram.com/ae_queretaro?utm_source=qr&igsh=Mmw1NTBybTZnZ291', anoFundacion: 2025 },
    { id: 'AI Safety México', nombre: 'AI Safety México', ciudad: 'Mérida', tipo: 'Nacional', logo: 'images/grupos/AI SafetyMx.png', instagram: 'https://www.linkedin.com/company/ai-safety-m%C3%A9xico', anoFundacion: 2024 },
    {
      id: 'INFOSEC',
      nombre: 'INFOSEC',
      ciudad: 'Mérida',
      tipo: 'Seguridad de la información',
      logo: 'images/grupos/ISOTIPO B-N 1.png',
      instagram: 'https://www.instagram.com/threat_trackers?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
      linkedin: 'https://www.linkedin.com/company/threat-trackers/',
      anoFundacion: 2024,
    },
    { id: 'AI Safety UDG', nombre: 'AI Safety UDG', ciudad: 'Guadalajara', tipo: 'AI Safety', logo: 'images/grupos/CUGDL.png', anoFundacion: 2025 },
    {
      id: 'AI Safety UPY',
      nombre: 'AI Safety UPY',
      ciudad: 'Mérida',
      tipo: 'Universitario',
      logo: 'images/grupos/[CF] Logo cuadrado con texto.png',
      linktree: 'https://linktr.ee/AI_safetyUPY',
      instagram: 'https://www.instagram.com/ai_safetyupy',
      linkedin: 'https://www.linkedin.com/company/ai-safety-upy',
      anoFundacion: 2025,
    },
  ];
  const FALLBACK_PROYECTOS_REALIZADOS = [
    { id: 'realizado-1', nombre: 'AI Safety in Mexico: A Pilot Survey in Yucatan', areaTematica: 'AI Safety-Governance', descripcion: 'Este estudio presenta los resultados de una encuesta piloto realizada con académicos en Yucatán para comprender las perspectivas locales sobre la seguridad de la IA.', fechaRealizacion: '2025', equipo: 'AI Safety México, Centro GEO, Universidad Politécnica de Yucatán', resultados: 'Paper publicado en Research in computer Science, atención mediática en más de 10 medios de comunicación', link: 'https://www.rcs.cic.ipn.mx/2025_154_9/AI%20Safety%20in%20Mexico_%20A%20Pilot%20Survey%20in%20Yucatan.pdf' },
  ];

  function fetchJSON(path) {
    return fetch(path).then((res) => {
      if (!res.ok) throw new Error('Error cargando ' + path);
      return res.json();
    });
  }

  function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // --- Navegación móvil ---
  const navToggle = document.querySelector('.nav-toggle');
  const navMain = document.querySelector('.nav-main');
  if (navToggle && navMain) {
    navToggle.addEventListener('click', function () {
      navMain.classList.toggle('is-open');
    });
  }

  // --- Nodos que se mueven al hacer scroll ---
  const nodesBg = document.getElementById('nodes-bg');
  if (nodesBg) {
    const nodes = nodesBg.querySelectorAll('.node');
    const factors = [0.08, -0.12, 0.15, -0.06, 0.1, -0.09, 0.05, -0.14, 0.11, -0.07];
    let ticking = false;
    function updateNodes() {
      const scrollY = window.scrollY;
      nodes.forEach((node, i) => {
        const factor = factors[i] !== undefined ? factors[i] : 0.1;
        const y = scrollY * factor;
        const x = Math.sin(scrollY * 0.002 + i) * 8;
        node.style.transform = `translate(${x}px, ${y}px)`;
      });
      ticking = false;
    }
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(updateNodes);
        ticking = true;
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    updateNodes();
  }

  // --- Proyectos (activos/en desarrollo) ---
  function renderProjects(projects) {
    const container = document.getElementById('proyectos-grid');
    if (!container) return;

    const estadoClass = (estado) => (estado || '').replace(/\s+/g, '-');

    container.innerHTML = (projects || [])
      .map(
        (p) => `
        <article class="proyecto-card" data-id="${escapeHtml(p.id)}">
          <div class="card-body">
            <h3>${escapeHtml(p.nombre)}</h3>
            <div class="area">${escapeHtml(p.areaTematica)}</div>
            <p class="desc">${escapeHtml(p.descripcion)}</p>
            <span class="estado ${estadoClass(p.estado)}">${escapeHtml(p.estado)}</span>
            <div class="equipo">Equipo: ${escapeHtml(p.equipo)}</div>
            <div class="resultados">${escapeHtml(p.resultadosMedibles)}</div>
          </div>
          <div class="card-footer">
            <button type="button" class="btn-ver-mas" data-proyecto-id="${escapeHtml(p.id)}">Ver más</button>
          </div>
        </article>
      `
      )
      .join('');

    container.querySelectorAll('.btn-ver-mas').forEach((btn) => {
      btn.addEventListener('click', function () {
        const id = this.getAttribute('data-proyecto-id');
        const project = projects.find((p) => p.id === id);
        if (project) openProjectModal(project);
      });
    });
  }

  function openProjectModal(project) {
    const modal = document.getElementById('modal-proyecto');
    const body = document.getElementById('modal-proyecto-body');
    if (!modal || !body) return;

    const estadoClass = (estado) => (estado || '').replace(/\s+/g, '-');
    body.innerHTML = `
      <h3 id="modal-proyecto-title">${escapeHtml(project.nombre)}</h3>
      <div class="area">${escapeHtml(project.areaTematica)}</div>
      <span class="estado ${estadoClass(project.estado)}">${escapeHtml(project.estado)}</span>
      <p class="desc">${escapeHtml(project.descripcion)}</p>
      <p class="equipo"><strong>Equipo:</strong> ${escapeHtml(project.equipo)}</p>
      <p class="resultados"><strong>Resultados medibles:</strong> ${escapeHtml(project.resultadosMedibles)}</p>
    `;
    modal.showModal();
  }

  document.querySelector('.modal-close')?.addEventListener('click', function () {
    document.getElementById('modal-proyecto')?.close();
  });
  document.getElementById('modal-proyecto')?.addEventListener('click', function (e) {
    if (e.target === this) this.close();
  });

  // --- Grupos: tarjeta con logo; clic abre modal con imagen + organizadores (sin deslizar) ---
  function openGrupoModal(g, orgs) {
    const modal = document.getElementById('modal-grupo');
    const body = document.getElementById('modal-grupo-body');
    if (!modal || !body) return;
    const closedLogo = g.logo && String(g.logo).trim() !== '' ? String(g.logo).trim() : '';
    const openLogo = g.logoOpen && String(g.logoOpen).trim() !== '' ? String(g.logoOpen).trim() : closedLogo;
    const openLogoEncoded = openLogo ? encodeURI(openLogo) : '';
    const inicial = escapeHtml((g.nombre || '').charAt(0));
    const imgHtml = openLogo
      ? `<img src="${escapeHtml(openLogoEncoded)}" alt="${escapeHtml(g.nombre)}" class="modal-grupo-img">`
      : `<span class="grupo-logo-inicial">${inicial}</span>`;
    const organizadoresHtml = (orgs && orgs.length > 0)
      ? orgs.map((o) => renderOrganizerBlock(o)).join('')
      : '<p class="grupo-sin-organizadores">Sin organizadores registrados.</p>';
    const links = [];
    if (g.linktree && String(g.linktree).trim()) {
      links.push(`<a href="${escapeHtml(g.linktree)}" target="_blank" rel="noopener">Linktree</a>`);
    }
    if (g.instagram && String(g.instagram).trim()) {
      links.push(`<a href="${escapeHtml(g.instagram)}" target="_blank" rel="noopener">Instagram</a>`);
    }
    if (g.linkedin && String(g.linkedin).trim()) {
      links.push(`<a href="${escapeHtml(g.linkedin)}" target="_blank" rel="noopener">LinkedIn</a>`);
    }
    const redesHtml = links.length
      ? `<div class="modal-grupo-redes">${links.join(' ')}</div>`
      : '';
    body.innerHTML = `
      <div class="modal-grupo-header">
        <div class="modal-grupo-header-text">
          <h2 id="modal-grupo-title" class="modal-grupo-title">${escapeHtml(g.nombre || '')}</h2>
          <div class="modal-grupo-meta">${escapeHtml(g.ciudad || '')} · ${escapeHtml(g.tipo || '')}</div>
          ${redesHtml}
        </div>
        <div class="modal-grupo-img-wrap">${imgHtml}</div>
      </div>
      <p class="grupo-organizadores-titulo">Organizadores</p>
      <div class="grupo-organizadores-list">${organizadoresHtml}</div>
    `;
    modal.showModal();
  }

  function renderOrganizerBlock(o) {
    const nombre = o.nombre || '';
    const inicial = escapeHtml(nombre.charAt(0));
    const tieneFoto = o.foto && String(o.foto).trim() !== '';
    const fotoHtml = tieneFoto
      ? `<img src="${escapeHtml(o.foto)}" alt="${escapeHtml(nombre)}" loading="lazy" onerror="var s=this.nextElementSibling; this.remove(); s&&(s.style.display='flex')"><span class="inicial" style="display:none">${inicial}</span>`
      : `<span class="inicial">${inicial}</span>`;
    const areasHtml = (o.areasInteres && String(o.areasInteres).trim()) ? `<p class="areas-interes">${escapeHtml(o.areasInteres)}</p>` : '';
    const redesHtml = o.redes && typeof o.redes === 'object' && Object.keys(o.redes).length > 0
      ? '<div class="redes">' + Object.entries(o.redes)
          .filter(([key, url]) => url && String(url).trim())
          .map(([key, url]) => `<a href="${escapeHtml(url)}" target="_blank" rel="noopener">${escapeHtml(key)}</a>`)
          .join(' ') + '</div>'
      : '';
    return `
      <div class="grupo-organizador">
        <div class="grupo-organizador-foto">${fotoHtml}</div>
        <div class="grupo-organizador-info">
          <strong>${escapeHtml(nombre)}</strong>
          <p class="actividades">${escapeHtml(o.actividades || '')}</p>
          ${areasHtml}
          ${redesHtml}
        </div>
      </div>
    `;
  }

  function renderGrupos(groups, organizers) {
    const container = document.getElementById('grupos-grid');
    if (!container) return;

    const organizersByGrupo = (nombreGrupo) => (organizers || []).filter((o) => (o.grupo || '') === nombreGrupo);

    const list = groups || [];

    const cardHtml = (g, idxInCol) => {
      const closedLogo = g.logo && String(g.logo).trim() !== '' ? String(g.logo).trim() : '';
      const openLogo = g.logoOpen && String(g.logoOpen).trim() !== '' ? String(g.logoOpen).trim() : closedLogo;
      const tieneLogo = closedLogo !== '';
      const logoSrc = closedLogo ? encodeURI(closedLogo) : '';
      const inicial = escapeHtml((g.nombre || '').charAt(0));
      const logoHtml = tieneLogo
        ? `<img src="${escapeHtml(logoSrc)}" alt="${escapeHtml(g.nombre)}" loading="lazy" onerror="var s=this.nextElementSibling; this.remove(); s&&(s.style.display='flex')"><span class="grupo-logo-inicial" style="display:none">${inicial}</span>`
        : `<span class="grupo-logo-inicial">${inicial}</span>`;

      return `
        <article class="grupo-card" style="--i: ${idxInCol + 1};" data-grupo-id="${escapeHtml(g.id)}">
          <div class="grupo-card-front">
            <div class="grupo-card-front-text">
              <h3>${escapeHtml(g.nombre || '')}</h3>
              <div class="grupo-meta">${escapeHtml(g.ciudad || '')} · ${escapeHtml(g.tipo || '')}</div>
              <p class="grupo-ver-organizadores">Ver organizadores</p>
            </div>
            <div class="grupo-logo-wrap">${logoHtml}</div>
          </div>
        </article>
      `;
    };

    const colA = [];
    const colB = [];
    list.forEach((g, idx) => {
      (idx % 2 === 0 ? colA : colB).push(g);
    });

    container.innerHTML = `
      <div class="grupos-col">
        ${colA.map((g, idxInCol) => cardHtml(g, idxInCol)).join('')}
      </div>
      <div class="grupos-col">
        ${colB.map((g, idxInCol) => cardHtml(g, idxInCol)).join('')}
      </div>
    `;

    const modalGrupo = document.getElementById('modal-grupo');
    const modalGrupoClose = document.querySelector('.modal-grupo-close');
    if (modalGrupoClose) modalGrupoClose.addEventListener('click', () => modalGrupo?.close());
    if (modalGrupo) modalGrupo.addEventListener('click', function (e) { if (e.target === this) this.close(); });

    container.querySelectorAll('.grupo-card').forEach((card) => {
      card.addEventListener('click', function () {
        const id = this.getAttribute('data-grupo-id');
        const g = (groups || []).find((gr) => gr.id === id);
        if (!g) return;
        const orgs = organizersByGrupo(g.nombre);
        openGrupoModal(g, orgs);
      });
    });
  }

  // --- Coffee Chat Mensual ---
  function renderCoffeeChat(list) {
    const container = document.getElementById('coffee-chat-list');
    if (!container) return;

    const items = list || [];
    if (items.length === 0) {
      container.innerHTML = '<p class="coffee-chat-empty">Próximamente se publicarán las fechas del Coffee Chat mensual.</p>';
      return;
    }

    container.innerHTML = items
      .map(
        (c) => `
        <article class="coffee-chat-card">
          <div class="coffee-chat-fecha">${escapeHtml(c.fechaTexto || c.fecha || '')}</div>
          <h3>${escapeHtml(c.tema || '')}</h3>
          ${c.descripcion ? `<p class="coffee-chat-desc">${escapeHtml(c.descripcion)}</p>` : ''}
          <div class="coffee-chat-meta">${escapeHtml(c.modalidad || '')}</div>
          ${c.linkInscripcion ? `<a href="${escapeHtml(c.linkInscripcion)}" class="btn btn-primary" target="_blank" rel="noopener">Inscribirme</a>` : ''}
        </article>
      `
      )
      .join('');
  }

  // --- Proyectos realizados: se muestran todos los campos del JSON (nombre, área, descripción, fecha, equipo, resultados, link) ---
  function renderProyectosRealizados(proyectos) {
    const container = document.getElementById('proyectos-realizados-grid');
    if (!container) return;

    const items = proyectos || [];
    if (items.length === 0) {
      container.innerHTML = '<p class="proyectos-realizados-empty">Aquí se mostrarán los proyectos que la red ha realizado. Añade entradas en <code>data/proyectos-realizados.json</code>.</p>';
      return;
    }

    container.innerHTML = items
      .map(
        (p) => `
        <article class="proyecto-realizado-card">
          <h3>${escapeHtml(p.nombre || '—')}</h3>
          <div class="area">${escapeHtml(p.areaTematica || '—')}</div>
          <p class="desc">${escapeHtml(p.descripcion || '—')}</p>
          <div class="fecha"><strong>Fecha:</strong> ${escapeHtml(p.fechaRealizacion || '—')}</div>
          <div class="equipo"><strong>Equipo:</strong> ${escapeHtml(p.equipo || '—')}</div>
          <div class="resultados"><strong>Resultados:</strong> ${escapeHtml(p.resultados || '—')}</div>
          ${p.link ? `<a href="${escapeHtml(p.link)}" class="btn btn-secondary" target="_blank" rel="noopener">Ver más</a>` : ''}
        </article>
      `
      )
      .join('');
  }

  // --- Programas ---
  function renderPrograms(programs) {
    const container = document.getElementById('programas-list');
    if (!container) return;

    container.innerHTML = (programs || [])
      .map(
        (p) => {
          const isFinalizado = !p.linkAplicacion || String(p.linkAplicacion).toLowerCase() === 'finalizado';
          const actionHtml = isFinalizado
            ? '<button type="button" class="btn btn-primary" disabled>Programa finalizado</button>'
            : `<a href="${escapeHtml(p.linkAplicacion)}" class="btn btn-primary" target="_blank" rel="noopener">Aplicar</a>`;
          return `
        <article class="programa-item">
          <div>
            <h3>${escapeHtml(p.nombre)}</h3>
            <div class="detalles">${escapeHtml(p.fechas)} · ${escapeHtml(p.modalidad)} · ${escapeHtml(p.grupoOrganizador)}</div>
          </div>
          ${actionHtml}
        </article>
      `;
        }
      )
      .join('');
  }

  // --- Formulario Abre un Grupo ---
  const formAbreGrupo = document.getElementById('form-abre-grupo');
  if (formAbreGrupo) {
    formAbreGrupo.addEventListener('submit', function (e) {
      e.preventDefault();
      const nombre = document.getElementById('nombre')?.value || '';
      const email = document.getElementById('email')?.value || '';
      const contexto = document.getElementById('contexto')?.value || '';
      const mensaje = document.getElementById('mensaje')?.value || '';
      const subject = encodeURIComponent('Solicitud para abrir un grupo - ' + contexto);
      const body = encodeURIComponent(
        `Nombre: ${nombre}\nCorreo: ${email}\nUniversidad o ciudad: ${contexto}\n\nMensaje:\n${mensaje}`
      );
      window.location.href = `mailto:?subject=${subject}&body=${body}`;
    });
  }

  // --- Inicialización (cada JSON se carga con fallback por si se abre con file://) ---
  async function init() {
    const byId = (id) => document.getElementById(id);

    const [
      projectsRes,
      organizersRes,
      programsRes,
      coffeeChatRes,
      realizadosRes,
      groupsRes,
    ] = await Promise.all([
      fetchJSON(`${DATA_BASE}/projects.json`).catch(() => ({ projects: FALLBACK_PROJECTS })),
      fetchJSON(`${DATA_BASE}/organizers.json`).catch(() => ({ organizers: FALLBACK_ORGANIZERS })),
      fetchJSON(`${DATA_BASE}/programs.json`).catch(() => ({ programs: FALLBACK_PROGRAMS })),
      fetchJSON(`${DATA_BASE}/coffee-chat.json`).catch(() => ({ coffeeChats: FALLBACK_COFFEE_CHATS })),
      fetchJSON(`${DATA_BASE}/proyectos-realizados.json`).catch(() => ({ proyectosRealizados: FALLBACK_PROYECTOS_REALIZADOS })),
      fetchJSON(`${DATA_BASE}/groups.json`).catch(() => ({ groups: FALLBACK_GROUPS })),
    ]);

    const projects = projectsRes.projects || [];
    const organizers = organizersRes.organizers || [];
    const programs = programsRes.programs || [];
    const coffeeChats = coffeeChatRes.coffeeChats || [];
    const proyectosRealizados = realizadosRes.proyectosRealizados || [];
    const groups = groupsRes.groups || [];

    renderProjects(projects);
    renderGrupos(groups, organizers);
    renderCoffeeChat(coffeeChats);
    renderPrograms(programs);
    renderProyectosRealizados(proyectosRealizados);

    if (projects.length === 0 && byId('proyectos-grid')) byId('proyectos-grid').innerHTML = '<p>No se pudieron cargar los proyectos.</p>';
    if (groups.length === 0 && byId('grupos-grid')) byId('grupos-grid').innerHTML = '<p>No se pudieron cargar los grupos.</p>';
  }

  init();
})();
