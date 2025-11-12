document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const primaryMenu = document.querySelector(".main-nav ul");
  const yearTarget = document.getElementById("current-year");
  const animatedBlocks = document.querySelectorAll(".animate-on-scroll");

  if (navToggle && primaryMenu) {
    const closeMenu = () => {
      navToggle.setAttribute("aria-expanded", "false");
      primaryMenu.classList.remove("is-open");
      document.body.classList.remove("nav-open");
    };

    navToggle.addEventListener("click", () => {
      const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!isExpanded));
      primaryMenu.classList.toggle("is-open");
      document.body.classList.toggle("nav-open", !isExpanded);
    });

    primaryMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        closeMenu();
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && primaryMenu.classList.contains("is-open")) {
        closeMenu();
        navToggle.focus();
      }
    });

    const desktopMediaQuery = window.matchMedia("(min-width: 921px)");
    const handleDesktopChange = (event) => {
      if (event.matches) {
        closeMenu();
      }
    };
    desktopMediaQuery.addEventListener("change", handleDesktopChange);
  }

  if (yearTarget) {
    yearTarget.textContent = new Date().getFullYear();
  }

  if ("IntersectionObserver" in window && animatedBlocks.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    animatedBlocks.forEach((block) => observer.observe(block));
  } else {
    animatedBlocks.forEach((block) => block.classList.add("is-visible"));
  }
});

