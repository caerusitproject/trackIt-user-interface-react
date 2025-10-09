import React from 'react';
import AssetsSolutionNavigation from './AssetSolutionMenu';
import SolutionTable from './SolutionTable';

export default function SolutionMain() {
  return (
    <div style={{padding:"20px",display:"flex",flexDirection:"row",gap:"20px",justifyContent:"space-between"}}>
      <AssetsSolutionNavigation />
      {/* <SolutionTable /> */}
    </div>
  )
}
