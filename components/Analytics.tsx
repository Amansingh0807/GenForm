"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  TrendingUp,
  TrendingDown,
  FileText,
  Send,
  CheckCircle,
  BarChart3,
  Activity,
  Clock,
  Target,
} from "lucide-react";
import Link from "next/link";

/* -------------------- animation variants -------------------- */

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};


/* -------------------- green/blue color palette -------------------- */

const colorMap = {
  green: {
    gradient: "from-green-500 via-emerald-500 to-teal-500",
    bg: "bg-green-500/10",
    text: "text-green-600 dark:text-green-400",
    border: "border-green-500/20",
    glow: "shadow-green-500/20",
  },
  emerald: {
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    bg: "bg-emerald-500/10",
    text: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-500/20",
    glow: "shadow-emerald-500/20",
  },
  teal: {
    gradient: "from-teal-500 via-cyan-500 to-blue-500",
    bg: "bg-teal-500/10",
    text: "text-teal-600 dark:text-teal-400",
    border: "border-teal-500/20",
    glow: "shadow-teal-500/20",
  },
  blue: {
    gradient: "from-blue-500 via-indigo-500 to-cyan-500",
    bg: "bg-blue-500/10",
    text: "text-blue-600 dark:text-blue-400",
    border: "border-blue-500/20",
    glow: "shadow-blue-500/20",
  },
} as const;

/* -------------------- count-up hook (visual only) -------------------- */

const useCountUp = (value: number) => {
  const [count, setCount] = useState(0);
  const spring = useSpring(0, {
    stiffness: 50,
    damping: 30,
  });

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (latest) => {
      setCount(Math.floor(latest));
    });
    return () => unsubscribe();
  }, [spring]);

  return count;
};

/* -------------------- types -------------------- */

type AnalyticsData = {
  totalForms: number;
  totalSubmissions: number;
  publishedForms: number;
  avgSubmissionsPerForm: number;
  submissionsByDay: Array<{ date: string; count: number }>;
  topForms: Array<{
    id: string;
    title: string;
    submissions: number;
    published: boolean;
    createdAt: Date;
  }>;
  recentActivity: Array<{
    id: number;
    formTitle: string;
    formId: string;
    createdAt: Date;
  }>;
  growthPercentage: number;
  recentSubmissionsCount: number;
};

type Props = {
  data: AnalyticsData | null;
};

/* -------------------- component -------------------- */

