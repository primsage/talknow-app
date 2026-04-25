(function() {
  const script = document.currentScript;
  const businessId = script.getAttribute('data-business-id');

  if (!businessId) {
    console.error('TalkNow Widget: business-id is missing');
    return;
  }

  const container = document.createElement('div');
  container.id = 'talknow-widget-container';
  document.body.appendChild(container);

  const widgetScript = document.createElement('script');
  widgetScript.src = 'http://localhost:3001/assets/index.js'; // This will need to match the built filename
  widgetScript.type = 'module';
  document.head.appendChild(widgetScript);

  const widgetStyles = document.createElement('link');
  widgetStyles.rel = 'stylesheet';
  widgetStyles.href = 'http://localhost:3001/assets/index.css';
  document.head.appendChild(widgetStyles);

  window.TALKNOW_BUSINESS_ID = businessId;
})();
