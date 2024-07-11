import React from 'react';
import styles from './DataGrid.module.css';

interface DataGridProps<T extends object> {

  columns: Array<{ Header: string; accessor: keyof T }>;
  data: T[];
  actions?: (row: T) => React.ReactNode;
  columnWidths?: (string | number)[];
}

const DataGrid = <T extends object>({ columns, data, actions, columnWidths  }: DataGridProps<T>) => {
  return (
    <div className={styles.tablecontainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={String(column.accessor)} style={{ width: columnWidths ? columnWidths[index] : 'auto' }}>
                {column.Header}
              </th>
            ))}
            {actions && <th style={{ width: columnWidths ? columnWidths[columns.length] : 'auto' }}>Ações</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, index) => (
                <td key={String(column.accessor)} style={{ width: columnWidths ? columnWidths[index] : 'auto' }}>
                  {String(row[column.accessor])}
                </td>
              ))}
              {actions && (
                <td className={styles.actionbuttons} style={{ width: columnWidths ? columnWidths[columns.length] : 'auto' }}>
                  {actions(row)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataGrid;
