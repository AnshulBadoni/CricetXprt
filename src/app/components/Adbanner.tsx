import Script from 'next/script';
import { useEffect } from 'react';

export default function AdBanner() {


  return (
    <div>
      <div id="container-adfbd39fbc61243bc14222b4d3e5ecfe"></div>
      <Script id="ad-options" strategy="afterInteractive">
        {`
          atOptions = {
            'key': '97639fe3f698c272354afc6bbdbabe9b',
            'format': 'iframe',
            'height': 90,
            'width': 728,
            'params': {}
          };
        `}
      </Script>
      <Script
        src="//www.highperformanceformat.com/97639fe3f698c272354afc6bbdbabe9b/invoke.js"
        strategy="afterInteractive"
      />

    </div>
  );
}
