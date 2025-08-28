// import LocomotiveScroll from 'locomotive-scroll';

const scroll = new LocomotiveScroll({
  el: document.querySelector('#main'),
  smooth: true
});

function firstPageAnimation(){
  var tl = gsap.timeline()

  tl.from('.nav',{
    y:'-10',
    opacity:0,
    duration: 1.5,
    ease: Expo.easeInOut,
  })

  .to('.boundingElem',{
    y:'0',
    duration: 2,
    ease: Expo.easeInOut,
    delay:-1,
    stagger: 0.2,
  })

  .from('.hero__footer',{
    y:-10,
    opacity:0,
    duration: 1.5,
    delay:-1,
    ease: Expo.easeInOut,
  })
};

function circleMouseFollower(){
  window.addEventListener('mousemove',(dets)=>{
    document.querySelector('#miniCircle').style.transform = `
    translate(${dets.clientX}px, ${dets.clientY}px)
    `;
  });
};

document.querySelectorAll('.elem').forEach(function(elem){
  elem.addEventListener('mouseleave',(dets)=>{
    gsap.to(elem.querySelector("img"),{
      opacity: 0,
      ease: Power3,
      duration: .5,
    });
  });
});


document.querySelectorAll('.elem').forEach(function(elem){
  var rotate = 0;
  var diffrot = 0;
  elem.addEventListener('mousemove',(dets)=>{
    var diff = dets.clientY - elem.getBoundingClientRect().top;
    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;

    gsap.to(elem.querySelector("img"),{
      opacity: 1,
      ease: Power3,
      top: diff,
      left: dets.clientX,
      rotate: gsap.utils.clamp(-20,20,diffrot),
    });
  });
});

circleMouseFollower();
firstPageAnimation();