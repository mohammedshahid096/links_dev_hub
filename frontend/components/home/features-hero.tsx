import { Zap, Shield, Rocket, Users, Globe, Layers } from "lucide-react";

export function FeaturesHero() {
  const features = [
    {
      title: "Discover Resources",
      description: "Find the best developer tools, libraries, and frameworks curated by the community.",
      icon: <Globe className="w-6 h-6" />,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
    },
    {
      title: "Organize Watchlist",
      description: "Keep track of interesting projects and websites in your own personalized dashboard.",
      icon: <Layers className="w-6 h-6" />,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20",
    },
    {
      title: "Fast & Lightweight",
      description: "Built with the latest technologies for a seamless and high-performance experience.",
      icon: <Zap className="w-6 h-6" />,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
    },
    {
      title: "Secure & Private",
      description: "Your data is protected with industry-standard security and authentication.",
      icon: <Shield className="w-6 h-6" />,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
    },
    {
      title: "Community Driven",
      description: "Contribute to the ecosystem by sharing your favorite links with other developers.",
      icon: <Users className="w-6 h-6" />,
      color: "text-rose-500",
      bg: "bg-rose-500/10",
      border: "border-rose-500/20",
    },
    {
      title: "Scale Your Knowledge",
      description: "Level up your development game with a continuous stream of fresh resources.",
      icon: <Rocket className="w-6 h-6" />,
      color: "text-indigo-500",
      bg: "bg-indigo-500/10",
      border: "border-indigo-500/20",
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            Built for the <span className="text-primary">Modern Developer</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Links Dev Hub provides the tools you need to streamline your research and discovery process. 
            All your essential developer resources in one beautiful place.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`p-8 rounded-2xl border ${feature.border} ${feature.bg} backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-lg group`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 border ${feature.border} bg-background group-hover:scale-110 transition-transform`}>
                <div className={feature.color}>
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Decorative background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10 animate-pulse" />
    </section>
  );
}
