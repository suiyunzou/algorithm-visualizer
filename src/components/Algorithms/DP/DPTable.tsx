import React from 'react';

interface DPTableProps {
  dp: number[][];
  highlightCell?: { row: number; col: number };
  rowLabels?: string[];
  colLabels?: string[];
}

const DPTable: React.FC<DPTableProps> = ({
  dp,
  highlightCell,
  rowLabels,
  colLabels
}) => {
  if (!dp.length) return null;

  return (
    <div className="overflow-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="p-2 border bg-gray-50"></th>
            {Array.from({ length: dp[0].length }, (_, i) => (
              <th
                key={i}
                className="p-2 border bg-gray-50 font-mono text-sm"
              >
                {colLabels ? colLabels[i] : i}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dp.map((row, i) => (
            <tr key={i}>
              <td className="p-2 border bg-gray-50 font-mono text-sm">
                {rowLabels ? rowLabels[i] : i}
              </td>
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`p-2 border text-center font-mono ${
                    highlightCell?.row === i && highlightCell?.col === j
                      ? 'bg-yellow-100'
                      : cell > 0
                      ? 'bg-blue-50'
                      : ''
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DPTable;
