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
    link.dataset.section = anchor;
    outline.append(link);
  });
  if (outline.querySelector("a")) document.body.append(outline);
  const correspondence = document.createElement("aside");
  correspondence.className = "correspondence-note";
  correspondence.setAttribute("aria-label", "Physical and virtual correspondence illustration");
  const illustrations = {
    "research.html": ["RESEARCH / CONTRIBUTION", "research-diagram.svg", "Four findings", "Four points connected to six design considerations.", "Six considerations", "Documented practice informs reflective design questions.", "#findings", "Read the research findings"],
    "evidence.html": ["PRACTICE / EVIDENCE", "evidence-diagram.svg", "Development record", "Three connected document panels representing the three research cycles.", "Three research cycles", "Trace the decisions through the journal and original evidence.", "#evidence-guide", "Explore the evidence guide"],
    "prototype.html": ["OBJECTS / ARRANGEMENT", "setup-diagram.svg", "Physical tabletop", "An illustrative tabletop with two cubes and a chest, without measurements.", "A controlled starting layout", "Physical props establish the starting arrangement for interaction.", "#replication", "Read the setup guide"],
    "toolkit.html": ["QUESTIONS / REFLECTION", "toolkit-diagram.svg", "Six design considerations", "Six numbered prompts arranged on a worksheet.", "One interaction at a time", "Document the action, observations and next design revision.", "#worksheet", "Use the developer worksheet"]
  };
  const illustration = illustrations[window.location.pathname.split("/").pop()] || ["PHYSICAL / VIRTUAL", "correspondence-diagram.svg", "Physical object", "A solid cube paired with a wireframe representation of the same form.", "Virtual representation", "A shared form. A physical action. What needs to correspond?", "toolkit.html#principles", "Explore the six considerations"];
  correspondence.innerHTML = `
    <p class="margin-label">${illustration[0]}</p>
    <figure>
      <span class="diagram-label">${illustration[2]}</span>
      <img src="assets/${illustration[1]}" alt="${illustration[3]}" width="200" height="300">
      <span class="diagram-label">${illustration[4]}</span>
      <figcaption>${illustration[5]}</figcaption>
    </figure>
    <a href="${illustration[6]}">${illustration[7]} →</a>
    <small>Conceptual illustration</small>`;
  const main = document.querySelector("main.content");
  const readingLayout = document.createElement("div");
  readingLayout.className = "reading-layout";
  main.before(readingLayout);
  if (outline.querySelector("a")) readingLayout.append(outline);
  readingLayout.append(main, correspondence);
  function updateIllustrationPosition() {
    const availableHeight = window.innerHeight - header.getBoundingClientRect().height - 56;
    correspondence.classList.toggle("illustration-in-flow", correspondence.scrollHeight > availableHeight);
  }
  const illustrationObserver = new ResizeObserver(updateIllustrationPosition);
  illustrationObserver.observe(correspondence);
  illustrationObserver.observe(header);
  window.addEventListener("resize", updateIllustrationPosition);
  updateIllustrationPosition();
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
    let currentSection = null;
    outline.querySelectorAll("a").forEach(function (link) {
      const target = document.getElementById(link.dataset.section);
      if (target && target.getBoundingClientRect().top <= header.getBoundingClientRect().height + 100) currentSection = link;
    });
    outline.querySelectorAll("a").forEach(function (link) {
      if (link === currentSection) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
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
