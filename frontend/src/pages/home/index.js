import React from 'react';
import {Container, InputGroup, FormControl, Button, Alert, Spinner} from 'react-bootstrap';
import Header from '../../components/header';
import {ContentContainer, Form} from './styles'
import ShortenerService from '../../services/shortenerService'

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            url: '',
            code: '',
            errorMSG: ''
        }

    }

    handleSubmit = async(event)=>{
        event.preventDefault();
        const { url } = this.state;

        this.setState({isLoading: true, errorMSG: ''});

        if(!url){
            this.setState({isLoading: false, errorMSG: "Informe uma URL para encurtar"})
        }
        else{
            try {
                const service = new ShortenerService();
                const result = await service.generate({ url });
                this.setState({isLoading: false, code: result.code});

            } catch (error) {
                this.setState({isLoading: false, errorMSG: "Ops - ocorreu um erro ao encurtar a URL"})
            }
        }

    }

    copyToClipboard = () =>{
        const element = this.inputURL;
        element.select();
        document.execCommand('copy');
    }

    render(){
        const {isLoading, errorMSG, code} = this.state;

        return (
            <Container>
                <Header> Simples como uma torta! </Header>
                <ContentContainer>
                    <Form onSubmit= {this.handleSubmit}>
                        <InputGroup>

                            <FormControl
                                placeholder="Digite a url para encurtar"
                                defaultValue=""
                                onChange={e =>this.setState({ url: e.target.value })}
                            />

                            <InputGroup.Append>
                                <Button variant="primary" type="submit" >Encurtar</Button>
                            </InputGroup.Append>
                        </InputGroup>

                        {isLoading ? (
                            <Spinner animation="border"/>
                        ) : (
                            code && (
                                <>
                                    <InputGroup>
                                        <FormControl
                                            autoFocus={true}
                                            defaultValue={`https://URLwee.app/${code}`}
                                            ref={(input) => this.inputURL = input}
                                        />

                                        <InputGroup.Append>
                                            <Button variant="ourline-secondary" onClick={() => this.copyToClipboard()} >Copiar</Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                    <p>Para acompanhar as estatísticas, acesse: https://URLwee.app/{code}</p>

                                </>
                            )
                        )}

                        {errorMSG && <Alert variant="danger">{errorMSG}</Alert>}

                    </Form>
                </ContentContainer>            
            </Container>
        )
    }
}

export default Home;