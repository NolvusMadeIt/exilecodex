-- Merchant History — carried over from concept1. Stub page until the Lua port lands.
codex.registry.register{
  id = "history",
  name = "Merchant History",
  icon = "bi-clock-history",
  order = 35,
  status = "port pending",
  desc = "Your Currency Exchange trade history — searchable, grouped, with running totals and an earnings chart.",
  mount = function(el)
    el.innerHTML = codex.ui.stub_page{
      name = "Merchant History",
      icon = "bi-clock-history",
      desc = "Your Currency Exchange trade history — searchable, grouped, with running totals and an earnings chart.",
      source = "ExileCodex merchant history module",
    }
  end,
}
