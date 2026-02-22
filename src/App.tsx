import React, { useState, useEffect, useRef, useMemo } from 'react';
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
  MapPin, 
  Phone, 
  Briefcase,
  ChevronRight,
  Save,
  Copy,
  Check,
  X
} from 'lucide-react';
import { QuoteData, QuoteItem, ClientDetails } from './types';
import { generateQuoteNumber, formatCurrency, cn } from './utils';
import { COMPANY_DETAILS } from './constants';
import ItemCard from './components/ItemCard';
import PDFPreview from './components/PDFPreview';
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

export default function App() {
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
  const pdfRef = useRef<HTMLDivElement>(null);
  const modalPdfRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
        
        // Check if it looks like a PDF (PDFs start with %PDF)
        if (content.startsWith('%PDF')) {
          alert('Error: You are trying to upload a PDF file. \n\nPlease upload the ".luxe" project file that you saved earlier. PDFs cannot be edited back into the form.');
          return;
        }

        const importedData = JSON.parse(content);
        // Basic validation
        if (importedData.client && importedData.items) {
          setData(importedData);
          alert('Project imported successfully!');
        } else {
          throw new Error('Invalid project file structure');
        }
      } catch (error) {
        console.error('Import failed', error);
        alert('Failed to import project. \n\nMake sure you are uploading the ".luxe" file you downloaded using the "Save Project" button. \n\nNote: You cannot upload the PDF file here.');
      }
    };
    reader.readAsText(file);
    // Reset input
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
        width: 794, // 210mm at 96dpi
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
      alert('Failed to generate PDF. Please try again.');
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
      `_Thank you for choosing Luxe Interior Designs!_`;

    const phone = data.client.phone.replace(/\D/g, '');
    const cleanPhone = phone.startsWith('91') ? phone : (phone.length === 10 ? '91' + phone : phone);
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to start a new quotation? All current data will be lost.')) {
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
    <div className="min-h-screen flex flex-col lg:flex-row overflow-hidden">
      {/* Left Side: Form (Scrollable) */}
      <div className="flex-1 overflow-y-auto bg-brand-bg border-r border-stone-200 no-print">
        <header className="sticky top-0 z-20 bg-brand-bg/80 backdrop-blur-md border-b border-stone-200 px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-brand-ink rounded-lg flex items-center justify-center text-white font-serif text-lg">AS</div>
            <h1 className="text-xl font-serif font-bold tracking-tight">LuxeQuote</h1>
          </div>
          <div className="flex gap-1">
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="p-2.5 text-stone-400 hover:text-brand-gold hover:bg-stone-50 rounded-xl transition-all active:scale-90"
              title="Import Project (.luxe)"
            >
              <Upload size={18} />
            </button>
            <button 
              onClick={handleExportProject}
              className="p-2.5 text-stone-400 hover:text-brand-accent hover:bg-brand-accent/5 rounded-xl transition-all active:scale-90"
              title="Export Project (.luxe)"
            >
              <Save size={18} />
            </button>
            <div className="w-px h-6 bg-stone-200 mx-1 self-center" />
            <button 
              onClick={handleReset}
              className="p-2.5 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all active:scale-90"
              title="Reset"
            >
              <Trash2 size={18} />
            </button>
            <button 
              onClick={handleDuplicate}
              className="p-2.5 text-stone-400 hover:text-brand-accent hover:bg-brand-accent/5 rounded-xl transition-all active:scale-90"
              title="Duplicate"
            >
              <Copy size={18} />
            </button>
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImportProject} 
            accept=".luxe" 
            className="hidden" 
          />
        </header>

        <main className="p-6 space-y-8 max-w-4xl mx-auto pb-32">
          {/* Section A: Client Details */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <User size={16} className="text-brand-gold" />
              <h2 className="text-xs uppercase tracking-[0.2em] text-stone-400 font-semibold">Client Details</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-[0.2em] text-stone-400 font-bold ml-1">Client Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={data.client.name}
                  onChange={handleClientChange}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full bg-white border border-stone-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-4 focus:ring-brand-accent/10 focus:border-brand-accent transition-all text-lg"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-[0.2em] text-stone-400 font-bold ml-1">Phone Number</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={data.client.phone}
                  onChange={handleClientChange}
                  placeholder="e.g. +91 98765 43210"
                  className="w-full bg-white border border-stone-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-4 focus:ring-brand-accent/10 focus:border-brand-accent transition-all text-lg"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-[11px] uppercase tracking-[0.2em] text-stone-400 font-bold ml-1">Site Address</label>
                <textarea 
                  name="address"
                  value={data.client.address}
                  onChange={handleClientChange}
                  placeholder="e.g. Flat 402, Sky Heights, Worli"
                  rows={2}
                  className="w-full bg-white border border-stone-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-4 focus:ring-brand-accent/10 focus:border-brand-accent transition-all resize-none text-lg"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-[0.2em] text-stone-400 font-bold ml-1">Project Type</label>
                <input 
                  type="text" 
                  name="projectType"
                  value={data.client.projectType}
                  onChange={handleClientChange}
                  placeholder="e.g. 3BHK Interior Design"
                  className="w-full bg-white border border-stone-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-4 focus:ring-brand-accent/10 focus:border-brand-accent transition-all text-lg"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-[0.2em] text-stone-400 font-bold ml-1">Quote Number</label>
                <input 
                  type="text" 
                  name="quoteNumber"
                  value={data.client.quoteNumber}
                  readOnly
                  className="w-full bg-stone-100 border border-stone-200 rounded-2xl px-5 py-4 text-stone-500 cursor-not-allowed font-mono text-sm"
                />
              </div>
            </div>
          </section>

          {/* Section B: Add Items */}
          <section className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <Briefcase size={16} className="text-brand-gold" />
                <h2 className="text-xs uppercase tracking-[0.2em] text-stone-400 font-semibold">Project Items</h2>
              </div>
              <button 
                onClick={() => setIsAddingItem(true)}
                className="text-[10px] uppercase tracking-widest font-bold text-brand-accent bg-brand-accent/5 hover:bg-brand-accent/10 px-4 py-2 rounded-full flex items-center gap-1.5 transition-all active:scale-95"
              >
                <Plus size={12} /> Add Item
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3">
              <AnimatePresence mode="popLayout">
                {data.items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    <ItemCard 
                      item={item} 
                      onDelete={handleDeleteItem} 
                      onEdit={handleEditItem}
                      onClone={handleCloneItem}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            {data.items.length === 0 && !isAddingItem && (
              <div className="space-y-4">
                <div 
                  onClick={() => setIsAddingItem(true)}
                  className="border-2 border-dashed border-stone-200 rounded-2xl p-8 text-center cursor-pointer hover:border-brand-accent/30 hover:bg-white transition-all group"
                >
                  <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-brand-accent/10 transition-colors">
                    <Plus className="text-stone-400 group-hover:text-brand-accent" />
                  </div>
                  <p className="text-stone-400 font-medium">No items yet. Click to add your first item.</p>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="h-px bg-stone-200 flex-1" />
                  <span className="text-[10px] uppercase tracking-widest text-stone-300 font-bold">Or</span>
                  <div className="h-px bg-stone-200 flex-1" />
                </div>

                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full border border-stone-200 rounded-2xl p-4 text-center hover:bg-white transition-all flex items-center justify-center gap-2 text-stone-500 font-medium group"
                >
                  <Upload size={16} className="text-stone-400 group-hover:text-brand-gold transition-colors" />
                  Import existing project (.luxe)
                </button>
              </div>
            )}
          </section>

          {/* Section C: Summary */}
          <section className="bg-white rounded-2xl border border-stone-200 p-6 space-y-6 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <FileText size={16} className="text-brand-gold" />
              <h2 className="text-xs uppercase tracking-[0.2em] text-stone-400 font-semibold">Summary</h2>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-stone-500">Subtotal</span>
                <span className="font-bold">{formatCurrency(data.subtotal)}</span>
              </div>

              <div className="space-y-4 pt-4 border-t border-stone-100">
                <div className="flex justify-between items-center">
                  <button 
                    onClick={() => setData(prev => ({ ...prev, showDiscount: !prev.showDiscount }))}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all active:scale-95 ${data.showDiscount ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-100' : 'bg-stone-100 text-stone-500 hover:bg-stone-200'}`}
                  >
                    <div className={`w-2 h-2 rounded-full ${data.showDiscount ? 'bg-white' : 'bg-stone-300'}`} />
                    <span className="text-[10px] uppercase tracking-widest font-bold">Discount</span>
                  </button>
                  {data.showDiscount && (
                    <div className="flex items-center gap-2">
                      <input 
                        type="number" 
                        value={data.discount}
                        onChange={(e) => setData(prev => ({ ...prev, discount: Number(e.target.value) }))}
                        className="w-16 bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-right text-sm font-bold focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                      />
                      <span className="text-stone-400 font-bold">%</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <button 
                    onClick={() => setData(prev => ({ ...prev, showGST: !prev.showGST }))}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all active:scale-95 ${data.showGST ? 'bg-brand-gold text-brand-ink shadow-lg shadow-brand-gold/10' : 'bg-stone-100 text-stone-500 hover:bg-stone-200'}`}
                  >
                    <div className={`w-2 h-2 rounded-full ${data.showGST ? 'bg-brand-ink' : 'bg-stone-300'}`} />
                    <span className="text-[10px] uppercase tracking-widest font-bold">GST Tax</span>
                  </button>
                  {data.showGST && (
                    <div className="flex items-center gap-2">
                      <input 
                        type="number" 
                        value={data.gst}
                        onChange={(e) => setData(prev => ({ ...prev, gst: Number(e.target.value) }))}
                        className="w-16 bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-right text-sm font-bold focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold outline-none transition-all"
                      />
                      <span className="text-stone-400 font-bold">%</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-1">Grand Total</p>
                  <p className="text-3xl font-serif font-bold text-brand-ink">{formatCurrency(data.grandTotal)}</p>
                </div>
                <div className="text-right space-y-2 w-full sm:w-auto">
                  <div className="flex items-center gap-3 justify-end">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-stone-400">Advance</span>
                    <div className="flex items-center gap-1">
                      <span className="text-stone-300 text-sm">₹</span>
                      <input 
                        type="number" 
                        value={data.advance}
                        onChange={(e) => setData(prev => ({ ...prev, advance: Number(e.target.value) }))}
                        className="w-24 bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-right text-sm font-bold focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-brand-accent/5 px-3 py-1 rounded-lg">
                      <p className="text-[10px] font-bold text-brand-accent uppercase tracking-wider">
                        Balance: {formatCurrency(data.balance)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-stone-100">
                  <button 
                    onClick={handleExportProject}
                    className="w-full bg-stone-50 border border-stone-200 text-stone-600 rounded-2xl py-4 font-bold flex items-center justify-center gap-2 hover:bg-white hover:border-brand-gold hover:text-brand-gold transition-all active:scale-[0.98]"
                  >
                    <Save size={18} /> Save Project for Future Edit
                  </button>
                  <p className="text-[10px] text-stone-400 text-center mt-3 italic">
                    Downloads a .luxe file that you can upload later to edit this quotation.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Floating Action Bar (Mobile & Tablet) */}
        <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-white/90 backdrop-blur-2xl border-t border-stone-200 p-4 pb-8 flex gap-3 z-30 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="w-14 h-14 bg-stone-100 text-stone-500 rounded-2xl flex items-center justify-center shadow-lg active:scale-[0.98] transition-all"
            title="Import Project"
          >
            <Upload size={20} />
          </button>
          <button 
            onClick={() => setShowPreviewModal(true)}
            className="flex-1 bg-brand-ink text-white rounded-2xl py-4 font-bold flex items-center justify-center gap-2 shadow-xl active:scale-[0.98] transition-all hover:bg-brand-ink/90"
          >
            <FileText size={20} /> Preview
          </button>
          <button 
            onClick={handleShareWhatsApp}
            className="w-14 h-14 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shadow-xl active:scale-[0.98] transition-all hover:bg-emerald-600"
          >
            <Share2 size={20} />
          </button>
        </div>
      </div>

      {/* Right Side: PDF Preview (Desktop Only) */}
      <div className="hidden lg:block flex-1 overflow-auto relative bg-stone-200 scrollbar-hide">
        <div className="sticky top-0 z-10 w-full bg-stone-200/60 backdrop-blur-md p-6 flex justify-between items-center gap-4">
          <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-2xl border border-stone-200 shadow-sm">
            <button 
              onClick={() => setZoom(prev => Math.max(0.4, prev - 0.1))}
              className="p-1 hover:bg-stone-100 rounded-lg transition-colors text-stone-500"
            >
              <Minus size={16} />
            </button>
            <span className="text-xs font-bold text-stone-600 w-12 text-center">{Math.round(zoom * 100)}%</span>
            <button 
              onClick={() => setZoom(prev => Math.min(1.5, prev + 0.1))}
              className="p-1 hover:bg-stone-100 rounded-lg transition-colors text-stone-500"
            >
              <Plus size={16} />
            </button>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={() => handleDownloadPDF(pdfRef)}
              disabled={isGenerating}
              className="bg-brand-ink text-white px-10 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-2xl hover:bg-brand-ink/90 transition-all disabled:opacity-50 active:scale-[0.98] group"
            >
              {isGenerating ? (
                <span className="flex items-center gap-2">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  />
                  Generating...
                </span>
              ) : (
                <>
                  <Download size={20} className="group-hover:translate-y-0.5 transition-transform" /> 
                  Generate PDF
                </>
              )}
            </button>
            <button 
              onClick={handleShareWhatsApp}
              className="bg-white text-brand-ink px-8 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-lg hover:bg-stone-50 transition-all border border-stone-200 active:scale-[0.98]"
            >
              <Share2 size={20} /> Share
            </button>
          </div>
        </div>

        <div className="pb-24 flex justify-center">
          <div style={{ transform: `scale(${zoom})`, transformOrigin: 'top center', transition: 'transform 0.2s ease-out' }}>
            <PDFPreview data={data} ref={pdfRef} />
          </div>
        </div>

        <AnimatePresence>
          {showSuccess && (
            <motion.div 
              initial={{ opacity: 0, y: 20, x: '-50%' }}
              animate={{ opacity: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0, y: 20, x: '-50%' }}
              className="fixed bottom-10 left-1/2 bg-emerald-600 text-white px-8 py-4 rounded-2xl flex items-center gap-3 shadow-2xl z-50 font-medium"
            >
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                <Check size={14} />
              </div>
              Quotation generated successfully
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Full Screen Preview Modal (Mobile/Tablet) */}
      <AnimatePresence>
        {showPreviewModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-stone-900 flex flex-col"
          >
            <div className="bg-stone-900/80 backdrop-blur-md text-white p-5 flex justify-between items-center border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-brand-gold rounded-lg flex items-center justify-center text-brand-ink">
                  <FileText size={18} />
                </div>
                <span className="font-serif text-lg font-medium tracking-tight">Quotation Preview</span>
              </div>
              <button 
                onClick={() => setShowPreviewModal(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors active:scale-90"
              >
                <X size={28} />
              </button>
            </div>
            
            <div className="flex-1 overflow-auto bg-stone-800 p-6 flex flex-col items-center">
              <div className="mb-6 flex items-center gap-4 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                <button 
                  onClick={() => setZoom(prev => Math.max(0.3, prev - 0.1))}
                  className="p-1 hover:bg-white/10 rounded-full transition-colors text-white/70"
                >
                  <Minus size={20} />
                </button>
                <span className="text-sm font-bold text-white w-16 text-center">{Math.round(zoom * 100)}%</span>
                <button 
                  onClick={() => setZoom(prev => Math.min(1.2, prev + 0.1))}
                  className="p-1 hover:bg-white/10 rounded-full transition-colors text-white/70"
                >
                  <Plus size={20} />
                </button>
              </div>
              <div style={{ transform: `scale(${zoom})`, transformOrigin: 'top center', transition: 'transform 0.2s ease-out' }} className="shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
                <PDFPreview data={data} ref={modalPdfRef} />
              </div>
            </div>

            <div className="bg-stone-900/90 backdrop-blur-xl p-6 pb-10 flex flex-col gap-4 border-t border-white/10">
              <div className="flex gap-4">
                <button 
                  onClick={() => handleDownloadPDF(modalPdfRef)}
                  disabled={isGenerating}
                  className="flex-1 bg-brand-gold text-brand-ink rounded-2xl py-5 font-bold text-lg flex items-center justify-center gap-3 shadow-2xl active:scale-[0.98] transition-all disabled:opacity-50"
                >
                  {isGenerating ? 'Generating...' : <><Download size={24} /> Download PDF</>}
                </button>
                <button 
                  onClick={handleShareWhatsApp}
                  className="w-20 h-20 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shadow-2xl active:scale-[0.98] transition-all hover:bg-emerald-600"
                >
                  <Share2 size={32} />
                </button>
              </div>
              
              <button 
                onClick={handleExportProject}
                className="w-full bg-white/10 hover:bg-white/20 text-white/80 rounded-xl py-3 text-sm font-medium flex items-center justify-center gap-2 transition-all border border-white/5"
              >
                <Save size={16} /> Save Editable Project (.luxe)
              </button>
              <p className="text-[10px] text-white/40 text-center italic">
                Save the .luxe file if you want to edit this quotation later.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add/Edit Item Modal */}
      <AnimatePresence>
        {isAddingItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddingItem(false)}
              className="absolute inset-0 bg-brand-ink/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-stone-100 flex justify-between items-center">
                <h3 className="text-2xl font-serif font-bold tracking-tight">{editingItem ? 'Edit Item' : 'Add New Item'}</h3>
                <button 
                  onClick={() => setIsAddingItem(false)}
                  className="p-3 text-stone-400 hover:text-stone-600 hover:bg-stone-100 rounded-full transition-all"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-[0.2em] text-stone-400 font-bold ml-1">Description</label>
                  <textarea 
                    autoFocus
                    value={newItem.description}
                    onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="e.g. Italian Marble Flooring with Polishing"
                    rows={3}
                    className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-4 focus:ring-brand-accent/10 focus:border-brand-accent transition-all resize-none text-lg"
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-[0.2em] text-stone-400 font-bold ml-1">Quantity</label>
                    <input 
                      type="number" 
                      value={newItem.quantity}
                      onChange={(e) => setNewItem(prev => ({ ...prev, quantity: Number(e.target.value) }))}
                      className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-4 focus:ring-brand-accent/10 focus:border-brand-accent transition-all text-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-[0.2em] text-stone-400 font-bold ml-1">Unit</label>
                    <div className="relative">
                      <select 
                        value={newItem.unit}
                        onChange={(e) => setNewItem(prev => ({ ...prev, unit: e.target.value as any }))}
                        className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-4 focus:ring-brand-accent/10 focus:border-brand-accent transition-all appearance-none text-lg"
                      >
                        <option value="sqft">sqft</option>
                        <option value="rft">rft</option>
                        <option value="nos">nos</option>
                        <option value="set">set</option>
                        <option value="ls">ls</option>
                      </select>
                      <ChevronRight className="absolute right-5 top-1/2 -translate-y-1/2 rotate-90 text-stone-400 pointer-events-none" size={20} />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-[0.2em] text-stone-400 font-bold ml-1">Rate (₹)</label>
                  <input 
                    type="number" 
                    value={newItem.rate}
                    onChange={(e) => setNewItem(prev => ({ ...prev, rate: Number(e.target.value) }))}
                    placeholder="0.00"
                    className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-4 focus:ring-brand-accent/10 focus:border-brand-accent transition-all text-lg font-medium"
                  />
                </div>
                <div className="pt-6 flex justify-between items-center border-t border-stone-100">
                  <div className="text-left">
                    <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-1">Item Total</p>
                    <p className="text-2xl font-bold text-brand-accent">{formatCurrency((newItem.quantity || 0) * (newItem.rate || 0))}</p>
                  </div>
                  <button 
                    onClick={handleAddItem}
                    disabled={!newItem.description || !newItem.rate}
                    className="bg-brand-ink text-white px-10 py-4 rounded-2xl font-bold shadow-xl hover:bg-brand-ink/90 transition-all disabled:opacity-50 active:scale-95"
                  >
                    {editingItem ? 'Update Item' : 'Add to Quote'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
