import React, { useEffect, useState } from 'react';
import { Col, Row, Form, Button, DatePicker, message, Table, Modal } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import axios from 'axios';

const RakeshVarma: React.FC = () => {
  const [tableData, setTableData] = useState<
    { key: number; id: number; startDate: string; endDate: string }[]
  >([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<any>(null);

  // Fetch data from the database
  const fetchDates = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/get-dates');
      if (response.status === 200) {
        const formattedData = response.data.map((item: any, index: number) => ({
          key: index + 1,
          id: item.id,
          startDate: item.startDate,
          endDate: item.endDate,
        }));
        setTableData(formattedData);
      } else {
        message.error('Failed to fetch dates.');
      }
    } catch (error) {
      console.error('Error fetching dates:', error);
      message.error('An error occurred while fetching dates.');
    }
  };

  useEffect(() => {
    fetchDates();
  }, []);

  const onFinish = async (values: { startDate: Dayjs; endDate: Dayjs }) => {
    try {
      const startDate = values.startDate.format('YYYY-MM-DD HH:mm:ss');
      const endDate = values.endDate.format('YYYY-MM-DD HH:mm:ss');

      const response = await axios.post('http://localhost:3001/api/save-dates', {
        startDate,
        endDate,
      });

      if (response.status === 200) {
        message.success('Dates saved successfully!');
        fetchDates(); // Refresh the table data
      } else {
        message.error('Failed to save dates.');
      }
    } catch (error) {
      console.error('Error saving dates:', error);
      message.error('An error occurred while saving dates.');
    }
  };

  const handleEdit = (record: any) => {
    setEditingRecord(record);
    console.log(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await axios.delete(`http://localhost:3001/api/delete-date/${id}`);
      if (response.status === 200) {
        message.success('Date entry deleted successfully!');
        fetchDates(); // Refresh the table data
      } else {
        message.error('Failed to delete date entry.');
      }
    } catch (error) {
      console.error('Error deleting date entry:', error);
      message.error('An error occurred while deleting date entry.');
    }
  };

  const handleModalOk = async (values: { startDate: Dayjs; endDate: Dayjs }) => {
    try {
      const startDate = values.startDate.format('YYYY-MM-DD HH:mm:ss');
      const endDate = values.endDate.format('YYYY-MM-DD HH:mm:ss');

      const response = await axios.put(
        `http://localhost:3001/api/update-date/${editingRecord.id}`,
        { startDate, endDate }
      );

      if (response.status === 200) {
        message.success('Date entry updated successfully!');
        fetchDates();
        setIsModalVisible(false);
        setEditingRecord(null);
      } else {
        message.error('Failed to update date entry.');
      }
    } catch (error) {
      console.error('Error updating date entry:', error);
      message.error('An error occurred while updating date entry.');
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Start Date & Time',
      dataIndex: 'startDate',
      key: 'startDate',
    },
    {
      title: 'End Date & Time',
      dataIndex: 'endDate',
      key: 'endDate',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: any) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Row justify="center" style={{ marginTop: '50px' }}>
        <Col span={12}>
          <Form
            name="date-form"
            layout="vertical"
            onFinish={onFinish}
            style={{
              padding: '24px',
              backgroundColor: '#fff',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
              Select Date and Time Range
            </h2>

            <Form.Item
              name="startDate"
              label="Start Date & Time"
              rules={[{ required: true, message: 'Please select a start date and time!' }]}
            >
              <DatePicker
                style={{ width: '100%' }}
                format="YYYY-MM-DD HH:mm:ss"
                showTime={{ format: 'HH:mm:ss' }}
              />
            </Form.Item>

            <Form.Item
              name="endDate"
              label="End Date & Time"
              rules={[{ required: true, message: 'Please select an end date and time!' }]}
            >
              <DatePicker
                style={{ width: '100%' }}
                format="YYYY-MM-DD HH:mm:ss"
                showTime={{ format: 'HH:mm:ss' }}
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>

      <Row justify="center" style={{ marginTop: '20px' }}>
        <Col span={16}>
          <Table
            columns={columns}
            dataSource={tableData}
            bordered
            title={() => 'Entered Date and Time Values'}
            pagination={{ pageSize: 5 }}
          />
        </Col>
      </Row>

      <Modal
        title="Edit Date Entry"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={handleModalOk}
          initialValues={{
            startDate: dayjs(editingRecord?.startDate),
            endDate: dayjs(editingRecord?.endDate),
          }}
        >
          <Form.Item
            name="startDate"
            label="Start Date & Time"
            rules={[{ required: true, message: 'Please select a start date and time!' }]}
          >
            <DatePicker
              style={{ width: '100%' }}
              format="YYYY-MM-DD HH:mm:ss"
              showTime={{ format: 'HH:mm:ss' }}
            />
          </Form.Item>

          <Form.Item
            name="endDate"
            label="End Date & Time"
            rules={[{ required: true, message: 'Please select an end date and time!' }]}
          >
            <DatePicker
              style={{ width: '100%' }}
              format="YYYY-MM-DD HH:mm:ss"
              showTime={{ format: 'HH:mm:ss' }}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default RakeshVarma;
