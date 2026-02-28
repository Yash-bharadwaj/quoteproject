import React, { forwardRef } from 'react';
import { QuoteData } from '../types';
import { COMPANY_DETAILS } from '../constants';
import { formatCurrency } from '../utils';

interface PDFPreviewProps {
  data: QuoteData;
  forCapture?: boolean; // when true: no outer wrapper padding, no shadow, no transforms
}

// A4 at 96dpi = 794px wide, 1123px tall
const A4_PX_WIDTH = 794;

const PDFPreview = forwardRef<HTMLDivElement, PDFPreviewProps>(({ data, forCapture = false }, ref) => {
  return (
    // Outer wrapper: no padding when capturing so html2canvas sees exact A4 size
    <div className={forCapture ? '' : 'p-4 flex justify-center'}>
      <div
        ref={ref}
        id="quotation-pdf"
        className="pdf-page flex flex-col text-[11px] leading-snug text-brand-ink bg-white"
        style={{
          width: `${A4_PX_WIDTH}px`,
          minHeight: '1123px',
          display: 'flex',
          flexDirection: 'column',
          padding: '38px 45px',           // ~10mm 12mm at 96dpi
          boxShadow: forCapture ? 'none' : '0 25px 50px -12px rgba(0,0,0,0.25)',
          fontFamily: 'Inter, sans-serif',
          boxSizing: 'border-box',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <img
              src={COMPANY_DETAILS.logoUrl}
              alt="DEE PIESS Logo"
              crossOrigin="anonymous"
              style={{ width: '48px', height: '48px', objectFit: 'contain', display: 'block' }}
            />
            <div>
              <div style={{ fontSize: '20px', fontFamily: 'Cormorant Garamond, serif', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1 }}>{COMPANY_DETAILS.name}</div>
              <div style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.3em', fontWeight: 700, color: '#a8a29e', marginBottom: '4px', marginTop: '2px' }}>{COMPANY_DETAILS.tagline}</div>
              <div style={{ fontSize: '10px', color: '#78716c', maxWidth: '250px' }}>{COMPANY_DETAILS.address}</div>
              <div style={{ fontSize: '10px', color: '#78716c' }}>GST: {COMPANY_DETAILS.gstin}</div>
              <div style={{ fontSize: '10px', color: '#78716c' }}>Ph: {COMPANY_DETAILS.phone}</div>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '24px', fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', marginBottom: '8px' }}>Quotation</div>
            <div style={{ fontSize: '10px' }}>
              <div style={{ marginBottom: '2px' }}><span style={{ color: '#a8a29e', textTransform: 'uppercase', letterSpacing: '0.08em', marginRight: '8px' }}>Quote No:</span><span style={{ fontWeight: 500 }}>{data.client.quoteNumber}</span></div>
              <div style={{ marginBottom: '2px' }}><span style={{ color: '#a8a29e', textTransform: 'uppercase', letterSpacing: '0.08em', marginRight: '8px' }}>Date:</span><span style={{ fontWeight: 500 }}>{data.client.quoteDate}</span></div>
              <div><span style={{ color: '#a8a29e', textTransform: 'uppercase', letterSpacing: '0.08em', marginRight: '8px' }}>Valid Till:</span><span style={{ fontWeight: 500 }}>15 Days</span></div>
            </div>
          </div>
        </div>

        <div style={{ height: '1px', background: '#e7e5e4', width: '100%', marginBottom: '16px' }} />

        {/* Client Details */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#a8a29e', marginBottom: '6px' }}>Client Details</div>
          <div style={{ fontSize: '15px', fontFamily: 'Cormorant Garamond, serif', fontWeight: 500, marginBottom: '2px' }}>{data.client.name || 'Client Name'}</div>
          <div style={{ fontSize: '10px', color: '#78716c', maxWidth: '300px', marginBottom: '2px' }}>{data.client.address || 'Site Address'}</div>
          <div style={{ fontSize: '10px', color: '#78716c', marginBottom: '2px' }}>{data.client.phone || 'Phone Number'}</div>
          <div style={{ fontSize: '10px', color: '#78716c', fontStyle: 'italic' }}>Project: {data.client.projectType || 'Project Type'}</div>
        </div>

        {/* Items Table */}
        <div style={{ flexGrow: 1 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e7e5e4' }}>
                {['S.No', 'Description', 'Qty', 'Rate', 'Amount'].map((h, i) => (
                  <th key={h} style={{
                    padding: '6px 4px',
                    textAlign: i === 0 || i === 1 ? 'left' : 'right',
                    fontWeight: 'normal',
                    fontSize: '9px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: '#a8a29e',
                    width: i === 0 ? '36px' : i === 2 ? '60px' : i === 3 ? '80px' : i === 4 ? '100px' : 'auto',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.items.map((item, index) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #f5f5f4' }}>
                  <td style={{ padding: '8px 4px', color: '#a8a29e', fontSize: '10px' }}>{index + 1}</td>
                  <td style={{ padding: '8px 4px', fontWeight: 500, fontSize: '10px', paddingRight: '16px' }}>{item.description}</td>
                  <td style={{ padding: '8px 4px', textAlign: 'right', color: '#78716c', fontSize: '10px' }}>{item.quantity} {item.unit}</td>
                  <td style={{ padding: '8px 4px', textAlign: 'right', color: '#78716c', fontSize: '10px' }}>{formatCurrency(item.rate)}</td>
                  <td style={{ padding: '8px 4px', textAlign: 'right', fontWeight: 700, fontSize: '10px' }}>{formatCurrency(item.total)}</td>
                </tr>
              ))}
              {data.items.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ padding: '32px', textAlign: 'center', color: '#d6d3d1', fontStyle: 'italic', fontSize: '10px' }}>No items added yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
          <div style={{ width: '220px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#78716c', marginBottom: '4px' }}>
              <span>Subtotal</span><span>{formatCurrency(data.subtotal)}</span>
            </div>
            {data.showDiscount && data.discount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#059669', marginBottom: '4px' }}>
                <span>Discount ({data.discount}%)</span><span>-{formatCurrency(data.discountAmount)}</span>
              </div>
            )}
            {data.showGST && data.gst > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#78716c', marginBottom: '4px' }}>
                <span>GST ({data.gst}%)</span><span>{formatCurrency(data.taxAmount)}</span>
              </div>
            )}
            <div style={{ height: '1px', background: '#e7e5e4', margin: '4px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '2px' }}>
              <span style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#a8a29e', fontWeight: 700 }}>Grand Total</span>
              <span style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1 }}>{formatCurrency(data.grandTotal)}</span>
            </div>
            {data.advance > 0 && (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#78716c', marginTop: '4px' }}>
                  <span>Advance Received</span><span>{formatCurrency(data.advance)}</span>
                </div>
                {data.balance !== 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontWeight: 700, borderTop: '1px solid #f5f5f4', paddingTop: '2px', marginTop: '2px' }}>
                    <span>Balance Due</span><span>{formatCurrency(data.balance)}</span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid #f5f5f4' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div>
              <div style={{ fontSize: '8px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#a8a29e', marginBottom: '6px' }}>Terms & Conditions</div>
              <ol style={{ margin: 0, paddingLeft: '14px', fontSize: '8px', color: '#78716c', lineHeight: 1.6 }}>
                {COMPANY_DETAILS.terms.map((term, i) => (
                  <li key={i}>{term}</li>
                ))}
              </ol>
            </div>
            <div>
              <div style={{ fontSize: '8px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#a8a29e', marginBottom: '6px' }}>Bank Details</div>
              <div style={{ fontSize: '8px', color: '#78716c', lineHeight: 1.6 }}>
                <div><span style={{ fontWeight: 600, color: '#57534e' }}>Bank:</span> {COMPANY_DETAILS.bankDetails.bankName}</div>
                <div><span style={{ fontWeight: 600, color: '#57534e' }}>A/c Name:</span> {COMPANY_DETAILS.bankDetails.accountName}</div>
                <div><span style={{ fontWeight: 600, color: '#57534e' }}>A/c No:</span> {COMPANY_DETAILS.bankDetails.accountNumber}</div>
                <div><span style={{ fontWeight: 600, color: '#57534e' }}>IFSC:</span> {COMPANY_DETAILS.bankDetails.ifsc}</div>
                <div style={{ borderTop: '1px solid #f5f5f4', marginTop: '2px', paddingTop: '2px', display: 'flex', gap: '12px' }}>
                  <span><span style={{ fontWeight: 600, color: '#57534e' }}>PhonePe:</span> {COMPANY_DETAILS.bankDetails.phonePe}</span>
                  <span><span style={{ fontWeight: 600, color: '#57534e' }}>G-Pay:</span> {COMPANY_DETAILS.bankDetails.googlePay}</span>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '16px' }}>
            <div style={{ fontSize: '7px', color: '#d6d3d1', textTransform: 'uppercase', letterSpacing: '0.08em', fontStyle: 'italic' }}>This is a computer generated quotation</div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '80px', height: '32px', borderBottom: '1px solid #e7e5e4', marginBottom: '2px' }} />
              <div style={{ fontSize: '8px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#a8a29e' }}>Authorized Signature</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

PDFPreview.displayName = 'PDFPreview';

export default PDFPreview;
