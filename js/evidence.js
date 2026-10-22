"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const categories = {
    BP: "Blueprints", CAL: "Calibration", ENV: "Environment",
    FUT: "FUT", GH: "GitHub", INT: "Interaction", META: "Meta XR / ISDK",
    PHY: "Physical setup", TEST: "Testing", UI: "User interface"
  };
  const search = document.getElementById("evidence-search");
  const type = document.getElementById("evidence-type");
  const category = document.getElementById("evidence-category");
  const grid = document.getElementById("evidence-grid");
  const previous = document.getElementById("evidence-previous");
  const next = document.getElementById("evidence-next");
  const viewer = document.getElementById("evidence-viewer");
  const media = document.getElementById("viewer-media");
  const pageSize = 24;
  let page = 0;

  const title = name => name.replace(/\.[^.]+$/, "").replace(/_/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2");
  const duration = seconds => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;

  [...new Set(evidenceItems.map(item => item.category))].sort().forEach(code => {
    const option = document.createElement("option");
    option.value = code;
    option.textContent = `${categories[code] || code} (${code})`;
    category.append(option);
  });

  function openItem(item) {
    const element = document.createElement(item.type === "video" ? "video" : "img");
    element.src = item.url;
    if (item.type === "video") {
      element.controls = true;
      element.playsInline = true;
      element.preload = "metadata";
      element.setAttribute("aria-label", title(item.name));
    } else {
      element.alt = title(item.name);
    }
    element.addEventListener("error", () => {
      const notice = document.createElement("p");
      notice.textContent = "This preview could not load. Try opening the file using the link below.";
      media.append(notice);
    }, {once: true});
    document.getElementById("viewer-title").textContent = item.name;
    document.getElementById("viewer-original").href = item.url;
    media.replaceChildren(element);
    viewer.showModal();
  }

  function render() {
    const terms = search.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
    const filtered = evidenceItems.filter(item => {
      const text = `${item.name} ${title(item.name)} ${categories[item.category] || ""}`.toLowerCase();
      return (type.value === "all" || type.value === item.type)
        && (category.value === "all" || category.value === item.category)
        && terms.every(term => text.includes(term));
    });
    const pageCount = Math.ceil(filtered.length / pageSize);
    page = Math.min(page, Math.max(0, pageCount - 1));
    const cards = filtered.slice(page * pageSize, (page + 1) * pageSize).map(item => {
      const card = document.createElement("article");
      card.className = "evidence-card";
      if (item.type === "screenshot") {
        const image = document.createElement("img");
        image.src = item.url;
        image.alt = "";
        image.loading = "lazy";
        image.decoding = "async";
        card.append(image);
      }
      const tag = document.createElement("p");
      tag.className = "resource-tag";
      tag.textContent = item.type === "video" ? `VIDEO · ${duration(item.duration)}` : "SCREENSHOT";
      const heading = document.createElement("h3");
      heading.textContent = title(item.name);
      const filename = document.createElement("p");
      filename.className = "evidence-filename";
      filename.textContent = item.name;
      const button = document.createElement("button");
      button.type = "button";
      button.className = "button secondary";
      button.textContent = item.type === "video" ? "Open video" : "View screenshot";
      button.setAttribute("aria-label", `${button.textContent}: ${item.name}`);
      button.addEventListener("click", () => openItem(item));
      card.append(tag, heading, filename, button);
      if (item.duplicateOf) {
        const note = document.createElement("p");
        note.className = "evidence-filename";
        note.textContent = `Same recording as ${item.duplicateOf}`;
        card.append(note);
      }
      return card;
    });
    grid.replaceChildren(...cards);
    document.getElementById("evidence-count").textContent = filtered.length
      ? `${filtered.length} entries · Showing ${page * pageSize + 1}–${Math.min((page + 1) * pageSize, filtered.length)}`
      : "No matching evidence. Try a different filename, number or category.";
    document.getElementById("evidence-page").textContent = pageCount ? `Page ${page + 1} of ${pageCount}` : "No results";
    previous.disabled = page === 0;
    next.disabled = page + 1 >= pageCount;
  }

  [search, type, category].forEach(control => control.addEventListener("input", () => {page = 0; render();}));
  previous.addEventListener("click", () => {page--; render(); document.getElementById("archive-controls").scrollIntoView();});
  next.addEventListener("click", () => {page++; render(); document.getElementById("archive-controls").scrollIntoView();});
  document.getElementById("viewer-close").addEventListener("click", () => viewer.close());
  viewer.addEventListener("close", () => {
    const video = media.querySelector("video");
    if (video) {video.pause(); video.removeAttribute("src"); video.load();}
    media.replaceChildren();
  });
  document.getElementById("archive-controls").hidden = false;
  document.getElementById("archive-pagination").hidden = false;
  render();
});
