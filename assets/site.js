(function(){
  // Simple carousel for project pages
  function initCarousel(root){
    const viewport = root.querySelector('.carousel-viewport');
    const prevBtn = root.querySelector('[data-prev]');
    const nextBtn = root.querySelector('[data-next]');
    const dotsWrap = root.querySelector('.dots');

    const images = (root.getAttribute('data-images') || '')
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    if(!viewport || images.length === 0) return;

    let idx = 0;
    const els = [];

    function makeImg(src){
      const img = new Image();
      img.loading = 'eager';
      img.decoding = 'async';
      img.src = src;
      img.alt = '';
      img.addEventListener('error', () => {
        // If an image fails to load, hide it and also disable its dot
        img.style.display = 'none';
        const i = els.indexOf(img);
        const dot = dotsWrap?.children?.[i];
        if(dot) dot.style.display = 'none';
      });
      viewport.appendChild(img);
      return img;
    }

    images.forEach((src,i)=>{
      els.push(makeImg(src));
      if(dotsWrap){
        const d = document.createElement('button');
        d.className = 'dot' + (i===0?' is-active':'');
        d.type = 'button';
        d.setAttribute('aria-label', 'Go to image ' + (i+1));
        d.addEventListener('click', ()=>set(i));
        dotsWrap.appendChild(d);
      }
    });

    function set(i){
      idx = (i + els.length) % els.length;
      els.forEach((el,k)=>el.classList.toggle('is-active', k===idx));
      if(dotsWrap){
        [...dotsWrap.children].forEach((d,k)=>d.classList.toggle('is-active', k===idx));
      }
    }

    function next(){set(idx+1)}
    function prev(){set(idx-1)}

    nextBtn?.addEventListener('click', next);
    prevBtn?.addEventListener('click', prev);

    // Keyboard
    window.addEventListener('keydown', (e)=>{
      if(e.key === 'ArrowRight') next();
      if(e.key === 'ArrowLeft') prev();
    });

    // Swipe
    let startX = null;
    viewport.addEventListener('touchstart', (e)=>{startX = e.touches[0].clientX;}, {passive:true});
    viewport.addEventListener('touchend', (e)=>{
      if(startX === null) return;
      const endX = e.changedTouches[0].clientX;
      const dx = endX - startX;
      if(Math.abs(dx) > 30){
        dx < 0 ? next() : prev();
      }
      startX = null;
    }, {passive:true});

    set(0);
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    document.querySelectorAll('[data-carousel]').forEach(initCarousel);
  });

  // Mobile menu toggle
  (function(){
    const toggle = document.querySelector('[data-menu-toggle]');
    const nav = document.querySelector('[data-site-nav]');
    if(!toggle || !nav) return;

    function close(){
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded','false');
      toggle.setAttribute('aria-label','Open menu');
    }
    function open(){
      nav.classList.add('is-open');
      toggle.setAttribute('aria-expanded','true');
      toggle.setAttribute('aria-label','Close menu');
    }

    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.contains('is-open');
      isOpen ? close() : open();
    });

    nav.addEventListener('click', (e) => {
      if(e.target && e.target.matches('a')) close();
    });

    document.addEventListener('keydown', (e) => {
      if(e.key === 'Escape') close();
    });
  })();

})();
