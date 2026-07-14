-- core/boot.lua — the launch update phase.
--
-- Runs after the UI has initialised (init.lua) and BEFORE the shell hands off
-- from the boot splash: check for updates, show them applying right in the
-- splash, then either restart/reload to apply or signal ready. Everything is
-- guarded — on any problem it just calls done() so the app always finishes
-- booting. Set pref `ec.boot.sim = "1"` to play a scripted preview with no real
-- update (great for seeing the whole sequence).
local js = require "js"
local window = js.global

local function sh()
  local s = window.exileShell
  if s ~= nil and s ~= js.null then return s end
  return nil
end

-- Thin, guarded wrappers over the splash bridge (fengari binds `this` on `:`).
local function step(line, level)
  local s = sh(); if s and s.bootStep ~= nil then pcall(function() s:bootStep(line, level or "info") end) end
end
local function phase(sub, mode)
  local s = sh(); if s and s.bootPhase ~= nil then pcall(function() s:bootPhase(sub, mode or "") end) end
end
local function progress(pct, label)
  local s = sh(); if s and s.bootProgress ~= nil then pcall(function() s:bootProgress(pct, label or "") end) end
end

-- Scripted preview (no real update, no real restart): pref ec.boot.sim = "1".
local function run_sim(done)
  local seq = {
    function() phase("Checking for updates…", "updating"); step("Checking for updates…", "dim") end,
    function() step("ExileCodex 2.1.5-alpha available", "update") end,
    function() progress(0, "Downloading ExileCodex 2.1.5-alpha") end,
    function() progress(38) end,
    function() progress(72) end,
    function() progress(100) end,
    function() progress(-1); step("✓ Downloaded ExileCodex 2.1.5-alpha", "ok") end,
    function() step("Updating Crafting Bench → 2.0.2-alpha…", "update") end,
    function() step("✓ Crafting Bench 2.0.2-alpha", "ok") end,
    function() step("Updating Filter Editor → 2.0.3-alpha…", "update") end,
    function() step("✓ Filter Editor 2.0.3-alpha", "ok") end,
    function() phase("Restarting to apply updates…", "restart") end,
  }
  local i = 0
  local function nextStep()
    i = i + 1
    if i > #seq then
      -- End of the preview: don't really restart — reveal the app after a beat.
      window:setTimeout(function() phase("Starting overlay…", ""); done() end, 1700)
      return
    end
    pcall(seq[i])
    window:setTimeout(nextStep, 520)
  end
  nextStep()
end

-- App (shell) update check. Fast in the common cases (shell replies quickly, and
-- reports "none" immediately in dev). done(restarting): if true, an app install
-- is under way — the caller must stop (the app is about to relaunch).
local function check_app(done)
  local U = codex.update
  if not U or not U.available or not U.available() then done(false); return end

  -- Already downloaded (pending from an earlier check this session): install now.
  if U.status == "downloaded" then
    local v = U.available_ver and ("v" .. tostring(U.available_ver)) or "update"
    phase("Restarting to install " .. v .. "…", "restart")
    step("Installing ExileCodex " .. v .. "…", "update")
    window:setTimeout(function() pcall(function() U.install() end) end, 1800)
    done(true); return
  end

  phase("Checking for updates…", "updating")
  step("Checking for updates…", "dim")
  local settled = false
  local function finish(restarting) if not settled then settled = true; done(restarting) end end

  if U.on_change ~= nil then
    U.on_change(function()
      if settled then return end
      local t = U.status
      if t == "available" then
        local v = U.available_ver and ("v" .. tostring(U.available_ver)) or "a new version"
        step("ExileCodex " .. v .. " available — downloading in the background", "update")
        finish(false) -- don't block launch on the (large) app download; carry on
      elseif t == "downloaded" then
        local v = U.available_ver and ("v" .. tostring(U.available_ver)) or "update"
        phase("Restarting to install " .. v .. "…", "restart")
        window:setTimeout(function() pcall(function() U.install() end) end, 1800)
        finish(true)
      elseif t == "none" or t == "error" then
        finish(false)
      end
    end)
  end
  pcall(function() U.check() end)
  window:setTimeout(function() finish(false) end, 3500) -- safety cap: never wait forever
end

-- Plugin updates: apply each pending one in turn, streaming it to the splash.
-- done(applied): applied == true when at least one plugin was updated.
local function apply_plugins(done)
  local P = codex.plugins
  if not P or not P.check then done(false); return end
  step("Checking plugins…", "dim")
  P.check(function()
    local ids = {}
    for id in pairs(P.updates or {}) do ids[#ids + 1] = id end
    if #ids == 0 then step("Plugins up to date", "ok"); done(false); return end
    local i, any = 0, false
    local function nextOne()
      i = i + 1
      if i > #ids then done(any); return end
      local id = ids[i]
      local info = P.updates[id]
      local name = (info and info.name) or id
      local latest = (info and info.latest) or "?"
      step("Updating " .. tostring(name) .. " → " .. tostring(latest) .. "…", "update")
      P.apply_silent(id, function(ok)
        if ok then any = true; step("✓ " .. tostring(name) .. " " .. tostring(latest), "ok")
        else step("• " .. tostring(name) .. " skipped", "warn") end
        nextOne()
      end)
    end
    nextOne()
  end)
end

-- Public entry: run the whole phase, then call done() (nothing to do / handed
-- off). If updates are applied it reloads/restarts instead and does NOT call
-- done() — the fresh load runs this again and, finding nothing, finishes.
function codex.run_boot_updates(done)
  done = done or function() end
  if not sh() then done(); return end -- browser build: nothing to update

  local sim = false
  pcall(function()
    sim = codex.ui and codex.ui.store_get and codex.ui.store_get("ec.boot.sim") == "1"
  end)
  if sim then pcall(function() run_sim(done) end); return end

  local ok = pcall(function()
    check_app(function(restarting)
      if restarting then return end -- app is relaunching to install; stop here
      apply_plugins(function(applied)
        if applied then
          phase("Restarting to apply updates…", "restart")
          window:setTimeout(function() pcall(function() window.location:reload() end) end, 1500)
        else
          done()
        end
      end)
    end)
  end)
  if not ok then done() end
end
