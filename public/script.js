let currentQuestionIndex = 0; // Track the current question index
let responses = {}; // Store user responses

// Preset questions for the user
const questions = [
    "What is the client's name?",
    "What is the project address?",
    "What is the total square footage of the roof?",
    "What type of roofing materials are needed?",
    "What is the estimated timeline for the project?",
    "Please narrate the work scope specifically."
];

// Function to start the chat and display the first question
function startChat() {
    // Clear any existing chat messages to start fresh
    document.getElementById('chat-box').innerHTML = '';
    document.getElementById('user-input').value = '';

    // Reset question index and responses
    currentQuestionIndex = 0;
    responses = {};

    // Hide the start button and show the chat container
    document.getElementById('start-chat-btn').style.display = 'none';
    document.getElementById('chat').style.display = 'block';

    // Ask the first question after a small delay
    setTimeout(() => {
        askNextQuestion();
    }, 500);
}

// Function to ask the next question in sequence
function askNextQuestion() {
    if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        displayMessage('Bot', question, 'secondary');
    }
}

// Function to send the user's message to the server
async function sendMessage() {
    const userInput = document.getElementById('user-input').value.trim();
    if (!userInput) return;

    // Display user message
    displayMessage('You', userInput, 'primary');

    // Store user's response to the previous question
    if (currentQuestionIndex < questions.length) {
        const lastQuestion = questions[currentQuestionIndex];
        responses[lastQuestion] = userInput;

        // Increment the question index
        currentQuestionIndex++;
    }

    // Check if all questions have been answered
    if (currentQuestionIndex < questions.length) {
        // Ask the next question after a delay
        setTimeout(() => {
            askNextQuestion();
        }, 1000);
    } else {
        // All questions are answered, generate the work scope
        generateWorkScope();
    }

    // Clear input field
    document.getElementById('user-input').value = '';
}

// Function to generate work scope using OpenAI API
async function generateWorkScope() {
    const prompt = generatePrompt(responses);

    try {
        const response = await fetch('/message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: prompt })
        });

        const data = await response.json();

        // Display assistant's response
        if (data.done) {
            displayMessage('Bot', data.reply, 'secondary');
        } else {
            displayMessage('Bot', 'Something went wrong. Please try again.', 'danger');
        }
    } catch (error) {
        console.error('Error:', error);
        displayMessage('Bot', 'An error occurred while generating the work scope. Please try again.', 'danger');
    }
}

