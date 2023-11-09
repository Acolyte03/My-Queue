// Start of JS file
// Creating new reviews.
async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="title"]').value;
    const comment = document.querySelector('input[name="comment"]').value;
  
    const response = await fetch(`/api/reviews`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        comment
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  };
  
  document
  .querySelector('#new-review-form')
  .addEventListener('submit', newFormHandler);
  // End of JS file