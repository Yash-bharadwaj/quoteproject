import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Minus,
  Download, 
  Upload,
  Share2, 
  Trash2, 
  FileText, 
  User, 
  Briefcase,
  ChevronRight,
  Save,
  Copy,
  Check,
  X
} from 'lucide-react';
import { QuoteData, QuoteItem, ClientDetails } from '../types';
import { generateQuoteNumber, formatCurrency } from '../utils';
import { COMPANY_DETAILS } from '../constants';
import ItemCard from '../components/ItemCard';
import PDFPreview from '../components/PDFPreview';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const INITIAL_CLIENT: ClientDetails = {
  name: '',
  address: '',
  phone: '',
  projectType: '',
  quoteDate: new Date().toLocaleDateString('en-IN'),
  quoteNumber: generateQuoteNumber(),
};

const INITIAL_DATA: QuoteData = {
  client: INITIAL_CLIENT,
  items: [],
  discount: 0,
  showDiscount: false,
  gst: 18,
  showGST: true,
  advance: 0,
  balance: 0,
  subtotal: 0,
  taxAmount: 0,
  discountAmount: 0,
  grandTotal: 0,
};

export default function QuotationGenerator() {
  const [data, setData] = useState<QuoteData>(() => {
    const saved = localStorage.getItem('luxe_quote_draft');
    return saved ? JSON.parse(saved) : INITIAL_DATA;
  });

  const [isAddingItem, setIsAddingItem] = useState(false);
  const [editingItem, setEditingItem] = useState<QuoteItem | null>(null);
  const [newItem, setNewItem] = useState<Partial<QuoteItem>>({
    description: '',
    quantity: 1,
    unit: 'sqft',
    rate: 0,
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [zoom, setZoom] = useState(0.8); // Default desktop zoom
  const [mobileZoom, setMobileZoom] = useState(0.4);
  const pdfRef = useRef<HTMLDivElement>(null);
  const modalPdfRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-calculate mobile zoom to fit screen width
  useEffect(() => {
    if (showPreviewModal) {
      const screenWidth = window.innerWidth;
      const docWidth = 210 * 3.78; // 210mm in pixels approx
      const padding = 40;
      const fitZoom = (screenWidth - padding) / docWidth;
      setMobileZoom(Math.min(Math.max(0.2, fitZoom), 1));
    }
  }, [showPreviewModal]);

  // Auto-calculate totals
  useEffect(() => {
    const subtotal = data.items.reduce((acc, item) => acc + item.total, 0);
    const discountAmount = data.showDiscount ? (subtotal * data.discount) / 100 : 0;
    const afterDiscount = subtotal - discountAmount;
    const taxAmount = data.showGST ? (afterDiscount * data.gst) / 100 : 0;
    const grandTotal = Math.round(afterDiscount + taxAmount);
    const balance = grandTotal - data.advance;

    setData(prev => ({
      ...prev,
      subtotal,
      discountAmount,
      taxAmount,
      grandTotal,
      balance,
    }));
  }, [data.items, data.discount, data.showDiscount, data.gst, data.showGST, data.advance]);

  // Save to local storage
  useEffect(() => {
    localStorage.setItem('luxe_quote_draft', JSON.stringify(data));
  }, [data]);

  const handleExportProject = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `LuxeQuote_${data.client.name || 'Project'}_${data.client.quoteNumber}.luxe`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportProject = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        if (content.startsWith('%PDF')) {
          alert('Error: You are trying to upload a PDF file. \n\nPlease upload the ".luxe" project file that you saved earlier.');
          return;
        }
        const importedData = JSON.parse(content);
        if (importedData.client && importedData.items) {
          setData(importedData);
          alert('Project imported successfully!');
        } else {
          throw new Error('Invalid project file structure');
        }
      } catch (error) {
        console.error('Import failed', error);
        alert('Failed to import project.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleClientChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      client: { ...prev.client, [name]: value }
    }));
  };

  const handleAddItem = () => {
    if (!newItem.description || !newItem.rate) return;

    const item: QuoteItem = {
      id: editingItem?.id || Math.random().toString(36).substr(2, 9),
      description: newItem.description!,
      quantity: newItem.quantity || 1,
      unit: newItem.unit as any || 'sqft',
      rate: newItem.rate || 0,
      total: (newItem.quantity || 1) * (newItem.rate || 0),
    };

    if (editingItem) {
      setData(prev => ({
        ...prev,
        items: prev.items.map(i => i.id === editingItem.id ? item : i)
      }));
    } else {
      setData(prev => ({
        ...prev,
        items: [...prev.items, item]
      }));
    }

    setNewItem({ description: '', quantity: 1, unit: 'sqft', rate: 0 });
    setEditingItem(null);
    setIsAddingItem(false);
  };

  const handleDeleteItem = (id: string) => {
    setData(prev => ({
      ...prev,
      items: prev.items.filter(i => i.id !== id)
    }));
  };

  const handleEditItem = (item: QuoteItem) => {
    setEditingItem(item);
    setNewItem(item);
    setIsAddingItem(true);
  };

  const handleCloneItem = (item: QuoteItem) => {
    const clonedItem: QuoteItem = {
      ...item,
      id: Math.random().toString(36).substr(2, 9),
      description: `${item.description} (Copy)`
    };
    setData(prev => ({
      ...prev,
      items: [...prev.items, clonedItem]
    }));
  };

  const handleDownloadPDF = async (targetRef: React.RefObject<HTMLDivElement | null>) => {
    if (!targetRef.current) return;
    setIsGenerating(true);
    
    try {
      const canvas = await html2canvas(targetRef.current, {
        scale: 3,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        width: 794,
        onclone: (clonedDoc) => {
          const el = clonedDoc.getElementById('quotation-pdf');
          if (el) {
            if (el.parentElement) el.parentElement.style.transform = 'none';
            el.style.boxShadow = 'none';
            el.style.margin = '0';
            el.style.transform = 'none';
          }
        }
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`Quotation_${data.client.name || 'Client'}_${data.client.quoteNumber}.pdf`);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      setShowPreviewModal(false);
    } catch (error) {
      console.error('PDF Generation failed', error);
      alert('Failed to generate PDF.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShareWhatsApp = () => {
    const itemsList = data.items.map((item, index) => 
      `${index + 1}. *${item.description}*\n   ${item.quantity} ${item.unit} x ${formatCurrency(item.rate)} = *${formatCurrency(item.total)}*`
    ).join('\n\n');

    const text = `*QUOTATION: ${COMPANY_DETAILS.name}*\n` +
      `--------------------------------\n` +
      `*Client:* ${data.client.name || 'Valued Customer'}\n` +
      `*Project:* ${data.client.projectType || 'Interior Work'}\n` +
      `*Quote No:* ${data.client.quoteNumber}\n` +
      `*Date:* ${data.client.quoteDate}\n` +
      `--------------------------------\n\n` +
      `*PROJECT ITEMS:*\n` +
      `${itemsList || '_No items added_'}\n\n` +
      `--------------------------------\n` +
      `*Subtotal:* ${formatCurrency(data.subtotal)}\n` +
      (data.showDiscount ? `*Discount (${data.discount}%):* -${formatCurrency(data.discountAmount)}\n` : '') +
      (data.showGST ? `*GST (${data.gst}%):* ${formatCurrency(data.taxAmount)}\n` : '') +
      `*GRAND TOTAL: ${formatCurrency(data.grandTotal)}*\n` +
      (data.advance > 0 ? `*Advance Paid:* ${formatCurrency(data.advance)}\n` : '') +
      (data.balance > 0 ? `*Balance Due:* ${formatCurrency(data.balance)}\n` : '') +
      `--------------------------------\n\n` +
      `*PAYMENT DETAILS:*\n` +
      `Bank: ${COMPANY_DETAILS.bankDetails.bankName}\n` +
      `A/c No: ${COMPANY_DETAILS.bankDetails.accountNumber}\n` +
      `IFSC: ${COMPANY_DETAILS.bankDetails.ifsc}\n` +
      `PhonePe/G-Pay: ${COMPANY_DETAILS.bankDetails.phonePe}\n\n` +
      `_Thank you for choosing ${COMPANY_DETAILS.name}!_`;

    const phone = data.client.phone.replace(/\D/g, '');
    const cleanPhone = phone.startsWith('91') ? phone : (phone.length === 10 ? '91' + phone : phone);
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to start a new quotation?')) {
      setData({
        ...INITIAL_DATA,
        client: { ...INITIAL_CLIENT, quoteNumber: generateQuoteNumber() }
      });
      localStorage.removeItem('luxe_quote_draft');
    }
  };

  const handleDuplicate = () => {
    setData(prev => ({
      ...prev,
      client: { ...prev.client, quoteNumber: generateQuoteNumber(), quoteDate: new Date().toLocaleDateString('en-IN') }
    }));
    alert('Quote duplicated with new number and date.');
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row overflow-hidden bg-stone-50">
      {/* Left Side: Form */}
      <div className="flex-1 overflow-y-auto bg-white border-r border-stone-200 no-print">
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-stone-200 px-4 py-2.5 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-brand-ink rounded flex items-center justify-center text-white font-serif text-base">DP</div>
            <h1 className="text-lg font-serif font-bold tracking-tight">DEE PIESS Quote</h1>
          </div>
          <div className="flex gap-0.5">
            <button onClick={() => fileInputRef.current?.click()} className="p-2 text-stone-400 hover:text-brand-gold hover:bg-stone-50 rounded-lg transition-all active:scale-90" title="Import Project"><Upload size={16} /></button>
            <button onClick={handleExportProject} className="p-2 text-stone-400 hover:text-brand-accent hover:bg-brand-accent/5 rounded-lg transition-all active:scale-90" title="Export Project"><Save size={16} /></button>
            <div className="w-px h-5 bg-stone-200 mx-1 self-center" />
            <button onClick={handleReset} className="p-2 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all active:scale-90" title="Reset"><Trash2 size={16} /></button>
            <button onClick={handleDuplicate} className="p-2 text-stone-400 hover:text-brand-accent hover:bg-brand-accent/5 rounded-lg transition-all active:scale-90" title="Duplicate"><Copy size={16} /></button>
          </div>
          <input type="file" ref={fileInputRef} onChange={handleImportProject} accept=".luxe" className="hidden" />
        </header>

        <main className="p-4 space-y-6 max-w-4xl mx-auto pb-32">
          {/* Client Details */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <User size={14} className="text-brand-gold" />
              <h2 className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-semibold">Client Details</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold ml-1">Client Name</label>
                <input type="text" name="name" value={data.client.name} onChange={handleClientChange} placeholder="Rahul Sharma" className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-accent/10 focus:border-brand-accent transition-all text-sm" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold ml-1">Phone Number</label>
                <input type="tel" name="phone" value={data.client.phone} onChange={handleClientChange} placeholder="+91 98765 43210" className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-accent/10 focus:border-brand-accent transition-all text-sm" />
              </div>
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold ml-1">Site Address</label>
                <textarea name="address" value={data.client.address} onChange={handleClientChange} placeholder="Flat 402, Sky Heights, Worli" rows={2} className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-accent/10 focus:border-brand-accent transition-all resize-none text-sm" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold ml-1">Project Type</label>
                <input type="text" name="projectType" value={data.client.projectType} onChange={handleClientChange} placeholder="3BHK Interior Design" className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-accent/10 focus:border-brand-accent transition-all text-sm" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold ml-1">Quote Number</label>
                <input type="text" name="quoteNumber" value={data.client.quoteNumber} readOnly className="w-full bg-stone-100 border border-stone-200 rounded-lg px-3 py-2 text-stone-500 cursor-not-allowed font-mono text-xs" />
              </div>
            </div>
          </section>

          {/* Project Items */}
          <section className="space-y-3">
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center gap-2">
                <Briefcase size={14} className="text-brand-gold" />
                <h2 className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-semibold">Project Items</h2>
              </div>
              <button onClick={() => setIsAddingItem(true)} className="text-[9px] uppercase tracking-widest font-bold text-brand-accent bg-brand-accent/5 hover:bg-brand-accent/10 px-3 py-1.5 rounded-full flex items-center gap-1 transition-all active:scale-95"><Plus size={10} /> Add Item</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3">
              <AnimatePresence mode="popLayout">
                {data.items.map((item) => (
                  <motion.div key={item.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}>
                    <ItemCard item={item} onDelete={handleDeleteItem} onEdit={handleEditItem} onClone={handleCloneItem} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            {data.items.length === 0 && !isAddingItem && (
              <div onClick={() => setIsAddingItem(true)} className="border-2 border-dashed border-stone-200 rounded-2xl p-8 text-center cursor-pointer hover:border-brand-accent/30 hover:bg-white transition-all group">
                <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-brand-accent/10 transition-colors"><Plus className="text-stone-400 group-hover:text-brand-accent" /></div>
                <p className="text-stone-400 font-medium">No items yet. Click to add your first item.</p>
              </div>
            )}
          </section>

          {/* Summary */}
          <section className="bg-white rounded-xl border border-stone-200 p-4 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <FileText size={14} className="text-brand-gold" />
              <h2 className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-semibold">Summary</h2>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-stone-500">Subtotal</span>
                <span className="font-bold">{formatCurrency(data.subtotal)}</span>
              </div>
              <div className="space-y-3 pt-3 border-t border-stone-100">
                <div className="flex justify-between items-center">
                  <button onClick={() => setData(prev => ({ ...prev, showDiscount: !prev.showDiscount }))} className={`flex items-center gap-2 px-2 py-1 rounded-full transition-all active:scale-95 ${data.showDiscount ? 'bg-emerald-500 text-white shadow-md shadow-emerald-100' : 'bg-stone-100 text-stone-500 hover:bg-stone-200'}`}><div className={`w-1.5 h-1.5 rounded-full ${data.showDiscount ? 'bg-white' : 'bg-stone-300'}`} /><span className="text-[9px] uppercase tracking-widest font-bold">Discount</span></button>
                  {data.showDiscount && (
                    <div className="flex items-center gap-1.5">
                      <input type="number" min="0" max="100" value={data.discount === 0 ? '' : data.discount} onFocus={(e) => e.target.select()} onChange={(e) => setData(prev => ({ ...prev, discount: e.target.value === '' ? 0 : Math.max(0, Math.min(100, Number(e.target.value))) }))} className="w-12 bg-stone-50 border border-stone-200 rounded-lg px-2 py-1 text-right text-xs font-bold outline-none" />
                      <span className="text-stone-400 font-bold text-xs">%</span>
                    </div>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <button onClick={() => setData(prev => ({ ...prev, showGST: !prev.showGST }))} className={`flex items-center gap-2 px-2 py-1 rounded-full transition-all active:scale-95 ${data.showGST ? 'bg-brand-gold text-brand-ink shadow-md shadow-brand-gold/10' : 'bg-stone-100 text-stone-500 hover:bg-stone-200'}`}><div className={`w-1.5 h-1.5 rounded-full ${data.showGST ? 'bg-brand-ink' : 'bg-stone-300'}`} /><span className="text-[9px] uppercase tracking-widest font-bold">GST Tax</span></button>
                  {data.showGST && (
                    <div className="flex items-center gap-1.5">
                      <input type="number" value={data.gst === 0 ? '' : data.gst} onFocus={(e) => e.target.select()} onChange={(e) => setData(prev => ({ ...prev, gst: e.target.value === '' ? 0 : Number(e.target.value) }))} className="w-12 bg-stone-50 border border-stone-200 rounded-lg px-2 py-1 text-right text-xs font-bold outline-none" />
                      <span className="text-stone-400 font-bold text-xs">%</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="pt-3 border-t border-stone-100 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-stone-400 font-bold mb-0.5">Grand Total</p>
                  <p className="text-2xl font-sans font-bold tracking-tight text-brand-ink leading-none">{formatCurrency(data.grandTotal)}</p>
                </div>
                <div className="text-right space-y-1.5 w-full sm:w-auto">
                  <div className="flex items-center gap-2 justify-end">
                    <span className="text-[9px] uppercase tracking-widest font-bold text-stone-400">Advance</span>
                    <div className="flex items-center gap-1">
                      <span className="text-stone-300 text-xs">₹</span>
                      <input type="number" min="0" value={data.advance === 0 ? '' : data.advance} onFocus={(e) => e.target.select()} onChange={(e) => setData(prev => ({ ...prev, advance: e.target.value === '' ? 0 : Math.max(0, Number(e.target.value)) }))} className="w-20 bg-stone-50 border border-stone-200 rounded-lg px-2 py-1 text-right text-xs font-bold outline-none" />
                    </div>
                  </div>
                  <div className="flex justify-end"><div className="bg-brand-accent/5 px-2 py-0.5 rounded"><p className="text-[9px] font-bold text-brand-accent uppercase tracking-wider">Balance: {formatCurrency(data.balance)}</p></div></div>
                </div>
                <div className="pt-4 border-t border-stone-100 w-full">
                  <button onClick={handleExportProject} className="w-full bg-stone-50 border border-stone-200 text-stone-600 rounded-lg py-2 font-bold text-[10px] flex items-center justify-center gap-2 hover:bg-white hover:border-brand-gold hover:text-brand-gold transition-all active:scale-[0.98]"><Save size={12} /> Save Project for Future Edit</button>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Floating Action Bar */}
        <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-white/90 backdrop-blur-xl border-t border-stone-200 p-3 pb-6 flex gap-2 z-30 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
          <button onClick={() => fileInputRef.current?.click()} className="w-11 h-11 bg-stone-100 text-stone-500 rounded-xl flex items-center justify-center shadow-sm active:scale-[0.98] transition-all"><Upload size={18} /></button>
          <button onClick={() => setShowPreviewModal(true)} className="flex-1 bg-brand-ink text-white rounded-xl py-3 font-bold flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-all text-sm"><FileText size={18} /> Preview</button>
          <button onClick={handleShareWhatsApp} className="w-11 h-11 bg-emerald-500 text-white rounded-xl flex items-center justify-center shadow-lg active:scale-[0.98] transition-all"><Share2 size={18} /></button>
        </div>
      </div>

      {/* Right Side: PDF Preview (Desktop) */}
      <div className="hidden lg:block flex-1 overflow-auto relative bg-stone-200 scrollbar-hide">
        <div className="sticky top-0 z-10 w-full bg-stone-200/60 backdrop-blur-md p-6 flex justify-between items-center gap-4">
          <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-2xl border border-stone-200 shadow-sm">
            <button onClick={() => setZoom(prev => Math.max(0.4, prev - 0.1))} className="p-1 hover:bg-stone-100 rounded-lg transition-colors text-stone-500"><Minus size={16} /></button>
            <span className="text-xs font-bold text-stone-600 w-12 text-center">{Math.round(zoom * 100)}%</span>
            <button onClick={() => setZoom(prev => Math.min(1.5, prev + 0.1))} className="p-1 hover:bg-stone-100 rounded-lg transition-colors text-stone-500"><Plus size={16} /></button>
          </div>
          <div className="flex gap-4">
            <button onClick={() => handleDownloadPDF(pdfRef)} disabled={isGenerating} className="bg-brand-ink text-white px-10 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-2xl hover:bg-brand-ink/90 transition-all disabled:opacity-50 active:scale-[0.98] group">{isGenerating ? 'Generating...' : <><Download size={20} /> Generate PDF</>}</button>
            <button onClick={handleShareWhatsApp} className="bg-white text-brand-ink px-8 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-lg hover:bg-stone-50 transition-all border border-stone-200 active:scale-[0.98]"><Share2 size={20} /> Share</button>
          </div>
        </div>
        <div className="pb-24 flex justify-center">
          <div style={{ transform: `scale(${zoom})`, transformOrigin: 'top center', transition: 'transform 0.2s ease-out' }}><PDFPreview data={data} ref={pdfRef} /></div>
        </div>
      </div>

      {/* Mobile Preview Modal */}
      <AnimatePresence>
        {showPreviewModal && (
          <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed inset-0 z-[60] bg-stone-100 flex flex-col">
            <div className="bg-white border-b border-stone-200 px-4 py-3 flex justify-between items-center shadow-sm">
              <div className="flex items-center gap-2"><div className="w-7 h-7 bg-brand-ink rounded flex items-center justify-center text-white"><FileText size={16} /></div><span className="font-serif text-base font-bold tracking-tight text-brand-ink">Preview</span></div>
              <button onClick={() => setShowPreviewModal(false)} className="px-3 py-1.5 bg-stone-100 text-stone-600 rounded-lg text-xs font-bold active:scale-95 transition-all">Done</button>
            </div>
            <div className="flex-1 overflow-auto bg-stone-200/50 p-4 flex flex-col items-center scrollbar-hide">
              <div className="sticky top-0 z-10 mb-4 flex items-center gap-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-stone-200 shadow-sm">
                <button onClick={() => setMobileZoom(prev => Math.max(0.2, prev - 0.05))} className="p-1 hover:bg-stone-100 rounded-full transition-colors text-stone-400"><Minus size={16} /></button>
                <span className="text-[10px] font-bold text-stone-600 w-10 text-center">{Math.round(mobileZoom * 100)}%</span>
                <button onClick={() => setMobileZoom(prev => Math.min(1.2, prev + 0.05))} className="p-1 hover:bg-stone-100 rounded-full transition-colors text-stone-400"><Plus size={16} /></button>
              </div>
              <div style={{ transform: `scale(${mobileZoom})`, transformOrigin: 'top center', transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)' }} className="shadow-2xl mb-20"><PDFPreview data={data} ref={modalPdfRef} /></div>
            </div>
            <div className="bg-white border-t border-stone-200 p-4 pb-8 flex flex-col gap-3 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
              <div className="flex gap-2">
                <button onClick={() => handleDownloadPDF(modalPdfRef)} disabled={isGenerating} className="flex-1 bg-brand-ink text-white rounded-xl py-3.5 font-bold text-sm flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-all disabled:opacity-50">{isGenerating ? 'Generating...' : <><Download size={18} /> Download PDF</>}</button>
                <button onClick={handleShareWhatsApp} className="w-12 h-12 bg-emerald-500 text-white rounded-xl flex items-center justify-center shadow-lg active:scale-[0.98] transition-all"><Share2 size={20} /></button>
              </div>
              <button onClick={handleExportProject} className="w-full bg-stone-50 text-stone-500 rounded-lg py-2 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all border border-stone-100"><Save size={12} /> Save Project (.luxe)</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add/Edit Item Modal */}
      <AnimatePresence>
        {isAddingItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsAddingItem(false)} className="absolute inset-0 bg-brand-ink/60 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
              <div className="px-6 py-4 border-b border-stone-100 flex justify-between items-center shrink-0">
                <h3 className="text-lg font-serif font-bold tracking-tight">{editingItem ? 'Edit Item' : 'Add New Item'}</h3>
                <button onClick={() => setIsAddingItem(false)} className="p-2 text-stone-400 hover:text-stone-600 hover:bg-stone-100 rounded-full transition-all"><X size={20} /></button>
              </div>
              <div className="p-6 space-y-4 overflow-y-auto">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold ml-1">Description</label>
                  <textarea autoFocus value={newItem.description} onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))} placeholder="e.g. Italian Marble Flooring" rows={3} className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-accent/10 focus:border-brand-accent transition-all resize-none text-sm" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold ml-1">Quantity</label>
                    <input type="number" value={newItem.quantity === 0 ? '' : newItem.quantity} onFocus={(e) => e.target.select()} onChange={(e) => setNewItem(prev => ({ ...prev, quantity: e.target.value === '' ? 0 : Number(e.target.value) }))} className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold ml-1">Unit</label>
                    <select value={newItem.unit} onChange={(e) => setNewItem(prev => ({ ...prev, unit: e.target.value as any }))} className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-sm appearance-none"><option value="sqft">sqft</option><option value="rft">rft</option><option value="nos">nos</option><option value="set">set</option><option value="ls">ls</option></select>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold ml-1">Rate (₹)</label>
                  <input type="number" value={newItem.rate === 0 ? '' : newItem.rate} onFocus={(e) => e.target.select()} onChange={(e) => setNewItem(prev => ({ ...prev, rate: e.target.value === '' ? 0 : Number(e.target.value) }))} placeholder="0.00" className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-sm font-medium" />
                </div>
                <div className="pt-4 flex justify-between items-center border-t border-stone-100">
                  <div className="text-left"><p className="text-[9px] uppercase tracking-widest text-stone-400 font-bold mb-0.5">Item Total</p><p className="text-xl font-bold text-brand-accent">{formatCurrency((newItem.quantity || 0) * (newItem.rate || 0))}</p></div>
                  <button onClick={handleAddItem} disabled={!newItem.description || !newItem.rate} className="bg-brand-ink text-white px-6 py-2.5 rounded-lg font-bold shadow-md hover:bg-brand-ink/90 transition-all disabled:opacity-50 active:scale-95 text-sm">{editingItem ? 'Update Item' : 'Add to Quote'}</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
