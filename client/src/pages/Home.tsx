import { Navbar } from "@/components/Navbar";
import { HeroScene, FeatureScene } from "@/components/Scene3D";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactInquirySchema, type InsertContactInquiry } from "@shared/schema";
import { useSubmitContact } from "@/hooks/use-contact";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  MessageSquare, 
  ShieldCheck, 
  Users, 
  TrendingUp, 
  Megaphone,
  CheckCircle2,
  ArrowRight
} from "lucide-react";

// --- Components for sections ---

const FeatureCard = ({ icon: Icon, title, description, delay }: { icon: any, title: string, description: string, delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
  >
    <Card className="h-full border-border/50 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 hover:-translate-y-1">
      <CardHeader>
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
          <Icon className="w-6 h-6" />
        </div>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  </motion.div>
);

const PersonaCard = ({ title, description, icon: Icon, delay }: { title: string, description: string, icon: any, delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ rotateY: 5, scale: 1.02 }}
    className="perspective-1000"
  >
    <div className="p-8 rounded-2xl bg-white dark:bg-card border border-border shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col items-center text-center relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  </motion.div>
);

const Step = ({ number, title, description }: { number: string, title: string, description: string }) => (
  <div className="flex flex-col items-center text-center relative z-10">
    <div className="w-16 h-16 rounded-full bg-white border-4 border-blue-50 shadow-xl flex items-center justify-center text-2xl font-bold text-primary mb-6 z-10 relative">
      {number}
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-muted-foreground max-w-xs">{description}</p>
  </div>
);

