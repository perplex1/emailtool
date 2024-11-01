
                // Define input fields and their corresponding preview elements
                const inputFields = {
                    subject_line: ["preview-subject-line"],
                    preheader: ["preheader-preview"],
                    header1: ["preview-header1"],
                    salutation: ["preview-salutation"],
                    bodycontent1: ["preview-bodycontent1"],
                    button1: ["preview-button1"],
                    bodycontent2: ["preview-bodycontent2"],
                    signature: ["signature-preview"],
                    auto_generated: ["auto-generated-preview"],
                    footer_text: ["footer-text-preview"],
                    ai_role: [],
                    image_upload: ["preview-image"],
                };

                document.addEventListener("DOMContentLoaded", () => {


                    const imageUpload = document.getElementById('image_upload');
const imagePreview = document.getElementById('image_preview');
const imageControls = document.getElementById('image_controls');
let uploadedImage = null;

imageUpload.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            uploadedImage = new Image();
            uploadedImage.onload = function() {
                imagePreview.innerHTML = '';
                imagePreview.appendChild(uploadedImage);
                imageControls.style.display = 'block';
                updatePreview();
            }
            uploadedImage.src = event.target.result;
        }
        reader.readAsDataURL(file);
    }
});

// Basic image editing functions
document.getElementById('crop_image').addEventListener('click', () => {
    // Simple crop: just cuts the image in half
    if (uploadedImage) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = uploadedImage.width / 2;
        canvas.height = uploadedImage.height / 2;
        ctx.drawImage(uploadedImage, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
        uploadedImage.src = canvas.toDataURL();
        imagePreview.innerHTML = '';
        imagePreview.appendChild(uploadedImage);
        updatePreview();
    }
});

document.getElementById('resize_image').addEventListener('click', () => {
    if (uploadedImage) {
        const newWidth = prompt("Enter new width in pixels:", uploadedImage.width);
        if (newWidth) {
            const aspectRatio = uploadedImage.height / uploadedImage.width;
            const newHeight = newWidth * aspectRatio;
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = newWidth;
            canvas.height = newHeight;
            ctx.drawImage(uploadedImage, 0, 0, newWidth, newHeight);
            uploadedImage.src = canvas.toDataURL();
            imagePreview.innerHTML = '';
            imagePreview.appendChild(uploadedImage);
            updatePreview();
        }
    }
});

