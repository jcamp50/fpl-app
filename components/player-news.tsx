'use client'
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';


interface Article {
  title: string;
  description: string;
  url: string;
  image: string;
}

const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;

const PlayerNews = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          'https://gnews.io/api/v4/search?q="Premier League"&lang=en&country=us&max=5&apikey=' + apiKey
        );
        const data = await response.json();
        if (data.articles && Array.isArray(data.articles)) {
          setArticles(data.articles);
        } else {
          console.error('Unexpected response structure:', data);
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className='grid grid-cols-1 grid-rows-3 items-center'>
      {articles.map((item, index) => (
        <Card key={index} className='mx-2 my-2 flex flex-row'>
          <div className='flex flex-col w-full'>
            <CardHeader>
              <CardTitle>
                <div className='flex flex-row'>
                  <a href={item.url}>{item.title}</a>
                </div>
              </CardTitle>
              {item.description && (
                <CardDescription>{item.description}</CardDescription>
              )}
            </CardHeader>
            <CardContent>{/* Add any additional content here */}</CardContent>
          </div>

          {item.image && (
            <img src={item.image} alt={item.title} className='w-40 rounded-lg' />
          )}
        </Card>
      ))}
    </div>
  );
};

export default PlayerNews;
