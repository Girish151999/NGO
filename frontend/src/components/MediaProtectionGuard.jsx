import React, { useEffect, useState } from 'react';

/**
 * MediaProtectionGuard
 * Clean Anti-Screenshot & Asset Protection Component
 * 
 * 1. ZERO popups, ZERO dialog cards, ZERO warning banners.
 * 2. ONLY activates blackout on multi-key screenshot combinations (Win+Shift+S, PrtScn, Cmd+Shift+3/4/5, Ctrl+P, Ctrl+S).
 * 3. NO blackout on single key presses (Alt, Shift, Ctrl, Win key pressed alone do NOTHING).
 * 4. Disables right-clicking (context menu), dragging, copying, and print preview.
 */
export default function MediaProtectionGuard({ children }) {
  const [isBlackoutActive, setIsBlackoutActive] = useState(false);

  useEffect(() => {
    // 1. Disable Right Click / Context Menu
    const handleContextMenu = (e) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    // 2. Disable Image Dragging & Saving
    const handleDragStart = (e) => {
      if (e.target && (e.target.tagName === 'IMG' || e.target.tagName === 'VIDEO' || e.target.tagName === 'CANVAS')) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    // 3. Intercept Screenshot Keyboard Combinations ONLY
    const handleKeyDown = (e) => {
      const key = e.key ? e.key.toLowerCase() : '';
      const code = e.code ? e.code.toLowerCase() : '';

      // A. Dedicated PrintScreen key (Windows / Linux)
      const isPrintScreen = key === 'printscreen' || code === 'printscreen' || e.keyCode === 44;
      
      // B. Windows Snipping Tool (Must have Shift AND (Win or Ctrl) AND 'S' key pressed together)
      const isWinSnipping = e.shiftKey && (e.metaKey || e.ctrlKey) && (key === 's' || code === 'keys');

      // C. Mac Screenshot (Must have Cmd/Ctrl AND Shift AND '3', '4', or '5' pressed together)
      const isMacScreenshot = (e.metaKey || e.ctrlKey) && e.shiftKey && (key === '3' || key === '4' || key === '5');

      // D. Alt + PrintScreen / Win + PrintScreen
      const isComboPrintScreen = (e.altKey || e.metaKey || e.ctrlKey) && isPrintScreen;

      // E. Print / Save / DevTools Shortcuts: Ctrl+P, Ctrl+S, Ctrl+Shift+I, F12
      const isPrintOrSave = (e.ctrlKey || e.metaKey) && (key === 'p' || key === 's' || key === 'u');
      const isDevTools = ((e.ctrlKey || e.metaKey) && e.shiftKey && (key === 'i' || key === 'j' || key === 'c')) || key === 'f12';

      if (isPrintScreen || isWinSnipping || isMacScreenshot || isComboPrintScreen || isPrintOrSave || isDevTools) {
        e.preventDefault();
        e.stopPropagation();

        // Turn screen pitch-black instantly
        setIsBlackoutActive(true);

        // Clear system clipboard buffer
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText('').catch(() => {});
        }

        // Auto-restore view cleanly
        setTimeout(() => {
          setIsBlackoutActive(false);
        }, 1200);

        return false;
      }
    };

    const handleKeyUp = (e) => {
      const key = e.key ? e.key.toLowerCase() : '';
      if (key === 'printscreen' || key === 'snapshot') {
        setTimeout(() => {
          setIsBlackoutActive(false);
        }, 300);
      }
    };

    // 4. Tab Visibility Switch Detection (Blackout when tab is hidden or user switches away)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsBlackoutActive(true);
      } else {
        setIsBlackoutActive(false);
      }
    };

    const handleWindowFocus = () => {
      setIsBlackoutActive(false);
    };

    // Attach Event Listeners
    window.addEventListener('contextmenu', handleContextMenu, true);
    window.addEventListener('dragstart', handleDragStart, true);
    window.addEventListener('keydown', handleKeyDown, true);
    window.addEventListener('keyup', handleKeyUp, true);
    window.addEventListener('focus', handleWindowFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu, true);
      window.removeEventListener('dragstart', handleDragStart, true);
      window.removeEventListener('keydown', handleKeyDown, true);
      window.removeEventListener('keyup', handleKeyUp, true);
      window.removeEventListener('focus', handleWindowFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div className="relative w-full h-full select-none">
      {/* 100% PURE PITCH BLACK SCREEN OVERLAY (ZERO POPUPS, ZERO WARNING DIALOGS) */}
      {isBlackoutActive && (
        <div className="fixed inset-0 z-[999999] bg-black pointer-events-auto select-none" />
      )}

      {children}
    </div>
  );
}
