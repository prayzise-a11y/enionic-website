"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import {
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";

/* ============================================================
   TYPES
============================================================ */

type ActivityType = "manufacturing" | "digital" | "growth";

type IndustryType =
  | "equipment"
  | "automation"
  | "electronics"
  | "digital-tech";

type JourneyItemProps = {
  number: string;
  title: string;
  text: string;
  type: "factory" | "network" | "growth";
  color: "orange" | "cyan";
  active: boolean;
  onClick: () => void;
};

type Capability = {
  id: string;
  title: string;
  headline: string;
  description: string;
  points: string[];
  tags: string[];
};

type ActivityContent = {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  accent: "orange" | "cyan";
  capabilities: Capability[];
};

type IndustryCardProps = {
  number: string;
  title: string;
  description: string;
  accent: "orange" | "cyan";
  icon: "machine" | "robotics" | "electronics" | "digital";
  active: boolean;
  onClick: () => void;
};

type AboutPrincipleProps = {
  number: string;
  title: string;
  text: string;
  accent: "orange" | "cyan";
};

type TeamMemberProps = {
  number: string;
  name: string;
  role: string;
  image: string;
  expertise: string;
  accent: "orange" | "cyan";
  linkedin: string;
};

/* ============================================================
   DATA
============================================================ */

const journeyItems = [
  {
    id: "manufacturing" as ActivityType,
    number: "01",
    title: "Manufacturing",
    text: "Industrial technology, automation and production.",
    type: "factory" as const,
    color: "orange" as const,
  },
  {
    id: "digital" as ActivityType,
    number: "02",
    title: "Digital Intelligence",
    text: "Data and signals transformed into actionable insight.",
    type: "network" as const,
    color: "cyan" as const,
  },
  {
    id: "growth" as ActivityType,
    number: "03",
    title: "Commercial Growth",
    text: "Turning industrial potential into real opportunities.",
    type: "growth" as const,
    color: "orange" as const,
  },
];

const activityContent: Record<ActivityType, ActivityContent> = {
  manufacturing: {
    number: "01",
    eyebrow: "Manufacturing",
    title: "Engineering smarter industrial performance.",
    description:
      "Enionic connects industrial expertise, technology and execution to help manufacturing businesses modernize, improve performance and create sustainable growth.",
    accent: "orange",
    capabilities: [
      {
        id: "industrial-technology",
        title: "Industrial Technology",
        headline: "Technology that strengthens industrial performance.",
        description:
          "Enionic supports industrial companies in identifying, evaluating and applying technologies that improve manufacturing capability, operational performance and competitiveness.",
        points: [
          "Evaluate industrial technologies and equipment",
          "Identify improvement and modernization opportunities",
          "Connect technology decisions with business objectives",
        ],
        tags: [
          "Industrial Equipment",
          "Engineering",
          "Production Systems",
          "Technology Strategy",
        ],
      },
      {
        id: "automation",
        title: "Automation",
        headline:
          "Making industrial processes more efficient and scalable.",
        description:
          "Enionic helps companies identify where automation can reduce manual effort, improve consistency and increase productivity across manufacturing and industrial operations.",
        points: [
          "Identify suitable automation opportunities",
          "Improve productivity and process consistency",
          "Support automation-related industrial transformation",
        ],
        tags: [
          "Automation",
          "Robotics",
          "Productivity",
          "Industrial Processes",
        ],
      },
      {
        id: "digital-manufacturing",
        title: "Digital Manufacturing",
        headline: "Connecting production with digital intelligence.",
        description:
          "Enionic connects manufacturing processes with digital technologies, industrial data and intelligent workflows to create more transparent, connected and efficient production environments.",
        points: [
          "Improve visibility across manufacturing operations",
          "Connect production data with decision-making",
          "Support smart-factory and digital transformation initiatives",
        ],
        tags: [
          "Smart Factory",
          "Connected Production",
          "Industrial Data",
          "Digital Workflows",
        ],
      },
      {
        id: "process-improvement",
        title: "Process Improvement",
        headline:
          "Turning operational inefficiencies into measurable improvements.",
        description:
          "Enionic helps identify inefficiencies in industrial workflows and supports improvement initiatives focused on productivity, execution quality and operational performance.",
        points: [
          "Identify workflow and process inefficiencies",
          "Improve execution and operational consistency",
          "Support measurable productivity improvements",
        ],
        tags: [
          "Efficiency",
          "Workflow",
          "Operations",
          "Continuous Improvement",
        ],
      },
    ],
  },

  digital: {
    number: "02",
    eyebrow: "Digital Intelligence",
    title: "Turning information into better decisions.",
    description:
      "Enionic combines technology, market and business signals to help companies identify opportunities, understand markets and make better-informed strategic decisions.",
    accent: "cyan",
    capabilities: [
      {
        id: "digitalization",
        title: "Digitalization",
        headline:
          "Connecting business and technology through digital transformation.",
        description:
          "Enionic helps companies identify where digital technologies can improve processes, visibility, decision-making and overall business performance.",
        points: [
          "Identify digital transformation opportunities",
          "Connect technology initiatives with business value",
          "Support digital adoption across industrial environments",
        ],
        tags: [
          "Digital Transformation",
          "Industrial Digitalization",
          "Technology",
          "Business Value",
        ],
      },
      {
        id: "market-intelligence",
        title: "Market Intelligence",
        headline: "Understanding markets before making the next move.",
        description:
          "Enionic brings together market information, industrial knowledge and commercial signals to create a clearer view of customers, competitors and market opportunities.",
        points: [
          "Analyze relevant markets and customer segments",
          "Identify emerging commercial signals",
          "Support better strategic positioning",
        ],
        tags: [
          "Market Analysis",
          "Customers",
          "Competition",
          "Market Signals",
        ],
      },
      {
        id: "opportunity-discovery",
        title: "Opportunity Discovery",
        headline: "Finding where real commercial potential exists.",
        description:
          "Enionic helps identify companies, projects and market situations where industrial or technology solutions have a strong potential fit.",
        points: [
          "Identify potential accounts and opportunities",
          "Prioritize high-value market situations",
          "Connect opportunity signals with commercial action",
        ],
        tags: [
          "Opportunity Identification",
          "Account Discovery",
          "Buyer Signals",
          "Commercial Potential",
        ],
      },
      {
        id: "technology-insights",
        title: "Technology Insights",
        headline:
          "Understanding technology developments and their business impact.",
        description:
          "Enionic monitors relevant technology developments and translates them into practical insights for industrial and commercial decision-making.",
        points: [
          "Evaluate technology developments",
          "Understand potential industrial impact",
          "Connect innovation with commercial opportunity",
        ],
        tags: [
          "Innovation",
          "Technology Trends",
          "Industrial Impact",
          "Strategic Insight",
        ],
      },
    ],
  },

  growth: {
    number: "03",
    eyebrow: "Commercial Growth",
    title: "Turning industrial potential into business.",
    description:
      "Enionic helps technology and industrial companies build market traction through market entry, go-to-market execution, strategic sales and focused opportunity development.",
    accent: "orange",
    capabilities: [
      {
        id: "market-entry",
        title: "Market Entry",
        headline: "Entering new markets with focus and clarity.",
        description:
          "Enionic helps companies understand new markets, identify the right customers and develop a practical route to commercial entry.",
        points: [
          "Assess market attractiveness and fit",
          "Identify target accounts and buying centers",
          "Develop focused market-entry approaches",
        ],
        tags: [
          "DACH",
          "Market Entry",
          "Target Accounts",
          "Expansion",
        ],
      },
      {
        id: "go-to-market",
        title: "Go-to-Market",
        headline: "Turning strategy into commercial execution.",
        description:
          "Enionic supports the design and execution of go-to-market approaches that connect positioning, target customers and sales activity.",
        points: [
          "Define priority customer segments",
          "Shape value propositions and market positioning",
          "Translate strategy into actionable commercial steps",
        ],
        tags: [
          "GTM Strategy",
          "Positioning",
          "Segmentation",
          "Commercial Execution",
        ],
      },
      {
        id: "strategic-sales",
        title: "Strategic Sales",
        headline:
          "Building momentum in complex industrial opportunities.",
        description:
          "Enionic supports strategic account development and complex B2B sales where technical understanding, stakeholder alignment and structured execution are essential.",
        points: [
          "Develop strategic target accounts",
          "Navigate complex buying organizations",
          "Build value-oriented sales approaches",
        ],
        tags: [
          "Enterprise Sales",
          "Strategic Accounts",
          "Buying Centers",
          "Value Selling",
        ],
      },
      {
        id: "opportunity-development",
        title: "Opportunity Development",
        headline:
          "Turning signals into qualified commercial opportunities.",
        description:
          "Enionic helps identify, validate and develop opportunities before significant sales resources are committed.",
        points: [
          "Validate customer and opportunity fit",
          "Prioritize opportunities based on commercial potential",
          "Develop opportunities toward actionable engagement",
        ],
        tags: [
          "Qualification",
          "Validation",
          "Pipeline",
          "Business Development",
        ],
      },
    ],
  },
};

/* ============================================================
   HOME
============================================================ */

