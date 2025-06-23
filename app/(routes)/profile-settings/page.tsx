"use client";
import { UserCircle, Mail, Save, Edit2, Linkedin } from "lucide-react";
import { useState } from "react";

export default function ProfileSettingsPage() {
  const [profile, setProfile] = useState({
    name: "Aayushi Raj",
    email: "aayushi.raj@email.com",
    bio: "Aspiring full stack developer passionate about AI, open source, and building impactful products.",
    mobileNumber: "+91 7809243566" ,
    LinkedinIn:"https://www.linkedin.com/in/aayushi-raj-7aa67b28a/" 
  });
  const [editing, setEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState(profile);

  const handleEdit = () => {
    setTempProfile(profile);
    setEditing(true);
  };
  const handleSave = () => {
    setProfile(tempProfile);
    setEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-100 py-10 px-2 md:px-0">
      <div className="max-w-3xl mx-auto bg-white/90 rounded-3xl shadow-2xl p-8 md:p-12 backdrop-blur-md">
        <div className="flex items-center gap-3 mb-8">
          <UserCircle className="h-10 w-10 text-blue-500" />
          <h1 className="text-4xl font-extrabold bg-gradient-to-tr from-blue-600 to-pink-500 text-transparent bg-clip-text">Profile Settings</h1>
        </div>
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-200 to-pink-200 flex items-center justify-center mb-4 shadow-lg">
            <UserCircle className="h-16 w-16 text-blue-500" />
          </div>
          <div className="text-xl font-semibold text-gray-800">{profile.name}</div>
          <div className="text-gray-500">{profile.email}</div>
        </div>
        <div className="bg-gradient-to-br from-white via-blue-50 to-pink-50 rounded-2xl shadow p-6 mb-6">
          <div className="mb-4 flex items-center gap-2">
            <Edit2 className="h-5 w-5 text-pink-400" />
            <span className="font-semibold text-gray-700">Personal Info</span>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-600 font-medium mb-1">Name</label>
              <input
                type="text"
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                value={editing ? tempProfile.name : profile.name}
                onChange={e => setTempProfile({ ...tempProfile, name: e.target.value })}
                disabled={!editing}
              />
            </div>
            <div>
              <label className="block text-gray-600 font-medium mb-1">Email</label>
              <input
                type="email"
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                value={editing ? tempProfile.email : profile.email}
                onChange={e => setTempProfile({ ...tempProfile, email: e.target.value })}
                disabled={!editing}
              />
            </div>
            <div>
              <label className="block text-gray-600 font-medium mb-1">Bio</label>
              <textarea
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                rows={3}
                value={editing ? tempProfile.bio : profile.bio}
                onChange={e => setTempProfile({ ...tempProfile, bio: e.target.value })}
                disabled={!editing}
              />
            </div>
            <div>
              <label className="block text-gray-600 font-medium mb-1">Mobile Number</label>
              <textarea
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                // rows={3}
                value={editing ? tempProfile.mobileNumber : profile.mobileNumber}
                onChange={e => setTempProfile({ ...tempProfile, bio: e.target.value })}
                disabled={!editing}
              />
            </div>
            <div>
              <label className="block text-gray-600 font-medium mb-1">LinkedIn Profile ( Optional )</label>
              <textarea
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                // rows={3}
                value={editing ? tempProfile.LinkedinIn : profile.LinkedinIn}
                onChange={e => setTempProfile({ ...tempProfile, bio: e.target.value })}
                disabled={!editing}
              />
            </div>
          </div>
          <div className="flex justify-end mt-6 gap-2">
            {editing ? (
              <button
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                onClick={handleSave}
              >
                <Save className="h-4 w-4" /> Save
              </button>
            ) : (
              <button
                className="flex items-center gap-2 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition"
                onClick={handleEdit}
              >
                <Edit2 className="h-4 w-4" /> Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}