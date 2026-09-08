import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import { ScoreBadge } from '../common/ScoreBadge.jsx';
import { VerifiedBadge } from '../common/Disclaimers.jsx';

export function OpportunityExplorerView() {
  const {
    rankedOpportunities,
    searchQuery,
    setSearchQuery,
    setActiveModal,
    setModalData,
    addToWeeklyPlan,
    addApplication,
    userProfile
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [minScore, setMinScore] = useState(70);
  const [sortBy, setSortBy] = useState('matchScore'); // 'matchScore' | 'deadline' | 'recent'
  const [paidOnly, setPaidOnly] = useState(false);

  const categories = [
    "All", "Internships", "Jobs", "Scholarships", "Fellowships",
    "Competitions", "Hackathons", "Research", "Government Programs",
    "Courses", "Certifications", "Volunteering", "Entrepreneurship"
  ];

  // Multi-dimensional filtering and sorting
  const filteredOpportunities = useMemo(() => {
    return rankedOpportunities
      .filter((opp) => {
        // Category filter
        if (selectedCategory !== 'All' && opp.category !== selectedCategory) return false;

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = opp.title.toLowerCase().includes(q);
          const matchOrg = opp.organization.toLowerCase().includes(q);
          const matchCat = opp.category.toLowerCase().includes(q);
          const matchSkills = (opp.requiredSkills || []).some(s => s.toLowerCase().includes(q));
          if (!matchTitle && !matchOrg && !matchCat && !matchSkills) return false;
        }

        // Remote only filter
        if (remoteOnly && !opp.isRemote) return false;

        // Min Match Score
        if (opp.matchScore < minScore) return false;

        // Paid only filter
        if (paidOnly && (!opp.stipend || opp.stipend.toLowerCase().includes('unpaid'))) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'matchScore') return b.matchScore - a.matchScore;
        if (sortBy === 'deadline') return a.daysLeft - b.daysLeft;
        return a.id.localeCompare(b.id);
      });
  }, [rankedOpportunities, selectedCategory, searchQuery, remoteOnly, minScore, sortBy, paidOnly]);

  const handleOpenDetail = (opp) => {
    setModalData(opp);
    setActiveModal('opp-detail');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in pb-12">
      {/* Top Header & Search Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
              Deterministic Discovery Layer
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900">
              Opportunity Explorer
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              100+ verified internships, fellowships, government programs, scholarships, courses & competitions.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-slate-50 px-3.5 py-2 rounded-2xl border border-slate-200 self-start md:self-auto">
            <span>Showing:</span>
            <span className="text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
              {filteredOpportunities.length} of {rankedOpportunities.length} Opportunities
            </span>
          </div>
        </div>

        {/* Omnibox Search Bar */}
        <div className="relative">
          <svg className="w-5 h-5 text-slate-400 absolute left-3.5 top-3 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="What opportunity are you looking for? (e.g. Policy, RBI, Deep Learning, ₹50,000 stipend, Stata)..."
            className="w-full pl-11 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-600 shadow-2xs transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 text-sm"
            >
              ✕
            </button>
          )}
        </div>

        {/* 12 Category Pills Horizontal Scroll */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none pt-1">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100/80 hover:bg-slate-200/80 text-slate-700'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Filter Toolbar */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-4">
            {/* Remote Checkbox */}
            <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
              <input
                type="checkbox"
                checked={remoteOnly}
                onChange={(e) => setRemoteOnly(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span>Remote / Online Only</span>
            </label>

            {/* Paid Checkbox */}
            <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
              <input
                type="checkbox"
                checked={paidOnly}
                onChange={(e) => setPaidOnly(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span>Funded / Stipend Only</span>
            </label>

            {/* Min Match Slider */}
            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-medium">Min Match:</span>
              <input
                type="range"
                min="50"
                max="90"
                step="5"
                value={minScore}
                onChange={(e) => setMinScore(parseInt(e.target.value))}
                className="w-20 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
              />
              <span className="font-bold text-blue-600">{minScore}%</span>
            </div>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
            >
              <option value="matchScore">Highest Match Score</option>
              <option value="deadline">Closest Deadline</option>
              <option value="recent">Catalog Order</option>
            </select>
          </div>
        </div>
      </div>

      {/* Opportunities Card Grid */}
      {filteredOpportunities.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
          <div className="text-3xl">🔍</div>
          <h3 className="text-base font-bold text-slate-900">No opportunities match your active filters</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try clearing the search query or lowering the minimum match score to view more records.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
              setRemoteOnly(false);
              setMinScore(50);
              setPaidOnly(false);
            }}
            className="px-4 py-2 bg-blue-50 text-blue-700 text-xs font-bold rounded-xl hover:bg-blue-100"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredOpportunities.map((opp) => (
            <div
              key={opp.id}
              className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                {/* Card Top: Category & Match Pill */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                      {opp.category}
                    </span>
                    {opp.verifiedSource && <VerifiedBadge />}
                  </div>
                  <ScoreBadge score={opp.matchScore} size="sm" />
                </div>

                {/* Title & Organization */}
                <div>
                  <h3
                    onClick={() => handleOpenDetail(opp)}
                    className="text-base font-heading font-bold text-slate-900 group-hover:text-blue-600 transition-colors cursor-pointer line-clamp-2 leading-snug"
                  >
                    {opp.title}
                  </h3>
                  <div className="text-xs text-slate-600 font-medium mt-1">
                    {opp.organization}
                  </div>
                </div>

                {/* Metadata Pills */}
                <div className="flex flex-wrap gap-2 text-[11px] text-slate-500 font-medium">
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {opp.location} {opp.isRemote && '(Remote)'}
                  </span>
                  {opp.stipend && (
                    <span className="flex items-center gap-1 text-emerald-700 font-bold">
                      • {opp.stipend}
                    </span>
                  )}
                </div>

                {/* Required Skills match pills */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {(opp.requiredSkills || []).slice(0, 3).map((sk, i) => {
                    const hasSkill = (userProfile.skills || []).some(us => us.name.toLowerCase().includes(sk.toLowerCase()));
                    return (
                      <span
                        key={i}
                        className={`text-[10px] px-2 py-0.5 rounded-md font-semibold ${
                          hasSkill
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-slate-50 text-slate-500 border border-slate-200'
                        }`}
                      >
                        {hasSkill ? '✓ ' : ''}{sk}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Card Footer: Deadline & Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <div className="text-[11px]">
                  <div className="text-slate-400">Deadline</div>
                  <div className="font-bold text-red-600">{opp.deadline}</div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => addApplication(opp, 'Saved')}
                    className="p-2 text-slate-400 hover:text-blue-600 hover:bg-slate-100 rounded-xl transition-colors"
                    title="Save to Applications"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => addToWeeklyPlan(opp)}
                    className="p-2 text-slate-400 hover:text-blue-600 hover:bg-slate-100 rounded-xl transition-colors"
                    title="Add to Weekly Plan"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleOpenDetail(opp)}
                    className="px-3.5 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold text-xs rounded-xl transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
