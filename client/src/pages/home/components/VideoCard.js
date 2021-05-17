// import React from "react";
// import PropTypes from "prop-types";
// import { withStyles } from "@material-ui/core/styles";
// import {
//   Card,
//   CardContent,
//   CardMedia,
//   IconButton,
//   Typography
// } from "@material-ui/core";

// const styles = theme => ({
//   card: {
//     display: "flex"
//   },
//   details: {
//     display: "flex",
//     flexDirection: "column"
//   },
//   content: {
//     flex: "1 0 auto"
//   },
//   cover: {
//     width: 151
//   },
// });

// function VideoCard(props) {
//   const { classes, theme } = props;

//   return (
//     // <Card className={classes.card}>
//       <div className={classes.details}>
//         <CardContent className={classes.content}>
//           {/* <Typography component="h5" variant="h5">
//             {props.title}
//           </Typography> */}
//           <Typography variant="subtitle1" color="textSecondary">
//             {props.subTitle}
//           </Typography>
//           <iframe
//             id="video"
//             width="100%"
//             heigh="auto"
//             src={"https://www.youtube.com/embed/" + props.videoId}
//             frameBorder="0"
//             allow="accelerometer, autoplay; encrypted-media; gyroscope; picture-in-picture"
//             allowFullScreen
//           />
//         </CardContent>
       
//       </div>
//     // </Card>
//   );
// }

// export default withStyles(styles, { withTheme: true })(VideoCard);
