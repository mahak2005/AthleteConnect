import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { AthleteProfile } from "@/components/sections/athlete-profile"
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function AthletePage() {
    const id = "1";
    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <main className="pt-16">
                {/* <AthleteProfile id={params.id} /> */}
                <AthleteProfile id={id} />
            </main>
            <Footer />
        </div>
    );
}

