// ========================================
// MOBILE NAVIGATION
// ========================================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", isOpen);
  });

  document.querySelectorAll(".nav-link").forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// ========================================
// LIGHT / DARK MODE
// ========================================

const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {
  const savedTheme = localStorage.getItem("portfolio-theme") || "light";

  document.documentElement.setAttribute("data-theme", savedTheme);

  function updateThemeButton(theme) {
    themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";

    themeToggle.setAttribute(
      "aria-label",
      theme === "dark" ? "Switch to light mode" : "Switch to dark mode",
    );

    themeToggle.setAttribute(
      "title",
      theme === "dark" ? "Switch to light mode" : "Switch to dark mode",
    );
  }

  updateThemeButton(savedTheme);

  themeToggle.addEventListener("click", function () {
    const currentTheme =
      document.documentElement.getAttribute("data-theme") || "light";

    const newTheme = currentTheme === "light" ? "dark" : "light";

    document.documentElement.setAttribute("data-theme", newTheme);

    localStorage.setItem("portfolio-theme", newTheme);

    updateThemeButton(newTheme);
  });
}

// ========================================
// CONTACT FORM VALIDATION
// ========================================

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const subjectError = document.getElementById("subjectError");
    const messageError = document.getElementById("messageError");
    const formNote = document.getElementById("formNote");

    nameError.textContent = "";
    emailError.textContent = "";
    subjectError.textContent = "";
    messageError.textContent = "";

    formNote.textContent = "";
    formNote.className = "form-note";

    let isValid = true;

    if (name.length < 2) {
      nameError.textContent = "Please enter your name.";
      isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      emailError.textContent = "Please enter a valid email address.";
      isValid = false;
    }

    if (subject.length < 3) {
      subjectError.textContent = "Please enter a subject.";
      isValid = false;
    }

    if (message.length < 10) {
      messageError.textContent = "Message must contain at least 10 characters.";
      isValid = false;
    }

    if (!isValid) {
      formNote.textContent = "Please correct the errors above.";
      formNote.classList.add("error-message");
      return;
    }

    const recipient = "vedantidalane22@gmail.com";

    const mailSubject = encodeURIComponent(subject);

    const mailBody = encodeURIComponent(
      "Name: " + name + "\nEmail: " + email + "\n\nMessage:\n" + message,
    );

    const mailtoLink =
      "mailto:" + recipient + "?subject=" + mailSubject + "&body=" + mailBody;

    formNote.textContent = "Opening your email application...";
    formNote.classList.add("success");

    window.location.href = mailtoLink;
  });
}

// ========================================
// CURRENT YEAR IN FOOTER
// ========================================

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// ========================================
// ACTIVE NAVIGATION LINK
// ========================================

const sections = document.querySelectorAll("main section[id]");
const navigationLinks = document.querySelectorAll(".nav-link");

function updateActiveLink() {
  let currentSection = "home";

  sections.forEach(function (section) {
    const sectionTop = section.offsetTop - 140;

    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute("id");
    }
  });

  navigationLinks.forEach(function (link) {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === "#" + currentSection,
    );
  });
}

window.addEventListener("scroll", updateActiveLink);
updateActiveLink();
