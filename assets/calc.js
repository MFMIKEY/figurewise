/* ============================================================================
 * FigureWise calculator runtime (shared, ~4KB, zero dependencies).
 * Each generated page sets window.__CALC__ (spec) and window.__compute (fn),
 * then loads this file. This wires inputs -> compute -> formatted outputs,
 * updates live as you type, and renders optional breakdown bars + schedules.
 * ==========================================================================*/
(function () {
  "use strict";

  var SPEC = window.__CALC__;
  var COMPUTE = window.__compute;
  if (!SPEC || typeof COMPUTE !== "function") return;

  var currency = SPEC.currency || "$";
  var locale = SPEC.locale || "en-US";
  var ccy = SPEC.currencyCode || "USD";

  // ---- Formatters ---------------------------------------------------------
  var fmtMoney = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: ccy,
    maximumFractionDigits: 2,
  });
  var fmtMoney0 = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: ccy,
    maximumFractionDigits: 0,
  });
  var fmtNum = new Intl.NumberFormat(locale, { maximumFractionDigits: 2 });
  var fmtInt = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 });

  function fmt(value, format) {
    if (value === null || value === undefined || (typeof value === "number" && !isFinite(value))) {
      return "—";
    }
    switch (format) {
      case "currency":
        return fmtMoney.format(value);
      case "currency0":
        return fmtMoney0.format(value);
      case "percent":
        return fmtNum.format(value) + "%";
      case "number":
        return fmtNum.format(value);
      case "integer":
        return fmtInt.format(value);
      case "months":
        return monthsToText(value);
      case "years":
        return fmtNum.format(value) + (value === 1 ? " year" : " years");
      case "text":
        return String(value);
      default:
        return fmtNum.format(value);
    }
  }

  function monthsToText(m) {
    m = Math.round(m);
    if (!isFinite(m) || m < 0) return "—";
    var y = Math.floor(m / 12);
    var mo = m % 12;
    var parts = [];
    if (y) parts.push(y + (y === 1 ? " yr" : " yrs"));
    if (mo) parts.push(mo + (mo === 1 ? " mo" : " mos"));
    return parts.length ? parts.join(" ") : "0 mos";
  }

  // ---- Read inputs --------------------------------------------------------
  var form = document.querySelector("[data-calc-form]");
  if (!form) return;

  function readValues() {
    var v = {};
    SPEC.inputs.forEach(function (inp) {
      var el = form.querySelector('[data-input="' + inp.id + '"]');
      if (!el) {
        v[inp.id] = inp.default;
        return;
      }
      if (inp.type === "select") {
        var raw = el.value;
        v[inp.id] = isNaN(parseFloat(raw)) ? raw : parseFloat(raw);
      } else {
        var num = parseFloat(el.value);
        v[inp.id] = isFinite(num) ? num : 0;
      }
    });
    return v;
  }

  // ---- Render outputs -----------------------------------------------------
  var outMap = {};
  SPEC.outputs.forEach(function (o) {
    outMap[o.id] = o;
  });

  function render() {
    var v = readValues();
    var result;
    try {
      result = COMPUTE(v) || {};
    } catch (e) {
      result = {};
    }

    SPEC.outputs.forEach(function (o) {
      var el = document.querySelector('[data-output="' + o.id + '"]');
      if (el) el.textContent = fmt(result[o.id], o.format);
    });

    if (SPEC.breakdown) renderBreakdown(result);
    if (SPEC.schedule) renderSchedule(result._schedule);
  }

  function renderBreakdown(result) {
    var host = document.querySelector("[data-breakdown]");
    if (!host) return;
    var parts = SPEC.breakdown.parts || [];
    var total = 0;
    parts.forEach(function (p) {
      var val = Math.max(0, +result[p.outputId] || 0);
      total += val;
    });
    if (total <= 0) {
      host.innerHTML = "";
      return;
    }
    var bar = '<div class="bd-bar" role="img" aria-label="Breakdown">';
    var legend = '<div class="bd-legend">';
    parts.forEach(function (p) {
      var val = Math.max(0, +result[p.outputId] || 0);
      var pct = (val / total) * 100;
      bar +=
        '<span class="bd-seg" style="width:' +
        pct.toFixed(2) +
        "%;background:" +
        p.color +
        '" title="' +
        p.label +
        ": " +
        fmtMoney.format(val) +
        '"></span>';
      legend +=
        '<span class="bd-item"><span class="bd-dot" style="background:' +
        p.color +
        '"></span>' +
        p.label +
        " <strong>" +
        fmtMoney0.format(val) +
        "</strong> <em>" +
        pct.toFixed(1) +
        "%</em></span>";
    });
    bar += "</div>";
    legend += "</div>";
    host.innerHTML = (SPEC.breakdown.title ? '<h3 class="bd-title">' + SPEC.breakdown.title + "</h3>" : "") + bar + legend;
  }

  function renderSchedule(rows) {
    var host = document.querySelector("[data-schedule]");
    if (!host) return;
    if (!rows || !rows.length) {
      host.innerHTML = "";
      return;
    }
    var LIMIT = 12;
    function tableFor(showAll) {
      var slice = showAll ? rows : rows.slice(0, LIMIT);
      var html =
        '<div class="table-wrap"><table class="sched"><thead><tr>' +
        "<th>#</th><th>Payment</th><th>Principal</th><th>Interest</th><th>Balance</th>" +
        "</tr></thead><tbody>";
      slice.forEach(function (r) {
        html +=
          "<tr><td>" +
          r.period +
          "</td><td>" +
          fmtMoney.format(r.payment) +
          "</td><td>" +
          fmtMoney.format(r.principal) +
          "</td><td>" +
          fmtMoney.format(r.interest) +
          "</td><td>" +
          fmtMoney.format(Math.max(0, r.balance)) +
          "</td></tr>";
      });
      html += "</tbody></table></div>";
      return html;
    }
    var expanded = false;
    function draw() {
      host.innerHTML =
        '<h3 class="sched-title">Amortization schedule</h3>' +
        tableFor(expanded) +
        (rows.length > LIMIT
          ? '<button type="button" class="btn-ghost" data-toggle-sched>' +
            (expanded ? "Show less" : "Show all " + rows.length + " payments") +
            "</button>"
          : "");
      var btn = host.querySelector("[data-toggle-sched]");
      if (btn)
        btn.addEventListener("click", function () {
          expanded = !expanded;
          draw();
        });
    }
    draw();
  }

  // ---- Sync range sliders with number fields ------------------------------
  SPEC.inputs.forEach(function (inp) {
    var range = form.querySelector('[data-range="' + inp.id + '"]');
    var number = form.querySelector('[data-input="' + inp.id + '"]');
    if (range && number) {
      range.addEventListener("input", function () {
        number.value = range.value;
        render();
      });
      number.addEventListener("input", function () {
        if (number.value !== "") range.value = number.value;
      });
    }
  });

  // ---- Bind + initial render ---------------------------------------------
  form.addEventListener("input", render);
  form.addEventListener("change", render);
  render();
})();
