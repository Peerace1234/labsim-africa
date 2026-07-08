import { useState } from 'react';
import { tutorTopics, tutorAnswers } from '../constants/mockData';

const starterPrompts = [
  'Show me a beginner Python script using ChatGPT',
  'How do I write better prompts?',
  'How do I connect an AI model to my app?',
];

const COURSE_SYSTEM_PROMPT = `You are a calm and practical course tutor for a Python and AI learning program. Answer questions only about the course topics: Python, ChatGPT, prompt engineering, API integration, and mini projects. Keep responses clear, concise, and useful. Avoid emojis. When relevant, include short steps and practical examples.`;

function buildPrompt(topicLabel, question) {
  return `You are teaching this course. Topic: ${topicLabel}. User question: ${question}`;
}

async function requestTutorReply(prompt) {
  // Send prompt to backend AI proxy to keep API key secure
  const base = import.meta.env.VITE_API_BASE || '';
  const res = await fetch(base + '/api/ai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt: `${COURSE_SYSTEM_PROMPT}\n\n${prompt}` }),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error('AI service error: ' + txt);
  }

  const data = await res.json();
  return (data.text || '').trim();
}

export default function AITutor() {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState([
    {
      type: 'assistant',
      title: 'Course tutor',
      text: 'I can guide you through Python, prompt design, and AI integrations with practical examples, clear explanations, and course-focused resources.',
      resources: [
        {
          label: 'FreeCodeCamp Python curriculum',
          url: 'https://www.freecodecamp.org/learn/scientific-computing-with-python/',
        },
        {
          label: 'OpenAI quickstart',
          url: 'https://platform.openai.com/docs/quickstart',
        },
      ],
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);

  const handleQuickQuestion = async (topicId) => {
    setLoading(true);
    const topic = tutorAnswers[topicId];
    const label = tutorTopics.find((entry) => entry.id === topicId)?.label || 'this topic';

    setConversation((prev) => [
      ...prev,
      {
        type: 'user',
        text: `Teach me about ${label}`,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);

    try {
      const reply = await requestTutorReply(buildPrompt(label, `Teach me about ${label} as part of this course.`));
      const responseText = reply || topic?.body || 'The course content for this topic will appear here once the API is available.';

      setConversation((prev) => [
        ...prev,
        {
          type: 'assistant',
          title: topic?.title || label,
          text: responseText,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    } catch (error) {
      setConversation((prev) => [
        ...prev,
        {
          type: 'assistant',
          title: topic?.title || label,
          text: error.message || 'The tutor is unavailable right now.',
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
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

    try {
      const reply = await requestTutorReply(buildPrompt('course lesson', question));
      const responseText = reply || generateFallbackResponse(question);

      setConversation((prev) => [
        ...prev,
        {
          type: 'assistant',
          title: 'Course guidance',
          text: responseText,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    } catch (error) {
      setConversation((prev) => [
        ...prev,
        {
          type: 'assistant',
          title: 'Course guidance',
          text: error.message || 'The tutor is unavailable right now.',
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    } finally {
      setQuestion('');
      setLoading(false);
    }
  };

  const generateFallbackResponse = (q) => {
    const lowerQ = q.toLowerCase();

    for (const [key, answer] of Object.entries(tutorAnswers)) {
      if (answer.keywords.some((keyword) => lowerQ.includes(keyword))) {
        return `${answer.title}\n\n${answer.body}`;
      }
    }

    return 'That is a great question. Start with the Python and ChatGPT lesson, then move into prompt engineering and API integration so you can build a complete project.';
  };

  return (
    <div className="page tutor-page">
      <div className="tutor-header">
        <h1>AI Tutor</h1>
        <p>Learn Python, prompt design, and AI integrations with practical course-focused guidance.</p>
      </div>

      <div className="tutor-shell">
        <aside className="course-sidebar">
          <div className="sidebar-card">
            <h3>Learning path</h3>
            <p>Follow a structured route from beginner setup to real projects.</p>
            <div className="lesson-list">
              {tutorTopics.map((topic) => (
                <button
                  key={topic.id}
                  className="mini-lesson"
                  onClick={() => handleQuickQuestion(topic.id)}
                  disabled={loading}
                >
                  <span>
                    <strong>{topic.label}</strong>
                    <small>{topic.tag}</small>
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="sidebar-card">
            <h3>Starter prompts</h3>
            <div className="starter-prompts">
              {starterPrompts.map((prompt) => (
                <button
                  key={prompt}
                  className="starter-chip"
                  onClick={() => {
                    setQuestion(prompt);
                  }}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <section className="chat-section">
          <div className="chat-messages">
            {conversation.map((msg, idx) => (
              <div key={idx} className={`message ${msg.type}`}>
                <div className="message-avatar">{msg.type === 'user' ? 'You' : 'Tutor'}</div>
                <div className="message-content">
                  {msg.title && <h4>{msg.title}</h4>}
                  {Array.isArray(msg.text) ? msg.text.map((line, lineIndex) => <p key={lineIndex}>{line}</p>) : <p>{msg.text}</p>}

                  {msg.steps?.length > 0 && (
                    <div className="message-block">
                      <h5>What you’ll do</h5>
                      <ul>
                        {msg.steps.map((step) => (
                          <li key={step}>{step}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {msg.example && (
                    <div className="message-block">
                      <h5>Example</h5>
                      <pre>{msg.example}</pre>
                    </div>
                  )}

                  {msg.resources?.length > 0 && (
                    <div className="message-block">
                      <h5>Resources</h5>
                      <ul>
                        {msg.resources.map((resource) => (
                          <li key={resource.label}>
                            <a href={resource.url} target="_blank" rel="noreferrer">
                              {resource.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {msg.nextSteps?.length > 0 && (
                    <div className="message-block">
                      <h5>Next step</h5>
                      <ul>
                        {msg.nextSteps.map((step) => (
                          <li key={step}>{step}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <span className="message-time">{msg.timestamp}</span>
                </div>
              </div>
            ))}

            {loading && (
              <div className="message assistant">
                <div className="message-avatar">Tutor</div>
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
              placeholder="Ask for a lesson, code example, or project idea..."
              disabled={loading}
            />
            <button type="submit" disabled={loading || !question.trim()}>
              Send
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
