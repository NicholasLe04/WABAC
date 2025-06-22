"use client";

import { useEffect, useState } from "react";
import { Tag } from "lucide-react";

interface TagItem {
  user_id: string;
  tag: string;
}

const MemoryTags = () => {
  const [tags, setTags] = useState<TagItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTags = async () => {
      const userJson = localStorage.getItem('user');
      if (userJson) {
        const currentUser = JSON.parse(userJson);
        try {
          const response = await fetch(`/api/dashboard/tags?userId=${currentUser.id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch tags');
          }
          const data = await response.json();
          setTags(data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    fetchTags();
  }, []);

  return (
    <div className="p-6 bg-card-bg rounded-card shadow-card backdrop-blur-lg border border-card-border">
      <h2 className="text-2xl font-bold mb-4">Memory Tags</h2>
      <div className="flex flex-wrap gap-2">
        {loading ? (
          <p>Loading tags...</p>
        ) : tags.length > 0 ? (
          tags.map((tag, index) => (
            <div key={index} className="flex items-center gap-1 px-3 py-1 rounded-full bg-accent-blue/10 text-accent-blue text-sm font-medium">
              <Tag className="w-4 h-4" />
              <span>{tag.tag}</span>
            </div>
          ))
        ) : (
          <p>No tags found.</p>
        )}
      </div>
    </div>
  );
};

export default MemoryTags; 