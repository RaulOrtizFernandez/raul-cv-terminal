// terminal.js — Simulación de terminal en el DOM.
// Importante: esto NO ejecuta comandos reales del sistema.
// Solo interpreta texto contra una lista controlada (ver commands.js).

import { CV } from "./data.js";
import { resolveCommand, COMMAND_ORDER } from "./commands.js";

const PROMPT_USER = "raul@portfolio";
const PROMPT_PATH = "~";

export class Terminal {
  constructor(root) {
    this.root = root;
    this.output = root.querySelector("[data-output]");
    this.input = root.querySelector("[data-input]");
    this.history = [];
    this.historyIndex = -1;
    this.reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    this.bind();
    this.printWelcome();
  }

  bind() {
    this.input.addEventListener("keydown", (e) => this.onKeyDown(e));
    this.root.addEventListener("click", () => this.input.focus());

    // Comandos clicables (help, nav externa)
    document.addEventListener("click", (e) => {
      const el = e.target.closest("[data-run-command]");
      if (el) {
        const cmd = el.getAttribute("data-run-command");
        this.run(cmd);
        this.input.focus();
      }
    });
  }

  promptLabel() {
    return `${PROMPT_USER}:${PROMPT_PATH}$`;
  }

  printWelcome() {
    const lines = [
      { type: "text", value: `Welcome to ${CV.name}'s Portfolio`, cls: "strong" },
      { type: "text", value: CV.role, cls: "accent" },
      { type: "text", value: "" },
      {
        type: "text",
        value: 'Type "help" to see available commands.',
        cls: "muted",
      },
    ];
    this.renderBlock(null, lines, { welcome: true });
  }

  onKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = this.input.value;
      this.submit(value);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      this.navigateHistory(-1);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      this.navigateHistory(1);
    } else if (e.key === "Tab") {
      e.preventDefault();
      this.autocomplete();
    }
  }

  navigateHistory(dir) {
    if (!this.history.length) return;
    this.historyIndex = Math.min(
      Math.max(this.historyIndex + dir, 0),
      this.history.length
    );
    this.input.value = this.history[this.historyIndex] ?? "";
    requestAnimationFrame(() => {
      this.input.selectionStart = this.input.selectionEnd =
        this.input.value.length;
    });
  }

  autocomplete() {
    const partial = this.input.value.trim().toLowerCase();
    if (!partial) return;
    const match = COMMAND_ORDER.find((c) => c.startsWith(partial));
    if (match) this.input.value = match;
  }

  submit(rawValue) {
    const value = rawValue.trim();
    this.printCommandLine(value);
    if (value) {
      this.history.push(value);
    }
    this.historyIndex = this.history.length;
    this.input.value = "";

    if (!value) return;
    this.run(value);
  }

  printCommandLine(value) {
    const line = document.createElement("div");
    line.className = "line cmd-line";
    line.innerHTML = `<span class="prompt">${this.promptLabel()}</span> <span class="typed"></span>`;
    line.querySelector(".typed").textContent = value;
    this.output.appendChild(line);
    this.scrollToBottom();
  }

  run(value) {
    const result = resolveCommand(value);

    switch (result.kind) {
      case "clear":
        this.clear();
        return;
      case "empty":
        return;
      case "not-found":
        this.renderNotFound(result.cmd);
        return;
      case "easter":
        this.renderEaster(result.value);
        return;
      case "output":
        this.renderBlock(result.cmd, result.lines);
        return;
    }
  }

  renderNotFound(cmd) {
    const lines = [
      { type: "text", value: `Command not found: ${cmd}`, cls: "error" },
      { type: "text", value: "" },
      { type: "text", value: 'Type "help" to see available commands.', cls: "muted" },
    ];
    this.renderBlock(null, lines);
  }

  renderEaster(kind) {
    const lines =
      kind === "hire"
        ? [
            { type: "text", value: "Permission granted.", cls: "accent" },
            { type: "text", value: "Redirecting to contact info…", cls: "muted" },
            { type: "text", value: "" },
          ]
        : [
            { type: "text", value: "Brewing… ☕", cls: "accent" },
            { type: "text", value: "Coffee not found on this system. Try the kitchen.", cls: "muted" },
          ];
    this.renderBlock(null, lines);
    if (kind === "hire") {
      const contact = resolveCommand("contact");
      this.renderBlock("contact", contact.lines);
    }
  }

  clear() {
    this.output.innerHTML = "";
  }

  renderBlock(cmd, lines, opts = {}) {
    const wrap = document.createElement("div");
    wrap.className = "block" + (opts.welcome ? " welcome" : "");

    lines.forEach((item) => wrap.appendChild(this.renderLine(item)));
    this.output.appendChild(wrap);
    this.scrollToBottom();
  }

  renderLine(item) {
    if (item.type === "rule") {
      const el = document.createElement("div");
      el.className = "rule";
      el.textContent = "─".repeat(42);
      return el;
    }

    if (item.type === "list") {
      const ul = document.createElement("ul");
      ul.className = "bullets";
      item.items.forEach((it) => {
        const li = document.createElement("li");
        li.textContent = it;
        ul.appendChild(li);
      });
      return ul;
    }

    if (item.type === "line") {
      const div = document.createElement("div");
      div.className = "line";
      item.parts.forEach((p) => div.appendChild(this.renderInline(p)));
      return div;
    }

    if (item.type === "link") {
      const div = document.createElement("div");
      div.className = "line";
      div.appendChild(this.renderInline(item));
      return div;
    }

    if (item.type === "cmd-list") {
      const div = document.createElement("div");
      div.className = "cmd-list";
      item.rows.forEach((row) => {
        const rowEl = document.createElement("div");
        rowEl.className = "cmd-row";
        rowEl.innerHTML = `<button type="button" class="cmd-btn" data-run-command="${row.cmd}">${row.cmd}</button><span class="cmd-desc">${row.desc}</span>`;
        div.appendChild(rowEl);
      });
      return div;
    }

    if (item.type === "cv-actions") {
      const div = document.createElement("div");
      div.className = "cv-actions";
      div.innerHTML = `
        <a class="cv-btn" href="${item.file}" target="_blank" rel="noopener">View CV ↗</a>
        <a class="cv-btn cv-btn--ghost" href="${item.file}" download>Download PDF</a>
      `;
      return div;
    }

    // default text
    const div = document.createElement("div");
    div.className = "line text " + (item.cls || "");
    div.textContent = item.value;
    return div;
  }

  renderInline(item) {
    if (item.type === "link") {
      const a = document.createElement("a");
      a.href = item.href;
      a.textContent = item.label;
      a.target = "_blank";
      a.rel = "noopener";
      a.className = "inline-link";
      return a;
    }
    const span = document.createElement("span");
    span.className = item.cls || "";
    span.textContent = item.value;
    return span;
  }

  scrollToBottom() {
    this.output.scrollTop = this.output.scrollHeight;
  }
}
