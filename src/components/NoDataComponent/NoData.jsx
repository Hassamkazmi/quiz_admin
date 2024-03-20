import React from 'react'
import { Skeleton } from 'antd';

const NoData = () => {
  return (
      <div className="nodata_div">
          <h2>No Data Found</h2>
          <p>Add a new record by simpley clicking the button on top right side.</p>
          <Skeleton />
        </div>
  )
}

export default NoData
