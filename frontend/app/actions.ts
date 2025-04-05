"use server"

interface EmailData {
    email: string
    name: string
    eventTitle: string
    eventDate: string
    eventTime: string
}

export async function sendRegistrationEmail(data: EmailData) {
    // In a real application, this would use a service like SendGrid, Mailchimp, etc.
    // For now, we'll just log the email data
    console.log("Sending registration confirmation email to:", data.email)
    console.log("Email data:", data)

    // Simulate email sending delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Return success
    return { success: true }
}

