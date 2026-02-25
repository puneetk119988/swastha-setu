document.addEventListener("DOMContentLoaded", () => {
  // Tabs
  const navButtons = document.querySelectorAll(".nav-btn");
  const tabs = {
    home: document.getElementById("tab-home"),
    exercises: document.getElementById("tab-exercises"),
    diet: document.getElementById("tab-diet"),
  };

  navButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      navButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const tabName = btn.getAttribute("data-tab");
      Object.values(tabs).forEach((t) => t && t.classList.remove("active"));
      tabs[tabName] && tabs[tabName].classList.add("active");
    });
  });

  // Chat widget
  const fab = document.getElementById("chat-fab");
  const panel = document.getElementById("chat-panel");
  const closeBtn = document.getElementById("chat-close");
  const form = document.getElementById("chat-form");
  const input = document.getElementById("chat-input");
  const messages = document.getElementById("chat-messages");

  function addMessage(text, who) {
    const div = document.createElement("div");
    div.className = `msg ${who}`;
    div.textContent = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  fab?.addEventListener("click", () => {
    panel.classList.toggle("hidden");
    if (!panel.classList.contains("hidden")) input?.focus();
  });

  closeBtn?.addEventListener("click", () => {
    panel.classList.add("hidden");
  });

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "user");
    input.value = "";
    input.focus();

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();
      addMessage(data.reply || "No reply received.", "bot");
    } catch (err) {
      addMessage("Network error. Is the server running?", "bot");
    }
  });

  console.log("✅ app.js loaded");
});