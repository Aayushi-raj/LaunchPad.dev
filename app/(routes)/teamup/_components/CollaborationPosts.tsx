"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  title: string;
  description: string;
  tags: string[];
  createdAt: string;
  likes: number;
  comments: number;
  featured?: boolean;
}

const mockPosts: Post[] = [
  {
    id: '1',
    author: {
      name: 'John Doe',
      avatar: '/avatars/john.jpg'
    },
    title: 'Looking for React Developers for Open Source Project',
    description: 'Building a modern task management application using React, Node.js, and MongoDB. Looking for experienced developers to join the team.',
    tags: ['React', 'Node.js', 'MongoDB', 'Open Source'],
    createdAt: '2024-03-15',
    likes: 12,
    comments: 5
  },
  {
    id: '2',
    author: {
      name: 'Jane Smith',
      avatar: '/avatars/jane.jpg'
    },
    title: 'AI/ML Project Collaboration',
    description: 'Working on an AI-powered recommendation system. Need team members with experience in Python, TensorFlow, and data analysis.',
    tags: ['Python', 'AI/ML', 'TensorFlow', 'Data Science'],
    createdAt: '2024-03-14',
    likes: 8,
    comments: 3,
    featured: true
  },
  {
    id: '3',
    author: {
      name: 'Priya Singh',
      avatar: '/avatars/priya.jpg'
    },
    title: 'Fintech API Hackathon Team',
    description: 'Seeking backend and security experts for a fintech hackathon. Stack: Java, Spring, AWS.',
    tags: ['Java', 'Spring', 'AWS', 'Fintech'],
    createdAt: '2024-03-13',
    likes: 15,
    comments: 7
  },
  {
    id: '4',
    author: {
      name: 'Emily Park',
      avatar: '/avatars/emily.jpg'
    },
    title: 'UI/UX Designers for Startup',
    description: 'Join our early-stage startup as a designer. We value creativity and collaboration!',
    tags: ['UI/UX', 'Design', 'Startup'],
    createdAt: '2024-03-12',
    likes: 10,
    comments: 2,
    featured: true
  }
];

