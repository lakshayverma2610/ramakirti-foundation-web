'use client';

import { useState } from 'react';
import { logoutAction, makeTestimonialAction, removeTestimonialAction, createInitiativeAction, deleteInitiativeAction, sendReplyAction } from './actions';
import { useRouter } from 'next/navigation';

export default function AdminDashboard({ messages, initiatives }: { messages: any[], initiatives: any[] }) {
  const [activeTab, setActiveTab] = useState<'messages' | 'testimonials' | 'initiatives'>('messages');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [replyModal, setReplyModal] = useState<{ isOpen: boolean, email: string, name: string, subject: string, status: 'idle' | 'sending' | 'success' | 'error' }>({
    isOpen: false, email: '', name: '', subject: '', status: 'idle'
  });
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const router = useRouter();

  async function handleToggleTestimonial(id: string, currentStatus: boolean) {
    setLoadingId(id);
    try {
      if (currentStatus) {
        await removeTestimonialAction(id);
      } else {
        await makeTestimonialAction(id);
      }
      router.refresh();
    } finally {
      setLoadingId(null);
    }
  }

  async function handleDeleteInitiative(id: string) {
    setLoadingId(id);
    try {
      await deleteInitiativeAction(id);
      router.refresh();
    } finally {
      setLoadingId(null);
    }
  }

  return (
      <div className="max-w-6xl mx-auto p-6 mt-6">
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('messages')}
            className={`px-6 py-3 rounded-lg font-bold transition-colors ${activeTab === 'messages' ? 'bg-[#6E1110] text-white shadow-md' : 'bg-white text-gray-600 border hover:bg-gray-50'}`}
          >
            Contact Messages
          </button>
          <button
            onClick={() => setActiveTab('testimonials')}
            className={`px-6 py-3 rounded-lg font-bold transition-colors ${activeTab === 'testimonials' ? 'bg-[#6E1110] text-white shadow-md' : 'bg-white text-gray-600 border hover:bg-gray-50'}`}
          >
            Testimonials
          </button>
          <button
            onClick={() => setActiveTab('initiatives')}
            className={`px-6 py-3 rounded-lg font-bold transition-colors ${activeTab === 'initiatives' ? 'bg-[#6E1110] text-white shadow-md' : 'bg-white text-gray-600 border hover:bg-gray-50'}`}
          >
            Manage Initiatives
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {activeTab === 'messages' && (
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">Contact Form Submissions</h2>
              {messages.filter(m => !m.is_testimonial && !(m.subject || '').startsWith('[Testimonial Submission]') && m.email !== 'testimonial@ramakirtifoundation.co.in').length === 0 ? <p className="text-gray-500">No contact messages yet.</p> : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b">
                        <th className="p-4 font-semibold text-gray-600">Name / Email</th>
                        <th className="p-4 font-semibold text-gray-600 w-1/2">Message</th>
                        <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {messages.filter(m => !m.is_testimonial && !(m.subject || '').startsWith('[Testimonial Submission]') && m.email !== 'testimonial@ramakirtifoundation.co.in').map(msg => (
                        <tr key={msg.id} className="border-b last:border-0 hover:bg-gray-50 transition-colors">
                          <td className="p-4 align-top">
                            <div className="font-bold text-gray-800">{msg.name}</div>
                            <div className="text-xs text-gray-500 mb-1">{msg.email}</div>
                            {msg.phone && <div className="text-xs text-gray-500">Phone: {msg.phone}</div>}
                          </td>
                          <td className="p-4 align-top">
                            <p className="text-gray-700 whitespace-pre-wrap">{msg.message}</p>
                          </td>
                          <td className="p-4 align-top text-right space-y-2">
                            <div>
                              <button 
                                onClick={() => setReplyModal({
                                  isOpen: true,
                                  email: msg.email,
                                  name: msg.name,
                                  subject: `Re: Your message to Ramakirti Foundation`,
                                  status: 'idle'
                                })}
                                className="inline-block bg-blue-100 text-blue-700 hover:bg-blue-200 px-4 py-2 rounded-lg font-semibold text-xs transition-colors whitespace-nowrap w-full text-center"
                              >
                                ✉️ Reply In-App
                              </button>
                            </div>
                            <div>
                              {msg.is_testimonial ? (
                                <button 
                                  onClick={() => handleToggleTestimonial(msg.id, msg.is_testimonial)}
                                  disabled={loadingId === msg.id}
                                  className="bg-green-100 text-green-700 hover:bg-green-200 px-4 py-2 rounded-lg font-semibold text-xs transition-colors whitespace-nowrap w-full disabled:opacity-50"
                                >
                                  {loadingId === msg.id ? 'Processing...' : '✓ Testimonial Added'}
                                </button>
                              ) : (
                                <button 
                                  onClick={() => handleToggleTestimonial(msg.id, msg.is_testimonial)}
                                  disabled={loadingId === msg.id}
                                  className="bg-gray-100 text-gray-600 hover:bg-gray-200 px-4 py-2 rounded-lg font-semibold text-xs transition-colors whitespace-nowrap w-full disabled:opacity-50"
                                >
                                  {loadingId === msg.id ? 'Processing...' : '+ Convert to Testimonial'}
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'testimonials' && (
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">Manage Testimonials</h2>
              {messages.filter(m => m.is_testimonial || (m.subject || '').startsWith('[Testimonial Submission]') || m.email === 'testimonial@ramakirtifoundation.co.in').length === 0 ? <p className="text-gray-500">No testimonials to manage.</p> : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b">
                        <th className="p-4 font-semibold text-gray-600">Author / Role</th>
                        <th className="p-4 font-semibold text-gray-600 w-1/2">Quote</th>
                        <th className="p-4 font-semibold text-gray-600 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {messages.filter(m => m.is_testimonial || (m.subject || '').startsWith('[Testimonial Submission]') || m.email === 'testimonial@ramakirtifoundation.co.in').map(msg => (
                        <tr key={msg.id} className="border-b last:border-0 hover:bg-gray-50 transition-colors">
                          <td className="p-4 align-top">
                            <div className="font-bold text-gray-800">{msg.name}</div>
                            <div className="text-xs text-gray-500 mb-1">{msg.subject?.replace('[Testimonial Submission] ', '') || 'Well Wisher'}</div>
                            {msg.email && msg.email !== 'testimonial@ramakirtifoundation.co.in' && (
                              <div className="text-xs text-gray-400">{msg.email}</div>
                            )}
                          </td>
                          <td className="p-4 align-top">
                            <p className="text-gray-700 italic">"{msg.message}"</p>
                          </td>
                          <td className="p-4 align-top text-right space-y-2">
                            {msg.email && msg.email !== 'testimonial@ramakirtifoundation.co.in' && (
                              <div>
                                <button 
                                  onClick={() => setReplyModal({
                                    isOpen: true,
                                    email: msg.email,
                                    name: msg.name,
                                    subject: `Re: Your testimonial for Ramakirti Foundation`,
                                    status: 'idle'
                                  })}
                                  className="inline-block bg-blue-100 text-blue-700 hover:bg-blue-200 px-4 py-2 rounded-lg font-semibold text-xs transition-colors whitespace-nowrap w-full text-center"
                                >
                                  ✉️ Reply In-App
                                </button>
                              </div>
                            )}
                            <div>
                              {msg.is_testimonial ? (
                                <button 
                                  onClick={() => handleToggleTestimonial(msg.id, true)}
                                  disabled={loadingId === msg.id}
                                  className="bg-green-100 text-green-700 hover:bg-green-200 px-4 py-2 rounded-lg font-semibold text-xs transition-colors whitespace-nowrap w-full disabled:opacity-50"
                                >
                                  {loadingId === msg.id ? 'Processing...' : '✓ Published (Hide)'}
                                </button>
                              ) : (
                                <button 
                                  onClick={() => handleToggleTestimonial(msg.id, false)}
                                  disabled={loadingId === msg.id}
                                  className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 px-4 py-2 rounded-lg font-semibold text-xs transition-colors whitespace-nowrap w-full disabled:opacity-50"
                                >
                                  {loadingId === msg.id ? 'Processing...' : '⏳ Pending (Publish)'}
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'initiatives' && (
            <div className="p-6 grid lg:grid-cols-2 gap-10 items-start">
              <div>
                <h2 className="text-2xl font-bold mb-6">Add New Initiative</h2>
                <form
                  action={async (formData) => {
                    setIsPublishing(true);
                    try {
                      await createInitiativeAction(formData);
                      setImagePreview(null);
                      (document.getElementById('initiative-form') as HTMLFormElement)?.reset();
                      router.refresh();
                    } finally {
                      setIsPublishing(false);
                    }
                  }}
                  id="initiative-form"
                  className="space-y-5"
                >
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Title</label>
                    <input type="text" name="title" required className="w-full border rounded-lg p-3 outline-none focus:border-[#6E1110] focus:ring-1 focus:ring-[#6E1110]" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Cover Image</label>
                    <input 
                      type="file" 
                      name="image" 
                      accept="image/*" 
                      required 
                      className="w-full border rounded-lg p-3 outline-none focus:border-[#6E1110] focus:ring-1 focus:ring-[#6E1110]"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => setImagePreview(reader.result as string);
                          reader.readAsDataURL(file);
                        } else {
                          setImagePreview(null);
                        }
                      }}
                    />
                    {imagePreview && (
                      <div className="mt-3">
                        <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg border border-gray-200" />
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Gallery Media (Optional)</label>
                    <input 
                      type="file" 
                      name="gallery" 
                      accept="image/*,video/*" 
                      multiple 
                      className="w-full border rounded-lg p-3 outline-none focus:border-[#6E1110] focus:ring-1 focus:ring-[#6E1110] text-sm"
                    />
                    <p className="text-xs text-gray-500 mt-1">Upload multiple photos or videos to showcase in the gallery.</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Description</label>
                    <textarea name="description" required rows={4} className="w-full border rounded-lg p-3 outline-none focus:border-[#6E1110] focus:ring-1 focus:ring-[#6E1110]"></textarea>
                  </div>
                  <button type="submit" disabled={isPublishing} className="bg-[#6E1110] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#8B2520] transition-colors w-full disabled:opacity-70">
                    {isPublishing ? 'Publishing Initiative...' : 'Publish Initiative'}
                  </button>
                </form>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-6">Current Initiatives</h2>
                {initiatives.length === 0 ? <p className="text-gray-500">No initiatives added yet.</p> : (
                  <div className="space-y-4">
                    {initiatives.map(init => (
                      <div key={init.id} className="flex gap-4 p-4 border rounded-xl hover:shadow-md transition-shadow bg-gray-50">
                        {init.image_url && (
                          <img 
                            src={init.image_url} 
                            alt="" 
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                            className="w-24 h-24 object-cover rounded-lg flex-shrink-0" 
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-800 text-lg truncate">{init.title}</h3>
                          <p className="text-sm text-gray-600 line-clamp-2 mt-1">{init.description}</p>
                          <button 
                            onClick={() => handleDeleteInitiative(init.id)}
                            disabled={loadingId === init.id}
                            className="text-red-500 hover:text-red-700 text-sm font-semibold mt-3 disabled:opacity-50"
                          >
                            {loadingId === init.id ? 'Deleting...' : 'Delete'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Reply Modal */}
        {replyModal.isOpen && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
              <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h3 className="font-bold text-lg text-gray-800">Reply to {replyModal.name}</h3>
                <button 
                  onClick={() => setReplyModal({ ...replyModal, isOpen: false, status: 'idle' })}
                  className="text-gray-400 hover:text-gray-600 font-bold p-1"
                >
                  ✕
                </button>
              </div>
              <div className="p-5">
                <p className="text-sm text-gray-500 mb-4">
                  Sending as: <span className="font-semibold text-gray-700">Ramakirti Foundation Official</span><br/>
                  To: <span className="font-semibold text-gray-700">{replyModal.email}</span>
                </p>

                {replyModal.status === 'success' ? (
                  <div className="bg-green-50 text-green-700 p-4 rounded-lg text-center font-bold mb-4">
                    ✓ Reply sent successfully!
                  </div>
                ) : (
                  <form action={async (formData) => {
                    setReplyModal(prev => ({ ...prev, status: 'sending' }));
                    try {
                      await sendReplyAction(
                        replyModal.email,
                        formData.get('subject') as string,
                        formData.get('message') as string
                      );
                      setReplyModal(prev => ({ ...prev, status: 'success' }));
                      setTimeout(() => setReplyModal(prev => ({ ...prev, isOpen: false, status: 'idle' })), 2000);
                    } catch (e) {
                      setReplyModal(prev => ({ ...prev, status: 'error' }));
                    }
                  }}>
                    {replyModal.status === 'error' && (
                      <div className="bg-red-50 text-red-600 p-3 rounded text-sm mb-4 font-semibold">
                        Failed to send email. Check configuration.
                      </div>
                    )}
                    <div className="mb-4">
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Subject</label>
                      <input 
                        type="text" 
                        name="subject" 
                        defaultValue={replyModal.subject}
                        required 
                        className="w-full border rounded-lg p-2.5 outline-none focus:border-[#6E1110] focus:ring-1 focus:ring-[#6E1110] text-sm font-semibold text-gray-800" 
                      />
                    </div>
                    <div className="mb-5">
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Message</label>
                      <textarea 
                        name="message" 
                        required 
                        rows={6}
                        defaultValue={`\n\nBest regards,\nRamakirti Foundation`}
                        className="w-full border rounded-lg p-3 outline-none focus:border-[#6E1110] focus:ring-1 focus:ring-[#6E1110] text-sm"
                      ></textarea>
                    </div>
                    <div className="flex justify-end gap-3">
                      <button 
                        type="button"
                        onClick={() => setReplyModal({ ...replyModal, isOpen: false, status: 'idle' })}
                        className="px-5 py-2.5 rounded-lg font-bold text-gray-600 hover:bg-gray-100 transition-colors"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        disabled={replyModal.status === 'sending'}
                        className="bg-[#6E1110] text-white font-bold py-2.5 px-6 rounded-lg hover:bg-[#8B2520] transition-colors disabled:opacity-70 flex items-center gap-2"
                      >
                        {replyModal.status === 'sending' ? 'Sending...' : 'Send Reply 🚀'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
  );
}
