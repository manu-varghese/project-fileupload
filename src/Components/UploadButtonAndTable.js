import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Input, Table, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { db } from '../Config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import * as XLSX from "xlsx";
import Papa from "papaparse";

const UploadButtonAndTable = () => {
  const [fileList, setFileList] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setData] = useState([]);

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

  const handleFileUpload = (info) => {
    const { fileList } = info;
  
    if (fileList.length === 0) {
      // No files selected, handle accordingly
      return;
    }
  
    const file = fileList[fileList.length - 1].originFileObj;
    const fileExtension = file.name.split(".").pop().toLowerCase();
  
    if (fileExtension === "csv") {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          setData(results.data);
        },
      });
    } else if (fileExtension === "xlsx") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(sheet);
        setData(parsedData);
      };
      reader.readAsBinaryString(file);
    } else {
      // Handle unsupported file type
      console.log("Unsupported file type");
    }
  
    setFileList([...fileList]); // Update the fileList state
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setFileList([]);
    setIsModalVisible(false);
  };

  const handleFormSubmit = (values) => {
    console.log('Form values:', values);
    // Perform necessary actions with the form values
    setIsModalVisible(false);
  };

  const columns =
    tableData.length > 0
      ? Object.keys(tableData[0]).map((key) => ({
          title: key,
          dataIndex: key,
          key,
        }))
      : [];
console.log(data);
  return (
    <div>
      {/* <Upload fileList={fileList} onChange={handleFileUpload} multiple>
        <Button icon={<UploadOutlined />} type="primary">
          Select Files
        </Button>
      </Upload> */}
      <Upload
  accept=".xlsx, .xls, .csv"
  onChange={handleFileUpload}
  multiple
  fileList={fileList}
>
  <Button icon={<UploadOutlined />} type="primary">
    Select Files
  </Button>
</Upload>

      <Table dataSource={tableData} columns={columns} />

      <Modal
        title="Upload Form"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form onFinish={handleFormSubmit}>
          <Form.Item
            label="Field 1"
            name="field1"
            rules={[{ required: true, message: 'Field 1 is required' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Field 2"
            name="field2"
            rules={[{ required: true, message: 'Field 2 is required' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Field 3"
            name="field3"
            rules={[{ required: true, message: 'Field 3 is required' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UploadButtonAndTable;
