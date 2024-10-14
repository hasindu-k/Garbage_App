import React, { useState, useEffect } from 'react';
import { Modal, Input, Table } from 'antd';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import axios from 'axios';
import WasteHeader from './WasteHeader';
import Button from '../components/Button';

const GarbageStationSummary = () => {
    const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
    const [isAnalysisModalVisible, setIsAnalysisModalVisible] = useState(false);
    const [collectedWastes, setCollectedWastes] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [reportData, setReportData] = useState([]);
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        // Fetch all collected waste data from the backend
        axios.get('http://localhost:8070/collectedwaste/getCollectedWaste') // Replace with your actual API endpoint
            .then((response) => {
                setCollectedWastes(response.data);
                setReportData(response.data);
                setFilteredData(response.data); // Initialize filtered data
            })
            .catch((error) => console.error('Error fetching collected wastes:', error));
    }, []);

    const handleSeeDetails = () => {
        setIsDetailsModalVisible(true);
    };

    const handleAnalysis = () => {
        setIsAnalysisModalVisible(true);
        // Prepare the data for the chart
        const analysisData = prepareMonthlyAnalysisData(collectedWastes);
        setChartData(analysisData);
    };

    const handleReportDownload = () => {
        const doc = new jsPDF();
        autoTable(doc, {
            head: [['Truck Number', 'Area', 'Paper Waste', 'Food Waste', 'Polythene Waste', 'Total Waste']], // Define the table columns
            body: reportData.map(({ truckNumber, area, paperWaste, foodWaste, polytheneWaste, totalWaste }) => [truckNumber, area, paperWaste, foodWaste, polytheneWaste, totalWaste]),
        });
        doc.save('CollectedWasteReport.pdf');
    };

    const handleSearch = (value) => {
        const filtered = collectedWastes.filter((waste) => waste.truckNumber.includes(value));
        setFilteredData(filtered);
    };

    const prepareMonthlyAnalysisData = (data) => {
        const analysis = {};
        data.forEach(({ area, totalWaste }) => {
            if (!analysis[area]) analysis[area] = 0;
            analysis[area] += totalWaste;
        });
        return Object.entries(analysis).map(([key, value]) => ({ name: key, value }));
    };

    return (
        <>
            <WasteHeader h1="Summary Portal" />
            <div className="flex justify-center w-full h-20 mt-20">
                <div className="flex space-x-4">
                    <button onClick={handleSeeDetails} className="bg-green-700 text-white rounded-lg px-8 py-3 hover:bg-green-900 transition duration-300 shadow-lg flex items-center justify-center">See Details</button>
                    <button onClick={handleAnalysis} className="bg-green-700 text-white rounded-lg px-8 py-3 hover:bg-green-900 transition duration-300 shadow-lg flex items-center justify-center">Monthly Analysis</button>
                    <button onClick={handleReportDownload} className="bg-green-700 text-white rounded-lg px-8 py-3 hover:bg-green-900 transition duration-300 shadow-lg flex items-center justify-center">See Reports</button>
                </div>
            </div>

            {/* Details Modal */}
            <Modal
                title="Truck Details"
                visible={isDetailsModalVisible}
                onCancel={() => setIsDetailsModalVisible(false)}
                footer={null}
            >
                <Input.Search
                    placeholder="Search by Truck Number"
                    onSearch={handleSearch}
                    enterButton="Search"
                />
                <Table
                    dataSource={filteredData}
                    columns={[
                        { title: 'Truck Number', dataIndex: 'truckNumber', key: 'truckNumber' },
                        { title: 'Area', dataIndex: 'area', key: 'area' },
                        { title: 'Paper Waste', dataIndex: 'paperWaste', key: 'paperWaste' },
                        { title: 'Food Waste', dataIndex: 'foodWaste', key: 'foodWaste' },
                        { title: 'Polythene Waste', dataIndex: 'polytheneWaste', key: 'polytheneWaste' },
                        { title: 'Total Waste', dataIndex: 'totalWaste', key: 'totalWaste' },
                    ]}
                    rowKey="_id" // Replace with your unique key
                />
            </Modal>

            {/* Monthly Analysis Modal */}
            <Modal
                title="Monthly Analysis"
                visible={isAnalysisModalVisible}
                onCancel={() => setIsAnalysisModalVisible(false)}
                footer={null}
            >
                {/* Pie Chart Example */}
                <PieChart width={400} height={400}>
                    <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        label
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28', '#FF8042'][index % 4]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </Modal>

            <div className="fixed bottom-0 w-full bg-white border-t py-4 flex justify-between items-center px-5">
                <Button Button1="Cancel" Button2="Record New" />
            </div>
        </>
    );
};

export default GarbageStationSummary;
