"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit, Save, X } from "lucide-react"

export function ProfileInfo() {
  const [profile, setProfile] = useState({
    birthdate: "",
    gender: "",
    location: "",
    profileStatus: "",
    team: "",
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await fetch("http://localhost:5001/api/user/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })

        if (!response.ok) throw new Error("Failed to fetch profile")

        const data = await response.json()

        if (data && data.user) {
          setProfile({
            birthdate: data.user.primaryInfo?.birthdate
              ? new Date(data.user.primaryInfo.birthdate).toISOString().split("T")[0]
              : "",
            gender: data.user.primaryInfo?.gender || "",
            location: data.user.primaryInfo?.location || "",
            profileStatus: data.user.moreInfo?.profileStatus || "",
            team: data.user.moreInfo?.team || "",
          })
        } else {
          throw new Error("Invalid user data received")
        }
      } catch (err) {
        setError((err as Error).message || "Failed to fetch profile.")
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  const handleSave = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("https://athleteconnect.onrender.com/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(profile),
      })

      const data = await response.json()

      if (response.ok && data.user) {
        setProfile({
          birthdate: data.user.primaryInfo?.birthdate
            ? new Date(data.user.primaryInfo.birthdate).toISOString().split("T")[0]
            : "",
          gender: data.user.primaryInfo?.gender || "",
          location: data.user.primaryInfo?.location || "",
          profileStatus: data.user.moreInfo?.profileStatus || "",
          team: data.user.moreInfo?.team || "",
        })

        setIsEditing(false)
      } else {
        throw new Error(data.message || "Failed to update profile.")
      }
    } catch (err) {
      setError((err as Error).message || "Error updating profile. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto space-y-6"
    >
      {error && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-sm">
          {error}
        </motion.p>
      )}

      {loading ? (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gray-500 text-sm">
          Loading profile...
        </motion.p>
      ) : (
        <>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between bg-teal-600 text-white">
              <CardTitle className="text-lg font-semibold">Primary Info</CardTitle>
              {isEditing ? (
                <div className="space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                    className="bg-white text-teal-600 hover:bg-teal-100"
                  >
                    <X className="w-4 h-4 mr-2" /> Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSave}
                    disabled={loading}
                    className="bg-white text-teal-600 hover:bg-teal-100"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {loading ? "Saving..." : "Save"}
                  </Button>
                </div>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsEditing(true)}
                  className="bg-white text-teal-600 hover:bg-teal-100"
                >
                  <Edit className="w-4 h-4 mr-2" /> Edit
                </Button>
              )}
            </CardHeader>
            <CardContent className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="birthdate">Birthdate</Label>
                <Input
                  type="date"
                  id="birthdate"
                  value={profile.birthdate}
                  onChange={(e) => setProfile({ ...profile, birthdate: e.target.value })}
                  disabled={!isEditing}
                  className={!isEditing ? "text-black" : ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Input
                  type="text"
                  id="gender"
                  value={profile.gender}
                  onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                  disabled={!isEditing}
                  placeholder="Add Gender"
                  className={!isEditing ? "text-black" : ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  type="text"
                  id="location"
                  value={profile.location}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  disabled={!isEditing}
                  placeholder="Add Location"
                  className={!isEditing ? "text-black" : ""}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between bg-teal-600 text-white">
              <CardTitle className="text-lg font-semibold">More Info</CardTitle>
              {isEditing ? (
                <div className="space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                    className="bg-white text-teal-600 hover:bg-teal-100"
                  >
                    <X className="w-4 h-4 mr-2" /> Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSave}
                    disabled={loading}
                    className="bg-white text-teal-600 hover:bg-teal-100"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {loading ? "Saving..." : "Save"}
                  </Button>
                </div>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsEditing(true)}
                  className="bg-white text-teal-600 hover:bg-teal-100"
                >
                  <Edit className="w-4 h-4 mr-2" /> Edit
                </Button>
              )}
            </CardHeader>
            <CardContent className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="profileStatus">Profile Status</Label>
                <Input
                  type="text"
                  id="profileStatus"
                  value={profile.profileStatus}
                  onChange={(e) => setProfile({ ...profile, profileStatus: e.target.value })}
                  disabled={!isEditing}
                  placeholder="Profile Status"
                  className={!isEditing ? "text-black" : ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="team">Team</Label>
                <Input
                  type="text"
                  id="team"
                  value={profile.team}
                  onChange={(e) => setProfile({ ...profile, team: e.target.value })}
                  disabled={!isEditing}
                  placeholder="Add Team"
                  className={!isEditing ? "text-black" : ""}
                />
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </motion.div>
  )
}

