/* eslint-disable react/jsx-key */
import React from "react";
import PropTypes from "prop-types";
function Table({ tableData, formatter }) {
    // const Theads = formatter.map((theadValue) => <th> {theadValue.label}</th>);

    const TableBody = function () {
        const body = tableData.map((rowData) => {
            const trData = formatter.map((columnData) => {
                let cellData = "";
                const columnDataId = columnData.id;
                const columnDataFormatter = columnData.formatter;
                const columnDataFormatterValidator =
                    columnDataFormatter &&
                    typeof columnDataFormatter === "function";

                if (columnDataId) {
                    cellData = rowData[columnDataId];
                }
                if (columnDataFormatterValidator) {
                    cellData = columnDataId ? cellData : undefined;
                    cellData = columnDataFormatter(
                        cellData, // currentValue
                        rowData,
                        tableData
                    );
                }
                return <td>{cellData}</td>;
            });

            return <tr>{trData}</tr>;
        });
        return body;
    };
    return (
        <tbody>
            <TableBody />
        </tbody>
    );
}

Table.propTypes = {
    tableData: PropTypes.array,
    formatter: PropTypes.array,
};
export default Table;

// const columnDataFormatterValidator =
//     columnData.formatter &&
//     typeof columnData.formatter === "function"; // this is optional if we are sure that if formatter exist then it will be a function
// if (!columnDataId) {
//     if (columnDataFormatterValidator) {
//         cellData = columnData.formatter(TableData, rowData);
//         return <td>{cellData}</td>;
//     } else {
//         return <td></td>;
//     }
// }
// if (columnDataId)
// cellData = rowData[columnDataId];
// if (columnDataFormatterValidator) {
//     cellData = columnData.formatter(columnData, rowData);
//     return <td>{cellData}</td>;
// }
