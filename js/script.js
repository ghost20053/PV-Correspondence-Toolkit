"use strict";

// ==========================================
// PHYSICAL–VIRTUAL CORRESPONDENCE TOOLKIT
// Interactive Developer Worksheet
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("developer-form");
  const pages = document.querySelectorAll(".worksheet-page");
  const steps = document.querySelectorAll(".step");

  const previousButton = document.getElementById("previous-step");
  const nextButton = document.getElementById("next-step");
  const indicator = document.getElementById("step-indicator");

  const exportButton = document.getElementById("export-worksheet");
  const resetButton = document.getElementById("reset-worksheet");
  const saveIndicator = document.getElementById("save-indicator");

  const STORAGE_KEY = "pv-correspondence-worksheet-v1";

  let currentStep = 0;

  // ======================================
  // NAVIGATION
  // ======================================

  function showStep(stepNumber) {

    if (stepNumber < 0 || stepNumber >= pages.length) {
      return;
    }

    currentStep = stepNumber;

    pages.forEach(function (page, index) {
      page.classList.toggle("active", index === currentStep);
    });

    steps.forEach(function (step, index) {
      step.classList.toggle("active", index === currentStep);

      if (index === currentStep) {
        step.setAttribute("aria-current", "step");
      } else {
        step.removeAttribute("aria-current");
      }
    });

    indicator.textContent =
      "Step " + (currentStep + 1) + " of " + pages.length;

    previousButton.disabled = currentStep === 0;
    nextButton.disabled = currentStep === pages.length - 1;

    nextButton.textContent =
      currentStep === pages.length - 1
        ? "Completed"
        : "Next →";
  }

  previousButton.addEventListener("click", function () {
    showStep(currentStep - 1);
  });

  nextButton.addEventListener("click", function () {
    showStep(currentStep + 1);
  });

  steps.forEach(function (step) {
    step.addEventListener("click", function () {
      showStep(Number(step.dataset.step));
    });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
  });

  // ======================================
  // COLLECT WORKSHEET DATA
  // ======================================

  function collectWorksheetData() {

    const data = {};

    const fields = form.querySelectorAll(
      'input[type="text"], textarea'
    );

    fields.forEach(function (field) {
      data[field.name] = field.value;
    });

    data.considerations = Array.from(
      form.querySelectorAll(
        'input[name="considerations"]:checked'
      )
    ).map(function (checkbox) {
      return checkbox.value;
    });

    return data;
  }

  // ======================================
  // SAVE WORKSHEET
  // ======================================

  function saveWorksheet() {

    const data = collectWorksheetData();

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
      );

      saveIndicator.textContent = "✓ Saved locally";
    } catch (error) {
      saveIndicator.textContent =
        "Local saving unavailable — export your work";
      console.warn("Worksheet could not be saved:", error);
    }
  }

  // ======================================
  // RESTORE WORKSHEET
  // ======================================

  function restoreWorksheet() {

    let savedData;

    try {
      const stored = localStorage.getItem(STORAGE_KEY);

      if (!stored) {
        saveIndicator.textContent = "No saved worksheet yet";
        return;
      }

      savedData = JSON.parse(stored);

    } catch (error) {
      saveIndicator.textContent =
        "Could not restore saved worksheet";
      console.warn("Worksheet restore failed:", error);
      return;
    }

    if (!savedData || typeof savedData !== "object") {
      return;
    }

    const fields = form.querySelectorAll(
      'input[type="text"], textarea'
    );

    fields.forEach(function (field) {
      if (typeof savedData[field.name] === "string") {
        field.value = savedData[field.name];
      }
    });

    const selectedConsiderations = Array.isArray(
      savedData.considerations
    ) ? savedData.considerations : [];

    form.querySelectorAll(
      'input[name="considerations"]'
    ).forEach(function (checkbox) {
      checkbox.checked =
        selectedConsiderations.includes(checkbox.value);
    });

    saveIndicator.textContent = "✓ Previous worksheet restored";
  }

  // ======================================
  // EXPORT WORKSHEET AS TEXT
  // ======================================

  function exportWorksheet() {

    const data = collectWorksheetData();

    const considerationNames = {
      "1": "Intended action",
      "2": "Physical counterpart",
      "3": "Correspondence",
      "4": "System knowledge",
      "5": "Starting arrangement",
      "6": "Onboarding"
    };

    const selected = data.considerations.map(function (number) {
      return number + " — " + considerationNames[number];
    });

    const lines = [
      "PHYSICAL–VIRTUAL CORRESPONDENCE DESIGN TOOLKIT",
      "Reusable Developer Worksheet",
      "===========================================",
      "",
      "PROJECT DETAILS",
      "Project / Prototype: " + (data.projectName || ""),
      "Interaction: " + (data.interaction || ""),
      "Date / Iteration / Tester: " + (data.iteration || ""),
      "Hardware, Software and Props:",
      data.hardware || "",
      "",
      "RELEVANT DESIGN CONSIDERATIONS",
      selected.length ? selected.join("\n") : "None selected",
      "",
      "1. PLAN — Intended Interaction",
      data.plan || "",
      "",
      "2. TEST — Test Procedure",
      data.test || "",
      "",
      "3. OBSERVE — Observations",
      data.observe || "",
      "",
      "4. REFLECT — Design Reflection",
      data.reflect || "",
      "",
      "5. REVISE — Proposed Revision",
      data.revise || "",
      "",
      "EVIDENCE REFERENCES",
      data.evidence || "",
      "",
      "WHAT REMAINS UNTESTED?",
      data.untested || "",
      "",
      "NEXT ITERATION / DATE",
      data.nextIteration || "",
      "",
      "-------------------------------------------",
      "Practice-derived reflective design aid.",
      "Not a validated usability assessment."
    ];

    const content = lines.join("\n");

    const blob = new Blob([content], {
      type: "text/plain;charset=utf-8"
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;

    const safeName = (data.projectName || "untitled-project")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 60) || "untitled-project";

    link.download = safeName + "-worksheet.txt";

    document.body.appendChild(link);
    link.click();
    link.remove();

    setTimeout(function () {
      URL.revokeObjectURL(url);
    }, 1000);
  }

  exportButton.addEventListener("click", exportWorksheet);

  // ======================================
  // START NEW WORKSHEET
  // ======================================

  resetButton.addEventListener("click", function () {

    const confirmed = window.confirm(
      "Start a new worksheet?\n\n" +
      "Your current entries will be cleared. " +
      "Export your worksheet first if you want to keep a copy."
    );

    if (!confirmed) {
      return;
    }

    form.reset();

    try {
      localStorage.removeItem(STORAGE_KEY);
      saveIndicator.textContent = "New worksheet started";
    } catch (error) {
      saveIndicator.textContent =
        "Worksheet cleared; stored copy may remain";
    }

    showStep(0);
  });

  // ======================================
  // AUTOMATIC SAVE ON INPUT
  // ======================================

  form.addEventListener("input", saveWorksheet);
  form.addEventListener("change", saveWorksheet);

  // ======================================
  // INITIALISE
  // ======================================

  restoreWorksheet();
  showStep(0);

  console.log("Developer Worksheet loaded.");

});
