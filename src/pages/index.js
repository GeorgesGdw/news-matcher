import { useState, useEffect } from 'react';
import TinderCard from 'react-tinder-card';

export default function Home() {
  const [articles, setArticles] = useState([
    {
      id: 1,
      title: "L'intelligence artificielle révolutionne l'industrie",
      source: 'The Economist',
      summary: "Comment l'IA transforme les processus de production et redéfinit le paysage économique mondial. Une analyse approfondie des impacts sur l'emploi et la productivité.",
      image: '/placeholder/article1.jpg'
    },
    {
      id: 2,
      title: 'La transition énergétique en Europe',
      source: 'The Economist',
      summary: 'Les défis et opportunités de la transformation vers les énergies renouvelables en Europe. Impact sur l\'économie et perspectives d\'avenir.',
      image: '/placeholder/article2.jpg'
    },
    {
      id: 3,
      title: 'Les nouvelles routes de la soie',
      source: 'The Economist',
      summary: 'Comment l\'initiative chinoise reshape le commerce mondial et les relations internationales. Analyse des enjeux géopolitiques.',
      image: '/placeholder/article3.jpg'
    }
  ]);

  const [savedArticles, setSavedArticles] = useState([]);

  const onSwipe = (direction, article) => {
    if (direction === 'right') {
      setSavedArticles([...savedArticles, article]);
      console.log('Article sauvegardé:', article.title);
    }
    // Retirer l'article de la pile principale
    setArticles(articles.filter(a => a.id !== article.id));
  };

  return (
    <div className='min-h-screen bg-gray-100'>
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-3xl font-bold text-center mb-8'>News Matcher</h1>
        
        <div className='relative h-[60vh] flex justify-center items-center'>
          {articles.map((article) => (
            <TinderCard
              key={article.id}
              onSwipe={(dir) => onSwipe(dir, article)}
              className='absolute'
            >
              <div className='bg-white rounded-lg shadow-lg p-6 h-[50vh] w-[80vw] max-w-md mx-auto'>
                <h2 className='text-xl font-semibold mb-2'>{article.title}</h2>
                <p className='text-gray-600 mb-4'>Source: {article.source}</p>
                <p className='text-gray-800'>{article.summary}</p>
                <div className='absolute bottom-4 left-0 right-0 text-center text-gray-500'>
                  <p>← Swipez gauche pour passer</p>
                  <p>Swipez droite pour sauvegarder →</p>
                </div>
              </div>
            </TinderCard>
          ))}
          
          {articles.length === 0 && (
            <div className='text-center text-gray-600'>
              <p className='text-xl'>Plus d'articles disponibles</p>
              <p className='mt-2'>Revenez plus tard pour plus de contenu</p>
            </div>
          )}
        </div>

        {savedArticles.length > 0 && (
          <div className='mt-8'>
            <h2 className='text-2xl font-semibold mb-4'>Articles sauvegardés</h2>
            <div className='grid gap-4'>
              {savedArticles.map((article) => (
                <div key={article.id} className='bg-white rounded-lg shadow p-4'>
                  <h3 className='text-lg font-medium'>{article.title}</h3>
                  <p className='text-gray-600'>{article.source}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}