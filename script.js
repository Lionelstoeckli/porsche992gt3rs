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
  