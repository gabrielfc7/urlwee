import React from 'react';
import Header from '../../components/header';
import { Container } from 'react-bootstrap';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ShorteneService from '../../services/shortenerService'
import { StatsContainer } from './styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class Redirect extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading: false,
            url: '',
            errorMSG: '',
        }
    }

    async componentDidMount(){
        const { code } = this.props.match.params;

        try {
            const service = new ShorteneService();
            const { url } = await service.getLink(code);

            window.location = url;

        } catch (error) {
            this.setState({ isLoading: false, errorMSG: "Ops, a URL solicitada nao existe"});
        }
    }

    render(){
        const {errorMSG} = this.state;
        return (
            <Container>
                {errorMSG ? (
                    <>
                        <Header>Seu novo encurtador de URL</Header>
                        <StatsContainer className="text-center">
                        <FontAwesomeIcon size="3x" color="#f8d7da" icon="exclamation-triangle" />
                        <p className="m-3"> {errorMSG} </p>
                        <a className="btn btn-primary" href="/"> Encurtar nova URL</a>
                        </StatsContainer>  
                    </>
                ) : (
                    <p classNmae="text-center"> Redirencionando ...</p>
      
                )} 
            </Container>
        )
    }

}

export default Redirect;