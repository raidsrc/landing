import iconAmazonMusic from "../icon-amazon-music.png"
import iconAppleMusic from "../icon-apple-music.png"
import iconBandcamp from "../icon-bandcamp.png"
import iconGitHub from "../icon-github.png"
import iconSoundCloud from "../icon-soundcloud.png"
import iconSpotify from "../icon-spotify.png"
import iconTwitter from "../icon-twitter.png"
import iconYouTube from "../icon-youtube.png"
import iconPayPal from "../icon-paypal.png"
import iconVenmo from "../icon-venmo.png"
import iconYoutubeMusic from "../icon-youtube-music.png"
import primaryImg from "../hilltop-closeup-4.jpeg"
import iconRaidsrcMe from "../raid_symbol_trimmed_aligned_white_on_black_icon_more_padding.png"
import React, { useEffect, useState } from "react"
import { useSpring, animated } from "react-spring"
import { useMeasure } from "react-use"
import { Helmet } from "react-helmet"
import { Link } from "react-router-dom"


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
  // const vanishingIcons = useSpring({
  //   width: open ? "0px" : `${contentWidth}px`,
  //   // opacity: open ? 0 : 1,
  //   config: {
  //     friction: open ? 50 : 80,
  //     // precision: open ? 0.001 : (window.innerWidth > 460 ? 0.4 : 0.001),
  //     tension: 200,
  //     mass: 3,
  //     clamp: true,
  //   }
  // })
  const vanishingIconsHeight = useSpring({
    height: open ? "0px" : "32px",
    config: {
      friction: open ? 50 : 80,
      // precision: open ? 0.001 : (window.innerWidth > 460 ? 0.4 : 0.001),
      tension: 200,
      mass: 3,
      clamp: true,
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
        <button onClick={() => toggleOpen(old => !old)} className="flex flex-col flex-wrap items-center justify-center border-2 bg-gray-200 w-11/12 px-8 py-2 md:w-8/12 md:py-3 lg:w-6/12 hover:bg-gray-300 duration-150 hover:ease-in hover:border-gray-800 ">
          <animated.div className="flex flex-row items-center justify-center space-x-3 w-full overflow-hidden" style={vanishingIconsHeight}>
            {
              icons.map((icon) => (<img src={icon} className="w-8 min-w-icon-min-width" />))
            }
          </animated.div>
          <div ref={ref} className="flex flex-row items-center justify-center w-auto space-x-3 h-0 overflow-hidden" >
            {
              icons.map((icon) => (<img src={icon} className="w-8 min-w-icon-min-width h-0" />))
            }
          </div>
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


function PrimaryLandingPage(props) {
  const buttons = [
    { name: "Website", href: "https://raidsrc.me", icon: iconRaidsrcMe, },
    { name: "YouTube", href: "https://youtube.com/c/raidsrc", icon: iconYouTube, },
    { name: "Bandcamp", href: "https://rudecustard.bandcamp.com", icon: iconBandcamp, },
    { name: "Twitter", href: "https://twitter.com/raidsrc", icon: iconTwitter, },
    // { name: "Twitch", href: "https://twitch.tv/raidsrc", icon: iconTwitch, },
    {
      name: "Major Streaming Services", isDropdown: true, icon: [iconSpotify, iconAppleMusic, iconYoutubeMusic, iconAmazonMusic, iconSoundCloud], contents:
        [
          { name: "Spotify", href: "https://open.spotify.com/artist/21ORAHpo8HitrDkN9UBoKs", icon: iconSpotify, },
          { name: "Spotify 2", href: "https://open.spotify.com/artist/0puS4sx2S57u3OUQbGJrV1", icon: iconSpotify, },
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
    // opacity: mousedOverImg ? 0.75 : 1,
    transform: mousedOverImg ? "scale(1.05)" : "scale(1)",
    config: {
      friction: 3,
    },
  })
  return (
    <div>
      <Helmet>
        <meta charset="utf-8" />
        <title>raidsrc - Website, YouTube, Bandcamp, Twitter, and Other Links.</title>
        <meta name="description" content="Yo. I'm Raymond. People have also known me as Raid, Rude Custard, and Ray Louis. Come see where you can find me online." />
      </Helmet>
      <div className="flex flex-row justify-center pt-7 sm:pt-4 md:pt-0">
        <animated.img src={primaryImg} className="hidden rounded-full w-9/12 outline outline-2 outline-gray-500 outline-offset-2 max-w-2xs sm:inline-block
                  sm:w-6/12 
                  md:w-4/12 
                  lg:w-3/12" style={imgSpringBounce} onMouseEnter={() => setMousedOverImg(true)} onMouseLeave={() => setMousedOverImg(false)} />
        <img src={primaryImg} className="rounded-full w-9/12 outline outline-2 outline-gray-500 outline-offset-2 max-w-2xs
                  tiny-screen:w-8/12 
                  sm:hidden" />
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

      <div className="flex flex-row justify-center py-12 mt-16 text-stone-100">
        <Link to="/sup" onClick={() => { scroll(0, 0) }}
          className="text-center underline underline-offset-2 duration-150 hover:ease-in hover:text-gray-800">
          About Me
        </Link>
        {/* <span className="px-4">睿</span>
        <span
          className="text-center underline underline-offset-2 duration-150 hover:ease-in hover:text-gray-800">
          not a link
        </span>
        <span className="px-4">明</span>
        <span 
          className="text-center underline underline-offset-2 duration-150 hover:ease-in hover:text-gray-800">
          not a link either
        </span> */}
      </div>

      {/* <div className="flex flex-row justify-center py-12 mt-3">
        <Link to="/sup" onClick={() => { scroll(0, 0) }}
          className="text-white text-center border py-2 w-28 md:w-40 duration-150 hover:ease-in hover:border-gray-800 hover:opacity-100 active:opacity-80">
          Yo.
        </Link>
      </div> */}
    </div>
  )
}

export default PrimaryLandingPage