/* =========================================================
   Flink for AI 教程 · 幻灯片引擎
   支持：翻页 / 逐步揭示(fragment) / 键盘 / 点击 / 触摸 / 概览 / 进度
   纯原生 JS，无外部依赖
   ========================================================= */
(function () {
  'use strict';

  const slides = Array.from(document.querySelectorAll('.slide'));
  const total = slides.length;
  let current = 0;      // 当前页 index
  let fragStep = 0;     // 当前页已揭示的 fragment 数

  /* =========================================================
     自适应缩放 · Auto-fit Scale
     - 设计基准：1440 × 810（与 CSS --slide-w/--slide-h 对应）
     - 根据窗口尺寸计算等比 scale，写入 CSS var
     - 竖屏/极小屏走 CSS 兜底的 responsive 模式（禁用缩放）
     ========================================================= */
  const DESIGN_W = 1440;
  const DESIGN_H = 810;

  function isResponsiveFallback() {
    // 与 CSS @media 保持一致：竖屏（<=4/5）或极小屏
    const w = window.innerWidth;
    const h = window.innerHeight;
    return w <= 640 || (w / h) <= (4 / 5);
  }

  function fitScale() {
    if (isResponsiveFallback()) {
      document.documentElement.style.removeProperty('--scale');
      return;
    }
    const w = window.innerWidth;
    const h = window.innerHeight;
    const scale = Math.min(w / DESIGN_W, h / DESIGN_H);
    document.documentElement.style.setProperty('--scale', scale.toFixed(4));
  }

  fitScale();
  // 节流：避免连续 resize 触发大量重排
  let rzTimer = null;
  function onResize() {
    if (rzTimer) cancelAnimationFrame(rzTimer);
    rzTimer = requestAnimationFrame(() => {
      fitScale();
      // 也重跑单页内容 fit（因为 fallback 切换可能改变可用高度）
      if (typeof fitCurrentSlide === 'function') fitCurrentSlide();
    });
  }
  window.addEventListener('resize', onResize);
  document.addEventListener('fullscreenchange', onResize);
  window.addEventListener('orientationchange', onResize);

  const progress = document.getElementById('progress');
  const counterCur = document.getElementById('cur');
  const counterTot = document.getElementById('tot');
  const overview = document.getElementById('overview');
  const ovGrid = document.getElementById('ovGrid');
  const chapnav = document.getElementById('chapnav');

  if (counterTot) counterTot.textContent = String(total).padStart(2, '0');

  /* ---- 章节定义（顶部简化目录） ---- */
  const CHAPTERS = [
    { id: '1', label: '全景' },
    { id: '2', label: '变革' },
    { id: '3', label: '演进' },
    { id: '4', label: '架构' },
    { id: '5', label: '技术' },
    { id: '6', label: '案例' },
    { id: '7', label: '社区' },
    { id: '8', label: '未来' }
  ];
  // 每个章节首页 index，供点击跳转
  const chapterFirst = {};
  slides.forEach((s, i) => {
    const c = s.dataset.chapter;
    if (c && chapterFirst[c] === undefined) chapterFirst[c] = i;
  });

  /* ---- HUD 进度条章节分段刻度 ---- */
  function buildChapTicks() {
    if (total <= 1) return;
    const bar = document.createElement('div');
    bar.className = 'chap-ticks';
    bar.id = 'chapTicks';
    document.body.appendChild(bar);
    CHAPTERS.forEach((c) => {
      const idx = chapterFirst[c.id];
      if (idx === undefined || idx === 0) return;
      const t = document.createElement('div');
      t.className = 'tick';
      t.dataset.chid = c.id;
      t.dataset.idx = idx;
      t.style.left = ((idx / (total - 1)) * 100) + '%';
      t.title = '第 ' + c.id + ' 章 · ' + c.label;
      bar.appendChild(t);
    });
  }
  function updateChapTicks() {
    const bar = document.getElementById('chapTicks');
    if (!bar) return;
    Array.from(bar.children).forEach((t) => {
      const idx = parseInt(t.dataset.idx, 10);
      t.classList.toggle('done', idx <= current);
    });
  }

  /* ---- 取当前页的 fragments ---- */
  function frags(idx) {
    return Array.from(slides[idx].querySelectorAll('.frag'))
      .sort((a, b) => (+ (a.dataset.frag || 0)) - (+ (b.dataset.frag || 0)));
  }

  /* ---- 单页内容溢出兜底：如果 wrap 高度超过可视区，二次缩小 ---- */
  function fitCurrentSlide() {
    if (isResponsiveFallback()) return;
    const slide = slides[current];
    if (!slide) return;
    const wrap = slide.querySelector('.wrap');
    if (!wrap) return;

    // 先重置，避免上次缩放影响测量
    slide.classList.remove('autoshrink');
    wrap.style.removeProperty('--wrap-scale');

    // 设计基准下的可用高度 = slide 高 - 上下 padding
    const cs = getComputedStyle(slide);
    const padTop = parseFloat(cs.paddingTop) || 0;
    const padBot = parseFloat(cs.paddingBottom) || 0;
    const avail = DESIGN_H - padTop - padBot;

    // 用 requestAnimationFrame 等布局完成
    requestAnimationFrame(() => {
      const contentH = wrap.scrollHeight;
      if (contentH > avail + 2) {
        const s = Math.max(0.6, avail / contentH);
        wrap.style.setProperty('--wrap-scale', s.toFixed(4));
        slide.classList.add('autoshrink');
      }
    });
  }

  /* ---- 渲染当前页状态 ---- */
  function render() {
    slides.forEach((s, i) => {
      s.classList.remove('active', 'past');
      if (i === current) s.classList.add('active');
      else if (i < current) s.classList.add('past');
    });

    // fragment 揭示
    const fs = frags(current);
    fs.forEach((f, i) => f.classList.toggle('shown', i < fragStep));

    // 进度与计数
    const pct = total > 1 ? (current / (total - 1)) * 100 : 100;
    if (progress) progress.style.width = pct + '%';
    if (counterCur) counterCur.textContent = String(current + 1).padStart(2, '0');

    // 顶部章节条高亮
    renderChapnav();
    updateChapTicks();

    // 内容溢出兜底
    fitCurrentSlide();

    location.hash = 'p' + (current + 1);
  }

  /* ---- 顶部简化目录：高亮当前章节，标记已讲章节 ---- */
  function renderChapnav() {
    if (!chapnav) return;
    const curChap = slides[current].dataset.chapter || '';
    // 封面 / 致谢页隐藏章节条
    const hide = slides[current].classList.contains('cover');
    chapnav.classList.toggle('hide', hide);
    Array.from(chapnav.children).forEach((el) => {
      const cid = el.dataset.chid;
      el.classList.toggle('on', cid === curChap);
      el.classList.toggle('done', curChap !== '' && (+cid) < (+curChap));
    });
  }

  function buildChapnav() {
    if (!chapnav) return;
    CHAPTERS.forEach((c) => {
      const el = document.createElement('div');
      el.className = 'ci';
      el.dataset.chid = c.id;
      el.innerHTML = '<span class="n">' + c.id + '</span><span class="lbl">' + c.label + '</span>';
      el.addEventListener('click', () => {
        if (chapterFirst[c.id] !== undefined) goTo(chapterFirst[c.id], false);
      });
      chapnav.appendChild(el);
    });
  }

  /* ---- 前进：先揭示 fragment，再翻页 ---- */
  function next() {
    const fs = frags(current);
    if (fragStep < fs.length) {
      fragStep++;
      render();
      return;
    }
    if (current < total - 1) {
      current++;
      fragStep = frags(current).length ? 0 : 0; // 新页从 0 开始揭示
      // 如果新页没有 fragment，直接算作全部展示
      render();
    }
  }

  /* ---- 后退：先回收 fragment，再翻页 ---- */
  function prev() {
    if (fragStep > 0) {
      fragStep--;
      render();
      return;
    }
    if (current > 0) {
      current--;
      fragStep = frags(current).length; // 回到上一页时全部展开
      render();
    }
  }

  function goTo(idx, showAll) {
    if (idx < 0 || idx >= total) return;
    current = idx;
    fragStep = showAll ? frags(current).length : 0;
    render();
  }

  /* ---- 键盘 ---- */
  document.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'ArrowRight': case ' ': case 'PageDown':
        e.preventDefault(); next(); break;
      case 'ArrowLeft': case 'PageUp':
        e.preventDefault(); prev(); break;
      case 'ArrowDown':
        e.preventDefault(); goTo(Math.min(current + 1, total - 1), true); break;
      case 'ArrowUp':
        e.preventDefault(); goTo(Math.max(current - 1, 0), true); break;
      case 'Home': e.preventDefault(); goTo(0, false); break;
      case 'End': e.preventDefault(); goTo(total - 1, true); break;
      case 'o': case 'O': toggleOverview(); break;
      case 'f': case 'F': toggleFullscreen(); break;
      case 'n': case 'N': document.body.classList.toggle('notes-on'); break;
      case 'p': case 'P': window.print(); break;
      case 'Escape': if (overview.classList.contains('open')) toggleOverview(); break;
    }
  });

  /* ---- 点击区域 ---- */
  const zl = document.getElementById('zoneL');
  const zr = document.getElementById('zoneR');
  if (zl) zl.addEventListener('click', prev);
  if (zr) zr.addEventListener('click', next);

  document.getElementById('btnPrev')?.addEventListener('click', prev);
  document.getElementById('btnNext')?.addEventListener('click', next);
  document.getElementById('btnMenu')?.addEventListener('click', toggleOverview);
  document.getElementById('btnFull')?.addEventListener('click', toggleFullscreen);

  /* ---- 触摸滑动 ---- */
  let tx = 0, ty = 0;
  document.addEventListener('touchstart', (e) => {
    tx = e.changedTouches[0].clientX; ty = e.changedTouches[0].clientY;
  }, { passive: true });
  document.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - tx;
    const dy = e.changedTouches[0].clientY - ty;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      dx < 0 ? next() : prev();
    }
  }, { passive: true });

  /* ---- 全屏 ---- */
  function toggleFullscreen() {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
    else document.exitFullscreen?.();
  }

  /* ---- 概览目录 ---- */
  function buildOverview() {
    if (!ovGrid) return;
    slides.forEach((s, i) => {
      const title = s.dataset.title || ('Slide ' + (i + 1));
      const kick = s.dataset.kicker || '';
      const card = document.createElement('div');
      card.className = 'ov-card';
      card.innerHTML = '<div class="ci">' + String(i + 1).padStart(2, '0') +
        (kick ? ' · ' + kick : '') + '</div><div class="ct">' + title + '</div>';
      card.addEventListener('click', () => { goTo(i, false); toggleOverview(); });
      ovGrid.appendChild(card);
    });
  }
  function toggleOverview() { overview.classList.toggle('open'); }
  document.getElementById('ovClose')?.addEventListener('click', toggleOverview);

  /* ---- 初始化（支持从 hash 恢复） ---- */
  buildChapnav();
  buildChapTicks();
  buildOverview();
  const m = location.hash.match(/p(\d+)/);
  if (m) { const p = parseInt(m[1], 10) - 1; if (p >= 0 && p < total) current = p; }
  fragStep = 0;
  render();
})();
