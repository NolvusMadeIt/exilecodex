// Lightweight, dependency-free i18n. The ENGLISH string is the key — components call
// t('Some text') and the active language's dictionary maps it, falling back to English when
// a string isn't translated yet (so partial coverage degrades gracefully). Dictionaries are
// bundled, so the desktop app translates offline. Game terms (item Class/BaseType/currency
// names) stay in English on purpose — that's what Path of Exile 2 uses.
import { useCallback } from 'react'
import { usePrefs } from '../store/Prefs.jsx'

export const LANGUAGES = [
  { id: 'en', native: 'English', label: 'English' },
  { id: 'ru', native: 'Русский', label: 'Russian' },
  { id: 'pt', native: 'Português', label: 'Portuguese (BR)' },
  { id: 'de', native: 'Deutsch', label: 'German' },
  { id: 'zh', native: '简体中文', label: 'Chinese (Simplified)' },
]

const ru = {
  'Presets': 'Пресеты', 'Quick Filters': 'Быстрые фильтры', 'Tier Lists': 'Тир-листы',
  'Custom Rules': 'Свои правила', 'Cosmetic': 'Оформление', 'Preview': 'Предпросмотр',
  'Community': 'Сообщество', 'How to Use': 'Как пользоваться', 'Settings': 'Настройки',
  'Changelog': 'Список изменений',
  'Change': 'Сменить', 'Import': 'Импорт', 'Save to new file': 'Сохранить в новый файл',
  'Copy': 'Копировать', 'Copied!': 'Скопировано!', 'Reset': 'Сбросить', 'Language': 'Язык',
  'Start your filter': 'Создайте свой фильтр',
  'Start from a clean slate, or bring in a filter you already have.': 'Начните с чистого листа или загрузите уже готовый фильтр.',
  'Or': 'Или', 'Select your class': 'Выберите класс',
  'Shows items relevant to your class, such as your main weapon and armour types.': 'Показывает предметы, подходящие вашему классу, например типы оружия и брони.',
  'Select where you are at in the game': 'Выберите свой этап игры',
  'This will set several Quick Filters and an appropriate Tiering Mode for Currency and Uniques.': 'Это настроит несколько быстрых фильтров и подходящий режим тиров для валюты и уникальных предметов.',
  'Game Mode & Economy': 'Режим игры и экономика', 'Endgame Content': 'Контент эндгейма',
  'Blank filter': 'Пустой фильтр',
  'Start from a clean baseline and build it up yourself.': 'Начните с чистой основы и соберите фильтр сами.',
  'From a preset': 'Из пресета',
  'Pick your class and game stage; we set sensible defaults.': 'Выберите класс и этап игры — мы зададим разумные настройки.',
  'Import existing': 'Импортировать существующий',
  'Load a .filter or .json — drop it here or click to browse.': 'Загрузите .filter или .json — перетащите сюда или нажмите для выбора.',
  'Adjust the filter to your preference. Toggle rows or pick item types from the image dropdowns — no syntax to type.': 'Настройте фильтр под себя. Переключайте параметры или выбирайте типы предметов из списков с картинками — без написания синтаксиса.',
  'Expand all': 'Развернуть всё', 'Collapse all': 'Свернуть всё', 'active': 'активно',
  'Campaign & Leveling': 'Кампания и прокачка', 'Currency': 'Валюта', 'Gems': 'Камни',
  'Flasks & Charms': 'Колбы и талисманы', 'Uniques & Chance Bases': 'Уникальные и базы для Chance',
  'Other & Endgame Items': 'Прочее и предметы эндгейма', 'My Equipment': 'Моё снаряжение',
  'Equipment Filtering': 'Фильтрация снаряжения',
  'Community Filters': 'Фильтры сообщества', 'Share a filter': 'Поделиться фильтром',
  'My current filter': 'Мой текущий фильтр', 'Paste / upload': 'Вставить / загрузить',
  'Share filter': 'Поделиться', 'Shared by the community': 'От сообщества', 'Refresh': 'Обновить',
  'Download': 'Скачать', 'Load': 'Загрузить', 'Filter name (required)': 'Название фильтра (обязательно)',
  'Your name (required)': 'Ваше имя (обязательно)',
  'Theme': 'Тема', 'Typography': 'Типографика', 'Font': 'Шрифт', 'Font size': 'Размер шрифта',
  'Filter Output': 'Вывод фильтра', 'Interface': 'Интерфейс', 'Filter Meta': 'Метаданные фильтра',
  'Custom Comments': 'Свои комментарии',
  'Applies instantly across the whole app and is saved with your settings.': 'Применяется сразу во всём приложении и сохраняется в настройках.',
}

