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
    lastMessage: 'Let\'s schedule our next meeting'
  },
  {
    id: '2',
    name: 'AI/ML Study Group',
    participants: [
      { name: 'Alex Kumar', avatar: '/avatars/alex.jpg' },
      { name: 'Jane Smith', avatar: '/avatars/jane.jpg' },
      { name: 'You', avatar: '/avatars/you.jpg' }
    ],
    lastMessage: 'I\'ve shared the latest research paper'
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
                  className="w-full justify-start"
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
                      <div className="font-medium">{room.name}</div>
                      <div className="text-xs text-muted-foreground truncate">
                        {room.lastMessage}
                      </div>
                    </div>
                  </div>
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
              {messages.map((message) => (
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
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.sender.name === 'You'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    {message.sender.name !== 'You' && (
                      <div className="font-medium text-sm mb-1">{message.sender.name}</div>
                    )}
                    <div>{message.content}</div>
                    <div className="text-xs opacity-70 mt-1">{message.timestamp}</div>
                  </div>
                  {message.sender.name === 'You' && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={message.sender.avatar} alt={message.sender.name} />
                      <AvatarFallback>{message.sender.name[0]}</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
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