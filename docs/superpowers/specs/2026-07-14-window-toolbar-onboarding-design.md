# Window toolbar, plugin context, and onboarding preference

## Product behavior

Window mode is a normal ExileCodex application window with its own title bar.
The title bar carries the product identity, a draggable region, and native
window actions: minimize, maximize/restore, and close. Overlay mode remains
frameless, transparent, click-through, and has no toolbar.

The first-launch walkthrough gains a persisted “Don’t show this again” check
box. Checking it records a durable preference and suppresses future tours;
finishing or skipping the current tour still marks onboarding complete. The
preference can be reset from Settings so the tour remains recoverable.

The launcher keeps its current normal context for direct plugin shortcuts,
Settings, and quit. A separate Plugins context opens the existing Plugins
widget and contains the plugin list; it is available in window mode and does
not add UI to the game overlay.

## Architecture

- Electron creates window mode with `frame: false`; overlay options remain
  unchanged.
- The renderer owns the toolbar markup and emits semantic window commands via
  preload IPC. Main-process handlers call `minimize`, `maximize`/`unmaximize`,
  and `close` only for the normal window.
- A window-state event keeps the maximize button label and accessible state in
  sync after double-clicks or OS actions.
- Onboarding stores `ec.onboarding.suppressed` alongside the existing completion
  flag. The renderer checkbox updates the durable SavedVariables store through
  the existing UI store bridge; startup checks both values before starting the
  tour.
- Plugin context is a launcher grouping, not a duplicate plugin registry. It
  reuses the existing `__plugins` widget and plugin registry data.

## Acceptance criteria

- Window mode has no native title bar and all three controls work by mouse and
  keyboard.
- Maximize toggles to restore and stays synchronized with the actual window.
- Overlay mode has no toolbar, no frame, and no new focus/click behavior.
- Checking “Don’t show this again,” restarting, and reopening the app does not
  show onboarding; clearing the preference allows it again.
- Normal plugin shortcuts still work, and the Plugins context opens the same
  plugin-management widget.
