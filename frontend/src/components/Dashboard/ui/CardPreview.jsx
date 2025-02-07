"use client"

import { useState } from "react"

const CardPreview = ({ upload }) => {
  const [showFullscreen, setShowFullscreen] = useState(false)

  const fileExtension = upload.file.split("?")[0].split(".").pop()?.toLowerCase()
  const validLink = upload.file.startsWith("https://") ? upload.file : `https://${upload.file}`

  const handleDownload = async () => {
    try {
      const response = await fetch(validLink)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.style.display = "none"
      a.href = url
      a.download = upload.title || `download.${fileExtension}`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Download failed:", error)
    }
  }

  const renderPreview = (fullscreen = false) => {
    if (!fileExtension || !validLink) return null

    const style = fullscreen
      ? { maxWidth: "100%", maxHeight: "70vh", objectFit: "contain" }
      : { width: "100%", height: "160px", objectFit: "cover", borderRadius: "8px" }

    if (["jpg", "jpeg", "png", "gif"].includes(fileExtension)) {
      return <img src={validLink || "/placeholder.svg"} alt="Image Preview" style={style} />
    }

    if (["mp4", "mov", "avi"].includes(fileExtension)) {
      return (
        <video controls style={style}>
          <source src={validLink} type={`video/${fileExtension}`} />
          Your browser does not support the video tag.
        </video>
      )
    }

    if (fileExtension === "pdf") {
      return <iframe src={validLink} style={style} />
    }

    return <p style={{ color: "#a1a1aa" }}>Unsupported file type</p>
  }

  const buttonStyle = {
    padding: "8px 16px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.3s",
  }

  const primaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: "rgba(139, 92, 246, 0.1)",
    color: "white",
    border: "1px solid #8b5cf6",
  }

  const secondaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: "rgba(63, 63, 70, 0.1)",
    color: "#3f3f46",
    border: "1px solid #3f3f46",
  }

  return (
    <>
      <div
        style={{
          width: "300px",
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          border: "1px solid rgba(165, 55, 253)",
          borderRadius: "12px",
          padding: "16px",
          color: "#ffffff",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          backdropFilter: "blur(10px)",
        }}
      >
        <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "12px", color: "" }}>{upload.title}</h3>
        <div
          style={{ marginBottom: "12px", backgroundColor: "rgba(0, 0, 0, 0.2)", borderRadius: "8px", padding: "4px" }}
        >
          {renderPreview()}
        </div>
        <p style={{ fontSize: "14px", color: "#a1a1aa", marginBottom: "16px" }}>{upload.description}</p>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button onClick={() => setShowFullscreen(true)} style={primaryButtonStyle}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ marginRight: "8px" }}
            >
              <polyline points="15 3 21 3 21 9"></polyline>
              <polyline points="9 21 3 21 3 15"></polyline>
              <line x1="21" y1="3" x2="14" y2="10"></line>
              <line x1="3" y1="21" x2="10" y2="14"></line>
            </svg>
            View
          </button>
          <button onClick={handleDownload} style={primaryButtonStyle}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ marginRight: "8px" }}
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Download
          </button>
        </div>
      </div>

      {showFullscreen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(24, 24, 27, 0.9)",
              padding: "24px",
              borderRadius: "12px",
              width: "90%",
              maxWidth: "800px",
              maxHeight: "90%",
              display: "flex",
              flexDirection: "column",
              backdropFilter: "blur(10px)",
            }}
          >
            <div
              style={{ flex: 1, marginBottom: "16px", display: "flex", justifyContent: "center", alignItems: "center" }}
            >
              {renderPreview(true)}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button onClick={() => setShowFullscreen(false)} style={primaryButtonStyle}>
                Close
              </button>
              <button onClick={handleDownload} style={primaryButtonStyle}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ marginRight: "8px" }}
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CardPreview

