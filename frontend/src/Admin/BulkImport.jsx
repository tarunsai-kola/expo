import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import API from '../API';

const BulkImport = () => {
    const [file, setFile] = useState(null);
    const [importStats, setImportStats] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [selectedSource, setSelectedSource] = useState("Bulk CSV Import");

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setImportStats(null);
    };

    const handleUpload = async () => {
        if (!file) {
            toast.error("Please select a CSV or Excel file first", {
                style: { background: '#1e293b', color: '#f8fafc', border: '1px solid #334155' }
            });
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("source", selectedSource);

        setUploading(true);
        try {
            const response = await axios.post(`${API}/api/adv-leads/bulk-import`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            toast.success("Import Complete!", {
                style: { background: '#1e293b', color: '#f8fafc', border: '1px solid #334155' }
            });
            setImportStats(response.data);
        } catch (err) {
            toast.error(err.response?.data?.message || "Import failed. Check file format.", {
                style: { background: '#1e293b', color: '#f8fafc', border: '1px solid #334155' }
            });
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="admin-content-wrap min-h-screen bg-slate-50 text-slate-700 font-sans p-6 ml-[270px]">
            <Toaster position="top-center" />
            
            <div className="max-w-4xl mx-auto">
                <div className="mb-8 border-b border-slate-200 pb-6">
                    <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-600 flex items-center justify-center text-xl">
                            <i className="fa fa-upload"></i>
                        </div>
                        Bulk Lead Import
                    </h1>
                    <p className="text-slate-600 mt-2">Upload multiple leads instantly using a CSV or Excel file.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="md:col-span-2 bg-slate-50 backdrop-blur-md rounded-2xl p-6 border border-slate-200 shadow-xl">
                        <h2 className="text-slate-900 font-bold mb-4 flex items-center gap-2">
                            <i className="fa fa-info-circle text-indigo-600"></i> Formatting Guide
                        </h2>
                        <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                            Ensure your <strong>CSV or Excel (.xlsx) file</strong> contains exactly these column headers in the first row. The system will map your data based on these headers:
                        </p>
                        <div className="bg-white p-4 rounded-xl border border-slate-200 font-mono text-emerald-600 text-sm mb-6 overflow-x-auto whitespace-nowrap">
                            full_name, email, phone_number, opted_domain, year_of_passing, company_name
                        </div>
                        
                        <a href="/sample_leads.xlsx" download className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 font-bold px-5 py-2.5 rounded-xl hover:bg-indigo-500 hover:text-slate-900 transition-all">
                            <i className="fa fa-download"></i> Download Sample Excel File
                        </a>
                    </div>

                    <div className="bg-slate-50 backdrop-blur-md rounded-2xl p-6 border border-slate-200 shadow-xl flex flex-col">
                        <h2 className="text-slate-900 font-bold mb-4 flex items-center gap-2">
                            <i className="fa fa-bullseye text-amber-600"></i> Lead Source
                        </h2>
                        <p className="text-slate-600 text-sm mb-4">Select the origin of these leads to track their performance accurately.</p>
                        <div className="mt-auto">
                            <select 
                                value={selectedSource}
                                onChange={(e) => setSelectedSource(e.target.value)}
                                className="w-full bg-white border border-slate-200 text-slate-900 font-bold p-4 rounded-xl outline-none focus:ring-2 focus:ring-amber-500 appearance-none shadow-inner"
                            >
                                <option value="Bulk CSV Import" className="bg-white">Bulk CSV Import (Default)</option>
                                <option value="Meta Ads" className="bg-white">Meta Ads</option>
                                <option value="Website Leads" className="bg-white">Website Leads</option>
                                <option value="Email Marketing" className="bg-white">Email Marketing</option>
                                <option value="Organic Leads" className="bg-white">Organic Leads</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className={`bg-slate-50 rounded-3xl p-10 border-2 border-dashed transition-all duration-300 text-center flex flex-col items-center justify-center ${file ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-indigo-500/30 hover:border-indigo-500 hover:bg-indigo-500/5'}`}>
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 shadow-xl border border-slate-200">
                        <i className={`fa fa-file-excel-o text-3xl ${file ? 'text-emerald-600' : 'text-indigo-600'}`}></i>
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Upload your file</h3>
                    <p className="text-slate-600 text-sm mb-8">Drag and drop or click to browse</p>
                    
                    <label className="relative cursor-pointer bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold py-3 px-8 rounded-xl transition-all hover:shadow-[0_0_15px_rgba(79,70,229,0.3)]">
                        <span>Browse Files</span>
                        <input
                            type="file"
                            accept=".csv, .xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                    </label>

                    {file && (
                        <div className="mt-8 bg-white px-6 py-3 rounded-xl border border-slate-200 flex items-center gap-4 shadow-inner">
                            <i className="fa fa-file-text text-emerald-600"></i>
                            <span className="text-slate-700 font-medium">{file.name}</span>
                            <span className="text-slate-500 text-xs font-mono">({(file.size / 1024).toFixed(1)} KB)</span>
                            <button onClick={() => setFile(null)} className="ml-2 text-slate-500 hover:text-rose-600 transition-colors">
                                <i className="fa fa-times-circle"></i>
                            </button>
                        </div>
                    )}
                </div>

                <div className="mt-8 flex justify-end">
                    <button
                        onClick={handleUpload}
                        disabled={uploading || !file}
                        className={`flex items-center gap-3 font-bold py-4 px-10 rounded-xl transition-all duration-300 text-lg shadow-xl ${
                            uploading ? 'bg-slate-100 text-slate-600 cursor-not-allowed' : 
                            !file ? 'bg-slate-50 text-slate-500 cursor-not-allowed opacity-50' : 
                            'bg-indigo-600 text-slate-900 hover:bg-indigo-500 hover:shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:-translate-y-1'
                        }`}
                    >
                        {uploading ? (
                            <><i className="fa fa-circle-o-notch fa-spin"></i> Uploading & Processing...</>
                        ) : (
                            <><i className="fa fa-cloud-upload"></i> Upload & Import Leads</>
                        )}
                    </button>
                </div>

                {importStats && (
                    <div className="mt-10 bg-slate-50 backdrop-blur-md rounded-2xl p-8 border border-slate-200 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
                        
                        <div className="flex items-center gap-4 mb-6 relative z-10">
                            <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-600 text-xl border border-emerald-500/30">
                                <i className="fa fa-check"></i>
                            </div>
                            <h3 className="text-2xl font-extrabold text-slate-900">Import Summary</h3>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                            <div className="bg-white p-6 rounded-xl border border-slate-200 flex flex-col justify-center items-center text-center">
                                <span className="text-slate-600 text-xs font-bold uppercase tracking-widest mb-2">Successfully Imported</span>
                                <span className="text-4xl font-extrabold text-emerald-600 font-mono">{importStats.successCount}</span>
                            </div>
                            <div className="bg-white p-6 rounded-xl border border-slate-200 flex flex-col justify-center items-center text-center">
                                <span className="text-slate-600 text-xs font-bold uppercase tracking-widest mb-2">Skipped / Duplicates</span>
                                <span className="text-4xl font-extrabold text-rose-600 font-mono">{importStats.failCount}</span>
                            </div>
                        </div>
                        
                        {(importStats.failCount > 0) && (
                            <p className="mt-4 text-center text-slate-500 text-sm italic relative z-10">
                                Note: Skipped leads usually mean they already exist in the database (duplicate email/phone) or had invalid data formatting.
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BulkImport;