export default function CollaborationPosts() {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    description: '',
    tags: ''
  });
  const [showJoinDialog, setShowJoinDialog] = useState(false);
  const [commentingPostId, setCommentingPostId] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState('');
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  const handleCreatePost = () => {
    const post = {
      id: Date.now().toString(),
      author: {
        name: "You",
        avatar: "/avatars/you.jpg"
      },
      title: newPost.title,
      description: newPost.description,
      tags: newPost.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      createdAt: new Date().toISOString().slice(0, 10),
      likes: 0,
      comments: 0
    };
    setPosts([post, ...posts]);
    setShowNewPostForm(false);
    setNewPost({ title: '', description: '', tags: '' });
  };

  const handleLike = (postId: string) => {
    setPosts(posts => posts.map(post => post.id === postId ? { ...post, likes: post.likes + 1 } : post));
  };

  const handleCommentClick = (postId: string) => {
    setCommentingPostId(postId);
    setCommentInput('');
  };

  const handleCommentSubmit = (postId: string) => {
    setPosts(posts => posts.map(post => post.id === postId ? { ...post, comments: post.comments + 1 } : post));
    setCommentingPostId(null);
    setCommentInput('');
  };

  const handleJoinProject = () => {
    setShowJoinDialog(true);
  };

  const handleAskAi = async () => {
    setAiLoading(true);
    setAiSuggestion('');
    try {
      const prompt = `Suggest a catchy post title, description, and relevant tags for a tech collaboration post.\nCurrent title: ${newPost.title}\nCurrent description: ${newPost.description}\nCurrent tags: ${newPost.tags}`;
      const response = await fetch('/api/career-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: prompt })
      });
      const data = await response.json();
      setAiSuggestion(data.response || 'No suggestion received.');
    } catch (err) {
      setAiSuggestion('Error getting suggestion from AI.');
    } finally {
      setAiLoading(false);
    }
  };

  const handleAcceptSuggestion = () => {
    // Try to parse AI suggestion for title, description, tags
    // Expecting format: Title: ..., Description: ..., Tags: ...
    const titleMatch = aiSuggestion.match(/title[:\-\s]+(.+)/i);
    const descMatch = aiSuggestion.match(/description[:\-\s]+([\s\S]+?)(tags[:\-\s]+|$)/i);
    const tagsMatch = aiSuggestion.match(/tags[:\-\s]+(.+)/i);
    setNewPost({
      title: titleMatch ? titleMatch[1].trim() : newPost.title,
      description: descMatch ? descMatch[1].replace(/tags[:\-\s]+.*/i, '').trim() : newPost.description,
      tags: tagsMatch ? tagsMatch[1].trim() : newPost.tags
    });
    setAiSuggestion('');
  };

  return (
    <>
      <Dialog open={showJoinDialog} onOpenChange={setShowJoinDialog}>
        <DialogContent className="text-center">
          <DialogHeader>
            <DialogTitle>✅ Request Sent</DialogTitle>
          </DialogHeader>
          <div className="text-lg font-semibold mb-2">Your request has been sent to the author.<br/>Waiting for approval.</div>
          <Button onClick={() => setShowJoinDialog(false)} className="mt-2 w-full">Close</Button>
        </DialogContent>
      </Dialog>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Collaboration Posts</h2>
          <Button onClick={() => setShowNewPostForm(true)}>Create Post</Button>
        </div>

        {showNewPostForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Create New Post</CardTitle>
              <CardDescription>Share your project or collaboration opportunity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Post Title"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              />
              <Textarea
                placeholder="Describe your project or collaboration opportunity..."
                value={newPost.description}
                onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
              />
              <Input
                placeholder="Tags (comma-separated)"
                value={newPost.tags}
                onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
              />
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowNewPostForm(false)}>Cancel</Button>
              <Button onClick={handleCreatePost}>Create Post</Button>
              <Button onClick={handleAskAi} disabled={aiLoading} variant="secondary">Ask AI for Suggestions</Button>
            </CardFooter>
          </Card>
        )}

        {aiLoading && <div className="text-xs text-gray-500 mt-2">AI is thinking...</div>}
        {aiSuggestion && (
          <div className="bg-gray-50 border rounded p-3 mt-2 text-sm">
            <div className="mb-2 whitespace-pre-line">{aiSuggestion}</div>
            <Button size="sm" onClick={handleAcceptSuggestion}>Accept Suggestion</Button>
          </div>
        )}

        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id} className={`hover:shadow-2xl transition-shadow border-0 bg-gradient-to-br from-white via-blue-50 to-pink-50 ${post.featured ? 'ring-2 ring-pink-300' : ''}`}>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={post.author.avatar} alt={post.author.name} />
                    <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {post.title}
                      {post.featured && <span className="px-2 py-1 text-xs rounded-full bg-gradient-to-tr from-pink-400 to-blue-400 text-white font-bold shadow">Featured</span>}
                    </CardTitle>
                    <CardDescription>
                      Posted by {post.author.name} on {post.createdAt}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{post.description}</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} className="bg-gradient-to-tr from-blue-200 to-pink-200 text-blue-900 shadow" variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex gap-4">
                  <Button variant="ghost" size="sm" className="flex items-center gap-1" onClick={() => handleLike(post.id)}>
                    <span role="img" aria-label="like">👍</span> {post.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1" onClick={() => handleCommentClick(post.id)}>
                    <span role="img" aria-label="comment">💬</span> {post.comments}
                  </Button>
                </div>
                {commentingPostId === post.id && (
                  <div className="flex gap-2 mt-2 w-full">
                    <Input
                      className="flex-1"
                      placeholder="Write a comment..."
                      value={commentInput}
                      onChange={e => setCommentInput(e.target.value)}
                    />
                    <Button size="sm" onClick={() => handleCommentSubmit(post.id)} disabled={!commentInput.trim()}>
                      Post
                    </Button>
                  </div>
                )}
                <Button className="bg-gradient-to-tr from-blue-400 to-pink-400 text-white shadow" onClick={handleJoinProject}>Join Project</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}