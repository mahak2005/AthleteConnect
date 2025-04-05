"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navbar } from "@/components/layout/navbar";

const defaultAthleteData = {
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
  const [athlete, setAthlete] = useState(defaultAthleteData);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(defaultAthleteData);
  const [loading, setLoading] = useState(true);
  
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

      const response = await fetch('http://localhost:5000/api/athlete/profile', {
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
      const response = await fetch('http://localhost:5000/api/athlete/profile', {
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen ">
      <Navbar />
      <div className="min-h-screen pt-20 bg-gradient-to-b from-teal-500 to-teal-400 text-white p-6">
        {/* Header */}
        <div className="max-w-4xl mx-auto bg-gradient-to-b from-teal-500 to-teal-400 rounded-lg p-6 shadow-lg">
          <div className="flex items-center gap-4">
            <Image
              src={athlete.image || "/placeholder.svg"}
              alt={athlete.name}
              width={64}
              height={64}
              className="rounded-full border-2 border-white"
            />
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


// "use client"

// import { useState, useEffect } from "react"
// import Link from "next/link"
// import Image from "next/image"
// import { motion } from "framer-motion"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Award, TrendingUp, Users, DollarSign, BookOpen, ShoppingBag, ArrowRight, CheckCircle } from "lucide-react"
// import AthleteCard from "@/components/athlete-card"
// import FundingProgress from "@/components/funding-progress"
// import TestimonialCard from "@/components/testimonial-card"
// import SponsorLogo from "@/components/sponsor-logo"
// import { athletes } from "@/data/athletes"
// import { sponsors } from "@/data/sponsors"
// import { testimonials } from "@/data/testimonials"

// export default function HomePage() {
//   const [isVisible, setIsVisible] = useState(false)

//   useEffect(() => {
//     setIsVisible(true)
//   }, [])

//   const container = {
//     hidden: { opacity: 0 },
//     show: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   }

//   const item = {
//     hidden: { opacity: 0, y: 20 },
//     show: { opacity: 1, y: 0 },
//   }

//   return (
//     <div className="flex flex-col min-h-screen">
//       {/* Hero Section */}
//       <section className="relative py-20 md:py-28 overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-r from-teal-50 to-teal-50 dark:from-gray-900 dark:to-gray-800 -z-10" />
//         <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] -z-10" />

//         <div className="container">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }}
//               transition={{ duration: 0.5 }}
//               className="space-y-6"
//             >
//               <Badge variant="outline" className="px-3 py-1 border-primary text-primary">
//                 Empowering Athletes
//               </Badge>
//               <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
//                 Where <span className="gradient-text">Talent</span> Meets{" "}
//                 <span className="gradient-text">Opportunity</span>
//               </h1>
//               <p className="text-lg text-muted-foreground max-w-md">
//                 Connecting underprivileged athletes with financial support, training, and sponsorship opportunities to
//                 help them reach their full potential.
//               </p>
//               <div className="flex flex-wrap gap-4 pt-4">
//                 <Button size="lg" asChild>
//                   <Link href="/athletes">Discover Athletes</Link>
//                 </Button>
//                 <Button size="lg" variant="outline" asChild>
//                   <Link href="/sponsorship">Become a Sponsor</Link>
//                 </Button>
//               </div>
//               <div className="flex items-center gap-4 pt-4">
//                 <div className="flex -space-x-3">
//                   {[1, 2, 3, 4].map((i) => (
//                     <div
//                       key={i}
//                       className="h-10 w-10 rounded-full border-2 border-white dark:border-gray-800 bg-gray-200 dark:bg-gray-700"
//                     />
//                   ))}
//                 </div>
//                 <div className="text-sm">
//                   <span className="font-semibold">500+</span> athletes already on the platform
//                 </div>
//               </div>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.9 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//               className="relative"
//             >
//               <div className="relative h-[400px] md:h-[500px] w-full rounded-2xl overflow-hidden shadow-xl">
//                 <Image
//                   src="/placeholder.svg?height=500&width=600"
//                   alt="Athletes in action"
//                   fill
//                   className="object-cover"
//                 />
//               </div>
//               <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 max-w-[200px]">
//                 <div className="flex items-center gap-2 mb-2">
//                   <TrendingUp className="h-5 w-5 text-primary" />
//                   <span className="font-semibold">Success Rate</span>
//                 </div>
//                 <div className="text-2xl font-bold">87%</div>
//                 <p className="text-xs text-muted-foreground mt-1">
//                   of our athletes receive sponsorship within 6 months
//                 </p>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-20 bg-white dark:bg-gray-950">
//         <div className="container">
//           <div className="text-center max-w-3xl mx-auto mb-16">
//             <Badge variant="outline" className="mb-4">
//               Our Platform
//             </Badge>
//             <h2 className="text-3xl md:text-4xl font-bold mb-4">
//               Everything Athletes Need to <span className="gradient-text">Succeed</span>
//             </h2>
//             <p className="text-muted-foreground">
//               AthleteConnect provides a comprehensive ecosystem of support, training, and opportunities for
//               underprivileged athletes.
//             </p>
//           </div>

//           <motion.div
//             variants={container}
//             initial="hidden"
//             whileInView="show"
//             viewport={{ once: true }}
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
//           >
//             <motion.div variants={item}>
//               <Card className="h-full transition-all hover:shadow-md">
//                 <CardContent className="p-6 space-y-4">
//                   <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
//                     <Users className="h-6 w-6 text-primary" />
//                   </div>
//                   <h3 className="text-xl font-semibold">Athlete Profiles & Discovery</h3>
//                   <p className="text-muted-foreground">
//                     Create detailed profiles showcasing your stats, achievements, and personal story to get discovered.
//                   </p>
//                   <ul className="space-y-2">
//                     <li className="flex items-center gap-2 text-sm">
//                       <CheckCircle className="h-4 w-4 text-primary" />
//                       <span>AI-driven talent discovery</span>
//                     </li>
//                     <li className="flex items-center gap-2 text-sm">
//                       <CheckCircle className="h-4 w-4 text-primary" />
//                       <span>Performance tracking integration</span>
//                     </li>
//                     <li className="flex items-center gap-2 text-sm">
//                       <CheckCircle className="h-4 w-4 text-primary" />
//                       <span>Coach endorsements</span>
//                     </li>
//                   </ul>
//                 </CardContent>
//               </Card>
//             </motion.div>

//             <motion.div variants={item}>
//               <Card className="h-full transition-all hover:shadow-md">
//                 <CardContent className="p-6 space-y-4">
//                   <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
//                     <DollarSign className="h-6 w-6 text-primary" />
//                   </div>
//                   <h3 className="text-xl font-semibold">Financial Support & Sponsorship</h3>
//                   <p className="text-muted-foreground">
//                     Access crowdfunding and connect with sponsors who believe in your potential.
//                   </p>
//                   <ul className="space-y-2">
//                     <li className="flex items-center gap-2 text-sm">
//                       <CheckCircle className="h-4 w-4 text-primary" />
//                       <span>AI-powered sponsorship matching</span>
//                     </li>
//                     <li className="flex items-center gap-2 text-sm">
//                       <CheckCircle className="h-4 w-4 text-primary" />
//                       <span>Transparent funding breakdowns</span>
//                     </li>
//                     <li className="flex items-center gap-2 text-sm">
//                       <CheckCircle className="h-4 w-4 text-primary" />
//                       <span>Direct financial aid</span>
//                     </li>
//                   </ul>
//                 </CardContent>
//               </Card>
//             </motion.div>

//             <motion.div variants={item}>
//               <Card className="h-full transition-all hover:shadow-md">
//                 <CardContent className="p-6 space-y-4">
//                   <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
//                     <BookOpen className="h-6 w-6 text-primary" />
//                   </div>
//                   <h3 className="text-xl font-semibold">Training & Mentorship</h3>
//                   <p className="text-muted-foreground">
//                     Access professional coaching and personalized training programs to improve your skills.
//                   </p>
//                   <ul className="space-y-2">
//                     <li className="flex items-center gap-2 text-sm">
//                       <CheckCircle className="h-4 w-4 text-primary" />
//                       <span>Online training sessions</span>
//                     </li>
//                     <li className="flex items-center gap-2 text-sm">
//                       <CheckCircle className="h-4 w-4 text-primary" />
//                       <span>One-on-one mentorship</span>
//                     </li>
//                     <li className="flex items-center gap-2 text-sm">
//                       <CheckCircle className="h-4 w-4 text-primary" />
//                       <span>AI-powered training recommendations</span>
//                     </li>
//                   </ul>
//                 </CardContent>
//               </Card>
//             </motion.div>

//             <motion.div variants={item}>
//               <Card className="h-full transition-all hover:shadow-md">
//                 <CardContent className="p-6 space-y-4">
//                   <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
//                     <Award className="h-6 w-6 text-primary" />
//                   </div>
//                   <h3 className="text-xl font-semibold">Social & Athlete Engagement</h3>
//                   <p className="text-muted-foreground">
//                     Share your journey, connect with peers, and build your personal brand.
//                   </p>
//                   <ul className="space-y-2">
//                     <li className="flex items-center gap-2 text-sm">
//                       <CheckCircle className="h-4 w-4 text-primary" />
//                       <span>Personal feed for sharing achievements</span>
//                     </li>
//                     <li className="flex items-center gap-2 text-sm">
//                       <CheckCircle className="h-4 w-4 text-primary" />
//                       <span>Coach and peer endorsements</span>
//                     </li>
//                     <li className="flex items-center gap-2 text-sm">
//                       <CheckCircle className="h-4 w-4 text-primary" />
//                       <span>Social media integration</span>
//                     </li>
//                   </ul>
//                 </CardContent>
//               </Card>
//             </motion.div>

//             <motion.div variants={item}>
//               <Card className="h-full transition-all hover:shadow-md">
//                 <CardContent className="p-6 space-y-4">
//                   <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
//                     <ShoppingBag className="h-6 w-6 text-primary" />
//                   </div>
//                   <h3 className="text-xl font-semibold">Brand Collaborations & Marketplace</h3>
//                   <p className="text-muted-foreground">
//                     Connect with brands for endorsements and sell your own merchandise.
//                   </p>
//                   <ul className="space-y-2">
//                     <li className="flex items-center gap-2 text-sm">
//                       <CheckCircle className="h-4 w-4 text-primary" />
//                       <span>Brand-athlete matchmaking</span>
//                     </li>
//                     <li className="flex items-center gap-2 text-sm">
//                       <CheckCircle className="h-4 w-4 text-primary" />
//                       <span>Merchandising opportunities</span>
//                     </li>
//                     <li className="flex items-center gap-2 text-sm">
//                       <CheckCircle className="h-4 w-4 text-primary" />
//                       <span>AI-driven brand recommendations</span>
//                     </li>
//                   </ul>
//                 </CardContent>
//               </Card>
//             </motion.div>

//             <motion.div variants={item}>
//               <Card className="h-full transition-all hover:shadow-md">
//                 <CardContent className="p-6 space-y-4">
//                   <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
//                     <Users className="h-6 w-6 text-primary" />
//                   </div>
//                   <h3 className="text-xl font-semibold">Community & Engagement</h3>
//                   <p className="text-muted-foreground">
//                     Join a supportive community of athletes, coaches, and sponsors.
//                   </p>
//                   <ul className="space-y-2">
//                     <li className="flex items-center gap-2 text-sm">
//                       <CheckCircle className="h-4 w-4 text-primary" />
//                       <span>Interactive forums</span>
//                     </li>
//                     <li className="flex items-center gap-2 text-sm">
//                       <CheckCircle className="h-4 w-4 text-primary" />
//                       <span>Success stories and impact highlights</span>
//                     </li>
//                     <li className="flex items-center gap-2 text-sm">
//                       <CheckCircle className="h-4 w-4 text-primary" />
//                       <span>Engaging UX/UI experience</span>
//                     </li>
//                   </ul>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Featured Athletes Section */}
//       <section className="py-20 bg-gray-50 dark:bg-gray-900">
//         <div className="container">
//           <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
//             <div>
//               <Badge variant="outline" className="mb-4">
//                 Featured Athletes
//               </Badge>
//               <h2 className="text-3xl md:text-4xl font-bold mb-4">
//                 Discover Rising <span className="gradient-text">Stars</span>
//               </h2>
//               <p className="text-muted-foreground max-w-2xl">
//                 These talented athletes are making waves in their sports. Support their journey and help them reach new
//                 heights.
//               </p>
//             </div>
//             <Button variant="outline" className="mt-4 md:mt-0" asChild>
//               <Link href="/athletes">
//                 View All Athletes
//                 <ArrowRight className="ml-2 h-4 w-4" />
//               </Link>
//             </Button>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {athletes.slice(0, 3).map((athlete) => (
//               <AthleteCard key={athlete.id} athlete={athlete} />
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Sponsorship Section */}
//       <section className="py-20 bg-white dark:bg-gray-950">
//         <div className="container">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//             <div>
//               <Badge variant="outline" className="mb-4">
//                 Sponsorship
//               </Badge>
//               <h2 className="text-3xl md:text-4xl font-bold mb-4">
//                 Make a <span className="gradient-text">Difference</span> in an Athlete's Journey
//               </h2>
//               <p className="text-muted-foreground mb-6">
//                 Your support can transform an athlete's life. Sponsor an athlete today and be part of their success
//                 story.
//               </p>

//               <Tabs defaultValue="individual">
//                 <TabsList className="mb-4">
//                   <TabsTrigger value="individual">Individual</TabsTrigger>
//                   <TabsTrigger value="business">Business</TabsTrigger>
//                 </TabsList>
//                 <TabsContent value="individual" className="space-y-4">
//                   <p className="text-sm">
//                     Support athletes directly with monthly contributions or one-time donations. Track their progress and
//                     receive updates on their achievements.
//                   </p>
//                   <ul className="space-y-2">
//                     <li className="flex items-center gap-2 text-sm">
//                       <CheckCircle className="h-4 w-4 text-primary" />
//                       <span>Direct athlete support</span>
//                     </li>
//                     <li className="flex items-center gap-2 text-sm">
//                       <CheckCircle className="h-4 w-4 text-primary" />
//                       <span>Progress tracking</span>
//                     </li>
//                     <li className="flex items-center gap-2 text-sm">
//                       <CheckCircle className="h-4 w-4 text-primary" />
//                       <span>Personal connection</span>
//                     </li>
//                   </ul>
//                   <Button asChild>
//                     <Link href="/sponsorship/individual">Become a Sponsor</Link>
//                   </Button>
//                 </TabsContent>
//                 <TabsContent value="business" className="space-y-4">
//                   <p className="text-sm">
//                     Partner with athletes for brand endorsements, sponsorships, and marketing opportunities. Enhance
//                     your brand while supporting talent.
//                   </p>
//                   <ul className="space-y-2">
//                     <li className="flex items-center gap-2 text-sm">
//                       <CheckCircle className="h-4 w-4 text-primary" />
//                       <span>Brand visibility</span>
//                     </li>
//                     <li className="flex items-center gap-2 text-sm">
//                       <CheckCircle className="h-4 w-4 text-primary" />
//                       <span>Athlete endorsements</span>
//                     </li>
//                     <li className="flex items-center gap-2 text-sm">
//                       <CheckCircle className="h-4 w-4 text-primary" />
//                       <span>Social impact</span>
//                     </li>
//                   </ul>
//                   <Button asChild>
//                     <Link href="/sponsorship/business">Partner With Us</Link>
//                   </Button>
//                 </TabsContent>
//               </Tabs>
//             </div>

//             <div className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {athletes.slice(0, 2).map((athlete) => (
//                   <FundingProgress key={athlete.id} athlete={athlete} />
//                 ))}
//               </div>
//               <Card>
//                 <CardContent className="p-6">
//                   <div className="flex items-center justify-between mb-4">
//                     <h3 className="font-semibold">Our Impact</h3>
//                     <Badge variant="outline">Growing Daily</Badge>
//                   </div>
//                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
//                     <div>
//                       <div className="text-3xl font-bold text-primary">500+</div>
//                       <div className="text-sm text-muted-foreground">Athletes Supported</div>
//                     </div>
//                     <div>
//                       <div className="text-3xl font-bold text-primary">$2.5M+</div>
//                       <div className="text-sm text-muted-foreground">Funds Raised</div>
//                     </div>
//                     <div>
//                       <div className="text-3xl font-bold text-primary">150+</div>
//                       <div className="text-sm text-muted-foreground">Sponsorships</div>
//                     </div>
//                     <div>
//                       <div className="text-3xl font-bold text-primary">35+</div>
//                       <div className="text-sm text-muted-foreground">Countries</div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section className="py-20 bg-gray-50 dark:bg-gray-900">
//         <div className="container">
//           <div className="text-center max-w-3xl mx-auto mb-16">
//             <Badge variant="outline" className="mb-4">
//               Testimonials
//             </Badge>
//             <h2 className="text-3xl md:text-4xl font-bold mb-4">
//               Success <span className="gradient-text">Stories</span>
//             </h2>
//             <p className="text-muted-foreground">
//               Hear from athletes and sponsors who have experienced the impact of AthleteConnect.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {testimonials.map((testimonial) => (
//               <TestimonialCard key={testimonial.id} testimonial={testimonial} />
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Sponsors Section */}
//       <section className="py-20 bg-white dark:bg-gray-950">
//         <div className="container">
//           <div className="text-center max-w-3xl mx-auto mb-16">
//             <Badge variant="outline" className="mb-4">
//               Our Partners
//             </Badge>
//             <h2 className="text-3xl md:text-4xl font-bold mb-4">
//               Trusted by Leading <span className="gradient-text">Brands</span>
//             </h2>
//             <p className="text-muted-foreground">
//               These organizations are helping us make a difference in athletes' lives.
//             </p>
//           </div>

//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
//             {sponsors.map((sponsor) => (
//               <SponsorLogo key={sponsor.id} sponsor={sponsor} />
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 bg-gradient-to-r from-teal-500 to-teal-700 text-white">
//         <div className="container">
//           <div className="text-center max-w-3xl mx-auto">
//             <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
//             <p className="text-lg mb-8 text-white/80">
//               Join AthleteConnect today and be part of a community that's changing lives through sports.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <Button size="lg" variant="secondary" asChild>
//                 <Link href="/register">Join as an Athlete</Link>
//               </Button>
//               <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10" asChild>
//                 <Link href="/sponsorship">Become a Sponsor</Link>
//               </Button>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   )
// }

