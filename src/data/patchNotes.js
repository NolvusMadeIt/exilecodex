// Path of Exile 2 patch index. Each entry links to the OFFICIAL patch-notes thread on
// pathofexile.com — we don't reproduce GGG's notes (their content, and there's no public API),
// we point at the source. Maintained by hand: when a new patch ships, add an entry at the top
// (and its hotfixes). `current: true` marks the live patch. Newest first.
const T = (id) => `https://www.pathofexile.com/forum/view-thread/${id}`

export const PATCH_NOTES_FORUM = 'https://www.pathofexile.com/forum/view-forum/2212'

export const PATCHES = [
  {
    version: '0.5.3', season: 'Return of the Ancients', date: '2026-06-18', url: T('3968601'), current: true, notes: true,
    hotfixes: [
      { label: '0.5.3 Restart', date: '2026-06-23', url: T('3974332') },
      { label: 'Hotfix 9', date: '2026-06-23', url: T('3973617') },
      { label: 'Hotfix 8', date: '2026-06-22', url: T('3972700') },
      { label: 'Hotfix 7', date: '2026-06-21', url: T('3972584') },
      { label: 'Hotfix 6', date: '2026-06-21', url: T('3972488') },
      { label: 'Hotfix 5', date: '2026-06-20', url: T('3971529') },
      { label: 'Hotfix 4', date: '2026-06-20', url: T('3970581') },
      { label: 'Hotfix 3', date: '2026-06-18', url: T('3969089') },
      { label: 'Hotfix 2', date: '2026-06-18', url: T('3968961') },
      { label: 'Hotfix 1', date: '2026-06-18', url: T('3968863') },
    ],
  },
  {
    version: '0.5.2', season: 'Return of the Ancients', date: '2026-06-11', url: T('3960375'), notes: true,
    hotfixes: [
      { label: 'Hotfix 4', date: '2026-06-17', url: T('3967062') },
      { label: 'Hotfix 3', date: '2026-06-14', url: T('3964950') },
      { label: 'Hotfix 2', date: '2026-06-11', url: T('3960751') },
      { label: 'Hotfix 1', date: '2026-06-11', url: T('3960639') },
    ],
  },
  {
    version: '0.5.1', season: 'Return of the Ancients', date: '2026-06-04', url: T('3949197'), notes: true,
    hotfixes: [
      { label: 'Hotfix 9', date: '2026-06-09', url: T('3957958') },
      { label: 'Hotfix 8', date: '2026-06-09', url: T('3956720') },
      { label: 'Hotfix 7', date: '2026-06-08', url: T('3956589') },
      { label: 'Hotfix 6', date: '2026-06-08', url: T('3955250') },
      { label: 'Hotfix 5', date: '2026-06-07', url: T('3955108') },
      { label: 'Hotfix 4', date: '2026-06-05', url: T('3951518') },
      { label: 'Hotfix 3', date: '2026-06-05', url: T('3951282') },
      { label: 'Hotfix 2', date: '2026-06-05', url: T('3949984') },
      { label: 'Hotfix 1', date: '2026-06-05', url: T('3949789') },
    ],
  },
  {
    version: '0.5.0', season: 'Return of the Ancients', codename: 'Return of the Ancients',
    date: '2026-05-21', url: T('3932540'), major: true, notes: true,
    hotfixes: [
      { label: '0.5.0b Hotfix 14 (rolled back)', date: '2026-06-03', url: T('3946948') },
      { label: '0.5.0b Hotfix 13', date: '2026-06-03', url: T('3945385') },
      { label: '0.5.0b Hotfix 12', date: '2026-06-02', url: T('3945119') },
      { label: '0.5.0b Hotfix 11', date: '2026-06-02', url: T('3943212') },
      { label: '0.5.0b Hotfix 10', date: '2026-06-02', url: T('3942896') },
      { label: '0.5.0b Hotfix 9', date: '2026-06-01', url: T('3942687') },
      { label: '0.5.0b Hotfix 8', date: '2026-06-01', url: T('3940973') },
      { label: '0.5.0b Hotfix 7', date: '2026-06-01', url: T('3940858') },
      { label: '0.5.0b Hotfix 6', date: '2026-06-01', url: T('3940564') },
      { label: '0.5.0b Hotfix 5', date: '2026-05-31', url: T('3940102') },
      { label: '0.5.0b Hotfix 4', date: '2026-05-31', url: T('3939886') },
      { label: '0.5.0b Hotfix 3', date: '2026-05-31', url: T('3937821') },
      { label: '0.5.0b Hotfix 2', date: '2026-05-31', url: T('3937394') },
      { label: '0.5.0b Hotfix 1', date: '2026-05-30', url: T('3936971') },
      { label: '0.5.0b Patch Notes', date: '2026-05-30', url: T('3935437') },
      { label: '0.5.0 Hotfix 3', date: '2026-05-29', url: T('3934869') },
      { label: '0.5.0 Hotfix 2', date: '2026-05-29', url: T('3934600') },
      { label: '0.5.0 Hotfix 1', date: '2026-05-29', url: T('3934397') },
    ],
  },
  {
    version: '0.4.0', codename: 'The Last of the Druids', url: T('3883495'), major: true, notes: true,
    hotfixes: [
      { label: '0.4.0l Patch Notes', date: '2026-05-25', url: T('3933290') },
    ],
  },
  { version: '0.3.0', codename: 'The Third Edict', url: T('3826682'), major: true, notes: true },
  { version: '0.2.0', codename: 'Dawn of the Hunt', url: T('3740562'), major: true, notes: true },
  { version: '0.1.0', codename: 'Early Access Launch', url: T('3595427'), major: true, notes: true },
]
