import React, { useEffect } from "react";
import { X } from "lucide-react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-2xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-300">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-border">
                    <h3 className="text-xl font-semibold text-foreground">
                        {title || "Details"}
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 max-h-[80vh] overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
