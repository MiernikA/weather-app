import { styled } from '@mui/material/styles';
import { Card } from '@mui/material';

const StyledCard = styled(Card, {
    shouldForwardProp: (prop) => prop !== 'mode',
})(({ mode }) => ({
    height: '42vh',
    width: '12vw',
    margin: '1.02vw',
    justifyContent: 'space-between',
    background: mode ? 'radial-gradient(circle at 18.7% 37.8%, rgb(250, 250, 250) 0%, rgb(225, 234, 238) 90%)' : 'radial-gradient(circle at 18.7% 37.8%, rgb(40, 40, 40) 0%, rgb(25, 30, 35) 90%)',
    boxShadow: mode ? '0 2px 8px rgba(0, 0, 0, 0.4)' : '0 2px 8px rgba(248, 248, 248, 0.4)',
    userSelect: 'none',
    color: mode ? 'rgb(0,0,0)' : 'rgb(233,233,233)',
    '@media (max-width: 1300px)': {
        width: '30vw',
        height: 'auto',
        justifyContent: 'center',
    },
    '@media (max-width: 600px)': {
        width: '90vw',
        height: 'auto',
        justifyContent: 'center',
    }
}));

const Header = styled('div')(() => ({
    display: 'flex',
    justifyContent: 'space-between',

}));

const TemperatureHolder = styled('p')(() => ({
    display: 'flex',
    fontSize: '22px',
}))


export { StyledCard, Header, TemperatureHolder }
