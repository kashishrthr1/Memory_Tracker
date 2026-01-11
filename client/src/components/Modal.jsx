import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ isOpen, onClose, children }) => {
  const scrollPosition = useRef(0);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    if (isOpen && !wasOpenRef.current) {
      // Store current scroll position when opening
      scrollPosition.current =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      wasOpenRef.current = true;

      // Lock body scroll when modal is open
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollPosition.current}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";
      document.body.style.width = "100%";
    } else if (!isOpen && wasOpenRef.current) {
      // Restore body scroll when modal is closed
      wasOpenRef.current = false;
      const scrollY = scrollPosition.current;

      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      document.body.style.width = "";

      // Restore scroll position after styles are reset
      requestAnimationFrame(() => {
        window.scrollTo(0, scrollY);
      });
    }

    // Cleanup on unmount - always restore
    return () => {
      if (wasOpenRef.current) {
        wasOpenRef.current = false;
        const scrollY = scrollPosition.current;
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.overflow = "";
        document.body.style.width = "";

        requestAnimationFrame(() => {
          window.scrollTo(0, scrollY);
        });
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Use portal to render modal at body level to avoid z-index issues
  return createPortal(
    <div className="modal-overlay">
      <div className="modal-window">
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>
        <div className="modal-content">{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
