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
    initScrollProgress();
    initSiteSearch();
    initCopyEmail();
    initContactForm();
    initPrivacyNotice();
    addUtmTracking();
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
        if (event.key === "Escape" && menu.classList.contains("is-open")) {
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
        const items = section.querySelectorAll(".section-heading, .about-copy, .toolkit-item, .project-card, .log-entry, .faq-item, .contact-panel");
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

function initScrollProgress() {
    const progress = document.querySelector("#scroll-progress-value");
    const backToTop = document.querySelector("#back-to-top");
    if (!progress) return;

    let framePending = false;
    const update = () => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const amount = maxScroll > 0 ? window.scrollY / maxScroll : 0;
        progress.style.transform = `scaleX(${Math.min(1, Math.max(0, amount))})`;
        backToTop?.classList.toggle("is-visible", window.scrollY > 450);
        framePending = false;
    };

    window.addEventListener("scroll", () => {
        if (framePending) return;
        framePending = true;
        window.requestAnimationFrame(update);
    }, { passive: true });
    update();
}

function initSiteSearch() {
    const dialog = document.querySelector("#site-search");
    const openButton = document.querySelector("#search-open");
    const input = document.querySelector("#site-search-input");
    const results = document.querySelector("#search-results");
    if (!dialog || !openButton || !input || !results) return;

    const sections = [...document.querySelectorAll("main section[id]")].map((section) => {
        const heading = section.querySelector("h1, h2");
        const summary = [...section.querySelectorAll("p, h3, li")]
            .map((element) => element.textContent.trim())
            .filter(Boolean)
            .join(" ")
            .slice(0, 220);
        return { id: section.id, title: heading?.textContent.trim() || section.id, summary, text: section.textContent.toLowerCase() };
    });

    const renderResults = () => {
        const query = input.value.trim().toLowerCase();
        results.replaceChildren();
        if (!query) return;
        const matches = sections.filter((section) => section.text.includes(query));
        if (!matches.length) {
            const empty = document.createElement("li");
            empty.className = "search-empty";
            empty.textContent = "No matches. Try a different word.";
            results.append(empty);
            return;
        }
        matches.forEach((section) => {
            const item = document.createElement("li");
            const link = document.createElement("a");
            link.href = `#${section.id}`;
            const title = document.createElement("strong");
            title.textContent = section.title;
            const summary = document.createElement("span");
            summary.textContent = section.summary;
            link.append(title, summary);
            link.addEventListener("click", () => dialog.close());
            item.append(link);
            results.append(item);
        });
    };

    openButton.addEventListener("click", () => {
        dialog.showModal();
        input.value = "";
        results.replaceChildren();
        input.focus();
    });
    input.addEventListener("input", renderResults);
    dialog.addEventListener("click", (event) => {
        if (event.target === dialog) dialog.close();
    });
}

function initCopyEmail() {
    const button = document.querySelector("#copy-email");
    const status = document.querySelector("#form-status");
    if (!button) return;

    button.addEventListener("click", async () => {
        const email = button.dataset.email;
        if (!email) return;
        try {
            await navigator.clipboard.writeText(email);
            if (status) {
                status.dataset.state = "success";
                status.textContent = "Email address copied.";
            }
            button.textContent = "Copied!";
            window.setTimeout(() => { button.textContent = "Copy email address"; }, 1800);
        } catch {
            if (status) {
                status.dataset.state = "error";
                status.textContent = `Copy unavailable. Email Aditya at ${email}.`;
            }
        }
    });
}

function initContactForm() {
    const form = document.querySelector("#contact-form");
    const dialog = document.querySelector("#email-confirm");
    const confirmButton = document.querySelector("#email-confirm-yes");
    const status = document.querySelector("#form-status");
    if (!form || !dialog || !confirmButton || !status) return;

    let draft = null;
    const fields = [...form.querySelectorAll("input, textarea")];

    const setStatus = (state, message) => {
        status.dataset.state = state;
        status.textContent = message;
    };

    fields.forEach((field) => {
        field.addEventListener("input", () => {
            field.removeAttribute("aria-invalid");
            if (field.validity.valid) setStatus("", "");
        });
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const invalid = fields.filter((field) => !field.validity.valid);
        fields.forEach((field) => {
            if (!field.validity.valid) field.setAttribute("aria-invalid", "true");
            else field.removeAttribute("aria-invalid");
        });
        if (invalid.length) {
            const first = invalid[0];
            const fieldLabel = first.labels?.[0]?.textContent.trim().toLowerCase() || "required";
            const message = first.validity.typeMismatch
                ? "Enter a valid email address."
                : `Please complete the ${fieldLabel.replace(/^your\s+/, "")} field.`;
            setStatus("error", message);
            first.focus();
            return;
        }

        const values = new FormData(form);
        draft = {
            name: String(values.get("name")).trim(),
            email: String(values.get("email")).trim(),
            message: String(values.get("message")).trim()
        };
        dialog.showModal();
    });

    confirmButton.addEventListener("click", () => {
        if (!draft) return;
        const subject = encodeURIComponent(`Portfolio message from ${draft.name}`);
        const body = encodeURIComponent(`${draft.message}\n\nFrom: ${draft.name}\nEmail: ${draft.email}`);
        const mailto = `mailto:adityakushwaha.tech27@gmail.com?subject=${subject}&body=${body}`;
        dialog.close();
        setStatus("success", "Your email app was asked to open with a draft. Review and send it there to complete your message.");
        window.location.href = mailto;
    });
}

function initPrivacyNotice() {
    const banner = document.querySelector("#privacy-banner");
    const dismiss = document.querySelector("#privacy-dismiss");
    if (!banner || !dismiss) return;

    let dismissed = false;
    try {
        dismissed = localStorage.getItem("portfolioPrivacyNoticeDismissed") === "true";
    } catch {
        // Keep the notice visible when browser storage is unavailable.
    }
    if (!dismissed) banner.hidden = false;

    dismiss.addEventListener("click", () => {
        banner.hidden = true;
        try {
            localStorage.setItem("portfolioPrivacyNoticeDismissed", "true");
        } catch {
            // Dismissal still applies for this page view.
        }
    });
}

function addUtmTracking() {
    document.querySelectorAll('a[target="_blank"]').forEach((link) => {
        try {
            const url = new URL(link.href);
            url.searchParams.set("utm_source", "aditya-portfolio");
            url.searchParams.set("utm_medium", "referral");
            url.searchParams.set("utm_campaign", "portfolio");
            link.href = url.toString();
        } catch {
            // Leave non-URL links unchanged.
        }
    });
}

document.addEventListener("click", (event) => {
    const closeButton = event.target.closest("[data-close-dialog]");
    if (!closeButton) return;
    closeButton.closest("dialog")?.close();
});
