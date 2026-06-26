import TabFretboardViewer from './TabFretboardViewer'

export default function TabViewer({ tabs = [] }) {
  if (!tabs.length) return null
  return (
    <div className="card">
      <h3 className="font-semibold mb-3 text-cream">Guitar Tab</h3>
      <div className="bg-bg rounded-xl p-4 overflow-x-auto">
        <pre className="text-cream/80 text-sm font-mono leading-relaxed whitespace-pre">
          {tabs.join('\n')}
        </pre>
      </div>
      <p className="text-xs text-cream/40 mt-2">Numbers = fret to press. 0 = open string. Read left to right.</p>
      <TabFretboardViewer tabLines={tabs} />
    </div>
  )
}
