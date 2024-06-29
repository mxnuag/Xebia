document.addEventListener('DOMContentLoaded', function() {
    const uploadForm = document.getElementById('uploadForm');
    const messageDiv = document.getElementById('message');

    const aadharInput = document.getElementById('aadhar');
    const aadharDropArea = document.getElementById('aadhar-drop-area');
    const panInput = document.getElementById('pan');
    const panDropArea = document.getElementById('pan-drop-area');

    function handleDrop(event, input, dropArea, message) {
        event.preventDefault();
        const files = event.dataTransfer.files;
        if (files.length > 0) {
            input.files = files;
            dropArea.textContent = message + " Selected";
        }
        dropArea.classList.remove('dragover');
    }

    function handleDragOver(event, dropArea) {
        event.preventDefault();
        dropArea.classList.add('dragover');
    }

    function handleDragLeave(event, dropArea) {
        event.preventDefault();
        dropArea.classList.remove('dragover');
    }

    aadharDropArea.addEventListener('dragover', function(event) {
        handleDragOver(event, aadharDropArea);
    });
    aadharDropArea.addEventListener('dragleave', function(event) {
        handleDragLeave(event, aadharDropArea);
    });
    aadharDropArea.addEventListener('drop', function(event) {
        handleDrop(event, aadharInput, aadharDropArea, "Aadhar Card");
    });

    panDropArea.addEventListener('dragover', function(event) {
        handleDragOver(event, panDropArea);
    });
    panDropArea.addEventListener('dragleave', function(event) {
        handleDragLeave(event, panDropArea);
    });
    panDropArea.addEventListener('drop', function(event) {
        handleDrop(event, panInput, panDropArea, "PAN Card");
    });

    uploadForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const formData = new FormData(this);

        try {
            const response = await fetch('/upload', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();
            messageDiv.textContent = result.message;
        } catch (error) {
            messageDiv.textContent = 'An error occurred. Please try again.';
        }
    });
});
