export default function Loading() {
  return (
    <div className="p-6 lg:p-8 space-y-6 animate-pulse">
      <div className="space-y-2">
        <div className="h-8 w-64 bg-gray-800 rounded" />
        <div className="h-4 w-96 bg-gray-800/60 rounded" />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-28 bg-gray-900 border border-gray-800 rounded-lg" />
        ))}
      </div>
      <div className="h-96 bg-gray-900 border border-gray-800 rounded-lg" />
    </div>
  )
}
