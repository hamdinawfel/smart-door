import React from 'react'
import empty from '../assets/empty.svg'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
const useStyles = makeStyles((theme) => ({
    myButton:{
     textTransform:'capitalize',
     width: 250,
     padding: '10px 30px',
     margin: '0 auto',
     cursor: 'pointer',
     display: 'block',
     background:theme.palette.primary.main,
     color: '#fff',
     border:0,
     outline: 'none',
     borderRadius:'0px', 
     position: 'relative',
     zIndex: 5,
     boxSizing: 'border-box',   
     fontWeight: 300,
     fontSize:'18px', 
     border:`2px solid ${theme.palette.primary.main}`,
     transition: '0.5s',
     '&:hover': {
         background: '#fff',
         color: theme.palette.primary.main,
         border:`2px solid ${theme.palette.primary.main}`
       },
       [theme.breakpoints.down('sm')]: {
         padding:'10px',
       },
   },
   }));
export default function IsEmpty() {
  const classes = useStyles();
    return (
        <div style={{ margin:'20px 0 80px 0' }}>
            <img src={empty} alt="empty" style={{width:200, display:'block', margin:'0 auto' }} />
            <h1 style={{ textAlign:'center', fontSize:18, fontWeight:600}}>Aucune commande pour le moment!</h1>
            <Link href={'/catalog/showroom'} style={{textDecoration:'none'}}>
                <div style={{ margin:'20px 0 150px 0', display:'flex', justifyContent:'center', zIndex:0, position:'relative'}}>
                    <Button className={classes.myButton}>
                        SHOW ROOM
                    </Button>
                </div>
            </Link>
        </div>
    )
}