// Function to generate prompt for OpenAI based on user responses
function generatePrompt(responses) {
    let prompt = "Create a detailed step by step work scope for the following roofing project based on the provided information as if you are the roofing expert explaining the detailed scope of the work:\n";
    for (let question in responses) {
        prompt += `${question}: ${responses[question]}\n`;
    }
    prompt += `# All 24 Scopes of Work, Separated by Type of Work

# 1. **Main Roof Area Repair**

The front tile roof to the main roof conjunction area has many issues. Seal all mortar splits and cracks with polyurethane masonry sealer. Grout separation at the tiles will be sealed with polyurethane concrete sealer. Apply STA (smooth torch applied) CertainTeed MFG's modified bitumen membrane to inside corner cracks and roof-to-parapet wall crack areas. Apply two coats of aluminum silver roof coating over the STA patched area to blend with the main roof coating. Replace one 12” chimney stag; the base does not need replacement. The existing stag has holes where water can penetrate. Clean up debris caused by the work.
"""

# 2. **Main Roof and Lower Roof Area Repair**

Several tiles are broken and detached from the rake tile on the main rooftop area. Repair the tiles and re-grout with color-mixed mortar. On the lower roof area, one top course tile and one ridge tile are broken; remove ridge tiles to install new ones to replace the broken tile and reset the removed ridge tiles with color-mixed mortar. For the main lower roof valley on the left side, remove the ridge and rake tiles at the valley area and adjacent tiles to the wall. Extend the valley flashing over the existing underlayment and apply polyurethane seal at the valley flashing and underlayment. Trim tiles at the valley for a minimum 4” clearance to allow roof debris (leaves) to flow off naturally. Reinstall all removed tiles at the valley and apply new color mortar grout. Seal the roof-to-wall at the gutter eave flashing, install a new mesh screen at the gutter, and clean up all debris caused by the work.
"""

# 3. **Main Roof Cleaning and Coating**

Clean up the existing roof deck to remove debris and dust buildup. Power wash the entire roof and parapet walls on the first day. Seal and patch all roof penetrations with polyurethane sealant. Seal all side lap joints of the roof edge flashing with polyurethane sealant. Apply a full coat of base roof coat and let it cure for a minimum of 2 hours, depending on the weather. Apply two coats of elastomeric white roof coating over the entire prepared roof surface, including the parapet walls. The work proposed is for the main roof only. Clean up all debris caused by the work. Proposed Price: $5,380.00.
"""

# 4. **Rear Roof Edge Only Repair**

Clean up all loose granule buildup along the roof edge at the back of the house. Remove the existing nosing and cut off the cap sheet at the roof edge to access the fascia. Cut off the fascia at the top to flush with the main roof deck slope. Install a new aluminum 5” OG gutter in Tahoe Blue with proper aluminum hangers. Install new galvanized roof edge flashings in the gutter from the main roof deck. Patch new modified bitumen membrane over the new edge metal onto the main roof’s existing edge cap sheet. Seal the new modified bitumen seam against the existing roofing material with polyurethane sealant. Install two new linen aluminum downspouts. All new gutters and downspouts have a paint-ready finish. Clean up all debris caused by the work.
"""

# 5. **Main Roof Drain Area Repair**

Wash and clean the drain area. Currently, approximately 2 sq/ft is slightly low and puddles during the rainy season. Pour non-cracking self-leveling sealant and allow it to cure for 72 hours. Prime and apply two coats of white roof coating. Remove the wire mesh at the drain outlet and install a new wire mesh screen over the leaderhead on the outside of the parapet wall instead of at the drain inlet opening. Clean up all debris caused by the work.
"""

# 6. **Main Roof Skylight Leak Repair**

Current leaks are around the existing skylights. Power wash the roof areas where repairs are proposed. Remove the old sealant around skylight fasteners and roof panel fasteners, applying new polyurethane sealant to all exposed fastener heads. Clean and reseal roof panel to skylight curve junctions with polyurethane sealant. Reseal all exposed fasteners on the center ridge panel. Clean all roof penetrations such as chimneys.
"""

# 7. **Front Tile Roof to Main Roof Conjunction Area Repair**

The front tile roof to the main roof conjunction area has many issues. Seal all mortar splits and cracks with polyurethane masonry sealer. Grout separation at the tiles will be sealed with polyurethane concrete sealer. Apply STA (smooth torch applied) CertainTeed MFG's modified bitumen membrane to inside corner cracks and roof-to-parapet wall crack areas. Apply two coats of aluminum silver roof coating over the STA patched area to blend with the main roof coating. Replace one 12” chimney stag; the base does not need replacement. The existing stag has holes where water can penetrate. Clean up debris caused by the work.
"""

# 8. **Roof and Siding Repair**

Clean up the top floor siding wall as indicated in the provided photos. Reseal all siding lap joints, trim junctions, and fascia junctions with polyurethane sealant. Remove any unused satellite dish and seal the mounting screw penetration holes with polyurethane sealant. Install an anchor plate for the fall protection system and hook up the full-body harness. Install roof slip boards with a guard rail at the chimney chase for dry rot work. Remove all dry rot sidings and corner metal trims near the base of the chimney chase. Install new weather wrap substrate membrane (Tyvek) and new redwood siding closely matching the existing. Install new metal trim at the corners where it was removed. If the second chimney chase requires siding repair, it will be a change order and invoiced as an extra cost (Estimate for fall protection device installation: $3,890.00). Prime and apply two coats of paint where siding was replaced. Seal one area under the soffit near the chimney chase side where moisture penetration is possible, closing the gap in the existing metal covering. Remove all fall protection mounts from the roof deck while applying permanent seals at all fastener penetrations. Torn shingles may need replacement, and the new shingles will not match the color or size of the existing ones. Clean up all debris caused by the work.
"""

# 9. **Living Room Interior Damaged Ceiling Repair**

Cover all walls and floors of the entire living room. Remove the damaged sheetrock and water-damaged insulation (approximately 4 feet by 6 feet area). Install new insulation where replaced. Install new sheetrock, tape, patch, and sand. Apply texture to the entire ceiling to match the existing texture (partial texturing will not cover the newly patched sheetrock joint). Paint the entire living room ceiling.
"""

# 10. **Right Side Roof Area Repair Only**

The roof has a foam roofing system, and repairs are proposed in several areas of the roof on the right side of the building only. The base mount area under the HVAC duct has a contraction issue with uneven roof surfaces, creating water pooling. Clean, prepare, and reseal all roof penetrations in this area with polyurethane and acrylic white roof mastic. The seal at the parapet to the exterior wall has deteriorated. Scrape, clean, and apply polyurethane seal. There are many pothole damages on the roof. Seal all potholes with white polyurethane seal. Prepare and seal all foam-to-wall areas along the entire southeast section of the building. Replace all water-damaged acoustic ceiling tiles (up to 16 pieces). Clean up all debris caused by the work.
"""

# 11. **Main Roof Tile and Ridge Repair**

Two broken tiles are located above the leaking area by the valley. Remove the top ridge tiles to replace the top broken tile. Install a new replacement tile and reinstall the ridge tile. Remove and replace the second broken tile at the bottom course of the valley with a new tile. Remove all old and existing hip and ridge tile joint sealant. Use polyurethane seal at the bottom of the joints and apply new mortar joint at the top part of the joint. Remove all damaged and deteriorating aluminum taping at all projection joints of the rake and ridge tile junction. Apply new polyurethane seal under the tile and apply new mortar to cover the top joint. Clean up all debris caused by the work.
"""

# 12. **Rear Arbor with Lattice Area Repair**

Temporarily remove the existing lattice covering over the arbor structure to access the mounting plate board against the exterior wall. Replace any physically damaged lattice if needed; otherwise, reinstall the same lattice. Apply new polyurethane sealant at the junction of the mounting plate board and the wall. Reinstall the removed or lifted lattice back in place. Clean up all debris caused by the work.
"""

# 13. **Main Entrance Porch Roof Area Repair**

Remove the tiles along the roof to the adjacent garage wall. Remove the hip and ridge tiles of the porch roof and the tiles below the upper gutter end outlet. Install one drop outlet with an elbow spout approximately 14” from the upper roof gutter end outlet to allow proper drainage. Install new waterproofing underlayment over the existing felt paper where the tiles were removed. Inspect and reseal all along the roof-to-wall valley flashing with roof seal and polyurethane sealant where needed. Reinstall all removed tiles back in place. Apply polyurethane sealant at the red brick-to-stucco garage wall junction where separation cracks are apparent. Clean up all debris caused by the work.
"""

# 14. **Main Roof Edge Flashing Repair**

Remove the tiles along the eave next to the fire chimney stag (approximate length of removal is 15 feet). Expose the base felt and batten strips and remove the batten strips of two rows. Cut a section between the rafters to repair the soffit panel holes with a new soffit panel. This repair is done from the rooftop. Insert new roof edge flashings into the gutter. Apply new synthetic felt under the old felt (approximately three rows of tile length). Reinstall the batten strip and tiles where removed. Check and repair the fire chimney pan as necessary to stop the leaking at the roof-to-wall area behind the chimney stag. Clean up all debris caused by the work.
"""

# 15. **Main Roof Area Shingle Replacement**

The main roof shingles are generally in good condition, with only a few areas having wind-damaged and missing shingles. Install new 3-tab shingles at all missing areas (new shingles may not match the exact color of the existing and aged shingles). Remove incorrectly installed shingles around the skylight at the rear side and install new shingles with proper step flashing. No drip edge metal flashing exists at the rake edges of the roof. Remove shingles at the rake edge and install new galvanized metal edge flashing. Apply roof sealant under each course of the new shingles along the rake edges. Seal all exposed nails at the roof penetrations (e.g., flues, tube skylights, vent pipe collar flashings).
"""

# 16. **Main Lower Roof Valley Repair**

Remove the ridge and rake tiles at the valley area and adjacent tiles to the wall. Extend the valley flashing over the existing underlayment and apply polyurethane seal at the valley flashing and underlayment. Trim tiles at the valley for a minimum 4” clearance to allow roof debris (leaves) to flow off naturally. Reinstall all removed tiles at the valley and apply new color mortar grout. Clean up all debris caused by the work.
"""

# 17. **Main Roof Penetration Sealing**

Clean around all roof penetrations such as plumbing vent pipes, chimney, flues, and skylight curve. Remove old sealants and apply new white polyurethane sealant at all edges. Clean all asphalt-exposed areas due to the loss of embedded gravel to prepare for elastomeric white roof seal/coating. Apply two coats of roof seal/coating. Clean up all debris caused by the work.
"""

# 18. **Rear Roof Skylight Leak Repair**

Current leaks are around the existing skylight. Power wash the roof areas where repairs are proposed. Remove the old sealant around skylight fasteners and roof panel fasteners. Apply new polyurethane sealant to all exposed fastener heads. Clean and reseal roof panel to skylight curve junctions with polyurethane sealant. Clean up all debris caused by the work.
"""

# 19. **Front Roof Tile and Ridge Mortar Repair**

Repair tiles and re-grout with color-mixed mortar where tiles are broken or detached. Remove ridge tiles to install new ones to replace broken tiles. Reset removed ridge tiles with color-mixed mortar. Seal all mortar splits and cracks with polyurethane masonry sealer.
"""

# 20. **Main Roof Modified Bitumen Membrane Application**

Apply STA (smooth torch applied) CertainTeed MFG's modified bitumen membrane to inside corner cracks and roof-to-parapet wall crack areas. Apply two coats of aluminum silver roof coating over the STA patched area to blend with the main roof coating. Clean up all debris caused by the work.
"""

# 21. **Chimney Stack Replacement**

Replace one 12” chimney stack; the base does not need replacement. The existing stack has holes where water can penetrate. Clean up debris caused by the work.
"""

# 22. **Gutter and Downspout Installation**

Install a new aluminum 5” OG gutter in Tahoe Blue with proper aluminum hangers. Install two new linen aluminum downspouts. All new gutters and downspouts have a paint-ready finish. Clean up all debris caused by the work.
"""

# 23. **Parapet Wall Elastomeric Coating**

Clean all asphalt-exposed areas due to the loss of embedded gravel to prepare for elastomeric white roof seal/coating. Apply two coats of elastomeric white roof coating over all asphalt-exposed areas of the parapet walls. Clean up all debris caused by the work.
"""

# 24. **Skylight Repainting and Resealing**

Clean, sand, and repaint the peeling paint on one skylight, applying primer and silicone seal at the bottom of the glass panel. Clean up all debris caused by the work.
"""

# Creating a VS Code Prompt for AI Scope Generation

# AI Scope Generation Prompt for VS Code
# Task: Generate a detailed scope of work for a roofing job.

# Instructions for AI:
You are an expert at creating roofing work scopes. Generate a comprehensive scope of work based on the provided summary. Use professional and concise language, maintain consistency in tone, and ensure clarity and attention to detail. Close very specific details on the last question where it asks the work scope specifically. Mainly utilize this answer and add expert knowledge to create a detailed scope of work for a roofing project.

The scope of work should follow the format and tone of the example scopes provided:
- Title (e.g., **Job Type: Main Roof Area Repair**)
- Detailed bullet points or paragraph outlining each part of the job.

Examples of Job Types:
- Main Roof Area Repair
- Rear Roof Edge Only Repair
- Roof Cleaning and Coating

Please be specific about materials, techniques, and equipment needed.

"""`;
    return prompt;
}

// Utility function to display messages in the chat box
function displayMessage(sender, message, type) {
    const chatBox = document.getElementById('chat-box');
    const messageDiv = document.createElement('div');
    messageDiv.className = `alert alert-${type} ${sender.toLowerCase()}-message`;
    messageDiv.textContent = `${sender}: ${message}`;
    chatBox.appendChild(messageDiv);

    // Scroll to the bottom of chat box
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Function to restart the chat (used to be end chat)
function restartChat() {
    // Clear chat messages
    document.getElementById('chat-box').innerHTML = '';

    // Reset question index and responses for a new chat
    currentQuestionIndex = 0;
    responses = {};

    // Start the chat with the first question after a small delay
    setTimeout(() => {
        askNextQuestion();
    }, 500);
}


document.getElementById('user-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});











