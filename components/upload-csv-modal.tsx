"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { CsvDataTable } from "@/components/csv-data-table"
import { UploadCloud } from "lucide-react"

interface UploadCsvModalProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}

export function UploadCsvModal({ isOpen, onOpenChange }: UploadCsvModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl bg-gray-900 border-gray-800 text-gray-50">
        <DialogHeader>
          <DialogTitle>Upload CSV</DialogTitle>
          <DialogDescription>
            Upload a CSV file to analyze your revenue data. Drag and drop or click to upload.
          </DialogDescription>
        </DialogHeader>
        <div className="py-8">
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-700 border-dashed rounded-lg cursor-pointer bg-gray-800/50 hover:bg-gray-800/80"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <UploadCloud className="w-10 h-10 mb-4 text-gray-400" />
                <p className="mb-2 text-sm text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">CSV, XLS, or XLSX (MAX. 10MB)</p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" />
            </label>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Preview</h3>
          <CsvDataTable />
        </div>
      </DialogContent>
    </Dialog>
  )
}
