import React from 'react';
import Header from '../../components/header';
import {Container} from 'react-bootstrap';
import ShortenerService from '../../services/shortenerService';

import { parseISO, formatRelative} from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { StatsContainer, StatsRow, StatsBoxTitle, StatsBox} from './styles'

class Stats extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading: false,
            shortenedURL: {},
            errorMSG: '',

        }
    }


    async componentDidMount() {
        const { code } = this.props.match.params.code;

        try {
            const service = new ShortenerService();
            const shortenedURL = await service.getStats(code);

            const parsedDate = parseISO(shortenedURL.updatedAt);
            const currentDate = new Date();

            const relativeDate = formatRelative(parsedDate, currentDate, {
                locale:ptBR,
                
            });

            shortenedURL.relativeDate = relativeDate;

            this.setState({isLoading: false, shortenedURL});
        } catch (error) {
            this.setState({isLoading: false, errorMSG: 'Ops, a URL solicitada não existe!'});
        }
    }



    render(){
        const {errorMSG, shortenedURL } = this.state;

        return (
            <Container>
                <Header> Estatísticas</Header>
                {errorMSG ? (
                    <StatsContainer className="text-center">
                        <FontAwesomeIcon size="3x" color="#f8d7da" icon="exclamation-triangle" />
                        <p className="m-3"> {errorMSG} </p>
                        <a className="btn btn-primary" href="/"> Encurtar nova URL</a>
                    </StatsContainer>
                ) : (
                    <StatsContainer className="text-center">
                        <p><b>https://URLwee.com/{shortenedURL.code}</b></p>
                        <p>Redireciona para: <br/> {shortenedURL.url}</p>
                        <StatsRow>
                            <StatsBox>
                                <b>{shortenedURL.hits}</b>
                                <StatsBoxTitle>Visitas</StatsBoxTitle>
                            </StatsBox>
                            <StatsBox>
                                <b>{shortenedURL.relativeDate}</b>
                                <StatsBoxTitle>Última Visitas</StatsBoxTitle>
                            </StatsBox>
                        </StatsRow>
                        <a className="btn btn-primary" href="./">Encurtar nova URL</a>
                    </StatsContainer>
                )}
            </Container>
        )
    }

}

export default Stats;