import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { articles } from '../data/articles';
import './ArticleDetail.css';

const ArticleDetail = () => {
    const { id } = useParams();
    const article = articles.find(a => a.id === id);

    if (!article) {
        return (
            <div className="container section text-center">
                <h2>Article not found</h2>
                <Link to="/more" className="btn">Back to Resources</Link>
            </div>
        );
    }

    return (
        <div className="article-detail-page">
            <div className="article-hero" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${article.image})` }}>
                <div className="container">
                    <h1>{article.title}</h1>
                    <div className="article-meta">{article.date}</div>
                </div>
            </div>

            <div className="container section article-container">
                <Link to="/more" className="back-link">&larr; Back to Resources</Link>
                <div className="article-body" dangerouslySetInnerHTML={{ __html: article.content }}></div>
            </div>
        </div>
    );
};

export default ArticleDetail;
