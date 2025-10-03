// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const list = document.querySelector('#nav-menu');
if (toggle && list){
  toggle.addEventListener('click', () => {
    const open = list.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}

// IntersectionObserver section reveals
const obs = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); } });
},{ threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

// Current year in footer
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// Smooth scroll for in-page links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', (e)=>{
    const id = a.getAttribute('href');
    const target = document.querySelector(id);
    if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth', block:'start'}); }
  });
});
