import React from 'react';
import { Collapse as CollapseAntd } from 'antd';

const { Panel: PanelAntd } = CollapseAntd;

const Collapse = ({
  onChange,
  activeKey,
  options,
}: ICollapseProps) => {
  return (
    <CollapseAntd activeKey={activeKey} onChange={onChange}>
      {(options || []).map((v: TCollapseProps) => (
        <PanelAntd header={v.title} key={v.title}>
          {v.content}
        </PanelAntd>
      ))}
    </CollapseAntd>
  )
}

type TCollapseProps = {
  title: string;
  content: string;
}

interface ICollapseProps {
  activeKey?: Array<string | number> | string | number;
  onChange?: (key: string | string[]) => void;
  options: TCollapseProps[];
}

Collapse.defaultProps = {
  onChange: () => {},
  activeKey: [],
}

export default Collapse;