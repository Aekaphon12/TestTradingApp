'use client';

import { ReactNode } from "react";
import { Primary, Secondary } from "./ui";

type ModalAction = {
  label: string;
  variant?: "primary" | "secondary" | "ghost";
  onClick?: () => void;
  autoClose?: boolean;
};

type ModalSheetProps = {
  open: boolean;
  title: ReactNode;
  body?: ReactNode;
  onClose: () => void;
  actions?: ModalAction[];
};

export default function ModalSheet({ open, title, body, onClose, actions }: ModalSheetProps) {
  if (!open) {
    return null;
  }

  const renderAction = (action: ModalAction, index: number) => {
    const handleClick = () => {
      action.onClick?.();
      if (action.autoClose !== false) {
        onClose();
      }
    };

    if (action.variant === "secondary") {
      return (
        <Secondary key={index} onClick={handleClick}>
          {action.label}
        </Secondary>
      );
    }

    if (action.variant === "ghost") {
      return (
        <button
          key={index}
          onClick={handleClick}
          className="flex-1 text-sm text-slate-300 border border-transparent py-3 rounded-lg hover:text-emerald-300"
        >
          {action.label}
        </button>
      );
    }

    return (
      <Primary key={index} onClick={handleClick}>
        {action.label}
      </Primary>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 px-4">
      <div className="card w-full sm:max-w-sm bg-[#0F151A] border border-emerald-500/20 shadow-xl">
        <div className="text-lg font-semibold mb-1">{title}</div>
        {body && <div className="text-[13px] opacity-80">{body}</div>}
        <div className="flex gap-2 mt-4">
          {actions && actions.length > 0 ? (
            actions.map(renderAction)
          ) : (
            <>
              <Primary onClick={onClose}>ตกลง</Primary>
              <Secondary onClick={onClose}>ปิด</Secondary>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
