const projects = [
    {
        title: "Student Lifestyle & Stress Prediction",
        description: "An end-to-end machine learning app predicting student health conditions across three categories. Trained on 690,088 records with an optimized CatBoost model and 20 engineered features, reaching 94.985% balanced accuracy.",
        tags: ["Machine Learning", "CatBoost", "Streamlit", "Optuna"],
        codeLink: "https://github.com/aditya00801/Student_Lifestyle_and_Stress_Prediction",
        liveLink: "https://studentlifestyleandstressprediction-eyme6xuza6uzbh72mqn6rj.streamlit.app/"
    },
    {
        title: "CyberShield-Auto",
        description: "An AI-driven cybersecurity platform in development. It combines machine learning, multi-agent workflows, and security event analysis to identify suspicious activity and assess its severity.",
        tags: ["AI Agents", "FastAPI", "Pydantic", "Cybersecurity"],
        codeLink: "https://github.com/aditya00801/CyberShield-Auto",
        liveLink: ""
    }
];

document.addEventListener("DOMContentLoaded", () => {
    initMobileMenu();
    renderProjects();
    initScrollMotion();
    initPortraitTilt();
});

function initMobileMenu() {
    const menuButton = document.querySelector(".menu-toggle");
    const menu = document.querySelector("#main-nav");
    if (!menuButton || !menu) return;

    const closeMenu = () => {
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation");
        menu.classList.remove("is-open");
    };

    menuButton.addEventListener("click", () => {
        const willOpen = menuButton.getAttribute("aria-expanded") !== "true";
        menuButton.setAttribute("aria-expanded", String(willOpen));
        menuButton.setAttribute("aria-label", willOpen ? "Close navigation" : "Open navigation");
        menu.classList.toggle("is-open", willOpen);
    });

    menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
            menuButton.focus();
        }
    });
}

function renderProjects() {
    const grid = document.querySelector("#projects-grid");
    if (!grid) return;

    projects.forEach((project, index) => {
        const card = document.createElement("article");
        card.className = "project-card";

        const topLine = document.createElement("div");
        topLine.className = "project-topline";
        const projectNumber = document.createElement("span");
        projectNumber.textContent = `PROJECT / 0${index + 1}`;
        const projectStatus = document.createElement("span");
        projectStatus.textContent = index === 1 ? "IN DEVELOPMENT" : "DEPLOYED";
        topLine.append(projectNumber, projectStatus);

        const title = document.createElement("h3");
        title.className = "project-title";
        title.textContent = project.title;

        const description = document.createElement("p");
        description.className = "project-desc";
        description.textContent = project.description;

        const tags = document.createElement("div");
        tags.className = "project-tags";
        project.tags.forEach((label) => {
            const tag = document.createElement("span");
            tag.className = "tag";
            tag.textContent = label;
            tags.append(tag);
        });

        const links = document.createElement("div");
        links.className = "project-links";
        addProjectLink(links, project.codeLink, "Source code");
        addProjectLink(links, project.liveLink, "Live demo");

        card.append(topLine, title, description, tags, links);
        grid.append(card);
    });
}

function addProjectLink(container, href, label) {
    if (!href) return;
    const link = document.createElement("a");
    link.href = href;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = `${label} ↗`;
    container.append(link);
}

function initScrollMotion() {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            currentObserver.unobserve(entry.target);
        });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    document.querySelectorAll(".reveal-section").forEach((section) => {
        const items = section.querySelectorAll(".section-heading, .about-copy, .toolkit-item, .project-card, .log-entry, .contact-panel");
        items.forEach((item, index) => {
            item.classList.add("reveal-item");
            item.style.setProperty("--reveal-delay", `${Math.min(index, 5) * 55}ms`);
            observer.observe(item);
        });
    });
}

function initPortraitTilt() {
    const visual = document.querySelector(".hero-visual");
    if (!visual || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const frame = visual.querySelector(".portrait-frame");
    if (!frame) return;

    visual.addEventListener("pointermove", (event) => {
        const bounds = visual.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        frame.style.setProperty("--tilt-x", `${-6 + x * 10}deg`);
        frame.style.setProperty("--tilt-y", `${3 - y * 8}deg`);
    });

    visual.addEventListener("pointerleave", () => {
        frame.style.removeProperty("--tilt-x");
        frame.style.removeProperty("--tilt-y");
    });
}
