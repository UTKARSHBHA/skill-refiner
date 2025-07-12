'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('email', email);

    setLoading(true);

    try {
      const res = await fetch('http://localhost:3001/tasks/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error('Error uploading:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Upload Resume</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="file"
          accept=".pdf,.docx"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Uploading...' : 'Submit'}
        </Button>
      </form>

      {result && (
        <div className="mt-6 p-4 border rounded bg-muted text-sm">
          <h2 className="font-semibold mb-2">AI Feedback:</h2>
          <p>{result?.feedback?.content}</p>
        </div>
      )}
    </div>
  );
}
