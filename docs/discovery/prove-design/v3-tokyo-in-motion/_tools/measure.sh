#!/bin/bash
# uso: measure.sh <file html> ; inietta l'aggancio di misura in una copia servita e stampa le statistiche del traffico
S="$(cd "$(dirname "$0")" && pwd)/.work"; mkdir -p "$S"; T="$(cd "$(dirname "$0")" && pwd)"
mkdir -p "$S/serve-m"
python -I - "$1" "$S/serve-m/index.html" <<'PY'
import io,sys
s=io.open(sys.argv[1],encoding='utf-8').read()
hook="  window.__sim = { step: stepCity, geo: buildGeometry, get cars() { return cars; }, at, project: (x, y, z) => Array.from(proj(x, y, z)), W: () => W, H: () => H };\n})();"
i=s.rindex('})();'); s=s[:i]+hook+s[i+5:]
io.open(sys.argv[2],'w',encoding='utf-8').write('<!doctype html><html lang="en"><head><meta charset="utf-8"></head><body>\n'+s+'\n</body></html>\n')
PY
cd "$S/serve-m" && python -I -m http.server 8766 --bind 127.0.0.1 >/dev/null 2>&1 & HP=$!
"/c/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --remote-debugging-port=9334 --user-data-dir="$S/chrome-prof-m" --window-size=1440,900 --use-angle=swiftshader --enable-unsafe-swiftshader --no-first-run --no-default-browser-check about:blank >/dev/null 2>&1 & CP=$!
sleep 2; node "$T/stats.mjs" 9334 "http://127.0.0.1:8766/#city"; kill $CP $HP 2>/dev/null
