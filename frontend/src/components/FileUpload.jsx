import { useDropzone } from 'react-dropzone'
import { Upload, Loader2, File, Image as ImageIcon } from 'lucide-react'
import { useCallback } from 'react'

export function FileUpload({ onFileSelect, isProcessing }) {
    const onDrop = useCallback(acceptedFiles => {
        if (acceptedFiles?.length > 0) {
            onFileSelect(acceptedFiles[0])
        }
    }, [onFileSelect])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png'],
            'application/pdf': ['.pdf']
        },
        maxFiles: 1,
        disabled: isProcessing
    })

    return (
        <div
            {...getRootProps()}
            className={`
        glass-panel p-10 border-2 border-dashed cursor-pointer transition-all duration-300 group
        ${isDragActive ? 'border-blue-500 bg-blue-50/50 scale-[1.02]' : 'border-indigo-100 hover:border-indigo-300 hover:bg-white/80'}
        ${isProcessing ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}
      `}
        >
            <input {...getInputProps()} />

            <div className="flex flex-col items-center justify-center text-center space-y-4">
                <div className={`
          p-5 rounded-full transition-all duration-300 shadow-lg
          ${isDragActive ? 'bg-blue-100 text-blue-600 rotate-12' : 'bg-gradient-to-tr from-blue-500 to-purple-500 text-white group-hover:scale-110'}
        `}>
                    {isProcessing ? (
                        <Loader2 className="w-10 h-10 animate-spin" />
                    ) : (
                        <Upload className="w-10 h-10" />
                    )}
                </div>

                <div className="space-y-2">
                    <p className="text-xl font-bold text-slate-700">
                        {isProcessing ? 'Processing Document...' : 'Drop your file here'}
                    </p>
                    <p className="text-slate-500 font-medium">
                        {isProcessing
                            ? 'AI is converting your text...'
                            : 'or click to browse from computer'
                        }
                    </p>
                </div>

                {!isProcessing && (
                    <div className="flex gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest pt-4">
                        <span className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-md"><File className="w-3 h-3 text-red-400" /> PDF</span>
                        <span className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-md"><ImageIcon className="w-3 h-3 text-blue-400" /> JPG</span>
                        <span className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-md"><ImageIcon className="w-3 h-3 text-green-400" /> PNG</span>
                    </div>
                )}
            </div>
        </div>
    )
}
