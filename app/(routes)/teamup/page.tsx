import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TeamMatching from './_components/TeamMatching';
import CollaborationPosts from './_components/CollaborationPosts';
import TeamChat from './_components/TeamChat';
import { Sparkles } from 'lucide-react';

export default function TeamUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-100 py-10 animate-fadeIn">
      <div className="container mx-auto max-w-5xl p-6 rounded-3xl shadow-2xl bg-white/80 backdrop-blur-md">
        <div className="flex flex-col items-center mb-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="inline-flex items-center justify-center rounded-full bg-gradient-to-tr from-blue-400 to-pink-400 p-3 shadow-lg">
              <Sparkles className="h-8 w-8 text-white" />
            </span>
            <h1 className="text-4xl font-extrabold bg-gradient-to-tr from-blue-600 to-pink-500 text-transparent bg-clip-text">TeamUp - Find Your Dev Team</h1>
          </div>
          <p className="text-lg text-gray-600 font-medium">Collaborate, connect, and build amazing projects with like-minded developers.</p>
        </div>
        <Tabs defaultValue="matching" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-gradient-to-tr from-blue-100 to-pink-100 rounded-xl shadow">
            <TabsTrigger value="matching">Find Team</TabsTrigger>
            <TabsTrigger value="collaboration">Collaboration Posts</TabsTrigger>
            <TabsTrigger value="chat">Team Chat</TabsTrigger>
          </TabsList>
          <TabsContent value="matching">
            <TeamMatching />
          </TabsContent>
          <TabsContent value="collaboration">
            <CollaborationPosts />
          </TabsContent>
          <TabsContent value="chat">
            <TeamChat />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}