document.getElementById('generateBtn').addEventListener('click', async () => {
  const fileInput = document.getElementById('imageInput');
  const progressBar = document.getElementById('progressBar');
  const progress = document.getElementById('progress');
  const statusMessage = document.getElementById('statusMessage');
  const imageUrlInput = document.getElementById('imageUrl');
  const copyBtn = document.getElementById('copyBtn');

  if (fileInput.files.length === 0) {
    alert('Please select an image first');
    return;
  }

  const file = fileInput.files[0];
  const formData = new FormData();
  formData.append('image', file);

  progressBar.style.display = 'block';
  statusMessage.textContent = 'Uploading...';

  try {
    const response = await fetch('https://api.imgbb.com/1/upload?key=YOUR_IMGBB_API_KEY', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    const result = await response.json();
    const imageUrl = result.data.url;

    statusMessage.textContent = 'Upload complete!';
    progress.style.width = '100%';

    imageUrlInput.value = imageUrl;
    imageUrlInput.style.display = 'block';
    copyBtn.style.display = 'inline-block';

    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(imageUrl);
      alert('Link copied to clipboard!');
    });
  } catch (error) {
    console.error(error);
    statusMessage.textContent = 'Error uploading image.';
  }
});
