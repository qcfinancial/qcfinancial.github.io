/* qcfinancial landing page — interactions
   - Bilingual ES/EN toggle (Approach A: Spanish in markup, JS swaps in place)
   - Language preference persisted in localStorage
   - Copy-to-clipboard install pills
   - Monte-Carlo hero background
   - Mobile navigation drawer
   The `T` dictionary and `genMC()` are copied verbatim from the original
   prototype (QcFinancial Landing.dc.html). */

(function () {
  'use strict';

  var STORAGE_KEY = 'qcf-lang';

  /* ---- Translation dictionary (verbatim from prototype) ---- */
  var T = {
    en: {
      navFeatures: 'Features', navMarkets: 'Markets', navWorkflow: 'Workflow', navDocs: 'Docs',
      eyebrow: 'OPEN SOURCE · C++ CORE · PYTHON API',
      heroTitle: 'Valuation of linear interest rate & FX derivatives.',
      heroSub: 'qcfinancial is a Python library with a C++ core for pricing and risk of linear rates and FX products — built for the Chilean market and developed markets alike.',
      ctaDocs: 'Read the docs', ctaDemo: 'Try the demo app', ctaGithub: 'View on GitHub',
      chartLabel: 'Discount curve', pvLabel: 'Present value', mcLabel: 'Monte Carlo · simulated rate paths',
      trust1: 'In production since 2017', trust2: 'C++ computational core', trust3: 'Windows · macOS · Linux', trust4: 'Python 3.10+',
      featEyebrow: 'Why qcfinancial',
      featTitle: 'Fast where it counts, simple where it matters.',
      featSub: 'A focused toolkit for the people who price and risk-manage linear derivatives every day.',
      f1Title: 'C++ computational core', f1Body: 'The pricing engine is written in C++ and exposed to Python. Heavy valuations and sensitivities run fast — with none of the friction of a low-level workflow.',
      f2Title: 'A clean, direct Python API', f2Body: 'Simple, explicit concepts map to real instruments. Build cashflows, assemble operations, and price them in a few readable lines.',
      f3Title: 'Built for the Chilean market', f3Body: 'Natively handles local conventions and products — ICP CLP swaps, CLF/UF, Cámara — alongside the variants used across developed markets.',
      f4Title: 'Production-proven', f4Body: 'Used in production for several years and continuously improved. Battle-tested where correctness and reliability are non-negotiable.',
      wfEyebrow: 'How it works',
      wfTitle: 'From fundamental objects to risk, in four steps.',
      wfSub: 'The library mirrors how a quant actually thinks about an instrument — composable building blocks, all the way to sensitivities.',
      wf1Title: 'Fundamental objects', wf1Body: 'Dates, calendars, day-count fractions, interest rates and curves.',
      wf2Title: 'Cashflows', wf2Body: 'Fixed, floating and FX cashflows with full convention control.',
      wf3Title: 'Build operations', wf3Body: 'Assemble legs and instruments: swaps, forwards and more.',
      wf4Title: 'Valuation & sensitivity', wf4Body: 'Present value, curve sensitivities and risk figures.',
      mktEyebrow: 'Market coverage',
      mktTitle: 'Local depth. Global breadth.',
      mktSub: 'One library that speaks the conventions of the Chilean market and the standards of developed markets.',
      mktChile: 'Chilean market', mktChileBody: 'First-class support for the products and conventions that local desks rely on every day.',
      mktDev: 'Developed markets', mktDevBody: 'The post-LIBOR standard instruments and curves used across global rates and FX desks.',
      ctaTitle: 'Get started in one line.',
      ctaSub: 'Wheels for Windows, macOS and Linux. Python 3.10 and up. No build step required.',
      footTag: 'Open-source valuation of linear interest rate and FX derivatives, with a C++ core.',
      footProduct: 'Product', footResources: 'Resources', footProject: 'Project',
      footDemo: 'Demo app', footQcode: 'A Qcode project', footMade: 'Built for quants',
    },
    es: {
      navFeatures: 'Características', navMarkets: 'Mercados', navWorkflow: 'Flujo', navDocs: 'Docs',
      eyebrow: 'CÓDIGO ABIERTO · CORE C++ · API PYTHON',
      heroTitle: 'Valorización de derivados de tasa de interés y tipo de cambio.',
      heroSub: 'qcfinancial es una librería Python con core en C++ para la valorización y sensibilidad de productos lineales de tasa y FX — pensada para el mercado chileno y los mercados desarrollados.',
      ctaDocs: 'Leer la documentación', ctaDemo: 'Probar la demo', ctaGithub: 'Ver en GitHub',
      chartLabel: 'Curva de descuento', pvLabel: 'Valor presente', mcLabel: 'Monte Carlo · trayectorias de tasa simuladas',
      trust1: 'En producción desde 2017', trust2: 'Core de cálculo en C++', trust3: 'Windows · macOS · Linux', trust4: 'Python 3.10+',
      featEyebrow: 'Por qué qcfinancial',
      featTitle: 'Rápida donde importa, simple donde cuenta.',
      featSub: 'Un toolkit enfocado para quienes valorizan y gestionan el riesgo de derivados lineales cada día.',
      f1Title: 'Core de cálculo en C++', f1Body: 'El motor de valorización está escrito en C++ y expuesto a Python. Las valorizaciones y sensibilidades pesadas corren rápido — sin la fricción de un flujo de bajo nivel.',
      f2Title: 'Una API Python clara y directa', f2Body: 'Conceptos simples y explícitos que mapean a instrumentos reales. Construye cashflows, arma operaciones y valorízalas en pocas líneas legibles.',
      f3Title: 'Hecha para el mercado chileno', f3Body: 'Maneja de forma nativa las convenciones y productos locales — swaps ICP CLP, CLF/UF, Cámara — junto con las variantes de los mercados desarrollados.',
      f4Title: 'Probada en producción', f4Body: 'Usada en producción por varios años y en mejora continua. Probada en terreno donde la correctitud y la confiabilidad no se negocian.',
      wfEyebrow: 'Cómo funciona',
      wfTitle: 'De los objetos fundamentales al riesgo, en cuatro pasos.',
      wfSub: 'La librería refleja cómo un quant piensa realmente un instrumento — bloques componibles, hasta las sensibilidades.',
      wf1Title: 'Objetos fundamentales', wf1Body: 'Fechas, calendarios, fracciones de año, tasas de interés y curvas.',
      wf2Title: 'Cashflows', wf2Body: 'Cashflows fijos, flotantes y de FX con control total de convenciones.',
      wf3Title: 'Construir operaciones', wf3Body: 'Arma patas e instrumentos: swaps, forwards y más.',
      wf4Title: 'Valorización y sensibilidad', wf4Body: 'Valor presente, sensibilidades de curva y cifras de riesgo.',
      mktEyebrow: 'Cobertura de mercado',
      mktTitle: 'Profundidad local. Amplitud global.',
      mktSub: 'Una librería que habla las convenciones del mercado chileno y los estándares de los mercados desarrollados.',
      mktChile: 'Mercado chileno', mktChileBody: 'Soporte de primera clase para los productos y convenciones en que las mesas locales confían a diario.',
      mktDev: 'Mercados desarrollados', mktDevBody: 'Los instrumentos y curvas estándar post-LIBOR usados en las mesas globales de tasas y FX.',
      ctaTitle: 'Empieza en una línea.',
      ctaSub: 'Wheels para Windows, macOS y Linux. Python 3.10 en adelante. Sin paso de compilación.',
      footTag: 'Valorización open-source de derivados lineales de tasa de interés y tipo de cambio, con core en C++.',
      footProduct: 'Producto', footResources: 'Recursos', footProject: 'Proyecto',
      footDemo: 'App demo', footQcode: 'Un proyecto Qcode', footMade: 'Hecho para quants',
    },
  };

  /* ---- Per-language document metadata (title + description) ---- */
  var DOC_META = {
    en: {
      title: 'qcfinancial — Valuation of linear interest rate & FX derivatives',
      description: 'Open-source Python library with a C++ core for pricing and risk of linear interest-rate and FX derivatives. Built for the Chilean market and developed markets alike.'
    },
    es: {
      title: 'qcfinancial — Valorización de derivados de tasa de interés y FX',
      description: 'Librería Python open source con core en C++ para la valorización y sensibilidad de derivados lineales de tasa de interés y tipo de cambio. Pensada para el mercado chileno y los mercados desarrollados.'
    }
  };

  var COPY_LABELS = { en: 'copied!', es: '¡copiado!' };

  /* ---- Monte-Carlo generator (verbatim from prototype) ---- */
  function genMC() {
    var W = 1200, H = 640, N = 26, steps = 60;
    var seed = 137731;
    var rand = function () { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
    var gauss = function () { var u = 0, v = 0; while (u === 0) u = rand(); while (v === 0) v = rand(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); };
    var x0 = -30, x1 = 1230, y0 = H * 0.64;
    var colors = ['#3ad6c8', '#5a8fe0', '#2f9fd6', '#46b0dd'];
    var paths = [];
    var sums = new Array(steps + 1).fill(0);
    for (var i = 0; i < N; i++) {
      var y = y0;
      var d = 'M ' + x0.toFixed(1) + ',' + y.toFixed(1);
      sums[0] += y;
      var drift = -1.05 - rand() * 0.75;
      var vol = 9.5 + rand() * 5;
      for (var s = 1; s <= steps; s++) {
        var x = x0 + (x1 - x0) * s / steps;
        y += drift + gauss() * vol;
        if (y < 28) y = 28 + rand() * 26;
        if (y > H - 20) y = H - 20 - rand() * 26;
        d += ' L ' + x.toFixed(1) + ',' + y.toFixed(1);
        sums[s] += y;
      }
      var emphasized = rand() > 0.85;
      paths.push({
        d: d,
        color: colors[i % colors.length],
        width: (emphasized ? 2.2 : 1.1).toFixed(1),
        opacity: (emphasized ? 0.5 : 0.16 + rand() * 0.2).toFixed(2),
        style: 'opacity: 0; animation: qcMC 1.5s ease ' + (rand() * 0.9).toFixed(2) + 's forwards;'
      });
    }
    var mean = 'M ' + x0.toFixed(1) + ',' + (sums[0] / N).toFixed(1);
    for (var s2 = 1; s2 <= steps; s2++) {
      var x2 = x0 + (x1 - x0) * s2 / steps;
      mean += ' L ' + x2.toFixed(1) + ',' + (sums[s2] / N).toFixed(1);
    }
    return { paths: paths, mean: mean };
  }

  var SVG_NS = 'http://www.w3.org/2000/svg';

  function renderMC() {
    var svg = document.querySelector('[data-mc]');
    if (!svg) return;
    var mc = genMC();
    mc.paths.forEach(function (p) {
      var path = document.createElementNS(SVG_NS, 'path');
      path.setAttribute('d', p.d);
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', p.color);
      path.setAttribute('stroke-width', p.width);
      path.setAttribute('stroke-opacity', p.opacity);
      path.setAttribute('stroke-linejoin', 'round');
      path.setAttribute('style', p.style);
      svg.appendChild(path);
    });
    var meanPath = document.createElementNS(SVG_NS, 'path');
    meanPath.setAttribute('d', mc.mean);
    meanPath.setAttribute('fill', 'none');
    meanPath.setAttribute('stroke', '#8af3e7');
    meanPath.setAttribute('stroke-width', '2.6');
    meanPath.setAttribute('stroke-opacity', '0.92');
    meanPath.setAttribute('stroke-linejoin', 'round');
    meanPath.setAttribute('style', 'opacity: 0; animation: qcMC 1.6s ease 1s forwards;');
    svg.appendChild(meanPath);
  }

  /* ---- Language ---- */
  var currentLang = document.documentElement.getAttribute('lang') || 'es';

  function applyLang(lang) {
    if (!T[lang]) return;
    currentLang = lang;
    var dict = T[lang];

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (dict[key] != null) el.textContent = dict[key];
    });

    document.documentElement.setAttribute('lang', lang);

    var meta = DOC_META[lang];
    if (meta) {
      document.title = meta.title;
      var desc = document.querySelector('meta[name="description"]');
      if (desc) desc.setAttribute('content', meta.description);
    }

    document.querySelectorAll('.lang-toggle button').forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(btn.getAttribute('data-lang') === lang));
    });

    // reset any copy buttons to the neutral label
    document.querySelectorAll('[data-copy]').forEach(function (btn) {
      if (!btn._copied) btn.textContent = 'copy';
    });

    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
  }

  function initLang() {
    var stored = null;
    try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    // Spanish ships in the markup; only act if a different preference is stored.
    if (stored && stored !== currentLang) {
      applyLang(stored);
    } else {
      applyLang(currentLang);
    }
  }

  /* ---- Copy to clipboard ---- */
  function initCopy() {
    document.querySelectorAll('[data-copy]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        try {
          if (navigator.clipboard) navigator.clipboard.writeText('pip install qcfinancial');
        } catch (e) {}
        btn._copied = true;
        btn.textContent = COPY_LABELS[currentLang] || 'copied!';
        clearTimeout(btn._t);
        btn._t = setTimeout(function () {
          btn._copied = false;
          btn.textContent = 'copy';
        }, 1600);
      });
    });
  }

  /* ---- Language toggle buttons ---- */
  function initToggle() {
    document.querySelectorAll('.lang-toggle button[data-lang]').forEach(function (btn) {
      btn.addEventListener('click', function () { applyLang(btn.getAttribute('data-lang')); });
    });
  }

  /* ---- Mobile navigation drawer ---- */
  function initMobileNav() {
    var toggle = document.querySelector('[data-nav-toggle]');
    var drawer = document.querySelector('[data-mobile-drawer]');
    if (!toggle || !drawer) return;
    function setOpen(open) {
      drawer.setAttribute('data-open', String(open));
      toggle.setAttribute('aria-expanded', String(open));
    }
    toggle.addEventListener('click', function () {
      setOpen(drawer.getAttribute('data-open') !== 'true');
    });
    drawer.querySelectorAll('[data-nav-close]').forEach(function (link) {
      link.addEventListener('click', function () { setOpen(false); });
    });
  }

  function init() {
    renderMC();
    initToggle();
    initCopy();
    initMobileNav();
    initLang();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