export default function Home() {
  const form = useForm<InsertContactInquiry>({
    resolver: zodResolver(insertContactInquirySchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      googleId: "",
      institution: "",
    },
  });

  const mutation = useSubmitContact();

  const onSubmit = (data: InsertContactInquiry) => {
    mutation.mutate(data, {
      onSuccess: () => {
        form.reset();
      }
    });
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background font-sans overflow-x-hidden">
      <Navbar />

      {/* HERO SECTION */}
      <section id="hero" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <HeroScene />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 font-medium text-sm mb-8 border border-blue-100 dark:border-blue-800">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                New: AI-Powered Sentiment Analysis
              </div>
              
              <h1 className="text-5xl md:text-7xl font-display font-extrabold tracking-tight text-foreground mb-6 leading-tight">
                Transform Student Feedback into <span className="text-gradient">Actionable Insight</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                StudentVoice gives your institution a real-time dashboard to understand campus sentiment, address concerns proactively, and build a better student experience.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button 
                  size="lg" 
                  onClick={() => scrollToSection("cta")}
                  className="w-full sm:w-auto text-lg h-14 px-8 rounded-xl shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1 transition-all"
                >
                  Schedule a Demo
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => scrollToSection("features")}
                  className="w-full sm:w-auto text-lg h-14 px-8 rounded-xl bg-white/50 backdrop-blur-sm hover:bg-white/80 border-2"
                >
                  View Features
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Abstract background gradient */}
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-blue-50/50 to-transparent -z-20 pointer-events-none" />
      </section>

      {/* VALUE PROPOSITION */}
      <section className="py-24 bg-secondary/30 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Why StudentVoice?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We bridge the gap between student needs and administrative action with a platform built for modern higher education.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PersonaCard 
              title="Administrators" 
              description="Gain a clear, real-time view of campus climate to make data-driven decisions that improve retention and satisfaction."
              icon={TrendingUp}
              delay={0.1}
            />
            <PersonaCard 
              title="Department Heads" 
              description="Identify trends and pain points within specific departments to address curriculum or facility issues before they escalate."
              icon={Users}
              delay={0.2}
            />
            <PersonaCard 
              title="Students" 
              description="A trusted, structured, and optionally anonymous channel to be heard, ensuring their campus experience matters."
              icon={Megaphone}
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-24 relative overflow-hidden">
        <FeatureScene />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-2xl mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Powerful Features for Modern Institutions</h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to capture, analyze, and act on student feedback in one unified platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:w-2/3">
            <FeatureCard 
              icon={BarChart3}
              title="Real-Time Dashboard"
              description="Visualize campus sentiment instantly with live data streams. Track key metrics like satisfaction, safety, and engagement at a glance."
              delay={0.1}
            />
            <FeatureCard 
              icon={ShieldCheck}
              title="Anonymous Reporting"
              description="Create a safe space for honest feedback. Our secure anonymous reporting tool encourages students to share sensitive concerns without fear."
              delay={0.2}
            />
            <FeatureCard 
              icon={TrendingUp}
              title="Smart Analytics"
              description="AI-powered analysis detects trends and emerging issues automatically, saving your team hours of manual data processing."
              delay={0.3}
            />
            <FeatureCard 
              icon={CheckCircle2}
              title="Actionable Reports"
              description="Generate comprehensive PDF reports for board meetings and stakeholder updates with a single click. Turn data into narratives."
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24 bg-primary/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground text-lg">Streamlined process from feedback to resolution</p>
          </div>
          
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-8 left-1/6 right-1/6 h-0.5 bg-border -z-0" />
            
            <Step 
              number="1"
              title="Students Submit"
              description="Students share feedback via mobile app or web portal, categorized by department or topic."
            />
            <Step 
              number="2"
              title="You Analyze"
              description="Admins view aggregated data on the dashboard, identifying trends and high-priority items."
            />
            <Step 
              number="3"
              title="Campus Improves"
              description="Close the loop by addressing issues and communicating changes back to the student body."
            />
          </div>
        </div>
      </section>

      {/* CTA / PRICING */}
      <section id="cta" className="py-24 relative overflow-hidden bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-slate-900">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">Ready to Transform Student Feedback?</h2>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Experience how StudentVoice can help your institution capture real-time insights and improve campus life. Our prototype model is ready for your feedback.
              </p>
              <ul className="space-y-4">
                {[
                  "Real-time sentiment tracking",
                  "Secure and intuitive dashboard",
                  "Automated feedback categorization",
                  "Direct administrative action tools"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <Card className="p-8 shadow-2xl border-border/50">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="text-2xl font-bold">Get a Demo</CardTitle>
                <CardDescription>Fill out the form and our team will be in touch within 24 hours.</CardDescription>
              </CardHeader>
              <CardContent className="px-0 pb-0">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Dr. Jane Doe" {...field} className="h-12" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Work Email</FormLabel>
                          <FormControl>
                            <Input placeholder="jane@university.edu" type="email" {...field} className="h-12" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="+1 (555) 000-0000" {...field} value={field.value || ""} className="h-12" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="googleId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Google / Gmail ID</FormLabel>
                            <FormControl>
                              <Input placeholder="jane.doe@gmail.com" {...field} value={field.value || ""} className="h-12" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="institution"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Institution Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Bayside University" {...field} className="h-12" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full h-12 text-lg font-semibold mt-2" 
                      disabled={mutation.isPending}
                    >
                      {mutation.isPending ? "Sending..." : "Request Demo"}
                      {!mutation.isPending && <ArrowRight className="ml-2 w-4 h-4" />}
                    </Button>
                  </form>
                </Form>
                <div className="mt-6 text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <a href="https://students-voice-bay.vercel.app/login" className="text-primary hover:underline font-medium">
                    Sign In
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-secondary/20">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left text-lg">How is student privacy protected?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                We take privacy seriously. All data is encrypted in transit and at rest. Our anonymous reporting feature ensures that student identities are completely stripped from metadata unless they explicitly choose to identify themselves.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left text-lg">Can we customize the dashboard for our departments?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Absolutely. StudentVoice supports unlimited department hierarchies. You can create custom views and permissions for Deans, Department Heads, and Student Affairs staff so they only see relevant data.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left text-lg">How long does implementation take?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Most institutions are up and running within 2 weeks. We provide single sign-on (SSO) integration with major providers like Shibboleth, Okta, and Google Workspace to make onboarding seamless.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4 text-white">
                <img src="/logo.png" alt="StudentVoice Logo" className="w-8 h-8 rounded-lg" />
                <span className="text-xl font-bold">StudentVoice</span>
              </div>
              <p className="max-w-xs text-slate-400">
                Empowering educational institutions to listen, understand, and improve through data-driven student feedback.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => scrollToSection("features")} className="hover:text-white transition-colors">Features</button></li>
                <li><button onClick={() => scrollToSection("how-it-works")} className="hover:text-white transition-colors">How It Works</button></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="https://students-voice-bay.vercel.app/login" className="hover:text-white transition-colors">Sign In</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
            <p>&copy; {new Date().getFullYear()} StudentVoice. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
