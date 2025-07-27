
// client/src/components/builder/AIAssistant.js
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  CircularProgress,
  Chip,
} from '@mui/material';
import { Send, AutoAwesome } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { addComponent } from '../../redux/slices/builderSlice';

const AIAssistant = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'assistant',
      content: 'Hi! I can help you create content, suggest layouts, and generate components. What would you like to build?'
    }
  ]);

  const suggestedPrompts = [
    'Create a hero section for a tech startup',
    'Design a contact form',
    'Generate content for an about page',
    'Create a product showcase section',
  ];

  const handleSendMessage = async () => {
    if (!prompt.trim()) return;

    const userMessage = { type: 'user', content: prompt };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    try {
      // Simulate AI response
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const aiResponse = {
        type: 'assistant',
        content: `I understand you want to ${prompt}. Here are some suggestions:

1. For a hero section, I recommend using a large heading with your main value proposition
2. Add a compelling subheading that explains what you do
3. Include a call-to-action button
4. Consider adding a background image or gradient

Would you like me to create these components for you?`,
        suggestions: [
          { type: 'heading', props: { content: 'Welcome to Our Platform', level: 'h1' } },
          { type: 'text', props: { content: 'We help businesses grow with innovative solutions' } },
          { type: 'button', props: { text: 'Get Started', variant: 'contained' } },
        ]
      };

      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('AI request failed:', error);
              setMessages(prev => [...prev, {
        type: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.'
      }]);
    } finally {
      setLoading(false);
      setPrompt('');
    }
  };

  const handleAddSuggestion = (suggestion) => {
    dispatch(addComponent({
      type: suggestion.type,
      props: suggestion.props,
      position: { x: Math.random() * 200, y: Math.random() * 100 },
    }));
  };

  const handleSuggestedPrompt = (suggestedPrompt) => {
    setPrompt(suggestedPrompt);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={1}>
          <AutoAwesome color="primary" />
          AI Assistant
        </Box>
      </DialogTitle>
      
      <DialogContent>
        <Box sx={{ height: '400px', display: 'flex', flexDirection: 'column' }}>
          {/* Messages Area */}
          <Box sx={{ flexGrow: 1, overflow: 'auto', mb: 2 }}>
            {messages.map((message, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Paper
                  sx={{
                    p: 2,
                    backgroundColor: message.type === 'user' ? 'primary.light' : 'grey.100',
                    color: message.type === 'user' ? 'primary.contrastText' : 'text.primary',
                    ml: message.type === 'user' ? 2 : 0,
                    mr: message.type === 'user' ? 0 : 2,
                  }}
                >
                  <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                    {message.content}
                  </Typography>
                  
                  {message.suggestions && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="caption" gutterBottom>
                        Suggested components:
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
                        {message.suggestions.map((suggestion, i) => (
                          <Chip
                            key={i}
                            label={`Add ${suggestion.type}`}
                            onClick={() => handleAddSuggestion(suggestion)}
                            color="primary"
                            variant="outlined"
                            size="small"
                          />
                        ))}
                      </Box>
                    </Box>
                  )}
                </Paper>
              </Box>
            ))}
            
            {loading && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <CircularProgress size={24} />
              </Box>
            )}
          </Box>

          {/* Suggested Prompts */}
          {messages.length === 1 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="caption" gutterBottom>
                Try these suggestions:
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
                {suggestedPrompts.map((suggestedPrompt, index) => (
                  <Chip
                    key={index}
                    label={suggestedPrompt}
                    onClick={() => handleSuggestedPrompt(suggestedPrompt)}
                    variant="outlined"
                    size="small"
                  />
                ))}
              </Box>
            </Box>
          )}

          {/* Input Area */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              placeholder="Describe what you want to create..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              disabled={loading}
              size="small"
            />
            <Button
              variant="contained"
              onClick={handleSendMessage}
              disabled={loading || !prompt.trim()}
              startIcon={<Send />}
            >
              Send
            </Button>
          </Box>
        </Box>
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AIAssistant;
