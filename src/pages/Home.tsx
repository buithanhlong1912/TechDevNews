import React from 'react'
import ArticleDetails from '../components/ArticleDetails/ArticleDetails'
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
export default function Home() {
  return (
    <div>
      <Header/>
      <ArticleDetails />
      <Footer />
    </div>
  );
}

