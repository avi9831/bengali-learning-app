import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { LevelCurriculumItem } from '../models/curriculumModels';
import { LevelCard } from './LevelCard';

interface VirtualizedLevelListProps {
  levels: LevelCurriculumItem[];
  highestUnlockedLevel: number;
  completedSubLessons: Record<string, boolean>;
  toBn: (num: number) => string;
  onSelectLevel: (level: LevelCurriculumItem) => void;
  onSpeak: (text: string) => void;
}

const ESTIMATED_ITEM_HEIGHT = 116; // Average height of LevelCard with padding and margins
const OVERSCAN_COUNT = 2; // Render 2 items above and below viewport for silky smooth scrolling

export const VirtualizedLevelList: React.FC<VirtualizedLevelListProps> = React.memo(
  ({
    levels,
    highestUnlockedLevel,
    completedSubLessons,
    toBn,
    onSelectLevel,
    onSpeak,
  }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scrollTop, setScrollTop] = useState(0);
    const [viewportHeight, setViewportHeight] = useState(500);

    // Track container height
    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const updateHeight = () => {
        setViewportHeight(container.clientHeight || 500);
      };

      updateHeight();
      const resizeObserver = new ResizeObserver(updateHeight);
      resizeObserver.observe(container);

      return () => resizeObserver.disconnect();
    }, []);

    // Throttled scroll listener using requestAnimationFrame to prevent dropped frames
    const tickingRef = useRef(false);
    const handleScroll = useCallback(() => {
      if (!tickingRef.current) {
        requestAnimationFrame(() => {
          if (containerRef.current) {
            setScrollTop(containerRef.current.scrollTop);
          }
          tickingRef.current = false;
        });
        tickingRef.current = true;
      }
    }, []);

    const totalCount = levels.length;
    const totalHeight = totalCount * ESTIMATED_ITEM_HEIGHT;

    // Calculate window slice
    const { startIndex, endIndex, topSpacerHeight, bottomSpacerHeight } = useMemo(() => {
      const rawStart = Math.floor(scrollTop / ESTIMATED_ITEM_HEIGHT);
      const rawEnd = Math.ceil((scrollTop + viewportHeight) / ESTIMATED_ITEM_HEIGHT);

      const start = Math.max(0, rawStart - OVERSCAN_COUNT);
      const end = Math.min(totalCount, rawEnd + OVERSCAN_COUNT);

      const topSpacer = start * ESTIMATED_ITEM_HEIGHT;
      const bottomSpacer = Math.max(0, (totalCount - end) * ESTIMATED_ITEM_HEIGHT);

      return {
        startIndex: start,
        endIndex: end,
        topSpacerHeight: topSpacer,
        bottomSpacerHeight: bottomSpacer,
      };
    }, [scrollTop, viewportHeight, totalCount]);

    const visibleLevels = useMemo(() => {
      return levels.slice(startIndex, endIndex);
    }, [levels, startIndex, endIndex]);

    return (
      <main
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-1 px-4 pb-8 max-h-[62vh] overflow-y-auto will-change-scroll"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {topSpacerHeight > 0 && (
          <div style={{ height: `${topSpacerHeight}px` }} aria-hidden="true" />
        )}

        <div className="space-y-3">
          {visibleLevels.map((level) => {
            const isUnlocked = level.id <= highestUnlockedLevel;
            const completedSubsCount = level.subLessons.filter(
              (s) => completedSubLessons[s.id]
            ).length;
            const isAllSubsDone = completedSubsCount >= level.subLessons.length;

            return (
              <LevelCard
                key={level.id}
                level={level}
                isUnlocked={isUnlocked}
                isAllSubsDone={isAllSubsDone}
                completedSubsCount={completedSubsCount}
                completedSubLessons={completedSubLessons}
                highestUnlockedLevel={highestUnlockedLevel}
                toBn={toBn}
                onSelect={onSelectLevel}
                onSpeak={onSpeak}
              />
            );
          })}
        </div>

        {bottomSpacerHeight > 0 && (
          <div style={{ height: `${bottomSpacerHeight}px` }} aria-hidden="true" />
        )}
      </main>
    );
  }
);

VirtualizedLevelList.displayName = 'VirtualizedLevelList';