export default function Home() {
  const [selectedActivity, setSelectedActivity] =
    useState<ActivityType>("manufacturing");

  const [selectedCapability, setSelectedCapability] =
    useState("industrial-technology");

  const [selectedIndustry, setSelectedIndustry] =
    useState<IndustryType>("equipment");
    const [mobileMenuOpen, setMobileMenuOpen] =
  useState(false);

  const prefersReducedMotion = useReducedMotion();

  function handleActivityChange(activity: ActivityType) {
    setSelectedActivity(activity);
    setSelectedCapability(
      activityContent[activity].capabilities[0].id
    );
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#061521] text-white">
     

      {/* =====================================================
    NAVIGATION
====================================================== */}

<motion.header
  initial={
    prefersReducedMotion
      ? false
      : { opacity: 0, y: -20 }
  }
  animate={{
    opacity: 1,
    y: 0,
  }}
  transition={{
    duration: 0.8,
    delay: 0.15,
  }}
  className="absolute left-0 top-0 z-50 w-full"
>
  <nav className="relative z-50 mx-auto flex max-w-[1500px] items-center justify-between px-6 py-5 md:px-8 md:py-6 lg:px-14">
    {/* LOGO */}
    <a
      href="#"
      aria-label="Enionic home"
      onClick={() => setMobileMenuOpen(false)}
    >
      <Image
        src="/images/enionic-logo.png"
        alt="Enionic"
        width={190}
        height={70}
        priority
        className="h-auto w-[145px] md:w-[180px]"
      />
    </a>

    {/* DESKTOP NAVIGATION */}
    <div className="hidden items-center gap-9 text-sm font-medium md:flex">
      <a
        href="#"
        className="text-orange-500"
      >
        Home
      </a>

      <a
        href="#what-we-do"
        className="transition hover:text-orange-500"
      >
        What We Do
      </a>

      <a
        href="#industries"
        className="transition hover:text-orange-500"
      >
        Industries
      </a>

      <a
        href="#about"
        className="transition hover:text-orange-500"
      >
        About
      </a>

      <a
        href="#team"
        className="transition hover:text-orange-500"
      >
        Team
      </a>

      <a
        href="#contact"
        className="rounded-full border border-white/40 px-6 py-3 transition hover:border-orange-500 hover:bg-orange-500"
      >
        Contact →
      </a>
    </div>

    {/* MOBILE HAMBURGER */}
    <button
      type="button"
      aria-label={
        mobileMenuOpen
          ? "Close navigation menu"
          : "Open navigation menu"
      }
      aria-expanded={mobileMenuOpen}
      onClick={() =>
        setMobileMenuOpen((open) => !open)
      }
      className="relative flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-[#061521]/60 backdrop-blur-xl md:hidden"
    >
      <div className="relative h-5 w-6">
        <motion.span
          animate={
            mobileMenuOpen
              ? {
                  rotate: 45,
                  y: 8,
                }
              : {
                  rotate: 0,
                  y: 0,
                }
          }
          className="absolute left-0 top-0 block h-[1.5px] w-6 bg-white"
        />

        <motion.span
          animate={
            mobileMenuOpen
              ? {
                  opacity: 0,
                }
              : {
                  opacity: 1,
                }
          }
          className="absolute left-0 top-[8px] block h-[1.5px] w-6 bg-white"
        />

        <motion.span
          animate={
            mobileMenuOpen
              ? {
                  rotate: -45,
                  y: -8,
                }
              : {
                  rotate: 0,
                  y: 0,
                }
          }
          className="absolute bottom-0 left-0 block h-[1.5px] w-6 bg-white"
        />
      </div>
    </button>
  </nav>

  {/* MOBILE MENU */}
  <AnimatePresence>
    {mobileMenuOpen && (
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
        transition={{
          duration: 0.3,
        }}
        className="fixed inset-0 z-40 bg-[#04111a]/98 backdrop-blur-2xl md:hidden"
      >
        {/* BACKGROUND GLOW */}
        <div className="pointer-events-none absolute -right-32 top-20 h-[350px] w-[350px] rounded-full bg-orange-500/[0.08] blur-[120px]" />

        <div className="pointer-events-none absolute -left-32 bottom-10 h-[350px] w-[350px] rounded-full bg-cyan-400/[0.06] blur-[120px]" />

        {/* GRID */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "55px 55px",
          }}
        />

        {/* MENU CONTENT */}
        <div className="relative flex min-h-screen flex-col justify-center px-8 pt-20">
          <p className="mb-8 text-[10px] uppercase tracking-[0.4em] text-orange-500">
            Navigate
          </p>

          <div className="flex flex-col">
            {[
              {
                label: "Home",
                href: "#",
                number: "01",
              },
              {
                label: "What We Do",
                href: "#what-we-do",
                number: "02",
              },
              {
                label: "Industries",
                href: "#industries",
                number: "03",
              },
              {
                label: "About",
                href: "#about",
                number: "04",
              },
              {
                label: "Team",
                href: "#team",
                number: "05",
              },
              {
                label: "Contact",
                href: "#contact",
                number: "06",
              },
            ].map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{
                  opacity: 0,
                  x: -25,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.06,
                }}
                onClick={() =>
                  setMobileMenuOpen(false)
                }
                className="group flex items-center justify-between border-b border-white/[0.08] py-5"
              >
                <div className="flex items-center gap-5">
                  <span className="text-[10px] tracking-[0.3em] text-white/25">
                    {item.number}
                  </span>

                  <span className="text-3xl font-light tracking-tight text-white transition group-hover:text-orange-500">
                    {item.label}
                  </span>
                </div>

                <span className="text-lg text-orange-500 transition-transform duration-300 group-hover:translate-x-2">
                  →
                </span>
              </motion.a>
            ))}
          </div>

          {/* MOBILE CONTACT */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
              delay: 0.45,
            }}
            className="mt-10"
          >
            <p className="text-[10px] uppercase tracking-[0.35em] text-white/25">
              Start a conversation
            </p>

            <a
              href="https://wa.me/4915774156090?text=Hello%20Enionic%2C%20I%20would%20like%20to%20discuss%20a%20business%20opportunity."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-3 rounded-full border border-orange-500/40 px-5 py-3 text-sm text-white transition hover:bg-orange-500"
            >
              WhatsApp Enionic
              <span>→</span>
            </a>
          </motion.div>

          {/* BOTTOM BRAND */}
          <div className="mt-auto pb-8 pt-10">
            <div className="h-px w-full bg-white/[0.08]" />

            <p className="mt-6 text-[9px] uppercase tracking-[0.38em] text-white/25">
              People · Technology · Opportunities
            </p>
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
</motion.header>

      {/* =====================================================
          SECTION 1 — HERO
      ====================================================== */}

      <section className="relative flex min-h-screen items-center overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 2.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Image
            src="/images/enionic-hero.png"
            alt="Digital manufacturing and industrial automation"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-r from-[#061521]/95 via-[#061521]/65 to-[#061521]/10" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#061521]/80 via-transparent to-[#061521]/20" />

        <div className="relative z-10 mx-auto w-full max-w-[1500px] px-8 lg:px-14">
          <div className="max-w-4xl">
            <motion.p
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.25,
              }}
              className="mb-6 text-xs font-semibold uppercase tracking-[0.4em] text-white/60"
            >
              People · Technology · Opportunities
            </motion.p>

            <motion.h1
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl lg:text-8xl"
            >
              Efficiency for
              <br />
              <span className="text-orange-500">
                digital manufacturing.
              </span>
            </motion.h1>

            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.8,
              }}
              className="mt-10 flex items-center gap-5"
            >
              <motion.button
                type="button"
                aria-label="Watch our story"
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : { scale: 1.08 }
                }
                whileTap={{ scale: 0.96 }}
                className="flex h-14 w-14 items-center justify-center rounded-full border border-white/50 transition hover:border-orange-500 hover:bg-orange-500"
              >
                ▶
              </motion.button>

              <span className="text-sm text-white/80">
                Watch our story
              </span>
            </motion.div>
          </div>
        </div>

        <motion.div
          animate={
            prefersReducedMotion
              ? { opacity: 0.55 }
              : {
                  opacity: [0.35, 1, 0.35],
                  y: [0, 6, 0],
                }
          }
          transition={
            prefersReducedMotion
              ? undefined
              : {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-white/50"
        >
          Scroll ↓
        </motion.div>
      </section>

      {/* =====================================================
          SECTION 2 — WHAT ENIONIC DOES
      ====================================================== */}

      <section
        id="what-we-do"
        className="relative overflow-hidden bg-[#061521] py-28 md:py-36"
      >
        <div className="pointer-events-none absolute left-1/2 top-[25%] h-[700px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/[0.05] blur-[150px]" />

        <div className="relative z-10">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.45em] text-orange-500">
              What Enionic Does
            </p>

            <p className="mt-5 text-sm text-white/40">
              Select an area to explore
            </p>
          </div>

          <div className="mt-16">
            <JourneyMarquee
              selectedActivity={selectedActivity}
              onSelect={handleActivityChange}
            />
          </div>

          <div className="mx-auto mt-16 max-w-[1200px] px-6 lg:px-14">
            <ActivityPanel
              activity={selectedActivity}
              selectedCapability={selectedCapability}
              setSelectedCapability={setSelectedCapability}
            />
          </div>
        </div>
      </section>

      {/* =====================================================
          SECTION 3 — CINEMATIC INDUSTRIES
      ====================================================== */}

      <section
        id="industries"
        className="relative overflow-hidden bg-[#071925] py-20 sm:py-24 md:py-36"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />

        <div className="pointer-events-none absolute -left-[250px] top-[20%] h-[700px] w-[700px] rounded-full bg-orange-500/[0.055] blur-[170px]" />
        <div className="pointer-events-none absolute -right-[250px] bottom-[5%] h-[700px] w-[700px] rounded-full bg-cyan-400/[0.055] blur-[170px]" />

        <div className="pointer-events-none absolute left-1/2 top-20 hidden -translate-x-1/2 whitespace-nowrap font-semibold uppercase tracking-[0.08em] text-white/[0.018] md:block md:text-[180px] lg:text-[230px]">
  Industries
</div>
        

        {!prefersReducedMotion && (
          <motion.div
            initial={false}
            whileInView={{ x: "100%" }}
            viewport={{ once: false }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear",
            }}
            className="pointer-events-none absolute top-[310px] h-px w-[45%] bg-gradient-to-r from-transparent via-orange-500/40 to-transparent"
          />
        )}

        <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-10 lg:px-14">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.08 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mb-16 md:mb-20"
          >
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-orange-500" />

              <p className="text-xs font-semibold uppercase tracking-[0.45em] text-orange-500">
                Industries
              </p>
            </div>

            <div className="mt-7 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <h2 className="max-w-4xl text-4xl font-medium leading-[1.05] md:text-6xl">
                Where industrial expertise
                <br />
                meets{" "}
                <span className="text-orange-500">
                  opportunity.
                </span>
              </h2>

              <div className="lg:justify-self-end">
                <p className="max-w-md text-sm leading-7 text-white/50 md:text-base">
                  Explore the industrial environments where Enionic combines
                  technology, digital intelligence and commercial execution.
                </p>

                <p className="mt-4 text-[10px] uppercase tracking-[0.35em] text-white/25">
                  Select an industry to explore
                </p>
              </div>
            </div>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-2">
            <IndustryCard
              number="01"
              title="Industrial Equipment & Machinery"
              description="Machinery, production systems and capital-intensive industrial equipment."
              accent="orange"
              icon="machine"
              active={selectedIndustry === "equipment"}
              onClick={() =>
                setSelectedIndustry("equipment")
              }
            />

            <IndustryCard
              number="02"
              title="Automation & Robotics"
              description="Automation technologies, robotics and smarter industrial processes."
              accent="cyan"
              icon="robotics"
              active={selectedIndustry === "automation"}
              onClick={() =>
                setSelectedIndustry("automation")
              }
            />

            <IndustryCard
              number="03"
              title="Electronics & High-Tech"
              description="Electronics, industrial high-tech and technology-driven market development."
              accent="cyan"
              icon="electronics"
              active={selectedIndustry === "electronics"}
              onClick={() =>
                setSelectedIndustry("electronics")
              }
            />

            <IndustryCard
              number="04"
              title="Industrial Digital Technology"
              description="Industrial software, connected data and intelligent digital workflows."
              accent="orange"
              icon="digital"
              active={selectedIndustry === "digital-tech"}
              onClick={() =>
                setSelectedIndustry("digital-tech")
              }
            />
          </div>

          <div className="mt-10">
            <AnimatePresence mode="wait">
              <IndustryDetail
                key={selectedIndustry}
                industry={selectedIndustry}
              />
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* =====================================================
          SECTION 4 — ABOUT / ENIONIC ECOSYSTEM
      ====================================================== */}

      <section
        id="about"
        className="relative overflow-hidden bg-[#061521] py-20 sm:py-24 md:py-40"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="pointer-events-none absolute -left-[250px] top-[20%] h-[650px] w-[650px] rounded-full bg-orange-500/[0.05] blur-[170px]" />
        <div className="pointer-events-none absolute -right-[250px] bottom-[5%] h-[650px] w-[650px] rounded-full bg-cyan-400/[0.05] blur-[170px]" />

        <div className="pointer-events-none absolute left-1/2 top-24 hidden -translate-x-1/2 whitespace-nowrap font-semibold uppercase tracking-[0.08em] text-white/[0.018] md:block md:text-[170px] lg:text-[220px]">
         Enionic
       </div>

        <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-10 lg:px-14">
          <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <motion.div
              initial={false}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.08 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="flex items-center gap-4">
                <span className="h-px w-10 bg-orange-500" />

                <p className="text-xs font-semibold uppercase tracking-[0.45em] text-orange-500">
                  About Enionic
                </p>
              </div>

              <h2 className="mt-7 max-w-3xl text-4xl font-medium leading-[1.05] md:text-6xl">
                Three disciplines.
                <br />
                <span className="text-orange-500">
                  One connected approach.
                </span>
              </h2>

              <p className="mt-8 max-w-xl text-base leading-8 text-white/55">
                Enionic connects industrial knowledge, digital capability and
                commercial intelligence to help technology and manufacturing
                businesses move from potential to measurable progress.
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                {[
                  "Manufacturing",
                  "Digitalization",
                  "Commercial Intelligence",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/[0.025] px-4 py-2 text-xs text-white/55"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <p className="mt-10 max-w-lg text-xs uppercase tracking-[0.28em] text-white/25">
                From industrial reality to digital insight to commercial execution.
              </p>
            </motion.div>

            <motion.div
              initial={false}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <EnionicEcosystem />
            </motion.div>
          </div>

          <div className="mt-24 grid gap-5 md:grid-cols-3">
            <AboutPrinciple
              number="01"
              title="Industrial First"
              text="We start with the realities of manufacturing, engineering and industrial operations."
              accent="orange"
            />

            <AboutPrinciple
              number="02"
              title="Technology with Purpose"
              text="Digital technologies matter when they improve decisions, performance and business outcomes."
              accent="cyan"
            />

            <AboutPrinciple
              number="03"
              title="Execution Matters"
              text="Strategy creates direction. Execution turns it into measurable industrial and commercial progress."
              accent="orange"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mt-24 border-t border-white/[0.08] pt-12"
          >
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
              <p className="max-w-5xl text-2xl font-light leading-relaxed text-white/70 md:text-4xl">
                Manufacturing.
                <span className="text-cyan-400">
                  {" "}
                  Digitalization.
                </span>
                <span className="text-orange-500">
                  {" "}
                  Commercial Intelligence.
                </span>

                <br />

                Connected to create industrial impact.
              </p>

              <p className="text-[10px] uppercase tracking-[0.4em] text-white/25">
                Enionic ecosystem
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          SECTION 5 — TEAM / LEADERSHIP NETWORK
      ====================================================== */}

      <section
        id="team"
        className="relative overflow-hidden bg-[#071925] py-28 md:py-40"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.11]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
            backgroundSize: "85px 85px",
          }}
        />

        <div className="pointer-events-none absolute left-1/2 top-16 -translate-x-1/2 whitespace-nowrap text-[105px] font-semibold uppercase tracking-[0.12em] text-white/[0.018] md:text-[180px] lg:text-[230px]">
          People
        </div>

        <div className="pointer-events-none absolute -left-[250px] top-[20%] h-[650px] w-[650px] rounded-full bg-cyan-400/[0.04] blur-[170px]" />
        <div className="pointer-events-none absolute -right-[250px] bottom-[10%] h-[650px] w-[650px] rounded-full bg-orange-500/[0.05] blur-[170px]" />

        <TeamNetworkBackdrop />

        <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-10 lg:px-14">
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mb-16 md:mb-20"
          >
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-orange-500" />

              <p className="text-xs font-semibold uppercase tracking-[0.45em] text-orange-500">
                Our Team
              </p>
            </div>

            <div className="mt-7 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
              <h2 className="max-w-4xl text-4xl font-medium leading-[1.05] md:text-6xl">
                Experience behind
                <br />
                every{" "}
                <span className="text-orange-500">
                  connection.
                </span>
              </h2>

              <div className="lg:justify-self-end">
                <p className="max-w-md text-sm leading-7 text-white/50 md:text-base">
                  Industrial experience, strategic thinking and hands-on
                  execution come together to transform ideas and opportunities
                  into measurable progress.
                </p>

                <p className="mt-5 text-[10px] uppercase tracking-[0.35em] text-white/25">
                  Leadership · Strategy · Execution
                </p>
              </div>
            </div>
          </motion.div>

          <div className="relative grid gap-6 md:grid-cols-3">
            <TeamMember
              number="01"
              name="Roberto Cristian Pasti"
              role="Founder & CEO"
              image="/images/PAST.jpg"
              expertise="Industrial Strategy · Commercial Growth · Leadership"
              accent="orange"
              linkedin="https://www.linkedin.com/in/pasti-ceo"
            />

            <TeamMember
              number="02"
              name="Nicolás Romagnoli"
              role="Business Manager & Strategy"
              image="/images/NIKOLAUS.jpg"
              expertise="Business Development · Go-to-Market · Strategic Execution"
              accent="cyan"
              linkedin="https://www.linkedin.com/in/nicol%C3%A1s-romagnoli-205073117"
            />

            <TeamMember
              number="03"
              name="Emilia Müller"
              role="Director, Strategic Projects"
              image="/images/EMILIA.jpg"
              expertise="Transformation · Cross-functional Projects · Delivery"
              accent="orange"
              linkedin="https://www.linkedin.com/in/emilia-m%C3%BCller-452784270"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-24 border-t border-white/[0.08] pt-12"
          >
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="max-w-4xl text-2xl font-light leading-relaxed text-white/70 md:text-4xl">
                  Different perspectives.
                  <br />
                  <span className="text-orange-500">
                    One common purpose.
                  </span>
                </p>

                <p className="mt-5 max-w-2xl text-sm leading-7 text-white/40">
                  Connecting people, industrial knowledge and commercial
                  experience to create meaningful results.
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-px w-12 bg-cyan-400/50" />

                <p className="text-[10px] uppercase tracking-[0.4em] text-white/30">
                  People · Technology · Opportunities
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>


