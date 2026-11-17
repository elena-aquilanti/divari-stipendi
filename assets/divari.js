/* Divari di stipendio – funzioni comuni ai sette grafici (sopra radar.js) */
(function () {
  "use strict";
  var R = window.Radar, RM = R.reduced;
  function f0(v) { return R.fmt(v, 0); }
  function f1(v) { return R.fmt(v, 1); }
  // colori come variabili CSS: seguono il tema senza ridisegnare
  var C = {
    ink: "var(--ink)", ink2: "var(--ink-2)", rule: "var(--rule)", blue: "var(--blue)", b5: "var(--blue-5)",
    red: "var(--red)", grey: "var(--grey)", g4: "var(--grey-4)", g5: "var(--grey-5)", bg: "var(--bg)", white: "#ffffff"
  };

  function svg(el, w, h, label) {
    d3.select(el).selectAll("svg").remove();
    var s = d3.select(el).insert("svg", ":first-child")
      .attr("width", w).attr("height", h).attr("viewBox", "0 0 " + w + " " + h)
      .attr("role", "img").attr("aria-label", label);
    s.append("title").text(label);
    return s;
  }
  function txt(g, x, y, s, o) {
    o = o || {};
    var t = g.append("text").attr("x", x).attr("y", y).text(s)
      .style("fill", o.fill || C.ink).style("font-size", (o.size || 12) + "px").style("font-weight", o.w || 400)
      .attr("text-anchor", o.a || "start").attr("dominant-baseline", o.b || "middle");
    if (o.halo) t.style("paint-order", "stroke").style("stroke", C.bg).style("stroke-width", "4px").style("stroke-linejoin", "round");
    return t;
  }

  var IC = {
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/>',
    scissors: '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4 8.1 15.9M14.5 14.5 20 20M8.1 8.1 12 12"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
    coin: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5a4.5 4.5 0 1 0 0 7M7 11h6M7 13.5h6"/>',
    building: '<path d="M4 21V6l8-3v18M12 21V9l8 3v9M2 21h20M7 9h2M7 13h2M15 15h2"/>',
    trend: '<path d="M3 17l6-6 4 4 8-8M15 7h6v6"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    wallet: '<rect x="3" y="6" width="18" height="14" rx="2"/><path d="M16 13h2M3 10h18"/>'
  };
  function icon(n, sz) {
    sz = sz || 16;
    return '<svg class="ic" width="' + sz + '" height="' + sz + '" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + IC[n] + "</svg>";
  }
  function icons(root) {
    root = root || document;
    root.querySelectorAll(".kpi[data-icon]").forEach(function (k) { k.querySelector(".k").insertAdjacentHTML("afterbegin", icon(k.dataset.icon)); });
    root.querySelectorAll("[data-ic]").forEach(function (e) { e.outerHTML = icon(e.dataset.ic, 15); });
  }

  /** passa da un valore all'altro nei numeri chiave */
  function tweenNum(el, v, fmt) {
    var from = +(el.dataset.v || 0);
    el.dataset.v = v;
    if (RM || !el.dataset.init) { el.dataset.init = 1; el.textContent = fmt(v); return; }
    d3.select(el).transition().duration(450).tween("t", function () {
      var i = d3.interpolateNumber(from, v);
      return function (t) { el.textContent = fmt(i(t)); };
    });
  }
  /** conta da zero ogni numero dentro il testo di un elemento .count */
  function countText(el) {
    var t = el.textContent, re = /\d[\d.]*(,\d+)?/g, ms = [], m;
    while ((m = re.exec(t))) ms.push(m);
    if (!ms.length || RM) return;
    var parts = ms.map(function (m) {
      var raw = m[0];
      return { i: m.index, raw: raw, dec: (raw.split(",")[1] || "").length, v: +raw.replace(/\./g, "").replace(",", ".") };
    });
    d3.select(el).transition().duration(900).ease(d3.easeCubicOut).tween("t", function () {
      return function (k) {
        var out = "", p = 0;
        parts.forEach(function (q) { out += t.slice(p, q.i) + R.fmt(q.v * k, q.dec); p = q.i + q.raw.length; });
        el.textContent = out + t.slice(p);
      };
    }).on("end", function () { el.textContent = t; });
  }

  /** testata, testo e grafico entrano in scena al primo scorrimento; poi cb() */
  function reveal(cb) {
    var box = document.querySelector(".radar");
    if (RM || !("IntersectionObserver" in window)) { if (cb) cb(); return; }
    document.documentElement.classList.add("rv");
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        io.disconnect();
        box.classList.add("in");
        box.querySelectorAll(".count").forEach(countText);
        if (cb) cb();
      });
    }, { threshold: 0.08 });
    io.observe(box);
  }

  // ---------- Imposta dell'1% (art. 44): regola di calcolo ----------
  // P: parametri letti da data/regole_art44.csv
  function rules(rows) {
    var g = function (k) { var r = rows.filter(function (r) { return r.Parametro === k; })[0]; return r ? R.num(r.Valore) : null; };
    var cap = g("Reddito massimo 2027"), max = g("Aumento agevolato massimo"), irpef = g("Aliquota Irpef sostituita"), flat = g("Imposta agevolata");
    return { cap: cap, max: max, rate: (irpef - flat) / 100, maxSaving: max * (irpef - flat) / 100 };
  }
  function calc(P, r26, g26, r27, g27) {
    var norm = r26 / g26 * g27, ok = r27 <= P.cap, ab = Math.max(0, r27 - norm), agev = ok ? Math.min(ab, P.max) : 0;
    return { r26: r26, g26: g26, r27: r27, g27: g27, norm: norm, ok: ok, ab: ab, agev: agev, over: ab - agev,
      grey: Math.min(norm, r26, r27), days: Math.max(0, Math.min(norm, r27) - r26), inc: r27 - r26, saving: agev * P.rate };
  }
  function say(P, o, tu) {
    var V = tu ? { g: "guadagni", l: "lavori", s: "superi" } : { g: "guadagna", l: "lavora", s: "supera" };
    var dg = o.g27 - o.g26, e = function (v) { return f0(v) + " euro"; };
    if (!o.ok) return "Con " + e(o.r27) + " " + V.s + " il tetto di " + f0(P.cap) + ": niente 1%, tutto l'aumento paga l'Irpef normale.";
    if (o.ab <= 0) return o.inc > 0
      ? (V.g[0].toUpperCase() + V.g.slice(1) + " " + e(o.inc) + " in più solo perché " + V.l + " " + dg + " giorni in più. Per la legge non è un aumento: niente 1%.")
      : "Il reddito non cresce e la giornata non è pagata meglio: niente 1%.";
    var cap = o.over > 0 ? " (agevolati solo i primi " + f0(P.max) + ")" : "";
    if (dg < 0) return "Meno giornate ma ognuna pagata meglio. Per la legge l'aumento è di " + e(o.ab) + ", calcolato sulla paga a giornata: paga l'1%" + cap + ".";
    if (o.days <= 0) return "Stesse giornate ma ognuna pagata meglio: tutti i " + e(o.ab) + " in più pagano l'1%" + cap + ".";
    return "Dei " + e(o.inc) + " in più, " + f0(o.days) + " vengono dai " + dg + " giorni in più e pagano l'Irpef normale. Solo " + f0(o.ab) + " vengono dalla paga più alta e pagano l'1%" + cap + ".";
  }
  /** barra divisa: reddito 2026, giorni in più, paga più alta (1%), oltre il tetto */
  function segs(s, x, o, y, bh, anim, dl) {
    var cx = x(0);
    [[o.grey, C.grey], [o.days, C.b5], [o.agev, C.red], [o.over, C.g4]].forEach(function (p, i) {
      var v = p[0]; if (v <= 0) return;
      var wd = x(v) - x(0);
      var r = s.append("rect").attr("x", cx).attr("y", y).attr("height", bh).attr("rx", 2).style("fill", p[1]).attr("width", wd);
      if (anim && !RM && i) r.attr("width", 0).transition().delay((dl || 0) + 200 + i * 150).duration(500).attr("width", wd);
      cx += wd + (i < 3 ? 1.5 : 0);
    });
    return cx;
  }

  window.DV = { R: R, RM: RM, f0: f0, f1: f1, C: C, svg: svg, txt: txt, icon: icon, icons: icons,
    tweenNum: tweenNum, countText: countText, reveal: reveal, rules: rules, calc: calc, say: say, segs: segs };
})();
