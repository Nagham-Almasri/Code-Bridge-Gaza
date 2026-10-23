
import Image from "next/image";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import HomeNavbar from "./_Components/Navbar/HomeNavbar";
import Link from "next/link";
import { FiPlay, FiTrendingUp, FiBriefcase } from "react-icons/fi";
import {
  FiTarget,
  FiFileText,
  FiMessageSquare,
  FiBookOpen,
 
} from "react-icons/fi";
import Footer from "./_Components/Footer/Footer";
export default function Home() {

  
  const pagesLinks = [
    { label: "Home", href: "/" },
    { label: "Features", href: "#features" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Jobs", href: "/jobs" },
    { label: "Courses", href: "/courses" },
  ];

  const resourcesLinks = [
    { label: "Career Assistant", href: "/ai-assistant" },
    { label: "CV Generator", href: "/cv-generator" },
    { label: "Career Tips", href: "/career-tips" },
    { label: "Learning Paths", href: "/learning-paths" },
    { label: "Support", href: "/support" },
  ];

  const companyLinks = [
    { label: "About Us", href: "#about" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms" },
  ];
   
  const mainServices = [
  {
    title: "Skill Analysis",
    description:
      "Get comprehensive assessment of your technical abilities and receive personalized recommendations for improvement",
    image: "/images/service-1.jpg",
    icon: <FiTarget />,
    href: "#",
  },
  {
    title: "CV Generator",
    description:
      "Create professional, ATS-optimized CVs with our smart templates and AI-powered content suggestions",
    image: "/images/service-2.jpg",
    icon: <FiFileText />,
    href: "#",
  },
  {
    title: "Job Matching",
    description:
      "Discover opportunities that perfectly match your skills, experience, and career goals with AI-powered recommendations",
    image: "/images/service-3.jpg",
    icon: <FiBriefcase />,
    href: "#",
  },
];

const smallServices = [
  {
    title: "AI Career Assistant",
    description: "24/7 intelligent guidance for your career questions",
    icon: <FiMessageSquare />,
    href: "/ai-assistant",
  },
  {
    title: "Learning Paths",
    description: "Personalized course recommendations",
    icon: <FiBookOpen />,
    href: "#",
  },
  {
    title: "Progress Analytics",
    description: "Track your career growth and achievements",
    icon: <FiTrendingUp />,
    href: "#",
  },
];


const companyFeatures = [
  "Submit job requests without creating an account",
  "Provide complete job information including title, requirements, salary, and contact details",
  "Every request is reviewed by the Administrator before publication",
];


  return (
   <>
   <HomeNavbar/>
   {/* hero section start */}
 <section className="relative overflow-hidden bg-white ">
      <div className="relative min-h-screen overflow-hidden bg-[url('/images/hero-section.jpg')] bg-cover bg-center">
        <div className="absolute inset-0" />

        <div className="relative z-10 mx-auto flex min-h-[560px] max-w-7xl flex-col items-center justify-center px-6 pb-20 text-center">
          <h1 className="text-3xl font-extrabold leading-tight tracking-[-0.04em] text-white md:text-5xl">
            Build Your Future
          </h1>

          <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-[-0.04em] text-violet-300/90 md:text-5xl">
            Tech Career Today
          </h1>

          <p className="mt-8 max-w-[720px] text-[18px] font-medium leading-8 text-white/90">
            Analyze your skills, build professional CVs, and discover perfect job
            opportunities with AI-powered tools designed for developers
          </p>

          <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row">
            <Link
              href="/signup/personal"
              className="flex h-[58px] min-w-[205px] items-center justify-center rounded-2xl bg-white px-8 text-[16px] font-extrabold text-[#3157f5] shadow-xl shadow-black/20 transition-all duration-200 hover:scale-[1.03]"
            >
              Get Started Free
            </Link>

            <Link
              href="/ai-assistant"
              className="flex h-[58px] min-w-[205px] items-center justify-center gap-3 rounded-2xl border border-white/25 bg-white/10 px-8 text-[16px] font-extrabold text-white backdrop-blur-md transition-all duration-200 hover:bg-white/20"
            >
              <FiPlay className="text-lg" />
              Try AI Assistant
            </Link>
          </div>
        </div>

        <div className="absolute bottom-[30px] left-[25%] z-30 hidden animate-bounce-slow  rounded-2xl bg-white px-5 py-4 shadow-xl shadow-black/10 lg:block">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-600 text-white">
              <FiTrendingUp className="text-xl" />
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-500">
                Skill Match Rate
              </p>
              <p className="text-lg font-extrabold text-slate-950">94%</p>
            </div>
          </div>

          <div className="mt-3 h-2 rounded-full bg-slate-100">
            <div className="h-2 w-[94%] rounded-full bg-gradient-to-r from-blue-500 to-violet-600" />
          </div>
        </div>

        <div className="absolute bottom-[10px] right-[25%] z-30 hidden animate-bounce-slow  rounded-2xl bg-white px-5 py-4 shadow-xl shadow-black/10 lg:block">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-600 text-white">
              <FiBriefcase className="text-xl" />
            </div>

            <div>
              <p className="text-sm font-extrabold text-slate-900">
                Senior Developer
              </p>

              <p className="mt-1 text-xs font-medium text-slate-500">
                Remote · $120k/year
              </p>

              <div className="mt-2 flex gap-2">
                <span className="rounded-md bg-blue-50 px-2 py-1 text-[10px] font-bold text-blue-600">
                  React
                </span>

                <span className="rounded-md bg-violet-50 px-2 py-1 text-[10px] font-bold text-violet-600">
                  Node.js
                </span>
              </div>
  </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20">
          <svg
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            className="h-[90px] w-full"
          >
            <path
              d="M0,72 C220,105 420,35 700,70 C980,105 1160,30 1440,58 L1440,120 L0,120 Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
    </section>  
    {/* hero end */}
    
    {/* about section start  */}
       <section className="bg-gray-100 py-10 my-6">
      <div className="mx-auto container px-18 grid grid-cols-1 items-center gap-10 lg:grid-cols-2  ">
        <div className="flex justify-center lg:justify-end">
          <div className="relative w-full">
            <div className="absolute inset-0 rotate-[-3deg] w-3/4 mx-auto rounded-[34px] bg-gradient-to-br from-blue-500 to-violet-600 shadow-2xl shadow-violet-300/70" />

            <div className="relative w-3/4 mx-auto  overflow-hidden rounded-[32px] shadow-2xl shadow-violet-200">
              <Image
                src="/images/about-section.jpg"
                alt="Developers working together"
                width={320}
                height={370}
                className="w-full object-cover hover:scale-105 transition-all duration-300"
              />
            </div>
          </div>
        </div>

        <div className="max-w-xl">
          <span className="rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-xs font-bold text-violet-600">
            About CodeBridge Gaza
          </span>

          <h2 className="mt-6 text-4xl font-extrabold leading-tight tracking-[-0.03em] text-slate-950 md:text-5xl">
            Empowering Developers
            <br />
            to{" "}
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              Achieve More
            </span>
          </h2>

          <p className="mt-6 text-base font-medium leading-8 text-slate-600">
            CodeBridge Gaza is your comprehensive career development platform.
            We combine AI-powered skill analysis, professional CV generation,
            and intelligent job matching to help developers in Gaza build
            successful tech careers.
          </p>

          <p className="mt-5 text-base font-medium leading-8 text-slate-500">
            Our platform provides the tools you need to assess your abilities,
            showcase your talents, and connect with opportunities that match
            your skills and aspirations.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <FeatureCard
              title="AI-Powered Analysis"
              subtitle="Smart skill assessment"
            />

            <FeatureCard
              title="Professional CVs"
              subtitle="Stand out templates"
            />
          </div>

          <Link
            href="#features"
            className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 px-7 text-sm font-extrabold text-white shadow-lg shadow-violet-300/70 transition hover:scale-[1.03]"
          >
            Learn More
            <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
    {/* about section end */}

    {/* CompaniesSection start */}
    <section className="bg-gray-50 py-16 my-6">
          <div className="mx-auto container px-18 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            
            {/* Left Side - Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-3/4">
                <div className="absolute inset-0 rounded-[34px] bg-gradient-to-br from-blue-400/20 to-violet-500/20 blur-2xl" />

                <div className="relative overflow-hidden rounded-[32px] shadow-2xl shadow-violet-200">
                  <Image
                    src="/images/companies-section.png"
                    alt="Company team working together"
                    width={420}
                    height={520}
                    className="h-[470px] w-full object-cover transition-all duration-300 hover:scale-105"
                  />
                </div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="max-w-2xl">
              <span className="rounded-full border border-violet-200 bg-white px-4 py-2 text-xs font-bold text-violet-600 shadow-sm">
                For Companies
              </span>

              <h2 className="mt-7 text-4xl font-extrabold leading-tight tracking-[-0.03em] text-slate-950 md:text-5xl">
                Find the Right Talent
                <br />

                <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                  Post Your Job Today
                </span>
              </h2>

              <p className="mt-7 max-w-2xl text-base font-medium leading-8 text-slate-500">
                CodeBridge Gaza allows companies and job providers to submit job
                requests through the platform without creating an account. Every
                submitted request is reviewed by the Administrator before being
                published, ensuring that developers can access relevant,
                high-quality career opportunities.
              </p>

              {/* Features */}
              <div className="mt-8 space-y-5">
                {companyFeatures.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-start gap-3 text-sm font-semibold text-slate-900"
                  >
                    <FiCheckCircle className="mt-0.5 shrink-0 text-2xl text-violet-600" />

                    <p className="leading-6">{feature}</p>
                  </div>
                ))}
              </div>

              {/* Button */}
              <Link
                href="/add-job"
                className="mt-8 inline-flex h-13 items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 px-8 text-sm font-extrabold text-white shadow-lg shadow-violet-300/70 transition hover:scale-[1.03]"
              >
                Post a Job
                <FiArrowRight />
              </Link>
            </div>
          </div>
    </section>
    {/* CompaniesSection end  */}

    {/* services card start */}

    <section id="features" className="bg-white px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <span className="inline-flex rounded-full border border-violet-200 bg-violet-50 px-5 py-2 text-base font-bold text-[#4f46e5]">
            Our Services
          </span>

          <h2 className="mt-8 text-3xl font-bold leading-tight tracking-[-0.04em] text-slate-950 md:text-4xl">
            Professional Career{" "}
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              Development Tools
            </span>
          </h2>

          <p className="mt-5 text-md font-medium text-slate-500">
            Everything you need to build and advance your tech career
          </p>
        </div>

        <div className="mt-24 grid gap-9 lg:grid-cols-3">
          {mainServices.map((service) => (
            <MainServiceCard key={service.title} service={service} />
          ))}
        </div>

        <div className="mt-24 grid gap-8 lg:grid-cols-3">
          {smallServices.map((service) => (
            <SmallServiceCard key={service.title} service={service} />
          ))}
        </div>
      </div>
    </section>
    {/* QA section start */}
    <section className="relative overflow-hidden bg-white px-6 py-24">
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl" />
      <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-violet-200/40 blur-3xl" />

      <div className="relative mx-auto max-w-4xl">
        <div className="rounded-[28px] border border-white/70 bg-white/90 px-8 py-20 text-center shadow-2xl shadow-slate-300/60 backdrop-blur md:px-16">
          <h2 className="text-2xl font-bold leading-tight tracking-[-0.04em] text-slate-950 md:text-5xl">
            Ready to Accelerate Your
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              Tech Career?
            </span>
          </h2>

          <p className="mx-auto mt-8 max-w-xl md:text-xl font-medium leading-8 text-slate-500 ">
            Join thousands of developers building successful careers with
            CodeBridge Gaza
          </p>

          <div className="mt-12 flex flex-col *:w-full items-center justify-center gap-5 sm:flex-row">
            <Link
              href="/signup/personal"
              className="flex px-5 py-3 items-center justify-center gap-4 rounded-2xl bg-gradient-to-r from-blue-500 to-violet-600 px-10 text-md font-semibold text-white shadow-2xl shadow-violet-300/70 transition-all duration-200 hover:scale-[1.03]"
            >
              Get Started Free
              <FiArrowRight className="text-3xl" />
            </Link>

            <Link
              href="/contact"
              className="flex px-5 py-3 items-center justify-center rounded-2xl border-2 border-violet-100 bg-white px-10 text-md font-semibold text-slate-500 transition-all duration-200 hover:border-violet-300 hover:text-violet-600"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
    {/* QA section end */} 
  

     {/* footer start */}
   <Footer/>
    </>
  );

}
function FeatureCard({ title, subtitle }) {
  // for about section cards
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600">
        <FiCheckCircle className="text-xl" />
      </div>

      <div>
        <h3 className="text-sm font-extrabold text-slate-950">{title}</h3>
        <p className="mt-1 text-xs font-medium text-slate-400">{subtitle}</p>
      </div>
    </div>
   
  );
}

