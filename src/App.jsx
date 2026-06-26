import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useProgress } from './hooks/useProgress'
import Onboarding from './pages/Onboarding'
import Dashboard from './pages/Dashboard'
import Lesson from './pages/Lesson'
import SongLibrary from './pages/SongLibrary'
import Progress from './pages/Progress'
import Settings from './pages/Settings'
import Curriculum from './pages/Curriculum'
import NavBar from './components/NavBar'

function LessonRoute() {
  const location = useLocation()
  return <Lesson key={location.pathname} />
}

export default function App() {
  const { profile } = useProgress()

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-bg text-cream">
        <Routes>
          <Route path="/onboarding" element={<Onboarding />} />
          <Route
            path="/*"
            element={
              !profile?.onboardingComplete ? (
                <Navigate to="/onboarding" replace />
              ) : (
                <div className="flex flex-col min-h-screen">
                  <div className="flex-1 pb-20">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/curriculum" element={<Curriculum />} />
                      <Route path="/lesson/:levelId/:lessonId" element={<LessonRoute />} />
                      <Route path="/songs" element={<SongLibrary />} />
                      <Route path="/progress" element={<Progress />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                  </div>
                  <NavBar />
                </div>
              )
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
