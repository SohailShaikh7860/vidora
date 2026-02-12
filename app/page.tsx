import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-[#0a0a0a] text-[#ededed] min-h-screen selection:bg-white selection:text-black">
      
      <header className="fixed top-0 w-full z-50 backdrop-blur-md bg-[#0a0a0a]/90 border-b border-white/10">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 md:px-10 h-16">
          <Link href="/" className="text-base tracking-[0.2em] uppercase font-semibold text-white">
            Vidora
          </Link>
          <nav className="hidden md:flex gap-8 text-sm text-white/70">
            <a href="#work" className="hover:text-white transition-colors duration-300">What we do</a>
            <a href="#process" className="hover:text-white transition-colors duration-300">Process</a>
            <a href="#about" className="hover:text-white transition-colors duration-300">About</a>
          </nav>
          <div className="flex items-center gap-5">
            <Link href="/sign-in" className="text-sm text-white/70 hover:text-white transition-colors duration-300">
              Log in
            </Link>
            <Link
              href="/sign-up"
              className="text-sm bg-white text-black px-6 py-2.5 rounded-full font-semibold hover:bg-white/90 transition-colors duration-300"
            >
              Start free
            </Link>
          </div>
        </div>
      </header>

      
      <section className="min-h-screen flex flex-col justify-end pb-20 pt-24 px-6 md:px-10 max-w-[1400px] mx-auto">
        <div className="mb-12">
          <p className="text-white/60 text-sm tracking-wide mb-8">
            Video &middot; Images &middot; AI &middot; Subtitles
          </p>
          <h1 className="text-[clamp(2.5rem,8vw,7rem)] font-bold leading-[0.95] tracking-tight max-w-5xl">
            Your media,
            <br />
            <span className="italic font-light">actually</span> optimized.
          </h1>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 border-t border-white/15 pt-10">
          <p className="text-white/70 max-w-md text-[15px] leading-relaxed">
            We built the tool we wished existed — upload a video, get subtitles
            in seconds, resize for any platform, and share it everywhere. No
            fluff. No 47-step workflow.
          </p>
          <Link
            href="/sign-up"
            className="group flex items-center gap-3 text-sm border-2 border-white/40 text-white px-7 py-3.5 rounded-full hover:bg-white hover:text-black transition-all duration-300 w-fit font-medium"
          >
            Get started
            <span className="group-hover:translate-x-1 transition-transform duration-300">
              ↗
            </span>
          </Link>
        </div>
      </section>

      
      <div className="border-y border-white/10 py-4 overflow-hidden">
        <div className="flex gap-12 animate-[marquee_30s_linear_infinite] whitespace-nowrap text-[13px] text-white/40 uppercase tracking-widest">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-12">
              <span>Video Upload</span>
              <span>•</span>
              <span>AI Subtitles</span>
              <span>•</span>
              <span>Social Formats</span>
              <span>•</span>
              <span>Image Transform</span>
              <span>•</span>
              <span>Batch Processing</span>
              <span>•</span>
              <span>Cloud Storage</span>
              <span>•</span>
            </div>
          ))}
        </div>
      </div>

      
      <section id="work" className="py-32 px-6 md:px-10 max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-20">
          <h2 className="text-[13px] uppercase tracking-[0.15em] text-white/60">
            What we do
          </h2>
          <p className="text-white/70 max-w-lg text-[15px] leading-relaxed">
            Four things. We do them well. No feature bloat, no enterprise
            upsells, no "contact sales" buttons.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          
          <div className="bg-white/[0.03] border border-white/15 rounded-2xl p-8 md:p-10 hover:border-white/30 hover:bg-white/[0.06] transition-all duration-500 group">
            <span className="text-white/40 text-[13px] tracking-wider font-mono">01</span>
            <h3 className="text-2xl md:text-3xl font-semibold mt-6 mb-4 text-white">
              Video Upload
            </h3>
            <p className="text-white/60 text-[15px] leading-relaxed max-w-sm">
              Upload videos up to 100MB. Automatic Cloudinary storage with
              optimization and format conversion built-in.
            </p>
            <div className="mt-8 w-full h-[1px] bg-gradient-to-r from-white/15 to-transparent" />
          </div>

          
          <div className="bg-white/[0.03] border border-white/15 rounded-2xl p-8 md:p-10 md:mt-16 hover:border-white/30 hover:bg-white/[0.06] transition-all duration-500 group">
            <span className="text-white/40 text-[13px] tracking-wider font-mono">02</span>
            <h3 className="text-2xl md:text-3xl font-semibold mt-6 mb-4 text-white">
              AI Subtitles
            </h3>
            <p className="text-white/60 text-[15px] leading-relaxed max-w-sm">
              OpenAI Whisper integration generates accurate subtitles from video
              audio. Download as SRT or burn directly into video.
            </p>
            <div className="mt-8 w-full h-[1px] bg-gradient-to-r from-white/15 to-transparent" />
          </div>

          
          <div className="bg-white/[0.03] border border-white/15 rounded-2xl p-8 md:p-10 hover:border-white/30 hover:bg-white/[0.06] transition-all duration-500 group">
            <span className="text-white/40 text-[13px] tracking-wider font-mono">03</span>
            <h3 className="text-2xl md:text-3xl font-semibold mt-6 mb-4 text-white">
              Social Formats
            </h3>
            <p className="text-white/60 text-[15px] leading-relaxed max-w-sm">
              Generate shareable links for your processed videos. Optimized
              previews and easy embedding for social platforms.
            </p>
            <div className="mt-8 w-full h-[1px] bg-gradient-to-r from-white/15 to-transparent" />
          </div>

          
          <div className="bg-white/[0.03] border border-white/15 rounded-2xl p-8 md:p-10 md:mt-16 hover:border-white/30 hover:bg-white/[0.06] transition-all duration-500 group">
            <span className="text-white/40 text-[13px] tracking-wider font-mono">04</span>
            <h3 className="text-2xl md:text-3xl font-semibold mt-6 mb-4 text-white">
              Image Transform
            </h3>
            <p className="text-white/60 text-[15px] leading-relaxed max-w-sm">
              Upload and transform images with Cloudinary. Automatic format
              detection, optimization, and cloud-based storage.
            </p>
            <div className="mt-8 w-full h-[1px] bg-gradient-to-r from-white/15 to-transparent" />
          </div>
        </div>
      </section>

      
      <section id="process" className="border-t border-white/10 py-32 px-6 md:px-10 max-w-[1400px] mx-auto">
        <h2 className="text-[13px] uppercase tracking-[0.15em] text-white/80 mb-20">
          Process
        </h2>
        <div className="space-y-0">
          {[
            {
              num: "01",
              title: "Upload your file",
              desc: "Video or image. Drag and drop or click to browse. That's it.",
            },
            {
              num: "02",
              title: "We do the heavy lifting",
              desc: "AI transcription, format detection, compression — all automatic.",
            },
            {
              num: "03",
              title: "Download or share",
              desc: "Grab the output, or push directly to your social accounts.",
            },
          ].map((step, i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row md:items-center gap-4 md:gap-16 py-10 border-b border-white/10 group hover:pl-4 transition-all duration-500"
            >
              <span className="text-white/60 text-sm font-mono w-8 shrink-0">
                {step.num}
              </span>
              <h3 className="text-2xl md:text-4xl font-medium text-white md:w-[40%] group-hover:text-white transition-colors duration-300">
                {step.title}
              </h3>
              <p className="text-white/80 text-[15px] leading-relaxed md:ml-auto md:max-w-sm md:text-right">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-white/10 py-32 px-6 md:px-10 max-w-[1400px] mx-auto text-center">
        <p className="text-white/50 text-sm tracking-wide mb-6">
          No credit card. No setup fees. No nonsense.
        </p>
        <h2 className="text-[clamp(2rem,5vw,4.5rem)] font-bold leading-[1.05] tracking-tight mb-10">
          Stop overthinking it.
          <br />
          <span className="text-white/50">Just start creating.</span>
        </h2>
        <Link
          href="/sign-up"
          className="inline-flex items-center gap-3 bg-white text-black px-10 py-4 rounded-full text-base font-semibold hover:scale-105 transition-transform duration-300 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
        >
          Create free account
          <span>↗</span>
        </Link>
      </section>

      <footer className="border-t border-white/10 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto py-12 flex flex-col md:flex-row justify-between gap-10">
          <div>
            <p className="text-sm tracking-[0.2em] uppercase font-semibold mb-3 text-white">
              Vidora
            </p>
            <p className="text-white/50 text-[13px]">
              Built for creators who value their time.
            </p>
          </div>
          <div className="flex gap-16 text-[13px]">
            <div className="flex flex-col gap-3">
              <span className="text-white/40 uppercase tracking-wider text-[11px] mb-1">
                Product
              </span>
              <a href="#work" className="text-white/60 hover:text-white transition-colors">Features</a>
              <a href="#process" className="text-white/60 hover:text-white transition-colors">Process</a>
              <Link href="/sign-up" className="text-white/60 hover:text-white transition-colors">Sign up</Link>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-white/40 uppercase tracking-wider text-[11px] mb-1">
                Legal
              </span>
              <a href="#" className="text-white/60 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">Terms</a>
            </div>
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto border-t border-white/10 py-6 flex flex-col md:flex-row justify-between gap-4 text-[12px] text-white/40">
          <span>© 2026 Vidora</span>
          <div className="flex gap-6">
            <a href="https://x.com/Sohaildevs" className="hover:text-white transition-colors">X / Twitter</a>
            <a href="https://github.com/SohailShaikh7860" className="hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
