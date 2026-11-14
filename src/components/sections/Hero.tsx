"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/primitives";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Pointer-driven tilt
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rx = useSpring(useTransform(py, [-0.5, 0.5], [7, -7]), { stiffness: 90, damping: 20 });
  const ry = useSpring(useTransform(px, [-0.5, 0.5], [-10, 10]), { stiffness: 90, damping: 20 });

  // Scroll parallax
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const stageY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const stageScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const onPointerMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onPointerLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <section
      id="home"
      ref={ref}
      aria-labelledby="hero-title"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="noise relative isolate overflow-hidden pt-[calc(var(--header-h)+3rem)] pb-20 sm:pt-[calc(var(--header-h)+5rem)] lg:min-h-[100svh] lg:pb-28"
    >
      <Backdrop />

      <div className="container-x grid items-center gap-14 lg:grid-cols-[1.02fr_1fr] lg:gap-8">
        <motion.div style={reduce ? undefined : { y: copyY, opacity: copyOpacity }} className="relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] py-1 pr-4 pl-1 text-xs text-fg-muted backdrop-blur"
          >
            <span className="rounded-full bg-gradient-to-r from-electric to-violet px-2.5 py-0.5 text-[0.7rem] font-semibold text-snow">
              NextGen Technologies
            </span>
            Software development &amp; product company
          </motion.p>

          <h1 id="hero-title" className="mt-7 text-[2.55rem] leading-[1.03] font-semibold sm:text-6xl lg:text-[4.1rem]">
            <span className="sr-only">NextGen Technologies — </span>
            {["Building Digital", "Products."].map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className="block"
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.1 + i * 0.1, ease }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
            <span className="block overflow-hidden pb-[0.08em]">
              <motion.span
                className="text-gradient text-gradient-animated block"
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.3, ease }}
              >
                Empowering Businesses.
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-fg-muted"
          >
            NextGen Technologies designs and engineers websites, web and mobile applications and APIs for clients — and builds its own
            SaaS products, Autonexa, Flowza and BuildPilot.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.58, ease }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <Button href="/#products" size="lg">
              Explore Our Products
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Button>
            <Button href="/#contact" size="lg" variant="outline">
              Let&apos;s Work Together
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
            </Button>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-12 flex flex-wrap gap-x-6 gap-y-2 text-sm text-fg-subtle"
            aria-label="What we do"
          >
            {["SaaS products", "Websites", "Web apps", "Mobile", "APIs", "UI/UX"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span aria-hidden className="h-1 w-1 rounded-full bg-electric-soft" />
                {t}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          style={reduce ? undefined : { y: stageY, scale: stageScale }}
          className="relative mx-auto w-full max-w-[640px] lg:max-w-none"
        >
          <Stage rx={rx} ry={ry} reduce={!!reduce} />
        </motion.div>
      </div>
    </section>
  );
}

function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div className="grid-bg absolute inset-0" />
      <div className="absolute -top-40 left-1/2 h-[46rem] w-[46rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(61,123,255,0.22),transparent_62%)] blur-2xl" />
      <div className="absolute top-1/3 -right-40 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(109,91,255,0.25),transparent_60%)] blur-2xl" />
      <div className="absolute -bottom-40 -left-40 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(61,220,196,0.08),transparent_60%)] blur-2xl" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink-900" />
    </div>
  );
}

