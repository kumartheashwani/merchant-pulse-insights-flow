
import { useState } from 'react';
import { MessageCircle, Send, X, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const suggestedQuestions = [
  "How is my market share trending?",
  "Which products have the highest churn?",
  "Show me my top competitors",
  "What's my average transaction size?"
];

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your AI insights assistant. Ask me anything about your business metrics, competitors, or customer behavior. I can help you understand your data and suggest actionable improvements.",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = (text?: string) => {
    const messageText = text || inputText.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(messageText),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const getAIResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('market share')) {
      return "Your market share in the electronics category is 12.3% in your primary zip code, which is 2.1% higher than last quarter. You're currently ranked #3 among competitors. Would you like me to show you the geographic breakdown?";
    }
    if (lowerQuestion.includes('churn')) {
      return "Your top 3 products with highest churn are: iPhone cases (18% churn), Wireless earbuds (15% churn), and Phone chargers (12% churn). The main reasons are price competitiveness and faster shipping from competitors.";
    }
    if (lowerQuestion.includes('competitors')) {
      return "Your main competitors are TechHub (23% market share), ElectroMax (18% market share), and GadgetWorld (15% market share). TechHub is particularly strong in mobile accessories.";
    }
    if (lowerQuestion.includes('transaction size')) {
      return "Your average transaction size is $127, which is 8% higher than the category average of $117. Premium product sales are driving this difference. Your AOV has grown 15% quarter-over-quarter.";
    }
    
    return "I'd be happy to help you analyze that metric! Could you be more specific about what aspect you'd like to explore? I can provide insights on market share, customer behavior, product performance, or competitive analysis.";
  };

  return (
    <>
      {/* Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 transition-all duration-300",
          isOpen && "scale-0"
        )}
      >
        <MessageCircle size={24} />
      </Button>

      {/* Chat Window */}
      <div className={cn(
        "fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-xl shadow-2xl border border-slate-200 flex flex-col transition-all duration-300",
        isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
      )}>
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white p-4 rounded-t-xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap size={20} />
            <h3 className="font-semibold">AI Insights Assistant</h3>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="text-white hover:bg-white/20"
          >
            <X size={20} />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex",
                message.isUser ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[80%] p-3 rounded-lg text-sm",
                  message.isUser
                    ? "bg-gradient-to-r from-blue-600 to-emerald-600 text-white"
                    : "bg-slate-100 text-slate-800"
                )}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>

        {/* Suggested Questions */}
        <div className="p-4 border-t border-slate-200">
          <p className="text-xs text-slate-500 mb-2">Quick questions:</p>
          <div className="flex flex-wrap gap-1">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleSendMessage(question)}
                className="text-xs bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t border-slate-200">
          <div className="flex gap-2">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about your metrics..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={() => handleSendMessage()} size="icon">
              <Send size={16} />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
