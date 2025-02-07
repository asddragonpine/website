const { SitemapStream, streamToPromise } = require('sitemap');
const fs = require('fs');

(async () => {
  const hostname = 'https://asddragonpine.com'; // Aggiorna con il tuo dominio
  const routes = ['/', '/event', '/aboutus']; // Aggiungi altre rotte se necessario

  const sitemap = new SitemapStream({ hostname });
  
  routes.forEach(route => sitemap.write({ url: route }));
  sitemap.end();

  try {
    const data = await streamToPromise(sitemap);
    fs.writeFileSync('./public/sitemap.xml', data.toString());
    console.log('Sitemap generata correttamente!');
  } catch (error) {
    console.error('Errore nella generazione della sitemap:', error);
  }
})();
