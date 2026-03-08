/**
 * EA Organizer Dashboard — Auth, tab switching, chatbot
 */
(function () {
  'use strict';

  var SESSION_KEY = 'raem_organizer_session';

  function isLoggedIn() {
    try {
      var raw = sessionStorage.getItem(SESSION_KEY);
      if (!raw) return false;
      var data = JSON.parse(raw);
      return data && data.email && (Date.now() - (data.at || 0) < 24 * 60 * 60 * 1000);
    } catch (e) {
      return false;
    }
  }

  function logout() {
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch (e) {}
    window.location.href = 'login.html';
  }

  var sections = {
    general: document.getElementById('section-general'),
    personal: document.getElementById('section-personal'),
    group: document.getElementById('section-group')
  };

  var tabs = document.querySelectorAll('.dashboard-tab');
  var chatbotTrigger = document.getElementById('chatbot-trigger');
  var chatbotDrawer = document.getElementById('chatbot-drawer');

  function showSection(id) {
    Object.keys(sections).forEach(function (key) {
      var el = sections[key];
      if (el) {
        el.classList.toggle('is-visible', key === id);
        el.hidden = key !== id;
      }
    });
    tabs.forEach(function (tab) {
      tab.classList.toggle('is-active', tab.getAttribute('data-section') === id);
    });
    // Update URL hash without scrolling
    if (history.replaceState) {
      history.replaceState(null, '', '#' + id);
    }
  }

  function initTabs() {
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function (e) {
        e.preventDefault();
        var section = tab.getAttribute('data-section');
        if (section && sections[section]) showSection(section);
      });
    });

    // Initial section from hash
    var hash = (window.location.hash || '#general').slice(1);
    if (sections[hash]) showSection(hash);
    else showSection('general');
  }

  function initChatbot() {
    if (!chatbotTrigger || !chatbotDrawer) return;

    chatbotTrigger.addEventListener('click', function () {
      var isOpen = !chatbotDrawer.hidden;
      chatbotDrawer.hidden = isOpen;
      chatbotTrigger.setAttribute('aria-expanded', !isOpen);
    });

    var closeBtn = chatbotDrawer.querySelector('.chatbot-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        chatbotDrawer.hidden = true;
        chatbotTrigger.setAttribute('aria-expanded', 'false');
      });
    }
  }

  function initAuth() {
    if (!sections.general) return;
    if (!isLoggedIn()) {
      window.location.href = 'login.html';
      return;
    }
    var logoutBtn = document.getElementById('dashboard-logout');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function (e) {
        e.preventDefault();
        logout();
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initAuth();
      initTabs();
      initChatbot();
    });
  } else {
    initAuth();
    initTabs();
    initChatbot();
  }
})();
