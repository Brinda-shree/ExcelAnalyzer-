import React from 'react';
import Plot from 'react-plotly.js';
import { Layout, Config, Data } from 'plotly.js';

type ChartDataPoint = {
  x: number;
  y: number;
  z: number;
  value: number;
};

type Chart3DProps = {
  data: ChartDataPoint[];
  type: 'scatter3d' | 'surface';
  title: string;
};

export const Chart3D: React.FC<Chart3DProps> = ({ data, type, title }) => {
  const getPlotData = (): Data[] => {
    switch (type) {
      case 'scatter3d':
        return [{
          x: data.map((d) => d.x),
          y: data.map((d) => d.y),
          z: data.map((d) => d.z),
          mode: 'markers',
          marker: {
            size: data.map((d) => d.value * 2),
            color: data.map((d) => d.value),
            colorscale: [
              [0, '#8b5cf6'],
              [0.5, '#ec4899'],
              [1, '#3b82f6']
            ],
            showscale: true,
            opacity: 0.8
          },
          type: 'scatter3d',
          name: 'Data Points'
        } as Data];

      case 'surface':
        const size = Math.sqrt(data.length);
        const z: number[][] = [];
        for (let i = 0; i < size; i++) {
          const row: number[] = [];
          for (let j = 0; j < size; j++) {
            const index = i * size + j;
            row.push(data[index]?.value || 0);
          }
          z.push(row);
        }

        return [{
          z,
          type: 'surface',
          colorscale: [
            [0, '#8b5cf6'],
            [0.5, '#ec4899'],
            [1, '#3b82f6']
          ],
          showscale: true
        } as Data];

      default:
        return [];
    }
  };

  const layout: Partial<Layout> = {
    title: {
      text: title,
      font: { color: 'white', size: 18 }
    },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    scene: {
      xaxis: {
        title: 'X Axis',
        titlefont: { color: 'white' },
        tickfont: { color: 'white' },
        gridcolor: 'rgba(255,255,255,0.2)',
        zerolinecolor: 'rgba(255,255,255,0.4)'
      },
      yaxis: {
        title: 'Y Axis',
        titlefont: { color: 'white' },
        tickfont: { color: 'white' },
        gridcolor: 'rgba(255,255,255,0.2)',
        zerolinecolor: 'rgba(255,255,255,0.4)'
      },
      zaxis: {
        title: 'Z Axis',
        titlefont: { color: 'white' },
        tickfont: { color: 'white' },
        gridcolor: 'rgba(255,255,255,0.2)',
        zerolinecolor: 'rgba(255,255,255,0.4)'
      },
      bgcolor: 'rgba(0,0,0,0)',
      camera: {
        eye: { x: 1.5, y: 1.5, z: 1.5 }
      }
    },
    margin: { l: 0, r: 0, t: 40, b: 0 },
    font: { color: 'white' }
  };

  const config: Partial<Config> = {
    displayModeBar: true,
    displaylogo: false,
    modeBarButtonsToRemove: ['pan2d', 'lasso2d', 'select2d'],
    responsive: true
  };

  return (
    <div className="w-full h-96">
      <Plot
        data={getPlotData()}
        layout={layout}
        config={config}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};
