(function () {
  var h = document.querySelector(".site-header");
  function sc() {
    h && h.classList.toggle("scrolled", window.scrollY > 8);
  }
  sc();
  addEventListener("scroll", sc, { passive: true });
  if (
    "IntersectionObserver" in window &&
    !matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    var els = document.querySelectorAll(
      ".card,.tile,.person,.pillc,.steps li,.notice,.cta,.head",
    );
    var io = new IntersectionObserver(
      function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    els.forEach(function (el) {
      var i = Array.prototype.indexOf.call(el.parentNode.children, el);
      el.style.setProperty("--d", (i % 4) * 90 + "ms");
      el.classList.add("rv");
      io.observe(el);
    });
  }
  var b = document.querySelector(".burger"),
    n = document.getElementById("nav");
  if (b && n) {
    b.addEventListener("click", function () {
      var o = n.classList.toggle("open");
      b.setAttribute("aria-expanded", o);
      b.setAttribute("aria-label", o ? "Close menu" : "Open menu");
    });
  }
  if (/[?&]sent=1/.test(location.search)) {
    var s = document.getElementById("sent");
    if (s) s.hidden = false;
  }
})();
