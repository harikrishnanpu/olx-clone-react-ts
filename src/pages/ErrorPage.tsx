
export default function ErrorPage({ error }: { error?: {message: string} }) {
  console.error(error)
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold">Oops — something went wrong</h2>
      <p className="text-sm text-gray-600 mt-2">{String(error?.message ?? 'Unknown error')}</p>
    </div>
  )
}
