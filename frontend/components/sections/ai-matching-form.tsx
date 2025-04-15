"use client"
import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sparkles, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react"

const steps = [
    {
        id: "step-1",
        name: "Sponsorship Details",
        fields: ["companyName", "industry", "sponsorshipType", "budget"],
    },
    {
        id: "step-2",
        name: "Athlete Preferences",
        fields: ["sports", "level", "gender", "ageRange"],
    },
    {
        id: "step-3",
        name: "Campaign Goals",
        fields: ["goals", "duration", "audience", "metrics"],
    },
    {
        id: "step-4",
        name: "Additional Requirements",
        fields: ["location", "socialMedia", "exclusivity", "additionalInfo"],
    },
]

export function AIMatchingForm() {
    const [currentStep, setCurrentStep] = useState(0)
    const [formData, setFormData] = useState({
        companyName: "",
        industry: "",
        sponsorshipType: "",
        budget: [50000],
        sports: [],
        level: "",
        gender: "",
        ageRange: [18, 40],
        goals: [],
        duration: "",
        audience: "",
        metrics: [],
        location: "",
        socialMedia: false,
        exclusivity: false,
        additionalInfo: "",
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChange = (field: string, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep((prev) => prev + 1)
        }
    }

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false)
            router.push("/match-with-athletes/ai-matching/results")
        }, 2000)
    }

    return (
        <div className="max-w-3xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8 text-center"
            >
                <div className="inline-flex items-center justify-center p-2 bg-teal-100 rounded-full mb-4">
                    <Sparkles className="h-6 w-6 text-teal-600" />
                </div>
                <h1 className="text-3xl font-bold mb-2">Smart Athlete Matching</h1>
                <p className="text-gray-600">
                    Tell us about your sponsorship needs and we will find the perfect athletes for your campaign
                </p>
            </motion.div>

            {/* Progress Steps */}
            <div className="mb-8">
                <div className="flex justify-between">
                    {steps.map((step, index) => (
                        <div key={step.id} className="flex flex-col items-center">
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= index ? "bg-teal-600 text-white" : "bg-gray-200 text-gray-500"
                                    }`}
                            >
                                {currentStep > index ? <CheckCircle2 className="h-6 w-6" /> : <span>{index + 1}</span>}
                            </div>
                            <span className="text-xs mt-2 hidden md:block">{step.name}</span>
                        </div>
                    ))}
                </div>
                <div className="relative mt-2">
                    <div className="absolute top-0 left-0 h-1 bg-gray-200 w-full"></div>
                    <div
                        className="absolute top-0 left-0 h-1 bg-teal-600 transition-all duration-300"
                        style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                    ></div>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <Card>
                    <CardHeader>
                        <CardTitle>{steps[currentStep].name}</CardTitle>
                        <CardDescription>
                            {currentStep === 0 && "Tell us about your company and sponsorship budget"}
                            {currentStep === 1 && "What kind of athletes are you looking for?"}
                            {currentStep === 2 && "What are your campaign goals and expectations?"}
                            {currentStep === 3 && "Any additional requirements or preferences?"}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {/* Step 1: Sponsorship Details */}
                        {currentStep === 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-4"
                            >
                                <div>
                                    <Label htmlFor="companyName">Company Name</Label>
                                    <Input
                                        id="companyName"
                                        value={formData.companyName}
                                        onChange={(e) => handleChange("companyName", e.target.value)}
                                        placeholder="Enter your company name"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="industry">Industry</Label>
                                    <Select value={formData.industry} onValueChange={(value) => handleChange("industry", value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select your industry" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="sports">Sports & Fitness</SelectItem>
                                            <SelectItem value="technology">Technology</SelectItem>
                                            <SelectItem value="food">Food & Beverage</SelectItem>
                                            <SelectItem value="fashion">Fashion & Apparel</SelectItem>
                                            <SelectItem value="health">Health & Wellness</SelectItem>
                                            <SelectItem value="finance">Financial Services</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label>Sponsorship Type</Label>
                                    <RadioGroup
                                        value={formData.sponsorshipType}
                                        onValueChange={(value) => handleChange("sponsorshipType", value)}
                                        className="flex flex-col space-y-2 mt-2"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="financial" id="financial" />
                                            <Label htmlFor="financial">Financial Support</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="product" id="product" />
                                            <Label htmlFor="product">Product Sponsorship</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="service" id="service" />
                                            <Label htmlFor="service">Service Sponsorship</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="mixed" id="mixed" />
                                            <Label htmlFor="mixed">Mixed Sponsorship</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <Label>Budget Range (USD)</Label>
                                        <span className="text-sm font-medium">${formData.budget[0].toLocaleString()}</span>
                                    </div>
                                    <Slider
                                        value={formData.budget}
                                        onValueChange={(value) => handleChange("budget", value)}
                                        max={500000}
                                        step={5000}
                                        className="mt-2"
                                    />
                                    <div className="flex justify-between mt-1">
                                        <span className="text-xs text-gray-500">Rs 5,000</span>
                                        <span className="text-xs text-gray-500">Rs 500,000+</span>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 2: Athlete Preferences */}
                        {currentStep === 1 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-4"
                            >
                                <div>
                                    <Label>Sports Categories</Label>
                                    <div className="grid grid-cols-2 gap-2 mt-2">
                                        {["Basketball", "Football", "Soccer", "Tennis", "Golf", "Swimming", "Track & Field", "Other"].map(
                                            (sport) => (
                                                <div key={sport} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={sport.toLowerCase()}
                                                        checked={formData.sports.includes(sport.toLowerCase() as never)}
                                                        onCheckedChange={(checked) => {
                                                            if (checked) {
                                                                handleChange("sports", [...formData.sports, sport.toLowerCase()])
                                                            } else {
                                                                handleChange(
                                                                    "sports",
                                                                    formData.sports.filter((s) => s !== sport.toLowerCase()),
                                                                )
                                                            }
                                                        }}
                                                    />
                                                    <Label htmlFor={sport.toLowerCase()}>{sport}</Label>
                                                </div>
                                            ),
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <Label>Athlete Level</Label>
                                    <RadioGroup
                                        value={formData.level}
                                        onValueChange={(value) => handleChange("level", value)}
                                        className="flex flex-col space-y-2 mt-2"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="professional" id="professional" />
                                            <Label htmlFor="professional">Professional</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="olympic" id="olympic" />
                                            <Label htmlFor="olympic">Olympic</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="collegiate" id="collegiate" />
                                            <Label htmlFor="collegiate">Collegiate</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="amateur" id="amateur" />
                                            <Label htmlFor="amateur">Amateur/Rising Star</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="any" id="any" />
                                            <Label htmlFor="any">Any Level</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                                <div>
                                    <Label>Gender Preference</Label>
                                    <RadioGroup
                                        value={formData.gender}
                                        onValueChange={(value) => handleChange("gender", value)}
                                        className="flex space-x-4 mt-2"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="male" id="male" />
                                            <Label htmlFor="male">Male</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="female" id="female" />
                                            <Label htmlFor="female">Female</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="any_gender" id="any_gender" />
                                            <Label htmlFor="any_gender">No Preference</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <Label>age Range</Label>
                                        <span className="text-sm font-medium">
                                            {formData.ageRange[0]} - {formData.ageRange[1]} years
                                        </span>
                                    </div>
                                    <Slider
                                        value={formData.ageRange}
                                        onValueChange={(value) => handleChange("ageRange", value)}
                                        min={16}
                                        max={50}
                                        step={1}
                                        className="mt-2"
                                    />
                                    <div className="flex justify-between mt-1">
                                        <span className="text-xs text-gray-500">16 years</span>
                                        <span className="text-xs text-gray-500">50+ years</span>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 3: Campaign Goals */}
                        {currentStep === 2 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-4"
                            >
                                <div>
                                    <Label>Campaign Goals</Label>
                                    <div className="grid grid-cols-1 gap-2 mt-2">
                                        {[
                                            "Brand Awareness",
                                            "Product Launch",
                                            "Social Media Engagement",
                                            "Content Creation",
                                            "Event Promotion",
                                            "Community Outreach",
                                            "Sales Increase",
                                        ].map((goal) => (
                                            <div key={goal} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={goal.toLowerCase().replace(/\s+/g, "_")}
                                                    checked={formData.goals.includes(goal.toLowerCase() as never)}
                                                    onCheckedChange={(checked) => {
                                                        if (checked) {
                                                            handleChange("goals", [...formData.goals, goal.toLowerCase()])
                                                        } else {
                                                            handleChange(
                                                                "goals",
                                                                formData.goals.filter((g: string) => g !== goal.toLowerCase()),
                                                            )
                                                        }
                                                    }}
                                                />
                                                <Label htmlFor={goal.toLowerCase().replace(/\s+/g, "_")}>{goal}</Label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <Label>Campaign Duration</Label>
                                    <Select value={formData.duration} onValueChange={(value) => handleChange("duration", value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select campaign duration" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="one_time">One-time Event/Promotion</SelectItem>
                                            <SelectItem value="short_term">Short-term (1-3 months)</SelectItem>
                                            <SelectItem value="medium_term">Medium-term (3-6 months)</SelectItem>
                                            <SelectItem value="long_term">Long-term (6-12 months)</SelectItem>
                                            <SelectItem value="multi_year">Multi-year Partnership</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label>Target Audience</Label>
                                    <Select value={formData.audience} onValueChange={(value) => handleChange("audience", value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select primary target audience" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="youth">Youth (Under 18)</SelectItem>
                                            <SelectItem value="young_adults">Young Adults (18-24)</SelectItem>
                                            <SelectItem value="adults">Adults (25-40)</SelectItem>
                                            <SelectItem value="middle_aged">Middle-aged (41-60)</SelectItem>
                                            <SelectItem value="seniors">Seniors (60+)</SelectItem>
                                            <SelectItem value="families">Families</SelectItem>
                                            <SelectItem value="sports_fans">Sports Fans</SelectItem>
                                            <SelectItem value="general">General Public</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label>Success Metrics</Label>
                                    <div className="grid grid-cols-2 gap-2 mt-2">
                                        {[
                                            "Social Media Reach",
                                            "Engagement Rate",
                                            "Brand Mentions",
                                            "Website Traffic",
                                            "Sales Conversion",
                                            "Media Coverage",
                                            "Event Attendance",
                                            "App Downloads",
                                        ].map((metric) => (
                                            <div key={metric} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={metric.toLowerCase().replace(/\s+/g, "_")}
                                                    checked={formData.metrics.includes(metric.toLowerCase() as never)}
                                                    onCheckedChange={(checked) => {
                                                        if (checked) {
                                                            handleChange("metrics", [...formData.metrics, metric.toLowerCase()])
                                                        } else {
                                                            handleChange(
                                                                "metrics",
                                                                formData.metrics.filter((m: string) => m !== metric.toLowerCase()),
                                                            )
                                                        }
                                                    }}
                                                />
                                                <Label htmlFor={metric.toLowerCase().replace(/\s+/g, "_")}>{metric}</Label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 4: Additional Requirements */}
                        {currentStep === 3 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-4"
                            >
                                <div>
                                    <Label htmlFor="location">Geographic Preference</Label>
                                    <Input
                                        id="location"
                                        value={formData.location}
                                        onChange={(e) => handleChange("location", e.target.value)}
                                        placeholder="Enter preferred location(s)"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Leave blank if you have no geographic preference</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="socialMedia"
                                        checked={formData.socialMedia}
                                        onCheckedChange={(checked) => handleChange("socialMedia", !!checked)}
                                    />
                                    <Label htmlFor="socialMedia">Athlete must have strong social media presence</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="exclusivity"
                                        checked={formData.exclusivity}
                                        onCheckedChange={(checked) => handleChange("exclusivity", !!checked)}
                                    />
                                    <Label htmlFor="exclusivity">Require exclusivity in your product/service category</Label>
                                </div>
                                <div>
                                    <Label htmlFor="additionalInfo">Additional Information</Label>
                                    <Textarea
                                        id="additionalInfo"
                                        value={formData.additionalInfo}
                                        onChange={(e) => handleChange("additionalInfo", e.target.value)}
                                        placeholder="Any other requirements or information that would help us find the perfect match"
                                        rows={4}
                                    />
                                </div>
                            </motion.div>
                        )}
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button type="button" variant="outline" onClick={handleBack} disabled={currentStep === 0}>
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back
                        </Button>
                        {currentStep < steps.length - 1 ? (
                            <Button type="button" onClick={handleNext}>
                                Next <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        ) : (
                            <Button type="submit" disabled={isSubmitting} className="bg-teal-600 hover:bg-teal-700">
                                {isSubmitting ? "Finding Matches..." : "Find Matches"}
                                <Sparkles className="ml-2 h-4 w-4" />
                            </Button>
                        )}
                    </CardFooter>
                </Card>
            </form>
        </div>
    )
}

