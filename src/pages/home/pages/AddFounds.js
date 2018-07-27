import React, { Component } from 'react';
import styled from 'styled-components';
import { Container } from '../../../components/Layout';
import { TextInput, Button } from '../../../components/Input';
import { Dropdown } from '../../../components/Dropdown';
import { WhiteCard } from '../../../components/Card';


const Form = styled.form`
  margin: 7px 0;
  display: flex;
  flex-direction: column;
`;

class AddFound extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mount: '',
      methodId: '',
      mountError: '',
      loading: false,
    };
    this.handleMountChange = this.handleMountChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMethodChange = this.handleMethodChange.bind(this);
  }

  handleMountChange(ev) {
    this.setState({ mount: ev.target.value });
  }

  handleMethodChange(methodId) {
    this.setState({ methodId });
  }

  handleSubmit(ev) {
    ev.prenvetDefault();
    console.log(this.state);
  }

  render() {
    const { mount, mountError, methodId, loading } = this.state;
    const { methods, methodsLoading } = this.props;
    return (
      <Container marginTop>
        <WhiteCard>
          Mantén tu billetera actualizada, escoge un medio de pago y cúanto dinero agregar.
        </WhiteCard>
        <Form onSubmit={this.handleSubmit}>
          <Dropdown
            options={methods}
            value={methodId}
            onSelect={this.handleMethodChange}
            placeholder="Método de pago"
            loading={methodsLoading}
          />
          <TextInput
            type="number"
            value={mount}
            onChange={this.handleMountChange}
            error={mountError}
            placeholder="Monto (CLP)"
          />
          <Button
            type="submit"
            disabled={!mount || loading}
          >
            OK
          </Button>
        </Form>
      </Container>
    );
  }
}

export default AddFound;