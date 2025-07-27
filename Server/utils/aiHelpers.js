// server/utils/aiHelpers.js
const axios = require('axios');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_BASE_URL = 'https://api.openai.com/v1';

async function generateContent(prompt, type = 'text', context = {}) {
  try {
    const systemPrompt = getSystemPrompt(type, context);
    
    const response = await axios.post(`${OPENAI_BASE_URL}/chat/completions`, {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ],
      max_tokens: 500,
      temperature: 0.7
    }, {
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('AI API Error:', error.response?.data || error.message);
    return getFallbackContent(type, prompt);
  }
}

async function generateLayout(description, components = []) {
  const prompt = `Create a website layout based on: ${description}. 
    Available components: ${components.join(', ')}.
    Return a JSON structure with component arrangement.`;
    
  try {
    const response = await generateContent(prompt, 'layout');
    return JSON.parse(response);
  } catch (error) {
    return getDefaultLayout();
  }
}

async function optimizeContent(content, goals = []) {
  const prompt = `Optimize this content for: ${goals.join(', ')}.
    Content: ${content}
    Return improved version focusing on the specified goals.`;
    
  try {
    return await generateContent(prompt, 'optimization');
  } catch (error) {
    return content; // Return original if optimization fails
  }
}

function getSystemPrompt(type, context) {
  const prompts = {
    text: 'You are a professional copywriter. Create engaging, clear, and concise content.',
    heading: 'Create compelling headlines that grab attention and clearly communicate the main message.',
    paragraph: 'Write informative and engaging paragraphs with good flow and readability.',
    layout: 'You are a web designer. Create logical, user-friendly layout structures in JSON format.',
    optimization: 'You are a content optimization expert. Improve content for better engagement and conversion.'
  };
  
  return prompts[type] || prompts.text;
}

function getFallbackContent(type, prompt) {
  const fallbacks = {
    text: 'This is sample content generated for your website. Please customize it according to your needs.',
    heading: 'Your Compelling Headline Here',
    paragraph: 'This is a sample paragraph that you can customize with your own content. Replace this text with information relevant to your website and audience.',
    layout: '{"sections": [{"type": "header"}, {"type": "content"}, {"type": "footer"}]}',
    optimization: 'Content optimized for better engagement and user experience.'
  };
  
  return fallbacks[type] || fallbacks.text;
}

function getDefaultLayout() {
  return {
    sections: [
      { type: 'header', components: ['navigation', 'logo'] },
      { type: 'hero', components: ['heading', 'subheading', 'cta-button'] },
      { type: 'content', components: ['text-block', 'image'] },
      { type: 'footer', components: ['links', 'contact-info'] }
    ]
  };
}

module.exports = {
  generateContent,
  generateLayout,
  optimizeContent
};
