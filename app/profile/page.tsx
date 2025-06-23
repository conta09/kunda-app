'use client';

import { useState } from 'react';
import { FaPlus, FaPen } from 'react-icons/fa';

export default function ProfilePage() {
  const [images, setImages] = useState<(File | null)[]>(Array(9).fill(null));
  const [previews, setPreviews] = useState<(string | null)[]>(Array(9).fill(null));

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (file) {
      const newImages = [...images];
      const newPreviews = [...previews];
      newImages[index] = file;
      newPreviews[index] = URL.createObjectURL(file);
      setImages(newImages);
      setPreviews(newPreviews);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex justify-center py-10 px-4">
      <div className="w-full max-w-6xl bg-zinc-900 rounded-2xl shadow-xl p-6">
        {/* Top Tabs */}
        <div className="flex justify-between bg-zinc-800 text-sm font-bold rounded-xl overflow-hidden mb-6">
          <button className="w-1/2 py-3 text-rose-500 border-b-2 border-rose-500">Edit</button>
          <button className="w-1/2 py-3 text-zinc-400">Preview</button>
        </div>

        {/* Layout: responsive grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form Section */}
          <div className="space-y-4">
            {/* Goals */}
            <div>
              <label className="block text-sm font-semibold mb-1">Goals</label>
              <select className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded-md">
                <option>Looking for serious relationship</option>
                <option>Friendship</option>
                <option>Casual dating</option>
                <option>Open to anything</option>
              </select>
            </div>

            {/* Height */}
            <div>
              <label className="block text-sm font-semibold mb-1">Height</label>
              <select className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded-md">
                {Array.from({ length: 60 }, (_, i) => (
                  <option key={i}>{140 + i} cm</option>
                ))}
              </select>
            </div>

            {/* Born Date */}
            <div>
              <label className="block text-sm font-semibold mb-1">Born Date</label>
              <input
                type="date"
                className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded-md"
              />
            </div>

            {/* Looking For */}
            <div>
              <label className="block text-sm font-semibold mb-1">Looking for</label>
              <select className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded-md">
                <option>Women</option>
                <option>Men</option>
                <option>Everyone</option>
                <option>Prefer not to say</option>
              </select>
            </div>
          </div>

          {/* Photo Grid Section */}
          <div>
            <h2 className="text-center font-semibold text-lg mb-4">PROFILE PHOTOS</h2>
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 9 }).map((_, index) => (
                <div
                  key={index}
                  className="relative w-full aspect-square border border-zinc-700 rounded-md bg-zinc-800 flex items-center justify-center"
                >
                  {previews[index] ? (
                    <>
                      <img
                        src={previews[index]!}
                        alt={`preview-${index}`}
                        className="w-full h-full object-cover rounded-md"
                      />
                      <label className="absolute bottom-1 right-1 bg-white text-black p-1 rounded-full cursor-pointer">
                        <FaPen className="text-xs" />
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageChange(e, index)}
                        />
                      </label>
                    </>
                  ) : (
                    <>
                      <label className="w-full h-full flex items-center justify-center cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageChange(e, index)}
                        />
                        <div className="w-6 h-6 bg-rose-500 text-white rounded-full flex items-center justify-center">
                          <FaPlus className="text-xs" />
                        </div>
                      </label>
                      <div className="absolute inset-0 border-2 border-dashed border-zinc-700 rounded-md pointer-events-none" />
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Save Button */}
            <button
              className="mt-6 w-full bg-rose-500 hover:bg-rose-600 text-white py-3 rounded-full font-bold transition"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
