import React from 'https://esm.sh/react@18.2.0';

export function ScoreBadge({ score, size = "md", showLabel = true }) {
  let bgColor = "bg-blue-50 text-blue-700 border-blue-200";
  let ringColor = "text-blue-600";
  
  if (score >= 90) {
    bgColor = "bg-emerald-50 text-emerald-700 border-emerald-200";
    ringColor = "text-emerald-600";
  } else if (score >= 80) {
    bgColor = "bg-indigo-50 text-indigo-700 border-indigo-200";
    ringColor = "text-indigo-600";
  } else if (score >= 70) {
    bgColor = "bg-amber-50 text-amber-700 border-amber-200";
    ringColor = "text-amber-600";
  }

  if (size === "lg") {
    return (
      <div className="flex items-center gap-3 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative flex items-center justify-center w-12 h-12">
          <svg className="w-12 h-12 transform -rotate-90">
            <circle
              cx="24"
              cy="24"
              r="20"
              stroke="#e2e8f0"
              strokeWidth="4"
              fill="transparent"
            />
            <circle
              cx="24"
              cy="24"
              r="20"
              stroke="currentColor"
              strokeWidth="4"
              fill="transparent"
              strokeDasharray={125.6}
              strokeDashoffset={125.6 - (125.6 * score) / 100}
              className={`${ringColor} transition-all duration-1000 ease-out`}
            />
          </svg>
          <span className="absolute font-heading font-extrabold text-sm text-slate-900">
            {score}%
          </span>
        </div>
        <div>
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Nexora Fit</div>
          <div className="text-sm font-bold text-slate-800">
            {score >= 90 ? 'High Match' : score >= 80 ? 'Strong Alignment' : 'Moderate Match'}
          </div>
        </div>
      </div>
    );
  }

  if (size === "sm") {
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold border ${bgColor}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
        {score}% {showLabel && "Match"}
      </span>
    );
  }

  // Standard Medium size
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${bgColor} shadow-2xs`}>
      <span className="w-2 h-2 rounded-full bg-current"></span>
      <span>{score}% Match</span>
    </span>
  );
}
