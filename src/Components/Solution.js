import React from 'react';
// import Navbar from './HomePage/SideNavbar'
import pdfFile from "../assets/mrt-pdf-example.pdf"

export default function Solution() {
  return (
   <div>
         {/* <Navbar/> */}
         {/* <h4>Solution Page</h4> */}
         <iframe src={pdfFile} width="100%" height="500px" title="PDF Viewer" />
    </div>
  )
}
