import React, { useState } from 'react';
import { Button, Table, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const UploadButtonAndTable = () => {
  const [fileList, setFileList] = useState([]);

  const handleFileUpload = (event) => {
    const { fileList } = event;
    setFileList(fileList);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
    },
  ];

  return (
    <div>
      <Upload
        fileList={fileList}
        onChange={handleFileUpload}
        multiple
      >
        <Button icon={<UploadOutlined />} type="primary">
          Select Files
        </Button>
      </Upload>

      <Table dataSource={fileList} columns={columns} />
    </div>
  );
};

export default UploadButtonAndTable;
