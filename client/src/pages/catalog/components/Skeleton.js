import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

export default function Variants() {
  return (
    <div style={{ display:'flex', justifyContent:'center', alignItems:'center',}}>
      <Skeleton variant="circle" width={10} height={10} style={{ margin : '10px 5px 0 0'}}/>
      <Skeleton variant="circle" width={10} height={10} style={{ margin : '10px 5px 0 5px'}}/>
      <Skeleton variant="circle" width={10} height={10} style={{ margin : '10px  0 0 5px'}}/>
    </div>
  );
}
