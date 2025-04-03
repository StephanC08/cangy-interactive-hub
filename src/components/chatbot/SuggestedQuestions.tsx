
import React from 'react';

interface SuggestedQuestionsProps {
  questions: string[];
  onQuestionClick: (question: string) => void;
}

const SuggestedQuestions: React.FC<SuggestedQuestionsProps> = ({
  questions,
  onQuestionClick,
}) => {
  return (
    <div className="mt-4">
      <p className="text-xs text-gray-400 mb-2">Questions suggérées :</p>
      <div className="flex flex-col space-y-2">
        {questions.map((question, index) => (
          <button
            key={index}
            className="text-xs text-left px-3 py-2 bg-mauve/10 hover:bg-mauve/20 rounded-md text-white transition-colors"
            onClick={() => onQuestionClick(question)}
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedQuestions;
