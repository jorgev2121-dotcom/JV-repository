// Round-table log writer (ROUND-TABLE-PROTOCOL.md). Cloud sessions only: appends every new
// owner message and Claude reply, with timestamps, to round-table/live/, then commits and pushes
// just that folder. Never blocks the session; any failure is silent.
const fs = require('fs'), path = require('path'), cp = require('child_process');
if (process.env.CLAUDE_CODE_REMOTE !== 'true') process.exit(0);
let input = '';
process.stdin.on('data', d => (input += d)).on('end', () => { try { run(JSON.parse(input || '{}')); } catch (e) {} process.exit(0); });

const MAX = 6000;
function et(iso) {
  try { return new Date(iso).toLocaleString('en-US', { timeZone: 'America/New_York', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true }) + ' ET'; }
  catch (e) { return iso; }
}
function textOf(content) {
  if (typeof content === 'string') return content;
  if (!Array.isArray(content)) return '';
  if (content.some(c => c && c.type === 'tool_result')) return '';
  return content.filter(c => c && c.type === 'text').map(c => c.text).join('\n');
}
function isNoise(t) {
  return !t.trim() || /^<(task-notification|system-reminder|local-command|command-name)/.test(t.trim()) || t.startsWith('This session is being continued from a previous conversation');
}
function run(h) {
  const tp = h.transcript_path; if (!tp || !fs.existsSync(tp)) return;
  const root = cp.execSync('git rev-parse --show-toplevel', { cwd: h.cwd || process.cwd() }).toString().trim();
  const sid = (h.session_id || 'session').slice(0, 8);
  const stateF = path.join(root, '.claude', 'hooks', '.rt-state-' + sid);
  let last = ''; try { last = fs.readFileSync(stateF, 'utf8').trim(); } catch (e) {}
  const out = [];
  let newest = last;
  for (const line of fs.readFileSync(tp, 'utf8').split('\n')) {
    if (!line) continue; let d; try { d = JSON.parse(line); } catch (e) { continue; }
    if (!d.timestamp || (last && d.timestamp <= last)) continue;
    const role = d.type === 'user' ? 'JORGE' : d.type === 'assistant' ? 'CLOUD (LLM-02)' : '';
    if (!role) continue;
    let t = textOf(d.message && d.message.content); if (isNoise(t)) continue;
    if (t.length > MAX) t = t.slice(0, MAX) + '\n[... cut at ' + MAX + ' characters; full text in the session transcript]';
    out.push('### ' + et(d.timestamp) + ' · ' + role + '\n\n' + t.trim() + '\n');
    if (d.timestamp > newest) newest = d.timestamp;
  }
  if (!out.length) return;
  const day = newest.slice(0, 10);
  const file = path.join(root, 'round-table', 'live', day + '_LLM-02-CLOUD_' + sid + '.md');
  if (!fs.existsSync(file)) fs.writeFileSync(file, '# ROUND TABLE · ' + day + ' · CLOUD (LLM-02) · session ' + sid + '\n\nAuto-written at the end of every turn. Times are Miami time (ET). #round-table #LLM-02 #JorgeValdes\n\n');
  fs.appendFileSync(file, out.join('\n'));
  fs.writeFileSync(stateF, newest);
  const msg = 'Round-table log: ' + out.length + ' new entries (' + day + ')\n\nCo-Authored-By: Claude <noreply@anthropic.com>\nClaude-Session: ' + (process.env.CLAUDE_CODE_REMOTE_SESSION_ID || sid);
  const child = cp.spawn('sh', ['-c', 'git add round-table/live && git commit -q -m "$RT_MSG" -- round-table/live && git push -q origin HEAD >/dev/null 2>&1'], { cwd: root, env: Object.assign({}, process.env, { RT_MSG: msg }), detached: true, stdio: 'ignore' });
  child.unref();
}
