// fuck this fucking back button. I'm making my own component for it. because it's so fucking INFURIATING TO DEAL WITH 
import { CSSTransition } from "react-transition-group"
import React, { useEffect, useRef, useState } from "react"

function BackButton(props) {
  const backButtonRef = useRef(null)
  const setShowSupPage = props.setShowSupPage
  const backButtonTranslucency = props.backButtonTranslucency
  const backArrowTransparency = props.backArrowTransparency
  const triggerBackButtonAnimation = props.triggerBackButtonAnimation
  const backButtonWidth = props.backButtonWidth
  const backButtonHeight = props.backButtonHeight
  const trackScrollingResizing = props.trackScrollingResizing

  useEffect(() => {
    trackScrollingResizing()
    window.addEventListener("scroll", trackScrollingResizing)
    window.addEventListener("resize", trackScrollingResizing)
    return () => {
      window.removeEventListener("scroll", trackScrollingResizing)
      window.removeEventListener("resize", trackScrollingResizing)
    }
  }, [])

  return (
    <div>
      {/* the fade to translucency upon resizing or scrolling takes 400 ms. the hover animations take 150 or 300 or whatever ms i set below with duration-. */}
      < CSSTransition timeout={400} in={triggerBackButtonAnimation} classNames="translucent-button" >
        {/* these CSSTransitions here handle the fade in and out of the button when we scroll above or below the image. */}
        <div className={"fixed left-7 top-6 md:left-auto md:top-auto " + backButtonTranslucency + " hover:opacity-100 duration-300 ease-in"} ref={backButtonRef}>
          {/* the only animation happening with this button is the outline color changing */}
          <button className="outline outline-1 hover:outline-white hover:ease-in duration-150"
            onClick={() => { setShowSupPage(false); scroll(0, 0) }}>

            <CSSTransition timeout={400} in={triggerBackButtonAnimation} classNames="transparent-arrow">
              {/* the actual arrow is wrapped in its own CSSTransition because it needs to become almost completely transparent */}
              <svg xmlns="http://www.w3.org/2000/svg" width={backButtonWidth} height={backButtonHeight} stroke="white" strokeWidth={1.3} transform="rotate(180)"
                viewBox="0 0 24 24"
                className={"p-2 " + backArrowTransparency + " duration-300"}><path d="M24 12l-12-9v5h-12v8h12v5l12-9z">
                </path></svg>
            </CSSTransition>
          </button>
        </div>
      </CSSTransition >
    </div>
  )
}

export default BackButton