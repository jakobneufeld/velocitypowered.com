import React, { useState } from "react"
import styled from "@emotion/styled"
import { Link } from "gatsby"
import velocityWhiteCropped from "../assets/img/velocity-white-cropped.png";
import velocityBlueCropped from "../assets/img/velocity-blue-cropped.png";
import { IconContext } from "react-icons"
import { FiMenu } from "react-icons/fi"

import ThemeSwitcher from './theme-switcher'
import stylingGlobals from "../styles/styling-globals"
import {useTheme} from "emotion-theming";

const NavbarContainer = styled.nav`
  margin: 0;
  padding: 0;
  position: fixed;
  top: 0;
  width: 100%;
  background-color: var(--navbar-background);
  color: var(--navbar-text);
  z-index: 100;
`

const NavbarList = styled.div`
  display: flex;
`
const NavbarLogo = styled.div`
  padding: 15px;
  flex: 1;
`

const NavbarItem = styled.a`
  padding: 18px 10px;
  background-color: rgba(2, 136, 209, ${( {active} ) => active ? '1' : '0'});
  background-repeat: no-repeat;
  transition: background-color .25s 0s;
  color: var(--navbar-text) !important;
  display: block;
  
  &:hover{
    background-color: rgba(2, 136, 209, 1);
  }
  
  @media (max-width: ${stylingGlobals.viewportSizes.phone}) {
    padding: 8px;
    border-bottom: ${({ theme }) => theme.skipMobileNavbarBorders ? 'none' : `1px solid var(--navbg-border)`};
  }
`
const NavbarLink = NavbarItem.withComponent(Link)

const NavbarItems = styled.div`
  display: flex;
  
  @media (max-width: ${stylingGlobals.viewportSizes.phone}) {
    display: none;
  }
`

const MobileNavbarItems = styled.div`
  display: none;
  background-color: var(--navbar-background);
  
  @media (max-width: ${stylingGlobals.viewportSizes.phone}) {
    margin-bottom: -60px;
    display: ${( { mobileShown }) => mobileShown ? 'block' : 'none'};
  }
`

const NavbarExpand = styled.div`
  padding: 18px 10px 0 10px;
  
  @media (min-width: ${stylingGlobals.viewportSizes.phone}) {
    display: none;
  }
`

function getLogoShown(theme) {
  return theme.logoVariant === 'blue' ? velocityBlueCropped : velocityWhiteCropped
}

function NavbarItemContents({ location }) {
  return <>
    <NavbarLink to={"/wiki"} active={location.pathname.startsWith("/wiki") ? true : undefined}>Documentation</NavbarLink>
    <NavbarLink to={"/downloads"} active={location.pathname.startsWith("/downloads") ? true : undefined}>Downloads</NavbarLink>
    <NavbarItem href={"https://forums.velocitypowered.com"}>Forums</NavbarItem>
    <NavbarItem href={"https://discord.gg/8cB9Bgf"}>Discord</NavbarItem>
  </>
}

export default function Navbar({ location, themeName, setThemeName }) {
  const theme = useTheme()
  const [ expanded, setExpanded ] = useState(false)

  function flipExpanded() {
    setExpanded(!expanded)
  }

  return (
    <NavbarContainer>
      <NavbarList>
        <NavbarLogo>
          <Link
            to={"/"}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              color: theme.colors.navbarText,
              fontWeight: 'bold'
            }
          }>
            <img src={getLogoShown(theme)} alt={"Velocity"} height={"30"} style={{ paddingRight: '.3rem' }}/>
            <span>Velocity</span>
          </Link>
        </NavbarLogo>

        <NavbarExpand onClick={flipExpanded}>
          <IconContext.Provider value={{ size: "16px" }}>
            <FiMenu />
          </IconContext.Provider>
        </NavbarExpand>

        <NavbarItems>
          <NavbarItemContents location={location} />
          <div css={{ padding: '15px 10px' }}>
            <ThemeSwitcher themeName={themeName} setThemeName={setThemeName}/>
          </div>
        </NavbarItems>
      </NavbarList>

      <MobileNavbarItems mobileShown={expanded}>
        <NavbarItemContents location={location} />
      </MobileNavbarItems>
    </NavbarContainer>
  )
}