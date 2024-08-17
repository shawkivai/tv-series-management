'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/utils/axiosInstance'; 
import { PDFDocument, rgb } from 'pdf-lib';


export default function PaymentsTable() {
  const [clients, setClients] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchPayments() {
      try {
        const response = await axiosInstance.get('/clientPayments');
        setClients(response.data.data);
      } catch (error) {
        console.error('Error fetching TV series:', error);
      }
    }

    fetchPayments();
  }, []);


  const generatePDF = async (payments, clientName) => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);
  
    const { width, height } = page.getSize();
    page.drawText(`${clientName} Payments Report`, {
      x: 50,
      y: height - 50,
      size: 30,
      color: rgb(0, 0, 0),
    });
  
    let yPosition = height - 100;
    payments.forEach((payment, index) => {
    page.drawText(`Amount: ${payment.tvSeriesName}`, { x: 50, y: yPosition, size: 12 });
      yPosition -= 20;
      page.drawText(`Amount: ${payment.amount}`, { x: 50, y: yPosition, size: 12 });
      yPosition -= 20;
      page.drawText(`Date: ${new Date(payment.date).toLocaleDateString()}`, { x: 50, y: yPosition, size: 12 });
      yPosition -= 20;
      if (yPosition < 50) {
        page.addPage();
        yPosition = height - 50;
      }
    });
  
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    window.open(url);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Clients Payment List</h1>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Client ID</th>
              <th className="py-2 px-4 border-b">Client Name</th>
              <th className="py-2 px-4 border-b">Total Amount</th>
              <th className="py-2 px-4 border-b">Payment  History</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(clients) ? clients.map((s) => (
              <tr key={s.id} className="text-center">
                <td className="py-2 px-4 border-b">{s.clientId}</td>
                <td className="py-2 px-4 border-b">{s.clientName}</td>
                <td className="py-2 px-4 border-b">
                    {s.totalAmount}
                </td>

                <td className="py-2 px-4 border-b">
                {s.payments.map(payment => (
                    <div>
                          <p className="px-2 py-1">SeriesName: {payment.tvSeriesName}</p>
                    
                        <p className="px-2 py-1">Amount: {payment.amount}</p>
                        <p className="px-2 py-1">Date: {new Date(payment.date).toLocaleDateString()}</p>
                    </div>
                   
                ))}
                </td>

                <td className="py-2 px-4 border-b">
                 
                  <button
                    onClick={() => generatePDF(s.payments, s.clientName)}
                   className="bg-red-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none"
                  >
                    Generate PDF
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="4" className="text-center">No Data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
