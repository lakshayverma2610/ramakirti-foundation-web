'use client';

import { useState, useEffect } from 'react';
import { logoutAction, makeTestimonialAction, removeTestimonialAction, createInitiativeAction, deleteInitiativeAction, sendReplyAction, createRequirementAction, updateRequirementAction, deleteRequirementAction, updateVolunteerStatusAction, deleteMessageAction, deleteTestimonialAction, deleteVolunteerAction } from './actions';
import { useRouter } from 'next/navigation';

export default function AdminDashboard({ messages, initiatives, requirements, volunteers }: { messages: any[], initiatives: any[], requirements: any[], volunteers: any[] }) {
  const [localMessages, setLocalMessages] = useState(messages);
  const [localInitiatives, setLocalInitiatives] = useState(initiatives);
  const [localRequirements, setLocalRequirements] = useState(requirements);
  const [localVolunteers, setLocalVolunteers] = useState(volunteers);

  useEffect(() => {
    setLocalMessages(messages);
    setLocalInitiatives(initiatives);
    setLocalRequirements(requirements);
    setLocalVolunteers(volunteers);
  }, [messages, initiatives, requirements, volunteers]);

  const [activeTab, setActiveTab] = useState<'messages' | 'testimonials' | 'initiatives' | 'requirements' | 'volunteers'>('messages');
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
        setLocalMessages(prev => prev.map(m => m.id === id ? { ...m, is_testimonial: false } : m));
      } else {
        await makeTestimonialAction(id);
        setLocalMessages(prev => prev.map(m => m.id === id ? { ...m, is_testimonial: true } : m));
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
      setLocalInitiatives(prev => prev.filter(i => i.id !== id));
      router.refresh();
    } finally {
      setLoadingId(null);
    }
  }

  async function handleUpdateRequirement(id: string, fulfilledQuantity: number) {
    setLoadingId(`req-${id}`);
    try {
      await updateRequirementAction(id, fulfilledQuantity);
      setLocalRequirements(prev => prev.map(r => r.id === id ? { ...r, fulfilledQuantity } : r));
      router.refresh();
    } finally {
      setLoadingId(null);
    }
  }

  async function handleDeleteRequirement(id: string) {
    setLoadingId(`del-req-${id}`);
    try {
      await deleteRequirementAction(id);
      setLocalRequirements(prev => prev.filter(r => r.id !== id));
      router.refresh();
    } finally {
      setLoadingId(null);
    }
  }

  async function handleUpdateVolunteerStatus(id: string, status: string) {
    setLoadingId(`vol-${id}`);
    try {
      await updateVolunteerStatusAction(id, status);
      setLocalVolunteers(prev => prev.map(v => v.id === id ? { ...v, status } : v));
      router.refresh();
    } finally {
      setLoadingId(null);
    }
  }

  async function handleDeleteMessage(id: string) {
    setLoadingId(`del-msg-${id}`);
    try {
      await deleteMessageAction(id);
      setLocalMessages(prev => prev.filter(m => m.id !== id));
      router.refresh();
    } finally {
      setLoadingId(null);
    }
  }

  async function handleDeleteTestimonial(id: string) {
    setLoadingId(`del-test-${id}`);
    try {
      await deleteTestimonialAction(id);
      setLocalMessages(prev => prev.filter(m => m.id !== id));
      router.refresh();
    } finally {
      setLoadingId(null);
    }
  }

  async function handleDeleteVolunteer(id: string) {
    setLoadingId(`del-vol-${id}`);
    try {
      await deleteVolunteerAction(id);
      setLocalVolunteers(prev => prev.filter(v => v.id !== id));
      router.refresh();
    } finally {
      setLoadingId(null);
    }
  }

  return (
      <div className="max-w-6xl mx-auto p-6 mt-6">
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
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
            className={`px-6 py-3 rounded-lg font-bold transition-colors whitespace-nowrap ${activeTab === 'initiatives' ? 'bg-[#6E1110] text-white shadow-md' : 'bg-white text-gray-600 border hover:bg-gray-50'}`}
          >
            Manage Initiatives
          </button>
          <button
            onClick={() => setActiveTab('requirements')}
            className={`px-6 py-3 rounded-lg font-bold transition-colors whitespace-nowrap ${activeTab === 'requirements' ? 'bg-[#6E1110] text-white shadow-md' : 'bg-white text-gray-600 border hover:bg-gray-50'}`}
          >
            Manage Requirements
          </button>
          <button
            onClick={() => setActiveTab('volunteers')}
            className={`px-6 py-3 rounded-lg font-bold transition-colors whitespace-nowrap ${activeTab === 'volunteers' ? 'bg-[#6E1110] text-white shadow-md' : 'bg-white text-gray-600 border hover:bg-gray-50'}`}
          >
            Volunteers
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {activeTab === 'messages' && (
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">Contact Form Submissions</h2>
              {localMessages.filter(m => !m.is_testimonial && !(m.subject || '').startsWith('[Testimonial Submission]') && m.email !== 'testimonial@ramakirtifoundation.co.in').length === 0 ? <p className="text-gray-500">No contact messages yet.</p> : (
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
                      {localMessages.filter(m => !m.is_testimonial && !(m.subject || '').startsWith('[Testimonial Submission]') && m.email !== 'testimonial@ramakirtifoundation.co.in').map(msg => (
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
                            <div>
                              <button 
                                onClick={() => handleDeleteMessage(msg.id)}
                                disabled={loadingId === `del-msg-${msg.id}`}
                                className="bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg font-semibold text-xs transition-colors whitespace-nowrap w-full disabled:opacity-50 mt-1"
                              >
                                {loadingId === `del-msg-${msg.id}` ? 'Deleting...' : '🗑️ Delete Message'}
                              </button>
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
              {localMessages.filter(m => m.is_testimonial || (m.subject || '').startsWith('[Testimonial Submission]') || m.email === 'testimonial@ramakirtifoundation.co.in').length === 0 ? <p className="text-gray-500">No testimonials to manage.</p> : (
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
                      {localMessages.filter(m => m.is_testimonial || (m.subject || '').startsWith('[Testimonial Submission]') || m.email === 'testimonial@ramakirtifoundation.co.in').map(msg => (
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
                            <div>
                              <button 
                                onClick={() => handleDeleteTestimonial(msg.id)}
                                disabled={loadingId === `del-test-${msg.id}`}
                                className="bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg font-semibold text-xs transition-colors whitespace-nowrap w-full disabled:opacity-50 mt-1"
                              >
                                {loadingId === `del-test-${msg.id}` ? 'Deleting...' : '🗑️ Delete Testimonial'}
                              </button>
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
                  <button type="submit" disabled={isPublishing} className="bg-[#6E1110] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#8B2520] transition-colors w-full disabled:opacity-70 flex items-center justify-center gap-2">
                    {isPublishing ? (
                      <><span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Publishing Initiative...</>
                    ) : 'Publish Initiative'}
                  </button>
                </form>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-6">Current Initiatives</h2>
                {localInitiatives.length === 0 ? <p className="text-gray-500">No initiatives added yet.</p> : (
                  <div className="space-y-4">
                    {localInitiatives.map(init => (
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

          {activeTab === 'requirements' && (
            <div className="p-6 grid lg:grid-cols-[1fr_2fr] gap-10 items-start">
              <div>
                <h2 className="text-2xl font-bold mb-6">Add Requirement</h2>
                <form
                  action={async (formData) => {
                    setIsPublishing(true);
                    try {
                      await createRequirementAction(formData);
                      (document.getElementById('requirement-form') as HTMLFormElement)?.reset();
                      router.refresh();
                    } finally {
                      setIsPublishing(false);
                    }
                  }}
                  id="requirement-form"
                  className="space-y-5"
                >
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Item Name</label>
                    <input type="text" name="itemName" required placeholder="e.g., Notebooks" className="w-full border rounded-lg p-3 outline-none focus:border-[#6E1110] focus:ring-1 focus:ring-[#6E1110]" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Target Quantity</label>
                    <input type="number" name="targetQuantity" required min="1" placeholder="e.g., 500" className="w-full border rounded-lg p-3 outline-none focus:border-[#6E1110] focus:ring-1 focus:ring-[#6E1110]" />
                  </div>
                  <button type="submit" disabled={isPublishing} className="bg-[#6E1110] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#8B2520] transition-colors w-full disabled:opacity-70 flex items-center justify-center gap-2">
                    {isPublishing ? (
                      <><span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Adding Requirement...</>
                    ) : 'Add Requirement'}
                  </button>
                </form>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-6">Current Requirements</h2>
                {localRequirements.length === 0 ? <p className="text-gray-500">No requirements added yet.</p> : (
                  <div className="space-y-4">
                    {localRequirements.map(req => (
                      <div key={req.id} className="flex flex-col gap-2 p-4 border rounded-xl hover:shadow-md transition-shadow bg-gray-50">
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-gray-800 text-lg">{req.itemName}</h3>
                          <button 
                            onClick={() => handleDeleteRequirement(req.id)}
                            disabled={loadingId === `del-req-${req.id}`}
                            className="text-red-500 hover:text-red-700 text-xs font-semibold disabled:opacity-50"
                          >
                            {loadingId === `del-req-${req.id}` ? 'Deleting...' : 'Delete'}
                          </button>
                        </div>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-2">
                            <label className="text-sm text-gray-600 font-semibold">Fulfilled:</label>
                            <input 
                              type="number" 
                              defaultValue={req.fulfilledQuantity}
                              min="0"
                              className="border rounded p-1 w-20 text-sm outline-none focus:border-[#6E1110]"
                              onChange={(e) => handleUpdateRequirement(req.id, parseInt(e.target.value, 10))}
                            />
                          </div>
                          <div className="text-sm text-gray-500 font-semibold">
                            / {req.targetQuantity} Target
                          </div>
                          <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden ml-4">
                            <div className="bg-[#6E1110] h-full" style={{ width: `${Math.min(100, (req.fulfilledQuantity / req.targetQuantity) * 100)}%` }}></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'volunteers' && (
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">Volunteer Submissions</h2>
              {localVolunteers.length === 0 ? <p className="text-gray-500">No volunteer applications yet.</p> : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b">
                        <th className="p-4 font-semibold text-gray-600">Applicant Info</th>
                        <th className="p-4 font-semibold text-gray-600">Skills / Interests</th>
                        <th className="p-4 font-semibold text-gray-600 text-right">Status Management</th>
                      </tr>
                    </thead>
                    <tbody>
                      {localVolunteers.map(vol => (
                        <tr key={vol.id} className="border-b last:border-0 hover:bg-gray-50 transition-colors">
                          <td className="p-4 align-top">
                            <div className="font-bold text-gray-800 text-base">{vol.name}</div>
                            <div className="text-xs text-gray-500 mb-1">{vol.email}</div>
                            <div className="text-xs text-gray-500">Phone: {vol.phone}</div>
                            <div className="text-xs text-gray-500 mt-2 font-semibold">City: {vol.city}</div>
                            <div className="text-xs text-gray-500">Availability: {vol.availability}</div>
                          </td>
                          <td className="p-4 align-top">
                            <div className="mb-2">
                              <span className="font-semibold text-gray-700 text-xs block mb-1">Skills:</span>
                              <div className="flex flex-wrap gap-1">
                                {vol.skills.map((skill: string) => (
                                  <span key={skill} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-[10px] font-bold uppercase">{skill}</span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <span className="font-semibold text-gray-700 text-xs block mb-1">Interests:</span>
                              <div className="flex flex-wrap gap-1">
                                {vol.interests.map((interest: string) => (
                                  <span key={interest} className="bg-purple-50 text-purple-700 px-2 py-1 rounded text-[10px] font-bold uppercase">{interest}</span>
                                ))}
                              </div>
                            </div>
                          </td>
                          <td className="p-4 align-top text-right space-y-3">
                            <div>
                              <select 
                                value={vol.status}
                                onChange={(e) => handleUpdateVolunteerStatus(vol.id, e.target.value)}
                                disabled={loadingId === `vol-${vol.id}`}
                                className={`p-2 rounded-lg text-xs font-bold border-2 outline-none w-full cursor-pointer transition-colors ${
                                  vol.status === 'Onboarded' ? 'bg-green-50 text-green-700 border-green-200' :
                                  vol.status === 'Contacted' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                  'bg-yellow-50 text-yellow-700 border-yellow-200'
                                }`}
                              >
                                <option value="Pending">⏳ Pending</option>
                                <option value="Contacted">📞 Contacted</option>
                                <option value="Onboarded">✓ Onboarded</option>
                              </select>
                            </div>
                            <div>
                              <a 
                                href={`mailto:${vol.email}?subject=Volunteering at Ramakirti Foundation`}
                                className="inline-block bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-lg font-semibold text-xs transition-colors whitespace-nowrap w-full text-center"
                              >
                                ✉️ Email Volunteer
                              </a>
                            </div>
                            <div>
                              <button 
                                onClick={() => handleDeleteVolunteer(vol.id)}
                                disabled={loadingId === `del-vol-${vol.id}`}
                                className="bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg font-semibold text-xs transition-colors whitespace-nowrap w-full disabled:opacity-50"
                              >
                                {loadingId === `del-vol-${vol.id}` ? 'Deleting...' : '🗑️ Delete Application'}
                              </button>
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
                    } catch (e: any) {
                      setReplyModal(prev => ({ ...prev, status: 'error', errorMsg: e.message || 'Failed to send email. Check configuration.' }));
                    }
                  }}>
                    {replyModal.status === 'error' && (
                      <div className="bg-red-50 text-red-600 p-3 rounded text-sm mb-4 font-semibold">
                        {(replyModal as any).errorMsg || 'Failed to send email.'}
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
