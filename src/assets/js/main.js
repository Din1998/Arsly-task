/* Main Js Start */

(function ($) {
  "use strict";

  $(document).ready(function () {









  });



  // All GSAP Start Here
  document.addEventListener("DOMContentLoaded", function () {


    gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

    let gmm = gsap.matchMedia();


    if (document.querySelector('#smooth-wrapper') && document.querySelector('#smooth-content')) {
      const smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.3,
        effects: true,
        smoothTouch: 0.1,
        ignoreMobileResize: true
      });

      window.addEventListener("load", () => {
        ScrollTrigger.refresh();
      });
    }



    // preloader
    $(window).on("load", function () {
      if ($('.preloader').length) {
        const isMobile = window.innerWidth <= 1024;
        const tl = gsap.timeline();

        tl.from(".preloader .block", {
          scaleX: 0,
          duration: 0.8,
          ease: "power1.in",
          delay: 2,
          stagger: 0.04
        })
          .to(".preloader", {
            yPercent: -100,
            duration: 0.6,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.set(".preloader", { display: "none" });
            }
          })
          .from(".project--section", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
          });

        if (!isMobile) {
          tl.from(".project--section .section--title", {
            duration: 0.8,
            ease: "ease",
            filter: "blur(5px)",
            scale: 1.1,
            transformStyle: "preserve-3d",
            opacity: 0,
          }, "<")
            .fromTo(".section-content--wrap.one .heading--wrap .bar",
              { width: "100px" },
              {
                width: "188px",
                duration: 0.8,
                ease: "power3.out"
              }, "<"
            )
            .from(".project--section .thumb.two", {
              scale: 0.95,
              opacity: 0,
              duration: 0.8,
              ease: "power3.out",
              stagger: 0.15
            }, "<")
            .from(".project--section .thumb.one", {
              x: -30,
              rotate: -5,
              opacity: 0,
              duration: 0.8,
              ease: "power3.out"
            })
            .from(".project--section .thumb.three", {
              x: 30,
              rotate: 5,
              opacity: 0,
              duration: 0.8,
              ease: "power3.out"
            }, "<");
        }
      }
    });




  
      if ($('.service--section').length) {
        gsap.utils.toArray(".service--section").forEach(function (container) {
          let splitText = new SplitText('.service--section .content--wrap .title', { type: "words" });
          let words = splitText.words;
          let to = gsap.timeline({
            scrollTrigger: {
              trigger: container,
              start: "top 60%",
              end: "bottom top",
              toggleActions: "play none none none",
            }
          });
          to.from(
            words,
            {
              opacity: 0,
              y: 50,
              duration: 0.8,
              ease: "power2.out",
              stagger: 0.1,
            },
          );
        });
      }



    gmm.add("(min-width: 1024px)", () => {
      const btns = document.querySelectorAll(".btn");
      btns.forEach(btn => {
        btn.addEventListener("mouseenter", () => {
          gsap.to(btn, {
            scale: 1.01,
            y: -2,
            duration: 0.20,
            ease: "power2.out"
          });
        });

        btn.addEventListener("mouseleave", () => {
          gsap.to(btn, {
            scale: 1,
            y: 0,
            duration: 0.4,
            ease: "elastic.out(1, 0.3)"
          });
        });
      });
    });



    if ($('.scroll--text').length) {
      ScrollTrigger.create({
        trigger: ".scroll--text",
        start: "top 80%",
        end: "top 20%",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress * 100;

          document.querySelector(".scroll--text").style.background =
            `linear-gradient(to right, #ffffffff ${progress}%, #ffffffb3 ${progress}%)`;
        }
      });
    }


    function globalTextSplit(selector) {
      const elements = document.querySelectorAll(selector);

      elements.forEach(el => {
        const letters = el.innerText.split("");
        el.innerHTML = "";

        letters.forEach(letter => {
          el.innerHTML += `<span>${letter}</span>`;
        });
        gsap.fromTo(el.querySelectorAll("span"),
          {
            x: 50,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.easeOut",
            stagger: {
              from: "start",
              amount: 0.5
            },
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              end: "bottom 20%",
            }
          }
        );
      });
    }

    globalTextSplit(".split--text");

    gmm.add("(min-width: 1025px)", () => {
      if ($('.parallax--img').length) {
        gsap.utils.toArray(".parallax--img").forEach(function (container) {
          let img = container.querySelector("img");

          let tr = gsap.timeline({
            scrollTrigger: {
              trigger: container,
              scrub: true,
              pin: false,
            },
          });

          tr.from(img, {
            yPercent: -20,
            ease: "none",
          }).to(img, {
            yPercent: 20,
            ease: "none",
          });
        });
      }
    })


    // cursor  element
    const $bigBall = document.querySelector('.cursor__ball--big');
    const $smallBall = document.querySelector('.cursor__ball--small');
    const $hoverables = document.querySelectorAll('.hoverable');

    document.body.addEventListener('mousemove', onMouseMove);
    $hoverables.forEach(el => {
      el.addEventListener('mouseenter', onMouseHover);
      el.addEventListener('mouseleave', onMouseHoverOut);
    });

    function onMouseMove(e) {
      gsap.to($bigBall, {
        duration: 0.4,
        x: e.clientX - 15,
        y: e.clientY - 15
      });
      gsap.to($smallBall, {
        duration: 0.1,
        x: e.clientX - 5,
        y: e.clientY - 7
      });
    }

    function onMouseHover() {
      gsap.to($bigBall, {
        duration: 0.3,
        scale: 4
      });
    }

    function onMouseHoverOut() {
      gsap.to($bigBall, {
        duration: 0.3,
        scale: 1
      });
    }


    gmm.add("(min-width: 1024px)", () => {
      if (document.querySelector(".service--listing")) {
        document
          .querySelectorAll(".service--listing .thumb--sm:not(.selected)")
          .forEach((article) => {

            const icon = article.querySelector("figure i");
            const image = article.querySelector("figure svg image");

            gsap.set(image, {
              scaleY: 0,
              transformOrigin: "top",
              filter: "brightness(10)"
            });


            const entranceTL = gsap.timeline({ paused: true });

            entranceTL

              .to(image, {
                scaleY: 1,
                duration: 1.4,
                filter: "brightness(1)",
                ease: "power4.inOut"
              }, "<")


            gsap.timeline({
              scrollTrigger: {
                trigger: article,
                start: "top 80%"
              }
            }).to(icon, {
              opacity: 1,
              duration: 0.01,
              onComplete: () => entranceTL.play()
            });
          });
      }
    })

    gsap.from(".pop--item", {
      scale: 0.8,
      opacity: 0,
      duration: 0.6,
      ease: "back.out(1.7)",
      stagger: 0.15,
      scrollTrigger: {
        trigger: ".pop--wrapper",
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });




    if ($('.text--perspective').length) {
      gsap.utils.toArray(".text--perspective").forEach(splitTextLine => {
        const delay_value = parseFloat(splitTextLine.getAttribute("data-delay") || 0.4);
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: splitTextLine,
            start: 'top 90%',
            duration: 0.8,
            scrub: false,
            markers: false,
            toggleActions: 'play none none none'
          }
        });
        const itemSplitted = new SplitText(splitTextLine, { type: "lines" });
        gsap.set(splitTextLine, { perspective: 400 });
        itemSplitted.split({ type: "lines" });

        tl.from(itemSplitted.lines, {
          duration: 0.5,
          delay: delay_value,
          opacity: 0,
          rotationX: -80,
          force3D: true,
          transformOrigin: "top center -50",
          stagger: 0.1
        });
      });
    }

    gmm.add("(min-width: 1024px)", () => {
      gsap.fromTo(".section-content--wrap .heading--wrap .bar--primary",
        {
          width: "100px"
        },
        {
          width: "380px",
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".section-content--wrap .heading--wrap",
            start: "top 20%",
            toggleActions: "play none none none"
          }
        }
      );
    })

    gmm.add("(min-width: 1024px)", () => {
      gsap.fromTo(".contact--section .heading--wrap .bar--primary",
        {
          width: "100px"
        },
        {
          width: "380px",
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact--section .heading--wrap",
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    })

  })
  // gsap end

  // 3d img hover
  $(".hover--img").each(function () {
    const el = $(this);
    const imgs = el.find("img");

    const img1 = imgs[0];
    const img2 = imgs[1];

    let loaded = 0;

    function initHover() {
      new hoverEffect({
        parent: el[0],
        intensity: el.data("intensity"),
        speedIn: el.data("speedin"),
        speedOut: el.data("speedout"),
        easing: el.data("easing"),
        hover: el.data("hover"),
        image1: img1.src,
        image2: img2.src,
        imagesRatio: img1.naturalHeight / img1.naturalWidth,
        displacementImage: el.data("displacement")
      });
    }

    [img1, img2].forEach(img => {
      if (img.complete) {
        loaded++;
      } else {
        img.onload = () => {
          loaded++;
          if (loaded === 2) initHover();
        };
      }
    });

    if (loaded === 2) initHover();
  });


  // move elements
  document.addEventListener("mousemove", parallax);
  function parallax(e) {
    document.querySelectorAll(".move--img").forEach(function (move) {
      var movingValue = move.getAttribute("data-value");
      var x = (e.clientX * movingValue) / 250;
      var y = (e.clientY * movingValue) / 250;
      move.style.transform = "translateX(" + x + "px) translateY(" + y + "px)";
    })
  }


})(jQuery);