/** Layered pseudo-3D composition. Every screen is a real product capture. */
function Stage({ rx, ry, reduce }: { rx: MotionValue<number>; ry: MotionValue<number>; reduce: boolean }) {
  const enter = (delay: number, z = 0) => ({
    initial: { opacity: 0, y: 40, z: z - 80 },
    animate: { opacity: 1, y: 0, z },
    transition: { duration: 1.1, delay, ease },
  });

  return (
    <div className="relative aspect-[1/0.92] w-full [perspective:1800px] sm:aspect-[1/0.82]">
      {/* Orbit rings */}
      <div aria-hidden className="absolute inset-[6%] rounded-full border border-white/[0.06]" />
      <div aria-hidden className="animate-spin-slow absolute inset-[-4%] rounded-full border border-dashed border-white/[0.06]">
        <span className="absolute top-1/2 -left-1 h-2 w-2 rounded-full bg-electric-soft shadow-[0_0_14px_4px_rgba(107,155,255,0.6)]" />
        <span className="absolute -top-1 left-1/2 h-1.5 w-1.5 rounded-full bg-lilac shadow-[0_0_12px_3px_rgba(180,156,255,0.6)]" />
      </div>

      <motion.div
        className="absolute inset-0 [transform-style:preserve-3d]"
        style={reduce ? undefined : { rotateX: rx, rotateY: ry }}
      >
        {/* Back: Flowza lobby display */}
        <motion.div {...enter(0.5, -110)} className="absolute top-[2%] right-[0%] w-[58%] [transform-style:preserve-3d]">
          <div className="animate-float-slow">
            <Tag className="-top-3 right-4">Flowza · Lobby display</Tag>
            <div className="overflow-hidden rounded-xl border border-white/10 shadow-[0_30px_60px_-20px_var(--shade)]">
              <Image src="/products/flowza/display.jpg" alt="" width={1460} height={680} sizes="(min-width:1024px) 22vw, 50vw" className="h-auto w-full" />
            </div>
          </div>
        </motion.div>

        {/* Center: Autonexa dashboard in browser */}
        <motion.div {...enter(0.25, 0)} className="absolute top-[24%] left-[6%] w-[78%] [transform-style:preserve-3d]">
          <div className="animate-float">
            <Tag className="-top-3 left-4">Autonexa · Dashboard</Tag>
            <div className="ring-gradient overflow-hidden rounded-xl bg-ink-850 shadow-[0_40px_90px_-20px_var(--shade)]">
              <div className="flex h-6 items-center gap-1 border-b border-white/[0.07] bg-ink-800 px-2.5">
                <span className="h-2 w-2 rounded-full bg-white/20" />
                <span className="h-2 w-2 rounded-full bg-white/20" />
                <span className="h-2 w-2 rounded-full bg-white/20" />
              </div>
              <Image
                src="/products/autonexa/dashboard.webp"
                alt="Autonexa dashboard"
                width={1920}
                height={1200}
                priority
                sizes="(min-width:1024px) 34vw, 80vw"
                className="h-auto w-full"
              />
            </div>
          </div>
        </motion.div>

        {/* Front-right: Flowza live queue */}
        <motion.div {...enter(0.75, 90)} className="absolute right-[-2%] bottom-[2%] w-[40%] [transform-style:preserve-3d]">
          <div className="animate-float [animation-delay:-3s]">
            <Tag className="-top-3 left-3">Flowza · Live queue</Tag>
            <div className="overflow-hidden rounded-xl border border-white/15 shadow-[0_30px_70px_-15px_var(--shade)]">
              <Image src="/products/flowza/queue.jpg" alt="Flowza live queue" width={960} height={800} sizes="(min-width:1024px) 16vw, 40vw" className="h-auto w-full" />
            </div>
          </div>
        </motion.div>

        {/* Front-left: Autonexa mobile */}
        <motion.div {...enter(0.9, 150)} className="absolute bottom-[-4%] left-[-2%] w-[22%] [transform-style:preserve-3d]">
          <div className="animate-float-slow [animation-delay:-5s]">
            <div className="rounded-[1.1rem] border border-white/20 bg-[#04060d] p-1 shadow-[0_30px_60px_-10px_var(--shade)]">
              <div className="overflow-hidden rounded-[0.9rem]">
                <Image src="/products/autonexa/dashboard-phone.webp" alt="Autonexa mobile app" width={780} height={1688} sizes="140px" className="h-auto w-full" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Decorative code window */}
        <motion.div
          {...enter(1.05, 120)}
          aria-hidden
          className="glass absolute top-[6%] left-[-4%] hidden w-[38%] rounded-xl p-3 font-mono text-[0.6rem] leading-relaxed shadow-2xl sm:block"
        >
          <div className="mb-2 flex gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-electric-soft" />
            <span className="h-1.5 w-1.5 rounded-full bg-violet" />
            <span className="h-1.5 w-1.5 rounded-full bg-lilac" />
          </div>
          <p>
            <span className="text-lilac">const</span> <span className="text-white">product</span> ={" "}
            <span className="text-electric-soft">build</span>({"{"}
          </p>
          <p className="pl-3 text-fg-muted">
            idea, design: <span className="text-signal">&quot;premium&quot;</span>,
          </p>
          <p className="pl-3 text-fg-muted">
            scale: <span className="text-signal">&quot;global&quot;</span>
          </p>
          <p>{"});"}</p>
          <p>
            <span className="text-white">product</span>.<span className="text-electric-soft">launch</span>(){" "}
            <span className="text-signal">✓</span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

function Tag({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`absolute z-10 rounded-full border border-white/15 bg-ink-900/85 px-2.5 py-0.5 text-[0.62rem] font-medium whitespace-nowrap text-fg backdrop-blur ${className}`}
    >
      {children}
    </span>
  );
}
