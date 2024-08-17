// components/PaymentTooltip.js
import React from 'react';
import ReactTooltip from 'react-tooltip';

const PaymentTooltip = ({ payments, tooltipId }) => {
  return (
    <>
      <ReactTooltip id={tooltipId} effect="solid" place="top">
        <table className="text-sm">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left">Series</th>
              {/* <th className="px-2 py-1 text-left">Season</th> */}
              <th className="px-2 py-1 text-left">Amount</th>
              <th className="px-2 py-1 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={index}>
                <td className="px-2 py-1">{payment.tvSeriesName}</td>
                {/* <td className="px-2 py-1">{payment.seasonName}</td> */}
                <td className="px-2 py-1">{payment.amount}</td>
                <td className="px-2 py-1">{new Date(payment.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </ReactTooltip>
    </>
  );
};

// export default PaymentTooltip;