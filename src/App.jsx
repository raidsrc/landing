import React, { useState } from "react"
import PrimaryLandingPage from "./Pages/primary"
import SupPage from "./Pages/sup"
import spiro from "./Homestuck_Spirograph.svg"
import { BrowserRouter, Routes, Route } from "react-router-dom"


function CenteredFullPageFlexContainer(props) {
  return (
    <div className="flex justify-center w-full"
    //style={animationProps}
    >
      <div className="w-11/12 max-w-screen-xl flex flex-col justify-center py-2 md:mt-8 homepage-centeredfullpageflexcontainer-style">
        {props.children}
      </div>
    </div>
  )
}

function App(props) {
  const [showSupPage, setShowSupPage] = useState(false)

  return (
    <div>
      <div className="pb-20 z-20">
        <CenteredFullPageFlexContainer>
          {/* the plan: centered circle image of me. big text below that say Raid. or Bite Me. or Ray Louis. below that have links to where i be at. youtube, spotify, apple music, etc. have them arranged like linktree has it but different. wide buttons with off-white colored backgrounds. black text. icons on the buttons.*/}
          <BrowserRouter>
            <Routes>
              <Route exact path={'/'} element={<PrimaryLandingPage />} />
              <Route exact path={'/sup'} element={<SupPage />} />
            </Routes>
          </BrowserRouter>

          {/* {showSupPage ? <SupPage setShowSupPage={setShowSupPage} /> : <PrimaryLandingPage setShowSupPage={setShowSupPage} />} */}
        </CenteredFullPageFlexContainer>
      </div>
      <div className="fixed flex flex-row justify-center items-center top-0 -z-10 w-screen h-screen">
        <img src={spiro} className="min-w-spiro-min-width w-full max-w-yuge opacity-10 md:opacity-5 hue-rotate-90 brightness-50 animate-med-spin-spirograph md:animate-slow-spin-spirograph" />
      </div>

    </div>
  )
}

export default App