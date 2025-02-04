import { useState, useCallback } from "react";

export default function useInfiniteCanvas() {
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const onWheel = useCallback(
    (e) => {
      e.preventDefault();
      const scaleChange = e.deltaY * -0.001;
      const newScale = Math.min(Math.max(scale + scaleChange, 0.1), 5);
      setScale(newScale);
    },
    [scale]
  );

  const onMouseDown = useCallback((e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  }, []);

  const onMouseMove = useCallback(
    (e) => {
      if (!isDragging) return;

      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;

      setOffset((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
      setDragStart({ x: e.clientX, y: e.clientY });
    },
    [isDragging, dragStart]
  );

  const onMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  return { scale, offset, onWheel, onMouseDown, onMouseMove, onMouseUp };
}
