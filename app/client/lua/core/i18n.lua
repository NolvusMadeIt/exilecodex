-- codex.i18n — app-wide translations (en/ru/pt/de/zh). Keys ARE the English
-- strings, so a missing translation falls back to English and codex.T() is
-- always safe. Any addon can extend the dictionary with codex.i18n.register{}
-- so a language switch reaches plugin chrome, not just the core shell.
local ui = codex.ui

codex.i18n = { lang = ui.store_get("ec.lang") or "en" }

-- merged translation dictionary, filled by register() below and by every addon
local S = {}

-- Merge a { ru = {..}, de = {..}, ... } table into the dictionary. Additive:
-- later keys win, missing languages are fine (lookup falls back to English).
function codex.i18n.register(tables_by_lang)
  for lang, tbl in pairs(tables_by_lang) do
    S[lang] = S[lang] or {}
    for k, v in pairs(tbl) do S[lang][k] = v end
  end
end

function codex.i18n.set(lang)
  codex.i18n.lang = lang
  ui.store_set("ec.lang", lang)
end

-- Translate: the string in the current language, or the key itself.
function codex.T(key)
  local t = S[codex.i18n.lang]
  return (t and t[key]) or key
end

-- core strings ---------------------------------------------------------------

codex.i18n.register{
  ru = {
    ["Settings"] = "Настройки", ["General"] = "Общие", ["Step display"] = "Шаги гайда",
    ["Display"] = "Внешний вид", ["Smart detection"] = "Умное отслеживание", ["Game overlay"] = "Игровой оверлей",
    ["Game paths"] = "Пути игры", ["Filter output"] = "Вывод фильтра", ["Sync (Supabase)"] = "Синхронизация",
    ["About"] = "О программе", ["Developer"] = "Разработчик", ["Plugins"] = "Плагины",
    ["Theme"] = "Тема", ["Typography"] = "Типографика", ["Language"] = "Язык", ["League"] = "Лига",
    ["Widget to open on launch"] = "Виджет при запуске",
    ["Upcoming steps shown"] = "Показывать следующих шагов", ["Goal lines"] = "Строки целей",
    ["Show note lines"] = "Показывать заметки", ["Show reward lines"] = "Показывать награды",
    ["Auto-advance completed steps"] = "Автопереход по завершении шага",
    ["Run timer"] = "Таймер забега", ["Show run timer on the guide"] = "Показывать таймер на гайде",
    ["Auto-start timer when a guide opens"] = "Автостарт таймера при открытии гайда",
    ["Check for updates"] = "Проверить обновления", ["Current version"] = "Текущая версия",
    ["Browse"] = "Обзор", ["Auto-locate"] = "Найти автоматически", ["Not found"] = "Не найдено",
    ["Back up settings now"] = "Сохранить настройки в облако", ["Restore settings"] = "Восстановить настройки",
    ["Quit ExileCodex"] = "Выйти из ExileCodex", ["click a goal to complete it"] = "клик по цели — выполнить",
    ["of"] = "из", ["League start"] = "Старт лиги", ["Alt · speedrun"] = "Альт · спидран",
    ["Launcher orb"] = "Кнопка-лаунчер", ["Credits and licenses"] = "Авторы и лицензии", ["Updates"] = "Обновления",
    ["applies instantly"] = "применяется сразу", ["desktop shell"] = "десктоп-версия",
    ["PoE2 game folder"] = "Папка игры PoE2", ["Client.txt file"] = "Файл Client.txt",
    ["Filter output folder"] = "Папка для фильтров", ["Custom comments"] = "Свои комментарии",
    ["Detection"] = "Отслеживание", ["Close guide"] = "Закрыть гайд",
    -- guide window + picker
    ["Guide window"] = "Окно гайда", ["Width"] = "Ширина", ["Font size"] = "Размер шрифта",
    ["Opacity"] = "Прозрачность", ["Enable window opacity"] = "Включить прозрачность окна",
    ["Fixed height"] = "Фиксированная высота", ["Reset window"] = "Сбросить окно",
    ["Default guides"] = "Стандартные гайды", ["My guides"] = "Мои гайды",
    ["Create a guide"] = "Создать гайд", ["Pick a guide"] = "Выбрать гайд",
    ["No guide open"] = "Нет открытого гайда", ["Open"] = "Открыть", ["Edit"] = "Изменить", ["Delete"] = "Удалить",
    ["Reset view"] = "Сбросить вид", ["Campaign"] = "Кампания",
  },
  de = {
    ["Settings"] = "Einstellungen", ["General"] = "Allgemein", ["Step display"] = "Schrittanzeige",
    ["Display"] = "Darstellung", ["Smart detection"] = "Intelligente Erkennung", ["Game overlay"] = "Spiel-Overlay",
    ["Game paths"] = "Spielpfade", ["Filter output"] = "Filterausgabe", ["Sync (Supabase)"] = "Synchronisierung",
    ["About"] = "Über", ["Developer"] = "Entwickler", ["Plugins"] = "Plugins",
    ["Theme"] = "Design", ["Typography"] = "Typografie", ["Language"] = "Sprache", ["League"] = "Liga",
    ["Widget to open on launch"] = "Widget beim Start",
    ["Upcoming steps shown"] = "Angezeigte nächste Schritte", ["Goal lines"] = "Zielzeilen",
    ["Show note lines"] = "Notizen anzeigen", ["Show reward lines"] = "Belohnungen anzeigen",
    ["Auto-advance completed steps"] = "Abgeschlossene Schritte automatisch weiter",
    ["Run timer"] = "Lauf-Timer", ["Show run timer on the guide"] = "Timer im Guide anzeigen",
    ["Auto-start timer when a guide opens"] = "Timer beim Öffnen automatisch starten",
    ["Check for updates"] = "Nach Updates suchen", ["Current version"] = "Aktuelle Version",
    ["Browse"] = "Durchsuchen", ["Auto-locate"] = "Automatisch finden", ["Not found"] = "Nicht gefunden",
    ["Back up settings now"] = "Einstellungen jetzt sichern", ["Restore settings"] = "Einstellungen wiederherstellen",
    ["Quit ExileCodex"] = "ExileCodex beenden", ["click a goal to complete it"] = "Ziel anklicken zum Abschließen",
    ["of"] = "von", ["League start"] = "Ligastart", ["Alt · speedrun"] = "Alt · Speedrun",
    ["Launcher orb"] = "Launcher-Orb", ["Credits and licenses"] = "Credits und Lizenzen", ["Updates"] = "Updates",
    ["applies instantly"] = "wirkt sofort", ["desktop shell"] = "Desktop-Version",
    ["PoE2 game folder"] = "PoE2-Spielordner", ["Client.txt file"] = "Client.txt-Datei",
    ["Filter output folder"] = "Filter-Ausgabeordner", ["Custom comments"] = "Eigene Kommentare",
    ["Detection"] = "Erkennung", ["Close guide"] = "Guide schließen",
    ["Guide window"] = "Guide-Fenster", ["Width"] = "Breite", ["Font size"] = "Schriftgröße",
    ["Opacity"] = "Deckkraft", ["Enable window opacity"] = "Fenster-Deckkraft aktivieren",
    ["Fixed height"] = "Feste Höhe", ["Reset window"] = "Fenster zurücksetzen",
    ["Default guides"] = "Standard-Guides", ["My guides"] = "Meine Guides",
    ["Create a guide"] = "Guide erstellen", ["Pick a guide"] = "Guide wählen",
    ["No guide open"] = "Kein Guide geöffnet", ["Open"] = "Öffnen", ["Edit"] = "Bearbeiten", ["Delete"] = "Löschen",
    ["Reset view"] = "Ansicht zurücksetzen", ["Campaign"] = "Kampagne",
  },
  pt = {
    ["Settings"] = "Configurações", ["General"] = "Geral", ["Step display"] = "Exibição de passos",
    ["Display"] = "Aparência", ["Smart detection"] = "Detecção inteligente", ["Game overlay"] = "Overlay do jogo",
    ["Game paths"] = "Caminhos do jogo", ["Filter output"] = "Saída do filtro", ["Sync (Supabase)"] = "Sincronização",
    ["About"] = "Sobre", ["Developer"] = "Desenvolvedor", ["Plugins"] = "Plugins",
    ["Theme"] = "Tema", ["Typography"] = "Tipografia", ["Language"] = "Idioma", ["League"] = "Liga",
    ["Widget to open on launch"] = "Widget ao iniciar",
    ["Upcoming steps shown"] = "Próximos passos exibidos", ["Goal lines"] = "Linhas de objetivos",
    ["Show note lines"] = "Mostrar notas", ["Show reward lines"] = "Mostrar recompensas",
    ["Auto-advance completed steps"] = "Avançar passos concluídos automaticamente",
    ["Run timer"] = "Cronômetro", ["Show run timer on the guide"] = "Mostrar cronômetro no guia",
    ["Auto-start timer when a guide opens"] = "Iniciar cronômetro ao abrir o guia",
    ["Check for updates"] = "Verificar atualizações", ["Current version"] = "Versão atual",
    ["Browse"] = "Procurar", ["Auto-locate"] = "Localizar automaticamente", ["Not found"] = "Não encontrado",
    ["Back up settings now"] = "Fazer backup das configurações", ["Restore settings"] = "Restaurar configurações",
    ["Quit ExileCodex"] = "Sair do ExileCodex", ["click a goal to complete it"] = "clique num objetivo para concluir",
    ["of"] = "de", ["League start"] = "Início de liga", ["Alt · speedrun"] = "Alt · speedrun",
    ["Launcher orb"] = "Orbe do launcher", ["Credits and licenses"] = "Créditos e licenças", ["Updates"] = "Atualizações",
    ["applies instantly"] = "aplica na hora", ["desktop shell"] = "versão desktop",
    ["PoE2 game folder"] = "Pasta do jogo PoE2", ["Client.txt file"] = "Arquivo Client.txt",
    ["Filter output folder"] = "Pasta de saída de filtros", ["Custom comments"] = "Comentários personalizados",
    ["Detection"] = "Detecção", ["Close guide"] = "Fechar guia",
    ["Guide window"] = "Janela do guia", ["Width"] = "Largura", ["Font size"] = "Tamanho da fonte",
    ["Opacity"] = "Opacidade", ["Enable window opacity"] = "Ativar opacidade da janela",
    ["Fixed height"] = "Altura fixa", ["Reset window"] = "Redefinir janela",
    ["Default guides"] = "Guias padrão", ["My guides"] = "Meus guias",
    ["Create a guide"] = "Criar um guia", ["Pick a guide"] = "Escolher um guia",
    ["No guide open"] = "Nenhum guia aberto", ["Open"] = "Abrir", ["Edit"] = "Editar", ["Delete"] = "Excluir",
    ["Reset view"] = "Redefinir vista", ["Campaign"] = "Campanha",
  },
  zh = {
    ["Settings"] = "设置", ["General"] = "常规", ["Step display"] = "步骤显示",
    ["Display"] = "外观", ["Smart detection"] = "智能检测", ["Game overlay"] = "游戏悬浮层",
    ["Game paths"] = "游戏路径", ["Filter output"] = "过滤器输出", ["Sync (Supabase)"] = "同步",
    ["About"] = "关于", ["Developer"] = "开发者", ["Plugins"] = "插件",
    ["Theme"] = "主题", ["Typography"] = "字体", ["Language"] = "语言", ["League"] = "赛季",
    ["Widget to open on launch"] = "启动时打开的窗口",
    ["Upcoming steps shown"] = "显示后续步骤数", ["Goal lines"] = "目标行",
    ["Show note lines"] = "显示提示", ["Show reward lines"] = "显示奖励",
    ["Auto-advance completed steps"] = "完成后自动前进",
    ["Run timer"] = "计时器", ["Show run timer on the guide"] = "在指南上显示计时器",
    ["Auto-start timer when a guide opens"] = "打开指南时自动开始计时",
    ["Check for updates"] = "检查更新", ["Current version"] = "当前版本",
    ["Browse"] = "浏览", ["Auto-locate"] = "自动查找", ["Not found"] = "未找到",
    ["Back up settings now"] = "立即备份设置", ["Restore settings"] = "恢复设置",
    ["Quit ExileCodex"] = "退出 ExileCodex", ["click a goal to complete it"] = "点击目标以完成",
    ["of"] = "/", ["League start"] = "赛季开荒", ["Alt · speedrun"] = "小号速通",
    ["Launcher orb"] = "启动球", ["Credits and licenses"] = "鸣谢与许可", ["Updates"] = "更新",
    ["applies instantly"] = "立即生效", ["desktop shell"] = "桌面版",
    ["PoE2 game folder"] = "PoE2 游戏目录", ["Client.txt file"] = "Client.txt 文件",
    ["Filter output folder"] = "过滤器输出目录", ["Custom comments"] = "自定义注释",
    ["Detection"] = "检测", ["Close guide"] = "关闭指南",
    ["Guide window"] = "指南窗口", ["Width"] = "宽度", ["Font size"] = "字号",
    ["Opacity"] = "不透明度", ["Enable window opacity"] = "启用窗口不透明度",
    ["Fixed height"] = "固定高度", ["Reset window"] = "重置窗口",
    ["Default guides"] = "默认指南", ["My guides"] = "我的指南",
    ["Create a guide"] = "创建指南", ["Pick a guide"] = "选择指南",
    ["No guide open"] = "没有打开的指南", ["Open"] = "打开", ["Edit"] = "编辑", ["Delete"] = "删除",
    ["Reset view"] = "重置视图", ["Campaign"] = "战役",
  },
}
