// data.js — Única fuente de verdad del contenido del CV.
// Todo lo que aparece aquí proviene literalmente del PDF de Raúl.
// Para actualizar el currículum, edita solo este archivo.

export const CV = {
  name: "Raúl Ortiz Fernández",
  role: "Administrador de Sistemas Informáticos en Red — perfil Ciberseguridad",
  location: "L'Hospitalet de Llobregat, España",
  nationality: "Española",
  birthDate: "27/12/2007",

  about: `Estudiante responsable y organizado, con buena disciplina y ganas de aprender. Comprometido con mi formación académica y con mejorar continuamente mis habilidades y conocimientos. Con deseo de seguir formándome académicamente.`,

  currentFocus:
    "Formación en Administración de Sistemas Informáticos en Red, perfil Ciberseguridad (iFP Barcelona L'Hospitalet).",

  contact: {
    email: "raulorfe07@gmail.com",
    phone: "+34 699 541 022",
    github: "https://github.com/RaulOrtizFernandez/RaulOrtizFernandez",
    location: "L'Hospitalet de Llobregat, España",
  },

  cvFile: "assets/Raul_Ortiz_CV.pdf",
  photo: "assets/profile.jpg",

  experience: [
    {
      role: "Administrador de sistemas informáticos y redes",
      company: "Neo Advertising",
      place: "L'Hospitalet de Llobregat, España",
      web: "https://www.neoadvertising.es/",
      dates: "10/11/2024 – 12/06/2025",
      bullets: [
        "Instalación, configuración y mantenimiento de equipos informáticos (PCs, impresoras y periféricos).",
        "Administración básica de sistemas operativos Windows y Linux.",
        "Configuración y gestión de redes locales (LAN), cableado y dispositivos de red (routers, switches).",
        "Soporte técnico a usuarios: resolución de incidencias de hardware y software.",
        "Gestión de usuarios, permisos y copias de seguridad.",
        "Monitorización básica de sistemas y redes para asegurar su correcto funcionamiento.",
        "Actualización de software y aplicación de medidas básicas de seguridad informática.",
        "Gestión y administración de Docker y de otros sistemas avanzados.",
      ],
      tech: ["Windows", "Linux", "LAN", "Routers/Switches", "Docker"],
    },
    {
      role: "Agente de operaciones de cruceros",
      company: "Intercruises Shoreside & Port Services",
      place: "Barcelona",
      web: null,
      dates: "10/05/2026 – Actual",
      bullets: [
        "Atención y asistencia a pasajeros de cruceros en las operaciones de embarque y desembarque.",
        "Recepción, orientación y atención al cliente en las instalaciones portuarias.",
        "Gestión y coordinación de pasajeros durante las escalas de los cruceros.",
        "Resolución de incidencias y atención de consultas de los pasajeros.",
        "Coordinación con el equipo de operaciones y otros servicios implicados en la escala del buque.",
      ],
      tech: [],
    },
  ],

  education: [
    {
      title: "Educación Secundaria Obligatoria",
      center: "IES Santa Eulàlia",
      place: "L'Hospitalet de Llobregat, España",
      dates: "12/09/2019 – 15/06/2023",
      level: "Nivel 3 EQF-MEC",
      web: null,
    },
    {
      title: "Sistemas Microinformáticos y Redes",
      center: "iFP - Formación Profesional Barcelona L'Hospitalet",
      place: "L'Hospitalet de Llobregat, España",
      dates: "12/09/2023 – 15/06/2025",
      level: "Nivel 4 EQF-MEC",
      web: "https://www.ifp.es/",
    },
    {
      title: "Administración de Sistemas Informáticos en Red — perfil Ciberseguridad",
      center: "iFP - Formación Profesional Barcelona L'Hospitalet",
      place: "L'Hospitalet de Llobregat, España",
      dates: "12/09/2025 – Actual",
      level: "Nivel 5 EQF-MEC",
      web: "https://www.ifp.es/",
    },
  ],

  // Agrupación de tecnologías mencionadas en la experiencia real.
  // Sin porcentajes inventados: solo listas de lo que aparece en el CV.
  skills: [
    {
      category: "Sistemas operativos",
      items: ["Windows", "Linux"],
    },
    {
      category: "Redes",
      items: ["Redes locales (LAN)", "Cableado", "Routers", "Switches"],
    },
    {
      category: "Virtualización / Contenedores",
      items: ["Docker"],
    },
    {
      category: "Soporte y administración",
      items: [
        "Soporte técnico a usuarios",
        "Gestión de usuarios y permisos",
        "Copias de seguridad",
        "Monitorización de sistemas",
        "Medidas básicas de seguridad informática",
      ],
    },
  ],

  // No hay proyectos personales listados en el CV.
  projects: [],

  languages: [
    { name: "Catalán", level: "Lengua materna" },
    { name: "Español", level: "Lengua materna" },
    {
      name: "Inglés",
      level: null,
      detail: [
        "Comprensión auditiva: B1",
        "Comprensión lectora: B2",
        "Interacción oral: B1",
        "Expresión oral: B1",
        "Expresión escrita: B1",
      ],
    },
  ],
};
