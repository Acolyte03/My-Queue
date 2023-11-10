// Start of JS file
// Reviews system
async function reviewFormHandler(event) {
    event.preventDefault();

    const rtext = document.querySelector('input[name="comment-body"]').value.trim();

    const user_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (rtext) {
        const response = await fetch('/api/reviews', {
            method: 'POST',
            body: JSON.stringify({
                user_id,
                comment
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.reload();

        } else {
            alert(response.statusText);
            document.querySelector('#review-form').style.display = "block";
        }
    }
}

document
.querySelector('.review-form')
.addEventListener('submit', reviewFormHandler);
// End of JS file