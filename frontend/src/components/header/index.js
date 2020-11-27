import React from 'react';
import { Logo, HeaderContainer } from './styles';
import Icone from '../../assets/icone.png'

function Header(props) {
    return (
        <>
            <HeaderContainer>
                <Logo src={Icone} alt='Upie - Encurtador de URL'/>
                <h1>UPie</h1>
                <p>{props.children}</p>
            </HeaderContainer>
        </>
    )
}

export default Header;