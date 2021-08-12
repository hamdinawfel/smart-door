import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

export default function Loading() {
  return (
    <div style={{ display:'flex', justifyContent:'center', alignItems:'center',}}>
      <Skeleton variant="circle" width={10} height={10} style={{ margin : '10px 5px 10px 0', background:'#fff'}}/>
      <Skeleton variant="circle" width={10} height={10} style={{ margin : '10px 5px 10px 5px', background:'#fff'}}/>
      <Skeleton variant="circle" width={10} height={10} style={{ margin : '10px  0 10px 5px', background:'#fff'}}/>
    </div>
  );
}
