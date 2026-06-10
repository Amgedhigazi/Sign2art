// Shared nav + footer + lightbox injected on every page
(function(){
  const page = window.location.pathname.split('/').pop() || 'index.html';
  const isHome = page === 'index.html' || page === '';

  document.body.insertAdjacentHTML('afterbegin', `
    <nav>
      <a class="logo" href="index.html">SIGN²ART</a>
      <ul class="nav-links">
        <li><a href="index.html#services" ${isHome?'':''}> Services</a></li>
        <li><a href="index.html#about">About</a></li>
        <li><a href="index.html#gallery">Gallery</a></li>
        <li><a href="index.html#contact">Contact</a></li>
      </ul>
    </nav>
  `);

  document.body.insertAdjacentHTML('beforeend', `
    <footer>
      <div class="footer-top">
        <div>
          <div class="footer-logo">SIGN²ART</div>
          <div class="footer-tagline">Photography · Design · Vision — Bochum, Germany</div>
          <div class="socials">
            <a class="social" href="https://www.facebook.com/Amged-Higazi-177611252335364/" target="_blank">f</a>
            <a class="social" href="https://www.instagram.com/amgedhigazi/" target="_blank">in</a>
            <a class="social" href="https://www.youtube.com/user/montamora/featured" target="_blank">▶</a>
          </div>
        </div>
        <div class="footer-right">
          <p>Portrait · Fashion · Events · Cars · Food</p>
          <p><a href="mailto:sign2art@gmail.com">sign2art@gmail.com</a></p>
        </div>
      </div>
      <div class="footer-bottom">© 2024 Amged Higazi — Sign²Art · All rights reserved</div>
    </footer>
    <div id="lightbox">
      <button class="lb-close" onclick="closeLB()">×</button>
      <button class="lb-nav" id="lb-prev" onclick="navLB(-1)">‹</button>
      <img id="lb-img" src="" alt="">
      <button class="lb-nav" id="lb-next" onclick="navLB(1)">›</button>
      <div id="lb-counter"></div>
    </div>
  `);

  // Lightbox logic
  window._lbImgs = [];
  window._lbIdx = 0;
  window.openLB = function(imgs, idx){
    window._lbImgs = imgs; window._lbIdx = idx;
    document.getElementById('lb-img').src = imgs[idx];
    document.getElementById('lb-counter').textContent = (idx+1)+' / '+imgs.length;
    document.getElementById('lightbox').classList.add('open');
    document.body.style.overflow='hidden';
  };
  window.closeLB = function(){
    document.getElementById('lightbox').classList.remove('open');
    document.body.style.overflow='';
  };
  window.navLB = function(dir){
    window._lbIdx = (window._lbIdx+dir+window._lbImgs.length)%window._lbImgs.length;
    const img=document.getElementById('lb-img');
    img.style.opacity='0';
    setTimeout(()=>{
      img.src=window._lbImgs[window._lbIdx];
      document.getElementById('lb-counter').textContent=(window._lbIdx+1)+' / '+window._lbImgs.length;
      img.style.opacity='1';
    },150);
  };
  document.getElementById('lightbox').addEventListener('click',function(e){if(e.target===this)closeLB();});
  document.addEventListener('keydown',e=>{
    if(!document.getElementById('lightbox').classList.contains('open'))return;
    if(e.key==='Escape')closeLB();
    if(e.key==='ArrowLeft')navLB(-1);
    if(e.key==='ArrowRight')navLB(1);
  });

  // Scroll fade
  const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');});},{threshold:0.12});
  document.querySelectorAll('.fade-up').forEach(el=>obs.observe(el));
})();
