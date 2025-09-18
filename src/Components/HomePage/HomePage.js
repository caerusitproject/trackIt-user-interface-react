import React from 'react'
// import Navbar from './SideNavbar';
import Labels from "./Labels";
import SummaryPanel from "./SummaryPanel"
import AnnouncementsPanel from './AnnouncementPanel';
import Footer from "./Footer"
import styled from 'styled-components';

export default function HomePage() {

const SummaryAnnouncementsWrapper = styled.div`
  display: flex;
  gap: 16px; /* spacing between panels */
  align-items: stretch;

  .panel-summary {
    flex: 0 0 auto; /* fixed size */
  }

  .panel-announcements {
    flex: 1; /* takes the rest of the space */
  }

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

  return (
    <div>
        {/* <Navbar/> */}
        <section>
            <Labels/>
            <SummaryAnnouncementsWrapper>
                <SummaryPanel/>
                <AnnouncementsPanel/>
            </SummaryAnnouncementsWrapper>  
        </section>
        {/* <Footer/> */}
    </div>
  )
}
