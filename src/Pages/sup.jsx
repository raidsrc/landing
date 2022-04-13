import { useRef, useState } from "react"
import BackButton from "../BackButton"
import { Helmet } from "react-helmet"
import supImg from "../lighthouse.jpg"

function SupPage(props) {
  const setShowSupPage = props.setShowSupPage
  const imgRef = useRef(null) // first time using a ref ever. a little confusing.
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

  return (
    <div>
      <Helmet>
        <title>raidsrc - About</title>
      </Helmet>
      <BackButton imgRef={imgRef} setShowSupPage={setShowSupPage} backButtonTranslucency={backButtonTranslucency} setBackButtonTranslucency={setBackButtonTranslucency} backArrowTransparency={backArrowTransparency} setBackArrowTransparency={setBackArrowTransparency} triggerBackButtonAnimation={triggerBackButtonAnimation} setTriggerBackButtonAnimation={setTriggerBackButtonAnimation} backButtonWidth={backButtonWidth} setBackButtonWidth={setBackButtonWidth} backButtonHeight={backButtonHeight} setBackButtonHeight={setBackButtonHeight} trackScrollingResizing={trackScrollingResizing} />
      <div className="flex flex-row justify-center pt-7 sm:pt-4 md:pt-0">
        <img src={supImg} ref={imgRef} onLoad={trackScrollingResizing} className="brightness-150 rounded-full w-8/12 
                tiny-screen:w-6/12 
                sm:w-5/12 
                md:w-4/12 
                lg:w-1/5" />
      </div>
      <div className="flex flex-row justify-center py-6" >
        <div className="text-base w-11/12 md:w-8/12 lg:w-6/12 space-y-6">
          <p>
            You probably found your way here from my YouTube channel. Or perhaps you got here from my Twitter. Or&nbsp;<span className="italic">maybe&nbsp;</span>even from some music provider. Unlikely, as they've all been giving me a bit of trouble lately. Whatever it may be, I'm glad you're here.
          </p>
          <p>
            Let me give myself a quick introduction. I'm Ray! I upload YouTube videos under the alias <span className="text-gray-100">Raid</span>. I make music under the name <span className="text-gray-100">Rude Custard</span>. All over the rest of the internet, I go by <span className="text-gray-100">raidsrc</span>. At this point I'm known mostly for my YouTube channel, where I've been uploading since I was 15. I do a lot of music stuff on my channel. Covers, rearrangements, original compositions, and tutorials, mainly. I've made a lot of stuff related to the media I've enjoyed, like <span className="text-gray-100">Homestuck</span> and <span className="text-gray-100">Fullmetal Alchemist: Brotherhood</span>. I like video editing too. I've made a bunch of videos about a whole bunch of things. Some of them for school projects, some of them for fun. A couple of my videos on <span className="text-gray-100">Super Smash Bros Melee</span>, one of my old hobbies, have been enthusiastically received by community members.
          </p>
          <p>
            Right now, I'm an undergraduate student at the <span className="text-gray-100">University of California Davis</span>. I'm majoring in <span className="text-gray-100">Biochemistry and Molecular Biology</span> and minoring in <span className="text-gray-100">Computer Science</span>. The year I'm writing this blurb, 2022, is the year I graduate. Whew. I'm definitely looking forward to being done with school come June. 
          </p>
          <p>
            I'm trying to keep this brief, since this is just supposed to be a quick introduction for me to paste onto my profile/site landing page. So I'll end it here. I'll leave you some valuable advice as my parting gift to you.
          </p>
          <ul className="list-disc list-inside indent-3 ">
            <li>Don't ever idolize anyone. They're not worth it. I promise. </li>
            <li>Regularly save backups of your data.</li>
            <li>Warm up your muscles and joints before exercising or stretching. </li>
            <li>Don't be afraid to ask for help. </li>
            <li>Boil the water before you put the eggs in. </li>
            <li>Today is the youngest you'll ever be. Life is short. Go enjoy it. </li>
            <li>America is not a meritocracy. Race has no genetic basis. IQ is neither a complete nor accurate indication of intelligence.</li>
          </ul>
          <p>
            Alright. Peace. Go check out the links on the previous page if you want to know more about me or figure out what else I'm up to.
            {/* The link is at the top of the previous page. <NewTab className="inline-red-bg-link text-gray-100" href="https://raidsrc.me">It's also right here</NewTab>, in case you're too lazy to click the back button. */}
          </p>
          <p>

          </p>
          {/* <div className="flex flex-row justify-center py-10">
            <button onClick={() => { setShowSupPage(false); scroll(0, 0) }} className="inline-red-bg-link text-white border py-2 px-2 w-28 md:w-40 md:px-0 duration-150 hover:ease-in hover:border-gray-800 hover:opacity-100 active:opacity-80">
              See you around.
            </button>
          </div> */}
        </div>
      </div>

    </div>
  )
}

export default SupPage