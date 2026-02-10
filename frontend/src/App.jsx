import { useState } from 'react'
import { FileUpload } from './components/FileUpload'
import { ResultView } from './components/ResultView'
import { Scan, FileText, CheckCircle2 } from 'lucide-react'
import { Header } from './components/Header'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

function App() {
  const [file, setFile] = useState(null)
  const [jobId, setJobId] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processedFile, setProcessedFile] = useState(null)
  const [extractedText, setExtractedText] = useState(null)

  const handleUpload = async (uploadedFile) => {
    setFile(uploadedFile)
    setIsProcessing(true)

    const formData = new FormData()
    formData.append('file', uploadedFile)

    try {
      const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error('Upload failed')

      const data = await response.json()
      setJobId(data.job_id)
      setProcessedFile(data.filename)
      setExtractedText(data.text)
    } catch (error) {
      console.error(error)
      alert("Error processing file")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleReset = () => {
    setFile(null)
    setJobId(null)
    setProcessedFile(null)
    setExtractedText(null)
  }

  return (
    <div className="min-h-screen colorful-bg selection:bg-pink-500/30">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Main Content */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 py-2">
            Smart OCR
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto font-medium">
            Transform your static PDFs and images into editable Word documents with <span className="text-blue-600 font-bold">AI-powered</span> precision.
          </p>
        </div>

        <main className="max-w-2xl mx-auto">
          {!jobId ? (
            <div className="space-y-8">
              <FileUpload onFileSelect={handleUpload} isProcessing={isProcessing} />

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-sm font-medium text-slate-600">
                <div className="p-4 rounded-xl bg-white/60 border border-white/60 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 mx-auto mb-2 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                    <FileText className="w-5 h-5" />
                  </div>
                  <p>PDF & Images</p>
                </div>
                <div className="p-4 rounded-xl bg-white/60 border border-white/60 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 mx-auto mb-2 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                    <Scan className="w-5 h-5" />
                  </div>
                  <p>High Accuracy</p>
                </div>
                <div className="p-4 rounded-xl bg-white/60 border border-white/60 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 mx-auto mb-2 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <p>Instant Word Doc</p>
                </div>
              </div>
            </div>
          ) : (
            <ResultView
              filename={processedFile}
              jobId={jobId}
              onReset={handleReset}
              extractedText={extractedText}
            />
          )}
        </main>
      </div>
    </div>
  )
}

export default App
