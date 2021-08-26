/* eslint-disable react/jsx-key */
import React from "react";
import PropTypes from "prop-types";
function Table({ TableData, formatter }) {
    // const Theads = formatter.map((theadValue) => <th> {theadValue.label}</th>);

    const TableBody = function () {
        const body = TableData.map((rowData) => {
            const trData = formatter.map((columnData) => {
                let cellData, currentValue;
                const columnDataId = columnData.id;
                const columnDataFormatter = columnData.formatter;
                const columnDataFormatterValidator =
                    columnDataFormatter &&
                    typeof columnDataFormatter === "function";

                if (columnDataId) {
                    currentValue = rowData[columnDataId];
                    cellData = rowData[columnDataId];
                } else {
                    currentValue = undefined;
                    if (columnDataFormatterValidator) {
                        cellData = columnDataFormatter(
                            currentValue,
                            rowData,
                            TableData
                        );
                        return <td>{cellData}</td>;
                    } else {
                        return <td></td>;
                    }
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
    TableData: PropTypes.array,
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