const pt = {
  'Presets': 'Predefinições', 'Quick Filters': 'Filtros Rápidos', 'Tier Lists': 'Listas de Tiers',
  'Custom Rules': 'Regras Personalizadas', 'Cosmetic': 'Cosmético', 'Preview': 'Pré-visualização',
  'Community': 'Comunidade', 'How to Use': 'Como Usar', 'Settings': 'Configurações',
  'Changelog': 'Notas de Versão',
  'Change': 'Trocar', 'Import': 'Importar', 'Save to new file': 'Salvar em novo arquivo',
  'Copy': 'Copiar', 'Copied!': 'Copiado!', 'Reset': 'Redefinir', 'Language': 'Idioma',
  'Start your filter': 'Comece seu filtro',
  'Start from a clean slate, or bring in a filter you already have.': 'Comece do zero ou traga um filtro que você já tem.',
  'Or': 'Ou', 'Select your class': 'Selecione sua classe',
  'Shows items relevant to your class, such as your main weapon and armour types.': 'Mostra itens relevantes para sua classe, como seus tipos de arma e armadura principais.',
  'Select where you are at in the game': 'Selecione em que ponto do jogo você está',
  'This will set several Quick Filters and an appropriate Tiering Mode for Currency and Uniques.': 'Isso define vários Filtros Rápidos e um modo de tier adequado para Moedas e Únicos.',
  'Game Mode & Economy': 'Modo de Jogo e Economia', 'Endgame Content': 'Conteúdo de Endgame',
  'Blank filter': 'Filtro em branco',
  'Start from a clean baseline and build it up yourself.': 'Comece de uma base limpa e monte você mesmo.',
  'From a preset': 'De uma predefinição',
  'Pick your class and game stage; we set sensible defaults.': 'Escolha sua classe e fase do jogo; definimos padrões sensatos.',
  'Import existing': 'Importar existente',
  'Load a .filter or .json — drop it here or click to browse.': 'Carregue um .filter ou .json — solte aqui ou clique para procurar.',
  'Adjust the filter to your preference. Toggle rows or pick item types from the image dropdowns — no syntax to type.': 'Ajuste o filtro como preferir. Ative opções ou escolha tipos de itens nos menus com imagens — sem digitar sintaxe.',
  'Expand all': 'Expandir tudo', 'Collapse all': 'Recolher tudo', 'active': 'ativo',
  'Campaign & Leveling': 'Campanha e Progressão', 'Currency': 'Moedas', 'Gems': 'Gemas',
  'Flasks & Charms': 'Frascos e Charms', 'Uniques & Chance Bases': 'Únicos e Bases de Chance',
  'Other & Endgame Items': 'Outros e Itens de Endgame', 'My Equipment': 'Meu Equipamento',
  'Equipment Filtering': 'Filtragem de Equipamento',
  'Community Filters': 'Filtros da Comunidade', 'Share a filter': 'Compartilhar um filtro',
  'My current filter': 'Meu filtro atual', 'Paste / upload': 'Colar / enviar',
  'Share filter': 'Compartilhar filtro', 'Shared by the community': 'Compartilhados pela comunidade',
  'Refresh': 'Atualizar', 'Download': 'Baixar', 'Load': 'Carregar',
  'Filter name (required)': 'Nome do filtro (obrigatório)', 'Your name (required)': 'Seu nome (obrigatório)',
  'Theme': 'Tema', 'Typography': 'Tipografia', 'Font': 'Fonte', 'Font size': 'Tamanho da fonte',
  'Filter Output': 'Saída do Filtro', 'Interface': 'Interface', 'Filter Meta': 'Metadados do Filtro',
  'Custom Comments': 'Comentários Personalizados',
  'Applies instantly across the whole app and is saved with your settings.': 'Aplica-se imediatamente em todo o app e é salvo nas suas configurações.',
}

