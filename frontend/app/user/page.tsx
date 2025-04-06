"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Share2, Camera } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navbar } from "@/components/layout/navbar";

interface AthleteData {
  name: string;
  image: string;
  country: string;
  basicInfo: {
    fullName: string;
    age: number;
    gender: string;
    nationality: string;
    state: string;
    sport: string;
    category: string;
    currentRanking: string;
  };
  about: string;
  achievements: {
    medals: string[];
    records: string[];
    awards: string[];
  };
  sponsorship: {
    needs: string[];
    impact: string;
  };
  social: {
    instagram: string;
    twitter: string;
    facebook: string;
  };
  contact: {
    email: string;
    phone: string;
  };
}

const defaultAthleteData: AthleteData = {
  name: "",
  image: "/ath.jpg",
  country: "",
  basicInfo: {
    fullName: "",
    age: 0,
    gender: "",
    nationality: "",
    state: "",
    sport: "",
    category: "",
    currentRanking: "",
  },
  about: "",
  achievements: {
    medals: [],
    records: [],
    awards: [],
  },
  sponsorship: {
    needs: [],
    impact: "",
  },
  social: {
    instagram: "",
    twitter: "",
    facebook: "",
  },
  contact: {
    email: "",
    phone: "",
  },
};

export default function UserProfile() {
  const [athlete, setAthlete] = useState<AthleteData>(defaultAthleteData);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<AthleteData>(defaultAthleteData);
  const [loading, setLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [needs, setNeeds] = useState<string[]>([]);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/auth';
        return;
      }

      const response = await fetch('http://localhost:5001/api/athlete/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }

      const data = await response.json();
      // Ensure all required fields are present
      const completeData = {
        ...defaultAthleteData,
        ...data,
        basicInfo: {
          ...defaultAthleteData.basicInfo,
          ...(data.basicInfo || {})
        },
        achievements: {
          ...defaultAthleteData.achievements,
          ...(data.achievements || {})
        },
        sponsorship: {
          ...defaultAthleteData.sponsorship,
          ...(data.sponsorship || {})
        },
        social: {
          ...defaultAthleteData.social,
          ...(data.social || {})
        },
        contact: {
          ...defaultAthleteData.contact,
          ...(data.contact || {})
        }
      };

      setAthlete(completeData);
      setFormData(completeData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setLoading(false);
    }
  };

  type BasicInfoKey = keyof typeof defaultAthleteData.basicInfo;

  const handleEdit = () => {
    setEditing(true);
    setFormData(athlete);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5001/api/athlete/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const updatedData = await response.json();
      setAthlete(updatedData);
      setEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        // Create preview URL
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);

        // Create a canvas to compress the image
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          throw new Error('Could not get canvas context');
        }

        // Create image element
        const img = document.createElement('img');

        img.onload = async () => {
          try {
            // Set canvas dimensions (max 800px width/height while maintaining aspect ratio)
            const maxSize = 800;
            let width = img.width;
            let height = img.height;

            if (width > height) {
              if (width > maxSize) {
                height = Math.round((height * maxSize) / width);
                width = maxSize;
              }
            } else {
              if (height > maxSize) {
                width = Math.round((width * maxSize) / height);
                height = maxSize;
              }
            }

            canvas.width = width;
            canvas.height = height;

            // Draw and compress image
            ctx.drawImage(img, 0, 0, width, height);
            const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);

            const token = localStorage.getItem('token');
            if (!token) {
              throw new Error('No authentication token found');
            }

            const response = await fetch('http://localhost:5001/api/athlete/profile/image', {
              method: 'PUT',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ image: compressedBase64 })
            });

            const data = await response.json();

            if (!data.success) {
              throw new Error(data.message || 'Failed to upload image');
            }

            // Update the athlete state with the new image
            setAthlete(prev => ({ ...prev, image: data.image }));
            setFormData(prev => ({ ...prev, image: data.image }));

            // Clear the preview URL
            URL.revokeObjectURL(previewUrl);
            setImagePreview(null);

            alert('Profile picture updated successfully!');
          } catch (error) {
            console.error('Error uploading image:', error);
            alert(error instanceof Error ? error.message : 'Failed to upload image');
            // Clear the preview URL on error
            URL.revokeObjectURL(previewUrl);
            setImagePreview(null);
          }
        };

        img.onerror = () => {
          throw new Error('Failed to load image');
        };

        img.src = previewUrl;
      } catch (error) {
        console.error('Error in handleImageChange:', error);
        alert('Failed to process image. Please try again.');
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="min-h-screen pt-20 bg-gradient-to-b from-teal-500 to-teal-400 text-white p-6">
        {/* Header */}
        <div className="max-w-4xl mx-auto bg-gradient-to-b from-teal-500 to-teal-400 rounded-lg p-6 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Image
                src={imagePreview || athlete.image || "/placeholder.svg"}
                alt={athlete.name}
                width={64}
                height={64}
                className="rounded-full border-2 border-white"
              />
              {editing && (
                <>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 bg-teal-600 p-1 rounded-full border-2 border-white"
                  >
                    <Camera className="h-4 w-4 text-white" />
                  </button>
                </>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                {editing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="bg-gray-200 px-2 rounded"
                  />
                ) : (
                  athlete.name
                )}
              </h1>
              <p className="text-sm text-gray-200">
                {athlete.basicInfo?.sport || 'No sport specified'} • {athlete.basicInfo?.category || 'No category specified'}
              </p>
            </div>
          </div>
          <div className="mt-4 flex justify-between">
            <Button
              size="icon"
              variant="ghost"
              className="bg-white-500 hover:bg-teal-600"
            >
              <Share2 className="h-5 w-5 text-white" />
            </Button>
            {editing ? (
              <Button
                className="bg-white-600 hover:bg-teal-700 px-6"
                onClick={handleSave}
              >
                SAVE PROFILE
              </Button>
            ) : (
              <Button
                className="bg-white-600 hover:bg-teal-700 px-6"
                onClick={handleEdit}
              >
                EDIT PROFILE
              </Button>
            )}
          </div>
        </div>

        {/* Profile Content */}
        <div className="max-w-4xl mx-auto bg-white text-gray-800 rounded-lg p-6 mt-6 shadow-lg">
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="flex justify-around border-b">
              <TabsTrigger value="about" className="py-2 text-lg font-semibold">
                About
              </TabsTrigger>
              <TabsTrigger
                value="achievements"
                className="py-2 text-lg font-semibold"
              >
                Achievements
              </TabsTrigger>
              <TabsTrigger
                value="sponsorship"
                className="py-2 text-lg font-semibold"
              >
                Sponsorship
              </TabsTrigger>
            </TabsList>

            {/* About Section */}
            <TabsContent value="about">
              <h2 className="text-xl font-bold mb-3">Basic Information</h2>
              {Object.keys(athlete.basicInfo || {}).map((key) => {
                const typedKey = key as BasicInfoKey;
                return (
                  <div key={typedKey} className="mb-2">
                    <strong>
                      {typedKey.replace(/([A-Z])/g, " $1").trim()}:
                    </strong>
                    {editing ? (
                      <input
                        type="text"
                        value={formData.basicInfo[typedKey]}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            basicInfo: {
                              ...formData.basicInfo,
                              [typedKey]: e.target.value,
                            },
                          })
                        }
                        className="ml-2 px-2 py-1 border rounded"
                      />
                    ) : (
                      ` ${athlete.basicInfo[typedKey] || ''}`
                    )}
                  </div>
                );
              })}
              <h2 className="text-xl font-bold mt-4">About</h2>
              {editing ? (
                <textarea
                  className="w-full p-4 border rounded-lg"
                  value={formData.about}
                  onChange={(e) =>
                    setFormData({ ...formData, about: e.target.value })
                  }
                />
              ) : (
                <p className="text-gray-600">{athlete.about || 'No about information available'}</p>
              )}
            </TabsContent>

            {/* Achievements Section */}
            <TabsContent value="achievements">
              <h2 className="text-xl font-bold mb-3">Medals & Awards</h2>
              {(
                Object.keys(athlete.achievements || {}) as Array<
                  keyof typeof athlete.achievements
                >
              ).map((category) => (
                <div key={category}>
                  <strong>
                    {category.charAt(0).toUpperCase() + category.slice(1)}:
                  </strong>
                  {editing ? (
                    <textarea
                      className="w-full p-2 border rounded-lg"
                      value={formData.achievements[category].join(", ")}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          achievements: {
                            ...formData.achievements,
                            [category]: e.target.value.split(", "),
                          },
                        })
                      }
                    />
                  ) : (
                    <ul className="list-disc pl-5 text-gray-700">
                      {athlete.achievements[category]?.map(
                        (item: string, index: number) => (
                          <li key={index}>{item}</li>
                        )
                      )}
                    </ul>
                  )}
                </div>
              ))}
            </TabsContent>

            {/* Sponsorship Section */}
            <TabsContent value="sponsorship">
              <h2 className="text-xl font-bold mb-3">Sponsorship Needs</h2>
              {editing ? (
                <textarea
                  className="w-full p-2 border rounded-lg"
                  value={formData.sponsorship.needs.join(", ")}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      sponsorship: {
                        ...formData.sponsorship,
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        needs: e.target.value.split(", "),
                      },
                    })
                  }
                />
              ) : (
                <ul className="list-disc pl-5 text-gray-700">
                  {athlete.sponsorship.needs?.map((need, index) => (
                    <li key={index}>{need}</li>
                  ))}
                </ul>
              )}
              <h2 className="text-xl font-bold mt-4">Impact</h2>
              {editing ? (
                <textarea
                  className="w-full p-2 border rounded-lg"
                  value={formData.sponsorship.impact}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      sponsorship: {
                        ...formData.sponsorship,
                        impact: e.target.value,
                      },
                    })
                  }
                />
              ) : (
                <p className="text-gray-600">{athlete.sponsorship.impact || 'No impact information available'}</p>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}