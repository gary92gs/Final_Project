import React from 'react';
import '../styles/DataTable.css'
import "../styles/global.css"
import ReactDataTable from 'react-data-table-component';

function DataTable({ stockData }) {

  const columns = [
    {
      name: 'Title',
      selector: row => row.title,
    },
    {
      name: 'Year',
      selector: row => row.year,
    },
    {
      name: '3',
      selector: row => row.title,
    },
    {
      name: '4',
      selector: row => row.title,
    },
    {
      name: '5',
      selector: row => row.title,
    },
    {
      name: '6',
      selector: row => row.title,
    },
    {
      name: '7',
      selector: row => row.title,
    },
    {
      name: '8',
      selector: row => row.title,
    },
    {
      name: '9',
      selector: row => row.title,
    },
  ];
  
  const data = [
      {
      id: 1,
      title: 'Hi',
      year: '1988',
    },
    {
      id: 2,
      title: 'Hello',
      year: '1984',
    },
  ]
  return (
    <div className='data-table-container'>
		 <ReactDataTable
		 	columns={columns}
		 	data={data}
		 />
    </div>
	);
};
  
export default DataTable;

// <div className='data-table'>
//   <h2>Stock Stats</h2>
//   <table className='styled-table'>
//     <thead>
//       <tr className='active-row'>
//         <th>Header 1</th>
//         <th>Header 2</th>
//         <th>Header 3</th>
//         <th>Header 4</th>
//         <th>Header 5</th>
//         <th>Header 6</th>
//         <th>Header 7</th>
//         <th>Header 8</th>
//         <th>Header 9</th>
//       </tr>
//     </thead>
//     <tbody>
//     <tr className='active-row'>
//         <td>Row 1, Cell 1</td>
//         <td>Row 1, Cell 2</td>
//         <td>Row 1, Cell 3</td>
//         <td>Row 1, Cell 4</td>
//         <td>Row 1, Cell 5</td>
//         <td>Row 1, Cell 6</td>
//         <td>Row 1, Cell 7</td>
//         <td>Row 1, Cell 8</td>
//         <td>Row 1, Cell 9</td>
//       </tr>
//       <tr className='active-row'>
//         <td>Row 2, Cell 1</td>
//         <td>Row 2, Cell 2</td>
//         <td>Row 2, Cell 3</td>
//         <td>Row 2, Cell 4</td>
//         <td>Row 2, Cell 5</td>
//         <td>Row 2, Cell 6</td>
//         <td>Row 2, Cell 7</td>
//         <td>Row 2, Cell 8</td>
//         <td>Row 2, Cell 9</td>
//       </tr>
//       <tr className='active-row'>
//         <td>Row 3, Cell 1</td>
//         <td>Row 3, Cell 2</td>
//         <td>Row 3, Cell 3</td>
//         <td>Row 3, Cell 4</td>
//         <td>Row 3, Cell 5</td>
//         <td>Row 3, Cell 6</td>
//         <td>Row 3, Cell 7</td>
//         <td>Row 3, Cell 8</td>
//         <td>Row 3, Cell 9</td>
//       </tr>
//     </tbody>
//   </table>
// </div>