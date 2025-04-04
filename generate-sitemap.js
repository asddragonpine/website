import { SitemapStream, streamToPromise } from 'sitemap';
import fs from 'fs';

(async () => {
  const hostname = 'https://asddragonpine.com'; // Aggiorna con il tuo dominio
  const routes = ['/', '/event', '/aboutus', '/gallery']; // Aggiungi altre rotte se necessario

  const sitemap = new SitemapStream({ hostname });
  
  routes.forEach(route => sitemap.write({ url: route }));
  sitemap.end();

  try {
    const data = await streamToPromise(sitemap);
    fs.writeFileSync('./sitemap.xml', data.toString());
    console.log('Sitemap generata correttamente!');
  } catch (error) {
    console.error('Errore nella generazione della sitemap:', error);
  }
})();
