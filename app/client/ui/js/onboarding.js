// The first-launch tour is an in-app layer, not a second desktop window. This
// keeps the real plugin and its imagery visible while the walkthrough explains
// the controls around it.
(function () {
  'use strict'

  var root = document.getElementById('onboarding')
  if (!root || !window.exileShell) return

  var card = document.getElementById('ec-onboarding-card')
  var step = document.getElementById('ec-onboarding-step')
  var title = document.getElementById('ec-onboarding-title')
  var body = document.getElementById('ec-onboarding-body')
  var progress = document.getElementById('ec-onboarding-progress')
  var hint = document.getElementById('ec-onboarding-hint')
  var primary = document.getElementById('ec-onboarding-primary')
  var skip = document.getElementById('ec-onboarding-skip')
  var targetHit = document.getElementById('ec-onboarding-target')
  var never = document.getElementById('ec-onboarding-never')
  var spotlight = root.querySelector('.ec-onboarding-spotlight')
  var shade = root.querySelector('.ec-onboarding-shade')
  var targets = {}
  var phase = 'welcome'

  var copy = {
    welcome: { step: 'FIRST LAUNCH', title: 'Welcome to ExileCodex', body: 'Your PoE2 companion tools are ready. This short tour puts the essentials in front of you, then gets out of your way.', card: 'center', button: 'Show me around', action: 'begin', hint: 'You can skip this and revisit it from Settings.' },
    market: { step: '1 / 4 · MARKET COMPANION', title: 'Your market view is ready', body: 'Market Companion is the first tool on screen. Use it to check currency prices, compare movement, and inspect item details without leaving your session.', card: 'top', button: 'Next', action: 'market-next', target: 'market', hint: 'The highlighted panel is the real plugin, not a preview.' },
    orb: { step: '2 / 4 · LAUNCHER ORB', title: 'Everything starts at the orb', body: 'The small ExileCodex orb stays on your desktop edge. Select it whenever you want the radial menu.', card: 'top', target: 'orb', targetAction: 'open-menu', hint: 'Select the highlighted orb to continue.' },
    menu: { step: '3 / 4 · RADIAL MENU', title: 'Your toolkit, one click away', body: 'The radial menu contains every plugin plus Settings. Select the gear to see where the app is configured.', card: 'top', target: 'settings-button', targetAction: 'open-settings', hint: 'Select the highlighted Settings control.' },
    settings: { step: '4 / 4 · SETTINGS', title: 'Make ExileCodex yours', body: 'Settings controls display mode, theme, hotkeys, paths, and plugin preferences. Finish here, then use the orb whenever you need a tool.', card: 'center', button: 'Finish tour', action: 'finish', target: 'settings', hint: 'You can reopen Settings from the radial menu at any time.' },
  }

  function send(action) { window.exileShell.tutorialAction(action) }

  function renderProgress(index) {
    var html = ''
    for (var i = 0; i < 4; i += 1) html += '<span class="' + (i < index ? 'done ' : '') + (i === index ? 'active' : '') + '"></span>'
    progress.innerHTML = html
  }

  function render(state) {
    if (!state || !state.phase) return
    phase = state.phase
    if (state.target && state.target.kind) targets[state.target.kind] = state.target
    if (phase === 'closed') {
      root.classList.add('d-none')
      root.setAttribute('aria-hidden', 'true')
      return
    }
    var spec = copy[phase] || copy.welcome
    root.classList.remove('d-none')
    root.setAttribute('aria-hidden', 'false')
    if (never) never.checked = window.localStorage.getItem('ec.onboarding.suppressed') === '1'
    card.className = 'ec-onboarding-card ' + spec.card
    step.textContent = spec.step
    title.textContent = spec.title
    body.textContent = spec.body
    hint.textContent = spec.hint
    primary.hidden = !spec.action
    primary.textContent = spec.button || ''
    renderProgress(phase === 'welcome' ? 0 : ({ market: 0, orb: 1, menu: 2, settings: 3 }[phase] || 0))

    var target = spec.target && targets[spec.target]
    var valid = !!(target && target.width > 0 && target.height > 0)
    shade.classList.toggle('has-target', valid)
    spotlight.classList.toggle('visible', valid)
    targetHit.classList.toggle('visible', valid && !!spec.targetAction)
    if (valid) {
      var pad = 8
      var x = Math.max(4, target.x - pad)
      var y = Math.max(4, target.y - pad)
      var w = Math.min(window.innerWidth - x - 4, target.width + pad * 2)
      var h = Math.min(window.innerHeight - y - 4, target.height + pad * 2)
      spotlight.style.left = x + 'px'
      spotlight.style.top = y + 'px'
      spotlight.style.width = w + 'px'
      spotlight.style.height = h + 'px'
      targetHit.style.left = x + 'px'
      targetHit.style.top = y + 'px'
      targetHit.style.width = w + 'px'
      targetHit.style.height = h + 'px'
    }
  }

  primary.addEventListener('click', function () {
    var spec = copy[phase]
    if (spec && spec.action) send(spec.action)
  })
  targetHit.addEventListener('click', function () {
    var spec = copy[phase]
    if (spec && spec.targetAction) send(spec.targetAction)
  })
  skip.addEventListener('click', function () { send('skip') })
  if (never) never.addEventListener('change', function () {
    window.localStorage.setItem('ec.onboarding.suppressed', never.checked ? '1' : '0')
  })
  document.addEventListener('keydown', function (event) {
    if (!root.classList.contains('d-none') && event.key === 'Escape') {
      event.preventDefault()
      send('skip')
    }
  }, true)
  window.addEventListener('resize', function () { render({ phase: phase, target: copy[phase] && targets[copy[phase].target] }) })
  window.exileShell.onTutorialState(render)

  var shell = window.exileShell
  var min = document.getElementById('ec-window-minimize')
  var max = document.getElementById('ec-window-maximize')
  var close = document.getElementById('ec-window-close')
  if (shell.mode === 'window') {
    min.addEventListener('click', function () { shell.windowMinimize() })
    max.addEventListener('click', function () { shell.windowMaximizeToggle() })
    close.addEventListener('click', function () { shell.windowClose() })
    shell.onWindowState(function (state) {
      var maximized = !!state.maximized
      max.setAttribute('aria-label', maximized ? 'Restore' : 'Maximize')
      max.innerHTML = '<i class="bi ' + (maximized ? 'bi-copy' : 'bi-square') + '"></i>'
    })
  }
}())
