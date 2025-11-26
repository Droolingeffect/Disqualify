// Enhanced settings functionality with Servlet integration
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('settings-form');
  const successMessage = document.getElementById('success-message');
  const saveButton = document.getElementById('save-button');
  const buttonText = saveButton.querySelector('.button-text');
  const loadingSpinner = saveButton.querySelector('.loading-spinner');

  // Load saved settings from servlet
  loadSavedSettings();

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show loading state
    buttonText.style.display = 'none';
    loadingSpinner.style.display = 'inline';
    saveButton.disabled = true;

    // Send settings to servlet
    saveSettingsToServlet();
  });

  // Theme change handler for immediate preview
  document.getElementById('theme').addEventListener('change', function(e) {
    document.body.classList.toggle('lightmode', e.target.value === 'light');
  });

  function loadSavedSettings() {
    // Try to load from servlet first, then fallback to localStorage
    fetch('settings', {
      method: 'GET'
    })
    .then(response => {
      if (response.ok) {
        return response.text();
      }
      throw new Error('Failed to load settings from server');
    })
    .then(data => {
      console.log('Settings loaded from server:', data);
      // If servlet returns actual settings data, parse and apply them here
      // For now, fallback to localStorage
      loadFromLocalStorage();
    })
    .catch(error => {
      console.log('Using localStorage fallback:', error);
      loadFromLocalStorage();
    });
  }

  function loadFromLocalStorage() {
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

  function saveSettingsToServlet() {
    const formData = new FormData(form);
    
    // Send to servlet
    fetch('settings', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Server error: ' + response.status);
      }
      return response.text();
    })
    .then(data => {
      console.log('Settings saved to server:', data);
      
      // Also save to localStorage as backup
      saveToLocalStorage();
      
      // Show success message
      successMessage.style.display = 'block';
      setTimeout(() => {
        successMessage.style.display = 'none';
      }, 3000);
    })
    .catch(error => {
      console.error('Error saving to server, using localStorage:', error);
      // Fallback to localStorage if server fails
      saveToLocalStorage();
      
      // Show success message anyway (for demo)
      successMessage.style.display = 'block';
      successMessage.textContent = 'Settings saved locally';
      setTimeout(() => {
        successMessage.style.display = 'none';
        successMessage.textContent = 'Settings saved successfully!';
      }, 3000);
    })
    .finally(() => {
      // Hide loading state
      buttonText.style.display = 'inline';
      loadingSpinner.style.display = 'none';
      saveButton.disabled = false;
    });
  }

  function saveToLocalStorage() {
    const settings = {
      theme: document.getElementById('theme').value,
      notifications: document.getElementById('notifications').value,
      privacy: document.getElementById('privacy').value
    };

    // Save to localStorage
    Object.keys(settings).forEach(key => {
      localStorage.setItem(key, settings[key]);
    });

    // Apply theme immediately
    document.body.classList.toggle('lightmode', settings.theme === 'light');
    
    console.log('Settings saved to localStorage:', settings);
  }
});