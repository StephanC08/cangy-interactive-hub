
import { Message, PredefinedResponses } from './types';

export const initialMessages: Message[] = [
  {
    id: 1,
    text: "Bonjour ! Je suis l'assistant virtuel de Stephan CANGY. Comment puis-je vous aider aujourd'hui ?",
    sender: 'bot',
    timestamp: new Date(),
  },
];

export const predefinedResponses: PredefinedResponses = {
  'développement web': "Le développement web fait partie de mes services clés. Je crée des sites professionnels, e-commerce et applications sur mesure. Souhaitez-vous plus d'informations sur mes offres de développement web ?",
  'site web': "Je peux concevoir et développer différents types de sites web selon vos besoins. Que ce soit un site vitrine, e-commerce ou application web personnalisée. Quel type de projet avez-vous en tête ?",
  'coaching': "Mon service de coaching personnalisé est conçu pour vous aider à atteindre vos objectifs professionnels et personnels. Voulez-vous en savoir plus sur mon approche ou prendre rendez-vous pour une première session ?",
  'immobilier': "Je propose des services de conseil immobilier à Thonon-les-Bains et dans la région (50km autour). Vous pouvez consulter ma page dédiée à l'immobilier pour découvrir le simulateur et les biens disponibles. Souhaitez-vous y accéder ?",
  'prix': "Mes tarifs varient selon vos besoins spécifiques. Je propose des devis personnalisés après un premier échange pour comprendre votre projet. Souhaitez-vous prendre rendez-vous pour discuter de votre projet ?",
  'rendez-vous': "Vous pouvez prendre rendez-vous directement depuis la section 'Prendre rendez-vous' sur ce site. Préférez-vous un rendez-vous en personne, par téléphone ou en visioconférence ?",
  'contact': "Vous pouvez me contacter par email à contact@stephancangy.com ou par téléphone au +33 6 XX XX XX XX. Vous pouvez également utiliser le formulaire de contact disponible sur ce site.",
  'merci': "Je vous en prie ! N'hésitez pas si vous avez d'autres questions. Je serai ravi de pouvoir vous aider.",
  'thonon': "Thonon-les-Bains est une ville très attractive du bord du lac Léman. Le marché immobilier y est dynamique avec des biens de qualité. Souhaitez-vous des informations sur les opportunités immobilières dans cette zone ?",
  'simulateur': "Vous pouvez utiliser notre simulateur immobilier pour estimer le coût de votre projet. Il est disponible sur la page Immobilier. Souhaitez-vous y accéder maintenant ?",
};

export const fallbackResponses = [
  "Je ne suis pas sûr de comprendre votre demande. Pouvez-vous préciser votre question ?",
  "Pour mieux vous aider, pourriez-vous reformuler votre question ?",
  "Je vous propose de me poser des questions sur les services de Stephan CANGY : développement web, coaching ou immobilier.",
  "Puis-je vous aider sur un autre sujet ? Par exemple, prendre rendez-vous ou obtenir des informations sur les tarifs ?",
];

export const suggestedQuestions = [
  "Quels sont vos services de développement web ?",
  "Comment fonctionne votre coaching ?",
  "Quelles sont les opportunités immobilières à Thonon ?",
  "Comment prendre rendez-vous avec vous ?",
];

export const getFallbackResponse = (): string => {
  const randomIndex = Math.floor(Math.random() * fallbackResponses.length);
  return fallbackResponses[randomIndex];
};

export const getBotResponse = (userMessage: string): { response: string, redirect?: boolean } => {
  const lowerCaseMessage = userMessage.toLowerCase();
  
  // Check for page navigation intentions
  if (lowerCaseMessage.includes('immobilier') && 
      (lowerCaseMessage.includes('page') || lowerCaseMessage.includes('voir'))) {
    return {
      response: "Je vous redirige vers la page immobilier...",
      redirect: true
    };
  }
  
  // Check for simulator mentions
  if (lowerCaseMessage.includes('simulateur') && lowerCaseMessage.includes('immobilier')) {
    return {
      response: "Le simulateur immobilier est disponible sur la page immobilier. Je vous y redirige...",
      redirect: true
    };
  }
  
  // Check predefined responses
  for (const [keyword, response] of Object.entries(predefinedResponses)) {
    if (lowerCaseMessage.includes(keyword)) {
      return { response };
    }
  }
  
  return { response: getFallbackResponse() };
};
