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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={handleBackToQuiz}
          className="mb-8 flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Refaire le quiz</span>
        </button>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full mb-6 shadow-lg">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-playfair font-semibold text-gray-800 mb-6">
            Votre Parfum Idéal
          </h1>
        </div>

        {/* Results Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-white/50 mb-8">
          {/* Perfume Composition */}
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-playfair text-gray-800 mb-8 text-center">
              Votre composition personnalisée
            </h2>
            
            <div className="space-y-6">
              {results.map((perfume, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-lg font-medium text-gray-800">
                        {perfume.name}
                      </span>
                      <span className="text-lg font-semibold text-gray-700">
                        {perfume.percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`bg-gradient-to-r ${perfume.color} h-3 rounded-full shadow-sm transition-all duration-1000 ease-out`}
                        style={{ width: `${perfume.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Poetic Description */}
          <div className="bg-gradient-to-r from-yellow-50 to-pink-50 rounded-2xl p-8 mb-10">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-yellow-600" />
            </div>
            <p className="text-lg md:text-xl font-light text-gray-700 leading-relaxed text-center italic font-playfair">
              "Nous vous conseillons de mettre quelques gouttes de ce parfum pour séduire sous un ciel tropical, 
              tandis que les notes exotiques et épicées se mêlent à l'atmosphère enchantée de la soirée."
            </p>
          </div>

          {/* Perfume Bottle Visualization */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-32 h-40 bg-gradient-to-b from-yellow-100 via-pink-100 to-green-100 rounded-t-3xl rounded-b-lg shadow-lg relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 w-6 h-8 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-t-lg"></div>
              <div className="w-20 h-28 bg-gradient-to-b from-white/50 to-transparent rounded-2xl flex items-center justify-center">
                <Flower2 className="w-12 h-12 text-yellow-600/50" />
              </div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-gray-600">
                Parfums des Îles
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <button className="bg-gradient-to-r from-yellow-400 via-pink-400 to-green-400 text-white px-10 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-3 mx-auto">
              <Sparkles className="w-5 h-5" />
              <span>Découvrir notre collection</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;