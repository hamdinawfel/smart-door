// import React from 'react';
// import Particles from "react-tsparticles";
// //Mui
// import { makeStyles } from '@material-ui/core/styles';
// const useStyles = makeStyles((theme) => ({
//   root: {
//     [theme.breakpoints.up('md')]: {
//       paddingBottom: '200px',
//       backgroundColor:'#000',
//        background: 'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(6,1,1,1) 100%)'
//        },
//   }
// }));
// export default function Login () {
//   const classes = useStyles();

//     return (
//       <div className={ classes.root}>
//         <Particles
//         id="tsparticles"
//         options={{
//           background: {
//             image:
//       "url('https://hdwallsource.com/img/2014/4/digital-wallpapers-24971-25651-hd-wallpapers.jpg')",
//     size: "100% 100%",
//     repeat: "no-repeat"
//           },
//           fpsLimit: 60,
//           interactivity: {
//             detectsOn: "canvas",
//             events: {
//               onClick: {
//                 enable: true,
//                 mode: "push",
//               },
//               onHover: {
//                 enable: true,
//                 mode: "repulse",
//               },
//               resize: true,
//             },
//             modes: {
//               bubble: {
//                 distance: 400,
//                 duration: 2,
//                 opacity: 0.8,
//                 size: 40,
//               },
//               push: {
//                 quantity: 1,
//               },
//               repulse: {
//                 distance: 200,
//                 duration: 0.4,
//               },
//             },
//           },
//           particles: {
//             color: {
//               value: "#ffffff",
//             },
//             links: {
//               color: "#ffffff",
//               distance: 150,
//               enable: true,
//               opacity: 0.5,
//               width: 1,
//             },
//             collisions: {
//               enable: true,
//             },
//             move: {
//               direction: "none",
//               enable: true,
//               outMode: "bounce",
//               random: false,
//               speed: 1,
//               straight: false,
//             },
//             number: {
//               density: {
//                 enable: true,
//                 value_area: 800,
//               },
//               value: 80,
//             },
//             opacity: {
//               value: 0.5,
//             },
//             shape: {
//               type: "circle",
//             },
//             size: {
//               random: true,
//               value: 5,
//             },
//           },
//           detectRetina: true,
//         }}
//       />
//       </div>
//     );
//   }