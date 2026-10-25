// The beta page's questionnaire: an email with the questions, answered below each one.
(() => {
  const address = "hello@doxie.ch";
  const surveys = {
    de: {
      subject: "doxie Beta: Rückmeldung",
      questions: [
        "Welcher Mac und welche macOS-Version? (z. B. MacBook Air M2, macOS 15)",
        "War die Installation klar? Wo bist du hängen geblieben?",
        "Wie oft hast du doxie benutzt? (täglich / ein paar Mal / kaum)",
        "Wofür hast du es benutzt?",
        "Was hat dir am besten gefallen?",
        "Was hat genervt, gefehlt oder nicht funktioniert?",
        "Kamen deine Erinnerungen pünktlich?",
        "Hat doxie ein Update angeboten, und hat es geklappt?",
        "Würdest du doxie weiter benutzen? Warum (nicht)?",
        "Pro kostet einmalig 7.99 $ (Notion, Sync zwischen Macs, Designs, wiederkehrende Erinnerungen). Würdest du es kaufen? Was müsste dabei sein?",
        "Sonst noch etwas?",
      ],
    },
    en: {
      subject: "doxie beta: feedback",
      questions: [
        "Which Mac and macOS version? (e.g. MacBook Air M2, macOS 15)",
        "Was installing clear? Where did you get stuck?",
        "How often did you use doxie? (daily / a few times / hardly)",
        "What did you use it for?",
        "What did you like most?",
        "What was annoying, missing or broken?",
        "Did your reminders arrive on time?",
        "Did doxie offer an update, and did it work?",
        "Would you keep using doxie? Why (not)?",
        "Pro is a one-time $7.99 (Notion, sync between Macs, designs, repeating reminders). Would you buy it? What would it need?",
        "Anything else?",
      ],
    },
  };

  document.querySelectorAll("[data-survey]").forEach((link) => {
    const survey = surveys[link.dataset.survey];
    const body = survey.questions.map((q, i) => `${i + 1}. ${q}\n\n\n`).join("");
    link.href = `mailto:${address}?subject=${encodeURIComponent(survey.subject)}&body=${encodeURIComponent(body)}`;
  });
})();