function MainServiceCard({ service }) {
  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/70 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-300/70">
      <div className="relative w-full overflow-hidden">
        <Image
          src={service.image}
          alt={service.title}
          width={300}
          height={150}
          className="object-cover w-full h-50 "
        />

        

        <div className="absolute bottom-8 left-8 flex size-12 items-center justify-center rounded-xl border border-white/30 bg-white/15 text-2xl text-white backdrop-blur-md">
          {service.icon}
        </div>
      </div>

      <div className="px-8 py-5">
        <h3 className="text-xl font-bold tracking-[-0.03em] text-slate-950">
          {service.title}
        </h3>

        <p className="mt-5 text-md text-slate-500">
          {service.description}
        </p>

        <Link
          href={service.href}
          className="mt-8 inline-flex items-center gap-3 text-md font-semibold group text-blue-600 transition hover:text-violet-600"
        >
          Read More
          <FiArrowRight className="text-2xl group-hover:translate-x-2 transition-all duration-300" />
        </Link>
      </div>
    </article>
  );
}

function SmallServiceCard({ service }) {
  return (
    <article className="flex bg-gray-100 py-7 items-start gap-6 rounded-[22px] border border-slate-200  px-8 py-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/70">
      <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 text-3xl text-white shadow-xl shadow-violet-300/70">
        {service.icon}
      </div>

      <div>
        <h3 className="text-xl font-bold tracking-[-0.03em] text-slate-950">
          {service.title}
        </h3>

        <p className="mt-4 text-sm  text-slate-500">
          {service.description}
        </p>

        <Link
          href={service.href}
          className="mt-6 inline-flex items-center group gap-2 text-md font-semibold text-blue-600 transition hover:text-violet-600"
        >
          Explore
          <FiArrowRight className="text-md group-hover:translate-x-2 transition-all duration-300" />
        </Link>
      </div>
    </article>
  );
}