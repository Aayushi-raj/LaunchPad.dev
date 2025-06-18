"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

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
    comments: 3
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

  const handleCreatePost = () => {
    // TODO: Implement post creation logic
    console.log('Creating new post:', newPost);
    setShowNewPostForm(false);
  };

  return (
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
          </CardFooter>
        </Card>
      )}

      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={post.author.avatar} alt={post.author.name} />
                  <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{post.title}</CardTitle>
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
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex gap-4">
                <Button variant="ghost" size="sm">
                  👍 {post.likes}
                </Button>
                <Button variant="ghost" size="sm">
                  💬 {post.comments}
                </Button>
              </div>
              <Button>Join Project</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
} 