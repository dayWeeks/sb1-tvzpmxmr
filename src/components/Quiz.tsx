import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flower2, Sparkles, Heart } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: Array<{
    value: string;
    label: string;
    icon?: React.ReactNode;
  }>;
}

const questions: Question[] = [
  {
    id: 1,
    question: "Quelle ambiance vous correspond le mieux ?",
    options: [
      { value: "romantic", label: "Romantique et délicate", icon: <Heart className="w-5 h-5" /> },
      { value: "mysterious", label: "Mystérieuse et envoûtante", icon: <Sparkles className="w-5 h-5" /> },
      { value: "fresh", label: "Fraîche et pétillante", icon: <Flower2 className="w-5 h-5" /> },
      { value: "exotic", label: "Exotique et chaleureuse" }
    ]
  },
  {
    id: 2,
    question: "Quel moment de la journée préférez-vous ?",
    options: [
      { value: "morning", label: "L'aube dorée" },
      { value: "afternoon", label: "L'après-midi ensoleillé" },
      { value: "evening", label: "Le coucher de soleil" },
      { value: "night", label: "La nuit étoilée" }
    ]
  },
  {
    id: 3,
    question: "Quelle note vous attire le plus ?",
    options: [
      { value: "floral", label: "Notes florales délicates" },
      { value: "woody", label: "Bois précieux et chauds" },
      { value: "citrus", label: "Agrumes pétillants" },
      { value: "spicy", label: "Épices exotiques" }
    ]
  },
  {
    id: 4,
    question: "Votre style vestimentaire ?",
    options: [
      { value: "elegant", label: "Élégant et sophistiqué" },
      { value: "bohemian", label: "Bohème et libre" },
      { value: "classic", label: "Classique et intemporel" },
      { value: "modern", label: "Moderne et audacieux" }
    ]
  },
  {
    id: 5,
    question: "Quelle destination tropicale vous fait rêver ?",
    options: [
      { value: "tahiti", label: "Tahiti et ses lagons" },
      { value: "bali", label: "Bali et ses jardins parfumés" },
      { value: "seychelles", label: "Seychelles et leurs plages" },
      { value: "madagascar", label: "Madagascar et ses épices" }
    ]
  }
];

const Quiz: React.FC = () => {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const navigate = useNavigate();

  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = () => {
    // Store answers in localStorage for the results page
    localStorage.setItem('quizAnswers', JSON.stringify(answers));
    navigate('/results');
  };

  const isComplete = Object.keys(answers).length === questions.length;

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full mb-6 shadow-lg">
            <Flower2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-playfair font-semibold text-gray-800 mb-4">
            Parfums des Îles
          </h1>
          <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
            Découvrez votre parfum idéal grâce à notre quiz personnalisé. 
            Laissez-vous guider par vos sens vers votre fragrance tropicale parfaite.
          </p>
        </div>

        {/* Questions */}
        <div className="space-y-8">
          {questions.map((question, index) => (
            <div key={question.id} className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                  {index + 1}
                </div>
                <h2 className="text-xl md:text-2xl font-playfair text-gray-800">
                  {question.question}
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {question.options.map((option) => (
                  <label
                    key={option.value}
                    className={`
                      relative cursor-pointer group transition-all duration-300
                      ${answers[question.id] === option.value 
                        ? 'bg-gradient-to-r from-yellow-100 to-pink-100 border-2 border-yellow-400 shadow-md' 
                        : 'bg-white/50 border border-gray-200 hover:bg-white/80 hover:border-yellow-300'
                      }
                      rounded-xl p-4 flex items-center space-x-3
                    `}
                  >
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={option.value}
                      checked={answers[question.id] === option.value}
                      onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                      className="sr-only"
                    />
                    <div className={`
                      w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200
                      ${answers[question.id] === option.value 
                        ? 'border-yellow-500 bg-yellow-500' 
                        : 'border-gray-300 group-hover:border-yellow-400'
                      }
                    `}>
                      {answers[question.id] === option.value && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    {option.icon && (
                      <div className={`
                        ${answers[question.id] === option.value ? 'text-yellow-600' : 'text-gray-500'}
                        transition-colors duration-200
                      `}>
                        {option.icon}
                      </div>
                    )}
                    <span className={`
                      font-medium transition-colors duration-200
                      ${answers[question.id] === option.value ? 'text-gray-800' : 'text-gray-600'}
                    `}>
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="text-center mt-12">
          <button
            onClick={handleSubmit}
            disabled={!isComplete}
            className={`
              px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform
              ${isComplete
                ? 'bg-gradient-to-r from-yellow-400 via-pink-400 to-green-400 text-white shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }
            `}
          >
            {isComplete ? (
              <span className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5" />
                <span>Voir mon parfum idéal</span>
              </span>
            ) : (
              'Répondez à toutes les questions'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;