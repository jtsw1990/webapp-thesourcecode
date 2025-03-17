if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const path = require("path");
const express = require("express");
const port = process.env.PORT;
const app = express();
const favicon = require('serve-favicon');


app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// middleware for serving favicon
app.use(favicon(path.join(__dirname, "public", "img", "favicon.ico")));

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})


app.get("/", (req, res) => {
    res.redirect("/home");
})


app.get("/home", (req, res) => {
    res.render("home", {
        currentPage: req.originalUrl
    });
})


app.get("/articles", (req, res) => {
    const articles = [
        {
            title: "Visualising Data",
            photo: "img/article_img_viz.png",
            description: "Actuaries Digital",
            link: "https://www.actuaries.digital/2024/11/12/visualising-data/"
        },
        {
            title: "Explainable ML: A peek into the black box through SHAP",
            photo: "img/article_img_shap.jpg",
            description: "Actuaries Digital",
            link: "https://www.actuaries.digital/2021/02/05/explainable-ml-a-peek-into-the-black-box-through-shap/"
        },
        {
            title: "Git version control, because the Recycle Bin doesn’t count",
            photo: "img/article_img_git.png",
            description: "Actuaries Digital",
            link: "https://www.actuaries.digital/2019/04/17/analytics-snippet-version-control-because-the-recycle-bin-doesnt-count/"
        },
        {
            title: "Natural Language Processing Text Classification",
            photo: "img/article_img_nlp.png",
            description: "Actuaries Digital",
            link: "https://www.actuaries.digital/2018/11/20/analytics-snippet-natural-language-processing-text-classification/"
        },
        {
            title: "The Simple Linear Regression Guide",
            photo: "img/article_img_slr.png",
            description: "In-depth dive into simple linear regression, including mathematics and assumptions...",
            link: "/articles/linear_regression"
        },
        {
            title: "Feature Engineering Explained",
            photo: "img/article_img_feng.png",
            description: "An introduction to the why and how of feature engineering, with visual representation...",
            link: "/articles/feature_engineering"
        },
        {
            title: "Introduction to Goodness of Fit",
            photo: "img/article_img_gof.png",
            description: "Notebook tutorials on fitting and evaluating distributions...",
            link: "https://github.com/jtsw1990/stats-goodness-of-fit-tutorial"
        }
    ];
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
    const projects = [
        {
            title: "Bastion Labs Pty Ltd",
            photo: "/img/project_img_bl.png",
            description: "Co-founder of data consultancy company focusing on analytics education",
            link: "https://bastion-labs.co",
        },
        {
            title: "Glimpse - GenAI pipeline",
            photo: "/img/project_img_glimpse.png",
            description: "Data pipeline that turns news API feeds into AI-generated images for instagram",
            link: "https://github.com/jtsw1990/glimpse-gpt-pipeline",
        },
        {
            title: "Net Zero CSR Dashboard",
            photo: "/img/project_img_viz.png",
            description: "Tableau dashboard that won 2023 SCOR Iron Viz and Tableau Viz of the day",
            link: "https://public.tableau.com/app/profile/jonathan.tan2635/viz/SCORVizGames2023-TheInsideScoop/Summary",
        },
        {
            title: "Visualizing an artificial neural network",
            photo: "/img/project_img_ann.png",
            description: "Interactive streamlit app graphing decision boundaries of a neural network",
            link: "https://neuralnetworkarticle-grxitjvzn5qcx69ypbkdbz.streamlit.app/",
        },
        {
            title: "Cult by JTLabs",
            photo: "/img/project_img_nft.png",
            description: "Collection of NFTs that are hand drawn and layered through a javascript engine",
            link: "https://opensea.io/collection/cult-by-jtlabs",
        },
        {
            title: "nojutsu.io: digital platform for tutors and students",
            photo: "/img/project_img_nj.png",
            description: "Web app built on Node.js and deployed on Digital Ocean for tutors and students to connect and offer services.",
            link: "https://github.com/jtsw1990/tutor_website",
        },
        {
            title: "Grab AI for S.E.A 2019 Competition",
            photo: "/img/project_img_grab.jpg",
            description: "Grab challenged participants in 2019 to come up with solutions on how AI and their data can be used to solve problems in SEA.",
            link: "https://github.com/jtsw1990/grab-ai-safety",
        }
    ];
    res.render("projects", {
        projects: projects,
        currentPage: req.originalUrl
    });
});


app.get("/sitemap", (req, res) => {
    res.render("sitemap", {
        currentPage: req.originalUrl
    });
})
