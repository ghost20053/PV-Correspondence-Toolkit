"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const movedSections = {
    resources: "research.html", demonstration: "research.html",
    download: "prototype.html", replication: "prototype.html",
    principles: "toolkit.html", worksheet: "toolkit.html", "case-study": "toolkit.html"
  };
  function followOldBookmark() {
    const page = window.location.pathname.split("/").pop();
    const destination = movedSections[window.location.hash.slice(1)];
    if ((!page || page === "index.html") && destination) {
      window.location.replace(destination + window.location.hash);
      return true;
    }
    return false;
  }
  if (followOldBookmark()) return;
  window.addEventListener("hashchange", followOldBookmark);
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".menu-toggle");
  const navigation = document.getElementById("main-navigation");
  if (!header || !toggle || !navigation) return;
  toggle.hidden = false;
  header.classList.add("navigation-ready");
  function updateHeaderOffset() {
    document.documentElement.style.setProperty("--header-height", header.getBoundingClientRect().height + "px");
  }
  updateHeaderOffset();
  new ResizeObserver(updateHeaderOffset).observe(header);
  const outline = document.createElement("nav");
  outline.className = "page-outline";
  outline.setAttribute("aria-label", "On this page");
  const outlineTitle = document.createElement("p");
  outlineTitle.textContent = "ON THIS PAGE";
  outline.append(outlineTitle);
  document.querySelectorAll("main > section").forEach(function (section) {
    const heading = section.querySelector("h2");
    const anchor = section.id || (heading && heading.id);
    if (!heading || !anchor) return;
    const link = document.createElement("a");
    link.href = "#" + anchor;
    link.textContent = heading.textContent;
    outline.append(link);
  });
  if (outline.querySelector("a")) document.body.append(outline);
  const correspondence = document.createElement("aside");
  correspondence.className = "correspondence-note";
  correspondence.setAttribute("aria-label", "Physical and virtual correspondence illustration");
  correspondence.innerHTML = `
    <p class="margin-label">PHYSICAL / VIRTUAL</p>
    <figure>
      <span class="diagram-label">Physical object</span>
      <img src="assets/correspondence-diagram.svg" alt="A solid cube paired with a wireframe representation of the same form." width="200" height="300">
      <span class="diagram-label">Virtual representation</span>
      <figcaption>A shared form. A physical action.<br>What needs to correspond?</figcaption>
    </figure>
    <a href="toolkit.html#principles">Explore the six considerations →</a>
    <small>Conceptual illustration</small>`;
  document.body.append(correspondence);
  function closeMenu() {
    toggle.setAttribute("aria-expanded", "false");
    header.classList.remove("menu-open");
    updateHeaderOffset();
  }
  toggle.addEventListener("click", function () {
    const expanded = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", String(expanded));
    header.classList.toggle("menu-open", expanded);
    updateHeaderOffset();
  });
  navigation.addEventListener("click", function (event) {
    if (event.target.closest("a")) closeMenu();
  });
  header.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && header.classList.contains("menu-open")) {
      closeMenu();
      toggle.focus();
    }
  });
  const links = Array.from(navigation.querySelectorAll('a[href^="#"]'));
  const sections = links.map(link => document.querySelector(link.getAttribute("href")));
  let scheduled = false;
  function updateLocation() {
    let active = 0;
    sections.forEach(function (section, index) {
      if (section && section.getBoundingClientRect().top <= 140) active = index;
    });
    links.forEach(function (link, index) {
      if (index === active) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
    scheduled = false;
  }
  window.addEventListener("scroll", function () {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(updateLocation);
    }
  }, { passive: true });
  updateLocation();
});
