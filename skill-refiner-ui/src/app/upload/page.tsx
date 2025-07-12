'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

export default function ResumeUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) return toast.error('Please upload a file');
    setLoading(true);
    toast.loading('Uploading and generating feedback...');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('email', email || 'anonymous@demo.com');

    try {
      const res = await fetch('http://localhost:3001/tasks/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Upload failed');

      setFeedback(data.feedback?.content || '');
      toast.dismiss();
      toast.success('Feedback generated successfully!');
    } catch (err: any) {
      toast.dismiss();
      toast.error(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 border rounded-lg shadow">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="file"
          accept=".pdf,.docx"
          className="w-full border p-2 rounded"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Upload & Generate Feedback'}
        </button>
      </form>

      {feedback && (
        <div className="mt-6 whitespace-pre-line bg-gray-100 p-4 rounded text-sm">
          <h2 className="font-bold mb-2">Feedback:</h2>
          <p>{feedback}</p>
        </div>
      )}
    </div>
  );
}
