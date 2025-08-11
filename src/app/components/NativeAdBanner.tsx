import Script from 'next/script';

export default function NativeAdBanner() {
    return (
        <div style={{ textAlign: 'center', margin: '100px 16vw', position: 'absolute', width: '50%' }}>
            {/* Container where the ad will be injected */}
            <div id="container-adfbd39fbc61243bc14222b4d3e5ecfe"></div>

            {/* Native banner ad script */}
            <Script
                async
                data-cfasync="false"
                src="//pl27394449.profitableratecpm.com/adfbd39fbc61243bc14222b4d3e5ecfe/invoke.js"
                strategy="afterInteractive"
            />
        </div>
    );
}
