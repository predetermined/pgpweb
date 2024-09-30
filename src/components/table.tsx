import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface TableProps {
  columns: string[];
  rows: { value: ReactNode }[][];
  isLoading?: boolean;
}

export const Table = (props: TableProps) => {
  return (
    <table className={twMerge("table-fixed w-full")}>
      <thead>
        <tr>
          {props.columns.map((column, i) => {
            return (
              <th
                className={twMerge(
                  "py-2 px-3 border-neutral-300 border-t border-l text-left",
                  i === props.columns.length - 1 ? "border-r" : ""
                )}
                key={column}
              >
                {column}
              </th>
            );
          })}
        </tr>
      </thead>

      <tbody>
        {props.isLoading ? (
          <tr>
            <td className="p-2 border-neutral-300 border border-r-0">
              [Loading...]
            </td>
            {Array.from({ length: props.columns.length - 1 }).map((_, i) => (
              <td
                key={`placeholder-${i}`}
                className={twMerge(
                  "p-2 border-neutral-300 border border-l-0 border-r-0",
                  i === props.columns.length - 2 ? "border-r" : ""
                )}
              ></td>
            ))}
          </tr>
        ) : props.rows.length === 0 ? (
          <tr>
            <td className="p-2 border-neutral-300 border border-r-0">
              [No data]
            </td>
            {Array.from({ length: props.columns.length - 1 }).map((_, i) => (
              <td
                key={`placeholder-${i}`}
                className={twMerge(
                  "p-2 border-neutral-300 border border-l-0 border-r-0",
                  i === props.columns.length - 2 ? "border-r" : ""
                )}
              ></td>
            ))}
          </tr>
        ) : (
          props.rows.map((row, rowI) => {
            return (
              <tr key={rowI}>
                {row.map((cell, cellI) => {
                  return (
                    <td
                      className={twMerge(
                        "py-2 px-3 border-neutral-300 border-t border-l overflow-hidden break-all",
                        cellI === row.length - 1 ? "border-r" : "",
                        rowI === props.rows.length - 1 ? "border-b" : ""
                      )}
                      key={rowI + "_" + cellI}
                    >
                      {cell.value}
                    </td>
                  );
                })}
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
};
