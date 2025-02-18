"use client";

import { useState } from "react";
import { X, AlertTriangle, CheckCircle, Info, XCircle } from "react-feather";

interface LogStep {
  id?: number;
  timestamp: string;
  message: string;
  status: "success" | "failure" | "warning" | "info";
}

interface Log {
  id: number;
  finishedOn: string;
  payload: { userId: number; action: string };
  status: "success" | "failure" | "partial_success";
  steps: LogStep[];
  removedFlights: string[];
  addedFlights: string[];
  modifiedFlights: { key: string; changes: string[] }[];
  date: string;
  error?: string;
}

export default function LogsPage() {
  const [selectedLog, setSelectedLog] = useState<Log | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [dateFilter, setDateFilter] = useState<string>("");

  const calculateDuration = (start: string, end: string): string => {
    const startTime = new Date(start).getTime();
    const endTime = new Date(end).getTime();
    const diffInSeconds = Math.floor((endTime - startTime) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds}s`;
    const minutes = Math.floor(diffInSeconds / 60);
    const seconds = diffInSeconds % 60;

    if (minutes < 60)
      return seconds ? `${minutes}m ${seconds}s` : `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return remainingMinutes ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  };

  const logs: Log[] = [
    {
      id: 6,
      finishedOn: "2025-02-18 13:47:34",
      payload: { userId: 128, action: "compare" },
      status: "success",
      date: "2025-02-18 13:47:28",
      steps: [
        {
          id: 1,
          timestamp: "2025-02-18T13:47:20.678Z",
          message: "Server started on port 3000",
          status: "info",
        },
        {
          id: 2,
          timestamp: "2025-02-18T13:47:20.680Z",
          message: "Server running at http://localhost:3000",
          status: "info",
        },
        {
          id: 3,
          timestamp: "2025-02-18T13:47:28.214Z",
          message: "GET request received at /ssim/ftp",
          status: "success",
        },
        {
          id: 4,
          timestamp: "2025-02-18T13:47:28.216Z",
          message: "Fetching files from FTP...",
          status: "info",
        },
        {
          id: 5,
          timestamp: "2025-02-18T13:47:28.217Z",
          message: "Checking if Download folder already exists",
          status: "info",
        },
        {
          id: 6,
          timestamp: "2025-02-18T13:47:28.218Z",
          message: "Download folder already exists",
          status: "info",
        },
        {
          id: 7,
          timestamp: "2025-02-18T13:47:33.545Z",
          message: "Server resumed",
          status: "info",
        },
        {
          id: 8,
          timestamp: "2025-02-18T13:47:33.546Z",
          message: "Files fetched from FTP successfully.",
          status: "success",
        },
        {
          id: 9,
          timestamp: "2025-02-18T13:47:33.547Z",
          message: "Starting SSIM file parsing and comparison...",
          status: "info",
        },
        {
          id: 10,
          timestamp: "2025-02-18T13:47:33.547Z",
          message: "Calling the uploadAndCompareSSIMFile controller...",
          status: "info",
        },
        {
          id: 11,
          timestamp: "2025-02-18T13:47:33.548Z",
          message: "Started fetching the last two files from the FTP download folder",
          status: "info",
        },
        {
          id: 12,
          timestamp: "2025-02-18T13:47:33.549Z",
          message:
            "Retrieving and sorting SSIM files based on the modified date...",
          status: "info",
        },
        {
          id: 13,
          timestamp: "2025-02-18T13:47:33.552Z",
          message:
            "Processing the last two files: prod_wy_ssim_20250217_2033.txt and prod_wy_ssim_20250216_2033.txt",
            status: "info",
        },
        {
          id: 14,
          timestamp: "2025-02-18T13:47:33.553Z",
          message:
            "Parsing SSIM file 1: E:\\ifcs local\\TS Demo\\ftpFiles\\prod_wy_ssim_20250217_2033.txt",
            status: "info",
        },
        {
          id: 15,
          timestamp: "2025-02-18T13:47:33.554Z",
          message:
            "Starting to parse SSIM file: E:\\ifcs local\\TS Demo\\ftpFiles\\prod_wy_ssim_20250217_2033.txt",
            status: "info",
        },
        {
          id: 16,
          timestamp: "2025-02-18T13:47:33.555Z",
          message: "SSIM files processed and compared successfully.",
          status: "success"
        },
        {
          id: 17,
          timestamp: "2025-02-18T13:47:33.559Z",
          message: "Server has resumed and is ready to handle requests.",
          status: "success"
        },
        {
          id: 18,
          timestamp: "2025-02-18T13:47:33.560Z",
          message: "Server resume process completed.",
          status: "success",
        },
        {
          id: 19,
          timestamp: "2025-02-18T13:47:33.920Z",
          message: "Parsing completed. Total flight records found: 12631",
          status: "success",
        },
        {
          id: 20,
          timestamp: "2025-02-18T13:47:33.920Z",
          message:
            "Parsing SSIM file 2: E:\\ifcs local\\TS Demo\\ftpFiles\\prod_wy_ssim_20250216_2033.txt",
            status: "info",
        },
        {
          id: 21,
          timestamp: "2025-02-18T13:47:33.920Z",
          message:
            "Starting to parse SSIM file: E:\\ifcs local\\TS Demo\\ftpFiles\\prod_wy_ssim_20250216_2033.txt",
            status: "info",
        },
        {
          id: 22,
          timestamp: "2025-02-18T13:47:34.178Z",
          message: "Parsing completed. Total flight records found: 12755",
          status: "success",
        },
        {
          id: 23,
          timestamp: "2025-02-18T13:47:34.179Z",
          message: "Files parsed to JSON successfully",
          status: "success",
        },
        {
          id: 24,
          timestamp: "2025-02-18T13:47:34.179Z",
          message:
            "Saving parsed SSIM JSON file 1 to: E:\\ifcs local\\TS Demo\\parsed-data\\ssimFile1.json",
            status: "info",
        },
        {
          id: 25,
          timestamp: "2025-02-18T13:47:34.199Z",
          message:
            "Saving parsed SSIM JSON file 2 to: E:\\ifcs local\\TS Demo\\parsed-data\\ssimFile2.json",
            status: "info",
        },
        {
          id: 26,
          timestamp: "2025-02-18T13:47:34.227Z",
          message: "Parsed files saved locally",
          status: "success",
        },
        {
          id: 27,
          timestamp: "2025-02-18T13:47:34.228Z",
          message: "Starting SSIM file comparison...",
          status: "info",
        },
        {
          id: 28,
          timestamp: "2025-02-18T13:47:34.229Z",
          message:
            "Starting to parse SSIM file: E:\\ifcs local\\TS Demo\\ftpFiles\\prod_wy_ssim_20250217_2033.txt",
            status: "info",
        },
        {
          id: 29,
          timestamp: "2025-02-18T13:47:34.463Z",
          message: "Parsing completed. Total flight records found: 12631",
          status: "success",
        },
        {
          id: 30,
          timestamp: "2025-02-18T13:47:34.464Z",
          message:
            "Starting to parse SSIM file: E:\\ifcs local\\TS Demo\\ftpFiles\\prod_wy_ssim_20250216_2033.txt",
            status: "info",
        },
        {
          id: 31,
          timestamp: "2025-02-18T13:47:34.693Z",
          message: "Parsing completed. Total flight records found: 12755",
          status: "info",
        },
        {
          id: 32,
          timestamp: "2025-02-18T13:47:34.698Z",
          message: "Comparison completed successfully",
          status: "success",
        },
        {
          id: 33,
          timestamp: "2025-02-18T13:47:34.699Z",
          message:
            "Saving comparison result to: E:\\ifcs local\\TS Demo\\parsed-data\\comparisonResult.json",
            status: "info",
        },
        {
          id: 34,
          timestamp: "2025-02-18T13:47:34.700Z",
          message: "Comparison result saved locally",
          status: "success",
        },
        {
          id: 35,
          timestamp: "2025-02-18T13:47:34.700Z",
          message: "SSIM files successfully uploaded, parsed, and compared.",
          status: "success",
        },
        {
          id: 36,
          timestamp: "2025-02-18T13:47:34.701Z",
          message: "Server is ready to handle requests.",
          status: "info",
        },
      ],
      removedFlights: [],
      addedFlights: [],
      modifiedFlights: [],
    },
    {
      id: 1,
      finishedOn: "2025-02-18 08:05:10",
      payload: { userId: 123, action: "compare" },
      status: "success",
      date: "2025-02-18 07:53:29",
      steps: [
        {
          timestamp: "07:53:28",
          message: "Upload process started",
          status: "info",
        },
        {
          timestamp: "07:53:28",
          message: "Both SSIM files received",
          status: "info",
        },
        { timestamp: "07:53:28", message: "Processing files", status: "info" },
        {
          timestamp: "07:53:28",
          message: "Files parsed successfully",
          status: "success",
        },
        {
          timestamp: "07:53:28",
          message: "Parsed files saved successfully",
          status: "success",
        },
        {
          timestamp: "07:53:29",
          message: "Comparison completed successfully",
          status: "success",
        },
      ],
      removedFlights: ["WY 1900", "WY 5078", "WY 5079"],
      addedFlights: ["WY 6001"],
      modifiedFlights: [
        { key: "WY 0201", changes: ["itineraryVariationID: '23' → '25'"] },
        {
          key: "WY 0231",
          changes: [
            "departureTime: '10:00' → '10:30'",
            "aircraftType: 'A320' → 'B737'",
          ],
        },
      ],
    },
    {
      id: 2,
      finishedOn: "2025-02-17 08:30:25",
      payload: { userId: 124, action: "compare" },
      status: "failure",
      date: "2025-02-17 08:10:15",
      steps: [
        {
          timestamp: "08:10:12",
          message: "Upload process started",
          status: "info",
        },
        {
          timestamp: "08:10:12",
          message: "Both SSIM files received",
          status: "info",
        },
        { timestamp: "08:10:13", message: "Processing files", status: "info" },
        {
          timestamp: "08:10:14",
          message: "File parsing failed due to missing headers",
          status: "failure",
        },
      ],
      error: "File parsing error: Missing required headers in SSIM file.",
      removedFlights: [],
      addedFlights: [],
      modifiedFlights: [],
    },
    {
      id: 3,
      finishedOn: "2025-02-16 09:35:24",
      payload: { userId: 125, action: "compare" },
      status: "partial_success",
      date: "2025-02-16 09:30:45",
      steps: [
        {
          timestamp: "09:30:40",
          message: "Upload process started",
          status: "info",
        },
        {
          timestamp: "09:30:41",
          message: "Only one SSIM file received, second file missing",
          status: "warning",
        },
        { timestamp: "09:30:42", message: "Processing files", status: "info" },
        {
          timestamp: "09:30:43",
          message: "Comparison performed with only one file",
          status: "warning",
        },
        {
          timestamp: "09:30:45",
          message: "Comparison completed with warnings",
          status: "success",
        },
      ],
      error:
        "One of the input files was missing, so the comparison may be incomplete.",
      removedFlights: ["WY 3330"],
      addedFlights: [],
      modifiedFlights: [],
    },
    {
      id: 4,
      finishedOn: "2025-02-14 10:48:00",
      payload: { userId: 126, action: "compare" },
      status: "failure",
      date: "2025-02-14 10:45:22",
      steps: [
        {
          timestamp: "10:45:18",
          message: "Upload process started",
          status: "info",
        },
        {
          timestamp: "10:45:19",
          message: "Both SSIM files received",
          status: "info",
        },
        {
          timestamp: "10:45:20",
          message: "Files parsed successfully",
          status: "success",
        },
        {
          timestamp: "10:45:21",
          message: "Database save failed due to connection timeout",
          status: "failure",
        },
      ],
      error: "Database error: Connection timeout while saving parsed files.",
      removedFlights: [],
      addedFlights: [],
      modifiedFlights: [],
    },
    {
      id: 5,
      finishedOn: "2025-01-15 11:36:09",
      payload: { userId: 127, action: "compare" },
      status: "success",
      date: "2025-01-15 11:30:10",
      steps: [
        {
          timestamp: "11:30:05",
          message: "Upload process started",
          status: "info",
        },
        {
          timestamp: "11:30:06",
          message: "Both SSIM files received",
          status: "info",
        },
        { timestamp: "11:30:07", message: "Processing files", status: "info" },
        {
          timestamp: "11:30:08",
          message: "Files parsed successfully",
          status: "success",
        },
        {
          timestamp: "11:30:09",
          message: "Comparison completed successfully",
          status: "success",
        },
      ],
      removedFlights: ["WY 1001", "WY 1002", "WY 1003"],
      addedFlights: ["WY 7001", "WY 7002"],
      modifiedFlights: [
        { key: "WY 0501", changes: ["departureTime: '12:00' → '12:30'"] },
        { key: "WY 0602", changes: ["arrivalTime: '14:00' → '14:45'"] },
        { key: "WY 0703", changes: ["aircraftType: 'A320' → 'B737'"] },
      ],
    },
  ];

  // Function to filter logs based on selected filters
  const filteredLogs = logs.filter((log) => {
    const logDate = new Date(log.date);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const weekAgo = new Date();
    weekAgo.setDate(today.getDate() - 7);
    const monthAgo = new Date();
    monthAgo.setMonth(today.getMonth() - 1);

    // Filter by date range
    let isDateMatch = true;
    if (dateFilter === "Today")
      isDateMatch = logDate.toDateString() === today.toDateString();
    if (dateFilter === "Yesterday")
      isDateMatch = logDate.toDateString() === yesterday.toDateString();
    if (dateFilter === "This Week") isDateMatch = logDate >= weekAgo;
    if (dateFilter === "This Month") isDateMatch = logDate >= monthAgo;

    // Filter by status
    const isStatusMatch = statusFilter ? log.status === statusFilter : true;

    return isDateMatch && isStatusMatch;
  });
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">
        Process Logs
      </h1>

      <div className="flex space-x-4 mb-6">
        {/* Status Filter */}
        <select
          className="px-4 py-2 border rounded-md"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="success">Success</option>
          <option value="failure">Failure</option>
          <option value="partial_success">Partial Success</option>
        </select>

        {/* Date Filter */}
        <select
          className="px-4 py-2 border rounded-md"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        >
          <option value="">All Dates</option>
          <option value="Today">Today</option>
          <option value="Yesterday">Yesterday</option>
          <option value="This Week">This Week</option>
          <option value="This Month">This Month</option>
        </select>
      </div>

      {/* Logs Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr className="text-gray-700">
              <th className="px-6 py-3 text-left">Started On</th>
              <th className="px-6 py-3 text-left">Completed On</th>
              <th className="px-6 py-3 text-left">Duration</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log) => (
              <tr
                key={log.id}
                className={`border-t cursor-pointer transition hover:bg-gray-50 ${
                  log.status === "success"
                    ? "bg-green-50"
                    : log.status === "failure"
                    ? "bg-red-50"
                    : "bg-yellow-50"
                }`}
                onClick={() => setSelectedLog(log)}
              >
                <td className="px-6 py-3">{log.date}</td>
                <td className="px-6 py-3">{log.finishedOn}</td>
                <td className="px-6 py-3">
                  {calculateDuration(log.date, log.finishedOn)}
                </td>
                <td className="px-6 py-3">
                  <span
                    className={`px-3 py-1 rounded capitalize text-white ${
                      log.status === "success"
                        ? "bg-green-500"
                        : log.status === "failure"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {log.status.replace("_", " ")}
                  </span>
                </td>
                <td className="px-6 py-3">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded shadow"
                    onClick={() => setSelectedLog(log)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Drawer Component */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-50">
          <div className="fixed top-0 right-0 w-96 bg-white h-full shadow-lg transition-transform transform translate-x-0">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b bg-white sticky top-0">
              <h2 className="text-xl font-semibold">Log Details</h2>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setSelectedLog(null)}
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto p-4 max-h-[calc(100vh-56px)]">
              {/* Timeline */}
              <h3 className="text-lg font-semibold">Process Timeline</h3>
              <ol className="relative mt-4">
                {selectedLog.steps.map((step, index) => (
                  <li key={index} className="ms-4 relative pt-2 pb-2">
                    {/* Connecting line */}
                    {index !== selectedLog.steps.length - 1 && (
                      <div className="absolute left-0 top-4 w-1 h-full bg-gray-300"></div>
                    )}

                    {/* Icon */}
                    <div className="absolute -left-4 top-2 flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 bg-white shadow">
                      {step.status === "success" && (
                        <CheckCircle className="text-green-500 w-5 h-5" />
                      )}
                      {step.status === "failure" && (
                        <XCircle className="text-red-500 w-5 h-5" />
                      )}
                      {step.status === "warning" && (
                        <AlertTriangle className="text-yellow-500 w-5 h-5" />
                      )}
                      {step.status === "info" && (
                        <Info className="text-gray-500 w-5 h-5" />
                      )}
                    </div>

                    {/* Text */}
                    <div className="pl-12">
                      <time className="text-sm text-gray-400">
                        {formatTime(step.timestamp)}
                      </time>
                      <h4 className="text-md font-semibold">{step.message}</h4>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="p-4">
                <h4 className="text-lg font-semibold">Payload</h4>
                <pre>{JSON.stringify(selectedLog.payload)}</pre>
              </div>
              {/* Error Message */}
              {selectedLog.error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 my-4">
                  <p>{selectedLog.error}</p>
                </div>
              )}

              {/* Removed Flights */}
              <h3 className="text-lg font-semibold mt-6">Removed Flights</h3>
              <ul className="text-sm text-red-600">
                {selectedLog.removedFlights.length > 0 ? (
                  selectedLog.removedFlights.map((flight, index) => (
                    <li key={index}>{flight}</li>
                  ))
                ) : (
                  <li>No removed flights</li>
                )}
              </ul>

              {/* Added Flights */}
              <h3 className="text-lg font-semibold mt-6">Added Flights</h3>
              <ul className="text-sm text-blue-600">
                {selectedLog.addedFlights.length > 0 ? (
                  selectedLog.addedFlights.map((flight, index) => (
                    <li key={index}>{flight}</li>
                  ))
                ) : (
                  <li>No added flights</li>
                )}
              </ul>

              {/* Modified Flights */}
              <h3 className="text-lg font-semibold mt-6">Modified Flights</h3>
              <ul className="text-sm text-yellow-600">
                {selectedLog.modifiedFlights.length > 0 ? (
                  selectedLog.modifiedFlights.map((flight, index) => (
                    <li key={index}>
                      <strong>{flight.key}:</strong> {flight.changes.join(", ")}
                    </li>
                  ))
                ) : (
                  <li>No modified flights</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
