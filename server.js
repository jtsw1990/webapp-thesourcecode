if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const path = require("path");
const express = require("express");
const port = process.env.PORT || 3000;
const app = express();
const favicon = require('serve-favicon');
const articles = require("./data/articles.json");
const projects = require("./data/projects.json");


app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// middleware for serving favicon
app.use(favicon(path.join(__dirname, "public", "img", "favicon.ico")));


app.get("/", (req, res) => {
    res.redirect("/home");
})


app.get("/home", (req, res) => {
    res.render("home", {
        currentPage: req.originalUrl
    });
})


app.get("/articles", (req, res) => {
    res.render("articles", {
        articles: articles,
        currentPage: req.originalUrl
    });
});

// Decide if we want to use slugs? or a router function?
app.get("/articles/linear_regression", (req, res) => {
    res.render("pages/linear_regression", {
        currentPage: req.originalUrl
    });
})

app.get("/articles/feature_engineering", (req, res) => {
    res.render("pages/feature_engineering", {
        currentPage: req.originalUrl
    });
})


app.get("/projects", (req, res) => {
    res.render("projects", {
        projects: projects,
        currentPage: req.originalUrl
    });
});


app.get("/sitemap", (req, res) => {
    res.render("sitemap", {
        currentPage: req.originalUrl
    });
});

app.get("/sitemap.xml", (req, res) => {
    res.type('application/xml');
    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://www.jonathattan.com/home</loc>
        <lastmod>2026-04-25</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>https://www.jonathattan.com/articles</loc>
        <lastmod>2026-04-25</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>
    <url>
        <loc>https://www.jonathattan.com/articles/linear_regression</loc>
        <lastmod>2026-04-25</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://www.jonathattan.com/articles/feature_engineering</loc>
        <lastmod>2026-04-25</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://www.jonathattan.com/projects</loc>
        <lastmod>2026-04-25</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>
    <url>
        <loc>https://www.jonathattan.com/sitemap</loc>
        <lastmod>2026-04-25</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.5</priority>
    </url>
</urlset>`;
    res.send(sitemapXml);
});

// 404 handler - catch all undefined routes
app.use((req, res) => {
    res.status(404).render("404", {
        currentPage: req.originalUrl
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render("500", {
        error: process.env.NODE_ENV === "production" ? "Internal Server Error" : err.message
    });
});

app.listen(port || 3000, () => {
    console.log(`Listening on port ${port || 3000}`);
});
