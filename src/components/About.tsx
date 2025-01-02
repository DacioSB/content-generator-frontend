
export function About() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container px-4 md:px-6">
        {/* Center-aligned title */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-orange-1 md:text-5xl">
            About ContentGen Platform
          </h2>
          <p className="text-xl font-semibold text-teal-600">
            Revolutionizing Content Creation with AI
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Text column - Left */}
          <div className="flex flex-col justify-center space-y-6 text-gray-700">
            <p>
              At ContentGen Platform, our mission is to empower individuals and businesses
              by providing cutting-edge tools for AI-driven content creation and moderation.
              With a focus on innovation and ease of use, we help users save time, improve
              efficiency, and unlock their creative potential.
            </p>
            <p>
              Whether you are a solo entrepreneur, a content manager, or a developer,
              ContentGen is built to cater to your needs with advanced AI capabilities,
              seamless integrations, and an intuitive user interface.
            </p>
          </div>

          {/* Image column - Right */}
          <div className="flex items-center justify-center">
            <div 
            className="mb-8 w-full max-w-2xl h-[400px] bg-cover bg-center"
            style={{ backgroundImage: "url('/images/about.png')" }}
            >
            {/* Optionally add any overlay or additional content here */}
        </div>
          </div>
        </div>
      </div>
    </section>
  )
}

