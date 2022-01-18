import React, { useEffect, useRef, useState } from "react"
import { useSpring, animated } from "react-spring"
import { useMeasure } from "react-use"
import me2021dec from "./me_2021_dec (Large).jpeg"
import hairBlown from "./hair blown.jpg"
import spiro from "./Homestuck_Spirograph.svg"
import BackButton from "./BackButton"
import iconAmazonMusic from "./icon-amazon-music.png"
import iconAppleMusic from "./icon-apple-music.png"
import iconBandcamp from "./icon-bandcamp.png"
import iconGitHub from "./icon-github.png"
import iconSoundCloud from "./icon-soundcloud.png"
import iconSpotify from "./icon-spotify.png"
import iconTwitter from "./icon-twitter.png"
import iconYouTube from "./icon-youtube.png"
import iconPayPal from "./icon-paypal.png"
import iconVenmo from "./icon-venmo.png"
import iconYoutubeMusic from "./icon-youtube-music.png"
import favicon from "./favicon.ico"

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

function NewTab(props) {
  return (
    <a target="_blank" rel="noreferrer noopener" href={props.href} className={props.className + " underline hover:opacity-80 active:opacity-60"}>{props.children}</a>
  )
}

function LandingPageLinkButton(props) {
  const icon = props.icon
  return (
    <div className="flex flex-row justify-center py-2 w-full">
      <a target="_blank" rel="noreferrer noopener" href={props.href} className="flex justify-center border-2 bg-gray-200 w-11/12 py-2 md:w-8/12 md:py-3 lg:w-6/12 hover:bg-gray-300 duration-150 hover:ease-in hover:border-gray-800 ">
        <div>
          <div className="flex flex-row items-center space-x-3 w-full"><img src={icon} width={30} /><span>{props.children}</span></div>
        </div>
      </a>
    </div>
  )
}

function SmallerLandingPageLinkButton(props) {
  const icon = props.icon
  return (
    <div className="flex flex-row justify-center py-2 w-10/12">
      <a target="_blank" rel="noreferrer noopener" href={props.href} className="flex justify-center border-2 bg-gray-200 w-11/12 py-2 md:w-8/12 md:py-3 lg:w-6/12 hover:bg-gray-300 duration-150 hover:ease-in hover:border-gray-800 ">
        <div>
          <div className="flex flex-row items-center space-x-3 w-full"><img src={icon} width={30} /><span>{props.children}</span></div>
        </div>
      </a>
    </div>
  )
}

function LandingPageDropdownButton(props) {
  const contents = props.contents // it's an array of objects w/ info for the link and button 
  const icons = props.icon // it's also an array, but of icons imported as js
  const [ref, { width }] = useMeasure()
  const [open, toggleOpen] = useState(false)
  const allIconsWidth = width.toString()
  const [contentWidth, setContentWidth] = useState(allIconsWidth)
  const vanishingIcons = useSpring({
    width: open ? "0px" : `${contentWidth}px`,
    config: {
      friction: open ? 50 : 80
    }
  })
  useEffect(() => {
    setContentWidth(width);
    window.addEventListener("resize", setContentWidth(width));
    return window.removeEventListener("resize", setContentWidth(width));
  }, [width]);
  return (
    <div>
      <div className="flex flex-row justify-center py-2">
        <button ref={ref} onClick={() => toggleOpen(old => !old)} className="flex flex-col flex-wrap md:flex-row items-center justify-center border-2 bg-gray-200 w-11/12 px-8 py-2 md:w-8/12 md:py-3 lg:w-6/12 hover:bg-gray-300 duration-150 hover:ease-in hover:border-gray-800 ">
          <animated.div className="overflow-hidden" style={vanishingIcons}>
            <div className="flex flex-row items-center justify-center space-x-3 w-full" >
              {
                icons.map((icon) => (<img src={icon} width={30} />))
              }
            </div>
          </animated.div>
          <div className="md:w-full">
            {props.children}
          </div>
        </button>
      </div>
      <div>
        <DropdownMenuContainer contents={contents} open={open} toggleOpen={toggleOpen} />
      </div>
    </div>
  )
}

