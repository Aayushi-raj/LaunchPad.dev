import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TeamMatching from './_components/TeamMatching';
import CollaborationPosts from './_components/CollaborationPosts';
import TeamChat from './_components/TeamChat';

export default function TeamUpPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">TeamUp - Find Your Dev Team</h1>
      
      <Tabs defaultValue="matching" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
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
  );
} 