const Analytics: React.FC<Props> = ({ data }) => {
  // Hooks must be called before any early returns
  const totalForms = useCountUp(data?.totalForms ?? 0);
  const totalSubmissions = useCountUp(data?.totalSubmissions ?? 0);
  const publishedForms = useCountUp(data?.publishedForms ?? 0);
  const avgPerForm = useCountUp(data?.avgSubmissionsPerForm ?? 0);

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">No analytics data available</p>
      </div>
    );
  }

  const maxSubmissions = Math.max(
    ...data.submissionsByDay.map((d) => d.count),
    1
  );

  const getTimeAgo = (date: Date) => {
    const seconds = (Date.now() - new Date(date).getTime()) / 1000;
    if (seconds < 60) return "just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="
        p-3 sm:p-4 md:p-6 lg:p-8
        space-y-4 sm:space-y-6 lg:space-y-8
        w-full
      "

    >
      {/* Dashboard Heading */}
      <motion.div
        className="flex items-center justify-between mb-2 sm:mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <motion.h1
          className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-blue-600 dark:from-green-400 dark:via-emerald-400 dark:to-blue-400 bg-clip-text text-transparent"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            backgroundSize: "200% 200%",
          }}
        >
          Dashboard
        </motion.h1>
        {/* Subtle Live Indicator */}
        <motion.div
          className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full backdrop-blur-sm border overflow-hidden relative"
          whileHover={{ scale: 1.05 }}
          animate={{
            borderColor: [
              "rgba(34, 197, 94, 0.2)",
              "rgba(16, 185, 129, 0.3)",
              "rgba(59, 130, 246, 0.3)",
              "rgba(34, 197, 94, 0.2)",
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-emerald-500/15 to-blue-500/10 dark:from-green-500/20 dark:via-emerald-500/25 dark:to-blue-500/20"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              backgroundSize: "200% 200%",
            }}
          />
          <motion.div
            className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full relative z-10"
            animate={{
              scale: [1, 1.2, 1],
              background: [
                "linear-gradient(to right, rgb(34, 197, 94), rgb(16, 185, 129))",
                "linear-gradient(to right, rgb(16, 185, 129), rgb(59, 130, 246))",
                "linear-gradient(to right, rgb(59, 130, 246), rgb(34, 197, 94))",
                "linear-gradient(to right, rgb(34, 197, 94), rgb(16, 185, 129))",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.span
            className="text-[10px] sm:text-xs font-medium relative z-10"
            animate={{
              color: [
                "rgb(22, 163, 74)",
                "rgb(5, 150, 105)",
                "rgb(37, 99, 235)",
                "rgb(22, 163, 74)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Live
          </motion.span>
        </motion.div>
      </motion.div>

      {/* Modern Glassmorphism Stat Cards */}
      <motion.div
        variants={container}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6"
      >
        {[
          {
            label: "Total Forms",
            value: totalForms,
            icon: FileText,
            color: "green" as const,
            sub: `${data.publishedForms} published`,
            delay: 0.1,
          },
          {
            label: "Total Submissions",
            value: totalSubmissions,
            icon: Send,
            color: "emerald" as const,
            sub: `${Math.abs(data.growthPercentage)}% vs last week`,
            trend: data.growthPercentage >= 0,
            delay: 0.2,
          },
          {
            label: "Published Forms",
            value: publishedForms,
            icon: CheckCircle,
            color: "teal" as const,
            sub: `${data.totalForms - data.publishedForms} drafts`,
            delay: 0.3,
          },
          {
            label: "Avg per Form",
            value: avgPerForm,
            icon: BarChart3,
            color: "blue" as const,
            sub: "submissions/form",
            delay: 0.4,
          },
        ].map((card, index) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 40, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.7,
              delay: card.delay || index * 0.1,
              type: "spring",
              stiffness: 120,
              damping: 20,
            }}
            whileHover={{
              y: -8,
              scale: 1.02,
              rotateY: 3,
              transition: {
                type: "spring",
                stiffness: 400,
                damping: 20,
              },
            }}
            whileTap={{ scale: 0.97 }}
            className="relative group cursor-pointer"
          >
            {/* Glowing border effect */}
            <motion.div
              className={`absolute -inset-[1px] rounded-2xl bg-gradient-to-r ${colorMap[card.color].gradient} opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500`}
              animate={{
                opacity: [0, 0.4, 0],
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: index * 0.6,
                ease: "linear",
              }}
              style={{
                backgroundSize: "200% 200%",
              }}
            />

            <Card
              className={`relative backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 border ${colorMap[card.color].border} rounded-2xl overflow-hidden transition-all duration-500 group-hover:shadow-2xl ${colorMap[card.color].glow} group-hover:border-opacity-50`}
            >
              {/* Animated gradient overlay */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${colorMap[card.color].gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  backgroundSize: "200% 200%",
                }}
              />

              {/* Circular icon background */}
              <motion.div
                className={`absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br ${colorMap[card.color].gradient} opacity-10 blur-2xl`}
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              <CardHeader className="flex flex-row items-start justify-between pb-2 sm:pb-3 relative z-10 pt-4 sm:pt-5 lg:pt-6 px-4 sm:px-5 lg:px-6">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                  {card.label}
                </CardTitle>
                  <motion.div
                    className="text-2xl sm:text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent break-words"
                    key={card.value}
                    initial={{ scale: 1.3, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                    }}
                  >
                    {card.value.toLocaleString()}
                  </motion.div>
                </div>
                <motion.div
                  className={`p-2 sm:p-2.5 lg:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br ${colorMap[card.color].gradient} shadow-lg flex-shrink-0 ml-2 relative overflow-hidden`}
                  whileHover={{
                    rotate: [0, -15, 15, -15, 0],
                    scale: 1.15,
                  }}
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                    backgroundPosition: {
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    },
                  }}
                  style={{
                    backgroundSize: "200% 200%",
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                      delay: index * 0.3,
                    }}
                  />
                  <card.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white relative z-10" />
                </motion.div>
              </CardHeader>

              <CardContent className="relative z-10 pt-0 px-4 sm:px-5 lg:px-6 pb-4 sm:pb-5 lg:pb-6">
                {card.label === "Total Submissions" ? (
                  <motion.div
                    className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-medium"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <motion.div
                      className={`p-1 sm:p-1.5 rounded-md sm:rounded-lg ${
                        data.growthPercentage >= 0
                          ? "bg-green-500/20"
                          : "bg-red-500/20"
                      }`}
                      animate={{
                        y: data.growthPercentage >= 0 ? [0, -3, 0] : [0, 3, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                    {data.growthPercentage >= 0 ? (
                        <TrendingUp
                          className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${
                            data.growthPercentage >= 0
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        />
                      ) : (
                        <TrendingDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-500" />
                      )}
                    </motion.div>
                    <motion.span
                      className={
                        data.growthPercentage >= 0
                          ? "text-green-600 dark:text-green-400 font-bold"
                          : "text-red-600 dark:text-red-400 font-bold"
                      }
                      animate={{
                        scale: [1, 1.08, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      {card.sub}
                    </motion.span>
                  </motion.div>
                ) : (
                  <motion.p
                    className="text-[10px] sm:text-xs font-medium text-gray-500 dark:text-gray-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {card.sub}
                  </motion.p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Grid Layout for Activity Sections */}
      <motion.div
        variants={container}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6"
      >
        {/* Last 7 Days Activity - Modern Design */}
        <motion.div variants={item} className="md:col-span-2 lg:col-span-2">
          <Card className="backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/50 rounded-xl sm:rounded-2xl shadow-xl overflow-hidden h-full">
          <CardHeader className="bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-blue-500/10 border-b border-gray-200/50 dark:border-gray-700/50 px-4 sm:px-5 lg:px-6 py-3 sm:py-4">
            <CardTitle className="flex items-center gap-2 sm:gap-3">
              <motion.div
                className="p-1.5 sm:p-2 rounded-md sm:rounded-lg relative overflow-hidden"
                animate={{
                  rotate: [0, 360],
                  background: [
                    "linear-gradient(135deg, rgb(34, 197, 94), rgb(16, 185, 129))",
                    "linear-gradient(135deg, rgb(16, 185, 129), rgb(59, 130, 246))",
                    "linear-gradient(135deg, rgb(59, 130, 246), rgb(34, 197, 94))",
                    "linear-gradient(135deg, rgb(34, 197, 94), rgb(16, 185, 129))",
                  ],
                }}
                transition={{
                  rotate: {
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  },
                  background: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
              >
                <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-white relative z-10" />
              </motion.div>
              <span className="text-sm sm:text-base lg:text-lg font-bold text-gray-800 dark:text-gray-200">
              Last 7 Days Activity
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-5 lg:p-6 space-y-3 sm:space-y-4">
            {data.submissionsByDay.map((day, i) => (
              <motion.div
                key={day.date}
                className="flex items-center gap-2 sm:gap-3 md:gap-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <span className="w-12 sm:w-14 md:w-16 text-[10px] sm:text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider flex-shrink-0">
                  {day.date}
                </span>
                <div className="flex-1 relative min-w-0">
                  <div className="h-6 sm:h-7 md:h-8 bg-gray-100 dark:bg-gray-700/50 rounded-full overflow-hidden backdrop-blur-sm">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${(day.count / maxSubmissions) * 100}%`,
                        background: [
                          "linear-gradient(to right, rgb(34, 197, 94), rgb(16, 185, 129), rgb(59, 130, 246))",
                          "linear-gradient(to right, rgb(16, 185, 129), rgb(59, 130, 246), rgb(34, 197, 94))",
                          "linear-gradient(to right, rgb(59, 130, 246), rgb(34, 197, 94), rgb(16, 185, 129))",
                          "linear-gradient(to right, rgb(34, 197, 94), rgb(16, 185, 129), rgb(59, 130, 246))",
                        ],
                      }}
                      transition={{
                        width: {
                          duration: 0.8,
                          delay: i * 0.1,
                          type: "spring",
                          stiffness: 100,
                        },
                        background: {
                          duration: 4,
                          repeat: Infinity,
                          ease: "linear",
                          delay: i * 0.2,
                        },
                      }}
                      className="h-full flex items-center justify-end pr-2 sm:pr-3 relative overflow-hidden"
                    >
                      {/* Shimmer effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        animate={{
                          x: ["-100%", "100%"],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear",
                          delay: i * 0.2,
                        }}
                      />
                    {day.count > 0 && (
                        <motion.span
                          className="text-[10px] sm:text-xs text-white font-bold relative z-10"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.1 + 0.5 }}
                        >
                        {day.count}
                        </motion.span>
                    )}
                  </motion.div>
                </div>
              </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
        </motion.div>

        {/* Top Performing Forms - Modern Design */}
        <motion.div variants={item} className="lg:col-span-1">
          <Card className="backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/50 rounded-xl sm:rounded-2xl shadow-xl overflow-hidden h-full flex flex-col">
          <CardHeader className="bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-blue-500/10 border-b border-gray-200/50 dark:border-gray-700/50 px-4 sm:px-5 lg:px-6 py-3 sm:py-4">
            <CardTitle className="flex items-center gap-2 sm:gap-3">
              <motion.div
                className="p-1.5 sm:p-2 rounded-md sm:rounded-lg relative overflow-hidden"
                whileHover={{ rotate: 360 }}
                animate={{
                  background: [
                    "linear-gradient(135deg, rgb(16, 185, 129), rgb(20, 184, 166))",
                    "linear-gradient(135deg, rgb(20, 184, 166), rgb(59, 130, 246))",
                    "linear-gradient(135deg, rgb(59, 130, 246), rgb(16, 185, 129))",
                    "linear-gradient(135deg, rgb(16, 185, 129), rgb(20, 184, 166))",
                  ],
                }}
                transition={{
                  rotate: {
                    duration: 0.6,
                  },
                  background: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
              >
                <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-white relative z-10" />
              </motion.div>
              <span className="text-sm sm:text-base lg:text-lg font-bold text-gray-800 dark:text-gray-200">
              Top Performing Forms
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-5 lg:p-6 space-y-2 sm:space-y-3 flex-1 overflow-y-auto">
            {data.topForms.map((form, index) => (
              <motion.div
                key={form.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
              >
                <Link
                  href={`/dashboard/forms/${form.id}/submissions`}
                  className="block p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gradient-to-r from-gray-50/50 to-gray-100/50 dark:from-gray-700/50 dark:to-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 hover:border-emerald-500/50 dark:hover:border-emerald-400/50 transition-all duration-300 group"
                >
                  <div className="flex justify-between items-center gap-2 sm:gap-3">
                    <span className="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-200 truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors min-w-0">
                      {form.title}
                    </span>
                    <motion.span
                      className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-xs sm:text-sm shadow-lg flex-shrink-0"
                      whileHover={{ scale: 1.1 }}
                    >
                      {form.submissions}
                    </motion.span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </CardContent>
        </Card>
        </motion.div>

        {/* Recent Activity - Modern Design */}
        <motion.div variants={item} className="lg:col-span-1">
          <Card className="backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/50 rounded-xl sm:rounded-2xl shadow-xl overflow-hidden h-full flex flex-col">
          <CardHeader className="bg-gradient-to-r from-teal-500/10 via-cyan-500/10 to-blue-500/10 border-b border-gray-200/50 dark:border-gray-700/50 px-4 sm:px-5 lg:px-6 py-3 sm:py-4">
            <CardTitle className="flex items-center gap-2 sm:gap-3">
              <motion.div
                className="p-1.5 sm:p-2 rounded-md sm:rounded-lg relative overflow-hidden"
                animate={{
                  scale: [1, 1.1, 1],
                  background: [
                    "linear-gradient(135deg, rgb(20, 184, 166), rgb(6, 182, 212))",
                    "linear-gradient(135deg, rgb(6, 182, 212), rgb(59, 130, 246))",
                    "linear-gradient(135deg, rgb(59, 130, 246), rgb(20, 184, 166))",
                    "linear-gradient(135deg, rgb(20, 184, 166), rgb(6, 182, 212))",
                  ],
                }}
                transition={{
                  scale: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                  background: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
              >
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-white relative z-10" />
              </motion.div>
              <span className="text-sm sm:text-base lg:text-lg font-bold text-gray-800 dark:text-gray-200">
              Recent Activity
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-5 lg:p-6 space-y-2 sm:space-y-3 flex-1 overflow-y-auto">
            {data.recentActivity.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 8, scale: 1.02 }}
              >
                <Link
                  href={`/dashboard/forms/${activity.formId}/submissions`}
                  className="block p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gradient-to-r from-gray-50/50 to-gray-100/50 dark:from-gray-700/50 dark:to-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 hover:border-teal-500/50 dark:hover:border-teal-400/50 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <motion.div
                      className="relative flex-shrink-0"
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <motion.div
                        className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 shadow-lg shadow-teal-500/50"
                        animate={{
                          boxShadow: [
                            "0 0 0 0 rgba(20, 184, 166, 0.7)",
                            "0 0 0 8px rgba(20, 184, 166, 0)",
                            "0 0 0 0 rgba(20, 184, 166, 0)",
                          ],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeOut",
                        }}
                      />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">
                        New submission to{" "}
                        <span className="bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent font-bold">
                          {activity.formTitle}
                        </span>
                      </p>
                      <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mt-0.5 sm:mt-1">
                        {getTimeAgo(activity.createdAt)}
                      </p>
                    </div>
                    <motion.div
                      className="flex-shrink-0"
                      animate={{
                        x: [0, 4, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Target className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-500 opacity-60" />
                    </motion.div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </CardContent>
        </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Analytics;
