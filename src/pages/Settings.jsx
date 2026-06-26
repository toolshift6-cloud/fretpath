import { useState } from 'react'
import { Download, Upload, Trash2, AlertTriangle, ChevronRight } from 'lucide-react'
import { useProgress } from '../hooks/useProgress'

const GUITAR_TYPES = ['acoustic', 'classical', 'electric', 'bass']
const PRACTICE_TIMES = [10, 20, 30, 45, 60]

export default function Settings() {
  const { profile, exportProgress, importProgress, resetProgress, setProfile } = useProgress()
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [localProfile, setLocalProfile] = useState(profile || {})

  const handleProfileChange = (field, value) => {
    const updated = { ...localProfile, [field]: value }
    setLocalProfile(updated)
    setProfile({ ...updated, onboardingComplete: true })
  }

  const handleImport = (e) => {
    const file = e.target.files?.[0]
    if (file) importProgress(file)
  }

  const handleReset = () => {
    resetProgress()
    setShowResetConfirm(false)
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <div className="bg-bg-card border-b border-white/5 px-5 pt-12 pb-5">
        <h1 className="font-display text-2xl font-bold text-cream">Settings</h1>
      </div>

      <div className="px-5 py-5 space-y-4">
        {/* Profile */}
        <div className="card">
          <h2 className="font-semibold text-cream mb-4">Profile</h2>

          <div className="space-y-4">
            <div>
              <label className="text-xs text-cream/50 font-semibold uppercase tracking-wider block mb-2">Your Name</label>
              <input
                type="text"
                value={localProfile.name || ''}
                onChange={(e) => handleProfileChange('name', e.target.value)}
                className="input-field w-full"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="text-xs text-cream/50 font-semibold uppercase tracking-wider block mb-2">Guitar Type</label>
              <div className="grid grid-cols-2 gap-2">
                {GUITAR_TYPES.map(t => (
                  <button
                    key={t}
                    onClick={() => handleProfileChange('guitarType', t)}
                    className={`py-2 rounded-xl text-sm font-semibold capitalize transition-colors ${
                      localProfile.guitarType === t
                        ? 'bg-amber-DEFAULT text-bg'
                        : 'bg-surface text-cream/60 hover:text-cream'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs text-cream/50 font-semibold uppercase tracking-wider block mb-2">Daily Practice Target</label>
              <div className="flex gap-2 flex-wrap">
                {PRACTICE_TIMES.map(t => (
                  <button
                    key={t}
                    onClick={() => handleProfileChange('practiceTime', t)}
                    className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                      localProfile.practiceTime === t
                        ? 'bg-amber-DEFAULT text-bg'
                        : 'bg-surface text-cream/60 hover:text-cream'
                    }`}
                  >
                    {t} min
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Progress management */}
        <div className="card">
          <h2 className="font-semibold text-cream mb-4">Progress Data</h2>

          <div className="space-y-2">
            <button
              onClick={exportProgress}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-surface hover:bg-bg-elevated transition-colors"
            >
              <div className="flex items-center gap-3">
                <Download size={16} className="text-blue-electric" />
                <div className="text-left">
                  <div className="text-sm font-semibold text-cream">Export Progress</div>
                  <div className="text-xs text-cream/40">Download your data as JSON</div>
                </div>
              </div>
              <ChevronRight size={14} className="text-cream/30" />
            </button>

            <label className="w-full flex items-center justify-between p-3 rounded-xl bg-surface hover:bg-bg-elevated transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <Upload size={16} className="text-green-400" />
                <div className="text-left">
                  <div className="text-sm font-semibold text-cream">Import Progress</div>
                  <div className="text-xs text-cream/40">Restore from a JSON backup</div>
                </div>
              </div>
              <ChevronRight size={14} className="text-cream/30" />
              <input type="file" accept=".json" onChange={handleImport} className="hidden" />
            </label>
          </div>
        </div>

        {/* Danger zone */}
        <div className="card border border-red-900/30">
          <h2 className="font-semibold text-red-400 mb-2">Danger Zone</h2>
          <p className="text-xs text-cream/40 mb-3">This will delete all your progress, XP, and badges. This cannot be undone.</p>

          {!showResetConfirm ? (
            <button
              onClick={() => setShowResetConfirm(true)}
              className="w-full flex items-center gap-2 justify-center py-3 rounded-xl text-red-400 border border-red-900/50 hover:bg-red-900/20 transition-colors text-sm font-semibold"
            >
              <Trash2 size={14} /> Reset All Progress
            </button>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-yellow-400 text-xs">
                <AlertTriangle size={14} /> Are you absolutely sure?
              </div>
              <div className="flex gap-2">
                <button onClick={handleReset} className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-red-900/40 text-red-300 border border-red-700 hover:bg-red-900/60">
                  Yes, reset everything
                </button>
                <button onClick={() => setShowResetConfirm(false)} className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-surface text-cream/60">
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* App info */}
        <div className="text-center text-xs text-cream/20 pb-4 space-y-1">
          <p>FretPath v0.1.0</p>
          <p>Built with React 18 + Tailwind CSS</p>
        </div>
      </div>
    </div>
  )
}
