// Start of JS file
// Editing the reviews.
async function editFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="title"]').value.trim();
    const content = document.querySelector('input[name="comment"]').value.trim();
    console.log(title);
    console.log(content);

    const id = window.location.toString().split('/')
    [
      window.location.toString().split('/').length - 1
    ]; 
      const response = await fetch(`/api/reviews/${id}`, 
      {
        method: 'PUT',
        body: JSON.stringify({
          id,
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
}

document
.querySelector('.edit-review-form')
.addEventListener('submit', editFormHandler);
// End of JS file