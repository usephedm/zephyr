import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from '../hooks/useTranslations';

interface Message {
  text: string;
  sender: 'user' | 'ai';
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const t = useTranslations();
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ text: t('chatWelcome'), sender: 'ai' }]);
    }
  }, [isOpen, messages.length, t]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    const userMessage: Message = { text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = { text: "Thank you for your message. A specialist will review it and contact you shortly. How else can I assist you with our AI solutions?", sender: 'ai' };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      <motion.button
        className="fixed bottom-6 right-6 bg-gradient-to-r from-primary to-secondary text-white w-16 h-16 rounded-full shadow-lg shadow-secondary/40 flex items-center justify-center z-50"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.5 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            className="fixed bottom-24 right-6 w-80 h-[28rem] bg-background/80 backdrop-blur-xl border border-border/30 rounded-lg shadow-2xl flex flex-col z-50 overflow-hidden"
          >
            <div className="p-4 bg-gradient-to-r from-primary/50 to-secondary/50 border-b border-border/30">
              <h3 className="font-bold text-center text-white">{t('chatTitle')}</h3>
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg ${msg.sender === 'user' ? 'bg-primary text-white rounded-br-none' : 'bg-gray-700 text-white rounded-bl-none'}`}>
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                    <div className="bg-gray-700 p-3 rounded-lg rounded-bl-none flex items-center space-x-1">
                        <motion.div animate={{ scale: [1, 1.2, 1], y: [0, -3, 0] }} transition={{ duration: 0.8, repeat: Infinity }} className="w-2 h-2 bg-gray-400 rounded-full" />
                        <motion.div animate={{ scale: [1, 1.2, 1], y: [0, -3, 0] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }} className="w-2 h-2 bg-gray-400 rounded-full" />
                        <motion.div animate={{ scale: [1, 1.2, 1], y: [0, -3, 0] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }} className="w-2 h-2 bg-gray-400 rounded-full" />
                    </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSendMessage} className="p-4 border-t border-border/30">
              <div className="flex items-center bg-gray-800 rounded-full">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={t('chatPlaceholder')}
                  className="w-full bg-transparent px-4 py-2 text-white placeholder-gray-400 focus:outline-none"
                />
                <button type="submit" className="text-secondary p-2 rounded-full hover:bg-gray-700 m-1">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd"></path></svg>
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
