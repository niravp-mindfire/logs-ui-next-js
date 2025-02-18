"use client";

import React, { JSX, useState } from "react";
import { Clock, Server, Database, FileText, RefreshCw, ChevronRight, ChevronDown } from "lucide-react";

const LogTimelineViewer = () => {
  const [selectedProcess, setSelectedProcess] = useState<string | null>(null);
  const [expandedLogs, setExpandedLogs] = useState<Set<number>>(new Set());

  const processes: Record<string, { icon: JSX.Element; color: string }> = {
    "Server Start": { icon: <Server className="w-4 h-4" />, color: "bg-blue-500" },
    "FTP Operations": { icon: <FileText className="w-4 h-4" />, color: "bg-green-500" },
    "SSIM Processing": { icon: <Database className="w-4 h-4" />, color: "bg-purple-500" },
    "Server Resume": { icon: <RefreshCw className="w-4 h-4" />, color: "bg-yellow-500" },
  };

  const logs = [
    { id: 1, timestamp: "2025-02-18T13:47:20.678Z", process: "Server Start", message: "Server started on port 3000" },
    { id: 2, timestamp: "2025-02-18T13:47:20.680Z", process: "Server Start", message: "Server running at http://localhost:3000" },
    { id: 3, timestamp: "2025-02-18T13:47:28.214Z", process: "FTP Operations", message: "GET request received at /ssim/ftp" },
    { id: 4, timestamp: "2025-02-18T13:47:28.216Z", process: "FTP Operations", message: "Fetching files from FTP..." },
    { id: 5, timestamp: "2025-02-18T13:47:28.217Z", process: "FTP Operations", message: "Checking if Download folder already exists" },
    { id: 6, timestamp: "2025-02-18T13:47:28.218Z", process: "FTP Operations", message: "Download folder already exists" },
    { id: 7, timestamp: "2025-02-18T13:47:33.545Z", process: "Server Resume", message: "Server resumed" },
    { id: 8, timestamp: "2025-02-18T13:47:33.546Z", process: "FTP Operations", message: "Files fetched from FTP successfully." },
    { id: 9, timestamp: "2025-02-18T13:47:33.547Z", process: "SSIM Processing", message: "Starting SSIM file parsing and comparison..." },
    { id: 10, timestamp: "2025-02-18T13:47:33.547Z", process: "SSIM Processing", message: "Calling the uploadAndCompareSSIMFile controller..." },
    { id: 11, timestamp: "2025-02-18T13:47:33.548Z", process: "SSIM Processing", message: "Started fetching the last two files from the FTP download folder" },
    { id: 12, timestamp: "2025-02-18T13:47:33.549Z", process: "SSIM Processing", message: "Retrieving and sorting SSIM files based on the modified date..." },
    { id: 13, timestamp: "2025-02-18T13:47:33.552Z", process: "SSIM Processing", message: "Processing the last two files: prod_wy_ssim_20250217_2033.txt and prod_wy_ssim_20250216_2033.txt" },
    { id: 14, timestamp: "2025-02-18T13:47:33.553Z", process: "SSIM Processing", message: "Parsing SSIM file 1: E:\\ifcs local\\TS Demo\\ftpFiles\\prod_wy_ssim_20250217_2033.txt" },
    { id: 15, timestamp: "2025-02-18T13:47:33.554Z", process: "SSIM Processing", message: "Starting to parse SSIM file: E:\\ifcs local\\TS Demo\\ftpFiles\\prod_wy_ssim_20250217_2033.txt" },
    { id: 16, timestamp: "2025-02-18T13:47:33.555Z", process: "SSIM Processing", message: "SSIM files processed and compared successfully." },
    { id: 17, timestamp: "2025-02-18T13:47:33.559Z", process: "Server Resume", message: "Server has resumed and is ready to handle requests." },
    { id: 18, timestamp: "2025-02-18T13:47:33.560Z", process: "Server Resume", message: "Server resume process completed." },
    { id: 19, timestamp: "2025-02-18T13:47:33.920Z", process: "SSIM Processing", message: "Parsing completed. Total flight records found: 12631" },
    { id: 20, timestamp: "2025-02-18T13:47:33.920Z", process: "SSIM Processing", message: "Parsing SSIM file 2: E:\\ifcs local\\TS Demo\\ftpFiles\\prod_wy_ssim_20250216_2033.txt" },
    { id: 21, timestamp: "2025-02-18T13:47:33.920Z", process: "SSIM Processing", message: "Starting to parse SSIM file: E:\\ifcs local\\TS Demo\\ftpFiles\\prod_wy_ssim_20250216_2033.txt" },
    { id: 22, timestamp: "2025-02-18T13:47:34.178Z", process: "SSIM Processing", message: "Parsing completed. Total flight records found: 12755" },
    { id: 23, timestamp: "2025-02-18T13:47:34.179Z", process: "SSIM Processing", message: "Files parsed to JSON successfully" },
    { id: 24, timestamp: "2025-02-18T13:47:34.179Z", process: "SSIM Processing", message: "Saving parsed SSIM JSON file 1 to: E:\\ifcs local\\TS Demo\\parsed-data\\ssimFile1.json" },
    { id: 25, timestamp: "2025-02-18T13:47:34.199Z", process: "SSIM Processing", message: "Saving parsed SSIM JSON file 2 to: E:\\ifcs local\\TS Demo\\parsed-data\\ssimFile2.json" },
    { id: 26, timestamp: "2025-02-18T13:47:34.227Z", process: "SSIM Processing", message: "Parsed files saved locally" },
    { id: 27, timestamp: "2025-02-18T13:47:34.228Z", process: "SSIM Processing", message: "Starting SSIM file comparison..." },
    { id: 28, timestamp: "2025-02-18T13:47:34.229Z", process: "SSIM Processing", message: "Starting to parse SSIM file: E:\\ifcs local\\TS Demo\\ftpFiles\\prod_wy_ssim_20250217_2033.txt" },
    { id: 29, timestamp: "2025-02-18T13:47:34.463Z", process: "SSIM Processing", message: "Parsing completed. Total flight records found: 12631" },
    { id: 30, timestamp: "2025-02-18T13:47:34.464Z", process: "SSIM Processing", message: "Starting to parse SSIM file: E:\\ifcs local\\TS Demo\\ftpFiles\\prod_wy_ssim_20250216_2033.txt" },
    { id: 31, timestamp: "2025-02-18T13:47:34.693Z", process: "SSIM Processing", message: "Parsing completed. Total flight records found: 12755" },
    { id: 32, timestamp: "2025-02-18T13:47:34.698Z", process: "SSIM Processing", message: "Comparison completed successfully" },
    { id: 33, timestamp: "2025-02-18T13:47:34.699Z", process: "SSIM Processing", message: "Saving comparison result to: E:\\ifcs local\\TS Demo\\parsed-data\\comparisonResult.json" },
    { id: 34, timestamp: "2025-02-18T13:47:34.700Z", process: "SSIM Processing", message: "Comparison result saved locally" },
    { id: 35, timestamp: "2025-02-18T13:47:34.700Z", process: "SSIM Processing", message: "SSIM files successfully uploaded, parsed, and compared." },
    { id: 36, timestamp: "2025-02-18T13:47:34.701Z", process: "Server Resume", message: "Server is ready to handle requests." },
  ];

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const toggleExpand = (id: number) => {
    setExpandedLogs((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center gap-2 mb-6">
          <Clock className="w-5 h-5 text-gray-500" />
          <h2 className="text-lg font-semibold">Server Log Timeline</h2>
        </div>

        <div className="flex gap-2 mb-4">
          {Object.entries(processes).map(([name, { icon, color }]) => (
            <button
              key={name}
              onClick={() => setSelectedProcess(selectedProcess === name ? null : name)}
              className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                selectedProcess === name ? color + " text-white" : "bg-gray-100"
              } hover:opacity-80 transition-colors`}
            >
              {icon}
              {name}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {logs
            .filter((log) => !selectedProcess || log.process === selectedProcess)
            .map((log) => (
              <div key={log.id} className="group">
                <div className="flex items-start gap-4">
                  <div className="w-32 text-sm text-gray-500 pt-1">{formatTime(log.timestamp)}</div>
                  <div className={`w-2 h-2 rounded-full mt-2.5 ${processes[log.process]?.color}`} />
                  <div className="flex-1">
                    <div
                      className="flex items-center gap-2 text-sm font-medium cursor-pointer"
                      onClick={() => toggleExpand(log.id)}
                    >
                      {expandedLogs.has(log.id) ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                      {processes[log.process]?.icon}
                      {log.process}
                    </div>
                    {expandedLogs.has(log.id) && (
                      <div className="text-sm text-gray-600 mt-1 ml-6">{log.message}</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default LogTimelineViewer;
