import type { ReactNode } from "react";

interface ModalProps {
  title: string;
  children: ReactNode;
  onClose?: () => void;
}

export const BaseModal = ({ title, children, onClose }: ModalProps) => {
  return (
    <div className="fixed inset-0 bg-border-light/70 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg mx-4 md:mx-0">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        {children}
      </div>
    </div>
  );
};
