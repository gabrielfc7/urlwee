import React from 'react';
import {Logo, HeaderContainer} from './styles' 
import LogoIcone from '../../assets/icone.png'

function Header(props){
    return(
        <>
            <HeaderContainer>
                <Logo src={LogoIcone} alt='URLwee - encurtador de url'/>
                <h1>URLwee</h1>
                <p>{props.children}</p>
            </HeaderContainer>

            
        </>
    )
}

export default Header;