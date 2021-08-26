/* eslint-disable react/jsx-key */
import React from "react";
import PropTypes from "prop-types";
function Table({ data, formatter }) {
    const Theads = formatter.map((theadValue) => <th> {theadValue.label}</th>);

    const TableBody = data.map((rowData) => {
        const trData = formatter.map((columnData) => {
            let cellData = "";
            const columnDataId = columnData.id;
            const columnDataFormatterValidator =
                columnData.formatter &&
                typeof columnData.formatter === "function"; // this is optional if we are sure that if formatter exist then it will be a function

            if (!columnDataId) {
                if (columnDataFormatterValidator) {
                    cellData = columnData.formatter(data, rowData);
                    return <td>{cellData}</td>;
                } else {
                    return <td></td>;
                }
            }
            if (columnDataId) cellData = rowData[columnDataId];
            if (columnDataFormatterValidator) {
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