document.getElementById('change_ratio').addEventListener('click', () => {
    if (uploadedImage) {
        const newRatio = prompt("Enter new aspect ratio (e.g., 16:9, 4:3, 1:1):", "16:9");
        if (newRatio) {
            const [width, height] = newRatio.split(':').map(Number);
            const aspectRatio = height / width;
            const newWidth = uploadedImage.width;
            const newHeight = newWidth * aspectRatio;
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = newWidth;
            canvas.height = newHeight;
            ctx.drawImage(uploadedImage, 0, 0, newWidth, newHeight);
            uploadedImage.src = canvas.toDataURL();
            imagePreview.innerHTML = '';
            imagePreview.appendChild(uploadedImage);
            updatePreview();
        }
    }
});

                    function createPadlockSVG() {
                        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                        svg.setAttribute("width", "16");
                        svg.setAttribute("height", "16");
                        svg.setAttribute("fill", "currentColor");
                        svg.setAttribute("class", "bi bi-lock padlock-svg");
                        svg.setAttribute("viewBox", "0 0 24 24");
                        svg.innerHTML = `
                            <path d="M18 10v-4c0-3.313-2.687-6-6-6s-6 2.687-6 6v4h-3v14h18v-14h-3zm-5 7.723v2.277h-2v-2.277c-.595-.347-1-.984-1-1.723 0-1.104.896-2 2-2s2 .896 2 2c0 .738-.404 1.376-1 1.723zm-5-7.723v-4c0-2.206 1.794-4 4-4 2.205 0 4 1.794 4 4v4h-8z"/>
                        `;
                        return svg;
                    }

                    const style = document.createElement('style');
                        style.textContent = `
                            .padlock-svg {
                                position: absolute;
                                bottom: 10px;
                                right: 10px;
                                width: 15px;
                                height: 15px;
                                color: #ccc;
                                transition: all 0.3s;
                            }
                        `;
                        document.head.appendChild(style);
                   
                        function createGrabbableSVG() {
    const svg = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
    );
    svg.setAttribute("width", "16");
    svg.setAttribute("height", "16");
    svg.setAttribute("fill", "currentColor");
    svg.setAttribute(
        "class",
        "bi bi-grip-horizontal grabbable-svg drag-handle"
    );
    svg.setAttribute("viewBox", "0 0 16 16");
    svg.setAttribute("id", "grabbable-svg");
    svg.innerHTML = `
        <path d="M2 8a1 1 0 1 1 0 2 1 1 0 0 1 0-2m0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2m3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2m0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2m3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2m0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2m3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2m0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2m3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2m0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
    `;
    return svg;
}

                    function appendSVGIcons() {
                        const allInputGroups = document.querySelectorAll('.input-group');
                        allInputGroups.forEach((group) => {
                            if (group.closest('#draggable-container')) {
                                const grabbableSVG = createGrabbableSVG();
                                group.appendChild(grabbableSVG);
                            } else {
                                const padlockSVG = createPadlockSVG();
                                group.appendChild(padlockSVG);
                            }
                        });
                    }

                    appendSVGIcons();


                   

                    const charLimits = {
                        subject_line: 100,
                        preheader: 150,
                        header1: 200,
                        salutation: 50,
                        bodycontent1: 1000,
                        button1: 50,
                        bodycontent2: 1000,
                        signature: 200,
                        auto_generated: 200,
                        footer_text: 1500,
                    };

                    for (const [inputId, limit] of Object.entries(charLimits)) {
                        const inputElement = document.getElementById(inputId);
                        if (inputElement) {
                            inputElement.maxLength = limit;

                            // Create and append character count display inside the input/textarea
                            const charCountDisplay = document.createElement("div");
                            charCountDisplay.className = "char-count";
                            charCountDisplay.textContent = `${inputElement.value.length}`;

                            // Wrap input/textarea with a relative container
                            const wrapper = document.createElement("div");
                            //const wrapper2 = document.createElement("div");
                            wrapper.style.position = "relative";
                            wrapper.style.display = "grid";
                            wrapper.style.gridTemplateRows = "1fr auto";
                            wrapper.style.alignItems = "baseline";
                            //wrapper2.style.position = "relative";
                            inputElement.parentNode.insertBefore(wrapper, inputElement);
                            //inputElement.parentNode.insertBefore(wrapper2, inputElement.previousSibling);
                            wrapper.appendChild(inputElement);
                            wrapper.appendChild(charCountDisplay);

                            // Add event listener to update character count
                            inputElement.addEventListener('input', function () {
                                charCountDisplay.textContent = `${this.value.length}`;
                            });
                        }
                    }

                    for (const inputId of Object.keys(inputFields)) {
                        const inputElement =
                            document.getElementById(inputId);
                        const toggleElement = document.getElementById(
                            `toggle_${inputId}`
                        );

                        if (inputElement) {
                            inputElement.addEventListener("input", () => {
                                updatePreview();
                                formChanged = true;
                            });
                        }
                        if (toggleElement) {
                            toggleElement.addEventListener("change", () => {
                                updatePreview();
                                formChanged = true;
                            });
                        }
                    }

                    const defaultAIRole =
                        "You are a modern marketing e-mail content copywriter and generator of a supplemental insurance company. You specialize in creating communications that drive desired outcomes. You are asked to create communications to existing policyholders.  You will provide friendly modern wording that is clear.   Provide only the requested output without any additional explanations, greetings, or quotation marks. imagine the answers you provide will be pasted directly into an e-mail for viewing. You can also incorporate markdown language ive included in this tool in your responses for body and footer content (only) as necessary.";

                    document
                        .querySelectorAll("textarea")
                        .forEach((textarea) => {
                            if (textarea.id === "ai-role") {
                                textarea.value =
                                    textarea.value || defaultAIRole;
                            }
                            autoResizeTextarea(textarea);
                            textarea.addEventListener("input", () => {
                                autoResizeTextarea(textarea);
                                formChanged = true;
                            });
                        });

                    const modal =
                        document.getElementById("markdown-modal");
                    const markdownBtn = document.getElementById(
                        "markdown-guide-button"
                    );
                    const saveBtn =
                        document.getElementById("save-button");
                    const copyBtn =
                        document.getElementById("copy-button");
                    const span =
                        document.getElementsByClassName("close")[0];
                    const settingsModal =
                        document.getElementById("settings-modal");
                    const settingsBtn =
                        document.getElementById("settings-button");

                    const modelSelect =
                        document.getElementById("model-select");
                    const aiRoleTextarea =
                        document.getElementById("ai-role");
                    const markdownModal =
                        document.getElementById("markdown-modal");

                    aiRoleTextarea.value =
                        aiRoleTextarea.value || defaultAIRole;

                    settingsBtn.onclick = function () {
                        settingsModal.classList.add("show");
                    };




                    let currentModel = "gpt4o";

                    modelSelect.addEventListener("change", function () {
                        currentModel = this.value;
                        console.log("Selected model:", currentModel);
                    });

                    markdownBtn.onclick = function () {
                        modal.classList.add("show");
                    };

                    span.onclick = function () {
                        modal.classList.remove("show");
                    };

                    saveBtn.onclick = saveTemplate;
                    copyBtn.onclick = exportImage;

                    document.getElementById("ai-role").value =
                        defaultAIRole;
                    document
                        .getElementById("import-word-button")
                        .addEventListener("click", function () {
                            document
                                .getElementById("word-file-input")
                                .click();
                        });

                    document
                        .getElementById("word-file-input")
                        .addEventListener("change", function (event) {
                            const file = event.target.files[0];
                            if (file) {
                                const reader = new FileReader();
                                reader.onload = function (e) {
                                    importFromWord(e.target.result);
                                };
                                reader.readAsArrayBuffer(file);
                            }
                        });

                    const checkDocxLoaded = setInterval(() => {
                        if (typeof docx !== "undefined") {
                            clearInterval(checkDocxLoaded);
                            console.log("docx library loaded");
                        }
                    }, 100);

                    setTimeout(() => {
                        clearInterval(checkDocxLoaded);
                        if (typeof docx === "undefined") {
                            console.error("docx library failed to load");
                            alert(
                                "The required library for exporting to Word failed to load. Please check your internet connection and reload the page."
                            );
                        }
                    }, 5000);

                    let originalTexts = {};
                    let formChanged = false;

                    async function getAIRecommendation(prompt) {
                        const aiRoleTextarea =
                            document.getElementById("ai-role");
                        const aiRole = aiRoleTextarea
                            ? aiRoleTextarea.value.slice(0, 500)
                            : ""; // Limit AI role to 500 characters
                        const truncatedPrompt = prompt.slice(0, 1000); // Limit prompt to 1000 characters

                        if (currentModel === "gpt4o") {
                            try {
                                console.log("Sending request to OpenAI API...");
                                const response = await fetch(
                                    "https://my-claude-proxy-9kbcdr62g-perplex1s-projects.vercel.app/api/openai",
                                    {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify({
                                            model: "gpt-4o",
                                            messages: [
                                                { role: "system", content: aiRole },
                                                {
                                                    role: "user",
                                                    content: truncatedPrompt,
                                                },
                                            ],
                                            max_tokens: 500,
                                            temperature: 1.2,
                                        }),
                                    }
                                );

                                if (!response.ok) {
                                    const errorBody = await response.text();
                                    console.error(
                                        "OpenAI API response not OK:",
                                        response.status,
                                        response.statusText,
                                        errorBody
                                    );
                                    throw new Error(
                                        `HTTP error! status: ${response.status}, body: ${errorBody}`
                                    );
                                }

                                const data = await response.json();
                                console.log(
                                    "Received response from OpenAI API:",
                                    data
                                );
                                return data.choices[0].message.content.trim();
                            } catch (error) {
                                console.error(
                                    "Error in getAIRecommendation (OpenAI):",
                                    error
                                );
                                throw error;
                            }
                        } else if (currentModel === "claude3.5") {
                            try {
                                console.log("Sending request to Claude API...");
                                const response = await fetch(
                                    "https://my-claude-proxy-9kbcdr62g-perplex1s-projects.vercel.app/api/claude",
                                    {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify({
                                            model: "claude-3-sonnet-20240229",
                                            max_tokens: 500,
                                            system: aiRole,
                                            messages: [
                                                {
                                                    role: "user",
                                                    content: truncatedPrompt,
                                                },
                                            ],
                                        }),
                                    }
                                );

                                if (!response.ok) {
                                    const errorBody = await response.text();
                                    console.error(
                                        "Claude API response not OK:",
                                        response.status,
                                        response.statusText,
                                        errorBody
                                    );
                                    throw new Error(
                                        `HTTP error! status: ${response.status}, body: ${errorBody}`
                                    );
                                }

                                const data = await response.json();
                                console.log(
                                    "Received response from Claude API:",
                                    data
                                );

                                if (
                                    !data.content ||
                                    !Array.isArray(data.content) ||
                                    data.content.length === 0 ||
                                    typeof data.content[0].text !== "string"
                                ) {
                                    console.error(
                                        "Unexpected response format from Claude:",
                                        data
                                    );
                                    throw new Error(
                                        "Unexpected response format from Claude API"
                                    );
                                }

                                return data.content[0].text;
                            } catch (error) {
                                console.error(
                                    "Error in getAIRecommendation (Claude):",
                                    error
                                );
                                throw error;
                            }
                        } else {
                            throw new Error(
                                `Unsupported model: ${currentModel}`
                            );
                        }
                    }

                    async function suggestAlternative(inputId) {
                        const inputElement =
                            document.getElementById(inputId);
                        const suggestButton = document.querySelector(
                            `button.ai-suggest[data-input-id="${inputId}"]`
                        );
                        const restoreButton =
                            inputElement.parentNode.querySelector(
                                ".restore-original"
                            );
                        const keepButton =
                            inputElement.parentNode.querySelector(
                                ".keep-suggestion"
                            );

                        if (!inputElement || !suggestButton) return;

                        const currentValue = inputElement.value;
                        const originalColor =
                            suggestButton.style.background;

                        if (!originalTexts[inputId]) {
                            originalTexts[inputId] = currentValue;
                        }

                        // Disable button and show loading state
                        suggestButton.disabled = true;
                        const originalText = suggestButton.textContent;
                        suggestButton.textContent = "Thinking...";
                        suggestButton.style.background = "#cccccc";

                        let prompt;
                        switch (inputId) {
                            case "subject_line":
                                prompt = `Generate an attention-grabbing email subject line based on this: "${currentValue}". Respond with ONLY the new subject line, without any additional text, quotes, or explanations.`;
                                break;
                            case "preheader":
                                prompt = `Create a brief email preheader based on: "${currentValue}". Provide ONLY the new preheader text, without any additional words, quotes, or explanations.`;
                                break;
                            case "header1":
                                prompt = `Write a compelling email header based on: "${currentValue}". Respond with ONLY the new header text, without any additional words, quotes, or explanations.`;
                                break;
                            case "salutation":
                                prompt = `Provide an email salutation similar to but different from: "${currentValue}". Respond with ONLY the new salutation, without any additional text, quotes, or explanations.`;
                                break;
                            case "bodycontent1":
                                prompt = `Rewrite this email body content in a different style: "${currentValue}". Provide ONLY the new content, without any salutation, complimentary close, additional text, quotes, or explanations.`;
                                break;
                            case "bodycontent2":
                                prompt = `Rewrite this email body content in a different style: "${currentValue}". Provide ONLY the new content, without any salutation, complimentary close, additional text, quotes, or explanations.`;
                                break;
                            case "button1":
                                prompt = `Generate a short call-to-action button text based on: "${currentValue}". Respond with ONLY the new button text, without any additional words, quotes, or explanations.`;
                                break;
                            case "signature":
                                prompt = `Create an email signature different from but based on: "${currentValue}". Provide ONLY the new signature, without any additional text, quotes, or explanations.`;
                                break;
                            case "auto_generated":
                                prompt = `Write a brief auto-generated/do not reply message based on: "${currentValue}". Respond with ONLY the new message, without any additional text, quotes, or explanations.`;
                                break;
                            case "footer_text":
                                prompt = `Create an email footer text, maintaining the same structure and links but different from: "${currentValue}". Provide ONLY the new footer text, without any additional words, quotes, or explanations.`;
                                break;
                            default:
                                prompt = `Rewrite this text in a different style: "${currentValue}". Respond with ONLY the new text, without any additional words, quotes, or explanations.`;
                        }

                        try {
                            let suggestion = await getAIRecommendation(
                                prompt
                            );
                            suggestion = suggestion.replace(
                                /^["']|["']$|^Subject:\s*|^---\s*/g,
                                ""
                            );
                            inputElement.value = suggestion;
                            if (
                                inputElement.tagName.toLowerCase() ===
                                "textarea"
                            ) {
                                autoResizeTextarea(inputElement);
                            }

                            inputElement.dispatchEvent(new Event('input', { bubbles: true }));

                            updatePreview();
                            formChanged = true;

                            if (restoreButton) {
                                restoreButton.style.display = "inline-block";
                            }
                            if (keepButton) {
                                keepButton.style.display = "inline-block";
                            }
                        } catch (error) {
                            console.error(
                                "Error getting AI suggestion:",
                                error
                            );
                            alert(
                                "Failed to get AI suggestion. Please try again."
                            );
                        } finally {
                            // Re-enable button and restore original text
                            suggestButton.disabled = false;
                            suggestButton.textContent = originalText;
                            suggestButton.style.background = originalColor;
                        }
                    }


async function generateImage(prompt) {
  const generateButton = document.getElementById('generate_image');
  const imagePreview = document.getElementById('image_preview');
  const imageControls = document.getElementById('image_controls');
  const loadingIndicator = document.createElement('div');
  loadingIndicator.textContent = 'Generating...';

  try {
    generateButton.disabled = true;
    imagePreview.innerHTML = '';
    imagePreview.appendChild(loadingIndicator);
    imageControls.style.display = 'none';

    const response = await fetch('https://my-claude-proxy.vercel.app/api/generate-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`HTTP error! status: ${response.status}, details: ${JSON.stringify(errorData)}`);
    }

    const result = await response.json();
    const imageUrl = result.image_url;

    // Create an image element and set its source
    const img = new Image();
    img.onload = function() {
      uploadedImage = img;
      imagePreview.innerHTML = '';
      imagePreview.appendChild(img);
      imageControls.style.display = 'block';
      updatePreview();
    };
    img.src = imageUrl;

    return imageUrl;
  } catch (error) {
    console.error('Error generating image:', error);
    imagePreview.innerHTML = 'Failed to generate image. Please try again.';
    throw error;
  } finally {
    generateButton.disabled = false;
  }
}

// Update the event listener for the generate image button
document.getElementById('generate_image').addEventListener('click', async () => {
  const prompt = document.getElementById('image_prompt').value;
  try {
    await generateImage(prompt);
  } catch (error) {
    alert('Failed to generate image. Please check the console for more details.');
  }
});

                    function restoreOriginal(inputId) {
                        const inputElement =
                            document.getElementById(inputId);
                        if (originalTexts[inputId]) {
                            inputElement.value = originalTexts[inputId];

                            inputElement.dispatchEvent(new Event('input', { bubbles: true }));

                            updatePreview();
                            formChanged = true;

                            const restoreButton =
                                inputElement.parentNode.querySelector(
                                    ".restore-original"
                                );
                            const keepButton =
                                inputElement.parentNode.querySelector(
                                    ".keep-suggestion"
                                );
                            if (restoreButton) {
                                restoreButton.style.display = "none";
                            }

                            delete originalTexts[inputId];

                            if (keepButton) {
                                keepButton.style.display = "none";
                            }
                        }
                    }

                    function addAIButtons() {
                        for (const inputId of Object.keys(inputFields)) {
                            if (inputId !== "ai_role") {
                                const inputElement =
                                    document.getElementById(inputId);
                                let buttonContainer =
                                    inputElement.parentNode.querySelector(
                                        ".button-container"
                                    );

                                if (!buttonContainer) {
                                    buttonContainer =
                                        document.createElement("div");
                                    buttonContainer.className =
                                        "button-container";
                                    inputElement.parentNode.insertBefore(
                                        buttonContainer,
                                        inputElement.previousSibling
                                    );
                                } else {
                                    buttonContainer.innerHTML = "";
                                }

                                const suggestButton =
                                    document.createElement("button");
                                suggestButton.textContent = "AI Suggest";
                                suggestButton.className = "ai-suggest";
                                suggestButton.dataset.inputId = inputId;
                                suggestButton.onclick = () =>
                                    suggestAlternative(inputId);

                                const restoreButton =
                                    document.createElement("button");
                                restoreButton.textContent = "Restore";
                                restoreButton.className = "restore-original";
                                restoreButton.style.display = "none";
                                restoreButton.onclick = () =>
                                    restoreOriginal(inputId);

                                const keepButton =
                                    document.createElement("button");
                                keepButton.textContent = "Keep";
                                keepButton.className = "keep-suggestion";
                                keepButton.style.display = "none";
                                keepButton.onclick = () =>
                                    keepSuggestion(inputId);

                                buttonContainer.appendChild(suggestButton);
                                buttonContainer.appendChild(restoreButton);
                                buttonContainer.appendChild(keepButton);
                            }
                        }
                    }

                    function keepSuggestion(inputId) {
                        const inputElement =
                            document.getElementById(inputId);
                        originalTexts[inputId] = inputElement.value;

                        const restoreButton =
                            inputElement.parentNode.querySelector(
                                ".restore-original"
                            );
                        const keepButton =
                            inputElement.parentNode.querySelector(
                                ".keep-suggestion"
                            );
                        if (restoreButton) {
                            restoreButton.style.display = "none";
                        }
                        if (keepButton) {
                            keepButton.style.display = "none";
                        }
                    }

                    function parseMarkdown(text) {
                        return (
                            text
                                // Headers
                                .replace(/\*\*\*(.*?)\*\*\*/g, '<strong style="color:#0070A9">$1</strong>')
                                .replace(/^### (.*$)/gim, "<h3>$1</h3>")
                                .replace(/^## (.*$)/gim, "<h2>$1</h2>")
                                .replace(/^# (.*$)/gim, "<h1>$1</h1>")
                                // Bold
                                .replace(
                                    /\*\*(.*?)\*\*/g,
                                    "<strong>$1</strong>"
                                )
                                // Italic
                                .replace(/\*(.*?)\*/g, "<em>$1</em>")
                                // Links
                                .replace(
                                    /\[([^\]]+)\]\(([^)]+)\)/g,
                                    '<a href="$2" style="color:#0070A9;text-decoration:underline;">$1</a>'
                                )
                                // Unordered list items
                                .replace(/^\* (.+)/gm, "<li>$1</li>")
                                // Wrap unordered list items with <ul>
                                .replace(/(<li>.*<\/li>)/s, "<ul>$1</ul>")
                                // Blockquotes
                                .replace(
                                    /^> (.+)/gm,
                                    "<blockquote>$1</blockquote>"
                                )
                                // Strikethrough
                                .replace(/~~(.*?)~~/g, "<del>$1</del>")
                                // Superscript
                                .replace(/\^(.*?)\^/g, "<sup>$1</sup>")
                                // Code blocks
                                .replace(
                                    /```(\w+)?\n([\s\S]*?)```/g,
                                    '<pre><code class="language-$1">$2</code></pre>'
                                )
                                // Inline code
                                .replace(/`([^`]+)`/g, "<code>$1</code>")
                                // Horizontal rule
                                .replace(/^(-{3}|_{3})$/gm, "<hr>")
                                // Line breaks
                                .replace(/\n/g, "<br>")
                        );
                    }

                    function getCurrentFilename() {
                        const path = window.location.pathname;
                        return path.substring(path.lastIndexOf("/") + 1);
                    }

                    function updatePreview() {
    console.log("Updating preview...");
    updateSubjectAndPreheader();

    const draggableContainer = document.getElementById('draggable-container');
    const previewContainer = document.querySelector('#template-preview td');

    console.log("Preview container:", previewContainer);

    // Clear existing preview content (except for the logo)
    const logo = previewContainer.querySelector("img[alt='Aflac Logo']");
    previewContainer.innerHTML = "";
    previewContainer.appendChild(logo);

    // Update preview for draggable elements
    draggableContainer.querySelectorAll(".input-group").forEach((group) => {
        const inputId = group.dataset.inputId;
        const inputElement = document.getElementById(inputId);
        const toggleElement = document.getElementById(`toggle_${inputId}`);

        console.log("Processing input:", inputId);

        if (!inputElement || inputId === "footer_text") return;

        const inputValue = inputElement.value;
        const isVisible = toggleElement && toggleElement.checked;

        if (!isVisible) return;

        console.log("Creating preview for:", inputId);

        let previewElement;
        switch (inputId) {
            case "image_upload":
        if (uploadedImage) {
          previewElement = document.createElement("img");
          previewElement.src = uploadedImage.src;
          previewElement.style.maxWidth = "100%";
          previewElement.style.height = "auto";
          previewElement.id = "preview-image";
        }
        break;
            case "header1":
                previewElement = document.createElement("h1");
                previewElement.id = "preview-header1";
                previewElement.style.cssText = "display: block; margin-bottom: 40px; margin-top: 0; margin-left: 30px; margin-right: 30px; color: #0070A9; font-size: 48px; line-height: 50px; font-weight: 700;";
                break;
            case "salutation":
                previewElement = document.createElement("h2");
                previewElement.id = "preview-salutation";
                previewElement.style.cssText = "margin: 0px; margin-bottom: 20px; margin-left: 30px; margin-right: 30px; font-weight: normal; font-size: 26px; text-align: left; line-height: 30px; color: rgb(0, 112, 169); display: block;";
                break;
            case "bodycontent1":
            case "bodycontent2":
                previewElement = document.createElement("p");
                previewElement.id = `preview-${inputId}`;
                previewElement.style.cssText = "display: block; font-size: 16px; line-height: 28px; color: #555555; text-align: left; padding: 0px 0; margin: 20px 30px 20px 30px";
                break;
            case "button1":
                previewElement = document.createElement("div");
                previewElement.style.textAlign = "center";
                previewElement.style.padding = "20px 0";
                previewElement.style.cssText = "display: block; align-items: center";
                const buttonLink = document.createElement("a");
                buttonLink.href = inputValue.match(/\[([^\]]*)\]\(([^)]+)\)/)?.[2] || "#";
                buttonLink.className = "buttonblock";
                buttonLink.id = "preview-button1";
                buttonLink.textContent = inputValue.replace(/\[([^\]]*)\]\(([^)]+)\)/, "$1");
                previewElement.appendChild(buttonLink);
                break;
            case "signature":
                previewElement = document.createElement("p");
                previewElement.id = "signature-preview";
                previewElement.style.cssText = "display: block; font-size: 16px; line-height: 28px; color: #555555; text-align: left; padding: 00px 30px 0px; margin: 0;";
                break;
            case "auto_generated":
                previewElement = document.createElement("p");
                previewElement.id = "auto-generated-preview";
                previewElement.style.cssText = "font-size: 14px; line-height: 24px; color: rgb(85, 85, 85); display: block; padding: 30px 30px 20px 30px";
                break;
            default:
                previewElement = document.createElement("p");
                previewElement.id = `preview-${inputId}`;
        }

        if (previewElement) {
            if (inputId !== "button1") {
                previewElement.innerHTML = parseMarkdown(inputValue);
            }
            previewContainer.appendChild(previewElement);
            console.log("Added preview element for:", inputId);
        }
    });

    // Update footer separately
    updateFooter();
    console.log("Preview update complete");
}



                    function updateFooter() {
                        const footerInput =
                            document.getElementById("footer_text");
                        const footerToggle =
                            document.getElementById("toggle_footer_text");
                        const footerWrapper = document.querySelector(
                            "#template-preview .footer-wrapper"
                        );
                        const footerTextPreview = document.getElementById(
                            "footer-text-preview"
                        );

                        if (
                            footerWrapper &&
                            footerTextPreview &&
                            footerInput &&
                            footerToggle
                        ) {
                            footerWrapper.style.display = footerToggle.checked
                                ? "table-cell"
                                : "none";
                            footerTextPreview.innerHTML = parseMarkdown(
                                footerInput.value
                            );
                        }
                    }

                    function updateSubjectAndPreheader() {
                        const subjectElement = document.getElementById(
                            "preview-subject-line"
                        );
                        const preheaderElement =
                            document.getElementById("preheader-preview");
                        const wrapperElement = subjectElement.closest(
                            ".email-content-wrapper"
                        );

                        if (
                            subjectElement &&
                            preheaderElement &&
                            wrapperElement
                        ) {
                            subjectElement.textContent =
                                document.getElementById("subject_line").value;
                            preheaderElement.textContent =
                                document.getElementById("preheader").value;
                            wrapperElement.title = `${subjectElement.textContent} ${preheaderElement.textContent}`;
                        }
                    }

                    function importFromWord(file) {
                        mammoth
                            .convertToHtml({ arrayBuffer: file })
                            .then(function (result) {
                                console.log("HTML conversion successful");
                                const html = result.value;
                                const parser = new DOMParser();
                                const doc = parser.parseFromString(
                                    html,
                                    "text/html"
                                );

                                if (result.messages.length > 0) {
                                    console.warn(
                                        "Warnings during conversion:",
                                        result.messages
                                    );
                                }

                                const headings = doc.querySelectorAll(
                                    "h1, h2, h3, h4, h5, h6"
                                );

                                headings.forEach((heading) => {
                                    const headingText = heading.textContent
                                        .trim()
                                        .toLowerCase()
                                        .replace(/\s+/g, " ");
                                    console.log(
                                        "Processing heading:",
                                        headingText
                                    );

                                    if (headingText === "selected ai model:") {
                                        const modelValue =
                                            heading.nextElementSibling.textContent.trim();
                                        document.getElementById(
                                            "model-select"
                                        ).value = modelValue;
                                        currentModel = modelValue;
                                        return;
                                    }

                                    let inputId = Object.keys(inputFields).find(
                                        (key) => {
                                            const keyWords = key
                                                .replace(/[0-9]/g, "")
                                                .split("_");
                                            return keyWords.every((word) =>
                                                headingText.includes(word)
                                            );
                                        }
                                    );

                                    // Special handling for compound names
                                    if (!inputId) {
                                        if (headingText.includes("header content"))
                                            inputId = "header1";
                                        else if (
                                            headingText.includes("body content") &&
                                            !headingText.includes("2")
                                        )
                                            inputId = "bodycontent1";
                                        else if (
                                            headingText.includes("body content 2")
                                        )
                                            inputId = "bodycontent2";
                                        else if (
                                            headingText.includes("button text")
                                        )
                                            inputId = "button1";
                                    }

                                    // Special handling for AI Role
                                    if (headingText.includes("ai role")) {
                                        inputId = "ai-role";
                                    }

                                    if (inputId) {
                                        console.log(
                                            "Matched input field:",
                                            inputId
                                        );
                                        let content = "";
                                        let toggleState = null;
                                        let nextElement =
                                            heading.nextElementSibling;

                                        while (
                                            nextElement &&
                                            !nextElement.matches(
                                                "h1, h2, h3, h4, h5, h6"
                                            )
                                        ) {
                                            if (
                                                nextElement.textContent.startsWith(
                                                    "Toggle State:"
                                                )
                                            ) {
                                                toggleState =
                                                    nextElement.textContent.includes(
                                                        "On"
                                                    );
                                            } else {
                                                content +=
                                                    nextElement.textContent + "\n";
                                            }
                                            nextElement =
                                                nextElement.nextElementSibling;
                                        }

                                        const inputElement =
                                            document.getElementById(inputId);
                                        if (inputElement) {
                                            inputElement.value = content.trim();
                                            console.log(
                                                "Updated input field:",
                                                inputId
                                            );
                                            if (
                                                inputElement.tagName.toLowerCase() ===
                                                "textarea"
                                            ) {
                                                autoResizeTextarea(inputElement);
                                            }
                                        } else {
                                            console.warn(
                                                "Input element not found:",
                                                inputId
                                            );
                                        }

                                        
       

                                        const toggleElement =
                                            document.getElementById(
                                                `toggle_${inputId}`
                                            );
                                        if (toggleElement && toggleState !== null) {
                                            toggleElement.checked = toggleState;
                                            console.log(
                                                "Updated toggle state:",
                                                inputId,
                                                toggleState
                                            );
                                        }
                                    } else {
                                        console.warn(
                                            "No matching input field for heading:",
                                            headingText
                                        );
                                    }
                                });

                                 // After processing other fields, check for image data
                                 if (templateData.image_upload) {
    uploadedImage = new Image();
    uploadedImage.onload = function() {
      imagePreview.innerHTML = '';
      imagePreview.appendChild(uploadedImage);
      imageControls.style.display = 'block';
      document.getElementById('image_prompt').value = templateData.image_upload.prompt || '';
      updatePreview();
    }
    uploadedImage.src = templateData.image_upload.value;
    document.getElementById('toggle_image_upload').checked = templateData.image_upload.checked;
  }

                                updatePreview();
                                formChanged = true;
                                console.log("Import completed successfully");
                            })
                            .catch(function (error) {
                                console.error(
                                    "Error in importFromWord:",
                                    error
                                );
                                alert(
                                    "Error importing Word document: " +
                                    error.message
                                );
                            });
                    }

                    addAIButtons();
                    updatePreview();

                    const filenameDisplay =
                        document.getElementById("filename-display");
                    if (filenameDisplay) {
                        const currentFilename = getCurrentFilename();
                        filenameDisplay.textContent =
                            currentFilename !== "email_template_creator.html"
                                ? ` [${currentFilename}]`
                                : "";
                    }

                    window.addEventListener("beforeunload", function (e) {
                        if (formChanged) {
                            e.preventDefault();
                            e.returnValue = "";
                        }
                    });

                    function saveTemplate() {
    const templateData = {};
    for (const inputId of Object.keys(inputFields)) {
        if (inputId === "ai_role") {
            templateData[inputId] = {
                value: document.getElementById("ai-role").value,
                checked: true,
            };
        } else {
            templateData[inputId] = {
                value: document.getElementById(inputId).value,
                checked:
                    inputId === "subject_line" ||
                    inputId === "preheader" ||
                    document.getElementById(`toggle_${inputId}`).checked,
            };
        }
    }
    
    // Add image data to templateData
    if (uploadedImage) {
    templateData.image_upload = {
      value: uploadedImage.src,
      checked: document.getElementById('toggle_image_upload').checked,
      prompt: document.getElementById('image_prompt').value
    };
  }
                        // Add AI role from settings modal
                        const aiRoleElement =
                            document.getElementById("ai-role");
                        if (aiRoleElement) {
                            templateData["ai_role"] = {
                                value: aiRoleElement.value,
                                checked: true,
                            };
                        }

                        const docCopy = document.cloneNode(true);

                        for (const [inputId, data] of Object.entries(
                            templateData
                        )) {
                            const inputElement = docCopy.getElementById(
                                inputId === "ai_role" ? "ai-role" : inputId
                            );
                            const toggleElement = docCopy.getElementById(
                                `toggle_${inputId}`
                            );
                            if (inputElement) {
                                inputElement.value = data.value;
                            }
                            if (
                                toggleElement &&
                                inputId !== "subject_line" &&
                                inputId !== "preheader" &&
                                inputId !== "ai_role"
                            ) {
                                toggleElement.checked = data.checked;
                            }
                        }

                        const aiButtons = docCopy.querySelectorAll(
                            ".ai-suggest, .restore-original, .btn, .btn-shadow-drop, .btn-shadow-drop--black"
                        );
                        aiButtons.forEach((button) => button.remove());

                        const buttonContainers =
                            docCopy.querySelectorAll(".button-container");
                        buttonContainers.forEach((container) =>
                            container.remove()
                        );

                        const previewPane =
                            docCopy.getElementById("template-preview");
                        if (previewPane) {
                            const previewElements =
                                previewPane.querySelectorAll(
                                    '[id$="-preview"]'
                                );
                            previewElements.forEach((element) => {
                                if (element.tagName.toLowerCase() === "a") {
                                    element.textContent = "";
                                    element.href = "#";
                                } else {
                                    element.textContent = "";
                                }
                            });
                        }

                        const script = docCopy.createElement("script");
                        script.textContent = `
    document.addEventListener('DOMContentLoaded', () => {
        const inputFields = ${JSON.stringify(inputFields)};
        let originalTexts = {};
        let formChanged = false;
        let currentModel = "${currentModel}"; // Add this line

        ${getAIRecommendation.toString()}
        ${suggestAlternative.toString()}
        ${restoreOriginal.toString()}
        ${addAIButtons.toString()}
        ${parseMarkdown.toString()}
        ${updatePreview.toString()}
        ${getCurrentFilename.toString()}

        const templateData = ${JSON.stringify(templateData)};
                for (const [inputId, data] of Object.entries(templateData)) {
                    const inputElement = document.getElementById(inputId === 'ai_role' ? 'ai-role' : inputId);
                    const toggleElement = document.getElementById(\`toggle_\${inputId}\`);
                    if (inputElement) {
                        inputElement.value = data.value;
                    }
                    if (toggleElement && inputId !== 'subject_line' && inputId !== 'preheader' && inputId !== 'ai_role') {
                        toggleElement.checked = data.checked;
                    }
                }

                // Add this block for AI role initialization
                const aiRoleElement = document.getElementById('ai-role');
                if (aiRoleElement) {
                    aiRoleElement.value = ${JSON.stringify(
                            templateData["ai_role"].value
                        )};
                }

                // Set the selected model
                const modelSelect = document.getElementById('model-select');
                if (modelSelect) {
                    modelSelect.value = currentModel;
                }

                for (const inputId of Object.keys(inputFields)) {
                    const inputElement = document.getElementById(inputId);
                    const toggleElement = document.getElementById(\`toggle_\${inputId}\`);
                   
                    if (inputElement) {
                        inputElement.addEventListener('input', () => {
                            formChanged = true;
                            updatePreview();
                        });
                    }
                    if (toggleElement && inputId !== 'subject_line' && inputId !== 'preheader' && inputId !== 'ai_role') {
                        toggleElement.addEventListener('change', () => {
                            formChanged = true;
                            updatePreview();
                        });
                    }
                }

                updatePreview();
                addAIButtons();
               
                const filenameDisplay = document.getElementById('filename-display');
                if (filenameDisplay) {
                    const currentFilename = getCurrentFilename();
                    filenameDisplay.textContent = currentFilename ? \` [\${currentFilename}]\` : '';
                }
            });
        `;
                        docCopy.body.appendChild(script);

                        const blob = new Blob(
                            [docCopy.documentElement.outerHTML],
                            { type: "text/html" }
                        );
                        const a = document.createElement("a");
                        a.href = URL.createObjectURL(blob);
                        a.download = "email_template.html";
                        a.click();
                        URL.revokeObjectURL(a.href);

                        formChanged = false;
                    }

                    function exportImage() {
    const previewPane = document.getElementById("template-preview");
    const clone = previewPane.cloneNode(true);

    // Force the clone to have the collapsed state
    clone.classList.add('collapsed');
    clone.querySelector('.tableinbox').classList.add('collapsed');
    clone.querySelector('.tableinbox2').classList.add('collapsed');

    Object.assign(clone.style, {
        position: "absolute",
        left: "-9999px",
        top: "0",
        width: `${previewPane.offsetWidth}px`,
        height: "auto",
        transform: "none",
        overflow: "visible",
        backgroundColor: "#f1f3f4", // Match the collapsed background color
    });

    document.body.appendChild(clone);

    html2canvas(clone, {
        allowTaint: true,
        useCORS: true,
        letterRendering: 1,
        logging: true,
        windowWidth: clone.offsetWidth,
        windowHeight: clone.scrollHeight,
        scale: 2,
        backgroundColor: "#f1f3f4", // Ensure background color is captured
    })
    .then((canvas) => {
        document.body.removeChild(clone);

        canvas.toBlob((blob) => {
            navigator.clipboard
                .write([
                    new ClipboardItem({ "image/png": blob }),
                ])
                .then(() => {
                    alert("Preview copied to clipboard successfully!");
                })
                .catch((err) => {
                    console.error("Error copying to clipboard:", err);
                    alert("Failed to copy preview to clipboard. Please try again.");
                });
        });
    })
    .catch((error) => {
        console.error("Error in html2canvas:", error);
        document.body.removeChild(clone);
        alert("Failed to generate preview image. Please try again.");
    });
}


                    const fullscreenToggle =
                        document.getElementById("fullscreen-toggle");
                    const inputPane =
                        document.querySelector(".input-pane");
                    const pane =
                        document.querySelector(".pane");
                    const panepreview =
                        document.querySelector("#template-preview.pane");
                    const tablepreview =
                        document.querySelector(".tableinbox");
                    const tablepreview2 =
                        document.querySelector(".tableinbox2");
                    const container =
                        document.querySelector(".container");
                    const mainicons =
                        document.querySelector(".mainicons");




                    fullscreenToggle.addEventListener("click", () => {
                        inputPane.classList.toggle("collapsed");
                        pane.classList.toggle("collapsed");
                        panepreview.classList.toggle("collapsed");
                        tablepreview.classList.toggle("collapsed");
                        tablepreview2.classList.toggle("collapsed");
                        container.classList.toggle("collapsed");
                        mainicons.classList.toggle("collapsed");
                        menuContent.classList.toggle("collapsed");
                        document.getElementsByTagName('body')[0].classList.toggle('backgroundbody');

                        const fullscreenSVG = fullscreenToggle.querySelector('.bi-fullscreen');
                        const fullscreenExitSVG = fullscreenToggle.querySelector('.bi-fullscreen-exit');
                        if (fullscreenSVG.style.display === 'none') {
                            fullscreenSVG.style.display = 'block';
                            fullscreenExitSVG.style.display = 'none';
                        } else {
                            fullscreenSVG.style.display = 'none';
                            fullscreenExitSVG.style.display = 'block';
                        }
                    
                    });

                    

                    // Add event listener for the AI role input
                    document
                        .getElementById("ai-role")
                        .addEventListener("input", () => {
                            formChanged = true;
                        });

                    const exportWordBtn =
                        document.getElementById("export-word-button");
                    if (exportWordBtn) {
                        exportWordBtn.removeEventListener(
                            "click",
                            exportToWord
                        );
                        exportWordBtn.addEventListener(
                            "click",
                            function (event) {
                                event.preventDefault();
                                exportToWord();
                            }
                        );
                    }

            

                    const draggableContainer = document.getElementById('draggable-container');
let draggingElem = null;
let placeholder = null;
let initialPosition = null;
let dragStartY = 0;

if (!draggableContainer) {
    console.error("Draggable container not found!");
} else {
    draggableContainer.addEventListener('mousedown', function (e) {
        console.log('Mouse down on:', e.target);

        // Check if the click is inside an input, textarea, or on text content
        if (e.target.isContentEditable ||
            e.target.matches('input, textarea')) {
            console.log('Clicked on text input');
            return; // Allow default behavior for text selection
        }

        // Only initiate drag if the grab handle (grabbable-svg) is clicked
        if (e.target.matches('.grabbable-svg, .grabbable-svg *')) {
            console.log('Initiating drag');
            const inputGroup = e.target.closest('.input-group');
            if (inputGroup) {
                e.preventDefault();
                e.stopPropagation(); // Stop the event from bubbling up
                initiateDrag(inputGroup, e.clientY);
            }
        } else {
            console.log('Clicked on other element');
        }
    });

    function initiateDrag(inputGroup, clientY) {
        draggingElem = inputGroup;
        initialPosition = Array.from(draggableContainer.children).indexOf(draggingElem);
        dragStartY = clientY - inputGroup.getBoundingClientRect().top;

        const rect = inputGroup.getBoundingClientRect();

        placeholder = document.createElement('div');
        placeholder.className = 'drag-placeholder';
        placeholder.style.height = `${rect.height}px`;
        draggingElem.parentNode.insertBefore(placeholder, draggingElem.nextSibling);

        // Store the original styles
        draggingElem.dataset.originalStyles = draggingElem.style.cssText;

        // Set styles for dragging
        Object.assign(draggingElem.style, {
            position: 'fixed',
            zIndex: '1000',
            width: `${rect.width}px`,
            left: `${rect.left}px`,
            top: `${clientY - dragStartY}px`,
            boxSizing: 'border-box'
        });

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    }

    function onMouseMove(e) {
        if (!draggingElem) return;
        draggingElem.style.top = `${e.clientY - dragStartY}px`;

        const afterElement = getDragAfterElement(draggableContainer, e.clientY);
        if (afterElement == null) {
            draggableContainer.appendChild(placeholder);
        } else {
            draggableContainer.insertBefore(placeholder, afterElement);
        }
    }

    function onMouseUp() {
        if (!draggingElem) return;
       
        // Restore original styles
        draggingElem.style.cssText = draggingElem.dataset.originalStyles;
        delete draggingElem.dataset.originalStyles;

        placeholder.parentNode.insertBefore(draggingElem, placeholder);
        placeholder.parentNode.removeChild(placeholder);

        const finalPosition = Array.from(draggableContainer.children).indexOf(draggingElem);
        if (initialPosition !== finalPosition) {
            formChanged = true;
            console.log('Order changed, formChanged set to true');
        }

        updatePreview();

        draggingElem = null;
        placeholder = null;
        initialPosition = null;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }

    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.input-group:not(.dragging):not(.drag-placeholder)')];

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    // Ensure input fields aren't draggable
    draggableContainer.querySelectorAll('input, textarea').forEach(input => {
        input.draggable = false;
        input.addEventListener('mousedown', function(e) {
            e.stopPropagation();
        });
    });

    // Ensure input groups aren't draggable
    draggableContainer.querySelectorAll('.input-group').forEach(group => {
        group.draggable = false;
    });

    console.log('Drag and drop listeners set up with form change detection');
}
               

                const hamburgerMenu = document.getElementById('hamburger-menu');
const menuOverlay = document.getElementById('menu-overlay');
const menuContent = document.querySelector('.menu-content'); // Use querySelector for class

// Function to reset the hamburger menu
function resetHamburgerMenu() {
    hamburgerMenu.classList.remove('change');
    menuContent.classList.remove('show');
    menuOverlay.classList.remove('show');
    menuOverlay.classList.remove('visible');
}

// Function to show or hide the menu overlay
function toggleMenuOverlay() {
    hamburgerMenu.classList.toggle('change');
    if (menuOverlay.classList.contains('show')) {
        menuContent.classList.remove('show');
        menuOverlay.addEventListener('transitionend', function() {
            if (!menuOverlay.classList.contains('show')) {
                menuOverlay.classList.remove('visible');
            }
        }, { once: true });
        menuOverlay.classList.remove('show');
    } else {
        menuOverlay.classList.add('visible');
        requestAnimationFrame(() => {
            menuOverlay.classList.add('show');
            menuContent.classList.add('show');
        });
    }
}

hamburgerMenu.addEventListener('click', toggleMenuOverlay);

menuOverlay.addEventListener('click', function(e) {
    if (e.target === menuOverlay) {
        resetHamburgerMenu();
    }
});

// Modal functionality for Markup Guide and Settings
//const markdownModal = document.getElementById("markdown-modal");
//const settingsModal = document.getElementById("settings-modal");
const markdownButton = document.getElementById("markdown-guide-button");
const settingsButton = document.getElementById("settings-button");
const markdownClose = markdownModal.querySelector(".close");
const settingsClose = settingsModal.querySelector(".close");

// Function to open a modal
function openModal(modal) {
    modal.style.display = "flex";
    modal.classList.add('show');
}

// Function to close a modal
function closeModal(modal) {
    modal.style.display = "none";
    modal.classList.remove('show');
    resetHamburgerMenu();
}

markdownButton.onclick = function() {
    openModal(markdownModal);
};

settingsButton.onclick = function() {
    openModal(settingsModal);
};

markdownClose.onclick = function() {
    closeModal(markdownModal);
};

settingsClose.onclick = function() {
    closeModal(settingsModal);
};

window.onclick = function(event) {
    if (event.target === markdownModal) {
        closeModal(markdownModal);
    } else if (event.target === settingsModal) {
        closeModal(settingsModal);
    }
};

// Add event listeners for menu items
const menuItems = [
    { id: 'menu-markup-guide', targetButtonId: 'markdown-guide-button' },
    { id: 'menu-export-html', targetButtonId: 'save-button' },
    { id: 'menu-copy-clipboard', targetButtonId: 'copy-button' },
    { id: 'menu-save-word', targetButtonId: 'export-word-button' },
    { id: 'menu-load-word', targetButtonId: 'import-word-button' },
    { id: 'menu-settings', targetButtonId: 'settings-button' }
];

menuItems.forEach(item => {
    document.getElementById(item.id).addEventListener('click', function() {
        document.getElementById(item.targetButtonId).click();
        resetHamburgerMenu();
    });
});





function updateTime() {
                    const now = new Date();
                    let hours = now.getHours();
                    let minutes = now.getMinutes();
                    const ampm = hours >= 12 ? 'PM' : 'AM';

                    // Convert to 12-hour format
                    hours = hours % 12;
                    hours = hours ? hours : 12; // the hour '0' should be '12'

                    // Add leading zero to minutes if needed
                    minutes = minutes < 10 ? '0' + minutes : minutes;

                    const timeString = `${hours}:${minutes} ${ampm}`;

                    // Update the HTML element
                    document.querySelector('.inbox-time').innerHTML = timeString + ' &#10095;';
                }

                // Update time immediately and then every minute
                updateTime();
                setInterval(updateTime, 60000);

                // this is outside of the DOM addeventlistener~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

                function autoResizeTextarea(textarea) {
                    textarea.style.height = "auto"; // Reset the height
                    textarea.style.height = textarea.scrollHeight + "px"; // Set new height
                }

                // Get the modal
                //var modal = document.getElementById("markdown-modal");

                // Get the button that opens the modal
                //var btn = document.getElementById(
                //    "markdown-guide-button"
               // );

                // Get the <span> element that closes the modal
                //var span = document.getElementsByClassName("close")[0];

                // When the user clicks the button, open the modal
                //btn.onclick = function () {
                    //modal.style.display = "flex";
                //};

                // When the user clicks on <span> (x), close the modal
                span.onclick = function () {
                    modal.style.display = "none";
                };

                // When the user clicks anywhere outside of the markdown modal, close it
                window.onclick = function (event) {
                    if (event.target == modal) {
                        modal.style.display = "none";
                    }
                };

                // When the user clicks anywhere outside of the markdown modal, close it

                

                function exportToWord() {
                    if (typeof docx === "undefined") {
                        alert(
                            "The required library for exporting to Word is not loaded. Please check your internet connection and reload the page."
                        );
                        return;
                    }

                    try {
                        const doc = new docx.Document({
                            styles: {
                                default: {
                                    document: {
                                        run: {
                                            font: "Calibri",
                                            size: 22, // 11pt font
                                        },
                                    },
                                },
                                paragraphStyles: [
                                    {
                                        id: "Heading1",
                                        name: "Heading 1",
                                        run: {
                                            font: "Calibri",
                                            size: 32, // 16pt font
                                            bold: true,
                                        },
                                        paragraph: {
                                            spacing: { before: 240, after: 120 },
                                            indent: { left: 0 },
                                        },
                                    },
                                ],
                            },
                            sections: [
                                {
                                    properties: {},
                                    children: [],
                                },
                            ],
                        });

                        const children = [];

                        children.push(
                            new docx.Paragraph({
                                text: "Selected AI Model:",
                                heading: docx.HeadingLevel.HEADING_1,
                            }),
                            new docx.Paragraph({
                                text: document.getElementById("model-select")
                                    .value,
                            }),
                            new docx.Paragraph({
                                text: "",
                            })
                        );

                        // Add all input fields
                        for (const inputId of Object.keys(inputFields)) {
                            const inputElement =
                                document.getElementById(inputId);
                            const toggleElement = document.getElementById(
                                `toggle_${inputId}`
                            );
                            if (inputElement) {
                                const label =
                                    inputElement.previousElementSibling
                                        ? inputElement.previousElementSibling
                                            .textContent
                                        : inputId;
                                children.push(
                                    new docx.Paragraph({
                                        text: label,
                                        heading: docx.HeadingLevel.HEADING_1,
                                    }),
                                    new docx.Paragraph({
                                        text: inputElement.value,
                                    }),
                                    new docx.Paragraph({
                                        text: `Toggle State: ${toggleElement
                                            ? toggleElement.checked
                                                ? "On"
                                                : "Off"
                                            : "N/A"
                                            }`,
                                    }),
                                    new docx.Paragraph({
                                        text: "",
                                    })
                                );
                            }
                        }

                        // Add AI role
                        const aiRoleElement =
                            document.getElementById("ai-role");
                        if (aiRoleElement) {
                            children.push(
                                new docx.Paragraph({
                                    text: "AI Role for Suggestions:",
                                    heading: docx.HeadingLevel.HEADING_1,
                                }),
                                new docx.Paragraph({
                                    text: aiRoleElement.value,
                                }),
                                new docx.Paragraph({
                                    text: "",
                                })
                            );
                        }

                        doc.addSection({
                            children: children,
                        });

                        docx.Packer.toBlob(doc).then((blob) => {
                            saveAs(blob, "email_template_content.docx");
                        });
                    } catch (error) {
                        console.error("Error in exportToWord:", error);
                        alert(
                            "Error creating Word document. Please try again."
                        );
                    }
                }

                

            });
