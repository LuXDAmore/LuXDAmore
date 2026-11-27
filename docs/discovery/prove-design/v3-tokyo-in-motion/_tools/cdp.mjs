// Pilota Chrome headless via DevTools Protocol: apre la pagina, aspetta, simula lo scroll, salva screenshot e console.
import { writeFileSync } from 'node:fs';
const [,, port, url, outDir, scenario = 'default'] = process.argv;
const sleep = ms => new Promise(r => setTimeout(r, ms));
let targets;
for (let i = 0; i < 40; i++) { try { targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json(); if (targets.length) break; } catch {} await sleep(250); }
const page = targets.find(t => t.type === 'page');
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise(r => ws.addEventListener('open', r, { once: true }));
let id = 0; const pending = new Map(); const logs = [];
ws.addEventListener('message', ev => {
  const m = JSON.parse(ev.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
  if (m.method === 'Runtime.consoleAPICalled') logs.push(`[console.${m.params.type}] ` + m.params.args.map(a => a.value ?? a.description ?? '').join(' '));
  if (m.method === 'Runtime.exceptionThrown') logs.push('[exception] ' + (m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text));
  if (m.method === 'Log.entryAdded') logs.push(`[log.${m.params.entry.level}] ${m.params.entry.text}`);
});
const send = (method, params = {}) => new Promise(r => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
await send('Runtime.enable'); await send('Log.enable'); await send('Page.enable');
await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
await send('Page.navigate', { url });
const shot = async name => { const r = await send('Page.captureScreenshot', { format: 'jpeg', quality: 70 }); writeFileSync(`${outDir}/${name}.jpg`, Buffer.from(r.result.data, 'base64')); };
const wheel = async (dy, n, gap) => { for (let k = 0; k < n; k++) { await send('Input.dispatchMouseEvent', { type: 'mouseWheel', x: 720, y: 450, deltaX: 0, deltaY: dy }); await sleep(gap); } };
const key = async ch => { await send('Input.dispatchKeyEvent', { type: 'keyDown', key: ch, text: ch }); await send('Input.dispatchKeyEvent', { type: 'keyUp', key: ch }); };
await sleep(2500); await shot('01-start');
await sleep(4000); await shot('02-idle-A');
await wheel(240, 14, 60); await shot('03-fast-A');
await sleep(1200); await wheel(-240, 16, 60); await shot('04-reverse-A');
await sleep(3500); await key('2'); await sleep(1500); await shot('05-idle-B');
await wheel(240, 14, 60); await shot('06-fast-B');
await sleep(2500); await key('3'); await sleep(1500); await shot('07-idle-C');
await wheel(240, 14, 60); await shot('08-fast-C');
const ev = await send('Runtime.evaluate', { expression: 'JSON.stringify({gl: !!document.createElement("canvas").getContext("webgl2"), noGl: document.documentElement.classList.contains("no-gl"), shutter: document.getElementById("shutter")?.textContent, frame: document.getElementById("frame")?.textContent})', returnByValue: true });
logs.push('[state] ' + ev.result.result.value);
writeFileSync(`${outDir}/console.txt`, logs.join('\n'));
ws.close(); process.exit(0);
