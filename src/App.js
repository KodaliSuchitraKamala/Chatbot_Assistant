import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  IconButton,
  Paper,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Grid,
  Card,
  CardContent
} from '@mui/material';
import {
  Send as SendIcon,
  Menu as MenuIcon,
  Add as AddIcon,
  Chat as ChatIcon,
  Flight as FlightIcon,
  Psychology as PsychologyIcon,
  Restaurant as RestaurantIcon,
  MoreVert as MoreVertIcon,
  Delete as DeleteIcon,
  DriveFileRenameOutline as RenameIcon,
  EditNote as EditNoteIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import ShareIcon from '@mui/icons-material/Share';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import QrCodeIcon from '@mui/icons-material/QrCode';
import Mail from '@mui/icons-material/Mail';
import Devices from '@mui/icons-material/Devices';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { styled } from '@mui/material/styles';

const MainContainer = styled(Box)(({ theme }) => ({
  height: '100vh',
  display: 'flex',
  backgroundColor: '#f8f9fa',
}));

const Sidebar = styled(Box)(({ theme }) => ({
  width: 260,
  backgroundColor: '#ffffff',
  paddingRight: theme.spacing(4),
  borderRight: '2px solid #e0e0e0',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  transition: 'width 0.3s ease',
  '&.closed': {
    width: 60,
    paddingRight: 0,
  },
}));

const SidebarContent = styled(Box)(({ theme }) => ({
  flex: 1,
  overflowY: 'auto',
  padding: theme.spacing(-20),
  paddingRight: theme.spacing(-40)
}));

const NewChatButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(2),
  backgroundColor: '#1976d2',
  color: '#ffffff',
  textTransform: 'none',
  fontWeight: 600,
  '&:hover': {
    backgroundColor: '#1565c0',
  },
}));

const ConversationSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '12px',
  fontWeight: 600,
  color: '#666',
  textTransform: 'uppercase',
  padding: theme.spacing(1, 2),
}));

const ConversationItem = styled(ListItemButton)(({ theme }) => ({
  borderRadius: 8,
  margin: '2px 8px',
  '&:hover': {
    backgroundColor: '#f5f5f5',
  },
}));

const ChatArea = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#ffffff',
}));

const Header = styled(Box)(({ theme }) => ({
  height: 60,
  borderBottom: '2px solid #e0e0e0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 20px',
}));

const HeaderTitle = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

const ChatContent = styled(Box)(({ theme }) => ({
  flex: 1,
  overflowY: 'auto',
  padding: theme.spacing(3),
}));

const WelcomeMessage = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(4),
}));

const SuggestionGrid = styled(Grid)(({ theme }) => ({
  maxWidth: 800,
  margin: '0 auto',
  textAlign: 'center',
}));

const SuggestionCard = styled(Card)(({ theme }) => ({
  cursor: 'pointer',
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[4],
  },
}));

const InputContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  borderTop: '2px  #e0e0e0',
  backgroundColor: '#ffffff',
}));

const InputWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-end',
  gap: theme.spacing(1),
  maxWidth: 800,
  margin: '0 auto',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  flex: 1,
  '& .MuiOutlinedInput-root': {
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
  },
}));

const SendButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: '#1976d2',
  color: '#ffffff',
  '&:hover': {
    backgroundColor: '#1565c0',
  },
  '&:disabled': {
    backgroundColor: '#ccc',
  },
}));

const IconContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(1),
}));

const MessageList = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  textAlign: 'justify',
}));

