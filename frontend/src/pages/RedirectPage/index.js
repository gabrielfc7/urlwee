import React from 'react';
import Header from '../../components/Header';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ShortenerService from '../../services/shortenerService';
import { StatsContainer } from './styles';

class RedirectPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            url: '',
            errorMessage: '',
        }
    }

    async componentDidMount() {
        const { code } = this.props.match.params;

        // console.log(code);
        try {
            const service = new ShortenerService();
            const result = await service.getLink(code);

            console.log(result);

            window.location.href = result.url;
        } catch (error) {
            this.setState({ isLoading: false, errorMessage: 'Ops, a url solicitada não existe!' });
        }
    }

    render() {
        const { errorMessage } = this.state;

        return (
            <Container>
                {errorMessage ? (
                    <>
                        <Header>
                            Seu novo encurtador de URLs. :)
                        </Header>
                        <StatsContainer className="text-center">
                            <FontAwesomeIcon size="3x" color="#F8D7DA" icon="exclamation-triangle"/>
                            <p className="m-3">{errorMessage}</p>
                            <a className="btn btn-primary" href="/">Encurtar nova URL</a>
                        </StatsContainer>
                    </>
                ) : (
                    <p className="text-center">Redirecionando...</p>
                )}
            </Container>
        )
    }
}

export default RedirectPage;