{/* =====================================================
    SECTION 6 — CONTACT
====================================================== */}

<section
  id="contact"
  className="relative overflow-hidden bg-[#061521] py-28 md:py-40"
>
  {/* Background effects */}
  <div className="pointer-events-none absolute left-1/2 top-1/2 h-[650px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/[0.05] blur-[160px]" />

  <div className="pointer-events-none absolute right-0 top-0 h-[420px] w-[420px] rounded-full bg-cyan-400/[0.035] blur-[130px]" />

  <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-10 lg:px-14">
    <motion.div
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08}}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative overflow-hidden rounded-[2.5rem] border border-white/[0.08] bg-white/[0.025] px-8 py-16 md:px-14 md:py-20 lg:px-20"
    >
      {/* Decorative glow */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-orange-500/[0.08] blur-[100px]" />

      <div className="relative grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        {/* LEFT SIDE */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.45em] text-orange-500">
            Let&apos;s Talk
          </p>

          <h2 className="mt-6 max-w-4xl text-4xl font-medium leading-[1.05] md:text-6xl lg:text-7xl">
            Turning industrial
            <br />
            potential into
            <br />
            <span className="text-orange-500">
              measurable progress.
            </span>
          </h2>

          <p className="mt-8 max-w-2xl text-base leading-8 text-white/55">
            Whether you are modernizing manufacturing, exploring
            digital opportunities or developing new markets, Enionic
            can help connect technology, strategy and execution.
          </p>
        </div>

        {/* RIGHT SIDE — CONTACT CARD */}
        <div className="lg:justify-self-end">
          <div className="max-w-md rounded-[2rem] border border-white/[0.08] bg-[#071925]/80 p-8 backdrop-blur-xl md:p-10">
            <p className="text-xs uppercase tracking-[0.3em] text-white/35">
              Start a conversation
            </p>

            <h3 className="mt-5 text-2xl font-medium md:text-3xl">
              Have an industrial or commercial challenge?
            </h3>

            <p className="mt-4 text-sm leading-7 text-white/50">
              Tell us what you are trying to achieve and where you
              see the opportunity.
            </p>

            {/* CONTACT OPTIONS */}
            <div className="mt-8 space-y-3">
              {/* EMAIL */}
              <a
  href="https://mail.google.com/mail/?view=cm&fs=1&to=nikolaus.roemer@enionic.de&su=Enionic%20Business%20Enquiry"
  target="_blank"
  rel="noopener noreferrer"
  className="group flex items-center justify-between rounded-full bg-orange-500 px-6 py-4 text-sm font-medium text-white transition duration-300 hover:bg-orange-400"
>
  <span>Email Enionic</span>

  <span className="transition-transform duration-300 group-hover:translate-x-2">
    →
  </span>
</a>

              {/* WHATSAPP */}
              <a
                href="https://wa.me/4915774156090?text=Hello%20Enionic%2C%20I%20would%20like%20to%20discuss%20a%20business%20opportunity."
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-full border border-white/15 bg-white/[0.03] px-6 py-4 text-sm font-medium text-white transition duration-300 hover:border-green-400/60 hover:bg-green-400/[0.08]"
              >
                <span>WhatsApp Enionic</span>

                <span className="transition-transform duration-300 group-hover:translate-x-2">
                  →
                </span>
              </a>
            </div>

            {/* FOCUS AREAS */}
            <div className="mt-7 border-t border-white/[0.08] pt-6">
              <p className="text-xs uppercase tracking-[0.25em] text-white/30">
                Focus
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  "Manufacturing",
                  "Digitalization",
                  "Market Entry",
                  "Strategic Sales",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 px-3 py-2 text-[11px] text-white/50"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  </div>
</section>
      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer className="relative overflow-hidden border-t border-white/[0.08] bg-[#04111a]">
  {/* =====================================================
      ANIMATED DIGITAL GLOBE
  ====================================================== */}

  <div className="pointer-events-none absolute -right-[190px] -top-[150px] hidden h-[650px] w-[650px] opacity-40 lg:block">
    {/* Glow behind globe */}
    <div className="absolute inset-[10%] rounded-full bg-cyan-400/[0.06] blur-[80px]" />

    <motion.div
      animate={
        prefersReducedMotion
          ? undefined
          : {
              rotate: 360,
            }
      }
      transition={
        prefersReducedMotion
          ? undefined
          : {
              duration: 70,
              repeat: Infinity,
              ease: "linear",
            }
      }
      className="absolute inset-0"
    >
      <svg
        viewBox="0 0 600 600"
        className="h-full w-full"
        fill="none"
        aria-hidden="true"
      >
        {/* Outer globe */}
        <circle
          cx="300"
          cy="300"
          r="215"
          stroke="rgba(34,211,238,0.25)"
          strokeWidth="1.5"
        />

        <circle
          cx="300"
          cy="300"
          r="205"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
        />

        {/* Longitude lines */}
        <ellipse
          cx="300"
          cy="300"
          rx="90"
          ry="215"
          stroke="rgba(34,211,238,0.17)"
          strokeWidth="1"
        />

        <ellipse
          cx="300"
          cy="300"
          rx="150"
          ry="215"
          stroke="rgba(34,211,238,0.12)"
          strokeWidth="1"
        />

        {/* Latitude lines */}
        <ellipse
          cx="300"
          cy="300"
          rx="215"
          ry="70"
          stroke="rgba(255,255,255,0.09)"
          strokeWidth="1"
        />

        <ellipse
          cx="300"
          cy="300"
          rx="215"
          ry="135"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth="1"
        />

        {/* Digital network paths */}
        <path
          d="M155 235 C220 170 345 165 440 240"
          stroke="rgba(249,115,22,0.5)"
          strokeWidth="1.4"
        />

        <path
          d="M175 360 C245 285 365 280 448 340"
          stroke="rgba(249,115,22,0.4)"
          strokeWidth="1.3"
        />

        <path
          d="M210 155 C275 245 350 330 410 420"
          stroke="rgba(34,211,238,0.28)"
          strokeWidth="1.2"
        />

        <path
          d="M170 310 C270 365 355 380 450 300"
          stroke="rgba(34,211,238,0.23)"
          strokeWidth="1"
        />

        {/* Connection nodes */}
        {[
          [155, 235],
          [210, 155],
          [292, 196],
          [440, 240],
          [175, 360],
          [265, 325],
          [360, 305],
          [448, 340],
          [410, 420],
        ].map(([cx, cy], index) => (
          <g key={index}>
            <circle
              cx={cx}
              cy={cy}
              r="7"
              fill="rgba(249,115,22,0.10)"
            />

            <circle
              cx={cx}
              cy={cy}
              r="2.5"
              fill="#f97316"
            />
          </g>
        ))}
      </svg>
    </motion.div>
  </div>

  {/* Secondary ambient glow */}
  <div className="pointer-events-none absolute bottom-0 right-[20%] h-[350px] w-[500px] rounded-full bg-orange-500/[0.035] blur-[130px]" />

  {/* =====================================================
      FOOTER CONTENT
  ====================================================== */}

  <div className="relative z-10 mx-auto max-w-[1400px] px-6 py-16 md:px-10 md:py-20 lg:px-14">
    <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-[1.2fr_0.7fr_1fr]">

      {/* =====================================================
          BRAND
      ====================================================== */}

      <div>
        <Image
          src="/images/enionic-logo.png"
          alt="Enionic"
          width={200}
          height={70}
          className="h-auto w-[165px]"
        />

        <p className="mt-7 max-w-md text-lg font-light leading-8 text-white/70">
          Manufacturing. Digitalization.
          <br />
          Commercial Intelligence.
        </p>

        <p className="mt-4 max-w-sm text-sm leading-7 text-white/40">
          Connecting industrial technology, digital intelligence and
          commercial execution to create measurable impact.
        </p>

        <div className="mt-8 h-px w-14 bg-orange-500" />

        <p className="mt-8 text-[10px] uppercase tracking-[0.4em] text-white/30">
          People · Technology · Opportunities
        </p>
      </div>

      {/* =====================================================
          NAVIGATION
      ====================================================== */}

      <div>
        <p className="text-xs font-medium uppercase tracking-[0.35em] text-white/35">
          Navigate
        </p>

        <div className="mt-7 flex flex-col gap-4 text-sm text-white/60">
          <a
            href="#"
            className="w-fit transition duration-300 hover:translate-x-1 hover:text-orange-500"
          >
            Home
          </a>

          <a
            href="#what-we-do"
            className="w-fit transition duration-300 hover:translate-x-1 hover:text-orange-500"
          >
            What We Do
          </a>

          <a
            href="#industries"
            className="w-fit transition duration-300 hover:translate-x-1 hover:text-orange-500"
          >
            Industries
          </a>

          <a
            href="#about"
            className="w-fit transition duration-300 hover:translate-x-1 hover:text-orange-500"
          >
            About
          </a>

          <a
            href="#team"
            className="w-fit transition duration-300 hover:translate-x-1 hover:text-orange-500"
          >
            Team
          </a>

          <a
            href="#contact"
            className="w-fit transition duration-300 hover:translate-x-1 hover:text-orange-500"
          >
            Contact
          </a>
        </div>
      </div>

      {/* =====================================================
          CONNECT
      ====================================================== */}

      <div>
        <p className="text-xs font-medium uppercase tracking-[0.35em] text-white/35">
          Connect
        </p>

        <div className="mt-7 space-y-5">

          {/* EMAIL */}
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=nikolaus.roemer@enionic.de&su=Enionic%20Business%20Enquiry"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex max-w-sm items-center gap-4"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-orange-500/25 bg-orange-500/[0.05] text-orange-500 transition duration-300 group-hover:border-orange-500 group-hover:bg-orange-500 group-hover:text-white">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <rect
                  x="3"
                  y="5"
                  width="18"
                  height="14"
                  rx="2"
                />

                <path d="m4 7 8 6 8-6" />
              </svg>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-white/30">
                Email
              </p>

              <p className="mt-1 text-sm text-white/65 transition group-hover:text-white">
                nikolaus.roemer@enionic.de
              </p>
            </div>
          </a>

          {/* WHATSAPP */}
          <a
            href="https://wa.me/4915774156090?text=Hello%20Enionic%2C%20I%20would%20like%20to%20discuss%20a%20business%20opportunity."
            target="_blank"
            rel="noopener noreferrer"
            className="group flex max-w-sm items-center gap-4"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/[0.04] text-cyan-400 transition duration-300 group-hover:border-cyan-400 group-hover:bg-cyan-400 group-hover:text-[#04111a]">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6A8.38 8.38 0 0 1 12.5 3h.5a8.48 8.48 0 0 1 8 8v.5Z" />
              </svg>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-white/30">
                WhatsApp
              </p>

              <p className="mt-1 text-sm text-white/65 transition group-hover:text-white">
                +49 1577 4156090
              </p>
            </div>
          </a>
        </div>

        {/* GLOBAL MESSAGE */}
        <div className="mt-8 flex items-center gap-3">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-500 opacity-40" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" />
          </span>

          <span className="text-xs uppercase tracking-[0.25em] text-white/35">
            Industrial opportunities without borders
          </span>
        </div>
      </div>
    </div>

    {/* =====================================================
        BOTTOM BAR
    ====================================================== */}

    <div className="mt-16 flex flex-col gap-6 border-t border-white/[0.08] pt-8 md:flex-row md:items-center md:justify-between">
      <p className="text-xs text-white/30">
        © {new Date().getFullYear()} Enionic. All rights reserved.
      </p>

      <p className="text-xs uppercase tracking-[0.3em] text-orange-500/70">
        Efficiency for digital manufacturing.
      </p>
    </div>
  </div>
</footer>
    </main>
  );
}

