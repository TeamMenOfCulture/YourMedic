import fetch from 'node-fetch';
import FormData from 'form-data';

async function curlCommand(downloadURL) {
  const apiUrl = 'https://ocrimage.azurewebsites.net/upload/';

  const formData = new FormData();
  formData.append('file', ''); 
  formData.append('image_url', downloadURL);

  const fetchOptions = {
    method: 'POST',
    body: formData,
    headers: {
      'accept': 'application/json',
    },
  };

  try {
    const response = await fetch(apiUrl, fetchOptions);

    if (response.ok) {
      const responseText = await response.text();
      console.log('API Response:', responseText);
      return responseText;
    } else {
      throw new Error('HTTP request failed');
    }
  } catch (error) {
    console.error('API Request error:', error);
    return "error while curl command";
  }
}

export default curlCommand;
