import React from "react";

const ConfirmCopy = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-scrim">
      <div className="modal-card">
        <h2 className="text-lg font-semibold text-ink mb-2">Duplicate file</h2>
        <p className="text-sm text-ink-soft mb-6">
          Are you sure you want to create a copy of this item?
        </p>
        <div className="flex justify-center gap-3">
          <button className="btn btn-secondary flex-1" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-primary flex-1" onClick={onConfirm}>
            Yes, Duplicate
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmCopy;
