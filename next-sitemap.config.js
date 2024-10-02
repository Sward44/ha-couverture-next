// next-sitemap.config.js

// "postbuild": "next-sitemap"

// module.exports = {
//   siteUrl: "https://www.buzz-ready.com",
//   generateRobotsTxt: true,
//   exclude: ["/admin/*"],
//   robotsTxtOptions: {
//     policies: [
//       {
//         userAgent: "*",
//         allow: "/",
//       },
//     ],
//   },
//   // Ajoutez cette fonction pour personnaliser chaque URL
//   transform: async (config, path) => {
//     // Définissez ici vos règles pour changefreq et priority
//     let changefreq = "monthly";
//     let priority = 0.7;

//     if (path === "/") {
//       changefreq = "weekly";
//       priority = 1.0;
//     } else if (path.startsWith("/blog")) {
//       changefreq = "weekly";
//       priority = 0.8;
//     } else if (path === "/avis-clients") {
//       changefreq = "weekly";
//       priority = 0.9;
//     }
//     // Ajoutez d'autres conditions selon vos besoins

//     return {
//       loc: path, // L'URL relative de la page
//       changefreq: changefreq,
//       priority: priority,
//       lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
//     };
//   },
// };

// // Ajoutez ce script à votre package.json
// // "scripts": {
// //   ...
// //   "postbuild": "next-sitemap"
// // }

// // extended-sitemap.js
// const { createSitemap } = require("next-sitemap");
// const fs = require("fs");
// const path = require("path");

// const config = require("./next-sitemap.config.js");

// // Fonction pour obtenir les informations sur les images
// function getPageImages(pagePath) {
//   // Cette fonction devrait retourner un tableau d'objets image pour chaque page
//   // Vous devrez l'implémenter en fonction de votre structure de projet
//   // Exemple :
//   return [
//     {
//       loc: "https://www.buzz-ready.com/ha-couverture-global.webp",
//       caption: "Vue globale de Ha Couverture",
//     },
//     // Ajoutez d'autres images ici
//   ];
// }

// async function generateExtendedSitemap() {
//   const sitemap = await createSitemap(config);

//   // Parcourir chaque URL dans le sitemap
//   sitemap.urls = sitemap.urls.map((url) => {
//     const images = getPageImages(url.loc);
//     if (images && images.length > 0) {
//       url["image:image"] = images.map((img) => ({
//         "image:loc": img.loc,
//         "image:caption": img.caption,
//       }));
//     }
//     return url;
//   });

//   // Générer le XML du sitemap
//   const sitemapXml = sitemap.toXML();

//   // Écrire le fichier sitemap.xml
//   fs.writeFileSync(path.join(__dirname, "public", "sitemap.xml"), sitemapXml);
// }

// generateExtendedSitemap();

// Ajoutez ce script à votre package.json
// "scripts": {
//   ...
//   "postbuild": "node extended-sitemap.js"
// }
