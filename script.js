function toggleSidebar() {
  document.body.classList.toggle("open-sidebar");
}

function showSection(id) {
  document.querySelectorAll("section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(id).classList.add("active");

  const video = document.getElementById("yt-video");
  if (id !== "video") {
    video.src = "";
  } else {
    video.src = "https://www.youtube.com/embed/nfOoWjMYtpM";
  }

  document.body.style.overflow = id === "3dmodell" ? "hidden" : "auto";
  document.body.classList.remove("open-sidebar");
}
