// src/components/ui/GitHubHeatmap.jsx
// Custom GitHub contribution heatmap. Fetches contribution data from the
// public GitHub API and renders a 7×N grid of cells. We don't depend on
// `react-github-calendar` because that pulls in `react-activity-calendar`,
// which depends on `date-fns@4` (pure ESM) — incompatible with CRA's
// webpack 4 setup.

import { useEffect, useMemo, useState } from "react";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function levelFromCount(count) {
  if (count === 0) return 0;
  if (count <= 3) return 1;
  if (count <= 6) return 2;
  if (count <= 9) return 3;
  return 4;
}

function buildGrid(weeks) {
  // weeks[]: array of 7-element arrays (Sun..Sat), each cell is { date, count }.
  // We group cells into columns; the first column may be partial (pre-Jan 1 of the start year).
  // Return { columns: Cell[][], monthLabels: { col: month } }
  if (!weeks || weeks.length === 0) return { columns: [], monthLabels: {} };
  const columns = weeks;
  const monthLabels = {};
  let lastMonth = -1;
  columns.forEach((col, i) => {
    const first = col.find((c) => c && c.date);
    if (!first) return;
    const d = new Date(first.date);
    const m = d.getUTCMonth();
    if (m !== lastMonth) {
      monthLabels[i] = MONTHS[m];
      lastMonth = m;
    }
  });
  return { columns, monthLabels };
}

function HeatmapSkeleton() {
  // 53 columns × 7 rows of placeholder cells.
  return (
    <div className="flex gap-[3px] overflow-x-auto no-scrollbar">
      {Array.from({ length: 53 }).map((_, ci) => (
        <div key={ci} className="flex flex-col gap-[3px]">
          {Array.from({ length: 7 }).map((_, ri) => (
            <div
              key={ri}
              className="w-[11px] h-[11px] rounded-sm bg-carbon-2"
              aria-hidden="true"
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default function GitHubHeatmap({ username = "KazimFedxD" }) {
  const [data, setData] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`https://github-contributions-api.joblk.com/?user=${username}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((d) => {
        if (cancelled) return;
        setData(d);
      })
      .catch((e) => {
        if (cancelled) return;
        setErr(e.message);
      });
    return () => { cancelled = true; };
  }, [username]);

  const grid = useMemo(() => {
    if (!data || !Array.isArray(data.contributions)) return null;
    return buildGrid(data.contributions);
  }, [data]);

  const total = data?.total?.["last year"] ?? data?.total?.lastYear ?? data?.total ?? 0;

  return (
    <div>
      <div className="flex items-center justify-between mb-3 font-mono text-[10px] text-ink-3">
        <span>{data?.total ? `${total} contributions in the last year` : "loading…"}</span>
        <span className="inline-flex items-center gap-1.5">
          <span>less</span>
          {[0, 1, 2, 3, 4].map((lvl) => (
            <span
              key={lvl}
              className="w-2.5 h-2.5 rounded-sm"
              style={{ background: `oklch(${0.22 + lvl * 0.13} ${0.04 + lvl * 0.035} 145)` }}
            />
          ))}
          <span>more</span>
        </span>
      </div>

      {err && (
        <div className="text-xs text-ink-3 font-mono">
          GitHub activity unavailable ({err}).{" "}
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noreferrer"
            className="text-terminal-1 hover:underline"
          >
            View on github.com
          </a>
        </div>
      )}

      {!err && !grid && <HeatmapSkeleton />}

      {grid && grid.columns.length > 0 && (
        <div className="overflow-x-auto no-scrollbar">
          {/* Month labels */}
          <div className="flex gap-[3px] mb-1 pl-[28px] font-mono text-[9px] text-ink-3">
            {grid.columns.map((_, i) => (
              <div key={i} className="w-[11px] text-center shrink-0">
                {grid.monthLabels[i] || ""}
              </div>
            ))}
          </div>
          {/* Day-of-week labels + grid */}
          <div className="flex">
            <div className="flex flex-col gap-[3px] pr-1.5 font-mono text-[9px] text-ink-3 pt-0.5">
              <span className="h-[11px] leading-[11px]">Sun</span>
              <span className="h-[11px] leading-[11px]"></span>
              <span className="h-[11px] leading-[11px]">Tue</span>
              <span className="h-[11px] leading-[11px]"></span>
              <span className="h-[11px] leading-[11px]">Thu</span>
              <span className="h-[11px] leading-[11px]"></span>
              <span className="h-[11px] leading-[11px]">Sat</span>
            </div>
            <div className="flex gap-[3px]">
              {grid.columns.map((col, ci) => (
                <div key={ci} className="flex flex-col gap-[3px]">
                  {col.map((cell, ri) => {
                    if (!cell) {
                      return (
                        <div
                          key={ri}
                          className="w-[11px] h-[11px] rounded-sm bg-transparent"
                        />
                      );
                    }
                    const level = levelFromCount(cell.count);
                    return (
                      <div
                        key={ri}
                        title={`${cell.count} contribution${cell.count === 1 ? "" : "s"} on ${cell.date}`}
                        className="w-[11px] h-[11px] rounded-sm"
                        style={{
                          background: `oklch(${0.22 + level * 0.13} ${0.04 + level * 0.035} 145)`,
                        }}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
