import React, { useState } from 'https://esm.sh/react@18.2.0';
import { useApp } from '../../context/AppContext.jsx';

export function ProfileView() {
  const { userProfile, updateProfile, profileCompletion, setCurrentScreen, showToast } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...userProfile });
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillScore, setNewSkillScore] = useState(75);

  const handleSaveProfile = () => {
    updateProfile(editData);
    setIsEditing(false);
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;
    const updatedSkills = [
      ...(editData.skills || []),
      {
        name: newSkillName.trim(),
        level: newSkillScore >= 85 ? "Advanced" : (newSkillScore >= 60 ? "Intermediate" : "Beginner"),
        score: newSkillScore
      }
    ];
    setEditData({ ...editData, skills: updatedSkills });
    updateProfile({ skills: updatedSkills });
    setNewSkillName('');
    showToast(`Added skill "${newSkillName}"!`);
  };

  const handleRemoveSkill = (skillIndex) => {
    const updatedSkills = editData.skills.filter((_, i) => i !== skillIndex);
    setEditData({ ...editData, skills: updatedSkills });
    updateProfile({ skills: updatedSkills });
    showToast('Skill removed');
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl mx-auto">
      {/* Header Profile Summary Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative">
              <img
                src={userProfile.avatar}
                alt={userProfile.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-slate-100 shadow-md"
              />
              <span className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-1 rounded-lg shadow-xs" title="Verified Student">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl font-heading font-extrabold text-slate-900">
                  {userProfile.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                  {userProfile.year}
                </span>
              </div>
              <p className="text-sm font-medium text-slate-600 mt-1">
                {userProfile.degree} • {userProfile.college}
              </p>
              <p className="text-xs text-slate-500 mt-1.5 max-w-xl line-clamp-2">
                {userProfile.bio}
              </p>
            </div>
          </div>

          {/* Profile Completion Gauge */}
          <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-slate-100 gap-4">
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Profile Strength</div>
                <div className="text-lg font-heading font-extrabold text-slate-900">{profileCompletion}% Complete</div>
              </div>
              <div className="relative w-12 h-12 flex items-center justify-center">
                <svg className="w-12 h-12 transform -rotate-90">
                  <circle cx="24" cy="24" r="20" stroke="#e2e8f0" strokeWidth="4" fill="transparent" />
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    stroke="#2563eb"
                    strokeWidth="4"
                    fill="transparent"
                    strokeDasharray={125.6}
                    strokeDashoffset={125.6 - (125.6 * profileCompletion) / 100}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <span className="absolute text-[11px] font-bold text-slate-800">{profileCompletion}%</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors shadow-2xs"
              >
                {isEditing ? "Close Editor" : "Edit Profile"}
              </button>
              <button
                onClick={() => {
                  showToast("✨ Recalculated 100+ opportunities against your profile!");
                  setCurrentScreen('dashboard');
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs"
              >
                Improve Recommendations
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Form Modal/Drawer */}
      {isEditing && (
        <div className="bg-blue-50/60 rounded-3xl p-6 border border-blue-200/80 shadow-sm animate-slide-up space-y-4">
          <div className="flex items-center justify-between border-b border-blue-200 pb-3">
            <h3 className="text-sm font-heading font-extrabold text-blue-950">Quick Edit Profile Info</h3>
            <span className="text-xs text-blue-700">Edits dynamically tune your recommendations</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Full Name</label>
              <input
                type="text"
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">College</label>
              <input
                type="text"
                value={editData.college}
                onChange={(e) => setEditData({ ...editData, college: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Degree & Major</label>
              <input
                type="text"
                value={editData.degree}
                onChange={(e) => setEditData({ ...editData, degree: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Available Weekly Hours</label>
              <input
                type="number"
                min="4"
                max="40"
                value={editData.availableHours}
                onChange={(e) => setEditData({ ...editData, availableHours: parseInt(e.target.value) || 10 })}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Preferred Location</label>
              <input
                type="text"
                value={editData.preferredLocation}
                onChange={(e) => setEditData({ ...editData, preferredLocation: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Preparation Timeline</label>
              <input
                type="text"
                value={editData.timeline}
                onChange={(e) => setEditData({ ...editData, timeline: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveProfile}
              className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-xs"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* Grid: Education, Skills, Experience, Goals & Preferences */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Education, Skills & Experience */}
        <div className="lg:col-span-2 space-y-6">
          {/* Skills Section */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-heading font-bold text-slate-900">Verified Skills & Proficiency</h3>
                <p className="text-xs text-slate-500">Nexora calculates skill-gap matching against target job profiles.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(userProfile.skills || []).map((sk, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between group">
                  <div className="flex-1 pr-2">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                      <span>{sk.name}</span>
                      <span className="text-[10px] text-blue-600 font-semibold">{sk.score}%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full rounded-full"
                        style={{ width: `${sk.score}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 inline-block">{sk.level}</span>
                  </div>
                  <button
                    onClick={() => handleRemoveSkill(idx)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-red-600 transition-all"
                    title="Remove Skill"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* Add Skill Form */}
            <form onSubmit={handleAddSkill} className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                placeholder="Add new skill (e.g. Econometrics, Python, SQL)..."
                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white"
              />
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="30"
                  max="100"
                  value={newSkillScore}
                  onChange={(e) => setNewSkillScore(parseInt(e.target.value))}
                  className="w-24 h-2 bg-slate-200 rounded-lg cursor-pointer"
                  title={`Proficiency: ${newSkillScore}%`}
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 rounded-xl text-xs font-bold transition-colors"
                >
                  + Add Skill
                </button>
              </div>
            </form>
          </div>

          {/* Experience Timeline */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-heading font-bold text-slate-900">Experience & Projects</h3>
            <div className="space-y-3">
              {(userProfile.experience || []).map((exp, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{exp.title}</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                      {exp.type}
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 font-medium">{exp.organization} • <span className="text-slate-400">{exp.period}</span></div>
                  <p className="text-xs text-slate-500 pt-1 leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Career Preferences & Financial Goals */}
        <div className="space-y-6">
          {/* Career Goals Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-heading font-bold text-slate-900">Target Career Paths</h3>
            <div className="space-y-2">
              {(userProfile.targetCareers || []).map((cid) => (
                <div
                  key={cid}
                  onClick={() => setCurrentScreen('career-nav')}
                  className="p-3 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs font-bold text-blue-900 flex items-center justify-between cursor-pointer hover:bg-blue-100 transition-colors"
                >
                  <span className="capitalize">{cid.replace(/-/g, ' ')}</span>
                  <span className="text-blue-600">Explore →</span>
                </div>
              ))}
            </div>
          </div>

          {/* Personal Preferences Sliders */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div>
              <h3 className="text-base font-heading font-bold text-slate-900">Personal Work Preferences</h3>
              <p className="text-xs text-slate-500">Weights used by AI to balance job offers.</p>
            </div>

            <div className="space-y-3">
              {[
                { key: 'impact', label: 'Public & Social Impact', val: userProfile.preferences?.impact || 90 },
                { key: 'stability', label: 'Job Stability & Security', val: userProfile.preferences?.stability || 80 },
                { key: 'income', label: 'Starting Income Potential', val: userProfile.preferences?.income || 75 },
                { key: 'learning', label: 'Fast-Paced Learning', val: userProfile.preferences?.learning || 90 },
                { key: 'flexibility', label: 'Work Flexibility / Remote', val: userProfile.preferences?.flexibility || 60 },
                { key: 'workLifeBalance', label: 'Work-Life Balance', val: userProfile.preferences?.workLifeBalance || 70 }
              ].map((pref) => (
                <div key={pref.key}>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                    <span>{pref.label}</span>
                    <span className="text-blue-600 font-bold">{pref.val}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-600 h-full rounded-full"
                      style={{ width: `${pref.val}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Goal Summary Card */}
          {userProfile.financialGoals?.enabled && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-heading font-bold text-slate-900">Financial Goal</h3>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Active
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="text-xs font-bold text-slate-800">
                  {userProfile.financialGoals.primaryGoal.title}
                </div>
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Current: ₹{userProfile.financialGoals.primaryGoal.currentAmount.toLocaleString()}</span>
                  <span className="font-bold">Target: ₹{userProfile.financialGoals.primaryGoal.targetAmount.toLocaleString()}</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full"
                    style={{
                      width: `${Math.min(100, Math.round((userProfile.financialGoals.primaryGoal.currentAmount / userProfile.financialGoals.primaryGoal.targetAmount) * 100))}%`
                    }}
                  />
                </div>
              </div>
              <button
                onClick={() => setCurrentScreen('money')}
                className="w-full py-2 text-xs font-bold text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-colors"
              >
                Open Nexora Money →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
