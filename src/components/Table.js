/* eslint-disable react/jsx-key */
import React from "react";
import PropTypes from "prop-types";
function Table({ data, formatter }) {
    console.log();
    const Theads = formatter.map((theadValue) => (
        <th key3> {theadValue.label}</th>
    ));

    const TableBody = data.map((rowData) => {
        let cellData = "";
        const trData = formatter.map((columnData) => {
            if (columnData.id === "undefined") {
                if (
                    columnData.formatter &&
                    typeof columnData.formatter === "function" // this is optional if we are sure that if formatter exist then it will be a function
                ) {
                    cellData = columnData.formatter(rowData, data);
                    return <td>{cellData}</td>;
                } else {
                    return <td></td>;
                }
            }
            if (columnData.id) cellData = rowData[columnData.id];
            if (
                columnData.formatter &&
                typeof columnData.formatter === "function" // condition can be removed
            ) {
                cellData = columnData.formatter(columnData, rowData);
                return <td>{cellData}</td>;
            }

            return <td>{cellData}</td>;
        });
        return <tr>{trData}</tr>;
    });

    return (
        <table>
            <thead>
                <tr>
                    <Theads />
                </tr>
            </thead>
            <tbody>
                <TableBody />
            </tbody>
        </table>
    );
}
Table.propTypes = {
    data: PropTypes.array,
    formatter: PropTypes.array,
};
export default Table;
