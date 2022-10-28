import { Result } from 'antd';

const NotFound = () => {
  return (
    <div className="flex flex-1 justify-center grow items-center h-screen">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
      />
    </div>
  );
};

export default NotFound;
