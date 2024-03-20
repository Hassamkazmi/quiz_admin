import React from 'react'
import { Skeleton } from 'antd';

const NoData = () => {
  return (
      <div className="nodata_div">
        
        <Skeleton
    avatar
    paragraph={{
      rows: 4,
    }}
  />
        </div>
  )
}

export default NoData
