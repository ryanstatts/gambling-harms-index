// Cookie Consent Management for Distill Site
(function() {
  'use strict';
  
  // Configuration
  const CONSENT_COOKIE_NAME = 'ghsi_cookie_consent';
  const CONSENT_COOKIE_EXPIRY = 365; // days
  const GA_MEASUREMENT_ID = 'G-YWYRGPN4XT';
  
  // Utility functions
  function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/;SameSite=Lax";
  }
  
  function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
  
  // Google Analytics initialization
  function initializeGoogleAnalytics() {
    // Load Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);
    
    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
      'anonymize_ip': true,
      'cookie_flags': 'SameSite=Lax;Secure'
    });
  }
  
  // Create and show consent banner
  function showConsentBanner() {
    const banner = document.createElement('div');
    banner.id = 'cookie-consent-banner';
    banner.innerHTML = `
      <div class="cookie-consent-content">
        <div class="cookie-consent-text">
          <p><strong>Cookie Notice</strong></p>
          <p>We use cookies to understand how visitors use our website. This helps us improve the site. 
          You can choose to accept or decline analytics cookies. Essential cookies for the site to function are always enabled.</p>
        </div>
        <div class="cookie-consent-buttons">
          <button id="cookie-accept" class="cookie-btn cookie-accept">Accept Analytics Cookies</button>
          <button id="cookie-decline" class="cookie-btn cookie-decline">Decline</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(banner);
    
    // Add event listeners
    document.getElementById('cookie-accept').addEventListener('click', function() {
      setCookie(CONSENT_COOKIE_NAME, 'accepted', CONSENT_COOKIE_EXPIRY);
      banner.style.display = 'none';
      initializeGoogleAnalytics();
    });
    
    document.getElementById('cookie-decline').addEventListener('click', function() {
      setCookie(CONSENT_COOKIE_NAME, 'declined', CONSENT_COOKIE_EXPIRY);
      banner.style.display = 'none';
    });
  }
  
  // Main initialization
  function init() {
    const consent = getCookie(CONSENT_COOKIE_NAME);
    
    if (consent === 'accepted') {
      // User has previously consented
      initializeGoogleAnalytics();
    } else if (consent === 'declined') {
      // User has previously declined
      // Do nothing
    } else {
      // First visit - show banner
      showConsentBanner();
    }
  }
  
  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();