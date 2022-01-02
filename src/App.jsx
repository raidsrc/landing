import React from "react"
import me2021dec from "./me_2021_dec.jpeg"

function CenteredFullPageFlexContainer(props) {
  return (
    <div className="flex justify-center w-full"
    //style={animationProps}
    >
      <div className="w-11/12 max-w-screen-xl flex flex-col justify-center py-7 md:mt-8 homepage-centeredfullpageflexcontainer-style">
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
  return (
    <div className="flex flex-row justify-center py-2">
      <a target="_blank" rel="noreferrer noopener" href={props.href}
        className="flex justify-center border-2 bg-gray-200 w-full py-2 md:w-8/12 md:py-3 lg:w-6/12 hover:bg-gray-300 duration-150 hover:ease-in hover:border-gray-800 ">
        <button>
          {props.children}
        </button>
      </a>
    </div>
  )
}

function App(props) {
  return (
    <div className="bg-gray-450 open-sans">
      <div className="pb-20">
        <CenteredFullPageFlexContainer>
          {/* the plan: centered circle image of me. big text below that say Raid. or Bite Me. or Ray Louis. below that have links to where i be at. youtube, spotify, apple music, etc. have them arranged like linktree has it but different. wide buttons with off-white colored backgrounds. black text. icons on the buttons.*/}
          <div className="flex flex-row justify-center pt-7 sm:pt-4 md:pt-0">
            <img src={me2021dec} className="rounded-full w-9/12 
                  tiny-screen:w-8/12 
                  sm:w-6/12 
                  md:w-4/12 
                  lg:w-3/12" />
          </div>
          <div className="flex flex-row justify-center py-6">
            <h1 className="text-white mild-text-shadow-left-down">
              Raid  //  Bite Me  //  Ray Louis
            </h1>
          </div>
          <LandingPageLinkButton href="https://raidsrc.me">
            Website
          </LandingPageLinkButton>
          <LandingPageLinkButton href="https://youtube.com/c/raidsrc">
            YouTube
          </LandingPageLinkButton>
          <LandingPageLinkButton href="https://spotify.com">
            Spotify
          </LandingPageLinkButton>
          <LandingPageLinkButton href="https://apple.com">
            Apple Music
          </LandingPageLinkButton>
          <LandingPageLinkButton href="https://twitter.com/raidsrc">
            Twitter
          </LandingPageLinkButton>
          <LandingPageLinkButton href="https://github.com/raidsrc">
            Github, Personal
          </LandingPageLinkButton>
          <LandingPageLinkButton href="https://github.com/rsrchen">
            Github, School
          </LandingPageLinkButton>
          <LandingPageLinkButton href="https://soundcloud.com/raidsrc">
            SoundCloud
          </LandingPageLinkButton>
          <div className="flex flex-row justify-center py-4">
            <span className="inline-red-bg-link text-white">
              <NewTab href="/sup">
                Sup.
              </NewTab>
            </span>
          </div>
        </CenteredFullPageFlexContainer>
      </div>
    </div>
  )
}

export default App