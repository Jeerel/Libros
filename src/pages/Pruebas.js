import React, { Component } from 'react';
import { CSVLink } from 'react-csv'

//MARC 001, 035	100$a	245$a	20$a	20$a	260$a	260$b	260$c	300		980$a	980$b	980$c	980$e	980$f	980$g	981$a	981$b	981$c
/*Uniquevendoridentifier: , 
Author:, 
Title:, 
ISBNhardcover:, 
ISBNpaperback:, 
Placeofpublication:, 
Publisher:, 
Dateofpublication:, 
Physicaldescription:, 
Language:, 
ma:, 
US:, 
USshipping:, 
Netamount:, 
Invoicenumber:, 
Numberofcopies:, 
Vendorcode:, 
Fundcode:, 
Location:*/

const headers = [
    { label: "*Unique vendor identifier", key: "Uniquevendoridentifier" },
    { label: "*Author", key: "Author" },
    { label: "*Title", key: "Title" },
    { label: "ISBN - hardcover", key: "ISBNhardcover" },
    { label: "ISBN - paperback", key: "ISBNpaperback" },
    { label: "*Place of publication", key: "Placeofpublication" },
    { label: "*Publisher", key: "Publisher" },
    { label: "*Date of publication", key: "Dateofpublication" },
    { label: "*Physical description", key: "Physicaldescription" },
    { label: "*Language", key: "Language" },
    { label: "*ma (yymmdd)", key: "ma" },
    { label: "*US$ (no decimal format)", key: "US" },
    { label: "*US shipping$ (no decimal format)", key: "USshipping" },
    { label: "Net amount $ (no decimal format)", key: "Netamount" },
    { label: "*Invoice number", key: "Invoicenumber" },
    { label: "*Number of copies (default is 1)", key: "Numberofcopies" },
    { label: "*Vendor code", key: "Vendorcode" },
    { label: "*Fund code", key: "Fundcode" },
    { label: "*Location (two letter location code from order)", key: "Location" },

];

const libro = {
    Uniquevendoridentifier: "mjse",
    Author: "Marinis, Natalia de… [et al.] ; coordinador: Yerko Castro Neira",
    Title: "Antropología de la violencia. Miradas etnográficas y posicionamientos críticos",
    ISBNhardcover: "",
    ISBNpaperback: "9786075256337",
    Placeofpublication: "Puebla",
    Publisher: "Benemérita Universidad Autónoma de Puebla, Dirección General de Publicaciones",
    Dateofpublication: "2019",
    Physicaldescription: "",
    Language: "",
    ma: "200304",
    US: "1750",
    USshipping: "",
    Netamount: "1750",
    Invoicenumber: "8592",
    Numberofcopies: "1",
    Vendorcode: "mjse",
    Fundcode: "mexia",
    Location: "ma"
}

const data = [
    {
        Uniquevendoridentifier: "MARC 001, 035",
        Author: "100$a",
        Title: "245$a",
        ISBNhardcover: "20$a",
        ISBNpaperback: "20$a",
        Placeofpublication: "260$a",
        Publisher: "260$b",
        Dateofpublication: "260$c",
        Physicaldescription: "300",
        Language: "",
        ma: "980$a",
        US: "980$b",
        USshipping: "980$c",
        Netamount: "980$e",
        Invoicenumber: "980$f",
        Numberofcopies: "980$g",
        Vendorcode: "981$a",
        Fundcode: "981$b",
        Location: "981$c"
    },

    {
        Uniquevendoridentifier: libro.Uniquevendoridentifier,
        Author: libro.Author,
        Title: libro.Title,
        ISBNhardcover: libro.ISBNhardcover,
        ISBNpaperback: libro.ISBNpaperback,
        Placeofpublication: libro.Placeofpublication,
        Publisher: libro.Publisher,
        Dateofpublication: libro.Dateofpublication,
        Physicaldescription: libro.Physicaldescription,
        Language: libro.Language,
        ma: libro.ma,
        US: libro.US,
        USshipping: libro.USshipping,
        Netamount: libro.Netamount,
        Invoicenumber: libro.Invoicenumber,
        Numberofcopies: libro.Numberofcopies,
        Vendorcode: libro.Vendorcode,
        Fundcode: libro.Fundcode,
        Location: libro.Location
    }

];

class Pruebas extends Component {
    render() {
        return (
            <div>
                <CSVLink data={data} headers={headers} >
                    Download me
                </CSVLink>;
            </div>
        );
    }
}

export default Pruebas