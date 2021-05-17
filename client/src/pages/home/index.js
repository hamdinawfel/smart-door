import React from 'react';
//M-UI
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';
//components
import Slider from './components/Slider'
import CommonQuestions from './components/CommonQuestions'
import Testimonial from './components/Testimonial'
import BestSelling from '../catalog/components/BestSelling'
import Card from '../catalog/components/Card'
//utils
import Navbar from '../../utils/navbar/index';
import NewsLetter from '../../feature/subscribe/index';
import Title from '../../utils/Title'

//features
import Chat from '../../feature/chat/index'
const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  hero:{
  marginTop:-30
  }
}));

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

export default function Index(props) {
  const classes = useStyles();
  return (
    <div style={{ margin: '0 auto' }}>
        <Navbar />
        <Toolbar id="back-to-top-anchor" />
        <div className={classes.hero}>
        <Slider />
        </div>
        <Title title="Nos Catalogue"/>
        {/* <BestSelling /> */}
        <Card />
        <Testimonial />
        <CommonQuestions />
        <NewsLetter />
        <Chat />
      <ScrollTop {...props}>
        <Fab color="primary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon style={{ color:'#fff'}}/>
        </Fab>
      </ScrollTop>
    </div>
  );
}