const de = {
  'Presets': 'Vorlagen', 'Quick Filters': 'Schnellfilter', 'Tier Lists': 'Tier-Listen',
  'Custom Rules': 'Eigene Regeln', 'Cosmetic': 'Optik', 'Preview': 'Vorschau',
  'Community': 'Community', 'How to Use': 'Anleitung', 'Settings': 'Einstellungen',
  'Changelog': 'Änderungsprotokoll',
  'Change': 'Ändern', 'Import': 'Importieren', 'Save to new file': 'In neue Datei speichern',
  'Copy': 'Kopieren', 'Copied!': 'Kopiert!', 'Reset': 'Zurücksetzen', 'Language': 'Sprache',
  'Start your filter': 'Erstelle deinen Filter',
  'Start from a clean slate, or bring in a filter you already have.': 'Fang bei null an oder lade einen vorhandenen Filter.',
  'Or': 'Oder', 'Select your class': 'Wähle deine Klasse',
  'Shows items relevant to your class, such as your main weapon and armour types.': 'Zeigt für deine Klasse relevante Gegenstände, etwa deine Waffen- und Rüstungstypen.',
  'Select where you are at in the game': 'Wähle deinen Spielfortschritt',
  'This will set several Quick Filters and an appropriate Tiering Mode for Currency and Uniques.': 'Das stellt mehrere Schnellfilter und einen passenden Tier-Modus für Währung und Uniques ein.',
  'Game Mode & Economy': 'Spielmodus & Wirtschaft', 'Endgame Content': 'Endgame-Inhalte',
  'Blank filter': 'Leerer Filter',
  'Start from a clean baseline and build it up yourself.': 'Beginne mit einer sauberen Basis und baue ihn selbst auf.',
  'From a preset': 'Aus einer Vorlage',
  'Pick your class and game stage; we set sensible defaults.': 'Wähle Klasse und Spielphase – wir setzen sinnvolle Standardwerte.',
  'Import existing': 'Vorhandenen importieren',
  'Load a .filter or .json — drop it here or click to browse.': 'Lade eine .filter- oder .json-Datei – hier ablegen oder zum Durchsuchen klicken.',
  'Adjust the filter to your preference. Toggle rows or pick item types from the image dropdowns — no syntax to type.': 'Passe den Filter nach Wunsch an. Schalte Optionen um oder wähle Gegenstandstypen aus den Bild-Menüs – ganz ohne Syntax.',
  'Expand all': 'Alle ausklappen', 'Collapse all': 'Alle einklappen', 'active': 'aktiv',
  'Campaign & Leveling': 'Kampagne & Leveln', 'Currency': 'Währung', 'Gems': 'Steine',
  'Flasks & Charms': 'Fläschchen & Charms', 'Uniques & Chance Bases': 'Uniques & Chance-Basen',
  'Other & Endgame Items': 'Sonstiges & Endgame-Gegenstände', 'My Equipment': 'Meine Ausrüstung',
  'Equipment Filtering': 'Ausrüstungsfilter',
  'Community Filters': 'Community-Filter', 'Share a filter': 'Filter teilen',
  'My current filter': 'Mein aktueller Filter', 'Paste / upload': 'Einfügen / hochladen',
  'Share filter': 'Filter teilen', 'Shared by the community': 'Von der Community geteilt',
  'Refresh': 'Aktualisieren', 'Download': 'Herunterladen', 'Load': 'Laden',
  'Filter name (required)': 'Filtername (erforderlich)', 'Your name (required)': 'Dein Name (erforderlich)',
  'Theme': 'Design', 'Typography': 'Typografie', 'Font': 'Schriftart', 'Font size': 'Schriftgröße',
  'Filter Output': 'Filter-Ausgabe', 'Interface': 'Oberfläche', 'Filter Meta': 'Filter-Metadaten',
  'Custom Comments': 'Eigene Kommentare',
  'Applies instantly across the whole app and is saved with your settings.': 'Wird sofort in der ganzen App angewendet und mit deinen Einstellungen gespeichert.',
}

