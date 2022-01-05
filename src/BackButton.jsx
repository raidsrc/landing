// fuck this fucking back button. I'm making my own component for it. because it's so fucking INFURIATING TO DEAL WITH 
import { CSSTransition } from "react-transition-group"
import React, { useEffect, useRef, useState } from "react"

function BackButton(props) {
  const imgRef = props.imgRef
  const backButtonRef = useRef(null)
  const setShowSupPage = props.setShowSupPage
  const [backButtonTranslucency, setBackButtonTranslucency] = useState("opacity-100")
  const [backArrowTransparency, setBackArrowTransparency] = useState("opacity-100")
  const [triggerBackButtonAnimation, setTriggerBackButtonAnimation] = useState(false)
  const [backButtonWidth, setBackButtonWidth] = useState("80")
  const [backButtonHeight, setBackButtonHeight] = useState("60")

  function trackScrollingResizing() { // this function fires every time there's a scroll or a resize.
    // if the window is small, shrink the button. else if the window is big, enlarge the button.
    if (window.innerWidth < 600) {
      setBackButtonWidth("50")
      setBackButtonHeight("50")
    } else if (window.innerWidth >= 600) {
      setBackButtonWidth("80")
      setBackButtonHeight("60")
    }
    // i need to make it so that if the mouse has entered and we've scrolled below the image, we make the button opaque. and that it stays opaque even if we keep scrolling while the mouse has entered. how the fuck?
    // ok. 

    // let's try this again
    // if scrolled below image 
    //     if mouse on button, no animate
    //     else if mouse off button, animate the fade out, set all the shit to be translucent/transparent
    // if scrolled above image
    //     whether mouse is on the button or not, do a fade back in 
    // i think this should work.
    if (window.innerWidth < 768) { // if window is small (medium?)
      if (window.scrollY > imgRef.current.height - 50) { // if scrolled below image
        setBackButtonTranslucency("opacity-20")
        setBackArrowTransparency("opacity-10")
      } else if (window.scrollY < imgRef.current.height - 50) { // if scrolled above image
        setTriggerBackButtonAnimation(false)
        setBackButtonTranslucency("opacity-100")
        setBackArrowTransparency("opacity-100")
      }
    }
  }

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
            onClick={() => setShowSupPage(false)}>

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