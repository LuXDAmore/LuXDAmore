// Misura la simulazione del traffico: quota di veicoli fermi e velocità medie nell'inquadratura, su 10 minuti simulati.
const [,, port, url] = process.argv;
const sleep = ms => new Promise(r => setTimeout(r, ms));
let targets;
for (let i = 0; i < 40; i++) { try { targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json(); if (targets.length) break; } catch {} await sleep(250); }
const page = targets.find(t => t.type === 'page');
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise(r => ws.addEventListener('open', r, { once: true }));
let id = 0; const pending = new Map();
ws.addEventListener('message', ev => { const m = JSON.parse(ev.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); } });
const send = (method, params = {}) => new Promise(r => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
await send('Runtime.enable'); await send('Page.enable');
await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
await send('Page.navigate', { url });
await sleep(4000);
const expr = `(() => {
  const S = window.__sim; if (!S) return 'no hook';
  let stop = 0, slow = 0, move = 0, vsum = 0, n = 0, samples = 0, maxQ = 0;
  const per = {};
  for (let k = 0; k < 12000; k++) {
    S.step(.05, 1);
    if (k % 20) continue;
    samples++;
    let q = 0;
    for (const c of S.cars) {
      if (c.done) continue;
      const p = S.at(c.r, c.s), s = S.project(p.x, p.y + 1, p.z);
      if (s[2] < 10 || s[0] < 0 || s[0] > S.W() || s[1] < 0 || s[1] > S.H()) continue;
      n++; vsum += c.v;
      const o = per[c.r.origin] || (per[c.r.origin] = { n: 0, stop: 0, v: 0 });
      o.n++; o.v += c.v;
      if (c.v < .5) { stop++; o.stop++; q++; } else if (c.v < 3) slow++; else move++;
    }
    maxQ = Math.max(maxQ, q);
  }
  const r = x => Math.round(x * 100) / 100;
  const byOrigin = Object.fromEntries(Object.entries(per).map(([k, o]) => [k, { visibili: r(o.n / samples), fermi: r(o.stop / o.n), v: r(o.v / o.n) }]));
  // CPU of one frame of the city: simulation step + geometry, 600 frames at 60 fps
  const T = []; let tt = 0;
  for (let k = 0; k < 600; k++) { const a = performance.now(); S.step(1 / 60, 1); if (S.geo) S.geo(tt += 1 / 60, 1); T.push(performance.now() - a); }
  T.sort((a, b) => a - b);
  const cpu = { medianaMs: r(T[300]), p95Ms: r(T[570]), maxMs: r(T[599]) };
  // the two halves apart: simulation step and geometry
  const A = [], B = []; let t2 = 100;
  for (let k = 0; k < 300; k++) { let a = performance.now(); S.step(1 / 60, 1); A.push(performance.now() - a); a = performance.now(); S.geo(t2 += 1 / 60, 1); B.push(performance.now() - a); }
  A.sort((a, b) => a - b); B.sort((a, b) => a - b);
  cpu.simMs = r(A[150]); cpu.geoMs = r(B[150]); cpu.geoP95Ms = r(B[285]);
  return JSON.stringify({ cpu, veicoliInVista: r(n / samples), fermi: r(stop / n), lenti: r(slow / n), inMoto: r(move / n), vMedia: r(vsum / n), maxFermiInVista: maxQ, byOrigin });
})()`;
const ev = await send('Runtime.evaluate', { expression: expr, returnByValue: true });
console.log(ev.result.result.value ?? JSON.stringify(ev.result));
ws.close(); process.exit(0);
