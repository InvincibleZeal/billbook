import React from "react";
import PropTypes from "prop-types";
function Table({ tableData = [], formatter = [], children, ...rest }) {
    const TableHead = function () {
        return formatter.map((columnHead, index) => (
            <th key={index}>{columnHead.label}</th>
        ));
    };
    const TableBody = function () {
        const body = tableData.map((rowData, rowIndex) => {
            const trData = formatter.map((columnData, columnIndex) => {
                let cellData = "";
                const columnDataId = columnData.id;
                const columnDataFormatter = columnData.formatter;

                if (columnDataId) {
                    cellData = rowData[columnDataId];
                }

                if (columnDataFormatter) {
                    if (typeof columnDataFormatter === "function") {
                        cellData = cellData || undefined;
                        cellData = columnDataFormatter(
                            cellData, // currentValue
                            rowData,
                            tableData
                        );
                    } else
                        return (
                            <td
                                key={columnDataId || columnIndex}
                                data-testid="table-cell"
                            >
                                {" "}
                                {columnDataFormatter}
                            </td>
                        );
                }
                return (
                    <td
                        key={columnDataId || columnIndex}
                        data-testid="table-cell"
                    >
                        {cellData}
                    </td>
                );
            });

            return (
                <tr key={rowIndex} data-testid="table-row">
                    {trData}
                </tr>
            );
        });
        return body;
    };
    return (
        <table {...rest} data-testid="table">
            {children}
            <thead>
                <tr>
                    <TableHead />
                </tr>
            </thead>
            <tbody data-testid="table-tbody">
                <TableBody />
            </tbody>
        </table>
    );
}

Table.propTypes = {
    tableData: PropTypes.array,
    formatter: PropTypes.array,
    children: PropTypes.any,
};
export default Table;
