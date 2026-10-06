/* vtes4-panels.js - top block (age, live badges, read-me-first) and panels (token monitor, housekeeping,
   repairs, completion, Miami-Dade). Every number is read from VTES_DATA; missing = NO DATA in red. TRK-2026-9910-B. ASCII only. */
(function () {
  var V = window.VTES4, esc = V.esc;
  function drive(id) { return 'https://drive.google.com/file/d/' + id + '/view'; }
  /* The 22 sources and their proof files: ids read from the Drive index doc 1tqRhgNV-x-ZNzP5g_iTnPb3AwdVZgKTV6TLoFZR2N7o on 2026-10-06. */
  var MD = [
    ['01', 'Property Appraiser - property search', '1t48b9mvp53sicxbsYvd3mBjuBo8xfY0_', ''],
    ['02', 'Property Appraiser - comparable sales', '1dnVieZEEC2H3xNI2lVqAnWfme0mK98kO', ''],
    ['03', 'Tax Collector - real estate tax', '1xzBT1GCYkFsNpCsC5FFpaCMwBrisGQAZ', ''],
    ['04', 'Clerk - Official Records', '1Z5m-8lQdDyroTYNqEl5VzeSOn4pUOn3s', 'PARTIAL: Cloudflare captcha, not worked around'],
    ['05', 'Clerk - civil cases', '1YlTorY-w6Gff0TBiHmMAtkccEaWz1qvj', ''],
    ['06', 'Building permit menu', '103RjsXYBPMTB7RXrVca93QRPFPMfae9l', ''],
    ['07', 'EPS e-permitting', '1Sett3KYNpxOwcW2ddSDkeOlZe9xUg9Nu', 'permit status public; folio search needs a login'],
    ['08', 'Building support cases', '1xCFNgzvou6vsE82Bm65QaXT3Ns6wIc1n', ''],
    ['09', 'Code enforcement online', '12CCgmd1jcFomJZDLnDL0-3anuHiy0XYK', ''],
    ['10', 'Neighborhood code cases', '1IU-wcx_5fVuKEJPAJw0j-2_zbEC5lubz', ''],
    ['11', 'Unsafe structures', '1ArxF3o9ZfdHRB9cagpo6aLYsumG_hesk', ''],
    ['12', 'Certificates of Use', '1aMjJj4B_RTnsuEK7zpUoAz2JRj1rTUWH', 'PARTIAL: before 2012 works, newer search retired'],
    ['13', 'DERM code enforcement', '1wGKsjrwvo7q34eTKAO7rlYvroASMVElX', ''],
    ['14', 'DERM public records', '1mSp3dlmvxCkk80fGYOAe3po3-kRwDGmn', ''],
    ['15', 'Product approval (NOA) search', '1U6DHLvirKxeYc8P18-9TV6A4K-O4Qnp4', ''],
    ['16', 'Zoning and land use', '1CJWObVncV2WtWtghlVyXQs5mWuSdsW0D', ''],
    ['17', 'City of Miami permits', '1206ihC17HIk2IFKnYDJrFqySLpKml_gv', 'login-blocked per registry banner'],
    ['18', 'Miami Beach permits', '1eZlpGm5o_QhS-ymx_A-Lnrsjk8yrKRMl', ''],
    ['19', 'Sunbiz (state business records)', '1xqnUBSml1puN0caJAeiWZCcBo85QHS2L', ''],
    ['20', 'DBPR licenses', '1c1dTYOoPHHXHGBu__dPUNQuwjUPDwU8p', ''],
    ['21', 'Florida product approval', '1wRPHDSjnRZtF5_0JkIInLFm4J3rFLA4x', ''],
    ['22', 'Pembroke Pines / Broward', '1xDlwM42EFkLEyskPEmMh_LRRgp-WFVQ5', '']
  ];
  var MD_INDEX = 'https://docs.google.com/document/d/1tqRhgNV-x-ZNzP5g_iTnPb3AwdVZgKTV6TLoFZR2N7o/edit';
  var READ = [
    'Every window has its own card. The plain name is first.',
    'A red box that says NO DATA means nothing on the PC has reported yet. Red is the truth, not a bug.',
    'Green appears only when a fresh report file says so.',
    'To paste work into RAMBO, press the big blue RAMBO button right under this list. Then open the Claude desktop app, Code tab, and press Ctrl+V.',
    'If a button cannot work yet, the card says so in a yellow box with the one step that fixes it.',
    'The line at the top says when this page was built and how old the data is. Every time is Eastern time.',
    'Press Panels for the token monitor, the housekeeping report, the health report and the Miami-Dade list.'
  ];
  function num(x, suffix) { return (typeof x === 'number' && isFinite(x)) ? x + (suffix || '') : null; }
  function red(t) { return '<span class="v4b bad">' + esc(t) + '</span>'; }
  function val(x, suffix) { var n = num(x, suffix); return n === null ? red('NO DATA') : '<b>' + esc(n) + '</b>'; }
  function tokens() {
    var s = V.status('tokens'), d = s.data || {}, ok = s.state === 'OK';
    var rows = (d.programs || []).map(function (p) { return '<tr><td>' + esc(p.name) + '</td><td>' + val(p.tokens_today) + '</td></tr>'; }).join('');
    return '<div class="pn" id="pn-tokens"><h2>Token monitor</h2><p>' + V.badge('tokens', 'Reporting') + '</p>' +
      (s.state === 'NO DATA' ? '<p>' + red('NO DATA') + ' The token monitor has not written its report file (data\\vtes4-tokens.js). No burn rate is shown because none was measured.</p>' :
        '<p>Burn rate per hour: ' + val(d.burn_per_hour) + ' tokens. This window used: ' + val(d.window_used_pct, '%') + '. This week used: ' + val(d.week_used_pct, '%') + '. Window resets: ' + (V.fmtIso(d.window_resets_at) ? esc(V.fmtIso(d.window_resets_at)) : red('NO DATA')) + '.</p>' +
        '<table><tr><th>Program</th><th>Tokens today</th></tr>' + (rows || '<tr><td colspan="2">' + red('NO DATA') + '</td></tr>') + '</table>' +
        (ok ? '' : '<p>' + red('These numbers are old. Do not trust them.') + '</p>')) + '</div>';
  }
  function housekeeping() {
    var s = V.status('housekeeping'), d = s.data || {};
    return '<div class="pn" id="pn-house"><h2>Housekeeping agent</h2><p>' + V.badge('housekeeping', 'Reported') + '</p>' +
      (s.state === 'NO DATA' ? '<p>' + red('NO DATA') + ' No housekeeping report has ever been recorded here. Last report time: ' + red('NONE') + '.</p>' :
        '<p>Last report: ' + (V.fmtIso(d.last_report_at) ? '<b>' + esc(V.fmtIso(d.last_report_at)) + '</b>' : red('NO DATA')) + '. Delivered: ' + (d.report_delivered === true ? '<b>yes</b>' : red('NO / UNKNOWN')) + (d.delivered_to ? ' to ' + esc(d.delivered_to) : '') + '. Items cleaned: ' + val(d.items_cleaned) + '.</p>') + '</div>';
  }
  function health() {
    var s = V.status('health'), d = s.data || {}, st = V.status('state'), sd = st.data || {};
    var pct = (typeof d.checks_passed === 'number' && typeof d.checks_total === 'number' && d.checks_total > 0) ? d.checks_passed + ' of ' + d.checks_total + ' health checks passed (' + Math.round(100 * d.checks_passed / d.checks_total) + '%)' : null;
    var up = 0, seen = 0; V.ALL_IDS.forEach(function (id) { var e = V.executor(id); if (e.state === 'OK') { up++; } if (e.state !== 'NO DATA') { seen++; } });
    var rep = (sd.repairs || []).map(function (r) { return '<li>' + esc(r.status) + ': ' + esc(r.text) + '</li>'; }).join('');
    var money = (sd.money || []).map(function (m) { return '<li>' + esc(m.item) + ': ' + esc(m.status) + '</li>'; }).join('');
    return '<div class="pn" id="pn-health"><h2>Health and completion</h2><p>' + V.badge('health', 'Report') + ' ' + V.badge('state', 'State') + '</p>' +
      '<p>Windows confirmed up now: ' + (seen === 0 ? red('NO DATA') + ' (no window has reported)' : '<b>' + up + ' of ' + V.ALL_IDS.length + '</b>') + '. This counts windows, not tasks.</p>' +
      '<p>Health report: ' + (pct ? '<b>' + esc(pct) + '</b>' : red('NO DATA')) + '. This is the daily check, not how complete the windows are. Daily report sent: ' + (V.fmtIso(d.report_sent_at) ? '<b>' + esc(V.fmtIso(d.report_sent_at)) + '</b>' : red('NO DATA')) + '.</p>' +
      '<p>Open items: ' + val(sd.open_items) + '. In progress: ' + val(sd.in_progress) + '. Blocked: ' + val(sd.blocked) + '.</p>' +
      '<p>Money items (read from the state file, not typed):</p>' + (money ? '<ul>' + money + '</ul>' : '<p>' + red('NO DATA') + '</p>') +
      '<p>Repairs (read from the state file, not typed):</p>' + (rep ? '<ul>' + rep + '</ul>' : '<p>' + red('NO DATA') + '</p>') + '</div>';
  }
  function miami() {
    var s = V.status('miamidade'), d = s.data || {}, counted = (s.state !== 'NO DATA' && typeof d.counted === 'number') ? d.counted : null;
    var proof = {}; (d.sources || []).forEach(function (x) { var k = ('0' + String(x.id).replace(/\D/g, '')).slice(-2); proof[k] = x; });
    var items = MD.map(function (r) {
      var p = proof[r[0]], chk = p ? (p.proof_ok === true ? ' <span class="v4b ok">proof checked</span>' : ' ' + red('PROOF NOT OK')) : ' ' + red('NOT RE-CHECKED');
      return '<li><b>' + r[0] + ' ' + esc(r[1]) + '</b> - <a href="' + drive(r[2]) + '" target="_blank" rel="noopener">open proof file</a>' + (r[3] ? ' - <i class="v4typed">typed note from 2026-08-16, not re-checked: ' + esc(r[3]) + '</i>' : '') + chk + '</li>';
    }).join('');
    return '<div class="pn" id="pn-miami"><h2>Miami-Dade: 22 sources</h2><p>' + V.badge('miamidade', 'Counted') + '</p>' +
      '<p>Counted so far: <b>' + (counted === null ? 'unknown' : counted) + ' of 300</b>' + (counted === null ? ' (not counted yet)' : '') + '.</p>' +
      '<p>Each link opens that site\'s proof file in Drive. They are plain text files, not the Orange Tree portal. <a href="' + MD_INDEX + '" target="_blank" rel="noopener">Open the full index document</a>.</p><ol class="md">' + items + '</ol></div>';
  }
  function dash() {
    return ['heartbeat', 'state', 'health', 'tokens', 'housekeeping', 'miamidade'].map(function (n) { return '<span>' + esc(n) + ': ' + V.badge(n, 'OK') + '</span>'; }).join('');
  }
  window.VTES4P = {
    MD: MD,
    render: function (builtIso) {
      var age = V.ageLine(builtIso);
      document.getElementById('v4top').innerHTML = '<div class="v4age' + (age.bad ? ' bad' : '') + '" id="v4age">' + esc(age.text) + '</div><div class="v4dash" id="v4dash">' + dash() + '</div>' +
        '<details class="v4read" id="v4read" open><summary>Read me first</summary><ol>' + READ.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ol></details>' +
        '<div class="v4rambo" id="v4rambo"><button class="btn" type="button" id="v4rambobtn">Copy hand-off packet for RAMBO (Claude Code Desktop Executor)</button><div class="paste v4cs" id="v4ramboout" role="status"></div></div>';
      document.getElementById('v4rambobtn').addEventListener('click', function () { window.VTES4C.pasteTo('LLM-01', document.getElementById('v4ramboout')); });
      document.getElementById('v4panels').innerHTML = tokens() + housekeeping() + health() + miami();
    }
  };
})();
