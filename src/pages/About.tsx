import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MeetTheTeam from "@/components/MeetTheTeam";

const About = () => (
  <>
    <Header />
    <main className="pt-24">
      <section className="relative px-6 pt-16 pb-8 md:pt-24 overflow-hidden">
        <div className="absolute -top-24 right-0 w-[600px] h-[500px] rounded-full blur-3xl opacity-25 pointer-events-none bg-[radial-gradient(circle,hsl(151_57%_35%/0.25),transparent_70%)]" />
        <div className="relative max-w-7xl mx-auto">
          <div className="flex items-baseline gap-6 mb-8">
            <span className="eyebrow text-accent">About</span>
            <div className="flex-1 divider-elegant" />
          </div>
          <h1 className="font-display font-extrabold text-primary leading-[0.9] text-[3rem] md:text-[5.5rem] tracking-tight max-w-4xl">
            Building Africa's <span className="italic font-light text-accent">next</span> generation
            of technologists.
          </h1>
          <p className="mt-8 max-w-2xl text-primary/60 text-base md:text-lg leading-relaxed">
            Tech Hub Africa is a community, a campus and a launchpad — connecting students,
            founders and industry across the continent through programs, events and mentorship.
          </p>
        </div>
      </section>

      <MeetTheTeam />
    </main>
    <Footer />
  </>
);

export default About;
