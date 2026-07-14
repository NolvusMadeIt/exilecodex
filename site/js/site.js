(function () {
  'use strict';

  var modules = {
    filter: {
      number: '01',
      src: 'img/hero.webp',
      alt: 'Filter setup screen with presets, class selection, progression stage and generated filter output',
      title: 'Filter setup',
      summary: 'Start clean or import an existing filter, then shape class, progression and output without editing raw rules blind.',
      input: 'Filter file or clean baseline',
      mode: 'Visual editor + generated output',
      state: 'Alpha build · legacy name visible'
    },
    market: {
      number: '02',
      src: 'img/market.webp',
      alt: 'Currency market screen with exchange values, a selected Chaos Orb and a historical price chart',
      title: 'Currency market',
      summary: 'Read exchange values, movement, volume and history beside the rest of the run instead of breaking into a separate market tool.',
      input: 'League and exchange selection',
      mode: 'Table + instrument history',
      state: 'Real build capture · market module'
    },
    preview: {
      number: '03',
      src: 'img/preview.webp',
      alt: 'Loot preview screen showing item labels, beams, an item check and generated filter output',
      title: 'Loot preview',
      summary: 'See how labels, beams and valuable-drop checks resolve before the filter is loaded into the game.',
      input: 'Filter rules + sample item',
      mode: 'Visual preview + verdict',
      state: 'Alpha build · legacy name visible'
    }
  };

  var tabs = Array.prototype.slice.call(document.querySelectorAll('[data-module]'));
  var panel = document.getElementById('module-panel');
  var frame = document.querySelector('.capture-frame');
  var capture = document.getElementById('moduleCapture');
  var number = document.getElementById('moduleNumber');
  var title = document.getElementById('moduleTitle');
  var summary = document.getElementById('moduleSummary');
  var input = document.getElementById('moduleInput');
  var mode = document.getElementById('moduleMode');
  var state = document.getElementById('moduleState');
  var registration = document.querySelector('.capture-registration span');

  if (!tabs.length || !panel || !frame || !capture) {
    return;
  }

  function selectModule(key, options) {
    var settings = options || {};
    var item = modules[key];
    var activeTab = tabs.find(function (tab) {
      return tab.getAttribute('data-module') === key;
    });

    if (!item || !activeTab) {
      return;
    }

    tabs.forEach(function (tab) {
      var isActive = tab === activeTab;
      tab.classList.toggle('is-active', isActive);
      tab.setAttribute('aria-selected', String(isActive));
      tab.tabIndex = isActive ? 0 : -1;
    });

    panel.setAttribute('aria-labelledby', activeTab.id);
    frame.classList.add('is-changing');

    window.requestAnimationFrame(function () {
      capture.src = item.src;
      capture.alt = item.alt;
      number.textContent = item.number;
      title.textContent = item.title;
      summary.textContent = item.summary;
      input.textContent = item.input;
      mode.textContent = item.mode;
      state.textContent = item.state;
      if (registration) {
        registration.textContent = 'CAPTURE / ' + item.number;
      }
      frame.classList.remove('is-changing');
    });

    if (settings.focus) {
      activeTab.focus();
    }

    if (settings.updateHash && window.history && window.history.replaceState) {
      window.history.replaceState(null, '', '#module-' + key);
    }
  }

  tabs.forEach(function (tab, index) {
    tab.addEventListener('click', function () {
      selectModule(tab.getAttribute('data-module'), { updateHash: true });
    });

    tab.addEventListener('keydown', function (event) {
      var targetIndex = index;

      if (event.key === 'ArrowRight') {
        targetIndex = (index + 1) % tabs.length;
      } else if (event.key === 'ArrowLeft') {
        targetIndex = (index - 1 + tabs.length) % tabs.length;
      } else if (event.key === 'Home') {
        targetIndex = 0;
      } else if (event.key === 'End') {
        targetIndex = tabs.length - 1;
      } else {
        return;
      }

      event.preventDefault();
      selectModule(tabs[targetIndex].getAttribute('data-module'), {
        focus: true,
        updateHash: true
      });
    });
  });

  var requested = window.location.hash.replace('#module-', '');
  if (modules[requested]) {
    selectModule(requested);
  }
})();
