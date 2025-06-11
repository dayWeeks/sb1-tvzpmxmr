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
    <div className="quiz-page">
      <div className="container">
        <h1>Parfums des Îles</h1>
        <p>Découvrez votre parfum idéal grâce à notre quiz personnalisé.</p>

        {questions.map((question) => (
          <div key={question.id} className="question-block">
            <h2 className="question-title">{question.question}</h2>
            <div className="options">
              {question.options.map((option) => (
                <label
                  key={option.value}
                  className={`option ${answers[question.id] === option.value ? 'checked' : ''}`}
                >
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={option.value}
                    checked={answers[question.id] === option.value}
                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                  />
                  {option.icon && <span className="icon">{option.icon}</span>}
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <button onClick={handleSubmit} disabled={!isComplete} className="submit-btn">
          {isComplete ? 'Voir mon parfum idéal' : 'Répondez à toutes les questions'}
        </button>
      </div>
    </div>
  );
};

export default Quiz;