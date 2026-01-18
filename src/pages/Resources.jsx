import React from 'react';
import { Link } from 'react-router-dom';
import { articles } from '../data/articles';
import './Resources.css';

const Resources = () => {
    return (
        <div className="resources-page container section">
            <div className="section-header">
                <h1>Resources</h1>
                <p>Insights, trends, and strategies for the modern workplace.</p>
            </div>

            <div className="articles-grid">
                {articles.map((article) => (
                    <div key={article.id} className="article-card">
                        <div className="article-image" style={{ backgroundImage: `url(${article.image})` }}></div>
                        <div className="article-content">
                            <div className="article-date">{article.date}</div>
                            <h3>{article.title}</h3>
                            <p>{article.excerpt}</p>
                            <Link to={`/resources/${article.id}`} className="read-more">Read More &rarr;</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Resources;
