import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BarChart3, Check, CheckCircle, Clock, Crown, DollarSign, ExternalLink, Globe, HelpCircle, Menu, MessageCircle, MessageSquare, Pen, Send, Shield, Sparkles, Star, ThumbsUp, Users, Wallet, X, Zap } from "lucide-react";
import { motion } from "framer-motion";
import binanceLogo from "@/assets/binance.png";
import bybitLogo from "@/assets/bybit.png";
import mexcLogo from "@/assets/mexc.png";
import solanaLogo from "@/assets/solana.png";

const TELEGRAM_LINK = "https://t.me/Nihalvai332?text=1️⃣%20My%20X%20profile%20link:%0A2️⃣%20Months:%206%20Months%0A3️⃣%20Payment:%20Wallet";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" as const } }
};

const rotateIn = {
  hidden: { opacity: 0, rotate: -8, scale: 0.9 },
  visible: { opacity: 1, rotate: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" as const } }
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.05 } }
};

const staggerFast = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } }
};

const pricingStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
};

const pricingCard = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } }
};

const scaleHover = { scale: 1.04, transition: { duration: 0.25, ease: "easeOut" as const } };
const ctaHover = { scale: 1.05, transition: { type: "spring" as const, stiffness: 400, damping: 18 } };
const ctaTap = { scale: 0.97 };

const glowPulse = {
  animate: {
    boxShadow: [
      "0 0 20px hsl(45,100%,55%,0.1)",
      "0 0 40px hsl(45,100%,55%,0.25)",
      "0 0 20px hsl(45,100%,55%,0.1)"
    ],
    transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
  }
};
// Animated counter hook
const useCounter = (target: number, duration = 2000, startCounting: boolean) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!startCounting) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, startCounting]);
  return count;
};

