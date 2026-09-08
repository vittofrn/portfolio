/* =============================================================================
   main.js
   Builds the page from content.js, runs the sketchbook opening, the pinboard,
   and the case-study pages. Nothing in here needs editing to add work.
   ========================================================================== */
(function () {
  "use strict";

  var S = window.SITE;
  if (!S) { console.error("content.js did not load"); return; }

  /* ------------------------------------------------------------- helpers */
  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };


  var esc = function (s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  };

  /* An image that degrades into a labelled paper slot if the file isn't there
     yet. This is what lets the site look finished before every asset exists. */
  function shot(src, caption, cls) {
    var label = esc(caption || "image");
    var img = src
      ? '<img src="' + esc(src) + '" alt="' + label + '" loading="lazy" ' +
        'onerror="this.remove()">'
      : "";
    return '<div class="' + (cls || "shot") + '">' +
             '<div class="slot"></div>' + img +
           "</div>";
  }

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ==================================================== THE SCRIBBLE UNDERLINE */
  /* Ported from a Framer/framer-motion reference component. There, hovering
     draws an SVG path in with pathLength (0->1) and, on leave, erases it with
     pathOffset (0->1) while pathLength stays 1 — the visible slice slides off
     the start toward the end rather than shrinking from the end backward.
     There is no animation library here, so it is rebuilt on
     stroke-dasharray / stroke-dashoffset, which is the CSS-native version of
     the same trick: dasharray "len len" (one dash, one equal gap), dashoffset
     sweeping len -> 0 -> -len draws it in and then slides the same dash off
     the far end — visually identical to pathLength/pathOffset.
     The six squiggle paths are the reference's own, unchanged, in its
     310x40 coordinate space; scalePath is its horizontal-only scaling
     function, ported line for line. */
  var SCRIBBLE_PATHS = [
    "M5 20.9999C26.7762 16.2245 49.5532 11.5572 71.7979 14.6666C84.9553 16.5057 97.0392 21.8432 109.987 24.3888C116.413 25.6523 123.012 25.5143 129.042 22.6388C135.981 19.3303 142.586 15.1422 150.092 13.3333C156.799 11.7168 161.702 14.6225 167.887 16.8333C181.562 21.7212 194.975 22.6234 209.252 21.3888C224.678 20.0548 239.912 17.991 255.42 18.3055C272.027 18.6422 288.409 18.867 305 17.9999",
    "M5 24.2592C26.233 20.2879 47.7083 16.9968 69.135 13.8421C98.0469 9.5853 128.407 4.02322 158.059 5.14674C172.583 5.69708 187.686 8.66104 201.598 11.9696C207.232 13.3093 215.437 14.9471 220.137 18.3619C224.401 21.4596 220.737 25.6575 217.184 27.6168C208.309 32.5097 197.199 34.281 186.698 34.8486C183.159 35.0399 147.197 36.2657 155.105 26.5837C158.11 22.9053 162.993 20.6229 167.764 18.7924C178.386 14.7164 190.115 12.1115 201.624 10.3984C218.367 7.90626 235.528 7.06127 252.521 7.49276C258.455 7.64343 264.389 7.92791 270.295 8.41825C280.321 9.25056 296 10.8932 305 13.0242",
    "M5 29.5014C9.61174 24.4515 12.9521 17.9873 20.9532 17.5292C23.7742 17.3676 27.0987 17.7897 29.6575 19.0014C33.2644 20.7093 35.6481 24.0004 39.4178 25.5014C48.3911 29.0744 55.7503 25.7731 63.3048 21.0292C67.9902 18.0869 73.7668 16.1366 79.3721 17.8903C85.1682 19.7036 88.2173 26.2464 94.4121 27.2514C102.584 28.5771 107.023 25.5064 113.276 20.6125C119.927 15.4067 128.83 12.3333 137.249 15.0014C141.418 16.3225 143.116 18.7528 146.581 21.0014C149.621 22.9736 152.78 23.6197 156.284 24.2514C165.142 25.8479 172.315 17.5185 179.144 13.5014C184.459 10.3746 191.785 8.74853 195.868 14.5292C199.252 19.3205 205.597 22.9057 211.621 22.5014C215.553 22.2374 220.183 17.8356 222.979 15.5569C225.4 13.5845 227.457 11.1105 230.742 10.5292C232.718 10.1794 234.784 12.9691 236.164 14.0014C238.543 15.7801 240.717 18.4775 243.356 19.8903C249.488 23.1729 255.706 21.2551 261.079 18.0014C266.571 14.6754 270.439 11.5202 277.146 13.6125C280.725 14.7289 283.221 17.209 286.393 19.0014C292.321 22.3517 298.255 22.5014 305 22.5014",
    "M17.0039 32.6826C32.2307 32.8412 47.4552 32.8277 62.676 32.8118C67.3044 32.807 96.546 33.0555 104.728 32.0775C113.615 31.0152 104.516 28.3028 102.022 27.2826C89.9573 22.3465 77.3751 19.0254 65.0451 15.0552C57.8987 12.7542 37.2813 8.49399 44.2314 6.10216C50.9667 3.78422 64.2873 5.81914 70.4249 5.96641C105.866 6.81677 141.306 7.58809 176.75 8.59886C217.874 9.77162 258.906 11.0553 300 14.4892",
    "M4.99805 20.9998C65.6267 17.4649 126.268 13.845 187.208 12.8887C226.483 12.2723 265.751 13.2796 304.998 13.9998",
    "M5 29.8857C52.3147 26.9322 99.4329 21.6611 146.503 17.1765C151.753 16.6763 157.115 15.9505 162.415 15.6551C163.28 15.6069 165.074 15.4123 164.383 16.4275C161.704 20.3627 157.134 23.7551 153.95 27.4983C153.209 28.3702 148.194 33.4751 150.669 34.6605C153.638 36.0819 163.621 32.6063 165.039 32.2029C178.55 28.3608 191.49 23.5968 204.869 19.5404C231.903 11.3436 259.347 5.83254 288.793 5.12258C294.094 4.99476 299.722 4.82265 305 5.45025"
  ];
  var BASE_W = 310, BASE_H = 40;
  var scribbleNext = Math.floor(Math.random() * SCRIBBLE_PATHS.length);

  function scalePath(d, scaleX) {
    return d.replace(
      /([ML])\s*([\d.]+)\s+([\d.]+)|([C])\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)/g,
      function (m, cmd1, x1, y1, cmd2, cx1, cy1, cx2, cy2, x2, y2) {
        if (cmd1) return cmd1 + (parseFloat(x1) * scaleX) + " " + y1;
        if (cmd2) return cmd2 + (parseFloat(cx1) * scaleX) + " " + cy1 + " " +
                          (parseFloat(cx2) * scaleX) + " " + cy2 + " " +
                          (parseFloat(x2) * scaleX) + " " + y2;
        return m;
      }
    );
  }

  function wireScribble(el) {
    var svg = null, path = null, len = 0, hideT = null;

    function build() {
      var w = el.getBoundingClientRect().width;
      if (w <= 0) return null;
      var h = Math.max(4, Math.min(14, w * (BASE_H / BASE_W)));
      var i = scribbleNext;
      scribbleNext = (scribbleNext + 1) % SCRIBBLE_PATHS.length;
      var d = scalePath(SCRIBBLE_PATHS[i], w / BASE_W);
      var pad = h * 0.28;

      svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("class", "scribble-svg");
      svg.setAttribute("viewBox", "0 " + (-pad).toFixed(1) + " " + w.toFixed(1) + " " + (BASE_H + pad * 2).toFixed(1));
      svg.setAttribute("preserveAspectRatio", "none");
      svg.style.height = h.toFixed(1) + "px";
      svg.style.marginTop = "1px";

      path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", d);
      path.setAttribute("stroke-width", Math.min(3, h * 0.5).toFixed(2));
      path.setAttribute("stroke-linecap", "round");
      path.setAttribute("vector-effect", "non-scaling-stroke");
      svg.appendChild(path);
      el.appendChild(svg);

      len = path.getTotalLength();
      path.style.strokeDasharray = len + " " + len;
      path.style.strokeDashoffset = len;   /* fully hidden */
      return svg;
    }

    el.addEventListener("pointerenter", function () {
      clearTimeout(hideT);
      if (svg) { svg.remove(); svg = null; }
      if (!build()) return;
      /* force layout so the browser registers the hidden state before the
         transition starts, or it would just snap straight to drawn */
      path.getBoundingClientRect();
      path.style.transition = "stroke-dashoffset .6s cubic-bezier(.4,0,.2,1)";
      path.style.strokeDashoffset = "0";
    });

    el.addEventListener("pointerleave", function () {
      if (!path) return;
      path.style.transition = "stroke-dashoffset .45s cubic-bezier(.4,0,.2,1)";
      path.style.strokeDashoffset = String(-len);
      var mine = svg;
      hideT = setTimeout(function () { if (mine) mine.remove(); if (svg === mine) svg = null; }, 480);
    });
  }

  function wireScribbles(nodeList) {
    Array.prototype.forEach.call(nodeList, wireScribble);
  }

  /* ====================================================== RENDER: masthead */
  function renderMasthead() {
    /* The wordmark is type now, not the logo image — the mascot has moved
       into the map. Guarded, because a missing element here used to throw
       and take the whole of init() down with it. */
    var mark = $(".wordmark");
    if (!mark) return;
    /* The logotype already contains the name and the mascot, so it stands on
       its own here; the text stays for screen readers and for the case where
       the image is missing. */
    var art = S.identity.logotype;
    mark.innerHTML =
      (art ? '<img class="wordmark__art" src="' + esc(art) +
             '" alt="' + esc(S.identity.name) + '" onerror="this.remove()">'
           : "<span>" + esc(S.identity.name) + "</span>");
  }


  /* =========================================================== RENDER: map */
  /* The homepage is a map of the work. Every project is a node; two projects
     are joined when they share a discipline, and the more of their combined
     disciplines they share, the stronger the link — so the same kind of work
     pulls together without anyone placing it by hand.

     Disciplines are read straight off `category` in content.js, split on "/",
     which means adding a project puts it on the map with no extra data. */

  var MAP = {
    nodes: [], links: [], field: null, svg: null, layer: null,
    w: 0, h: 0, hovered: -1, running: false,
    mx: -99999, my: -99999, pointer: false
  };

  var AVOID = 190;   /* how close the cursor gets before a node gives way */
  var SHOVE = 46;    /* how far it moves at most */

  function disciplines(p) {
    return String(p.category || "").split("/")
      .map(function (t) { return t.trim().toLowerCase(); })
      .filter(Boolean);
  }

  function buildGraph() {
    MAP.nodes = S.projects.map(function (p, i) {
      return { i: i, p: p, tags: disciplines(p),
               bx: 0, by: 0, x: 0, y: 0, ox: 0, oy: 0, el: null, out: null };
    });
    MAP.links = [];
    var projectCount = MAP.nodes.length;
    for (var a = 0; a < projectCount; a++) {
      for (var b = a + 1; b < projectCount; b++) {
        var A = MAP.nodes[a].tags, B = MAP.nodes[b].tags;
        var shared = A.filter(function (t) { return B.indexOf(t) > -1; }).length;
        /* Jaccard, so "both are only editorial" counts for more than "one of
           my four disciplines happens to overlap one of yours". Pairs with
           nothing in common still get a link — dashed and faint — so the map
           reads as one connected constellation rather than separate islands. */
        MAP.links.push({
          a: a, b: b,
          k: shared ? shared / (A.length + B.length - shared) : 0,
          kin: shared > 0
        });
      }
    }
  }

  /* A small deterministic force layout. Seeded from a circle and run to
     settle at init, so the arrangement is the same on every load. */
  function relax() {
    var n = MAP.nodes, N = n.length, i, j, d, dx, dy, f;
    for (i = 0; i < N; i++) {
      var a = (i / N) * Math.PI * 2 - Math.PI / 2;
      n[i].x = Math.cos(a) * 0.62;
      n[i].y = Math.sin(a) * 0.52;
    }
    for (var step = 0; step < 600; step++) {
      for (i = 0; i < N; i++) {
        for (j = i + 1; j < N; j++) {
          dx = n[j].x - n[i].x; dy = n[j].y - n[i].y;
          d = Math.sqrt(dx * dx + dy * dy) || 1e-4;
          f = 0.0016 / (d * d);                    /* everything repels */
          n[i].x -= dx / d * f; n[i].y -= dy / d * f;
          n[j].x += dx / d * f; n[j].y += dy / d * f;
        }
      }
      MAP.links.forEach(function (L) {
        var A = n[L.a], B = n[L.b];
        dx = B.x - A.x; dy = B.y - A.y;
        d = Math.sqrt(dx * dx + dy * dy) || 1e-4;
        /* Sharing a discipline pulls hard and short. Sharing nothing still
           pulls, but weakly and from further off — enough to keep an
           unrelated pair like Clash and Scomodo in the constellation instead
           of drifting away on their own. */
        var rest = L.kin ? (0.52 - L.k * 0.26) : 0.60;
        f = (d - rest) * (L.kin ? 0.014 * (0.4 + L.k) : 0.0095);
        A.x += dx / d * f; A.y += dy / d * f;
        B.x -= dx / d * f; B.y -= dy / d * f;
      });
      for (i = 0; i < N; i++) {                    /* keep it centred */
        n[i].x *= 0.9985; n[i].y *= 0.9985;
      }
    }
    /* Centre on the centroid and keep the raw coordinates. Normalising each
       axis to 0..1 and stretching that across the field is what pushed the
       outliers to the far edges: it threw away exactly the distances the
       force layout had just worked out. sizeMap scales them uniformly. */
    var cx = 0, cy = 0;
    n.forEach(function (v) { cx += v.x; cy += v.y; });
    cx /= N; cy /= N;
    n.forEach(function (v) { v.lx = v.x - cx; v.ly = v.y - cy; });
  }

  function renderMap() {
    MAP.field = $(".map__field");
    MAP.svg   = $(".map__links");
    MAP.layer = $(".map__nodes");
    if (!MAP.field) return;

    var left = $(".edge--left"), right = $(".edge--right");
    if (left)  left.textContent  = S.identity.role  || "";
    if (right) right.textContent = S.identity.motto || "";

    buildGraph();
    relax();

    MAP.layer.innerHTML = MAP.nodes.map(function (v) {
      var p = v.p;
      return '<a class="node" href="#/' + esc(p.slug) + '" data-i="' + v.i + '" ' +
               'aria-label="' + esc(p.title) + ', ' + esc(p.year || "") + '">' +
               '<span class="node__shot">' +
                 (p.cover ? '<img src="' + esc(p.cover) + '" alt="" loading="lazy" onerror="this.remove()">' : "") +
               "</span>" +
               '<span class="node__tag">' +
                 '<span class="node__co" data-co></span>' +
                 '<span class="node__name">' + esc(p.title) + "</span>" +
               "</span>" +
             "</a>";
    }).join("");


    MAP.nodes.forEach(function (v) {
      v.el  = MAP.layer.querySelector('.node[data-i="' + v.i + '"]');
      v.out = [v.el.querySelector("[data-co]")];
    });

    MAP.svg.innerHTML = MAP.links.map(function (L, i) {
      return '<path class="link' + (L.kin ? "" : " link--far") + '" data-l="' + i + '" ' +
             'style="stroke-width:' + (L.kin ? (0.7 + L.k * 2.4) : 0.6).toFixed(2) +
             ';--o:' + (L.kin ? (0.26 + L.k * 0.54) : 0.14).toFixed(2) + '"/>';
    }).join("");
    MAP.paths = Array.prototype.slice.call(MAP.svg.querySelectorAll(".link"));

    renderFilter();
    wireMap();
    sizeMap();
    startMap();

    /* The field's size is not trustworthy at DOMContentLoaded — fonts, the
       grid and (in an embedded preview) a pane that has not been given its
       size yet all land later. Watch it instead of measuring once. */
    if (window.ResizeObserver) {
      new ResizeObserver(sizeMap).observe(MAP.field);
    } else {
      window.addEventListener("load", sizeMap);
    }
  }

  /* Every discipline that appears anywhere in the work, in the order it first
     shows up. Picking one brings that kind of work to the front and pushes
     everything else back; it never removes a node, so the shape of the map
     stays readable. */
  function renderFilter() {
    var bar = $(".filter");
    if (!bar) return;
    var seen = [];
    MAP.nodes.forEach(function (v) {
      v.tags.forEach(function (t) { if (seen.indexOf(t) < 0) seen.push(t); });
    });
    MAP.tags = seen;
    /* The toggle IS the "all work" state now — no separate chip duplicating
       it inside the list. Click it: opens the other disciplines AND resets
       the filter to everything. Pick a discipline and the toggle's word
       updates to say so; click it again to collapse and reset. */
    bar.innerHTML =
      '<button class="filter__toggle is-on" data-t="" aria-expanded="false">' +
        '<span class="filter__word">all work</span>' +
        '<span class="filter__sign" aria-hidden="true"></span>' +
      "</button>" +
      '<div class="filter__list">' +
        seen.map(function (t) {
          return '<button class="filter__b" data-t="' + esc(t) + '">' + esc(t) + "</button>";
        }).join("") +
      "</div>";

    wireScribbles(bar.querySelectorAll(".filter__toggle, .filter__b"));

    var toggle = bar.querySelector(".filter__toggle");
    var word = bar.querySelector(".filter__word");

    toggle.addEventListener("click", function () {
      var open = bar.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      setFilter("");
      word.textContent = "all work";
      toggle.classList.add("is-on");
    });

    bar.addEventListener("click", function (e) {
      var b = e.target.closest(".filter__b");
      if (!b) return;
      setFilter(b.dataset.t);
      word.textContent = b.textContent;
      toggle.classList.remove("is-on");
    });
  }

  function setFilter(tag) {
    MAP.filter = tag || "";
    /* .filter__b buttons live inside .filter__list, a grandchild of .filter,
       not a direct child — querying .filter.children here always missed
       them, so a discipline chip never actually picked up its own is-on
       highlight once chosen. */
    Array.prototype.forEach.call($$(".filter__b"), function (b) {
      b.classList.toggle("is-on", b.dataset.t === MAP.filter);
    });
    MAP.nodes.forEach(function (v) {
      var hit = !MAP.filter || v.tags.indexOf(MAP.filter) > -1;
      v.el.classList.toggle("is-lit", !!MAP.filter && hit);
      v.el.classList.toggle("is-mute", !!MAP.filter && !hit);
    });
    /* filtering dims the pictures, never the lines */
  }

  function sizeMap() {
    if (!MAP.field) return;
    var r = MAP.field.getBoundingClientRect();
    MAP.w = r.width; MAP.h = r.height;
    MAP.svg.setAttribute("viewBox", "0 0 " + Math.round(r.width) + " " + Math.round(r.height));
    /* keep whole pictures inside the field, and keep them off each other */
    var shot = MAP.nodes[0].el.querySelector(".node__shot");
    var size = shot ? shot.getBoundingClientRect().width : 140;
    var pad  = size * 0.62 + 26;
    var xs = MAP.nodes.map(function (v) { return v.lx; });
    var ys = MAP.nodes.map(function (v) { return v.ly; });
    var w = Math.max.apply(null, xs) - Math.min.apply(null, xs) || 1;
    var h = Math.max.apply(null, ys) - Math.min.apply(null, ys) || 1;
    /* one scale for both axes, so the arrangement keeps its shape, then
       centred in the field */
    /* The field is far wider than it is tall, so a single uniform scale is
       always pinned by the height and leaves the sides empty. Scale the axes
       separately — x fills the width — but cap x against y so the shape of
       the arrangement is stretched, not destroyed. */
    var ky = (r.height - pad * 2) / h;
    var kx = Math.min((r.width - pad * 2) / w, ky * 2.6);
    MAP.nodes.forEach(function (v) {
      v.bx = r.width  / 2 + v.lx * kx;
      v.by = r.height / 2 + v.ly * ky;
    });

    /* The force layout works in abstract units; once it is mapped onto real
       pixels at a real picture size, neighbours can still end up on top of
       each other. A few passes of straight collision relaxation fixes that
       without disturbing the overall arrangement. A tighter buffer on
       narrow/mobile widths keeps a real but very thin gap instead of the
       roomier spacing desktop has space for. */
    var gapFactor = window.innerWidth <= 760 ? 1.04 : 1.16;
    var min = size * gapFactor, i, j, A, B, dx, dy, d, push;
    for (var pass = 0; pass < 60; pass++) {
      for (i = 0; i < MAP.nodes.length; i++) {
        for (j = i + 1; j < MAP.nodes.length; j++) {
          A = MAP.nodes[i]; B = MAP.nodes[j];
          dx = B.bx - A.bx; dy = B.by - A.by;
          d = Math.sqrt(dx * dx + dy * dy) || 0.01;
          if (d >= min) continue;
          push = (min - d) / 2;
          dx /= d; dy /= d;
          A.bx -= dx * push; A.by -= dy * push;
          B.bx += dx * push; B.by += dy * push;
        }
      }
      MAP.nodes.forEach(function (v) {
        v.bx = Math.max(pad, Math.min(r.width  - pad, v.bx));
        v.by = Math.max(pad, Math.min(r.height - pad, v.by));
      });
    }

    MAP.nodes.forEach(function (v) { v.x = v.bx; v.y = v.by; });
    drawMap();
  }

  function wireMap() {
    MAP.field.addEventListener("pointermove", function (e) {
      var r = MAP.field.getBoundingClientRect();
      MAP.mx = e.clientX - r.left; MAP.my = e.clientY - r.top;
      MAP.pointer = true;
      startMap();
    });
    MAP.field.addEventListener("pointerleave", function () {
      MAP.pointer = false; MAP.mx = MAP.my = -99999; startMap();
    });
    MAP.nodes.forEach(function (v) {
      v.el.addEventListener("pointerenter", function () { setHover(v.i); });
      v.el.addEventListener("pointerleave", function () { setHover(-1); });
      v.el.addEventListener("focus", function () { setHover(v.i); });
      v.el.addEventListener("blur",  function () { setHover(-1); });
    });
  }

  function setHover(i) {
    if (MAP.hovered === i) return;
    MAP.hovered = i;
    MAP.nodes.forEach(function (v) {
      v.el.classList.toggle("is-on", v.i === i);
      v.el.classList.toggle("is-off", i > -1 && v.i !== i && !linked(i, v.i));
    });
    /* the lines stay visible whatever is hovered — the ones touching the
       hovered node only darken */
    MAP.paths.forEach(function (el, li) {
      var L = MAP.links[li];
      el.classList.toggle("is-on", i > -1 && (L.a === i || L.b === i));
    });
    startMap();
  }

  function linked(a, b) {
    return MAP.links.some(function (L) {
      return (L.a === a && L.b === b) || (L.a === b && L.b === a);
    });
  }

  /* The soft avoid: a node inside AVOID of the cursor eases out of its way,
     falling off smoothly with distance, and eases back when the cursor goes. */
  function stepMap() {
    var moving = false;
    MAP.nodes.forEach(function (v) {
      var tx = 0, ty = 0;
      if (MAP.pointer && !prefersReduced.matches) {
        var dx = v.bx - MAP.mx, dy = v.by - MAP.my;
        var d = Math.sqrt(dx * dx + dy * dy);
        if (d < AVOID && d > 0.001) {
          var t = 1 - d / AVOID;
          var push = SHOVE * t * t;               /* squared: gentle at the edge */
          tx = dx / d * push; ty = dy / d * push;
        }
      }
      v.ox += (tx - v.ox) * 0.12;
      v.oy += (ty - v.oy) * 0.12;
      if (Math.abs(tx - v.ox) > 0.05 || Math.abs(ty - v.oy) > 0.05) moving = true;
      v.x = v.bx + v.ox; v.y = v.by + v.oy;
    });
    drawMap();
    return moving;
  }

  function drawMap() {
    MAP.nodes.forEach(function (v) {
      v.el.style.transform = "translate3d(" + (v.x).toFixed(1) + "px," + (v.y).toFixed(1) + "px,0)";
      var co = "x: " + Math.round(v.x) + "   y: " + Math.round(v.y);
      v.out.forEach(function (o) { if (o) o.textContent = co; });
    });
    MAP.paths.forEach(function (el, i) {
      var L = MAP.links[i], A = MAP.nodes[L.a], B = MAP.nodes[L.b];
      /* bow each link to one side so pairs never sit on top of each other */
      var mx = (A.x + B.x) / 2, my = (A.y + B.y) / 2;
      var dx = B.x - A.x, dy = B.y - A.y;
      var bow = 0.16 + (i % 3) * 0.05;
      el.setAttribute("d", "M" + A.x.toFixed(1) + " " + A.y.toFixed(1) +
        " Q" + (mx - dy * bow).toFixed(1) + " " + (my + dx * bow).toFixed(1) +
        " " + B.x.toFixed(1) + " " + B.y.toFixed(1));
    });
  }

  function startMap() {
    if (MAP.running || !MAP.field) return;
    MAP.running = true;
    (function loop() {
      var moving = stepMap();
      if (moving || MAP.pointer) requestAnimationFrame(loop);
      else MAP.running = false;
    })();
  }

  /* Barcelona time, with its offset from GMT, wherever the reader is. */
  function startClock() {
    var el = $(".clock");
    if (!el) return;
    var ZONE = "Europe/Madrid";
    function offset() {
      var d = new Date();
      var local = new Date(d.toLocaleString("en-US", { timeZone: ZONE }));
      var utc = new Date(d.toLocaleString("en-US", { timeZone: "UTC" }));
      var h = Math.round((local - utc) / 3600000);
      return "GMT" + (h >= 0 ? "+" : "") + h;
    }
    (function tickClock() {
      var t = new Date().toLocaleTimeString("en-GB", {
        timeZone: ZONE, hour12: false,
        hour: "2-digit", minute: "2-digit", second: "2-digit"
      });
      el.textContent = t + " " + offset();
      setTimeout(tickClock, 1000);
    })();
  }

  /* ============================================================= NAVBAR */
  /* Hides on the way down (past the hero), reappears the instant you scroll
     up — with a translucent floating ground instead of the top-of-page
     gradient, since it's then sitting over real content, not the map. */
  function wireMasthead() {
    var bar = $(".masthead");
    if (!bar) return;
    var lastY = 0, ticking = false;

    /* A case study is a position:fixed overlay with its own internal
       scroll — scrolling inside it never fires a "scroll" event on window,
       so without this the navbar's hidden/visible state would just freeze
       at whatever it happened to be when you clicked into the project
       (openStudy forces it visible on the way in; this keeps it behaving
       normally — hide on the way down, show on the way up — once you're
       actually reading). */
    function currentY() {
      var study = $(".study");
      if (study && !study.hidden) return study.scrollTop;
      return window.scrollY || 0;
    }

    function apply() {
      var y = currentY();
      var pastHero = y > 120;
      if (y > lastY && pastHero) bar.classList.add("is-hidden");
      else if (y < lastY) bar.classList.remove("is-hidden");
      bar.classList.toggle("is-floating", pastHero);
      lastY = y;
      ticking = false;
    }
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(apply);
    }
    lastY = currentY();
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("scroll", function (e) {
      if (e.target && e.target.classList && e.target.classList.contains("study")) onScroll();
    }, { passive: true, capture: true });
  }

  /* ============================================================== BURGER */
  /* Mobile nav. The two bars are drawn as loose, wavy strokes rather than
     ruler-straight ones — the same "hand drawn" language as the underline
     scribbles — and every open/close re-traces them with the same
     stroke-dasharray draw used there, while a plain CSS transform does the
     bar-to-X rotation. */
  function wireBurger() {
    var btn = $(".burger"), nav = $(".masthead__nav");
    if (!btn || !nav) return;

    var bars = $$(".burger__bar", btn);
    var lens = bars.map(function (bar) {
      var len = bar.getTotalLength();
      bar.style.strokeDasharray = len + " " + len;
      return len;
    });

    function redraw() {
      bars.forEach(function (bar, i) {
        bar.style.transition = "none";
        bar.style.strokeDashoffset = lens[i];
        bar.getBoundingClientRect();               /* force it before animating */
        bar.style.transition = "stroke-dashoffset .5s cubic-bezier(.4,0,.2,1)";
        bar.style.strokeDashoffset = "0";
      });
    }

    var open = false;
    function setOpen(v) {
      open = v;
      document.body.classList.toggle("nav-open", open);
      btn.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
      redraw();
    }

    btn.addEventListener("click", function () { setOpen(!open); });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);   /* a picked link closes the drawer */
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && open) setOpen(false);
    });
  }

  /* ======================================================== RENDER: works */
  /* The map is the way in; this is the plain reading of the same six, as a
     numbered grid. Numbering gives the section its rhythm and doubles as the
     order the work is meant to be read in. */
  function renderWorks() {
    var grid = $(".works__grid");
    if (!grid) return;

    var count = $(".count");
    if (count) count.textContent = "[" + String(S.projects.length).padStart(2, "0") + "]";

    var lede = $(".works .lede p");
    if (lede) lede.textContent = S.identity.tagline || "";

    grid.innerHTML = S.projects.map(function (p, i) {
      var n = String(i + 1).padStart(3, "0");
      return '<li class="work"><a class="work__a" href="#/' + esc(p.slug) + '">' +
               '<span class="work__no">' + n + "</span>" +
               '<span class="work__shot">' +
                 (p.cover ? '<img src="' + esc(p.cover) + '" alt="" loading="lazy" onerror="this.remove()">' : "") +
               "</span>" +
               '<span class="work__meta">' +
                 '<span class="work__title">' + esc(p.title) + "</span>" +
                 '<span class="work__cat">' + esc(p.category || "") + "</span>" +
                 '<span class="work__year">' + esc(p.year || "") + "</span>" +
               "</span>" +
               '<span class="work__go">[ view ]</span>' +
             "</a></li>";
    }).join("");
  }

  /* ========================================================= RENDER: about */
  function renderAbout() {
    var a = S.about;

    var headline = $(".about__headline");
    if (headline && a.headline) {
      headline.innerHTML = a.headline.map(function (seg) {
        return seg.b ? "<strong>" + esc(seg.t) + "</strong>" : esc(seg.t);
      }).join("");
    }

    $(".portrait").innerHTML = shot(a.portrait, "", "portrait__shot");

    $(".about__body").innerHTML =
      a.body.map(function (t) { return "<p>" + esc(t) + "</p>"; }).join("") +
      '<p class="rule">Education</p>' +
      '<ul class="stack">' +
        a.education.map(function (e) {
          return "<li><strong>" + esc(e.what) + "</strong><span>" + esc(e.where) + "</span></li>";
        }).join("") +
      "</ul>";

    $(".disciplines").innerHTML =
      '<span class="mark">[ what I do ]</span><ul>' +
      a.disciplines.map(function (d) {
        return "<li><strong>" + esc(d.title) + "</strong><span>" + esc(d.desc) + "</span></li>";
      }).join("") + "</ul>";

    wireHarp();
    if (!HARP.observed && window.ResizeObserver) {
      HARP.observed = true;
      new ResizeObserver(wireHarp).observe($(".disciplines ul"));
    }
  }

  /* ==================================================== THE HARP STRINGS */
  /* The rules between the "what I do" rows are pluckable, physically
     modelled strings — grab one, drag, let go, and it springs back with a
     soft tone. Adapted from a Framer reference component built as a
     full-screen canvas nav with text riding the bent line; here the text
     stays put in its left/right columns (that layout was a separate, later
     request) and only the divider itself is interactive, which is what
     "the interaction" sensibly reduces to once the two aren't the same
     thing any more. SVG instead of canvas: a <path> re-curves itself with
     one attribute write and scales losslessly, so there's no
     devicePixelRatio bookkeeping or off-screen text measuring to port. */
  var HARP = { strings: [], svg: null, running: false, observed: false };
  var HARP_TONES = [261.63, 293.66, 329.63, 349.23, 392.0, 440.0]; // C D E F G A
  var HARP_SPRING = 0.22, HARP_DAMP = 0.965, HARP_MAXOFF = 22, HARP_RELEASE = 0.32;
  var harpAudioCtx = null;

  function harpInitAudio() {
    if (harpAudioCtx) { if (harpAudioCtx.state === "suspended") harpAudioCtx.resume(); return; }
    var AC = window.AudioContext || window.webkitAudioContext;
    if (AC) harpAudioCtx = new AC();
  }

  function harpPluck(freq) {
    if (!harpAudioCtx || harpAudioCtx.state !== "running") return;
    var now = harpAudioCtx.currentTime;
    var osc = harpAudioCtx.createOscillator(), gain = harpAudioCtx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.05, now + 0.015);   /* a gentle tick, not a note */
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);
    osc.connect(gain);
    gain.connect(harpAudioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.4);
  }

  function wireHarp() {
    var host = $(".disciplines ul");
    if (!host) return;

    var rows = $$("li", host);
    if (!rows.length) return;

    if (HARP.svg) HARP.svg.remove();
    HARP.strings = [];

    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "disciplines__strings");
    svg.setAttribute("preserveAspectRatio", "none");
    host.appendChild(svg);
    HARP.svg = svg;

    /* one string at the top of the first row, one under every row after that
       — n+1 lines bounding n rows, top and bottom both closed off */
    var w = host.clientWidth;
    var ys = [0];
    rows.forEach(function (li) { ys.push(li.offsetTop + li.offsetHeight); });
    var h = ys[ys.length - 1];

    svg.setAttribute("viewBox", "0 0 " + w + " " + h);
    svg.setAttribute("width", w);
    svg.setAttribute("height", h);

    ys.forEach(function (y, i) {
      var line = document.createElementNS(svg.namespaceURI, "path");
      line.setAttribute("class", "string__line");
      var hit = document.createElementNS(svg.namespaceURI, "path");
      hit.setAttribute("class", "string__hit");
      svg.appendChild(line);
      svg.appendChild(hit);

      var st = {
        y: y, offset: 0, velocity: 0, dragging: false,
        freq: HARP_TONES[i % HARP_TONES.length], line: line, hit: hit
      };
      HARP.strings.push(st);
      drawString(st, w);

      hit.addEventListener("pointerdown", function (e) {
        harpInitAudio();
        st.dragging = true;
        st._dragY = e.clientY;
        st._dragStart = st.offset;
        try { hit.setPointerCapture(e.pointerId); } catch (err) {}
        hit.style.cursor = "grabbing";
      });
      hit.addEventListener("pointermove", function (e) {
        if (!st.dragging) return;
        var d = e.clientY - st._dragY;
        var raw = st._dragStart + d;
        st.offset = raw < -HARP_MAXOFF ? -HARP_MAXOFF : raw > HARP_MAXOFF ? HARP_MAXOFF : raw;
        drawString(st, host.clientWidth);
      });
      function release(e) {
        if (!st.dragging) return;
        st.dragging = false;
        st.velocity = -st.offset * HARP_RELEASE;
        hit.style.cursor = "grab";
        if (Math.abs(st.offset) > 1) harpPluck(st.freq);
        startHarpLoop();
      }
      hit.addEventListener("pointerup", release);
      hit.addEventListener("pointercancel", release);
    });

    startHarpLoop();
  }

  function drawString(st, w) {
    var midY = st.y + st.offset;
    var d = "M0," + st.y + " Q" + (w / 2) + "," + midY + " " + w + "," + st.y;
    st.line.setAttribute("d", d);
    st.hit.setAttribute("d", d);
  }

  function startHarpLoop() {
    if (HARP.running || prefersReduced.matches) return;
    HARP.running = true;
    (function tick() {
      var moving = false;
      var w = $(".disciplines ul") ? $(".disciplines ul").clientWidth : 0;
      HARP.strings.forEach(function (st) {
        if (st.dragging) { moving = true; return; }
        if (Math.abs(st.offset) < 0.05 && Math.abs(st.velocity) < 0.05) {
          if (st.offset !== 0) { st.offset = 0; st.velocity = 0; drawString(st, w); }
          return;
        }
        var force = -st.offset * HARP_SPRING;
        st.velocity += force;
        st.velocity *= HARP_DAMP;
        st.offset += st.velocity;
        drawString(st, w);
        moving = true;
      });
      if (moving) requestAnimationFrame(tick);
      else HARP.running = false;
    })();
  }

  /* ======================================================= RENDER: contact */
  function renderContact() {
    var c = S.contact;

    $(".colophon h2").textContent = c.line;

    var sub = $(".colophon__sub");
    if (sub) sub.textContent = c.sub || "";

    /* the dedicated email CTA — separate from the social links below it */
    var email = $(".colophon__email");
    if (email) {
      if (S.identity.email) {
        email.href = "mailto:" + S.identity.email;
        email.hidden = false;
        email.innerHTML =
          '<span class="colophon__email-i" aria-hidden="true"></span>' +
          esc(S.identity.email);
      } else {
        email.hidden = true;
      }
    }

    $(".colophon__links").innerHTML = c.links.map(function (l) {
      return '<a href="' + esc(l.href) + '" rel="noopener"' +
             (/^https?:/.test(l.href) ? ' target="_blank"' : "") + ">" + esc(l.label) + "</a>";
    }).join("");
    $(".colophon__foot").innerHTML =
      "<span>" + new Date().getFullYear() + " &nbsp; " + esc(S.identity.name) + "</span>" +
      '<a href="#top">back to the top</a>';

    wireScribbles(document.querySelectorAll(".colophon__email, .colophon__links a, .colophon__foot a"));
  }

  /* ============================================================ CASE STUDY */
  var studyEl, lastFocus = null;

  function studyMarkup(p) {
    var idx = S.projects.findIndex(function (x) { return x.slug === p.slug; });
    var next = S.projects[(idx + 1) % S.projects.length];

    var spreads = (p.sections || []).map(function (sec) {
      var text = "";
      if (sec.heading || sec.body) {
        text = '<div class="spread__text">' +
                 (sec.heading ? "<h2>" + esc(sec.heading) + "</h2>" : "") +
                 (sec.body ? "<p>" + esc(sec.body) + "</p>" : "") +
               "</div>";
      }
      var shots = (sec.images || []).map(function (im) {
        return '<figure class="plate">' + shot(im.src, "", "plate__shot") + "</figure>";
      }).join("");
      return '<section class="spread">' + text +
             (shots ? '<div class="spread__shots">' + shots + "</div>" : "") +
             "</section>";
    }).join("");

    return (
      '<div class="study__inner">' +
        '<header class="study__head">' +
          '<div class="study__head__row">' +
            '<a class="study__back" href="#work">back to the map</a>' +
            "<h1>" + esc(p.title) + "</h1>" +
          "</div>" +
          '<div class="study__tags"><span>' + esc(p.category || "") + "</span><span>" + esc(p.year || "") + "</span></div>" +
          (p.intro ? '<p class="study__lede">' + esc(p.intro) + "</p>" : "") +
          (p.link ? '<a class="study__link" href="' + esc(p.link.href) + '" target="_blank" rel="noopener">' +
                    esc(p.link.label) + "</a>" : "") +
        "</header>" +
        (p.cover ? '<figure class="plate">' + shot(p.cover, "", "plate__shot") + "</figure>" : "") +
        spreads +
        '<footer class="study__foot">' +
          '<div class="study__credits">' +
            ((p.credits && p.credits.length) ? esc(p.credits.join(" · ")) : "") +
          "</div>" +
          '<div class="study__next"><span class="study__year">Next</span>' +
            '<a href="#/' + esc(next.slug) + '">' + esc(next.title) + "</a>" +
          "</div>" +
        "</footer>" +
      "</div>"
    );
  }

  function openStudy(slug) {
    var p = S.projects.find(function (x) { return x.slug === slug; });
    if (!p) { closeStudy(); return; }

    lastFocus = document.activeElement;
    studyEl.innerHTML = studyMarkup(p);
    studyEl.hidden = false;
    studyEl.scrollTop = 0;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(function () { studyEl.classList.add("is-open"); });
    var bar = $(".masthead");
    if (bar) { bar.classList.remove("is-hidden"); bar.classList.add("is-floating"); }
    wireScribbles(studyEl.querySelectorAll(".study__back, .study__link, .study__next a"));
    document.title = p.title + " — " + S.identity.name;
    studyEl.focus();
  }

  function closeStudy() {
    if (studyEl.hidden) return;
    studyEl.classList.remove("is-open");
    document.body.style.overflow = "";
    document.title = S.identity.name + " — " + S.identity.role;
    setTimeout(function () { studyEl.hidden = true; studyEl.innerHTML = ""; }, 340);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function route() {
    var h = location.hash || "";
    if (h.indexOf("#/") === 0) openStudy(h.slice(2));
    else closeStudy();
  }

  /* ==================================================================== go */
  function init() {
    renderMasthead();
    renderMap();
    renderWorks();
    wireScribbles(document.querySelectorAll(".masthead__nav a, .cue, .wordmark"));
    startClock();
    renderAbout();
    renderContact();
    wireMasthead();
    wireBurger();

    studyEl = $(".study");

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !studyEl.hidden) location.hash = "#work";
    });
    window.addEventListener("hashchange", route);

    route();

    var rt;
    window.addEventListener("resize", function () {
      clearTimeout(rt);
      rt = setTimeout(sizeMap, 140);
    });

    document.documentElement.classList.add("is-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
