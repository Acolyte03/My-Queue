// Start of JS file
// Profile handler for viewing TV shows.
const newFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#tvshow-name').value.trim();
    const needed_funding = document.querySelector('#tvshow-funding').value.trim();
    const description = document.querySelector('#tvshow-desc').value.trim();
  
    if (name && needed_funding && description) {
      const response = await fetch(`/api/tvshows`, {
        method: 'POST',
        body: JSON.stringify({ name, needed_funding, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create tvshow');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/tvshows/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete tvshow');
      }
    }
  };
  
document
.querySelector('.new-tvshow-form')
.addEventListener('submit', newFormHandler);
  
document
.querySelector('.tvshow-list')
.addEventListener('click', delButtonHandler);
// End of JS file