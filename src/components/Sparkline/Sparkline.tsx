import { Tooltip } from "@mui/material";
import { green, red } from "@mui/material/colors";
import React from "react";

interface SparklineProps {
    history: { date: string; close: number }[];
    width?: number;
    height?: number;
}
const Sparkline: React.FC<SparklineProps> = ({ history, width = 100, height = 30 }) => {
    if (history.length < 2) return null;
    const closes = history.map(d => d.close);
    const min = Math.min(...closes);
    const max = Math.max(...closes);
    const start = closes[0];
    const end = closes[closes.length - 1];
    const strokeColor = end >= start ? green[500] : red[500];
    const points = history.map((d, i) => {
        const x = (i / (history.length - 1)) * width;
        const y = height - ((d.close - min) / (max - min)) * height;
        return { x, y, date: d.date, close: d.close };
    });

    return (
        <Tooltip title="Closing price over the last 7 days">
            <span>
                <svg width={width} height={height} style={{ overflow: 'visible' }}>
                    <polyline
                        points={points.map(p => `${p.x},${p.y}`).join(' ')}
                        fill="none"
                        stroke={strokeColor}
                        strokeWidth={1}
                    />
                </svg>
            </span>
        </Tooltip>
    );
};

export default Sparkline;