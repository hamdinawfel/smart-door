import React from 'react'
//M-UI
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

//Tuto
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import IconButton from '@material-ui/core/IconButton';

//icons
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
//logo
import logo from '../../../utils/navbar/assets/logo.jpg'

const useStyles = makeStyles(theme => ({
    root:{
      width:'100%',
      height:80,
      background:'#EBEAF0',
      display:'none',
      justifyContent:'center',
      alignItems:'center',
      padding:10,
      [theme.breakpoints.down('sm')]: {
        display:'flex'
      },
    },
    backBtn:{
        background: '#fff',
        opacity:'0.7',
        padding:'5px 10px',
        transition:'0.5s',
        '&:hover': {
            color: '#31A8FF',
          },
    },
    logo:{
      width:60,
      
    },
    video:{
        width:500,
        height:300,
        margin:'10px 0 20px 0',
        [theme.breakpoints.down('xs')]: {
            width:'340px',
            height:'200px',
            marginTop:100
          },
      },
      tuto:{
        background: '#fff',
        opacity:'0.7',
        transition:'0.5s',
        '&:hover': {
            color: '#31A8FF',
          },
      },
      chip:{
        background: '#fff',
        opacity:'0.7',
        margin:'0 5px'
      }
  }));
  export default function MobileHeader() {
    const classes = useStyles();
//Tuto
const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    return (
      <Grid container className={classes.root}>
        <Grid item xs={4} style={{display:'flex', justifyContent:'space-arround', alignItems:'center'}}>
            <Link href='/catalog/showroom' style={{textDecoration:'none'}}>
               <ArrowBackIosIcon  fontSize="small" style={{ color:'#000'}}/>
            </Link>
            <img src={logo} alt="Dinari" className={classes.logo} />
        </Grid>
        <Grid item xs={8}  style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
            <PlayCircleOutlineIcon  onClick={handleClickOpen} style={{ color:'rgba(0,0,0,0.6)',}} />
            <Chip
                className={classes.chip}
                variant="outlined"
                avatar={<WhatsAppIcon />}
                size="medium"
                label="+216 55 000 112"
                />
            <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
            >
            <div style={{ display:'flex', boxShadow: '0px 0px 8px rgba(91, 137, 158, 0.3)', alignItems:'center', marginBottom:20}}>
            <IconButton onClick={handleClose} style={{ marginLeft:20}}>
                <ArrowBackIcon />
            </IconButton>
            <DialogTitle style={{ textAlign:'center'}} id="responsive-dialog-title">{"Comment ça marche"}</DialogTitle>
            </div>
            <DialogContent style={{ display:'flex', justifyContent:'center'}}>
                <iframe
                    id="video"
                    className={classes.video}
                    // width="500px"
                    // height="300px"
                    src={"https://www.youtube.com/embed/5Tocys3cK08"}
                    frameBorder="0"
                    allow="accelerometer, autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    />
            </DialogContent>
            </Dialog>
        </Grid>
      </Grid>
    )
}
