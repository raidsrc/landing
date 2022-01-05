// fuck this fucking back button. I'm making my own component for it. because it's so fucking INFURIATING TO DEAL WITH 
import { CSSTransition } from "react-transition-group"
import React, { useEffect, useRef, useState } from "react"

function BackButton(props) {
  let imgRef = props.imgRef
  const [backButtonTranslucency, setBackButtonTranslucency] = useState("opacity-100")
  const [backArrowTransparency, setBackArrowTransparency] = useState("opacity-100")
  const [triggerBackButtonAnimation, setTriggerBackButtonAnimation] = useState(false)
  const [backArrowOpaque, setBackArrowOpaque] = useState("opacity-100")
  const [backButtonWidth, setBackButtonWidth] = useState("80")
  const [backButtonHeight, setBackButtonHeight] = useState("60")
  const backButtonRef = useRef(null)
  


  function trackScrollingAndResizing() {
    // if the window is small, shrink the button. else if the window is big, enlarge the button.
    if (window.innerWidth < 600) {
      setBackButtonWidth("50")
      setBackButtonHeight("50")
    } else if (window.innerWidth >= 600) {
      setBackButtonWidth("80")
      setBackButtonHeight("60")
    }
    // if we've scrolled below the image and the window is small, make the back button and arrow translucent so we can read the text.
    if (window.scrollY > imgRef.current.height - 50 && window.innerWidth < 768) {
      setTimeout(() => { setBackButtonTranslucency("opacity-20") }, 400)
      setTimeout(() => { setBackArrowTransparency("opacity-10") }, 400)
      setTriggerBackButtonAnimation(true)
    } else { // else make the back button and arrow opaque.
      setTimeout(() => { setBackButtonTranslucency("opacity-100") }, 400)
      setTimeout(() => { setBackArrowTransparency("opacity-100") }, 400)
      setTriggerBackButtonAnimation(false)
    }
  }

  function whenBackButtonIsMouseEntered() {
    if (window.scrollY > imgRef.current.height - 50 && window.innerWidth < 768)
      setBackArrowTransparency("opacity-100")
  }
  function whenBackButtonIsMouseLeaved() {
    if (window.scrollY > imgRef.current.height - 50 && window.innerWidth < 768)
      setTimeout(() => setBackArrowTransparency("opacity-10"), 300)
  }

  useEffect(() => {
    window.addEventListener("scroll", trackScrollingAndResizing)
    window.addEventListener("resize", trackScrollingAndResizing)
    backButtonRef.current.addEventListener("mouseenter", whenBackButtonIsMouseEntered)
    backButtonRef.current.addEventListener("mouseleave", whenBackButtonIsMouseLeaved)
    return () => {
      window.removeEventListener("scroll", trackScrollingAndResizing)
      window.removeEventListener("resize", trackScrollingAndResizing)
      backButtonRef.current.removeEventListener("mouseenter", whenBackButtonIsMouseEntered)
      backButtonRef.current.removeEventListener("mouseleave", whenBackButtonIsMouseLeaved)
    }
  }, [])

  return (
    <div>
      {/* the fade to translucency upon resizing or scrolling takes 400 ms. the hover animations take 150 or 300 or whatever ms i set below with duration-. */}
      < CSSTransition timeout={400} in={triggerBackButtonAnimation} classNames="translucent-button" >
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