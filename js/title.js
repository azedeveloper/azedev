const sections = document.querySelectorAll(".section");
const titlePrefix = "AzE :: ";

function setTitle(sectionId) {
  if (sectionId === "intro") {
    document.title = "AzE";
  } else {
    document.title = titlePrefix + sectionId.charAt(0).toUpperCase() + sectionId.slice(1);
  }
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setTitle(entry.target.id);
      }
    });
  },
  { threshold: 0.5 } // Adjust this value to determine when to change the title
);

sections.forEach((section) => observer.observe(section));