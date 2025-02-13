import axios from 'axios';

// Cette fonction nettoie et normalise les articles
const normalizeArticle = (article, index) => {
  return {
    id: `${index}-${Date.now()}`,
    title: article.title || 'Sans titre',
    source: article.source?.name || 'Source inconnue',
    summary: article.description || article.content || 'Pas de description disponible',
    url: article.url,
    image: article.urlToImage || '/placeholder/article.jpg',
    publishedAt: article.publishedAt
  };
};

export default async function handler(req, res) {
  try {
    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: 'technology OR economics OR politics',
        language: 'fr',
        sortBy: 'publishedAt',
        pageSize: 20,
        sources: 'le-monde,les-echos,liberation', // Sources françaises de qualité
        apiKey: process.env.NEWS_API_KEY,
      },
      headers: {
        'Accept': 'application/json',
      },
    });

    const articles = response.data.articles.map(normalizeArticle);
    
    res.status(200).json(articles);
  } catch (error) {
    console.error('Erreur lors de la récupération des articles:', error);
    res.status(500).json({ 
      error: 'Erreur lors de la récupération des articles',
      message: error.message 
    });
  }
}