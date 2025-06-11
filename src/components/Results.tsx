import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, Flower2, Heart } from 'lucide-react';

interface PerfumeResult {
  name: string;
  percentage: number;
  color: string;
}

const Results: React.FC = () => {
  const [results, setResults] = useState<PerfumeResult[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedAnswers = localStorage.getItem('quizAnswers');
    if (!savedAnswers) {
      navigate('/');
      return;
    }

    // Generate personalized results based on answers
    const answers = JSON.parse(savedAnswers);
    const generatedResults = generatePerfumeResults(answers);
    setResults(generatedResults);
  }, [navigate]);

  const generatePerfumeResults = (answers: Record<number, string>): PerfumeResult[] => {
    // Simple algorithm to generate results based on answers
    const baseResults = [
      { name: 'Ylang-Ylang', percentage: 35, color: 'from-yellow-400 to-yellow-600' },
      { name: 'Rose', percentage: 25, color: 'from-pink-400 to-pink-600' },
      { name: 'Poivre noir', percentage: 15, color: 'from-gray-600 to-gray-800' },
      { name: 'Bergamote', percentage: 25, color: 'from-green-400 to-green-600' }
    ];

    // Adjust percentages based on answers (simplified)
    const values = Object.values(answers);
    if (values.includes('floral') || values.includes('romantic')) {
      baseResults[0].percentage = 50;
      baseResults[1].percentage = 30;
      baseResults[2].percentage = 20;
      baseResults.splice(3, 1);
    } else if (values.includes('spicy') || values.includes('mysterious')) {
      baseResults[2].percentage = 35;
      baseResults[0].percentage = 30;
      baseResults[1].percentage = 35;
      baseResults.splice(3, 1);
    }

    return baseResults.slice(0, 3);
  };

  const handleBackToQuiz = () => {
    localStorage.removeItem('quizAnswers');
    navigate('/');
  };

  if (results.length === 0) {
    return (
      <div className="results-page">
        <div className="container" style={{ textAlign: 'center' }}>
          Chargement...
        </div>
      </div>
    );
  }

  return (
    <div className="results-page">
      <div className="container">
        <button onClick={handleBackToQuiz} className="back-btn">
          <ArrowLeft size={16} />&nbsp;Refaire le quiz
        </button>

        <h1>Votre Parfum Idéal</h1>

        <div className="results-card">
          <h2 className="question-title">Votre composition personnalisée</h2>
          {results.map((perfume, index) => (
            <div key={index} className="result-item">
              <div className="label" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span>{perfume.name}</span>
                <span>{perfume.percentage}%</span>
              </div>
              <div className="result-bar">
                <span style={{ width: `${perfume.percentage}%` }} />
              </div>
            </div>
          ))}

          <p className="poem">
            "Nous vous conseillons de mettre quelques gouttes de ce parfum pour séduire sous un ciel tropical, tandis que les notes exotiques et épicées se mêlent à l'atmosphère enchantée de la soirée."
          </p>

          <button className="cta-btn">Découvrir notre collection</button>
        </div>
      </div>
    </div>
  );
};

export default Results;