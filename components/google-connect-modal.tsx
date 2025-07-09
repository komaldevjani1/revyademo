"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import Image from "next/image"

interface GoogleConnectModalProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  onConnect: () => void
}

export function GoogleConnectModal({ isOpen, onOpenChange, onConnect }: GoogleConnectModalProps) {
  const handleAllow = () => {
    onConnect()
    onOpenChange(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-gray-900 border-gray-800 text-gray-50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Image src="/placeholder.svg?height=24&width=24" width={24} height={24} alt="Google" />
            Choose an account
          </DialogTitle>
          <DialogDescription>to continue to RevRec</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="p-4 rounded-lg border border-gray-700 hover:bg-gray-800/50 cursor-pointer">
            <div className="flex items-center gap-3">
              <Image
                src="/placeholder.svg?height=40&width=40"
                width={40}
                height={40}
                className="rounded-full"
                alt="User Avatar"
              />
              <div>
                <p className="font-semibold">Jane Doe</p>
                <p className="text-sm text-gray-400">jane.doe@example.com</p>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4 px-1">
            To continue, Google will share your name, email address, and profile picture with RevRec.
          </p>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleAllow}>
            Allow
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
