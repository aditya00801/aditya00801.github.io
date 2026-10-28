# Aditya Kushwaha - Personal Portfolio

This is the source code for my personal portfolio website, built with plain HTML, CSS, and JavaScript. It features a retro digital field-notes visual style, a CSS 3D portrait scene, lightweight motion, responsive navigation, site search, project details, an expandable FAQ, and a learning log. The contact form prepares a draft in the visitor’s email app; it does not send or store messages. Motion respects reduced-motion settings. Search metadata, a canonical URL, `sitemap.xml`, `robots.txt`, and a web app manifest are included.

**Live Site:** [https://aditya00801.github.io/](https://aditya00801.github.io/)

## Folder Structure

```
├── index.html       # Main HTML markup
├── css/
│   └── style.css    # All CSS styles and variables
├── js/
│   └── script.js    # Navigation, search, contact form, and motion behavior
├── robots.txt       # Search crawler access rules
├── sitemap.xml      # Public page index for search engines
├── site.webmanifest # Progressive web app metadata
├── images/          # Image assets directory
└── README.md        # Project documentation
```

## How to Run Locally

1. Clone or download this repository.
2. Open `index.html` directly in any modern web browser. No build steps, frameworks, or npm installations are required.

## How to Add or Edit Projects

Projects are dynamically rendered using JavaScript to make it easy to update them without modifying the HTML structure.

1. Open `js/script.js`.
2. Locate the `projects` array at the top of the file.
3. Add a new object or edit an existing one following this structure:
   ```javascript
   {
       title: "Project Name",
       description: "A short description of what the project does.",
       tags: ["React", "Node.js", "MongoDB"],
       codeLink: "https://github.com/aditya00801/project-repo",
       liveLink: "https://project-url.com" // Leave empty ("") if no live link
   }
   ```
4. Save the file and refresh your browser.
