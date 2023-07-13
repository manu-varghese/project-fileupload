import React, { useEffect, useState } from 'react';
import { Button, Table, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { db } from '../Config/firebase';
import { collection, getDocs } from 'firebase/firestore';

const UploadButtonAndTable = () => {
  const [fileList, setFileList] = useState([]);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const collectionRef = collection(db, 'Guest');
        const querySnapshot = await getDocs(collectionRef);
        const data = querySnapshot.docs.map((doc) => doc.data());
        setTableData(data);
      } catch (error) {
        console.error('Error fetching Firestore data:', error);
      }
    };

    fetchData();
  }, []);

  const handleFileUpload = (event) => {
    const { fileList } = event;
    setFileList(fileList);
  };

  const columns = tableData.length > 0 ? Object.keys(tableData[0]).map((key) => ({
    title: key,
    dataIndex: key,
    key,
  })) : [];

  return (
    <div>
      <Upload fileList={fileList} onChange={handleFileUpload} multiple>
        <Button icon={<UploadOutlined />} type="primary">
          Select Files
        </Button>
      </Upload>

      <Table dataSource={tableData} columns={columns} />
    </div>
  );
};

export default UploadButtonAndTable;
