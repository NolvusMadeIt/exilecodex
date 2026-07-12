-- Price Check — carried over from concept1. Stub page until the Lua port lands.
codex.registry.register{
  id = "price-check",
  name = "Price Check",
  icon = "bi-tags",
  order = 21,
  status = "port pending",
  desc = "Appraise any item against the live PoE2 trade — real listings, in-demand stats, and a sell verdict.",
  mount = function(el)
    el.innerHTML = codex.ui.stub_page{
      name = "Price Check",
      icon = "bi-tags",
      desc = "Appraise any item against the live PoE2 trade — real listings, in-demand stats, and a sell verdict.",
      source = "concept1/src/plugins/price-check",
    }
  end,
}
