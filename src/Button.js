import React from 'react';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const MyButton = styled(Button)({
    color: '#044849',

});

export default function StyledComponents(props) {
    return <MyButton>Styled Components</MyButton>;
}