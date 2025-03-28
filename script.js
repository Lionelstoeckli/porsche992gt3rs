function toggleSidebar() {
  document.body.classList.toggle("open-sidebar");
}

function showSection(id) {
  // Alle Sektionen ausblenden
  document.querySelectorAll("section").forEach(sec => sec.classList.remove("active"));
  const activeSection = document.getElementById(id);
  if (activeSection) {
    activeSection.classList.add("active");
  }

  // Aktiven Menüpunkt markieren
  document.querySelectorAll(".sidebar a").forEach(link => {
    link.classList.remove("active-link");
    if (link.getAttribute("onclick")?.includes(id)) {
      link.classList.add("active-link");
    }
  });

  // Video-Handling
  const video = document.getElementById("yt-video");
  if (video) {
    video.src = id === "video" ? "https://www.youtube.com/embed/nfOoWjMYtpM" : "";
  }

  // Scroll-Verhalten bei 3D Modell
  document.body.style.overflow = id === "3dmodell" ? "hidden" : "auto";

  // Sidebar schließen (bei Navigation)
  document.body.classList.remove("open-sidebar");
}

function toggleSettings() {
  const panel = document.getElementById("settings-panel");
  if (panel) {
    panel.style.display = panel.style.display === "block" ? "none" : "block";
  }
}

// Sidebar-Farbe ändern
const bgInput = document.getElementById("bgColor");
if (bgInput) {
  bgInput.addEventListener("input", function () {
    document.querySelector(".sidebar").style.backgroundColor = this.value;
  });
}

// Hover-Farbe ändern
const hoverInput = document.getElementById("hoverColor");
if (hoverInput) {
  hoverInput.addEventListener("input", function () {
    const newHoverColor = this.value;

    // CSS Variable setzen
    document.documentElement.style.setProperty('--hover-color', newHoverColor);

    // Dynamisches CSS (Fallback für ältere Browser)
    let styleEl = document.getElementById('dynamic-hover-style');
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = 'dynamic-hover-style';
      document.head.appendChild(styleEl);
    }

    styleEl.innerHTML = `
      .sidebar a:hover { background-color: ${newHoverColor} !important; }
      .sidebar a.active-link { background-color: ${newHoverColor} !important; }
    `;
  });
}

// Formspree-Formular abschicken ohne Weiterleitung
const form = document.getElementById("quiz-form");
const dankeDiv = document.getElementById("danke-nachricht");

if (form) {
  form.addEventListener("submit", async function (e) {
    e.preventDefault(); // verhindert Seitenwechsel

    const formData = new FormData(form);
    try {
      const response = await fetch("https://formspree.io/f/mjkyolvn", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json"
        }
      });

      if (response.ok) {
        form.style.display = "none";
        dankeDiv.style.display = "block";
      } else {
        alert("Fehler beim Absenden. Bitte versuch es später erneut.");
      }
    } catch (error) {
      alert("Es gab ein Problem mit der Verbindung.");
    }
  });
}

window.addEventListener("DOMContentLoaded", () => {
  const defaultBg = "#008cff";
  const defaultHover = "#033e79";

  const savedBg = localStorage.getItem("bgColor") || defaultBg;
  const savedHover = localStorage.getItem("hoverColor") || defaultHover;

  document.getElementById("bgColor").value = savedBg;
  document.querySelector(".sidebar").style.backgroundColor = savedBg;

  document.getElementById("hoverColor").value = savedHover;
  document.documentElement.style.setProperty('--hover-color', savedHover);

  let styleEl = document.getElementById('dynamic-hover-style');
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = 'dynamic-hover-style';
    document.head.appendChild(styleEl);
  }

  styleEl.innerHTML = `
    .sidebar a:hover { background-color: ${savedHover} !important; }
    .sidebar a.active-link { background-color: ${savedHover} !important; }
  `;
});

// Speichern-Funktion
function saveSettings() {
  const bg = document.getElementById("bgColor").value;
  const hover = document.getElementById("hoverColor").value;
  localStorage.setItem("bgColor", bg);
  localStorage.setItem("hoverColor", hover);
  alert("Einstellungen gespeichert!");
}

// Abbrechen-Funktion (lädt gespeicherte Werte neu)
function resetSettings() {
  const savedBg = localStorage.getItem("bgColor") || "#008cff";
  const savedHover = localStorage.getItem("hoverColor") || "#033e79";

  document.getElementById("bgColor").value = savedBg;
  document.getElementById("hoverColor").value = savedHover;

  document.querySelector(".sidebar").style.backgroundColor = savedBg;
  document.documentElement.style.setProperty('--hover-color', savedHover);

  let styleEl = document.getElementById('dynamic-hover-style');
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = 'dynamic-hover-style';
    document.head.appendChild(styleEl);
  }

  styleEl.innerHTML = `
    .sidebar a:hover { background-color: ${savedHover} !important; }
    .sidebar a.active-link { background-color: ${savedHover} !important; }
  `;
}

function showSection(id) {
  // Alle Sektionen ausblenden
  document.querySelectorAll("section").forEach(sec => sec.classList.remove("active"));
  const activeSection = document.getElementById(id);
  if (activeSection) {
    activeSection.classList.add("active");
  }

  // Aktiven Menüpunkt markieren
  document.querySelectorAll(".sidebar a").forEach(link => {
    link.classList.remove("active-link");
    if (link.getAttribute("onclick")?.includes(id)) {
      link.classList.add("active-link");
    }
  });

  // Video-Handling
  const video = document.getElementById("yt-video");
  if (video) {
    video.src = id === "video" ? "https://www.youtube.com/embed/nfOoWjMYtpM" : "";
  }

  // Scroll-Verhalten bei 3D Modell
  document.body.style.overflow = id === "3dmodell" ? "hidden" : "auto";

  // Sidebar schließen (bei Navigation)
  document.body.classList.remove("open-sidebar");

  // ➕ Hier kommt die zusätzliche Sichtbarkeitslogik für das 3D-Modell
  const modellSection = document.getElementById("3dmodell");
  if (modellSection) {
    modellSection.style.visibility = id === "3dmodell" ? "visible" : "hidden";
    modellSection.style.height = id === "3dmodell" ? "auto" : "0";
  }
}
