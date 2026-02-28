import React, { forwardRef } from 'react';
import { QuoteData } from '../types';
import { COMPANY_DETAILS } from '../constants';
import { formatCurrency } from '../utils';

interface PDFPreviewProps {
  data: QuoteData;
}

const PDFPreview = forwardRef<HTMLDivElement, PDFPreviewProps>(({ data }, ref) => {
  return (
    <div className="p-2 md:p-4 flex justify-center">
      <div 
        ref={ref}
        className="pdf-page flex flex-col text-[11px] leading-snug text-brand-ink bg-white shadow-2xl"
        id="quotation-pdf"
        style={{ 
          width: '210mm', 
          minHeight: '297mm', 
          display: 'flex',
          flexDirection: 'column',
          padding: '10mm 12mm',
        }}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-start gap-3">
            <img 
              src={COMPANY_DETAILS.logoUrl} 
              alt="DEE PIESS Logo" 
              className="w-12 h-12 object-contain"
            />
            <div>
              <h1 className="text-xl font-serif font-bold tracking-tight leading-none">{COMPANY_DETAILS.name}</h1>
              <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-stone-400 mb-1">{COMPANY_DETAILS.tagline}</p>
              <p className="text-stone-500 max-w-[250px] text-[10px]">{COMPANY_DETAILS.address}</p>
              <p className="text-stone-500 text-[10px]">GST: {COMPANY_DETAILS.gstin}</p>
              <p className="text-stone-500 text-[10px]">Ph: {COMPANY_DETAILS.phone}</p>
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-2xl font-serif italic mb-2">Quotation</h2>
            <div className="space-y-0.5 text-[10px]">
              <p><span className="text-stone-400 uppercase tracking-widest mr-2">Quote No:</span> <span className="font-medium">{data.client.quoteNumber}</span></p>
              <p><span className="text-stone-400 uppercase tracking-widest mr-2">Date:</span> <span className="font-medium">{data.client.quoteDate}</span></p>
              <p><span className="text-stone-400 uppercase tracking-widest mr-2">Valid Till:</span> <span className="font-medium">15 Days</span></p>
            </div>
          </div>
        </div>

        <div className="h-px bg-stone-200 w-full mb-4" />

        {/* Bill To */}
        <div className="mb-5">
          <h3 className="text-[9px] uppercase tracking-[0.2em] text-stone-400 mb-1.5">Client Details</h3>
          <div className="space-y-0.5">
            <p className="text-base font-serif font-medium">{data.client.name || 'Client Name'}</p>
            <p className="text-stone-500 max-w-[300px] text-[10px]">{data.client.address || 'Site Address'}</p>
            <p className="text-stone-500 text-[10px]">{data.client.phone || 'Phone Number'}</p>
            <p className="text-stone-500 italic text-[10px]">Project: {data.client.projectType || 'Project Type'}</p>
          </div>
        </div>

        {/* Items Table */}
        <div className="grow">
          <table className="w-full mb-4">
            <thead>
              <tr className="border-b border-stone-200 text-[9px] uppercase tracking-widest text-stone-400">
                <th className="py-1.5 text-left font-normal w-10">S.No</th>
                <th className="py-1.5 text-left font-normal">Description</th>
                <th className="py-1.5 text-right font-normal w-16">Qty</th>
                <th className="py-1.5 text-right font-normal w-20">Rate</th>
                <th className="py-1.5 text-right font-normal w-28">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {data.items.map((item, index) => (
                <tr key={item.id}>
                  <td className="py-2 text-stone-400">{index + 1}</td>
                  <td className="py-2 pr-4 font-medium">{item.description}</td>
                  <td className="py-2 text-right text-stone-500">{item.quantity} {item.unit}</td>
                  <td className="py-2 text-right text-stone-500">{formatCurrency(item.rate)}</td>
                  <td className="py-2 text-right font-bold">{formatCurrency(item.total)}</td>
                </tr>
              ))}
              {data.items.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-stone-300 italic">No items added yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className="flex justify-end mb-4">
          <div className="w-56 space-y-1">
            <div className="flex justify-between text-stone-500 text-[10px]">
              <span>Subtotal</span>
              <span>{formatCurrency(data.subtotal)}</span>
            </div>
            {data.showDiscount && data.discount > 0 && (
              <div className="flex justify-between text-emerald-600 text-[10px]">
                <span>Discount ({data.discount}%)</span>
                <span>-{formatCurrency(data.discountAmount)}</span>
              </div>
            )}
            {data.showGST && data.gst > 0 && (
              <div className="flex justify-between text-stone-500 text-[10px]">
                <span>GST ({data.gst}%)</span>
                <span>{formatCurrency(data.taxAmount)}</span>
              </div>
            )}
            <div className="h-px bg-stone-200 my-0.5" />
            <div className="flex justify-between items-center pt-0.5">
              <span className="text-[9px] uppercase tracking-[0.2em] text-stone-400 font-bold">Grand Total</span>
              <span className="text-lg font-sans font-bold tracking-tight text-brand-ink leading-none">{formatCurrency(data.grandTotal)}</span>
            </div>
            {data.advance > 0 && (
              <>
                <div className="flex justify-between text-stone-500 text-[10px]">
                  <span>Advance Received</span>
                  <span>{formatCurrency(data.advance)}</span>
                </div>
                {data.balance !== 0 && (
                  <div className="flex justify-between font-bold text-[10px] border-t border-stone-100 pt-0.5">
                    <span>Balance Due</span>
                    <span>{formatCurrency(data.balance)}</span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-3 border-t border-stone-100">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-[8px] uppercase tracking-widest text-stone-400 mb-1.5">Terms & Conditions</h4>
              <ul className="list-decimal list-inside text-[8px] text-stone-500 space-y-0.5">
                {COMPANY_DETAILS.terms.map((term, i) => (
                  <li key={i}>{term}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[8px] uppercase tracking-widest text-stone-400 mb-1.5">Bank Details</h4>
              <div className="text-[8px] text-stone-500 space-y-0.5">
                <p><span className="font-medium text-stone-700">Bank:</span> {COMPANY_DETAILS.bankDetails.bankName}</p>
                <p><span className="font-medium text-stone-700">A/c Name:</span> {COMPANY_DETAILS.bankDetails.accountName}</p>
                <p><span className="font-medium text-stone-700">A/c No:</span> {COMPANY_DETAILS.bankDetails.accountNumber}</p>
                <p><span className="font-medium text-stone-700">IFSC:</span> {COMPANY_DETAILS.bankDetails.ifsc}</p>
                <div className="flex gap-3 mt-0.5 pt-0.5 border-t border-stone-100">
                  <p><span className="font-medium text-stone-700">PhonePe:</span> {COMPANY_DETAILS.bankDetails.phonePe}</p>
                  <p><span className="font-medium text-stone-700">G-Pay:</span> {COMPANY_DETAILS.bankDetails.googlePay}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-end mt-4">
            <p className="text-[7px] text-stone-300 uppercase tracking-widest italic">This is a computer generated quotation</p>
            <div className="text-center">
              <div className="w-20 h-8 border-b border-stone-200 mb-0.5"></div>
              <p className="text-[8px] uppercase tracking-widest text-stone-400">Authorized Signature</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

PDFPreview.displayName = 'PDFPreview';

export default PDFPreview;