function DropdownMenuContainer(props) {
  const open = props.open
  const [ref, { height }] = useMeasure()
  const defaultHeight = "0px"
  const [contentHeight, setContentHeight] = useState(defaultHeight)
  const contents = props.contents
  const expandProps = useSpring({
    config: { friction: 30, tension: 140 },
    height: open ? `${contentHeight}px` : defaultHeight,
  })
  useEffect(() => {
    setContentHeight(height);
    window.addEventListener("resize", setContentHeight(height));
    return window.removeEventListener("resize", setContentHeight(height));
  }, [height]);

  return (
    <animated.div className="overflow-hidden" style={expandProps}>
      <div ref={ref} className="flex flex-col items-center w-full">
        {contents.map(({ name, href, icon }) => (
          <SmallerLandingPageLinkButton href={href} icon={icon}>
            {name}
          </SmallerLandingPageLinkButton>
        ))}
      </div>
    </animated.div>
  )
}

function PrimaryLandingPage(props) { // TODO: use react-spring to animate a dropdown like the mobile stuff i've made page on the main site. contain all the music streaming services in it. have all the icons for all the streaming services on that one button. click the button and then all the other buttons fall down. include spotify, apple music, amazon music, pandora, deezer, netease, also include a caption that says "if your favorite streaming service wasn't listed, just search up rude custard and i'm sure i'll appear!" 
  const setShowSupPage = props.setShowSupPage
  const buttons = [
    { name: "Website", href: "https://raidsrc.me", icon: favicon, },
    { name: "YouTube", href: "https://youtube.com/c/raidsrc", icon: iconYouTube, },
    { name: "Bandcamp", href: "https://rudecustard.bandcamp.com", icon: iconBandcamp, },
    { name: "Twitter", href: "https://twitter.com/raidsrc", icon: iconTwitter, },
    {
      name: "Major Streaming Services", isDropdown: true, icon: [iconSpotify, iconAppleMusic, iconYoutubeMusic, iconAmazonMusic, iconSoundCloud], contents:
        [
          { name: "Spotify", href: "https://open.spotify.com/artist/21ORAHpo8HitrDkN9UBoKs", icon: iconSpotify, },
          { name: "Apple Music", href: "https://music.apple.com/us/artist/rude-custard/1603268147", icon: iconAppleMusic, },
          { name: "YouTube Music", href: "https://music.youtube.com/channel/UCGKvRfdzgIk6hrr-D4lkzYA", icon: iconYoutubeMusic, },
          { name: "Amazon Music", href: "https://music.amazon.com/artists/B09PNVRFQT/rude-custard ", icon: iconAmazonMusic, },
          { name: "SoundCloud", href: "https://soundcloud.com/raidsrc", icon: iconSoundCloud, },
        ]
    },
    {
      name: "GitHub Profiles", isDropdown: true, icon: [iconGitHub, iconGitHub], contents: [
        { name: "Personal", href: "https://github.com/raidsrc", icon: iconGitHub, },
        { name: "School", href: "https://github.com/rsrchen", icon: iconGitHub, },
      ]
    },
    {
      name: "Tip Jar", isDropdown: true, icon: [iconVenmo, iconPayPal], contents: [
        { name: "Venmo", href: "https://venmo.com/u/raidsrc", icon: iconVenmo, },
        { name: "PayPal", href: "https://paypal.me/raidsrc", icon: iconPayPal, },
      ]
    },
  ]
  const [mousedOverImg, setMousedOverImg] = useState(false)
  const imgSpringBounce = useSpring({
    opacity: mousedOverImg ? 0.8 : 1,
    transform: mousedOverImg ? "scale(1.04)" : "scale(1)",
    config: {
      friction: 4,
    },
  })
  return (
    <div>
      <div className="flex flex-row justify-center pt-7 sm:pt-4 md:pt-0">
        <animated.img src={me2021dec} className="rounded-full w-9/12 outline outline-2 outline-gray-500 outline-offset-2 max-w-2xs
                  tiny-screen:w-8/12 
                  sm:w-6/12 
                  md:w-4/12 
                  lg:w-3/12" style={imgSpringBounce} onMouseEnter={() => setMousedOverImg(true)} onMouseLeave={() => setMousedOverImg(false)} />
      </div>
      <div className="flex flex-row justify-center pt-6">
        <h1 className="text-white mild-text-shadow-left-down text-center">
          Raymond Louis Chen
        </h1>
      </div>
      <div className="flex flex-row justify-center py-1">
        <h3 className="text-white mild-text-shadow-left-down text-center">
          aka
        </h3>
      </div>
      <div className="flex flex-row justify-center pb-6">
        <h2 className="text-white mild-text-shadow-left-down text-center">
          Raid // Rude Custard // Ray Louis
        </h2>
      </div>
      {buttons.map(({ name, href, icon, isDropdown, contents }) => {
        if (isDropdown) {
          return (
            <LandingPageDropdownButton icon={icon} contents={contents}>
              {name}
            </LandingPageDropdownButton>
          )
        } else {
          return (
            <LandingPageLinkButton href={href} icon={icon}>
              {name}
            </LandingPageLinkButton>
          )
        }
      })}

      <div className="flex flex-row justify-center py-12 mt-3">
        <button onClick={() => { setShowSupPage(true); scroll(0, 0) }} className="text-white border py-2 w-28 md:w-40 duration-150 hover:ease-in hover:border-gray-800 hover:opacity-100 active:opacity-80">
          Yo.
        </button>
      </div>
    </div>
  )
}

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
      <BackButton imgRef={imgRef} setShowSupPage={setShowSupPage} backButtonTranslucency={backButtonTranslucency} setBackButtonTranslucency={setBackButtonTranslucency} backArrowTransparency={backArrowTransparency} setBackArrowTransparency={setBackArrowTransparency} triggerBackButtonAnimation={triggerBackButtonAnimation} setTriggerBackButtonAnimation={setTriggerBackButtonAnimation} backButtonWidth={backButtonWidth} setBackButtonWidth={setBackButtonWidth} backButtonHeight={backButtonHeight} setBackButtonHeight={setBackButtonHeight} trackScrollingResizing={trackScrollingResizing} />
      <div className="flex flex-row justify-center pt-7 sm:pt-4 md:pt-0">
        <img src={hairBlown} ref={imgRef} onLoad={trackScrollingResizing} className="rounded-full w-7/12 
                tiny-screen:w-6/12 
                sm:w-5/12 
                md:w-4/12 
                lg:w-2/12" />
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
            Right now, I'm an undergraduate student at the <span className="text-gray-100">University of California Davis</span>. I'm writing this on January 1st, 2022. I'm going to graduate this year if all goes according to plan! I'm majoring in <span className="text-gray-100">Biochemistry and Molecular Biology</span> and minoring in <span className="text-gray-100">Computer Science</span>. I don't like school very much at all. I'm really not cut out for studying. I've never been the most studious person, even as a little kid when everyone fooled me into thinking I was special. But I'm almost done, so I figure I've just gotta grin and bear it for the time being. Then snatch my degree and I'm outta there.
          </p>
          <p>
            I'm trying to keep this brief, since this is just supposed to be a quick introduction for me to paste onto my profile/site landing page. So I'll end it here. I'll leave you some valuable advice as my parting gift to you.
          </p>
          <ul className="list-disc list-inside indent-3 ">
            <li>Don't ever idolize anyone. They're not worth it. </li>
            <li>Regularly save backups of your data. </li>
            <li>Respect must be earned. Still, be honest and polite with everyone you meet. </li>
            <li>Warm up your muscles and joints before exercising or stretching. </li>
            <li>Don't be afraid to ask for help. </li>
            <li>Boil the water before you put the eggs in. </li>
            <li>Most importantly, life is too short for regrets! Today is the youngest you'll ever be. Go enjoy life. </li>
            <li>Oh, and also. Meritocracy is a myth, race has no genetic basis, and IQ is not a complete indication of intelligence. That's also pretty important. </li>
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

function App(props) {
  const [showSupPage, setShowSupPage] = useState(false)

  return (
    <div>
      <div className="pb-20 z-20">
        <CenteredFullPageFlexContainer>
          {/* the plan: centered circle image of me. big text below that say Raid. or Bite Me. or Ray Louis. below that have links to where i be at. youtube, spotify, apple music, etc. have them arranged like linktree has it but different. wide buttons with off-white colored backgrounds. black text. icons on the buttons.*/}
          {showSupPage ? <SupPage setShowSupPage={setShowSupPage} /> : <PrimaryLandingPage setShowSupPage={setShowSupPage} />}
        </CenteredFullPageFlexContainer>
      </div>
      <div className="fixed flex flex-row justify-center items-center top-0 -z-10 w-screen h-screen">
        <img src={spiro} className="min-w-spiro-min-width w-full max-w-yuge opacity-10 md:opacity-5 hue-rotate-90 brightness-50 animate-med-spin-spirograph md:animate-slow-spin-spirograph" />
      </div>

    </div>
  )
}

export default App