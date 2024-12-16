import { RampForm } from '../components/ramp-form'
import { DynamicBackground } from '../components/dynamic-background'

export default function Page() {
  return (
    <div className="min-h-screen p-8 relative overflow-hidden">
      <DynamicBackground />
      <div className="max-w-4xl mx-auto relative z-10">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">UNIVERSEL ON/OFF RAMP</h1>
        <RampForm />
      </div>
    </div>
  )
}


