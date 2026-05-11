"use client";

import { useState, useRef, useEffect } from "react";
import { md5 } from "js-md5";

interface Props {
  projectId: string;
}

export default function SecureLinkGenerator({ projectId }: Props) {
  const [protocol, setProtocol] = useState("https");
  const [server, setServer] = useState("samply.uni-konstanz.de");
  const [mode, setMode] = useState("multi");
  const [allowtz, setAllowtz] = useState(false);
  const [allowpayment, setAllowpayment] = useState(false);
  const [validfor, setValidfor] = useState(168);
  const [code, setCode] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  function generateLink() {
    const params: Record<string, string | boolean | number> = {
      protocol,
      server,
      study: projectId,
      mode,
      allowtz,
      allowpayment,
      timestamp: Date.now(),
      validfor: validfor * 3600,
    };
    if (code) params.code = code;

    const paramString = Object.entries(params)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => `${k}=${v}`)
      .join("&");

    const checksum = md5(paramString);
    const query = new URLSearchParams(
      Object.fromEntries(
        Object.entries({ ...params, checksum }).map(([k, v]) => [k, String(v)])
      )
    );
    setGeneratedLink(`samply://register?${query.toString()}`);
  }

  useEffect(() => {
    if (!generatedLink || !canvasRef.current) return;
    import("qrcode").then((QRCode) => {
      QRCode.toCanvas(canvasRef.current!, generatedLink, (err) => {
        if (err) console.error("QR code generation failed:", err);
      });
    });
  }, [generatedLink]);

  function copyLink() {
    if (generatedLink) navigator.clipboard.writeText(generatedLink);
  }

  return (
    <>
      <h5>
        <div className="headerLink">Way 4: Generate Secure Invitation Link</div>
      </h5>
      <p>Fill in the parameters to generate a secure invitation link for your study.</p>
      <p>
        <strong>Note:</strong> Participants must install the app first. They can open the link on
        their phone or copy/paste it into the &quot;Create a new participant account&quot; screen in
        the app. If they have an existing account, they should log out, use the link, and then enter
        their login details on the next page.
      </p>

      <table className="table">
        <tbody>
          <tr>
            <td>Protocol</td>
            <td>
              <select value={protocol} onChange={(e) => setProtocol(e.target.value)}>
                <option value="https">https</option>
                <option value="http">http</option>
              </select>
              <p className="explanation">The communication protocol for the server (https is secure and recommended).</p>
            </td>
          </tr>
          <tr>
            <td>Server</td>
            <td>
              <input
                type="text"
                value={server}
                onChange={(e) => setServer(e.target.value)}
                placeholder="e.g., samply.uni-konstanz.de"
              />
              <p className="explanation">The server address for the study.</p>
            </td>
          </tr>
          <tr>
            <td>Study ID</td>
            <td>
              <input type="text" value={projectId} readOnly />
              <p className="explanation">The unique ID of your study. This cannot be changed.</p>
            </td>
          </tr>
          <tr>
            <td>Mode</td>
            <td>
              <select value={mode} onChange={(e) => setMode(e.target.value)}>
                <option value="multi">Multi</option>
                <option value="single">Single</option>
              </select>
              <p className="explanation">Multi: App supports multiple studies. Single: App focuses on this study only.</p>
            </td>
          </tr>
          <tr>
            <td>Allow Timezone</td>
            <td>
              <input
                type="checkbox"
                checked={allowtz}
                onChange={(e) => setAllowtz(e.target.checked)}
              />
              <p className="explanation">If checked, participants can update their timezone in the app.</p>
            </td>
          </tr>
          <tr>
            <td>Allow Payment</td>
            <td>
              <input
                type="checkbox"
                checked={allowpayment}
                onChange={(e) => setAllowpayment(e.target.checked)}
              />
              <p className="explanation">If checked, participants see a link to set up a payment account in the app.</p>
            </td>
          </tr>
          <tr>
            <td>Valid For (hours)</td>
            <td>
              <input
                type="number"
                value={validfor}
                min={1}
                onChange={(e) => setValidfor(Number(e.target.value))}
                placeholder="e.g., 168"
              />
              <p className="explanation">How long the link is valid (in hours, e.g., 168 hours = 7 days).</p>
            </td>
          </tr>
          <tr>
            <td>Code</td>
            <td>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="e.g., TEST"
              />
              <p className="explanation">Optional participant code. Empty: Link can be shared with many. Filled: Link is for one participant.</p>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <button type="button" className="button" onClick={generateLink}>
                Generate Link
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <table className="table">
        <tbody>
          <tr>
            <td>Generated Link</td>
            <td>
              <input type="text" value={generatedLink} readOnly />
              <button type="button" className="button" onClick={copyLink}>
                Copy link
              </button>
              <p className="explanation">
                Copy and share this link with participants. It includes a checksum to prevent
                tampering; any changes will invalidate it.
              </p>
              <canvas ref={canvasRef} id="generatedLinkQR" />
              {generatedLink && (
                <p className="explanation">Scan this QR code to access the secure invitation link.</p>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
