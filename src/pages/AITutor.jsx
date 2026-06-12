import { useState } from 'react';
import { tutorTopics, tutorAnswers } from '../constants/mockData';

export default function AITutor() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState([]);

  const handleQuickQuestion = async (topicId) => {
    setLoading(true);
    // Simulate API call - in production, this would hit Claude API
    await new Promise((resolve) => setTimeout(resolve, 800));

    const topic = topicId;
    const response = tutorAnswers[topic]?.quick || "I'm not sure about that topic yet.";

    setConversation((prev) => [
      ...prev,
      {
        type: 'user',
        text: `Tell me about ${tutorTopics.find((t) => t.id === topic)?.label}`,
        timestamp: new Date().toLocaleTimeString(),
      },
      {
        type: 'assistant',
        text: response,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);

    setLoading(false);
  };

  const handleCustomQuestion = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    setConversation((prev) => [
      ...prev,
      {
        type: 'user',
        text: question,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);

    // Simulate API call - in production, this would hit Claude API
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const responseText = generateResponse(question);

    setConversation((prev) => [
      ...prev,
      {
        type: 'assistant',
        text: responseText,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);

    setQuestion('');
    setLoading(false);
  };

  const generateResponse = (q) => {
    const lowerQ = q.toLowerCase();

    // Check for keywords in known topics
    if (lowerQ.includes('nand')) {
      return tutorAnswers.nand.followUp;
    }
    if (lowerQ.includes('xor')) {
      return tutorAnswers.xor.followUp;
    }
    if (lowerQ.includes('adder')) {
      return tutorAnswers['full-adder'].followUp;
    }
    if (lowerQ.includes('segment') || lowerQ.includes('display')) {
      return tutorAnswers['7-segment'].followUp;
    }

    // Default response for other questions
    return "That's a great question! I recommend checking the Labs section for hands-on examples, or try one of the quick questions below to learn about specific topics.";
  };

  return (
    <div className="page tutor-page">
      <div className="tutor-header">
        <h1>🧠 ZARA - AI Tutor</h1>
        <p>Your intelligent guide to digital logic and circuit design</p>
      </div>

      <div className="tutor-container">
        <div className="quick-questions">
          <h3>Quick Topics</h3>
          <div className="topic-buttons">
            {tutorTopics.map((topic) => (
              <button
                key={topic.id}
                className="topic-btn"
                onClick={() => handleQuickQuestion(topic.id)}
                disabled={loading}
              >
                {topic.emoji} {topic.label}
              </button>
            ))}
          </div>
        </div>

        <div className="chat-section">
          <div className="chat-messages">
            {conversation.length === 0 && (
              <div className="empty-state">
                <p>👋 Hi! I'm ZARA, your AI tutor. Ask me about digital logic, gates, or anything else!</p>
                <p>Click the topics above or type your own question below.</p>
              </div>
            )}

            {conversation.map((msg, idx) => (
              <div key={idx} className={`message ${msg.type}`}>
                <div className="message-avatar">
                  {msg.type === 'user' ? '👤' : '🧠'}
                </div>
                <div className="message-content">
                  <p>{msg.text}</p>
                  <span className="message-time">{msg.timestamp}</span>
                </div>
              </div>
            ))}

            {loading && (
              <div className="message assistant">
                <div className="message-avatar">🧠</div>
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleCustomQuestion} className="question-form">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask me anything about digital logic..."
              disabled={loading}
            />
            <button type="submit" disabled={loading || !question.trim()}>
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
