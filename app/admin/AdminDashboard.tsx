'use client';

import { useState } from 'react';
import { logoutAction, makeTestimonialAction, removeTestimonialAction, createInitiativeAction, deleteInitiativeAction } from './actions';
import { useRouter } from 'next/navigation';

export default function AdminDashboard({ messages, initiatives }: { messages: any[], initiatives: any[] }) {
  const [activeTab, setActiveTab] = useState<'messages' | 'initiatives'>('messages');
  const router = useRouter();

  async function handleToggleTestimonial(id: string, currentStatus: boolean) {
    if (currentStatus) {
      await removeTestimonialAction(id);
    } else {
      await makeTestimonialAction(id);
    }
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <nav className="bg-white shadow-sm border-b border-gray-200 p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-[#6E1110]">Ramakirti Foundation Admin</h1>
        <button 
          onClick={() => logoutAction()}
          className="text-gray-500 hover:text-gray-800 text-sm font-semibold px-4 py-2 border rounded-md"
        >
          Logout
        </button>
      </nav>

      <div className="max-w-6xl mx-auto p-6 mt-6">
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('messages')}
            className={`px-6 py-3 rounded-lg font-bold transition-colors ${activeTab === 'messages' ? 'bg-[#6E1110] text-white shadow-md' : 'bg-white text-gray-600 border hover:bg-gray-50'}`}
          >
            Messages & Testimonials
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
              <h2 className="text-2xl font-bold mb-6">Contact Messages</h2>
              {messages.length === 0 ? <p className="text-gray-500">No messages yet.</p> : (
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
                      {messages.map(msg => (
                        <tr key={msg.id} className="border-b last:border-0 hover:bg-gray-50 transition-colors">
                          <td className="p-4 align-top">
                            <div className="font-bold text-gray-800">{msg.name}</div>
                            <div className="text-xs text-gray-500">{msg.email}</div>
                          </td>
                          <td className="p-4 align-top">
                            <p className="text-gray-700 whitespace-pre-wrap">{msg.message}</p>
                          </td>
                          <td className="p-4 align-top text-right">
                            {msg.is_testimonial ? (
                              <button 
                                onClick={() => handleToggleTestimonial(msg.id, msg.is_testimonial)}
                                className="bg-green-100 text-green-700 hover:bg-green-200 px-4 py-2 rounded-lg font-semibold text-xs transition-colors whitespace-nowrap"
                              >
                                ✓ Testimonial Added
                              </button>
                            ) : (
                              <button 
                                onClick={() => handleToggleTestimonial(msg.id, msg.is_testimonial)}
                                className="bg-gray-100 text-gray-600 hover:bg-gray-200 px-4 py-2 rounded-lg font-semibold text-xs transition-colors whitespace-nowrap"
                              >
                                + Add to Website as Testimonial
                              </button>
                            )}
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
                    await createInitiativeAction(formData);
                    router.refresh();
                  }}
                  className="space-y-5"
                >
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Title</label>
                    <input type="text" name="title" required className="w-full border rounded-lg p-3 outline-none focus:border-[#6E1110] focus:ring-1 focus:ring-[#6E1110]" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Image URL</label>
                    <input type="url" name="image_url" required placeholder="https://..." className="w-full border rounded-lg p-3 outline-none focus:border-[#6E1110] focus:ring-1 focus:ring-[#6E1110]" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Description</label>
                    <textarea name="description" required rows={4} className="w-full border rounded-lg p-3 outline-none focus:border-[#6E1110] focus:ring-1 focus:ring-[#6E1110]"></textarea>
                  </div>
                  <button type="submit" className="bg-[#6E1110] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#8B2520] transition-colors w-full">
                    Publish Initiative
                  </button>
                </form>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-6">Current Initiatives</h2>
                {initiatives.length === 0 ? <p className="text-gray-500">No initiatives added yet.</p> : (
                  <div className="space-y-4">
                    {initiatives.map(init => (
                      <div key={init.id} className="flex gap-4 p-4 border rounded-xl hover:shadow-md transition-shadow bg-gray-50">
                        {init.image_url && <img src={init.image_url} alt="" className="w-24 h-24 object-cover rounded-lg flex-shrink-0" />}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-800 text-lg truncate">{init.title}</h3>
                          <p className="text-sm text-gray-600 line-clamp-2 mt-1">{init.description}</p>
                          <button 
                            onClick={async () => {
                              await deleteInitiativeAction(init.id);
                              router.refresh();
                            }}
                            className="text-red-500 hover:text-red-700 text-sm font-semibold mt-3"
                          >
                            Delete
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
      </div>
    </div>
  );
}
