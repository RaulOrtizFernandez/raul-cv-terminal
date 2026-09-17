// commands.js — Traduce cada comando en contenido a renderizar.
// No contiene datos del CV: todo se lee de data.js.

import { CV } from "./data.js";

const RULE = "─".repeat(42);

function block(title, bodyNodes) {
  return { title, body: bodyNodes };
}

function text(str, cls = "") {
  return { type: "text", value: str, cls };
}

function link(href, label) {
  return { type: "link", href, label };
}

function list(items) {
  return { type: "list", items };
}

function rule() {
  return { type: "rule" };
}

export const COMMAND_ORDER = [
  "help",
  "about",
  "experience",
  "education",
  "skills",
  "projects",
  "languages",
  "contact",
  "cv",
  "clear",
];

export const COMMAND_META = {
  help: "Lista de comandos disponibles",
  about: "Sobre mí",
  experience: "Experiencia profesional",
  education: "Formación académica",
  skills: "Habilidades técnicas",
  projects: "Proyectos",
  languages: "Idiomas",
  contact: "Información de contacto",
  cv: "Ver / descargar el CV en PDF",
  clear: "Limpiar la terminal",
};

const ALIASES = {
  whoami: "about",
  ls: "help",
  work: "experience",
  jobs: "experience",
  studies: "education",
  tech: "skills",
  langs: "languages",
  email: "contact",
  resume: "cv",
  cls: "clear",
  "sudo hire-me": "__hire",
  "sudo make-coffee": "__coffee",
};

function renderHelp() {
  const rows = COMMAND_ORDER.map((c) => ({
    type: "cmd-row",
    cmd: c,
    desc: COMMAND_META[c],
  }));
  return [
    text("Available commands:", "muted"),
    text(""),
    { type: "cmd-list", rows },
    text(""),
    text(
      "Tip: also try  whoami · ls · tech · resume  — and click any command above.",
      "muted small"
    ),
  ];
}

function renderAbout() {
  const out = [
    text("ABOUT ME", "heading"),
    rule(),
    text(""),
    text(CV.about),
    text(""),
    text("Current focus:", "label"),
    text(CV.currentFocus),
    text(""),
    text("Location:", "label"),
    text(CV.location),
  ];
  return out;
}

function renderExperience() {
  const out = [text("PROFESSIONAL EXPERIENCE", "heading"), rule(), text("")];
  CV.experience.forEach((job, i) => {
    out.push(text(job.dates, "accent"));
    out.push(text(job.role, "strong"));
    out.push(
      job.web
        ? { type: "line", parts: [text(job.company + " — "), link(job.web, job.place)] }
        : text(`${job.company} — ${job.place}`)
    );
    out.push(text(""));
    out.push(list(job.bullets));
    if (job.tech.length) {
      out.push(text(""));
      out.push(text("Tecnologías: " + job.tech.join(" · "), "muted small"));
    }
    if (i < CV.experience.length - 1) {
      out.push(text(""));
      out.push(rule());
      out.push(text(""));
    }
  });
  return out;
}

function renderEducation() {
  const out = [text("EDUCATION", "heading"), rule(), text("")];
  CV.education.forEach((ed, i) => {
    out.push(text(ed.dates, "accent"));
    out.push(text(ed.title, "strong"));
    out.push(
      ed.web
        ? { type: "line", parts: [text(ed.center + " — "), link(ed.web, ed.place)] }
        : text(`${ed.center} — ${ed.place}`)
    );
    out.push(text(ed.level, "muted small"));
    if (i < CV.education.length - 1) {
      out.push(text(""));
    }
  });
  return out;
}

function renderSkills() {
  const out = [text("TECHNICAL SKILLS", "heading"), rule(), text("")];
  CV.skills.forEach((group, i) => {
    out.push(text(group.category, "strong"));
    out.push(text(group.items.join(" • "), "accent-text"));
    if (i < CV.skills.length - 1) out.push(text(""));
  });
  return out;
}

function renderProjects() {
  if (!CV.projects.length) {
    return [
      text("FEATURED PROJECTS", "heading"),
      rule(),
      text(""),
      text(
        "No hay proyectos personales registrados todavía en el CV.",
        "muted"
      ),
      text(
        "Esta sección está preparada para añadirlos en cuanto estén disponibles.",
        "muted small"
      ),
    ];
  }
  const out = [text("FEATURED PROJECTS", "heading"), rule(), text("")];
  CV.projects.forEach((p) => {
    out.push(text(p.name, "strong"));
    out.push(text(p.description));
    if (p.tech) out.push(text(p.tech.join(" · "), "accent-text"));
  });
  return out;
}

function renderLanguages() {
  const out = [text("LANGUAGES", "heading"), rule(), text("")];
  CV.languages.forEach((l) => {
    out.push(text(l.name, "strong"));
    if (l.level) out.push(text(l.level, "muted small"));
    if (l.detail) out.push(list(l.detail));
    out.push(text(""));
  });
  return out;
}

function renderContact() {
  const out = [text("CONTACT", "heading"), rule(), text("")];
  out.push(text("Email:", "label"));
  out.push(link(`mailto:${CV.contact.email}`, CV.contact.email));
  out.push(text(""));
  out.push(text("Phone:", "label"));
  out.push(text(CV.contact.phone));
  out.push(text(""));
  out.push(text("GitHub:", "label"));
  out.push(link(CV.contact.github, CV.contact.github.replace("https://", "")));
  out.push(text(""));
  out.push(text("Location:", "label"));
  out.push(text(CV.contact.location));
  return out;
}

function renderCV() {
  return [
    text("CV", "heading"),
    rule(),
    text(""),
    text("View or download the original PDF:"),
    text(""),
    { type: "cv-actions", file: CV.cvFile },
  ];
}

const RENDERERS = {
  help: renderHelp,
  about: renderAbout,
  experience: renderExperience,
  education: renderEducation,
  skills: renderSkills,
  projects: renderProjects,
  languages: renderLanguages,
  contact: renderContact,
  cv: renderCV,
};

export function resolveCommand(raw) {
  const cmd = raw.trim().toLowerCase();
  if (!cmd) return { kind: "empty" };
  if (cmd === "clear" || cmd === "cls") return { kind: "clear" };
  if (ALIASES[cmd] === "__hire") return { kind: "easter", value: "hire" };
  if (ALIASES[cmd] === "__coffee") return { kind: "easter", value: "coffee" };

  const resolved = ALIASES[cmd] || cmd;
  if (RENDERERS[resolved]) {
    return { kind: "output", cmd: resolved, lines: RENDERERS[resolved]() };
  }
  return { kind: "not-found", cmd };
}

export function getRenderer(cmd) {
  return RENDERERS[cmd];
}
