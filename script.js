'use strict';

const btnMobileNav = document.querySelector('.btn-mobile-nav');
const headerEl = document.querySelector('.header');
const copyrightYear = document.querySelector('.year');
const allLinks = document.querySelectorAll('a:link');

btnMobileNav.addEventListener('click', () => {
  headerEl.classList.toggle('nav-open');
});

const year = new Date().getFullYear();
copyrightYear.innerHTML = year;

allLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (!href.startsWith('tel') && !href.startsWith('mailto')) e.preventDefault();
    //scroll to the top
    if (href === '#')
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    //scroll to other links
    if (href !== '#' && href.startsWith('#')) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: 'smooth' });
    }
    //close the mobile nav
    if (link.classList.contains('main-nav-link') && headerEl.classList.contains('nav-open')) {
      headerEl.classList.toggle('nav-open');
    }
  });
});

//sticky navigation

const sectionHeroEl = document.querySelector('.section-hero');

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    if (ent.isIntersecting === false) {
      document.querySelector('.header').classList.add('sticky');
      sectionHeroEl.style.marginTop = '9.6rem';
    } else if (ent.isIntersecting === true) {
      document.querySelector('.header').classList.remove('sticky');
      sectionHeroEl.style.marginTop = '0';
    }
  },
  {
    root: null, //it is the viewport
    threshold: 0,
    rootMargin: '-80px',
  }
);

obs.observe(sectionHeroEl);

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();