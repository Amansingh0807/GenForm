import React from "react";
import {
  TrendingUp,
  TrendingDown,
  FileText,
  Send,
  CheckCircle,
  BarChart3,
  Activity,
  Clock,
} from "lucide-react";
import Link from "next/link";

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

const glassCard =
  "relative overflow-hidden bg-white/60 dark:bg-slate-900/45 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/30 dark:hover:border-emerald-500/20 hover:shadow-lg dark:hover:shadow-none hover:-translate-y-1";

const Analytics: React.FC<Props> = ({ data }) => {
  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] font-sans text-sm text-gray-500 select-none">
        <span className="flex h-2 w-2 relative mr-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
        </span>
        No diagnostics data available
      </div>
    );
  }

  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
    if (seconds < 60) return "just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const maxSubmissions = Math.max(
    ...data.submissionsByDay.map((d) => d.count),
    1
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold font-syne text-gray-900 dark:text-white mb-1 tracking-tight">
          Analytics Dashboard
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-sans">
          Track and orchestrate your form engagement telemetries in real-time.
        </p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Card 1: Total Forms */}
        <div className={glassCard}>
          <div className="flex items-center justify-between pb-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 font-syne">
              Total Forms
            </h4>
            <FileText className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-3xl font-extrabold font-syne text-gray-900 dark:text-white mt-1">
            {data.totalForms}
          </div>
          <p className="text-[10px] font-sans text-emerald-600 dark:text-emerald-400 mt-2">
            {data.publishedForms} active in production
          </p>
        </div>

        {/* Card 2: Total Submissions */}
        <div className={glassCard}>
          <div className="flex items-center justify-between pb-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 font-syne">
              Total Submissions
            </h4>
            <Send className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-3xl font-extrabold font-syne text-gray-900 dark:text-white mt-1">
            {data.totalSubmissions}
          </div>
          <div className="flex items-center gap-1 mt-2 font-sans text-[10px]">
            {/* {data.growthPercentage >= 0 ? (
              <TrendingUp className="w-3 h-3 text-emerald-500" />
            ) : (
              <TrendingDown className="w-3 h-3 text-red-500" />
            )} */}
            <p
              className={`${data.growthPercentage >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-500"}`}
            >
              {data.growthPercentage >= 0 ? "+" : ""}
              {data.growthPercentage}% weekly delta
            </p>
          </div>
        </div>

        {/* Card 3: Published Forms */}
        <div className={glassCard}>
          <div className="flex items-center justify-between pb-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 font-syne">
              Published Forms
            </h4>
            <CheckCircle className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-3xl font-extrabold font-syne text-gray-900 dark:text-white mt-1">
            {data.publishedForms}
          </div>
          <p className="text-[10px] font-sans text-gray-400 dark:text-gray-500 mt-2">
            {data.totalForms - data.publishedForms} drafts locked
          </p>
        </div>

        {/* Card 4: Avg per Form */}
        <div className={glassCard}>
          <div className="flex items-center justify-between pb-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 font-syne">
              Avg Submissions
            </h4>
            <BarChart3 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-3xl font-extrabold font-syne text-gray-900 dark:text-white mt-1">
            {data.avgSubmissionsPerForm}
          </div>
          <p className="text-[10px] font-sans text-emerald-600 dark:text-emerald-400 mt-2">
            engagements per node
          </p>
        </div>
      </div>

      {/* Charts + Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Chart Card */}
        <div className={glassCard}>
          <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/80 pb-4 mb-4">
            <h3 className="font-syne font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">
              <Activity className="w-4.5 h-4.5 text-emerald-500" />
              7-Day Activity Stream
            </h3>
          </div>
          <div className="space-y-4">
            {data.submissionsByDay.map((day, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-xs w-16 text-gray-400 dark:text-gray-500 font-mono">
                  {day.date}
                </span>
                <div className="flex-1 bg-slate-100 dark:bg-gray-800/80 border border-slate-200/40 dark:border-slate-800/40 rounded-full h-6 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 flex items-center justify-end pr-3 transition-all duration-500"
                    style={{ width: `${(day.count / maxSubmissions) * 100}%` }}
                  >
                    {day.count > 0 && (
                      <span className="text-[10px] font-mono font-bold text-white">
                        {day.count}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Forms Card */}
        <div className={glassCard}>
          <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/80 pb-4 mb-4">
            <h3 className="font-syne font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">
              <BarChart3 className="w-4.5 h-4.5 text-emerald-500" />
              Top Nodes by Response
            </h3>
          </div>
          <div className="space-y-3">
            {data.topForms.length > 0 ? (
              <>
                {data.topForms.map((form, i) => (
                  <Link
                    key={form.id}
                    href={`/dashboard/forms/${form.id}/submissions`}
                    className="group block p-3.5 bg-slate-50/50 dark:bg-[#070c14]/40 border border-slate-150 dark:border-slate-900/60 rounded-xl hover:border-emerald-500/30 hover:bg-white dark:hover:bg-gray-950/60 transition-all duration-300"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <span className="font-syne text-xs font-bold text-emerald-600 dark:text-emerald-400">
                          {i + 1}.
                        </span>
                        <div>
                          <p className="text-sm font-semibold font-syne text-gray-800 dark:text-gray-200 group-hover:text-gray-950 dark:group-hover:text-white transition-colors">
                            {form.title}
                          </p>
                          <p className="text-[10px] font-sans text-gray-400 dark:text-gray-500">
                            {form.published ? "Published" : "Draft"}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-extrabold font-syne text-emerald-500">
                          {form.submissions}
                        </p>
                        <p className="text-[9px] font-sans uppercase text-gray-400 dark:text-gray-500">
                          responses
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </>
            ) : (
              <div className="text-center py-12 text-gray-450 dark:text-gray-500">
                <FileText className="w-8 h-8 mx-auto mb-2 opacity-40 animate-pulse" />
                <p className="text-xs font-sans">No active forms found</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Activity Card */}
      <div className={glassCard}>
        <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/80 pb-4 mb-4">
          <h3 className="font-syne font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">
            <Clock className="w-4.5 h-4.5 text-emerald-500" />
            System Live Activity Stream
          </h3>
        </div>
        <div className="space-y-3">
          {data.recentActivity.length > 0 ? (
            <>
              {data.recentActivity.map((a) => (
                <Link
                  key={a.id}
                  href={`/dashboard/forms/${a.formId}/submissions`}
                  className="group flex justify-between items-center p-3.5 bg-slate-50/50 dark:bg-[#070c14]/40 border border-slate-150 dark:border-slate-900/60 rounded-xl hover:border-emerald-500/30 hover:bg-white dark:hover:bg-gray-950/60 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                      Incoming submission directed to{" "}
                      <span className="text-emerald-500 font-syne">
                        {a.formTitle}
                      </span>
                    </p>
                  </div>
                  <span className="text-[10px] font-sans text-gray-400 dark:text-gray-500">
                    {getTimeAgo(a.createdAt)}
                  </span>
                </Link>
              ))}
            </>
          ) : (
            <div className="text-center py-12 text-gray-450 dark:text-gray-500">
              <Activity className="w-8 h-8 mx-auto mb-2 opacity-40 animate-pulse" />
              <p className="text-xs font-sans">No recent activity recorded</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