/* ============================================================
   TEAM MEMBER
============================================================ */

function TeamMember({
  number,
  name,
  role,
  image,
  expertise,
  accent,
  linkedin,
}: TeamMemberProps) {
  const cyan = accent === "cyan";
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.article
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={
        prefersReducedMotion
          ? undefined
          : { y: -10 }
      }
      className={`group relative overflow-hidden rounded-[2rem] border bg-[#061521] transition-all duration-500 ${
        cyan
          ? "border-cyan-400/15 hover:border-cyan-400/50 hover:shadow-[0_20px_70px_rgba(34,211,238,0.10)]"
          : "border-orange-500/15 hover:border-orange-500/50 hover:shadow-[0_20px_70px_rgba(249,115,22,0.10)]"
      }`}
    >
      <div className="relative h-[420px] overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover object-center grayscale-[25%] saturate-[75%] contrast-[1.05] transition-all duration-700 group-hover:scale-[1.04] group-hover:grayscale-0 group-hover:saturate-100"
        />

        <div className="absolute inset-0 bg-[#061521]/20 transition-opacity duration-700 group-hover:opacity-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061521] via-[#061521]/15 to-[#061521]/20" />

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "45px 45px",
          }}
        />

        <div className="absolute left-7 top-7">
          <span
            className={`text-xs tracking-[0.4em] ${
              cyan ? "text-cyan-400" : "text-orange-500"
            }`}
          >
            {number}
          </span>

          <motion.div
            className={`mt-3 h-px ${cyan ? "bg-cyan-400" : "bg-orange-500"}`}
            initial={{ width: 25 }}
            whileInView={{ width: 45 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </div>

        <div className="absolute right-6 top-6 rounded-full border border-white/10 bg-[#061521]/60 px-4 py-2 backdrop-blur-xl">
          <span className="text-[9px] uppercase tracking-[0.3em] text-white/50">
            Enionic
          </span>
        </div>

        {!prefersReducedMotion && (
          <motion.div
            animate={{
              y: ["-20%", "850%"],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "linear",
              delay: number === "02" ? 1.5 : number === "03" ? 3 : 0,
            }}
            className={`pointer-events-none absolute left-0 top-0 h-px w-full ${
              cyan
                ? "bg-gradient-to-r from-transparent via-cyan-400/35 to-transparent"
                : "bg-gradient-to-r from-transparent via-orange-500/35 to-transparent"
            }`}
          />
        )}

        <div
          className={`absolute bottom-0 left-0 h-[2px] w-[18%] transition-all duration-700 group-hover:w-full ${
            cyan ? "bg-cyan-400" : "bg-orange-500"
          }`}
        />
      </div>

      <div className="relative -mt-14 p-7 pt-0 md:p-8 md:pt-0">
        <div className="relative z-10 rounded-[1.4rem] border border-white/[0.07] bg-[#061521]/90 p-6 backdrop-blur-xl">
          <p
            className={`text-[10px] font-medium uppercase tracking-[0.27em] ${
              cyan ? "text-cyan-400" : "text-orange-500"
            }`}
          >
            {role}
          </p>

          <h3 className="mt-3 text-2xl font-medium leading-tight md:text-[1.8rem]">
            {name}
          </h3>

          <div className="my-5 h-px bg-white/[0.08]" />

          <p className="min-h-[55px] text-sm leading-7 text-white/50">
            {expertise}
          </p>

          <div className="mt-7 flex items-center justify-between gap-4">
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-white/55 transition hover:text-white"
            >
              View LinkedIn

              <span className="transition-transform duration-300 group-hover/link:translate-x-2">
                →
              </span>
            </a>

            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${name}'s LinkedIn profile`}
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition duration-300 ${
                cyan
                  ? "border-cyan-400/25 bg-cyan-400/[0.04] text-cyan-400 hover:border-cyan-400 hover:bg-cyan-400 hover:text-[#061521]"
                  : "border-orange-500/25 bg-orange-500/[0.04] text-orange-500 hover:border-orange-500 hover:bg-orange-500 hover:text-white"
              }`}
            >
              <LinkedInIcon />
            </a>
          </div>
        </div>
      </div>

      <div
        className={`pointer-events-none absolute -bottom-24 -right-24 h-60 w-60 rounded-full opacity-0 blur-[100px] transition-opacity duration-700 group-hover:opacity-100 ${
          cyan ? "bg-cyan-400/[0.12]" : "bg-orange-500/[0.12]"
        }`}
      />
    </motion.article>
  );
}

/* ============================================================
   TEAM NETWORK BACKDROP
============================================================ */

function TeamNetworkBackdrop() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 hidden lg:block">
      <svg
        viewBox="0 0 1440 1000"
        className="absolute left-1/2 top-[230px] h-[700px] w-[1400px] -translate-x-1/2 opacity-40"
        fill="none"
        aria-hidden="true"
      >
        <motion.path
          d="M210 360 C420 240 520 300 720 360 C900 415 1040 245 1230 330"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
          strokeDasharray="7 10"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2.2 }}
        />

        <motion.path
          d="M230 510 C460 620 600 470 740 510 C900 560 1050 470 1210 550"
          stroke="rgba(34,211,238,0.07)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2.5, delay: 0.3 }}
        />

        {[
          [230, 360],
          [520, 300],
          [720, 360],
          [990, 320],
          [1210, 330],
          [390, 560],
          [740, 510],
          [1070, 505],
        ].map(([cx, cy], index) => (
          <g key={index}>
            <circle
              cx={cx}
              cy={cy}
              r="6"
              fill={
                index % 2 === 0
                  ? "rgba(249,115,22,0.12)"
                  : "rgba(34,211,238,0.12)"
              }
            />

            <circle
              cx={cx}
              cy={cy}
              r="2"
              fill={index % 2 === 0 ? "#f97316" : "#22d3ee"}
            />
          </g>
        ))}
      </svg>

      {!prefersReducedMotion && (
        <>
          <motion.div
            animate={{
              x: [-30, 30, -30],
              opacity: [0.2, 0.7, 0.2],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute left-[20%] top-[45%] h-px w-32 bg-gradient-to-r from-transparent via-orange-500/30 to-transparent"
          />

          <motion.div
            animate={{
              x: [30, -30, 30],
              opacity: [0.2, 0.7, 0.2],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute right-[18%] top-[38%] h-px w-36 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
          />
        </>
      )}
    </div>
  );
}

/* ============================================================
   LINKEDIN ICON — ONLY ONE COPY
============================================================ */

function LinkedInIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M6.94 8.5H3.56V19h3.38V8.5ZM5.25 3.25a1.96 1.96 0 1 0 0 3.92 1.96 1.96 0 0 0 0-3.92ZM20.44 13.03c0-3.17-1.69-4.64-3.95-4.64-1.82 0-2.63 1-3.08 1.7V8.5h-3.38c.04 1.05 0 10.5 0 10.5h3.38v-5.86c0-.31.02-.63.12-.85.24-.63.79-1.28 1.72-1.28 1.21 0 1.7.92 1.7 2.28V19h3.38l.11-5.97Z" />
    </svg>
  );
}

/* ============================================================
   MARQUEE
============================================================ */

function JourneyMarquee({
  selectedActivity,
  onSelect,
}: {
  selectedActivity: ActivityType;
  onSelect: (activity: ActivityType) => void;
}) {
  const x = useMotionValue(0);
  const firstSetRef = useRef<HTMLDivElement>(null);
  const [setWidth, setSetWidth] = useState(0);
  const [paused, setPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const element = firstSetRef.current;

    if (!element) return;

    const updateWidth = () => {
      setSetWidth(element.offsetWidth);
    };

    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useAnimationFrame((_, delta) => {
    if (
      paused ||
      prefersReducedMotion ||
      setWidth === 0
    ) {
      return;
    }

    const speed = 0.03;

    let next =
      x.get() - delta * speed;

    if (next <= -setWidth) {
      next += setWidth;
    }

    x.set(next);
  });

  return (
    <div
      className="relative overflow-hidden py-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-30 w-24 bg-gradient-to-r from-[#061521] to-transparent md:w-44" />

      <div className="pointer-events-none absolute inset-y-0 right-0 z-30 w-24 bg-gradient-to-l from-[#061521] to-transparent md:w-44" />

      <motion.div
        style={{ x }}
        className="flex w-max items-center"
      >
        <JourneySet
          setRef={firstSetRef}
          selectedActivity={selectedActivity}
          onSelect={onSelect}
        />

        <JourneySet
          selectedActivity={selectedActivity}
          onSelect={onSelect}
        />
      </motion.div>
    </div>
  );
}

function JourneySet({
  setRef,
  selectedActivity,
  onSelect,
}: {
  setRef?: RefObject<HTMLDivElement | null>;
  selectedActivity: ActivityType;
  onSelect: (activity: ActivityType) => void;
}) {
  return (
    <div
      ref={setRef}
      className="flex shrink-0 items-center gap-14 pr-14"
    >
      {journeyItems.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-14"
        >
          <JourneyItem
            {...item}
            active={
              selectedActivity === item.id
            }
            onClick={() =>
              onSelect(item.id)
            }
          />

          <FlowArrow />
        </div>
      ))}
    </div>
  );
}

/* ============================================================
   JOURNEY ITEM
============================================================ */

function JourneyItem({
  number,
  title,
  text,
  type,
  color,
  active,
  onClick,
}: JourneyItemProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      whileHover={{
        scale: 1.05,
        y: -7,
      }}
      whileTap={{
        scale: 0.97,
      }}
      className="group flex w-[300px] shrink-0 flex-col items-center text-center"
    >
      <div
        className={`relative flex h-36 w-36 items-center justify-center rounded-full border transition-all duration-500 ${
          active
            ? color === "cyan"
              ? "border-cyan-400 bg-cyan-400/10 shadow-[0_0_45px_rgba(34,211,238,0.18)]"
              : "border-orange-500 bg-orange-500/10 shadow-[0_0_45px_rgba(249,115,22,0.18)]"
            : "border-white/10 bg-white/[0.025]"
        }`}
      >
        {type === "factory" && (
          <FactoryIcon />
        )}

        {type === "network" && (
          <NetworkIcon />
        )}

        {type === "growth" && (
          <GrowthIcon />
        )}
      </div>

      <span
        className={`mt-7 text-xs tracking-[0.35em] ${
          active
            ? color === "cyan"
              ? "text-cyan-400"
              : "text-orange-500"
            : "text-white/30"
        }`}
      >
        {number}
      </span>

      <h2 className="mt-3 text-2xl font-medium">
        {title}
      </h2>

      <p className="mt-3 text-sm leading-6 text-white/55">
        {text}
      </p>

      <span
        className={`mt-4 text-[10px] uppercase tracking-[0.3em] ${
          active
            ? color === "cyan"
              ? "text-cyan-400"
              : "text-orange-500"
            : "text-white/25"
        }`}
      >
        {active ? "Selected" : "Explore +"}
      </span>
    </motion.button>
  );
}

/* ============================================================
   ACTIVITY PANEL
============================================================ */

function ActivityPanel({
  activity,
  selectedCapability,
  setSelectedCapability,
}: {
  activity: ActivityType;
  selectedCapability: string;
  setSelectedCapability: (
    id: string
  ) => void;
}) {
  const activityItem =
    activityContent[activity];

  const selected =
    activityItem.capabilities.find(
      (item) =>
        item.id ===
        selectedCapability
    ) ??
    activityItem.capabilities[0];

  const cyan =
    activityItem.accent === "cyan";

  return (
    <motion.div
      layout
      className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-8 backdrop-blur-xl md:p-12"
    >
      <div
        className={`pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-[90px] ${
          cyan
            ? "bg-cyan-400/[0.08]"
            : "bg-orange-500/[0.08]"
        }`}
      />

      <div className="relative grid gap-10 md:grid-cols-[1.3fr_1fr]">
        <div>
          <div className="mb-6 flex items-center gap-4">
            <span
              className={
                cyan
                  ? "text-cyan-400"
                  : "text-orange-500"
              }
            >
              {activityItem.number}
            </span>

            <div
              className={`h-px w-10 ${
                cyan
                  ? "bg-cyan-400/60"
                  : "bg-orange-500/60"
              }`}
            />

            <span className="text-xs uppercase tracking-[0.3em] text-white/40">
              {activityItem.eyebrow}
            </span>
          </div>

          <h3 className="text-3xl font-medium leading-tight md:text-5xl">
            {activityItem.title}
          </h3>

          <p className="mt-5 max-w-2xl leading-7 text-white/55">
            {activityItem.description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 self-center">
          {activityItem.capabilities.map(
            (capability) => {
              const active =
                capability.id ===
                selected.id;

              return (
                <button
                  key={capability.id}
                  type="button"
                  onClick={() =>
                    setSelectedCapability(
                      capability.id
                    )
                  }
                  className={`rounded-full border px-4 py-3 text-xs transition-all duration-300 ${
                    active
                      ? cyan
                        ? "border-cyan-400 bg-cyan-400/10 text-white shadow-[0_0_25px_rgba(34,211,238,0.12)]"
                        : "border-orange-500 bg-orange-500/10 text-white shadow-[0_0_25px_rgba(249,115,22,0.12)]"
                      : "border-white/10 text-white/60 hover:border-white/30 hover:text-white"
                  }`}
                >
                  {capability.title}
                </button>
              );
            }
          )}
        </div>
      </div>

      <div className="relative mt-10 border-t border-white/10 pt-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={selected.id}
            initial={false}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -10,
            }}
            transition={{
              duration: 0.35,
            }}
            className="grid gap-10 md:grid-cols-[1.2fr_1fr]"
          >
            <div>
              <p
                className={`text-xs uppercase tracking-[0.3em] ${
                  cyan
                    ? "text-cyan-400"
                    : "text-orange-500"
                }`}
              >
                {selected.title}
              </p>

              <h4 className="mt-4 text-2xl font-medium md:text-3xl">
                {selected.headline}
              </h4>

              <p className="mt-4 max-w-2xl leading-7 text-white/55">
                {selected.description}
              </p>

              <div className="mt-6 space-y-3">
                {selected.points.map(
                  (point) => (
                    <div
                      key={point}
                      className="flex items-start gap-3 text-sm text-white/65"
                    >
                      <span
                        className={`mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full ${
                          cyan
                            ? "bg-cyan-400"
                            : "bg-orange-500"
                        }`}
                      />

                      <span>
                        {point}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="flex flex-wrap content-start gap-3">
              {selected.tags.map(
                (tag) => (
                  <span
                    key={tag}
                    className={`rounded-full border px-4 py-2 text-xs ${
                      cyan
                        ? "border-cyan-400/20 bg-cyan-400/[0.04] text-cyan-100/70"
                        : "border-orange-500/20 bg-orange-500/[0.04] text-orange-100/70"
                    }`}
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ============================================================
   INDUSTRY CARD
============================================================ */

function IndustryCard({
  number,
  title,
  description,
  accent,
  icon,
  active,
  onClick,
}: IndustryCardProps) {
  const cyan = accent === "cyan";
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08}}
      transition={{
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={
        prefersReducedMotion
          ? undefined
          : { y: -8, scale: 1.01 }
      }
      whileTap={{ scale: 0.99 }}
      className={`group relative min-h-[390px] overflow-hidden rounded-[2rem] border text-left transition-all duration-500 ${
        active
          ? cyan
            ? "border-cyan-400/60 bg-cyan-400/[0.055] shadow-[0_0_55px_rgba(34,211,238,0.10)]"
            : "border-orange-500/60 bg-orange-500/[0.055] shadow-[0_0_55px_rgba(249,115,22,0.10)]"
          : "border-white/[0.08] bg-[#061521]/80 hover:border-white/20"
      }`}
    >
      <IndustryVisual icon={icon} accent={accent} active={active} />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#061521] via-[#061521]/75 to-transparent" />

      <motion.div
        animate={{
          height: active ? "48%" : "18%",
          opacity: active ? 1 : 0.35,
        }}
        transition={{ duration: 0.5 }}
        className={`absolute left-0 top-1/2 w-[2px] -translate-y-1/2 ${
          cyan ? "bg-cyan-400" : "bg-orange-500"
        }`}
      />

      <div className="relative z-10 flex min-h-[390px] flex-col justify-between p-8 md:p-10">
        <div className="flex items-start justify-between">
          <div>
            <span
              className={`text-xs tracking-[0.4em] ${
                cyan ? "text-cyan-400" : "text-orange-500"
              }`}
            >
              {number}
            </span>

            <div
              className={`mt-3 h-px transition-all duration-500 ${
                active ? "w-14" : "w-7"
              } ${cyan ? "bg-cyan-400" : "bg-orange-500"}`}
            />
          </div>

          <div
            className={`flex h-14 w-14 items-center justify-center rounded-full border backdrop-blur-md transition duration-500 ${
              active
                ? cyan
                  ? "border-cyan-400/60 bg-cyan-400/10"
                  : "border-orange-500/60 bg-orange-500/10"
                : "border-white/10 bg-white/[0.025]"
            }`}
          >
            {icon === "machine" && <MachineIndustryIcon />}
            {icon === "robotics" && <RoboticsIndustryIcon />}
            {icon === "electronics" && <ElectronicsIndustryIcon />}
            {icon === "digital" && <DigitalIndustryIcon />}
          </div>
        </div>

        <div className="mt-28">
          <h3 className="max-w-md text-2xl font-medium leading-tight md:text-3xl">
            {title}
          </h3>

          <p className="mt-5 max-w-md text-sm leading-7 text-white/55">
            {description}
          </p>

          <div className="mt-7 flex items-center justify-between">
            <span
              className={`text-[10px] uppercase tracking-[0.35em] ${
                active
                  ? cyan
                    ? "text-cyan-400"
                    : "text-orange-500"
                  : "text-white/35"
              }`}
            >
              {active ? "Currently selected" : "Explore industry"}
            </span>

            <motion.span
              animate={{ x: active ? 7 : 0 }}
              className={`text-xl ${cyan ? "text-cyan-400" : "text-orange-500"}`}
            >
              →
            </motion.span>
          </div>
        </div>
      </div>
    </motion.button>
  );
}

/* ============================================================
   INDUSTRY TECHNICAL VISUAL
============================================================ */

function IndustryVisual({
  icon,
  accent,
  active,
}: {
  icon: IndustryCardProps["icon"];
  accent: "orange" | "cyan";
  active: boolean;
}) {
  const cyan = accent === "cyan";
  const prefersReducedMotion = useReducedMotion();

  const strokeColor = cyan
    ? "rgba(34,211,238,0.55)"
    : "rgba(249,115,22,0.55)";

  const faintStroke = cyan
    ? "rgba(34,211,238,0.14)"
    : "rgba(249,115,22,0.14)";

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />

      <motion.div
        animate={
          prefersReducedMotion
            ? undefined
            : { scale: active ? [1, 1.025, 1] : 1 }
        }
        transition={{
          duration: 5,
          repeat: active ? Infinity : 0,
          ease: "easeInOut",
        }}
        className="absolute right-[-5%] top-[5%] h-[260px] w-[65%]"
      >
        <svg
          viewBox="0 0 500 300"
          className="h-full w-full"
          fill="none"
          aria-hidden="true"
        >
          {icon === "machine" && (
            <>
              <path d="M70 220H430" stroke={faintStroke} />
              <path d="M125 205V110H200V205" stroke={strokeColor} strokeWidth="2" />
              <path d="M200 205V145H300V205" stroke={strokeColor} strokeWidth="2" />
              <path d="M300 205V85H365V205" stroke={strokeColor} strokeWidth="2" />
              <circle cx="162" cy="158" r="18" stroke={strokeColor} />
              <circle cx="333" cy="140" r="26" stroke={faintStroke} />
              <path d="M90 235H405" stroke={faintStroke} strokeDasharray="8 8" />
            </>
          )}

          {icon === "robotics" && (
            <>
              <circle cx="140" cy="220" r="25" stroke={strokeColor} />
              <path d="M150 198L195 150" stroke={strokeColor} strokeWidth="3" />
              <circle cx="205" cy="140" r="14" stroke={strokeColor} />
              <path d="M218 132L286 95" stroke={strokeColor} strokeWidth="3" />
              <circle cx="300" cy="87" r="13" stroke={strokeColor} />
              <path d="M313 90L360 135" stroke={strokeColor} strokeWidth="3" />
              <path d="M360 135L390 122" stroke={strokeColor} strokeWidth="2" />
              <path d="M360 135L390 148" stroke={strokeColor} strokeWidth="2" />
              <circle cx="275" cy="135" r="95" stroke={faintStroke} strokeDasharray="7 9" />
            </>
          )}

          {icon === "electronics" && (
            <>
              <rect x="180" y="85" width="140" height="140" rx="10" stroke={strokeColor} strokeWidth="2" />
              <rect x="215" y="120" width="70" height="70" rx="4" stroke={strokeColor} />

              {[115, 145, 175, 205].map((y) => (
                <g key={y}>
                  <path d={`M130 ${y}H180`} stroke={faintStroke} />
                  <path d={`M320 ${y}H370`} stroke={faintStroke} />
                </g>
              ))}

              {[205, 235, 265, 295].map((x) => (
                <g key={x}>
                  <path d={`M${x} 40V85`} stroke={faintStroke} />
                  <path d={`M${x} 225V270`} stroke={faintStroke} />
                </g>
              ))}

              <circle
                cx="250"
                cy="155"
                r="14"
                fill={cyan ? "rgba(34,211,238,0.12)" : "rgba(249,115,22,0.12)"}
                stroke={strokeColor}
              />
            </>
          )}

          {icon === "digital" && (
            <>
              <circle cx="250" cy="150" r="26" stroke={strokeColor} strokeWidth="2" />

              {[
                [130, 80],
                [360, 75],
                [405, 185],
                [315, 245],
                [150, 230],
                [90, 160],
              ].map(([x, y], index) => (
                <g key={index}>
                  <path d={`M250 150L${x} ${y}`} stroke={faintStroke} />
                  <circle cx={x} cy={y} r="8" stroke={strokeColor} />
                  <circle cx={x} cy={y} r="2" fill={strokeColor} />
                </g>
              ))}

              <circle cx="250" cy="150" r="105" stroke={faintStroke} strokeDasharray="5 8" />
            </>
          )}
        </svg>
      </motion.div>

      {!prefersReducedMotion && (
        <motion.div
          animate={{
            y: ["-20%", "420%"],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
            delay: icon === "robotics" ? 1 : 0,
          }}
          className={`absolute left-0 top-0 h-px w-full ${
            cyan
              ? "bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"
              : "bg-gradient-to-r from-transparent via-orange-500/40 to-transparent"
          }`}
        />
      )}

      <div
        className={`absolute -right-20 -top-20 h-72 w-72 rounded-full blur-[100px] transition-opacity duration-700 ${
          active ? "opacity-100" : "opacity-40"
        } ${
          cyan ? "bg-cyan-400/[0.10]" : "bg-orange-500/[0.10]"
        }`}
      />
    </div>
  );
}

/* ============================================================
   INDUSTRY DETAIL
============================================================ */

function IndustryDetail({
  industry,
}: {
  industry: IndustryType;
}) {
  const content = {
    equipment: {
      number: "01",
      title:
        "Industrial Equipment & Machinery",
      headline:
        "Supporting complex industrial equipment businesses.",
      description:
        "Enionic works with companies involved in machinery, production equipment and industrial systems where technical complexity and long buying cycles require structured commercial development.",
      focus: [
        "Industrial machinery",
        "Production equipment",
        "Capital equipment",
        "Modernization projects",
      ],
      outcomes: [
        "Identify relevant target customers and projects",
        "Support complex industrial sales processes",
        "Translate technical capability into commercial value",
      ],
      accent: "orange",
    },

    automation: {
      number: "02",
      title:
        "Automation & Robotics",
      headline:
        "Connecting automation technology with real industrial needs.",
      description:
        "Enionic supports automation and robotics companies in identifying where their technology can improve productivity, efficiency and industrial transformation.",
      focus: [
        "Robotics",
        "Automation systems",
        "Industrial controls",
        "Smart production",
      ],
      outcomes: [
        "Identify automation opportunities",
        "Connect solutions with manufacturing challenges",
        "Support market and account development",
      ],
      accent: "cyan",
    },

    electronics: {
      number: "03",
      title:
        "Electronics & High-Tech",
      headline:
        "Helping advanced technology reach the right markets.",
      description:
        "Enionic supports electronics and high-tech companies where innovation, engineering and commercial development must work together to create market traction.",
      focus: [
        "Electronics",
        "Embedded technology",
        "High-tech systems",
        "Industrial technology",
      ],
      outcomes: [
        "Identify high-value markets and accounts",
        "Develop commercial positioning",
        "Support strategic sales and market expansion",
      ],
      accent: "cyan",
    },

    "digital-tech": {
      number: "04",
      title:
        "Industrial Digital Technology",
      headline:
        "Connecting digital solutions with industrial value.",
      description:
        "Enionic works with industrial digital technologies that improve connectivity, engineering workflows, manufacturing visibility and decision-making.",
      focus: [
        "Industrial software",
        "Connected manufacturing",
        "Industrial data",
        "Digital workflows",
      ],
      outcomes: [
        "Connect digital technology with business value",
        "Identify industrial use cases",
        "Support digital transformation opportunities",
      ],
      accent: "orange",
    },
  } as const;

  const item =
    content[industry];

  const cyan =
    item.accent === "cyan";

  return (
    <motion.div
      initial={false}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        y: -15,
        scale: 0.99,
      }}
      transition={{
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#061521]/70 p-8 backdrop-blur-xl md:p-10 lg:p-12"
    >
      <div className="relative grid gap-10 lg:grid-cols-[1.25fr_0.9fr]">
        <div>
          <p
            className={`text-xs uppercase tracking-[0.3em] ${
              cyan
                ? "text-cyan-400"
                : "text-orange-500"
            }`}
          >
            {item.number} — {item.title}
          </p>

          <h3 className="mt-4 text-3xl font-medium md:text-4xl">
            {item.headline}
          </h3>

          <p className="mt-5 leading-7 text-white/55">
            {item.description}
          </p>
        </div>

        <div>
          <p className="mb-5 text-xs uppercase tracking-[0.3em] text-white/35">
            Areas of focus
          </p>

          <div className="flex flex-wrap gap-3">
            {item.focus.map(
              (focus) => (
                <span
                  key={focus}
                  className="rounded-full border border-white/10 px-4 py-2 text-xs text-white/60"
                >
                  {focus}
                </span>
              )
            )}
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-white/[0.08] pt-8">
        <p className="mb-5 text-xs uppercase tracking-[0.3em] text-white/35">
          How Enionic creates value
        </p>

        <div className="grid gap-4 md:grid-cols-3">
          {item.outcomes.map(
            (outcome, index) => (
              <div
                key={outcome}
                className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5"
              >
                <span
                  className={`text-xs ${
                    cyan
                      ? "text-cyan-400"
                      : "text-orange-500"
                  }`}
                >
                  0{index + 1}
                </span>

                <p className="mt-3 text-sm leading-6 text-white/65">
                  {outcome}
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ============================================================
   ABOUT PRINCIPLE
============================================================ */

function AboutPrinciple({
  number,
  title,
  text,
  accent,
}: AboutPrincipleProps) {
  const cyan =
    accent === "cyan";

  return (
    <motion.div
      initial={false}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.7,
      }}
      whileHover={{
        x: 8,
      }}
      className="rounded-[1.75rem] border border-white/[0.08] bg-white/[0.025] p-7 md:p-8"
    >
      <div className="flex gap-6">
        <span
          className={`text-xs ${
            cyan
              ? "text-cyan-400"
              : "text-orange-500"
          }`}
        >
          {number}
        </span>

        <div>
          <h3 className="text-xl font-medium md:text-2xl">
            {title}
          </h3>

          <p className="mt-3 text-sm leading-7 text-white/50">
            {text}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ============================================================
   ENIONIC ECOSYSTEM VISUAL
============================================================ */

function EnionicEcosystem() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative w-full">
      {/* =====================================================
          MOBILE ECOSYSTEM
      ====================================================== */}

      <div className="relative mx-auto flex max-w-md flex-col items-center md:hidden">
        {/* CENTRAL NODE */}
        <motion.div
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  boxShadow: [
                    "0 0 15px rgba(249,115,22,0.08)",
                    "0 0 45px rgba(249,115,22,0.20)",
                    "0 0 15px rgba(249,115,22,0.08)",
                  ],
                }
          }
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative z-20 flex h-[135px] w-[135px] flex-col items-center justify-center rounded-full border border-orange-500/40 bg-[#071925]/95 backdrop-blur-xl"
        >
          <Image
            src="/images/enionic-logo.png"
            alt="Enionic"
            width={105}
            height={40}
            className="h-auto w-[88px]"
          />

          <p className="mt-3 text-[8px] uppercase tracking-[0.3em] text-white/35">
            Connected Impact
          </p>
        </motion.div>

        {/* CONNECTOR */}
        <div className="h-10 w-px bg-gradient-to-b from-orange-500/60 to-white/10" />

        {/* MANUFACTURING */}
        <motion.div
          initial={false}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
          }}
          className="w-full rounded-[1.5rem] border border-orange-500/20 bg-[#071925]/90 p-5 backdrop-blur-xl"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-orange-500/30 bg-orange-500/[0.05]">
              <MiniFactoryIcon />
            </div>

            <div>
              <p className="text-[9px] uppercase tracking-[0.3em] text-orange-500">
                01
              </p>

              <h3 className="mt-1 text-lg font-medium">
                Manufacturing
              </h3>
            </div>
          </div>

          <p className="mt-4 text-sm leading-6 text-white/45">
            Industrial technology, automation and operational performance.
          </p>
        </motion.div>

        {/* CONNECTOR */}
        <div className="h-8 w-px bg-gradient-to-b from-orange-500/30 to-cyan-400/30" />

        {/* DIGITALIZATION */}
        <motion.div
          initial={false}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
            delay: 0.1,
          }}
          className="w-full rounded-[1.5rem] border border-cyan-400/20 bg-[#071925]/90 p-5 backdrop-blur-xl"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/[0.05]">
              <MiniNetworkIcon />
            </div>

            <div>
              <p className="text-[9px] uppercase tracking-[0.3em] text-cyan-400">
                02
              </p>

              <h3 className="mt-1 text-lg font-medium">
                Digitalization
              </h3>
            </div>
          </div>

          <p className="mt-4 text-sm leading-6 text-white/45">
            Data, connected workflows and better industrial decision-making.
          </p>
        </motion.div>

        {/* CONNECTOR */}
        <div className="h-8 w-px bg-gradient-to-b from-cyan-400/30 to-orange-500/30" />

        {/* COMMERCIAL INTELLIGENCE */}
        <motion.div
          initial={false}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
            delay: 0.2,
          }}
          className="w-full rounded-[1.5rem] border border-orange-500/20 bg-[#071925]/90 p-5 backdrop-blur-xl"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-orange-500/30 bg-orange-500/[0.05]">
              <MiniGrowthIcon />
            </div>

            <div>
              <p className="text-[9px] uppercase tracking-[0.3em] text-orange-500">
                03
              </p>

              <h3 className="mt-1 text-lg font-medium">
                Commercial Intelligence
              </h3>
            </div>
          </div>

          <p className="mt-4 text-sm leading-6 text-white/45">
            Market signals, opportunity development and commercial execution.
          </p>
        </motion.div>

        <div className="mt-8 flex items-center gap-3">
          <span className="h-px w-8 bg-orange-500/60" />

          <p className="text-[9px] uppercase tracking-[0.32em] text-white/30">
            One connected approach
          </p>
        </div>
      </div>

      {/* =====================================================
          DESKTOP ECOSYSTEM
      ====================================================== */}

      <div className="relative mx-auto hidden h-[560px] w-full max-w-[620px] md:block">
        {/* BACKGROUND GLOW */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/[0.035] blur-[100px]" />

        {/* OUTER RING */}
        <motion.div
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  rotate: 360,
                }
          }
          transition={
            prefersReducedMotion
              ? undefined
              : {
                  duration: 45,
                  repeat: Infinity,
                  ease: "linear",
                }
          }
          className="absolute left-1/2 top-1/2 h-[390px] w-[390px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/[0.08]"
        />

        {/* INNER RING */}
        <motion.div
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  rotate: -360,
                }
          }
          transition={
            prefersReducedMotion
              ? undefined
              : {
                  duration: 70,
                  repeat: Infinity,
                  ease: "linear",
                }
          }
          className="absolute left-1/2 top-1/2 h-[310px] w-[310px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/[0.08]"
        />

        {/* CONNECTING LINES */}
        <svg
          viewBox="0 0 620 560"
          className="pointer-events-none absolute inset-0 h-full w-full"
          fill="none"
          aria-hidden="true"
        >
          <motion.path
            d="M310 280 L150 135"
            stroke="rgba(249,115,22,0.35)"
            strokeWidth="1.5"
            strokeDasharray="7 8"
            initial={{
              pathLength: 0,
            }}
            whileInView={{
              pathLength: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 1.5,
            }}
          />

          <motion.path
            d="M310 280 L470 135"
            stroke="rgba(34,211,238,0.35)"
            strokeWidth="1.5"
            strokeDasharray="7 8"
            initial={{
              pathLength: 0,
            }}
            whileInView={{
              pathLength: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 1.5,
              delay: 0.15,
            }}
          />

          <motion.path
            d="M310 280 L310 470"
            stroke="rgba(249,115,22,0.35)"
            strokeWidth="1.5"
            strokeDasharray="7 8"
            initial={{
              pathLength: 0,
            }}
            whileInView={{
              pathLength: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 1.5,
              delay: 0.3,
            }}
          />
        </svg>

        {/* CENTRAL NODE */}
        <motion.div
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  boxShadow: [
                    "0 0 20px rgba(249,115,22,0.08)",
                    "0 0 60px rgba(249,115,22,0.22)",
                    "0 0 20px rgba(249,115,22,0.08)",
                  ],
                }
          }
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-1/2 top-1/2 z-20 flex h-[160px] w-[160px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-orange-500/40 bg-[#071925]/95 backdrop-blur-xl"
        >
          <Image
            src="/images/enionic-logo.png"
            alt="Enionic"
            width={120}
            height={45}
            className="h-auto w-[105px]"
          />

          <p className="mt-3 text-[9px] uppercase tracking-[0.35em] text-white/35">
            Connected Impact
          </p>
        </motion.div>

        {/* MANUFACTURING */}
        <motion.div
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  y: [0, -8, 0],
                }
          }
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-0 top-[8%] z-20 w-[210px] rounded-[1.5rem] border border-orange-500/20 bg-[#071925]/90 p-5 backdrop-blur-xl"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-orange-500/30 bg-orange-500/[0.05]">
              <MiniFactoryIcon />
            </div>

            <div>
              <p className="text-[9px] uppercase tracking-[0.3em] text-orange-500">
                01
              </p>

              <h3 className="mt-1 text-sm font-medium">
                Manufacturing
              </h3>
            </div>
          </div>

          <p className="mt-4 text-xs leading-6 text-white/45">
            Industrial technology, automation and operational performance.
          </p>
        </motion.div>

        {/* DIGITALIZATION */}
        <motion.div
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  y: [0, 8, 0],
                }
          }
          transition={{
            duration: 4.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-0 top-[8%] z-20 w-[210px] rounded-[1.5rem] border border-cyan-400/20 bg-[#071925]/90 p-5 backdrop-blur-xl"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/[0.05]">
              <MiniNetworkIcon />
            </div>

            <div>
              <p className="text-[9px] uppercase tracking-[0.3em] text-cyan-400">
                02
              </p>

              <h3 className="mt-1 text-sm font-medium">
                Digitalization
              </h3>
            </div>
          </div>

          <p className="mt-4 text-xs leading-6 text-white/45">
            Data, connected workflows and better industrial decision-making.
          </p>
        </motion.div>

        {/* COMMERCIAL */}
        <motion.div
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  y: [0, -7, 0],
                }
          }
          transition={{
            duration: 5.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[1%] left-1/2 z-20 w-[235px] -translate-x-1/2 rounded-[1.5rem] border border-orange-500/20 bg-[#071925]/90 p-5 backdrop-blur-xl"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-orange-500/30 bg-orange-500/[0.05]">
              <MiniGrowthIcon />
            </div>

            <div>
              <p className="text-[9px] uppercase tracking-[0.3em] text-orange-500">
                03
              </p>

              <h3 className="mt-1 text-sm font-medium">
                Commercial Intelligence
              </h3>
            </div>
          </div>

          <p className="mt-4 text-xs leading-6 text-white/45">
            Market signals, opportunity development and commercial execution.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

/* ============================================================
   FLOW ARROW
============================================================ */

function FlowArrow() {
  return (
    <motion.div
      animate={{
        x: [0, 8, 0],
        opacity: [0.35, 1, 0.35],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="shrink-0 text-3xl text-orange-500/70"
    >
      →
    </motion.div>
  );
}

/* ============================================================
   ICONS
============================================================ */

function FactoryIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      className="h-14 w-14 text-orange-500"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M8 52V25l14 8V23l15 9V17l19 10v25H8Z" />
      <path d="M16 52V41h9v11M34 52V40h9v12" />
      <path d="M46 14V7h7v11" />
    </svg>
  );
}

function NetworkIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      className="h-14 w-14 text-cyan-400"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <circle
        cx="32"
        cy="13"
        r="5"
      />

      <circle
        cx="14"
        cy="43"
        r="5"
      />

      <circle
        cx="50"
        cy="43"
        r="5"
      />

      <circle
        cx="32"
        cy="34"
        r="6"
      />

      <path d="M29 18 18 38M35 18l11 20M20 43h24M32 19v9" />
    </svg>
  );
}

function GrowthIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      className="h-14 w-14 text-orange-500"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M10 50h44" />
      <path d="m14 44 12-13 9 7 16-20" />
      <path d="M42 18h9v9" />
    </svg>
  );
}


function MiniFactoryIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      className="h-6 w-6 text-orange-500"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M8 52V25l14 8V23l15 9V17l19 10v25H8Z" />
      <path d="M16 52V41h9v11M34 52V40h9v12" />
      <path d="M46 14V7h7v11" />
    </svg>
  );
}

function MiniNetworkIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      className="h-6 w-6 text-cyan-400"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <circle cx="32" cy="13" r="5" />
      <circle cx="14" cy="43" r="5" />
      <circle cx="50" cy="43" r="5" />
      <circle cx="32" cy="34" r="6" />

      <path d="M29 18 18 38M35 18l11 20M20 43h24M32 19v9" />
    </svg>
  );
}

function MiniGrowthIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      className="h-6 w-6 text-orange-500"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M10 50h44" />
      <path d="m14 44 12-13 9 7 16-20" />
      <path d="M42 18h9v9" />
    </svg>
  );
}

function MachineIndustryIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      className="h-8 w-8 text-orange-500"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <rect
        x="10"
        y="20"
        width="44"
        height="30"
        rx="3"
      />

      <path d="M18 20V12h12v8M37 20V9h9v11" />

      <circle
        cx="24"
        cy="35"
        r="5"
      />

      <circle
        cx="42"
        cy="35"
        r="5"
      />
    </svg>
  );
}

function RoboticsIndustryIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      className="h-8 w-8 text-cyan-400"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <circle
        cx="18"
        cy="46"
        r="5"
      />

      <circle
        cx="29"
        cy="28"
        r="4"
      />

      <circle
        cx="46"
        cy="17"
        r="4"
      />

      <path d="M21 42l6-10M32 27l10-8M46 21v14l8 6" />

      <path d="M14 51h10" />
    </svg>
  );
}

function ElectronicsIndustryIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      className="h-8 w-8 text-cyan-400"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <rect
        x="19"
        y="19"
        width="26"
        height="26"
        rx="3"
      />

      <path d="M25 10v9M32 10v9M39 10v9" />

      <path d="M25 45v9M32 45v9M39 45v9" />

      <path d="M10 25h9M10 32h9M10 39h9" />

      <path d="M45 25h9M45 32h9M45 39h9" />
    </svg>
  );
}

function DigitalIndustryIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      className="h-8 w-8 text-orange-500"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <circle
        cx="16"
        cy="32"
        r="4"
      />

      <circle
        cx="32"
        cy="16"
        r="4"
      />

      <circle
        cx="48"
        cy="32"
        r="4"
      />

      <circle
        cx="32"
        cy="48"
        r="4"
      />

      <path d="M19 29l10-10M35 19l10 10M45 35l-10 10M29 45l-10-10" />

      <circle
        cx="32"
        cy="32"
        r="6"
      />
    </svg>
  );
}