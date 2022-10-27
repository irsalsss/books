import React from 'react';
import { Empty } from 'antd';

type EmptyDataProps = {
  desc?: string;
}

const EmptyData = ({ desc }: EmptyDataProps) => (
  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={desc} />
);

EmptyData.defaultProps = {
  desc: 'No Data'
};

export default EmptyData;
