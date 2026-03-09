import React, { useEffect, useMemo, useState } from "react";
import { getCertificateUsers } from "../../src/services/certificateUsers";
import { hasFirebaseConfig } from "../../src/lib/firebase";

export const Panel = () => {
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadUsers = async () => {
      try {
        const list = await getCertificateUsers();
        if (isMounted) {
          setUsers(list);
        }
      } catch (error) {
        console.error("Failed to load certificate users:", error);
      } finally {
        if (isMounted) {
          setIsLoadingUsers(false);
        }
      }
    };

    loadUsers();

    return () => {
      isMounted = false;
    };
  }, []);

  const nameOptions = useMemo(() => users.map((user) => user.name), [users]);

  const handleDownload = async () => {
    if (!name.trim()) {
      alert("Please select your name");
      return;
    }

    try {
      // Create a canvas element
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Set canvas size to match certificate
      canvas.width = 1200;
      canvas.height = 850;
      
      // Load the certificate template
      const img = new Image();
      img.crossOrigin = "anonymous";
      
      img.onload = () => {
        // Draw the certificate template
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        // Configure text style for the name
        ctx.font = 'bold 48px serif';
        ctx.fillStyle = '#1a1a1a';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Draw the name on the certificate (positioned above the line)
        ctx.fillText(name, 600, 300);
        
        // Convert canvas to blob and download
        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `TechFest_2026_Certificate_${name.replace(/\s+/g, '_')}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }, 'image/png');
      };
      
      img.onerror = () => {
        alert('Error loading certificate template. Please try again.');
      };
      
      // Load the SVG template
      img.src = '/certificate-template.svg';
      
    } catch (error) {
      console.error('Error generating certificate:', error);
      alert('Error generating certificate. Please try again.');
    }
  };

  return (
    <div className="mt-6 sm:mt-8 md:mt-12 text-center w-full max-w-md px-4">
      <h2 className="text-white/90 text-lg sm:text-xl md:text-2xl font-semibold mb-4 sm:mb-6 md:mb-8 tracking-wide">
        Get Your Certificate
      </h2>

      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 sm:p-6 md:p-8 w-full shadow-2xl">
        <div className="space-y-4 sm:space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-white/70 text-xs sm:text-sm mb-2 text-left"
            >
              Select Your Name
            </label>
            <select
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoadingUsers || nameOptions.length === 0}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/10 border border-white/20 rounded-md text-white text-sm sm:text-base focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all"
            >
              <option value="" className="text-white bg-black">
                {isLoadingUsers
                  ? "Loading users..."
                  : nameOptions.length
                    ? "-- Choose Your Name --"
                    : "No users found"}
              </option>
              {nameOptions.map((optionName) => (
                <option
                  key={optionName}
                  value={optionName}
                  className="text-white bg-black"
                >
                  {optionName}
                </option>
              ))}
            </select>
            {!hasFirebaseConfig ? (
              <p className="mt-2 text-left text-xs text-yellow-200/90">
                Firebase not configured. Add VITE_FIREBASE_* values to use stored users.
              </p>
            ) : null}
          </div>

          <button
            onClick={handleDownload}
            className="w-full px-4 sm:px-6 py-2 sm:py-3 bg-white/90 hover:bg-white text-black font-medium text-sm sm:text-base rounded-md transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
          >
            Download Certificate
          </button>
        </div>
      </div>
    </div>
  );
};
