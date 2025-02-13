import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Utilisation de l'API Brave pour obtenir des articles de qualité
    const response = await axios.get('https://api.search.brave.com/res/v1/news/search', {
      headers: {
        'Accept': 'application/json',
        'Accept-Encoding': 'gzip',
        'X-Subscription-Token': process.env.BRAVE_API_KEY
      },
      params: {
        q: 'site:economist.com',
        count: 10,
        freshness: 'month'
      }
    });

    // Transformer les résultats en format adapté à notre application
    const articles = response.data.results.map((article, index) => ({
      id: index + 1,
      title: article.title,
      source: 'The Economist',
      summary: article.description,
      url: article.url,
      image: article.image?.url || '/placeholder/article.jpg',
      date: article.published_time
    }));

    res.status(200).json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ message: 'Error fetching articles' });
  }
}