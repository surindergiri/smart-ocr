import { Download, RefreshCw, FileText, Check } from 'lucide-react'

export function ResultView({ filename, jobId, onReset, extractedText }) {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
    const downloadUrl = `${API_URL}/download/${jobId}`

    return (
        <div className="animate-in fade-in zoom-in duration-300 space-y-8">
            {/* Success Card */}
            <div className="glass-panel p-10 text-center space-y-8">
                <div className="relative inline-block">
                    <div className="w-24 h-24 bg-gradient-to-tr from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/30">
                        <FileText className="w-12 h-12 text-white" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-white text-emerald-500 rounded-full p-2 shadow-lg">
                        <Check className="w-6 h-6 stroke-[3]" />
                    </div>
                </div>

                <div className="space-y-3">
                    <h2 className="text-3xl font-extrabold text-slate-800">Conversion Complete!</h2>
                    <p className="text-slate-500 font-medium">Your editable document is ready.</p>
                    <div className="text-sm font-semibold text-indigo-600 bg-indigo-50 border border-indigo-100 py-2 px-4 rounded-full inline-block">
                        {filename}
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                    <a
                        href={downloadUrl}
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/40"
                    >
                        <Download className="w-5 h-5" />
                        Download Word Doc
                    </a>

                    <button
                        onClick={onReset}
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-2xl font-bold transition-all hover:shadow-md"
                    >
                        <RefreshCw className="w-5 h-5" />
                        Convert Another
                    </button>
                </div>
            </div>

            {/* Extracted Text Preview */}
            {extractedText && (
                <div className="glass-panel p-8 text-left space-y-4">
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                        <FileText className="w-5 h-5 text-blue-500" />
                        <h3 className="text-lg font-bold text-slate-700">Extracted Text Preview</h3>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-6 max-h-96 overflow-y-auto font-mono text-sm text-slate-600 whitespace-pre-wrap border border-slate-200 shadow-inner">
                        {extractedText.map((page, pageIndex) => (
                            <div key={pageIndex} className="mb-8 last:mb-0">
                                {extractedText.length > 1 && (
                                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                        Page {pageIndex + 1}
                                    </div>
                                )}
                                {page.map((line, lineIndex) => (
                                    <p key={lineIndex} className="mb-2 leading-relaxed">{line}</p>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
