import React from 'react';
import { QuoteItem } from '../types';
import { Trash2, Edit3, Copy } from 'lucide-react';
import { formatCurrency } from '../utils';

interface ItemCardProps {
  item: QuoteItem;
  onDelete: (id: string) => void;
  onEdit: (item: QuoteItem) => void;
  onClone: (item: QuoteItem) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onDelete, onEdit, onClone }) => {
  return (
    <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-shadow group">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium text-brand-ink leading-tight">{item.description}</h4>
        <div className="flex gap-1 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => onClone(item)}
            className="p-1.5 text-stone-400 hover:text-brand-gold hover:bg-stone-50 rounded-lg transition-all active:scale-90"
            title="Clone Item"
          >
            <Copy size={12} />
          </button>
          <button 
            onClick={() => onEdit(item)}
            className="p-1.5 text-stone-400 hover:text-brand-accent hover:bg-stone-50 rounded-lg transition-all active:scale-90"
            title="Edit Item"
          >
            <Edit3 size={12} />
          </button>
          <button 
            onClick={() => onDelete(item.id)}
            className="p-1.5 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all active:scale-90"
            title="Delete Item"
          >
            <Trash2 size={12} />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 text-sm">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-stone-400 mb-0.5">Qty</p>
          <p className="font-medium">{item.quantity} <span className="text-stone-400 text-[10px]">{item.unit}</span></p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-stone-400 mb-0.5">Rate</p>
          <p className="font-medium">{formatCurrency(item.rate)}</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-wider text-stone-400 mb-0.5">Total</p>
          <p className="font-bold text-brand-accent">{formatCurrency(item.total)}</p>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
