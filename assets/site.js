// YBYÁ — project page keyboard navigation (optional)
(function(){
  const gallery = document.querySelector('.gallery');
  if(!gallery) return;
  const slides = Array.from(gallery.querySelectorAll('.slide'));
  const slideH = () => slides[0]?.getBoundingClientRect().height || 0;
  function go(dir){
    const h = slideH();
    if(!h) return;
    gallery.scrollBy({ top: dir * h, left: 0, behavior: 'smooth' });
  }
  window.addEventListener('keydown', (e) => {
    const k = e.key;
    if(k === 'ArrowDown' || k === 'PageDown' || k === ' '){e.preventDefault(); go(1);}
    if(k === 'ArrowUp' || k === 'PageUp'){e.preventDefault(); go(-1);}
  }, { passive:false });
})();