const Index = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [showFloatingCta, setShowFloatingCta] = useState(false);
  const [statsInView, setStatsInView] = useState(false);

  const customersServed = useCounter(20000, 2000, statsInView);
  const avgDeliveryTime = useCounter(30, 1500, statsInView);
  const satisfactionRate = useCounter(99, 2000, statsInView);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Show floating CTA after scrolling past hero
      const hero = document.querySelector("#hero");
      if (hero) {
        const heroBottom = hero.getBoundingClientRect().bottom;
        setShowFloatingCta(heroBottom < 0);
      }

      const sections = ["#faq", "#how-it-works", "#payment", "#pricing", "#hero"];
      for (const id of sections) {
        const el = document.querySelector(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom > 120) {
            setActiveSection(id);
            return;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
  { label: "Pricing", href: "#pricing" },
  { label: "Payment", href: "#payment" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" }];


  const scrollToSection = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Sticky Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ?
        "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-background/20" :
        "bg-transparent"}`
        }>
        
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between h-16">
          <button onClick={() => scrollToSection("#hero")} className="flex items-center gap-2 group">
            <Crown className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
            <span className="font-display font-bold text-lg text-foreground">X Premium</span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden sm:flex items-center gap-1">
            {navLinks.map((link) =>
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className={`px-3 py-2 text-sm font-medium transition-colors rounded-lg ${
              activeSection === link.href ?
              "text-primary bg-primary/10" :
              "text-muted-foreground hover:text-foreground hover:bg-accent/50"}`
              }>
              
                {link.label}
              </button>
            )}
            <motion.a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" whileHover={ctaHover} whileTap={ctaTap} className="inline-block">
              <Button size="sm" className="ml-2 bg-primary hover:bg-primary/90 text-primary-foreground">
                <Send className="w-3.5 h-3.5 mr-1.5" /> Order Now
              </Button>
            </motion.a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden p-2 text-muted-foreground hover:text-foreground transition-colors">
            
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen &&
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="sm:hidden bg-background/95 backdrop-blur-xl border-b border-border/50 px-4 pb-4">
          
            {navLinks.map((link) =>
          <button
            key={link.href}
            onClick={() => scrollToSection(link.href)}
            className={`block w-full text-left px-3 py-3 text-sm font-medium transition-colors rounded-lg ${
            activeSection === link.href ?
            "text-primary bg-primary/10" :
            "text-muted-foreground hover:text-foreground hover:bg-accent/50"}`
            }>
            
                {link.label}
              </button>
          )}
            <motion.a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" whileHover={ctaHover} whileTap={ctaTap} className="block mt-2">
              <Button size="sm" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                <Send className="w-3.5 h-3.5 mr-1.5" /> Order Now
              </Button>
            </motion.a>
          </motion.div>
        }
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-[90vh] flex items-center justify-center px-4 py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(ellipse_at_30%_20%,hsl(260,60%,25%)_0%,transparent_50%),radial-gradient(ellipse_at_70%_60%,hsl(210,100%,20%)_0%,transparent_50%),radial-gradient(ellipse_at_50%_80%,hsl(45,100%,15%)_0%,transparent_40%)] animate-pulse-glow" />
        </div>
        <div className="absolute inset-0 bg-background/40" />

        <motion.div
          className="relative z-10 text-center max-w-4xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}>
          
          <motion.div variants={scaleUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 mb-8">
            <Crown className="w-4 h-4 text-primary animate-float" />
            <span className="text-sm font-medium text-primary">Official X Gift System</span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl md:text-7xl font-bold font-display leading-tight mb-6">
            Get <motion.span
              className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple to-accent inline-block"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: "200% 200%" }}
            >X Premium</motion.span>
            <br />
            <span className="text-foreground/90">Delivered Directly by X</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Available 24/7 • Fast & Safe • Starting at just <span className="text-primary font-semibold">$5</span>
          </motion.p>

          <motion.div variants={scaleUp}>
            <motion.a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" whileHover={ctaHover} whileTap={ctaTap} className="inline-block">
              <Button size="lg" className="text-lg px-8 py-6 rounded-full bg-gradient-to-r from-primary to-gold shadow-[0_0_30px_hsl(45,100%,55%,0.3)] hover:shadow-[0_0_50px_hsl(45,100%,55%,0.5)] transition-all duration-300">
                <Send className="w-5 h-5 mr-2" />
                Message on Telegram
              </Button>
            </motion.a>
          </motion.div>
        </motion.div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer}>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold font-display text-center mb-4">
              Get X Premium <span className="text-primary">Verified Badge</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground text-center mb-12 max-w-lg mx-auto">
              Choose your plan and get X Premium delivered directly to your account
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05, margin: "0px 0px -10% 0px" }}
            variants={pricingStagger}>

            {/* 3 Months Card */}
            <motion.div variants={pricingCard} whileHover={scaleHover}>
              <Card className="relative border-border/50 bg-card/50 backdrop-blur-xl hover:border-primary/30 transition-all duration-300 h-full">
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-xl font-display">3 Months</CardTitle>
                  <div className="mt-4 flex items-baseline justify-center gap-2">
                    <span className="text-lg text-muted-foreground line-through">$24</span>
                    <span className="text-5xl font-bold font-display text-foreground">$5</span>
                    <span className="text-sm text-muted-foreground">USDT</span>
                  </div>
                  <Badge className="mt-2 bg-primary/20 text-primary border-primary/30 text-xs">Save 72%</Badge>
                </CardHeader>
                <CardContent className="space-y-4 pt-4">
                  <ul className="space-y-3">
                    {[
                    { icon: CheckCircle, label: "Verified checkmark" },
                    { icon: Sparkles, label: "Grok with increased limits" },
                    { icon: Sparkles, label: "Tag @Grok to create images" },
                    { icon: BarChart3, label: "Advanced analytics" },
                    { icon: Star, label: "Less ads in your feeds" },
                    { icon: MessageSquare, label: "Boosted replies" },
                    { icon: Pen, label: "Write Articles" },
                    { icon: DollarSign, label: "Get paid to post" },
                    { icon: Users, label: "Creator Subscriptions" },
                    { icon: Crown, label: "X Pro" }].
                    map((feat, i) =>
                    <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <feat.icon className="w-4 h-4 text-primary flex-shrink-0" /> {feat.label}
                      </li>
                    )}
                  </ul>
                  <motion.a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" className="block" whileHover={ctaHover} whileTap={ctaTap}>
                    <Button variant="outline" className="w-full mt-4 rounded-full border-primary/30 hover:bg-primary/10 hover:text-primary font-bold text-base py-5">
                      Buy Now
                    </Button>
                  </motion.a>
                </CardContent>
              </Card>
            </motion.div>

            {/* 6 Months Card */}
            <motion.div variants={pricingCard} whileHover={scaleHover}>
              <Card className="relative border-primary/40 bg-card/50 backdrop-blur-xl shadow-[0_0_40px_hsl(45,100%,55%,0.1)] hover:shadow-[0_0_60px_hsl(45,100%,55%,0.15)] transition-all duration-300 h-full">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-primary to-gold text-primary-foreground border-0 px-4 py-1 text-xs font-semibold shadow-lg">
                    <Sparkles className="w-3 h-3 mr-1" /> Most Popular
                  </Badge>
                </div>
                <CardHeader className="text-center pb-2 pt-8">
                  <CardTitle className="text-xl font-display">6 Months</CardTitle>
                  <div className="mt-4 flex items-baseline justify-center gap-2">
                    <span className="text-lg text-muted-foreground line-through">$45</span>
                    <span className="text-5xl font-bold font-display text-primary">$8</span>
                    <span className="text-sm text-muted-foreground">USDT</span>
                  </div>
                  <Badge className="mt-2 bg-primary/20 text-primary border-primary/30 text-xs">Save 78%</Badge>
                </CardHeader>
                <CardContent className="space-y-4 pt-4">
                  <ul className="space-y-3">
                    {[
                    { icon: CheckCircle, label: "Verified checkmark" },
                    { icon: Sparkles, label: "Grok with increased limits" },
                    { icon: Sparkles, label: "Tag @Grok to create images" },
                    { icon: BarChart3, label: "Advanced analytics" },
                    { icon: Star, label: "Less ads in your feeds" },
                    { icon: MessageSquare, label: "Boosted replies" },
                    { icon: Pen, label: "Write Articles" },
                    { icon: DollarSign, label: "Get paid to post" },
                    { icon: Users, label: "Creator Subscriptions" },
                    { icon: Crown, label: "X Pro" }].
                    map((feat, i) =>
                    <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <feat.icon className="w-4 h-4 text-primary flex-shrink-0" /> {feat.label}
                      </li>
                    )}
                  </ul>
                  <motion.a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" className="block" whileHover={ctaHover} whileTap={ctaTap}>
                    <Button className="w-full mt-4 rounded-full bg-gradient-to-r from-primary to-gold text-primary-foreground shadow-[0_0_20px_hsl(45,100%,55%,0.2)] hover:shadow-[0_0_30px_hsl(45,100%,55%,0.4)] font-bold text-base py-5">
                      Buy Now
                    </Button>
                  </motion.a>
                </CardContent>
              </Card>
            </motion.div>

            {/* 12 Months Card */}
            <motion.div variants={pricingCard} whileHover={scaleHover}>
              <Card className="relative border-border/50 bg-card/50 backdrop-blur-xl hover:border-primary/30 transition-all duration-300 h-full">
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-xl font-display">12 Months</CardTitle>
                  <div className="mt-4 flex items-baseline justify-center gap-2">
                    <span className="text-lg text-muted-foreground line-through">$80</span>
                    <span className="text-5xl font-bold font-display text-foreground">$14</span>
                    <span className="text-sm text-muted-foreground">USDT</span>
                  </div>
                  <Badge className="mt-2 bg-primary/20 text-primary border-primary/30 text-xs">Save 81%</Badge>
                </CardHeader>
                <CardContent className="space-y-4 pt-4">
                  <ul className="space-y-3">
                    {[
                    { icon: CheckCircle, label: "Verified checkmark" },
                    { icon: Sparkles, label: "Grok with increased limits" },
                    { icon: Sparkles, label: "Tag @Grok to create images" },
                    { icon: BarChart3, label: "Advanced analytics" },
                    { icon: Star, label: "Less ads in your feeds" },
                    { icon: MessageSquare, label: "Boosted replies" },
                    { icon: Pen, label: "Write Articles" },
                    { icon: DollarSign, label: "Get paid to post" },
                    { icon: Users, label: "Creator Subscriptions" },
                    { icon: Crown, label: "X Pro" }].
                    map((feat, i) =>
                    <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <feat.icon className="w-4 h-4 text-primary flex-shrink-0" /> {feat.label}
                      </li>
                    )}
                  </ul>
                  <motion.a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" className="block" whileHover={ctaHover} whileTap={ctaTap}>
                    <Button variant="outline" className="w-full mt-4 rounded-full border-primary/30 hover:bg-primary/10 hover:text-primary font-bold text-base py-5">
                      Buy Now
                    </Button>
                  </motion.a>
                </CardContent>
              </Card>
            </motion.div>

            {/* 3 Months Plus Card */}
            <motion.div variants={pricingCard} whileHover={scaleHover}>
              <Card className="relative border-purple-500/30 bg-card/50 backdrop-blur-xl hover:border-purple-500/50 transition-all duration-300 h-full">
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-xl font-display text-purple-400">3 Months Plus</CardTitle>
                  <div className="mt-4 flex items-baseline justify-center gap-2">
                    <span className="text-lg text-muted-foreground line-through">$151</span>
                    <span className="text-5xl font-bold font-display text-foreground">$9</span>
                    <span className="text-sm text-muted-foreground">USDT</span>
                  </div>
                  <Badge className="mt-2 bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs">Save 70%</Badge>
                </CardHeader>
                <CardContent className="space-y-4 pt-4">
                  <ul className="space-y-3">
                    {[
                    { icon: CheckCircle, label: "Verified checkmark" },
                    { icon: Sparkles, label: "Grok with increased limits" },
                    { icon: Sparkles, label: "Tag @Grok to create images" },
                    { icon: BarChart3, label: "Advanced analytics" },
                    { icon: Star, label: "Less ads in your feeds" },
                    { icon: MessageSquare, label: "Boosted replies" },
                    { icon: Pen, label: "Write Articles" },
                    { icon: DollarSign, label: "Get paid to post" },
                    { icon: Users, label: "Creator Subscriptions" },
                    { icon: Crown, label: "X Pro" }].
                    map((feat, i) =>
                    <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <feat.icon className="w-4 h-4 text-purple-400 flex-shrink-0" /> {feat.label}
                      </li>
                    )}
                  </ul>
                  <motion.a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" className="block" whileHover={ctaHover} whileTap={ctaTap}>
                    <Button variant="outline" className="w-full mt-4 rounded-full border-purple-500/30 hover:bg-purple-500/10 hover:text-purple-300 font-bold text-base py-5">
                      Buy Now
                    </Button>
                  </motion.a>
                </CardContent>
              </Card>
            </motion.div>

            {/* 6 Months Plus Card */}
            <motion.div variants={pricingCard} whileHover={scaleHover}>
              <Card className="relative border-purple-500/30 bg-card/50 backdrop-blur-xl hover:border-purple-500/50 transition-all duration-300 h-full">
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-xl font-display text-purple-400">6 Months Plus</CardTitle>
                  <div className="mt-4 flex items-baseline justify-center gap-2">
                    <span className="text-lg text-muted-foreground line-through">$302</span>
                    <span className="text-5xl font-bold font-display text-foreground">$15</span>
                    <span className="text-sm text-muted-foreground">USDT</span>
                  </div>
                  <Badge className="mt-2 bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs">Save 75%</Badge>
                </CardHeader>
                <CardContent className="space-y-4 pt-4">
                  <ul className="space-y-3">
                    {[
                    { icon: CheckCircle, label: "Verified checkmark" },
                    { icon: Sparkles, label: "Grok with increased limits" },
                    { icon: Sparkles, label: "Tag @Grok to create images" },
                    { icon: BarChart3, label: "Advanced analytics" },
                    { icon: Star, label: "Less ads in your feeds" },
                    { icon: MessageSquare, label: "Boosted replies" },
                    { icon: Pen, label: "Write Articles" },
                    { icon: DollarSign, label: "Get paid to post" },
                    { icon: Users, label: "Creator Subscriptions" },
                    { icon: Crown, label: "X Pro" }].
                    map((feat, i) =>
                    <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <feat.icon className="w-4 h-4 text-purple-400 flex-shrink-0" /> {feat.label}
                      </li>
                    )}
                  </ul>
                  <motion.a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" className="block" whileHover={ctaHover} whileTap={ctaTap}>
                    <Button variant="outline" className="w-full mt-4 rounded-full border-purple-500/30 hover:bg-purple-500/10 hover:text-purple-300 font-bold text-base py-5">
                      Buy Now
                    </Button>
                  </motion.a>
                </CardContent>
              </Card>
            </motion.div>

            {/* 12 Months Plus Card */}
            <motion.div variants={pricingCard} whileHover={scaleHover}>
              <Card className="relative border-purple-500/30 bg-card/50 backdrop-blur-xl hover:border-purple-500/50 transition-all duration-300 h-full">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-purple-500 to-purple-700 text-white border-0 px-4 py-1 text-xs font-semibold shadow-lg">
                    <Sparkles className="w-3 h-3 mr-1" /> Best Value
                  </Badge>
                </div>
                <CardHeader className="text-center pb-2 pt-8">
                  <CardTitle className="text-xl font-display text-purple-400">12 Months Plus</CardTitle>
                  <div className="mt-4 flex items-baseline justify-center gap-2">
                    <span className="text-lg text-muted-foreground line-through">$407</span>
                    <span className="text-5xl font-bold font-display text-purple-400">$20</span>
                    <span className="text-sm text-muted-foreground">USDT</span>
                  </div>
                  <Badge className="mt-2 bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs">Save 83%</Badge>
                </CardHeader>
                <CardContent className="space-y-4 pt-4">
                  <ul className="space-y-3">
                    {[
                    { icon: CheckCircle, label: "Verified checkmark" },
                    { icon: Sparkles, label: "Grok with increased limits" },
                    { icon: Sparkles, label: "Tag @Grok to create images" },
                    { icon: BarChart3, label: "Advanced analytics" },
                    { icon: Star, label: "Less ads in your feeds" },
                    { icon: MessageSquare, label: "Boosted replies" },
                    { icon: Pen, label: "Write Articles" },
                    { icon: DollarSign, label: "Get paid to post" },
                    { icon: Users, label: "Creator Subscriptions" },
                    { icon: Crown, label: "X Pro" }].
                    map((feat, i) =>
                    <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <feat.icon className="w-4 h-4 text-purple-400 flex-shrink-0" /> {feat.label}
                      </li>
                    )}
                  </ul>
                  <motion.a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" className="block" whileHover={ctaHover} whileTap={ctaTap}>
                    <Button className="w-full mt-4 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 text-white shadow-[0_0_20px_hsl(270,60%,50%,0.2)] hover:shadow-[0_0_30px_hsl(270,60%,50%,0.4)] font-bold text-base py-5">
                      Buy Now
                    </Button>
                  </motion.a>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-xs text-muted-foreground text-center mt-6">
            
            📌 If you take a 3-month subscription once, you can take another only after it ends.
          </motion.p>
        </div>
      </section>

      {/* Payment Options */}
      <section id="payment" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer}>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold font-display text-center mb-4">
              Payment <span className="text-primary">Options</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground text-center mb-4 max-w-xl mx-auto text-sm">
              ✅ Please select your payment option carefully and double-check that the UID or wallet address is correct before proceeding.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-10"
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
            variants={staggerFast}>
            
            {[
            { name: "BEP20 / ERC20", logo: null },
            { name: "Binance", logo: binanceLogo },
            { name: "Bybit", logo: bybitLogo },
            { name: "MEXC", logo: mexcLogo },
            { name: "Solana", logo: solanaLogo }].
            map((method) =>
            <motion.div key={method.name} variants={scaleUp} whileHover={scaleHover}>
                <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-card/50 backdrop-blur border border-border/50 hover:border-primary/30 transition-all duration-300 h-full">
                  {method.logo ?
                <img src={method.logo} alt={method.name} className="w-12 h-12 rounded-xl object-cover" /> :

                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <Wallet className="w-6 h-6 text-primary" />
                    </div>
                }
                  <span className="text-sm font-semibold font-display text-foreground text-center">{method.name}</span>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      <section id="how-it-works" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp}
            className="text-3xl sm:text-4xl font-bold font-display text-center mb-12">
            
            How It <span className="text-primary">Works</span>
          </motion.h2>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
            variants={staggerFast}>
            
            {[
            { step: "1", icon: Send, title: "Send Profile Link", desc: "Share your X profile link via Telegram" },
            { step: "2", icon: Crown, title: "Choose Duration", desc: "Pick 3 months ($5) or 6 months ($8)" },
            { step: "3", icon: Zap, title: "Pay Securely", desc: "Wallet or Exchange — your choice" },
            { step: "4", icon: Check, title: "Get Premium", desc: "Receive X Premium directly on your account" }].
            map((item) =>
            <motion.div key={item.step} variants={rotateIn} whileHover={scaleHover} className="relative group">
                <div className="p-6 rounded-2xl bg-card/50 backdrop-blur border border-border/50 hover:border-primary/30 transition-all duration-300 text-center h-full">
                  <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-xs text-primary font-semibold mb-2">Step {item.step}</div>
                  <h3 className="font-display font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Eligibility & Notes */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp}
            className="text-3xl sm:text-4xl font-bold font-display text-center mb-12">
            
            Important <span className="text-primary">Notes</span>
          </motion.h2>

          <motion.div
            className="space-y-4"
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}>
            
            {[
            { icon: "1️⃣", text: "If your account is already verified on X, this will not work. After the verification period ends, cancel your subscription and try again." },
            { icon: "2️⃣", text: "If your account is not eligible, message us again after 1–3 days — it should become eligible." },
            { icon: "👉", text: "Don't change your X name, profile picture, or cover photo during the process, or your account may become ineligible." },
            { icon: "📌", text: "A 3-month subscription can only be taken once per cycle. You can subscribe again after the current one ends." }].
            map((note, i) =>
            <motion.div key={i} variants={fadeUp} className="flex gap-4 p-5 rounded-xl bg-card/50 backdrop-blur border border-border/50">
                <span className="text-xl flex-shrink-0">{note.icon}</span>
                <p className="text-sm text-muted-foreground leading-relaxed">{note.text}</p>
              </motion.div>
            )}
          </motion.div>

          {/* How to Cancel Subscription */}
          <motion.div
            className="mt-12"
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}>
            
            <motion.h3 variants={fadeUp} className="text-xl sm:text-2xl font-bold font-display text-center mb-2">
              How to <span className="text-primary">Cancel</span> an Existing Subscription
            </motion.h3>
            <motion.p variants={fadeUp} className="text-sm text-muted-foreground text-center mb-8">
              If you already have X Premium via Google Play, follow these steps to cancel it first
            </motion.p>

            <motion.div
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
              variants={staggerContainer}>
              
              {[
              { step: "1", title: "Open Play Store", desc: "Tap your profile icon → Payments & subscriptions" },
              { step: "2", title: "Go to Subscriptions", desc: "Select \"Subscriptions\" from the menu" },
              { step: "3", title: "Find X Premium", desc: "Look under Expired or Active and tap \"Remove\"" },
              { step: "4", title: "Confirm Removal", desc: "Tap \"Remove\" to confirm — then you're ready!" }].
              map((item) =>
              <motion.div key={item.step} variants={fadeUp} whileHover={scaleHover} className="p-5 rounded-xl bg-card/50 backdrop-blur border border-border/50 text-center">
                  <div className="w-10 h-10 rounded-full bg-destructive/10 border border-destructive/20 flex items-center justify-center mx-auto mb-3">
                    <span className="text-sm font-bold text-destructive">{item.step}</span>
                  </div>
                  <h4 className="font-display font-semibold text-foreground text-sm mb-1">{item.title}</h4>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="py-20 px-4">
        <motion.div
          className="max-w-3xl mx-auto"
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
          variants={scaleUp}>
          
          <motion.div
            className="relative rounded-2xl overflow-hidden"
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}>
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 via-accent/20 to-primary/20" />
            <div className="relative p-8 sm:p-12 text-center border border-primary/20 rounded-2xl backdrop-blur">
              <motion.div variants={scaleUp}>
                <Shield className="w-12 h-12 text-primary mx-auto mb-6 animate-float" />
              </motion.div>
              <motion.h3 variants={fadeUp} className="text-2xl sm:text-3xl font-bold font-display mb-4">
                100% Safe & Official
              </motion.h3>
              <motion.p variants={fadeUp} className="text-muted-foreground max-w-xl mx-auto mb-3">
                This is provided directly by X as a gift — not through any website or third party.
              </motion.p>
              <motion.p variants={fadeUp} className="text-muted-foreground max-w-xl mx-auto">
                Everything is delivered via X's official system directly to your account. There is <span className="text-primary font-semibold">no risk</span> of any issues.
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <motion.div
          className="max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          onViewportEnter={() => setStatsInView(true)}
        >
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold font-display text-center mb-12">
            Trusted by <span className="text-primary">Thousands</span>
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Numeric stat: Customers */}
            <motion.div variants={scaleUp} className="relative rounded-2xl border border-border/50 bg-card/50 backdrop-blur p-8 text-center overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Users className="w-8 h-8 text-primary mx-auto mb-4" />
              <div className="text-4xl sm:text-5xl font-bold font-display text-foreground mb-2">
                {customersServed}+
              </div>
              <p className="text-sm text-muted-foreground">Customers Served</p>
            </motion.div>

            {/* Numeric stat: Delivery Time */}
            <motion.div variants={scaleUp} className="relative rounded-2xl border border-border/50 bg-card/50 backdrop-blur p-8 text-center overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Clock className="w-8 h-8 text-accent mx-auto mb-4" />
              <div className="text-4xl sm:text-5xl font-bold font-display text-foreground mb-2">
                {avgDeliveryTime}<span className="text-2xl text-muted-foreground">min</span>
              </div>
              <p className="text-sm text-muted-foreground">Avg. Delivery Time</p>
            </motion.div>

            {/* Numeric stat: Satisfaction */}
            <motion.div variants={scaleUp} className="relative rounded-2xl border border-border/50 bg-card/50 backdrop-blur p-8 text-center overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <ThumbsUp className="w-8 h-8 text-primary mx-auto mb-4" />
              <div className="text-4xl sm:text-5xl font-bold font-display text-foreground mb-2">
                {satisfactionRate}<span className="text-2xl text-primary">%</span>
              </div>
              <p className="text-sm text-muted-foreground">Satisfaction Rate</p>
            </motion.div>

            {/* Non-numeric stat: Availability */}
            <motion.div variants={scaleUp} className="relative rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-card/50 to-accent/10 backdrop-blur p-8 text-center overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Globe className="w-8 h-8 text-primary mx-auto" />
              </motion.div>
              <div className="mt-4 text-2xl sm:text-3xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-2">
                24/7
              </div>
              <p className="text-sm text-muted-foreground">Always Available</p>
              <motion.div
                className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-xs text-primary font-medium"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Online Now
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer}>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold font-display text-center mb-4">
              What Our <span className="text-primary">Customers</span> Say
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground text-center mb-12 max-w-lg mx-auto">
              Trusted by thousands of satisfied X users worldwide
            </motion.p>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}>
            
            {[
            {
              name: "Cooper",
              handle: "@alex_dev",
              text: "Got my verified badge in under 30 minutes! Super fast and completely safe. Highly recommend this service.",
              rating: 5
            },
            {
              name: "Georgi",
              handle: "@sarahcreates",
              text: "I was skeptical at first, but the process was smooth and legit. My account got Premium directly from X. Amazing!",
              rating: 5
            },
            {
              name: "Brandão",
              handle: "@jamesk_crypto",
              text: "Best deal I've found for X Premium. Paid $8 for 6 months — can't beat that. Already renewed once!",
              rating: 5
            },
            {
              name: "Matheus",
              handle: "@priya_writes",
              text: "The seller was super responsive on Telegram and walked me through the whole process. 10/10 experience.",
              rating: 5
            },
            {
              name: "Daemon",
              handle: "@omar_trades",
              text: "Paid with Binance, got verified the same day. No issues at all. Will be recommending to my followers.",
              rating: 5
            },
            {
              name: "Ben",
              handle: "@lisawanders",
              text: "Finally got the blue checkmark without paying the full price. Legitimate service, very professional.",
              rating: 5
            }].
            map((review, i) =>
            <motion.div key={i} variants={scaleUp} whileHover={scaleHover}>
                <div className="p-6 rounded-2xl bg-card/50 backdrop-blur border border-border/50 hover:border-primary/30 transition-all duration-300 h-full flex flex-col">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: review.rating }).map((_, j) =>
                  <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                  )}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                    "{review.text}"
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-border/30">
                    <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">{review.name[0]}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{review.name}</p>
                      
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp}
            className="text-3xl sm:text-4xl font-bold font-display text-center mb-4">
            
            Frequently Asked <span className="text-primary">Questions</span>
          </motion.h2>
          <motion.p
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp}
            className="text-muted-foreground text-center mb-12 max-w-lg mx-auto">
            
            Got questions? We've got answers.
          </motion.p>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}>
            
            <Accordion type="single" collapsible className="space-y-3">
              {[
              {
                q: "Is this safe? Will my account get banned?",
                a: "Absolutely safe. X Premium is delivered directly by X as an official gift to your account. There is zero risk of any ban or suspension."
              },
              {
                q: "How long does it take to receive X Premium?",
                a: "Usually within a few minutes to a couple of hours after payment is confirmed. We're available 24/7 to process your order."
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept USDT (Tether) via wallet transfer or exchange. Full payment instructions are provided after you message us on Telegram."
              },
              {
                q: "Can I buy X Premium if I already have it?",
                a: "No — if your account is already verified, you need to wait for your current subscription to expire, cancel it, and then contact us."
              },
              {
                q: "What if my account is not eligible?",
                a: "If your account isn't eligible right away, wait 1–3 days and message us again. Most accounts become eligible within that time."
              },
              {
                q: "Can I get a refund?",
                a: "Since X Premium is delivered directly to your account by X, refunds are not possible once the gift has been sent. Please make sure your account is eligible before purchasing."
              },
              {
                q: "Do I need to share my password?",
                a: "Never! We only need your X profile link. We will never ask for your password or any login credentials."
              }].
              map((faq, i) =>
              <motion.div key={i} variants={fadeUp}>
                  <AccordionItem value={`faq-${i}`} className="rounded-xl border border-border/50 bg-card/50 backdrop-blur px-5 data-[state=open]:border-primary/30 transition-colors">
                    <AccordionTrigger className="text-sm font-semibold text-foreground hover:text-primary hover:no-underline py-4">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              )}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border/50">
        <motion.div
          className="max-w-4xl mx-auto text-center space-y-6"
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={staggerContainer}>
          
          <motion.a variants={scaleUp} whileHover={ctaHover} whileTap={ctaTap} href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" className="inline-block">
            <Button size="lg" className="rounded-full bg-gradient-to-r from-primary to-gold text-primary-foreground px-8 shadow-[0_0_30px_hsl(45,100%,55%,0.2)]">
              <MessageCircle className="w-5 h-5 mr-2" />
              Contact on Telegram
            </Button>
          </motion.a>

          <motion.div variants={fadeUp} className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Available 24/7
          </motion.div>

          <motion.p variants={fadeUp} className="text-xs text-muted-foreground/60">
            X Premium Sales • Fast & Reliable Service
          </motion.p>
        </motion.div>
      </footer>

      {/* Floating Order Now CTA */}
      <motion.a
        href={TELEGRAM_LINK}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 40, scale: 0.8 }}
        animate={showFloatingCta ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.8 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        whileHover={ctaHover}
        whileTap={ctaTap}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-primary-foreground font-bold shadow-lg pointer-events-auto"
        style={{ pointerEvents: showFloatingCta ? "auto" : "none" }}
      >
        <Send className="w-5 h-5" />
        Order Now
      </motion.a>
    </div>);

};

export default Index;