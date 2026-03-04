import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Check, CheckCircle, Crown, DollarSign, ExternalLink, MessageCircle, MessageSquare, Pen, Send, Shield, Sparkles, Star, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";

const TELEGRAM_LINK = "https://t.me/Nihalvai332";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const scaleHover = { scale: 1.02, transition: { duration: 0.2 } };

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4 py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(ellipse_at_30%_20%,hsl(260,60%,25%)_0%,transparent_50%),radial-gradient(ellipse_at_70%_60%,hsl(210,100%,20%)_0%,transparent_50%),radial-gradient(ellipse_at_50%_80%,hsl(45,100%,15%)_0%,transparent_40%)] animate-pulse-glow" />
        </div>
        <div className="absolute inset-0 bg-background/40" />

        <motion.div
          className="relative z-10 text-center max-w-4xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 mb-8">
            <Crown className="w-4 h-4 text-primary animate-float" />
            <span className="text-sm font-medium text-primary">Official X Gift System</span>
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl md:text-7xl font-bold font-display leading-tight mb-6">
            Get <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple to-accent">X Premium</span>
            <br />
            <span className="text-foreground/90">Delivered Directly by X</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Available 24/7 • Fast & Safe • Starting at just <span className="text-primary font-semibold">$5</span>
          </motion.p>

          <motion.div variants={fadeUp}>
            <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="text-lg px-8 py-6 rounded-full bg-gradient-to-r from-primary to-gold shadow-[0_0_30px_hsl(45,100%,55%,0.3)] hover:shadow-[0_0_50px_hsl(45,100%,55%,0.5)] hover:scale-105 transition-all duration-300">
                <Send className="w-5 h-5 mr-2" />
                Message on Telegram
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Pricing Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer}>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold font-display text-center mb-4">
              Get X Premium <span className="text-primary">Verified Badge</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground text-center mb-12 max-w-lg mx-auto">
              Choose your plan and get X Premium delivered directly to your account
            </motion.p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {/* 3 Months Card */}
            <motion.div variants={fadeUp} whileHover={scaleHover}>
              <Card className="relative border-border/50 bg-card/50 backdrop-blur-xl hover:border-primary/30 transition-all duration-300 h-full">
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-xl font-display">3 Months</CardTitle>
                  <div className="mt-4 flex items-baseline justify-center gap-2">
                    <span className="text-lg text-muted-foreground line-through">$18</span>
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
                      { icon: Crown, label: "X Pro" },
                    ].map((feat, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <feat.icon className="w-4 h-4 text-primary flex-shrink-0" /> {feat.label}
                      </li>
                    ))}
                  </ul>
                  <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" className="block">
                    <Button variant="outline" className="w-full mt-4 rounded-full border-primary/30 hover:bg-primary/10 hover:text-primary font-bold text-base py-5">
                      Buy Now
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </motion.div>

            {/* 6 Months Card */}
            <motion.div variants={fadeUp} whileHover={scaleHover}>
              <Card className="relative border-primary/40 bg-card/50 backdrop-blur-xl shadow-[0_0_40px_hsl(45,100%,55%,0.1)] hover:shadow-[0_0_60px_hsl(45,100%,55%,0.15)] transition-all duration-300 h-full">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-primary to-gold text-primary-foreground border-0 px-4 py-1 text-xs font-semibold shadow-lg">
                    <Sparkles className="w-3 h-3 mr-1" /> Most Popular
                  </Badge>
                </div>
                <CardHeader className="text-center pb-2 pt-8">
                  <CardTitle className="text-xl font-display">6 Months</CardTitle>
                  <div className="mt-4 flex items-baseline justify-center gap-2">
                    <span className="text-lg text-muted-foreground line-through">$36</span>
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
                      { icon: Crown, label: "X Pro" },
                    ].map((feat, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <feat.icon className="w-4 h-4 text-primary flex-shrink-0" /> {feat.label}
                      </li>
                    ))}
                  </ul>
                  <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" className="block">
                    <Button className="w-full mt-4 rounded-full bg-gradient-to-r from-primary to-gold text-primary-foreground shadow-[0_0_20px_hsl(45,100%,55%,0.2)] hover:shadow-[0_0_30px_hsl(45,100%,55%,0.4)] font-bold text-base py-5">
                      Buy Now
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-xs text-muted-foreground text-center mt-6"
          >
            📌 If you take a 3-month subscription once, you can take another only after it ends.
          </motion.p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp}
            className="text-3xl sm:text-4xl font-bold font-display text-center mb-12"
          >
            How It <span className="text-primary">Works</span>
          </motion.h2>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {[
              { step: "1", icon: Send, title: "Send Profile Link", desc: "Share your X profile link via Telegram" },
              { step: "2", icon: Crown, title: "Choose Duration", desc: "Pick 3 months ($5) or 6 months ($8)" },
              { step: "3", icon: Zap, title: "Pay Securely", desc: "Wallet or Exchange — your choice" },
              { step: "4", icon: Check, title: "Get Premium", desc: "Receive X Premium directly on your account" },
            ].map((item) => (
              <motion.div key={item.step} variants={fadeUp} whileHover={scaleHover} className="relative group">
                <div className="p-6 rounded-2xl bg-card/50 backdrop-blur border border-border/50 hover:border-primary/30 transition-all duration-300 text-center h-full">
                  <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-xs text-primary font-semibold mb-2">Step {item.step}</div>
                  <h3 className="font-display font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Eligibility & Notes */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp}
            className="text-3xl sm:text-4xl font-bold font-display text-center mb-12"
          >
            Important <span className="text-primary">Notes</span>
          </motion.h2>

          <motion.div
            className="space-y-4"
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {[
              { icon: "1️⃣", text: "If your account is already verified on X, this will not work. After the verification period ends, cancel your subscription and try again." },
              { icon: "2️⃣", text: "If your account is not eligible, message us again after 1–3 days — it should become eligible." },
              { icon: "👉", text: "Don't change your X name, profile picture, or cover photo during the process, or your account may become ineligible." },
              { icon: "📌", text: "A 3-month subscription can only be taken once per cycle. You can subscribe again after the current one ends." },
            ].map((note, i) => (
              <motion.div key={i} variants={fadeUp} className="flex gap-4 p-5 rounded-xl bg-card/50 backdrop-blur border border-border/50">
                <span className="text-xl flex-shrink-0">{note.icon}</span>
                <p className="text-sm text-muted-foreground leading-relaxed">{note.text}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* How to Cancel Subscription */}
          <motion.div
            className="mt-12"
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.h3 variants={fadeUp} className="text-xl sm:text-2xl font-bold font-display text-center mb-2">
              How to <span className="text-primary">Cancel</span> an Existing Subscription
            </motion.h3>
            <motion.p variants={fadeUp} className="text-sm text-muted-foreground text-center mb-8">
              If you already have X Premium via Google Play, follow these steps to cancel it first
            </motion.p>

            <motion.div
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
              variants={staggerContainer}
            >
              {[
                { step: "1", title: "Open Play Store", desc: "Tap your profile icon → Payments & subscriptions" },
                { step: "2", title: "Go to Subscriptions", desc: "Select \"Subscriptions\" from the menu" },
                { step: "3", title: "Find X Premium", desc: "Look under Expired or Active and tap \"Remove\"" },
                { step: "4", title: "Confirm Removal", desc: "Tap \"Remove\" to confirm — then you're ready!" },
              ].map((item) => (
                <motion.div key={item.step} variants={fadeUp} whileHover={scaleHover} className="p-5 rounded-xl bg-card/50 backdrop-blur border border-border/50 text-center">
                  <div className="w-10 h-10 rounded-full bg-destructive/10 border border-destructive/20 flex items-center justify-center mx-auto mb-3">
                    <span className="text-sm font-bold text-destructive">{item.step}</span>
                  </div>
                  <h4 className="font-display font-semibold text-foreground text-sm mb-1">{item.title}</h4>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="py-20 px-4">
        <motion.div
          className="max-w-3xl mx-auto"
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 via-accent/20 to-primary/20" />
            <div className="relative p-8 sm:p-12 text-center border border-primary/20 rounded-2xl backdrop-blur">
              <Shield className="w-12 h-12 text-primary mx-auto mb-6 animate-float" />
              <h3 className="text-2xl sm:text-3xl font-bold font-display mb-4">
                100% Safe & Official
              </h3>
              <p className="text-muted-foreground max-w-xl mx-auto mb-3">
                This is provided directly by X as a gift — not through any website or third party.
              </p>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Everything is delivered via X's official system directly to your account. There is <span className="text-primary font-semibold">no risk</span> of any issues.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border/50">
        <motion.div
          className="max-w-4xl mx-auto text-center space-y-6"
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={fadeUp}
        >
          <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="rounded-full bg-gradient-to-r from-primary to-gold text-primary-foreground px-8 shadow-[0_0_30px_hsl(45,100%,55%,0.2)] hover:scale-105 transition-transform duration-300">
              <MessageCircle className="w-5 h-5 mr-2" />
              Contact on Telegram
            </Button>
          </a>

          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Available 24/7
          </div>

          <p className="text-xs text-muted-foreground/60">
            X Premium Sales • Fast & Reliable Service
          </p>
        </motion.div>
      </footer>
    </div>
  );
};

export default Index;