const zh = {
  'Presets': '预设', 'Quick Filters': '快速筛选', 'Tier Lists': '等级列表',
  'Custom Rules': '自定义规则', 'Cosmetic': '外观', 'Preview': '预览',
  'Community': '社区', 'How to Use': '使用指南', 'Settings': '设置', 'Changelog': '更新日志',
  'Change': '更改', 'Import': '导入', 'Save to new file': '保存为新文件',
  'Copy': '复制', 'Copied!': '已复制！', 'Reset': '重置', 'Language': '语言',
  'Start your filter': '开始创建你的过滤器',
  'Start from a clean slate, or bring in a filter you already have.': '从零开始，或导入你已有的过滤器。',
  'Or': '或', 'Select your class': '选择你的职业',
  'Shows items relevant to your class, such as your main weapon and armour types.': '显示与你职业相关的物品，例如你的主要武器和护甲类型。',
  'Select where you are at in the game': '选择你的游戏进度',
  'This will set several Quick Filters and an appropriate Tiering Mode for Currency and Uniques.': '这会设置多个快速筛选项，并为通货和暗金物品选择合适的分级模式。',
  'Game Mode & Economy': '游戏模式与经济', 'Endgame Content': '终局内容',
  'Blank filter': '空白过滤器',
  'Start from a clean baseline and build it up yourself.': '从干净的基础开始，自行搭建。',
  'From a preset': '使用预设',
  'Pick your class and game stage; we set sensible defaults.': '选择你的职业和游戏阶段，我们会设置合理的默认值。',
  'Import existing': '导入已有',
  'Load a .filter or .json — drop it here or click to browse.': '加载 .filter 或 .json 文件——拖到此处或点击浏览。',
  'Adjust the filter to your preference. Toggle rows or pick item types from the image dropdowns — no syntax to type.': '按你的喜好调整过滤器。切换选项或从带图标的下拉菜单中选择物品类型——无需输入任何语法。',
  'Expand all': '全部展开', 'Collapse all': '全部收起', 'active': '已启用',
  'Campaign & Leveling': '战役与升级', 'Currency': '通货', 'Gems': '技能石',
  'Flasks & Charms': '药剂与护符', 'Uniques & Chance Bases': '暗金与机会基底',
  'Other & Endgame Items': '其他与终局物品', 'My Equipment': '我的装备',
  'Equipment Filtering': '装备筛选',
  'Community Filters': '社区过滤器', 'Share a filter': '分享过滤器',
  'My current filter': '我当前的过滤器', 'Paste / upload': '粘贴 / 上传',
  'Share filter': '分享过滤器', 'Shared by the community': '社区分享',
  'Refresh': '刷新', 'Download': '下载', 'Load': '加载',
  'Filter name (required)': '过滤器名称（必填）', 'Your name (required)': '你的名字（必填）',
  'Theme': '主题', 'Typography': '字体排版', 'Font': '字体', 'Font size': '字号',
  'Filter Output': '过滤器输出', 'Interface': '界面', 'Filter Meta': '过滤器元数据',
  'Custom Comments': '自定义注释',
  'Applies instantly across the whole app and is saved with your settings.': '立即应用于整个应用，并随你的设置一起保存。',
}

const DICTS = { ru, pt, de, zh }

export function translate(lang, s, fallback) {
  if (s == null || lang === 'en' || !lang) return s ?? fallback
  return DICTS[lang]?.[s] ?? fallback ?? s
}

// Hook: returns t(englishString, fallback?) that translates into the active language.
export function useT() {
  const { prefs } = usePrefs()
  const lang = prefs.lang || 'en'
  return useCallback((s, fallback) => translate(lang, s, fallback), [lang])
}
