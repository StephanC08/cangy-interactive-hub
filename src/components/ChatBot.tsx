
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Minimize2, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

const initialMessages: Message[] = [
  {
    id: 1,
    text: "Bonjour ! Je suis l'assistant virtuel de Stephan CANGY. Comment puis-je vous aider aujourd'hui ?",
    sender: 'bot',
    timestamp: new Date(),
  },
];

const predefinedResponses: Record<string, string> = {
  'développement web': "Le développement web fait partie de mes services clés. Je crée des sites professionnels, e-commerce et applications sur mesure. Souhaitez-vous plus d'informations sur mes offres de développement web ?",
  'site web': "Je peux concevoir et développer différents types de sites web selon vos besoins. Que ce soit un site vitrine, e-commerce ou application web personnalisée. Quel type de projet avez-vous en tête ?",
  'coaching': "Mon service de coaching personnalisé est conçu pour vous aider à atteindre vos objectifs professionnels et personnels. Voulez-vous en savoir plus sur mon approche ou prendre rendez-vous pour une première session ?",
  'immobilier': "Je propose des services de conseil immobilier à Thonon-les-Bains et dans la région (50km autour). Êtes-vous intéressé par une vente, un achat ou un investissement immobilier ?",
  'prix': "Mes tarifs varient selon vos besoins spécifiques. Je propose des devis personnalisés après un premier échange pour comprendre votre projet. Souhaitez-vous prendre rendez-vous pour discuter de votre projet ?",
  'rendez-vous': "Vous pouvez prendre rendez-vous directement depuis la section 'Prendre rendez-vous' sur ce site. Préférez-vous un rendez-vous en personne, par téléphone ou en visioconférence ?",
  'contact': "Vous pouvez me contacter par email à contact@stephancangy.com ou par téléphone au +33 6 XX XX XX XX. Vous pouvez également utiliser le formulaire de contact disponible sur ce site.",
  'merci': "Je vous en prie ! N'hésitez pas si vous avez d'autres questions. Je serai ravi de pouvoir vous aider.",
};

const fallbackResponses = [
  "Je ne suis pas sûr de comprendre votre demande. Pouvez-vous préciser votre question ?",
  "Pour mieux vous aider, pourriez-vous reformuler votre question ?",
  "Je vous propose de me poser des questions sur les services de Stephan CANGY : développement web, coaching ou immobilier.",
  "Puis-je vous aider sur un autre sujet ? Par exemple, prendre rendez-vous ou obtenir des informations sur les tarifs ?",
];

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (isMinimized) setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const getFallbackResponse = () => {
    const randomIndex = Math.floor(Math.random() * fallbackResponses.length);
    return fallbackResponses[randomIndex];
  };

  const getBotResponse = (userMessage: string) => {
    const lowerCaseMessage = userMessage.toLowerCase();
    
    for (const [keyword, response] of Object.entries(predefinedResponses)) {
      if (lowerCaseMessage.includes(keyword)) {
        return response;
      }
    }
    
    return getFallbackResponse();
  };

  const sendMessage = () => {
    if (!inputText.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages([...messages, userMessage]);
    setInputText('');
    
    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: getBotResponse(inputText),
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prevMessages => [...prevMessages, botResponse]);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 bg-gold hover:bg-gold-dark text-noir rounded-full p-4 shadow-lg z-40 transition-all duration-300 ${
          isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        <MessageSquare size={24} />
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 bg-noir-light border border-gold/20 rounded-lg shadow-2xl z-40 transition-all duration-300 w-80 md:w-96 ${
          isOpen 
            ? 'scale-100 opacity-100' 
            : 'scale-0 opacity-0 pointer-events-none'
        } ${
          isMinimized 
            ? 'h-16' 
            : 'max-h-[32rem]'
        }`}
      >
        {/* Chat Header */}
        <div className="flex items-center justify-between p-4 border-b border-gold/10">
          <div className="flex items-center space-x-3">
            <MessageSquare className="text-gold" size={20} />
            <h3 className="font-medium text-white">
              Assistant virtuel
            </h3>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleMinimize}
              className="text-gray-400 hover:text-white transition-colors"
            >
              {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
            </button>
            <button
              onClick={toggleChat}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        {!isMinimized && (
          <>
            <div className="p-4 overflow-y-auto h-80">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 flex ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-gold/20 text-white'
                        : 'bg-noir-dark text-white'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-gold/10">
              <div className="flex space-x-2">
                <Input
                  value={inputText}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Votre message..."
                  className="flex-1 bg-noir border-gold/20 text-white"
                />
                <Button 
                  onClick={sendMessage} 
                  size="icon" 
                  className="bg-gold hover:bg-gold-dark text-noir"
                >
                  <Send size={18} />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ChatBot;
