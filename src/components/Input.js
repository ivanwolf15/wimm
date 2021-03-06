import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import colors from '../config/colors';

export const StyledInput = styled.input`
  height: 3rem;
  font-size: 16px;
  border-radius: 3px;
  outline: none;
  border-style: none;
  background-color: ${colors.white}
  border: 2px solid ${colors.violette};
  color: ${colors.violetteDark};
  padding: 0 1rem;
  transition: border-color 0.5s ease;
  flex: 1;
  &:focus {
    border-color: ${colors.violetteDark};
  };
  &::placeholder {
    color: ${colors.violette}
    opacity: 0.8;
  }${({ value }) => value && css`
    border-color: ${colors.violetteDark};
  `}
  ${({ error }) => error && css`
    color: ${colors.danger};
    border-color: ${colors.danger};
    &:focus {
      border-color: ${colors.danger};
    };
  `}
`;

export const ErrorText = styled.div`
  height: 15px;
  color: ${colors.danger};
  font-size: small;
  margin: 7px 0;
`;

export const TextInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const TextInput = ({ error, ...props }) => (
  <TextInputWrapper>
    <StyledInput error={error} {...props} />
    <ErrorText>
      {error}
    </ErrorText>
  </TextInputWrapper>
);

TextInput.defaultProps = {
  error: '',
};

TextInput.propTypes = {
  error: PropTypes.string,
};

export const CleanButton = styled.button`
  outline: none;
  border: none;
  background-color: inherit;
  color: inherit;
  padding: 0;
  margin: 0;
`;

export const PasswordInputWrapper = styled.div`
  display: flex;
  position: relative;
`;

export const ShowPasswordButton = CleanButton.extend`
  right: 1rem;
  top: 17px;
  z-index: 1;
  position: absolute;
  font-size: 12px;
  ${({ error }) => error && css`
    color: ${colors.danger};
  `}
`;

export const PasswordInput = ({
  error, showPassword, onPasswordClick, value, ...props
}) => (
  <PasswordInputWrapper>
    <TextInput
      {...props}
      value={value}
      error={error}
      placeholder="Contraseña"
      type={showPassword ? 'text' : 'password'}
    />
    <ShowPasswordButton
      type="button"
      onClick={onPasswordClick}
      hidden={!value}
      error={error}
    >
      {showPassword ? 'Ocultar' : 'Mostrar'}
    </ShowPasswordButton>
  </PasswordInputWrapper>
);

PasswordInput.propTypes = {
  value: PropTypes.string.isRequired,
  showPassword: PropTypes.bool.isRequired,
  onPasswordClick: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
};

export const Button = styled.button`
  outline: none;
  height: 3rem;
  font-size: 16px;
  color: ${colors.white};
  border-radius: 3px;
  background-color: ${colors.violetteDark}
  border: 2px solid ${colors.violetteDark};
  transition: background-color 0.5s ease;
  ${({ disabled }) => disabled && css`
    border: 2px solid ${colors.violette};
    background-color: ${colors.violette}
  `}
`;
