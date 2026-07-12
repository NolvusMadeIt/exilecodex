-- codex.json — encode written in Lua, decode borrowed from the browser's
-- JSON.parse (converted back to plain Lua tables). Used for saved guides,
-- widget layouts, and later the community/Supabase payloads.
local js = require "js"
local window = js.global

codex = codex or {}
codex.json = {}

local function esc_str(s)
  s = s:gsub("\\", "\\\\"):gsub('"', '\\"'):gsub("\n", "\\n"):gsub("\r", "\\r"):gsub("\t", "\\t")
  return '"' .. s .. '"'
end

local function is_array(t)
  local n = 0
  for k in pairs(t) do
    if type(k) ~= "number" then return false end
    n = n + 1
  end
  return n == #t
end

function codex.json.encode(v)
  local tv = type(v)
  if v == nil then
    return "null"
  elseif tv == "boolean" then
    return v and "true" or "false"
  elseif tv == "number" then
    return tostring(v)
  elseif tv == "string" then
    return esc_str(v)
  elseif tv == "table" then
    local parts = {}
    if is_array(v) then
      for _, item in ipairs(v) do parts[#parts + 1] = codex.json.encode(item) end
      return "[" .. table.concat(parts, ",") .. "]"
    end
    for k, item in pairs(v) do
      parts[#parts + 1] = esc_str(tostring(k)) .. ":" .. codex.json.encode(item)
    end
    return "{" .. table.concat(parts, ",") .. "}"
  end
  return "null"
end

local function to_lua(v)
  if v == js.null or v == nil then return nil end
  if type(v) ~= "userdata" then return v end
  if window.Array:isArray(v) then
    local arr = {}
    for i = 0, v.length - 1 do arr[i + 1] = to_lua(v[i]) end
    return arr
  end
  local obj = {}
  local keys = window.Object:keys(v)
  for i = 0, keys.length - 1 do
    local k = tostring(keys[i])
    obj[k] = to_lua(v[keys[i]])
  end
  return obj
end

function codex.json.decode(str)
  local ok, parsed = pcall(function() return window.JSON:parse(str) end)
  if not ok then return nil end
  return to_lua(parsed)
end