function App() {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [conversations, setConversations] = useState({
    TODAY: [],
    'PREVIOUS 7 DAYS': [],
    EARLIER: []
  });
  const [conversationMenuAnchor, setConversationMenuAnchor] = useState(null);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userConversations, setUserConversations] = useState({});
  const [qrCodeDialogOpen, setQrCodeDialogOpen] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(false);

  const suggestions = [
    {
      title: 'Help me write a professional email',
      icon: <ChatIcon sx={{ color: '#9c27b0', fontSize: 24 }} />,
      color: '#f3e5f5'
    },
    {
      title: 'Plan a 3-day trip to Tokyo',
      icon: <FlightIcon sx={{ color: '#2196f3', fontSize: 24 }} />,
      color: '#e3f2fd'
    },
    {
      title: 'Explain quantum computing simply',
      icon: <PsychologyIcon sx={{ color: '#e91e63', fontSize: 24 }} />,
      color: '#fce4ec'
    },
    {
      title: 'Suggest some healthy dinner ideas',
      icon: <RestaurantIcon sx={{ color: '#4caf50', fontSize: 24 }} />,
      color: '#e8f5e8'
    }
  ];

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  // Load user data and conversations on component mount
  useEffect(() => {
    console.log('🔄 Component mounted, checking for saved user');
    const savedUser = localStorage.getItem('currentUser');
    console.log('👤 Found saved user:', savedUser);
    
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      console.log('✅ Setting current user:', userData);
      setCurrentUser(userData);
      loadUserConversations(userData.email);
      
      // Reset to new chat state on mount/refresh
      setMessages([]);
      setCurrentChat(null);
    }
  }, []);

  const loadUserConversations = (userEmail) => {
    console.log('📂 Loading conversations for user:', userEmail);
    const savedConversations = localStorage.getItem(`conversations_${userEmail}`);
    console.log('📋 Found saved conversations:', savedConversations);
    
    if (savedConversations) {
      const convData = JSON.parse(savedConversations);
      console.log('📊 Parsed conversation data:', convData);
      setUserConversations(convData);
      
      // Categorize conversations by date
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      
      const todayConvs = [];
      const prev7DaysConvs = [];
      const earlierConvs = [];
      
      convData.all?.forEach(conv => {
        const convDate = new Date(conv.date);
        if (convDate >= today) {
          todayConvs.push(conv);
        } else if (convDate >= sevenDaysAgo) {
          prev7DaysConvs.push(conv);
        } else {
          earlierConvs.push(conv);
        }
      });
      
      console.log('📅 Categorized conversations:', {
        today: todayConvs,
        prev7Days: prev7DaysConvs,
        earlier: earlierConvs
      });
      
      setConversations({
        TODAY: todayConvs,
        'PREVIOUS 7 DAYS': prev7DaysConvs,
        EARLIER: earlierConvs
      });
    } else {
      console.log('❌ No saved conversations found for user:', userEmail);
    }
  };

  const saveUserConversations = (conversations) => {
    if (currentUser) {
      // Combine all conversations and save with dates
      const allConversations = [
        ...conversations.TODAY,
        ...conversations['PREVIOUS 7 DAYS'],
        ...conversations.EARLIER
      ];
      
      const convData = {
        all: allConversations,
        lastUpdated: new Date().toISOString()
      };
      
      console.log('💾 Saving conversations for user:', currentUser.email, convData);
      localStorage.setItem(`conversations_${currentUser.email}`, JSON.stringify(convData));
      setUserConversations(convData);
    }
  };

  const handleSignIn = (email, name) => {
    const userData = { email, name, signInTime: new Date().toISOString() };
    console.log('👤 User signing in:', userData);
    setCurrentUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
    loadUserConversations(email);
  };

  const handleSignOut = () => {
    handleProfileMenuClose();
    // Save current conversations before signing out
    saveUserConversations(conversations);
    
    // Clear current user
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    
    // Reset conversations to empty
    setConversations({
      TODAY: [],
      'PREVIOUS 7 DAYS': [],
      EARLIER: []
    });
    
    setUserConversations({});
    navigate('/login');
  };

  const handleSuggestionClick = (suggestion) => {
    setInputText(suggestion.title);
  };

  const handleDrawerToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleNewChat = () => {
    // Save current messages to conversation history before starting new chat
    if (messages.length > 0 && currentChat) {
      const updatedConversations = {
        ...conversations,
        [currentChat]: {
          ...conversations[currentChat],
          messages: messages
        }
      };
      saveUserConversations(updatedConversations);
    }
    
    setCurrentChat(null);
    setMessages([]);
  };

  const handleConversationClick = (conversation) => {
    console.log('🔄 Loading conversation:', conversation);
    
    // Save current messages before switching if there are any
    if (messages.length > 0 && currentChat && currentChat !== conversation.id) {
      const updatedConversations = { ...conversations };
      Object.keys(updatedConversations).forEach(section => {
        updatedConversations[section] = updatedConversations[section].map(conv => {
          if (conv.id === currentChat) {
            return {
              ...conv,
              messages: messages,
              preview: messages[messages.length - 1]?.text || conv.preview
            };
          }
          return conv;
        });
      });
      
      setConversations(updatedConversations);
      saveUserConversations(updatedConversations);
    }
    
    // Load conversation messages if they exist
    if (userConversations.all) {
      const fullConv = userConversations.all.find(conv => conv.id === conversation.id);
      console.log('📋 Found conversation:', fullConv);
      
      if (fullConv && fullConv.messages && fullConv.messages.length > 0) {
        console.log('✅ Loading existing messages:', fullConv.messages);
        setMessages(fullConv.messages);
        setCurrentChat(conversation.id);
      } else {
        console.log('🆕 Starting new chat with conversation:', conversation);
        // Start new chat with this conversation
        setMessages([]);
        setCurrentChat(conversation.id);
        setInputText(conversation.preview || '');
      }
    } else {
      console.log('❌ No conversations found for user');
      // Fallback: start new chat
      setMessages([]);
      setCurrentChat(conversation.id);
    }
  };

  const handleConversationMenuOpen = (event, conversation) => {
    event.stopPropagation();
    setConversationMenuAnchor(event.currentTarget);
    setSelectedConversation(conversation);
  };

  const handleConversationMenuClose = () => {
    setConversationMenuAnchor(null);
    setSelectedConversation(null);
  };

  const handleEditConversation = () => {
    console.log('Edit conversation:', selectedConversation);
    handleConversationMenuClose();
  };

  const handleDeleteConversation = () => {
    if (selectedConversation) {
      setConversations(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(section => {
          updated[section] = updated[section].filter(conv => conv.id !== selectedConversation.id);
        });
        return updated;
      });
    }
    handleConversationMenuClose();
  };

  const handleRenameConversation = () => {
    console.log('Rename conversation:', selectedConversation);
    handleConversationMenuClose();
  };

  const handlePinConversation = () => {
    console.log('Pin conversation:', selectedConversation);
    handleConversationMenuClose();
  };

  const handleCopyLink = () => {
    if (selectedConversation || messages.length > 0) {
      // Create a shareable link for the conversation
      const conversationText = messages
        .map(msg => `${msg.sender === 'user' ? 'You' : 'Assistant'}: ${msg.text}`)
        .join('\n\n');
      
      // Create a shareable link with conversation data
      const conversationData = {
        id: selectedConversation?.id || Date.now(),
        title: selectedConversation?.title || 'New Conversation',
        messages: messages,
        timestamp: new Date().toISOString()
      };
      
      // Create a shareable URL with encoded conversation data
      const shareableLink = `${window.location.origin}/shared/${btoa(JSON.stringify(conversationData))}`;
      
      // Copy the link to clipboard
      navigator.clipboard.writeText(shareableLink).then(() => {
        alert('Conversation link copied to clipboard!');
        setShareDialogOpen(false);
      }).catch(err => {
        console.error('Failed to copy conversation link:', err);
        // Fallback: copy conversation text
        navigator.clipboard.writeText(conversationText).then(() => {
          alert('Conversation text copied to clipboard!');
          setShareDialogOpen(false);
        });
      });
    }
  };

  const handleGenerateQR = () => {
    if (selectedConversation || messages.length > 0) {
      // Create conversation text
      const conversationText = messages
        .map(msg => `${msg.sender === 'user' ? 'You' : 'Assistant'}: ${msg.text}`)
        .join('\n\n');
      
      // Create a shareable link for QR code
      const conversationData = {
        id: selectedConversation?.id || Date.now(),
        title: selectedConversation?.title || 'New Conversation',
        messages: messages,
        timestamp: new Date().toISOString()
      };
      
      const shareableLink = `${window.location.origin}/shared/${btoa(JSON.stringify(conversationData))}`;
      
      // Create QR code using online service with the shareable link
      const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(shareableLink)}`;
      
      // Set QR code URL and open dialog in same page
      setQrCodeUrl(qrCodeUrl);
      setShareDialogOpen(false);
      setQrCodeDialogOpen(true);
    }
  };

  const handleShareWhatsApp = () => {
    if (selectedConversation || messages.length > 0) {
      // Create a shareable message with conversation content
      const conversationText = messages
        .map(msg => `${msg.sender === 'user' ? 'You' : 'Assistant'}: ${msg.text}`)
        .join('\n\n');
      
      // Create a shareable link
      const conversationData = {
        id: selectedConversation?.id || Date.now(),
        title: selectedConversation?.title || 'New Conversation',
        messages: messages,
        timestamp: new Date().toISOString()
      };
      
      const shareableLink = `${window.location.origin}/shared/${btoa(JSON.stringify(conversationData))}`;
      
      const message = `Check out this conversation: ${shareableLink}\n\n${conversationText.substring(0, 200)}${conversationText.length > 200 ? '...' : ''}`;
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
      
      // Create a temporary link element to handle WhatsApp redirect
      const link = document.createElement('a');
      link.href = whatsappUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      
      // Trigger click to open WhatsApp
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setShareDialogOpen(false);
    }
  };

  const handleShareEmail = () => {
    if (selectedConversation || messages.length > 0) {
      // Create a shareable message with conversation content
      const conversationText = messages
        .map(msg => `${msg.sender === 'user' ? 'You' : 'Assistant'}: ${msg.text}`)
        .join('\n\n');
      
      // Create a shareable link
      const conversationData = {
        id: selectedConversation?.id || Date.now(),
        title: selectedConversation?.title || 'New Conversation',
        messages: messages,
        timestamp: new Date().toISOString()
      };
      
      const shareableLink = `${window.location.origin}/shared/${btoa(JSON.stringify(conversationData))}`;
      
      const subject = encodeURIComponent(`Chat Conversation: ${selectedConversation?.title || 'New Conversation'}`);
      const body = encodeURIComponent(`I wanted to share this conversation with you:\n\nYou can view it here: ${shareableLink}\n\nConversation preview:\n${conversationText.substring(0, 500)}${conversationText.length > 500 ? '...' : ''}`);
      const mailtoUrl = `mailto:?subject=${subject}&body=${body}`;
      
      // Create a temporary link element to handle email redirect
      const link = document.createElement('a');
      link.href = mailtoUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      
      // Trigger click to open email client
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setShareDialogOpen(false);
    }
  };

  const handleSendToDevice = () => {
    if (selectedConversation) {
      // Create conversation text
      const conversationText = messages
        .map(msg => `${msg.sender}: ${msg.text}`)
        .join('\n');
      
      // Create a temporary textarea for device sharing
      const tempTextArea = document.createElement('textarea');
      tempTextArea.value = conversationText;
      tempTextArea.style.position = 'fixed';
      tempTextArea.style.left = '-9999px';
      tempTextArea.style.top = '-9999px';
      document.body.appendChild(tempTextArea);
      tempTextArea.select();
      document.execCommand('copy');
      
      // Remove the temporary element
      document.body.removeChild(tempTextArea);
      
      // Show success message
      alert('Conversation copied to clipboard! You can now paste this text on any device or app.');
      setShareDialogOpen(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    // Add conversation to history if it's the first message in this chat
    if (messages.length === 0) {
      const newConversation = {
        id: Date.now(),
        title: inputText.length > 25 ? inputText.substring(0, 25) + '...' : inputText,
        preview: inputText,
        date: new Date().toISOString(),
        userEmail: currentUser?.email || 'guest',
        messages: [userMessage] // Include the first message
      };

      const updatedConversations = {
        ...conversations,
        TODAY: [newConversation, ...conversations.TODAY]
      };
      
      setConversations(updatedConversations);
      setCurrentChat(newConversation.id);
      
      // Save to user's conversations
      saveUserConversations(updatedConversations);
    } else {
      // Update existing conversation with new message
      const updatedConversations = { ...conversations };
      Object.keys(updatedConversations).forEach(section => {
        updatedConversations[section] = updatedConversations[section].map(conv => {
          if (conv.id === currentChat) {
            return {
              ...conv,
              messages: [...(conv.messages || []), userMessage],
              preview: inputText.length > 25 ? inputText.substring(0, 25) + '...' : inputText
            };
          }
          return conv;
        });
      });
      
      setConversations(updatedConversations);
      saveUserConversations(updatedConversations);
    }

    // Call backend API
    try {
      console.log('🔍 Sending request to backend:', userMessage.text);
      
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.text,
          conversation_history: messages.map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'assistant',
            content: msg.text
          }))
        })
      });

      console.log('📡 Backend response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('📨 Backend response data:', data);
      
      const botResponse = {
        id: Date.now() + 1,
        text: data.response,
        sender: 'bot',
        timestamp: new Date()
      };
      
      console.log('✅ Adding bot response to chat:', botResponse);
      setMessages(prev => [...prev, botResponse]);
      
      // Update conversation with bot response
      if (currentChat) {
        const updatedConversations = { ...conversations };
        Object.keys(updatedConversations).forEach(section => {
          updatedConversations[section] = updatedConversations[section].map(conv => {
            if (conv.id === currentChat) {
              return {
                ...conv,
                messages: [...(conv.messages || []), botResponse]
              };
            }
            return conv;
          });
        });
        
        setConversations(updatedConversations);
        saveUserConversations(updatedConversations);
      }
      
    } catch (error) {
      console.error('❌ Error calling backend API:', error);
      
      // Fallback response if backend is not available
      const botResponse = {
        id: Date.now() + 1,
        text: `Backend connection error: ${error.message}. Please check if backend server is running on localhost:5000.`,
        sender: 'bot',
        timestamp: new Date()
      };
      
      console.log('🔄 Adding fallback response:', botResponse);
      setMessages(prev => [...prev, botResponse]);
      
      // Update conversation with bot response
      if (currentChat) {
        const updatedConversations = { ...conversations };
        Object.keys(updatedConversations).forEach(section => {
          updatedConversations[section] = updatedConversations[section].map(conv => {
            if (conv.id === currentChat) {
              return {
                ...conv,
                messages: [...(conv.messages || []), botResponse]
              };
            }
            return conv;
          });
        });
        
        setConversations(updatedConversations);
        saveUserConversations(updatedConversations);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTextIntoParagraphs = (text) => {
    // Split text by double newlines to identify paragraphs
    const paragraphs = text.split(/\n\s*\n/);
    
    return paragraphs.map(paragraph => {
      // Process each paragraph to handle bullet points, numbered lists, and line breaks
      const processedParagraph = paragraph
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .join('\n'); // Keep single newlines for bullet points and numbered lists
      
      return processedParagraph;
    }).filter(paragraph => paragraph.length > 0);
  };

  const formatTime = (date) => {
    if (!date) return '';
    const dateObj = date instanceof Date ? date : new Date(date);
    return dateObj.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <MainContainer>
      <Sidebar className={sidebarOpen ? '': 'closed'}>
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: sidebarOpen ? 'flex-start' : 'center', gap: 2 }}>
          <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
            <IconButton onClick={handleDrawerToggle} sx={{ color: '#666' }}>
              <MenuIcon />
            </IconButton>
            {sidebarOpen && (
              <IconButton onClick={() => setShowSearchBar(!showSearchBar)} sx={{ color: '#666' }}>
                <SearchIcon />
              </IconButton>
            )}
          </Box>
          {showSearchBar && sidebarOpen && (
            <TextField
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              fullWidth
              size="small"
              variant="outlined"
              sx={{ mt: 1 }}
            />
          )}
          {sidebarOpen ? (
            <NewChatButton startIcon={<AddIcon />} onClick={handleNewChat} fullWidth>
              New Chat
            </NewChatButton>
          ) : (
            <IconButton onClick={handleNewChat} sx={{ color: '#666' }}>
              <EditNoteIcon />
            </IconButton>
          )}
        </Box>
        <SidebarContent>
          {Object.entries(conversations).map(([section, items]) => {
            const filteredItems = searchQuery 
              ? items.filter(conv => 
                  conv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  (conv.messages && conv.messages.some(msg => 
                    msg.text.toLowerCase().includes(searchQuery.toLowerCase())
                  ))
                )
              : items;
            
            return filteredItems.length > 0 && (
              <ConversationSection key={section}>
                {sidebarOpen && <SectionTitle>{section}</SectionTitle>}
                <List dense>
                  {filteredItems.map((conversation) => (
                    <ConversationItem key={conversation.id} onClick={() => handleConversationClick(conversation)} sx={{ justifyContent: sidebarOpen ? 'flex-start' : 'center', px: sidebarOpen ? 2 : 1 }}>
                      {sidebarOpen && (
                        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, ml: 1 }}>
                          <ListItemText primary={conversation.title} primaryTypographyProps={{ fontSize: '12px', color: '#999' }} />
                          <IconButton size="small" onClick={(e) => handleConversationMenuOpen(e, conversation)} sx={{ opacity: 0.7, '&:hover': { opacity: 1 } }}>
                            <MoreVertIcon fontSize='small' />
                          </IconButton>
                        </Box>
                      )}
                    </ConversationItem>
                  ))}
                </List>
              </ConversationSection>
            );
          })}
        </SidebarContent>
      </Sidebar>

      <ChatArea>
        <Header>
          <HeaderTitle>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Chatbot Assistant
            </Typography>
          </HeaderTitle>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {messages.length > 0 && (
              <IconButton onClick={() => setShareDialogOpen(true)} sx={{ color: "#1976d2" }}>
                <ShareIcon />
              </IconButton>
            )}
            <IconButton onClick={handleProfileMenuOpen}>
              <Avatar sx={{ bgcolor: '#1976d2', width: 36, height: 36 }}>
                {currentUser ? (currentUser.name || currentUser.email).charAt(0).toUpperCase() : 'K'}
              </Avatar>
            </IconButton>
          </Box>
        </Header>

        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleProfileMenuClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right',}} transformOrigin={{ vertical: 'top', horizontal: 'right'}}>
          {currentUser ? (
            <>
              <MenuItem>
                <Typography variant='body2'>{currentUser.name || currentUser.email}</Typography>
              </MenuItem>
              <MenuItem>
                <Typography variant='body2' sx={{ fontSize: '12px', color: '#666' }}>{currentUser.email}</Typography>
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleSignOut}>
                <Typography variant='body2' color="error">Sign Out</Typography>
              </MenuItem>
            </>
          ) : (
            <MenuItem onClick={() => {
              handleProfileMenuClose();
              // Simple sign-in dialog
              const email = prompt('Enter your email:');
              const name = prompt('Enter your name:');
              if (email && name) {
                handleSignIn(email, name);
              }
            }}>
              <Typography variant='body2'>Sign In</Typography>
            </MenuItem>
          )}
        </Menu>

        <Menu anchorEl={conversationMenuAnchor} open = {Boolean(conversationMenuAnchor)} onClose={handleConversationMenuClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right',}} transformOrigin={{vertical: 'top', horizontal: 'right',}}>
          <MenuItem onClick={handleDeleteConversation}>
            <DeleteIcon sx={{ mr:1, fontSize:18}} />
            Delete
          </MenuItem>
          <MenuItem onClick={() => {
            console.log('Share conversation:', selectedConversation);
            handleConversationMenuClose();
            setShareDialogOpen(true);
          }}>
            <ShareIcon sx={{mr:1, fontSize:18}} />
            Share Conversation
          </MenuItem>
          <MenuItem onClick={handleRenameConversation}>
            <RenameIcon sx={{mr:1, fontSize:18}}/>
            Rename
          </MenuItem>
        </Menu>

        {/* Share Dialog */}
        <Dialog open = {shareDialogOpen} onClose={()=>setShareDialogOpen(false)} maxWidth='md' fullWidth PaperProps={{
          sx: {
            borderRadius: 3,
            bgcolor: 'background.paper'
          }
        }}>
          <DialogTitle sx = {{ pb:1 }}>
            <Typography variant='h6' sx={{ fontWeight:600 }}>
              Share Conversation
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Typography variant='body2' sx={{mb:3, color: 'text.secondary'}}>
              Choose how you'd like to share this conversation:
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Button fullWidth variant='outlined' startIcon={<ContentCopyIcon/>} onClick={()=> handleCopyLink()} sx={{height:60, textTransform:'none'}}>
                  Copy Link
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button fullWidth variant='outlined' startIcon={<QrCodeIcon/>} onClick={()=> handleGenerateQR()} sx={{height:60, textTransform:'none'}}>
                  QR code
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<i className="fa-brands fa-whatsapp" style={{ color: '#25D366', fontSize: 18 }} />}
                  onClick={() => handleShareWhatsApp()}
                  sx={{ height: 60, textTransform: 'none' }}
                >
                  WhatsApp
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Mail sx={{ color: '#1976d2', fontSize: 18 }} />}
                  onClick={() => handleShareEmail()}
                  sx={{ height: 60, textTransform: 'none' }}>Mail</Button>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>

        {/* QR Code Dialog */}
        <Dialog open={qrCodeDialogOpen} onClose={() => setQrCodeDialogOpen(false)} maxWidth='sm' fullWidth PaperProps={{
          sx: {
            borderRadius: 3,
            bgcolor: 'background.paper'
          }
        }}>
          <DialogTitle sx={{ pb: 1 }}>
            <Typography variant='h6' sx={{ fontWeight: 600 }}>
              QR Code
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 2 }}>
              <Typography variant='body2' sx={{ mb: 2, color: 'text.secondary', textAlign: 'center' }}>
                Scan this QR code to share the conversation
              </Typography>
              {qrCodeUrl && (
                <img 
                  src={qrCodeUrl} 
                  alt="QR Code" 
                  style={{ 
                    maxWidth: '100%', 
                    height: 'auto',
                    border: '2px solid #e0e0e0',
                    borderRadius: '8px'
                  }}
                />
              )}
              <Typography variant='caption' sx={{ mt: 2, color: 'text.secondary', textAlign: 'center' }}>
                The QR code contains a shareable link to this conversation
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setQrCodeDialogOpen(false)}>Close</Button>
          </DialogActions>
        </Dialog>

        <ChatContent>
          {messages.length === 0 ? (
          <>
            <WelcomeMessage>
              <Typography variant='h4' sx={{ fontWeight: 600, mb: 1 }}>
                Hello, how can I help you today?
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {formatTime(new Date())}
              </Typography>
            </WelcomeMessage>
            <SuggestionGrid container spacing={2}>
              {suggestions.map((suggestion, index)=>(
                <Grid item xs={12} sm={6} key={index}>
                  <SuggestionCard onClick={()=>handleSuggestionClick(suggestion)}>
                    <IconContainer>
                      {suggestion.icon}
                    </IconContainer>
                    <Typography variant='body2' sx={{mt:1}}>
                      {suggestion.title}
                    </Typography>
                  </SuggestionCard>
                </Grid>
              ))}
            </SuggestionGrid>
          </>
        ) : (
          <Box sx={{ flexGrow:1, overflow:'auto'}}>
            <MessageList>
              {messages.map((message)=> (
                <Box 
                 key={message.id} 
                 sx={{
                  display: 'flex',
                  justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                  mb: 2
                }}>
                  <Box 
                    sx={{maxWidth: '70%',
                      backgroundColor: message.sender === 'user' ? '#1976d2' : '#f5f5f5',
                      padding: 2,
                      borderRadius: 2,
                      color: message.sender === 'user' ? 'white' : 'black'
                    }}>
                    {message.sender === 'bot' ? (
                      formatTextIntoParagraphs(message.text).map((paragraph, index) => (
                        <Box key={index} sx={{ mb: 1 }}>
                          {paragraph.split('\n').map((line, lineIndex) => (
                            <Typography key={lineIndex} variant="body2" sx={{ 
                              mb: lineIndex < paragraph.split('\n').length - 1 ? 0.5 : 0,
                              pl: line.match(/^\d+\./) || line.match(/^[•*\-]/) ? 2 : 0 // Add padding for list items
                            }}>
                              {line}
                            </Typography>
                          ))}
                        </Box>
                      ))
                    ) : (
                      <Typography variant="body2">
                        {message.text}
                      </Typography>
                    )}
                    <Typography variant="caption" sx={{ mt: 1, display: 'block', opacity: 0.7 }}>
                      {formatTime(message.timestamp)}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </MessageList>
          </Box>
        )}
      </ChatContent>

      <InputContainer>
        <InputWrapper>
          <StyledTextField
            placeholder='Type a message...'
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            multiline
            maxRows={4}
            variant="outlined"
            helperText={`${inputText.length}/1000`}
            InputProps={{
              endAdornment: (
                <SendButton
                  onClick={handleSendMessage}
                  disabled={!inputText.trim()}
                >
                  <SendIcon />
                </SendButton>
              )
            }}
          />
        </InputWrapper>
      </InputContainer>
        </ChatArea>
      </MainContainer>
  );
} 

export default App
