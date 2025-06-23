"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  sender: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
}

interface ChatRoom {
  id: string;
  name: string;
  participants: {
    name: string;
    avatar: string;
  }[];
  lastMessage?: string;
  online: boolean;
}

const mockChatRooms: ChatRoom[] = [
  {
    id: '1',
    name: 'React Project Team',
    participants: [
      { name: 'Sarah Chen', avatar: '/avatars/sarah.jpg' },
      { name: 'John Doe', avatar: '/avatars/john.jpg' },
      { name: 'You', avatar: '/avatars/you.jpg' }
    ],
    lastMessage: 'Let\'s schedule our next meeting',
    online: true
  },
  {
    id: '2',
    name: 'AI/ML Study Group',
    participants: [
      { name: 'Alex Kumar', avatar: '/avatars/alex.jpg' },
      { name: 'Jane Smith', avatar: '/avatars/jane.jpg' },
      { name: 'You', avatar: '/avatars/you.jpg' }
    ],
    lastMessage: 'I\'ve shared the latest research paper',
    online: false
  },
  {
    id: '3',
    name: 'Startup Founders',
    participants: [
      { name: 'Emily Park', avatar: '/avatars/emily.jpg' },
      { name: 'Priya Singh', avatar: '/avatars/priya.jpg' },
      { name: 'You', avatar: '/avatars/you.jpg' }
    ],
    lastMessage: 'Pitch deck is ready!',
    online: true
  }
];

const mockMessages: Message[] = [
  {
    id: '1',
    sender: {
      name: 'Sarah Chen',
      avatar: '/avatars/sarah.jpg'
    },
    content: 'Hey team! How\'s the progress on the React components?',
    timestamp: '10:30 AM'
  },
  {
    id: '2',
    sender: {
      name: 'You',
      avatar: '/avatars/you.jpg'
    },
    content: 'I\'ve completed the authentication flow. Need to work on the dashboard next.',
    timestamp: '10:32 AM'
  },
  {
    id: '3',
    sender: {
      name: 'John Doe',
      avatar: '/avatars/john.jpg'
    },
    content: 'Great! I\'ll review your PR later today.',
    timestamp: '10:35 AM'
  },
  {
    id: '4',
    sender: {
      name: 'Sarah Chen',
      avatar: '/avatars/sarah.jpg'
    },
    content: 'Thanks! Also, let\'s discuss the new UI design.',
    timestamp: '10:36 AM'
  },
  {
    id: '5',
    sender: {
      name: 'You',
      avatar: '/avatars/you.jpg'
    },
    content: 'Sure, I have some ideas to share.',
    timestamp: '10:37 AM'
  }
];

export default function TeamChat() {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>(mockChatRooms);
  const [selectedRoom, setSelectedRoom] = useState<string>('1');
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: {
        name: 'You',
        avatar: '/avatars/you.jpg'
      },
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <div className="grid grid-cols-12 gap-4 h-[600px]">
      {/* Chat Rooms List */}
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Chat Rooms</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px]">
            <div className="space-y-2">
              {chatRooms.map((room) => (
                <Button
                  key={room.id}
                  variant={selectedRoom === room.id ? 'secondary' : 'ghost'}
                  className="w-full justify-start relative group"
                  onClick={() => setSelectedRoom(room.id)}
                >
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {room.participants.slice(0, 3).map((participant, index) => (
                        <Avatar key={index} className="h-6 w-6 border-2 border-background">
                          <AvatarImage src={participant.avatar} alt={participant.name} />
                          <AvatarFallback>{participant.name[0]}</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    <div className="text-left">
                      <div className="font-medium flex items-center gap-2">
                        {room.name}
                        {room.online && <span className="ml-1 h-2 w-2 rounded-full bg-green-400 animate-pulse" title="Online" />}
                      </div>
                      <div className="text-xs text-muted-foreground truncate">
                        {room.lastMessage}
                      </div>
                    </div>
                  </div>
                  {room.online && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-green-500 font-semibold">Online</span>}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Chat Messages */}
      <Card className="col-span-9">
        <CardHeader>
          <CardTitle>
            {chatRooms.find(room => room.id === selectedRoom)?.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col h-[500px]">
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-4">
              {messages.map((message, idx) => (
                <div
                  key={message.id}
                  className={`flex gap-2 ${
                    message.sender.name === 'You' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.sender.name !== 'You' && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={message.sender.avatar} alt={message.sender.name} />
                      <AvatarFallback>{message.sender.name[0]}</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-[70%] rounded-2xl p-4 shadow-lg ${
                      message.sender.name === 'You'
                        ? 'bg-gradient-to-tr from-blue-400 to-pink-400 text-white'
                        : 'bg-white border border-gray-200'
                    } animate-fadeIn`}
                  >
                    {message.sender.name !== 'You' && (
                      <div className="font-medium text-sm mb-1 text-blue-700">{message.sender.name}</div>
                    )}
                    <div>{message.content}</div>
                    <div className="text-xs opacity-70 mt-1 text-right">{message.timestamp}</div>
                  </div>
                  {message.sender.name === 'You' && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={message.sender.avatar} alt={message.sender.name} />
                      <AvatarFallback>{message.sender.name[0]}</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {/* Typing indicator */}
              <div className="flex gap-2 justify-start items-center animate-pulse">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/sarah.jpg" alt="Sarah Chen" />
                  <AvatarFallback>S</AvatarFallback>
                </Avatar>
                <div className="bg-gray-200 rounded-2xl px-4 py-2 text-sm text-gray-600">Sarah is typing...</div>
              </div>
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          <div className="flex gap-2 mt-4">
            <Input
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button onClick={handleSendMessage}>Send</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}