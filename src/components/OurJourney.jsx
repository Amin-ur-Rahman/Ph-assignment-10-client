const OurJourney = () => {
  return (
    <section className="py-16 border-y border-neutral/10">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1">
          <h2 className="text-xl md:text-2xl font-bold text-text uppercase tracking-tight mb-6">
            Our Journey
          </h2>
          <p className="text-neutral text-sm leading-relaxed mb-4">
            Started by a small group of street food enthusiasts in 2024, **Local
            Food Lovers** was born out of a frustration with "plastic" reviews
            on major corporate platforms.
          </p>
          <p className="text-neutral text-sm leading-relaxed mb-6">
            We believe the best flavors are found in the hidden corners of our
            neighborhoods. Our mission is to preserve local culinary culture by
            giving a voice to real people and their real experiences.
          </p>
          <a
            href="/about"
            className="px-8 py-3 bg-primary text-background font-bold rounded-md text-xs uppercase tracking-widest hover:opacity-90"
          >
            Learn More
          </a>
        </div>
        <div className="order-1 md:order-2">
          <div className="aspect-video bg-neutral/10 rounded-md overflow-hidden relative border border-neutral/10">
            <img
              src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=1000"
              alt="Local Restaurant"
              className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurJourney;
