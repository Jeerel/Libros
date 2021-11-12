import React, { Component } from 'react';
import ReactExport from 'react-export-excel';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const multiDataSet = [
    {
        columns: [
            { value: "Name", widthPx: 50 }, // width in pixels
            { value: "Salary", widthCh: 20 }, // width in charachters
            { value: "Sex", widthPx: 60, widthCh: 20 }, // will check for width in pixels first
        ],
        data: [
            ["Johnson", 30000, "Male"],
            ["Monika", 355000, "Female"],
            ["Konstantina", 20000, "Female"],
            ["John", 250000, "Male"],
            ["Josef", 450500, "Male"],
        ],
    },
    {
        xSteps: 1, // Will start putting cell with 1 empty cell on left most
        ySteps: 5, //will put space of 5 rows,
        columns: ["Name", "Department"],
        data: [
            ["Johnson", "Finance"],
            ["Monika", "IT"],
            ["Konstantina", "IT Billing"],
            ["John", "HR"],
            ["Josef", "Testing"],
        ],
    },
];

class Pruebas extends Component {
    render() {
        return (
            <ExcelFile>
                <ExcelSheet dataSet={multiDataSet} name="Organization" />
            </ExcelFile>
        );
    }
}

export default Pruebas