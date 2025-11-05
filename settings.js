// Enhanced settings functionality
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('settings-form');
  const successMessage = document.getElementById('success-message');
  const saveButton = document.getElementById('save-button');
  const buttonText = saveButton.querySelector('.button-text');
  const loadingSpinner = saveButton.querySelector('.loading-spinner');

  // Load saved settings
  loadSavedSettings();

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show loading state
    buttonText.style.display = 'none';
    loadingSpinner.style.display = 'inline';
    saveButton.disabled = true;

    // Simulate API call
    setTimeout(() => {
      saveSettings();
      
      // Hide loading state
      buttonText.style.display = 'inline';
      loadingSpinner.style.display = 'none';
      saveButton.disabled = false;
      
      // Show success message
      successMessage.style.display = 'block';
      setTimeout(() => {
        successMessage.style.display = 'none';
      }, 3000);
    }, 1000);
  });

  // Theme change handler for immediate preview
  document.getElementById('theme').addEventListener('change', function(e) {
    document.body.classList.toggle('lightmode', e.target.value === 'light');
  });

  function loadSavedSettings() {
    // Load from localStorage or default values
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const savedNotifications = localStorage.getItem('notifications') || 'enabled';
    const savedPrivacy = localStorage.getItem('privacy') || 'public';

    document.getElementById('theme').value = savedTheme;
    document.getElementById('notifications').value = savedNotifications;
    document.getElementById('privacy').value = savedPrivacy;

    // Apply theme immediately
    document.body.classList.toggle('lightmode', savedTheme === 'light');
  }

  function saveSettings() {
    const formData = new FormData(form);
    const settings = Object.fromEntries(formData);

    // Save to localStorage
    Object.keys(settings).forEach(key => {
      localStorage.setItem(key, settings[key]);
    });

    // Apply theme immediately
    document.body.classList.toggle('lightmode', settings.theme === 'light');
    
    console.log('Settings saved:', settings);
  }
});
