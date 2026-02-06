import { useState } from 'react';

interface Props {
  onAdd: (name: string, description: string) => void;
  acceptButtonText: string;
}

export default function NewItem({ onAdd, acceptButtonText }: Props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(name, description);
  };

  return (
    <div className="mx-auto max-w-7xl p-6 lg:px-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Name</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} className="border p-2 w-full" required />
        </div>
        <div>
          <label className="block">Description</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} className="border p-2 w-full" required />
        </div>
        <button type="submit" className="bg-primary px-4 py-2 rounded">{acceptButtonText}</button>
      </form>
    </div>
  );
}