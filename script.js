// Constants
const MODEM_LIGHTS = {
    "1": ["grn sld", "grn flsh", "blue sld", "blue flsh", "amber sld", "amber flsh", "red sld", "red flsh", "white sld", "white flsh", "off"],
    "2": ["grn sld", "grn flsh", "blue sld", "blue flsh", "amber sld", "amber flsh", "red sld", "red flsh", "white sld", "white flsh", "off"],
    "3": ["grn sld", "grn flsh", "blue sld", "blue flsh", "amber sld", "amber flsh", "red sld", "red flsh", "white sld", "white flsh", "off"],
    "4": ["grn sld", "grn flsh", "blue sld", "blue flsh", "amber sld", "amber flsh", "red sld", "red flsh", "white sld", "white flsh", "off"],
    "5": ["grn sld", "grn flsh", "blue sld", "blue flsh", "amber sld", "amber flsh", "red sld", "red flsh", "white sld", "white flsh", "off",  "N/A"],
    "6": ["grn sld", "grn flsh", "blue sld", "blue flsh", "amber sld", "amber flsh", "red sld", "red flsh", "white sld", "white flsh", "off", "N/A"],
    "7": ["grn sld", "grn flsh", "blue sld", "blue flsh", "amber sld", "amber flsh", "red sld", "red flsh", "white sld", "white flsh", "off", "N/A"]
};

// Light state to CSS class mapping
const LIGHT_STATE_CLASSES = {
    "grn sld": "light-green-solid",
    "grn flsh": "light-green-flash",
    "blue sld": "light-blue-solid",
    "blue flsh": "light-blue-flash",
    "amber sld": "light-amber-solid",
    "amber flsh": "light-amber-flash",
    "red sld": "light-red-solid",
    "red flsh": "light-red-flash",
    "white sld": "light-white-solid",
    "white flsh": "light-white-flash",
    "off": "light-off",
    "n/a": "light-na",
};

// Common light patterns for quick selection
const LIGHT_PATTERNS = {
    "all-green-solid": {
        "1": "grn sld",
        "2": "grn sld",
        "3": "grn sld",
        "4": "grn sld",
        "5": "grn sld",
        "6": "grn sld",
        "7": "grn sld"
    },
    "all-blue-solid": {
        "1": "grn sld", // Power is usually green
        "2": "blue sld",
        "3": "blue sld",
        "4": "grn sld", // Online often green
        "5": "grn sld",  // Internet often green
        "6": "blue sld",
        "7": "blue sld"
    },
    "offline-pattern": {
        "1": "grn sld",
        "2": "grn flsh",
        "3": "grn flsh",
        "4": "off",
        "5": "off",
        "6": "off",
        "7": "off"
    },
    "booting-pattern": {
        "1": "grn sld",
        "2": "grn flsh",
        "3": "grn flsh",
        "4": "off",
        "5": "blue flsh",
        "6": "off",
        "7": "off"
    },
    "amber-warning": {
        "1": "grn sld",
        "2": "amber flsh",
        "3": "amber flsh",
        "4": "amber sld",
        "5": "amber flsh",
        "6": "off",
        "7": "off"
    },
    "red-error": {
        "1": "grn sld", // Power still on
        "2": "red flsh",
        "3": "red flsh",
        "4": "off",
        "5": "red sld",
        "6": "off",
        "7": "off"
    }
};

const TROUBLESHOOTING_ACTIONS = [
    "Customer is online!",
    "1 Power Cycle Performed",
    "5 Power Cycle Performed",
    "Reset Router",
    "Checked Coax Connection",
    "Bypassed Router",
    "Ran Speed Test",
    "Verified Account Status",
    "Checked for Outages",
    "Submit Modem offline",
    "Submit TT for intermittent",
    "Hardwired connection tested"
];

// Define which call types should show modem status
const MODEM_STATUS_CALL_TYPES = ["Slow Connection", "Modem Offline", "Intermittent Connection"];

// Define customer-initiated call types (to hide ticket extraction)
const CUSTOMER_INITIATED_CALL_TYPES = ["Modem Offline", "Slow Connection", "Intermittent Connection"];

const CALL_TYPE_ACTIONS = {
    "Slow Connection": [
        "Ran speed test",
        "Verified plan speeds",
        "Tested on multiple devices",
        "Checked for network congestion",
        "Tested with hardwired connection",
        "Discussed possible upgrades",
        "Sent slow speed diagnostic email"
    ],
    "Modem Offline": [
        "Checked Coax rating",
        "Checked for splitters, joiners, couplers",
        "Verified ethernet cable is Cat 5e +",
        "Checked for powerbars",
        "Performed factory reset on modem"
    ],
    "Intermittent Connection": [
        "Verified issue pattern",
        "Checked for interference",
        "Tested with hardwired connection",
        "Updated firmware",
        "Performed signal test",
        "Submit TT for intermittent",
        "Logged into modem to get logs"
    ],
    "Repair and Install Date Confirmed": [
        "Customer confirmed availability",
        "Customer requested reschedule",
        "Left voicemail with installation details",
        "Confirmed installation address",
        "Sent confirmation email"
    ],
    "Repair and Install Follow-Up": [
        "Confirmed internet is working",
		"Left voicemail",
        "Speed test performed - within expectations",
        "Provided troubleshooting tips"
    ],
    "Modem Swap and Change of Service (COS)": [
        "Confirmed new modem is online",
        "Verified new MAC address is provisioned",
		"Left voicemail",
        "Speed test matches new plan speeds",
        "Explained new features/capabilities",
        "Confirmed billing reflects changes"
    ],
    "Courtesy Check": [
        "Customer satisfied with service",
        "Customer reported no issues",
        "Customer interested in upgrades",
    ]
};

const CALL_TYPES = {
    "Slow Connection": `=== TRACKING INFORMATION ===
Customer Name: {cust_name}
LS Account #: {ls_account}
Rogers ID: {rogers_id}

Customer #: {cust_num}

Ticket #: {ticket_num}
Transaction ID: {trans_id}

=== TROUBLESHOOTING DETAILS ===
CCI Experiencing slow speed
Speed Test Results:
{speed_test}
Modem Light Status:
{modem_status}
{customer_actions}
- {additional_notes}
Sent survey`,

"Modem Offline": `=== TRACKING INFORMATION ===
Customer Name: {cust_name}
LS Account #: {ls_account}
Rogers ID: {rogers_id}

Customer #: {cust_num}

Ticket #: {ticket_num}
Transaction ID: {trans_id}

=== TROUBLESHOOTING DETAILS ===
CCI modem offline
Modem Light Status:
{modem_status}
{customer_actions}
- {additional_notes}
- {speed_test}
Sent survey`,

"Intermittent Connection": `=== TRACKING INFORMATION ===
Customer Name: {cust_name}
LS Account #: {ls_account}
Rogers ID: {rogers_id}

Customer #: {cust_num}

Ticket #: {ticket_num}
Transaction ID: {trans_id}

=== TROUBLESHOOTING DETAILS ===
CCI intermittent connection
Modem Light Status:
{modem_status}
{speed_test}
{customer_actions}
- {additional_notes}
Sent survey`,

"Repair and Install Date Confirmed": `=== TRACKING INFORMATION ===
Customer Name: {cust_name}
LS Account #: {ls_account}
Rogers ID: {rogers_id}

Customer #: {cust_num}

Ticket #: {ticket_num}
Transaction ID: {trans_id}

=== CALL DETAILS ===
CC regarding installation/repair appointment
Installation Date: {install_date}
{customer_actions}
{additional_notes}
Sent survey`,

"Repair and Install Follow-Up": `=== TRACKING INFORMATION ===
Customer Name: {cust_name}
LS Account #: {ls_account}
Rogers ID: {rogers_id}

Customer #: {cust_num}

Ticket #: {ticket_num}
Transaction ID: {trans_id}

=== CALL DETAILS ===
CC for post install/repair service verification
{customer_actions}
{additional_notes}
Sent survey`,

"Modem Swap and Change of Service (COS)": `=== TRACKING INFORMATION ===
Customer Name: {cust_name}
LS Account #: {ls_account}
Rogers ID: {rogers_id}

Customer #: {cust_num}

Ticket #: {ticket_num}
Transaction ID: {trans_id}

=== CALL DETAILS ===
CC to verify modem swap/service change completion
{customer_actions}
{additional_notes}
Sent survey`,

"Courtesy Check": `=== TRACKING INFORMATION ===
Customer Name: {cust_name}
LS Account #: {ls_account}
Rogers ID: {rogers_id}

Customer #: {cust_num}
Ticket #: {ticket_num}
Transaction ID: {trans_id}

=== CALL DETAILS ===
CC as courtesy check on service satisfaction
{customer_actions}
{additional_notes}
Sent survey`
};

// DOM elements
document.addEventListener('DOMContentLoaded', function() {
    const callTypeSelect = document.getElementById('callType');
    const installDateContainer = document.getElementById('installDateContainer');
    const modemStatusSection = document.getElementById('modemStatusSection');
    const modemLightsContainer = document.getElementById('modemLightsContainer');
    const actionsContainer = document.getElementById('actionsContainer');
    const generateBtn = document.getElementById('generateBtn');
    const outputText = document.getElementById('outputText');
    const copyBtn = document.getElementById('copyBtn');
    const extractBtn = document.getElementById('extractBtn');
    const toast = document.getElementById('toast');
    const ticketExtractionSection = document.getElementById('ticketExtractionSection');

    // Initialize the application
    initializeUI();

    function setupThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        // Check if user previously set a preference
        if (storageAvailable()) {
            const darkMode = localStorage.getItem('darkMode') === 'true';
            themeToggle.checked = darkMode;
            if (darkMode) {
                document.body.classList.add('dark-theme');
            }
        }

        // Toggle theme when switch is clicked
        themeToggle.addEventListener('change', function() {
            if (this.checked) {
                document.body.classList.add('dark-theme');
                if (storageAvailable()) {
                    localStorage.setItem('darkMode', 'true');
                }
            } else {
                document.body.classList.remove('dark-theme');
                if (storageAvailable()) {
                    localStorage.setItem('darkMode', 'false');
                }
            }
        });
    }

    // Check if localStorage is available
    function storageAvailable() {
        try {
            const storage = window.localStorage;
            const x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        } catch(e) {
            return false;
        }
    }

    // Save form data to localStorage
    function saveToLocalStorage() {
        if (!storageAvailable()) return false;

        // Save tracking information
        const trackingData = {
            customerName: document.getElementById('customerName').value,
            customerNum: document.getElementById('customerNum').value,
            ticketNum: document.getElementById('ticketNum').value,
            transactionId: document.getElementById('transactionId').value,
            lsAccount: document.getElementById('lsAccount').value,
            rogersId: document.getElementById('rogersId').value,
            callType: document.getElementById('callType').value,
            additionalNotes: document.getElementById('additionalNotes').value,
            speedTest: document.getElementById('speedTest')?.value || '',
            installDate: document.getElementById('installDate')?.value || ''
        };

        localStorage.setItem('trackingData', JSON.stringify(trackingData));

        // Save modem light status
        const modemLightData = {};
        Object.keys(MODEM_LIGHTS).forEach(lightNum => {
            const select = document.getElementById(`modem-${lightNum}`);
            if (select) {
                modemLightData[lightNum] = select.value;
            }
        });
        localStorage.setItem('modemLightData', JSON.stringify(modemLightData));

        // Save selected actions
        const selectedActions = Array.from(
            document.querySelectorAll('#actionsContainer input[type="checkbox"]:checked')
        ).map(checkbox => checkbox.value);
        localStorage.setItem('selectedActions', JSON.stringify(selectedActions));

        // Save input text
        localStorage.setItem('inputText', document.getElementById('inputText').value);

        // Save the generated note if it exists
        if (outputText.value) {
            localStorage.setItem('generatedNote', outputText.value);
        }

        // Timestamp of the save
        localStorage.setItem('lastSave', new Date().toISOString());

        // Show toast notification
        showToast("Data auto-saved");

        return true;
    }

    // Load data from localStorage
    function loadFromLocalStorage() {
        if (!storageAvailable()) return false;

        // Check if we have saved data
        const lastSave = localStorage.getItem('lastSave');
        if (!lastSave) return false;

        // Display a restoration message with timestamp
        const lastSaveDate = new Date(lastSave);
        const timeAgo = getTimeAgo(lastSaveDate);
        const restoreMsg = `Restoring data from ${timeAgo}`;
        showToast(restoreMsg);

        // Load tracking information
        const trackingData = JSON.parse(localStorage.getItem('trackingData') || '{}');
        for (const [key, value] of Object.entries(trackingData)) {
            const elem = document.getElementById(key);
            if (elem) elem.value = value;
        }

        // Set call type and update UI based on it
        if (trackingData.callType) {
            document.getElementById('callType').value = trackingData.callType;
            updateUIByCallType(trackingData.callType);
            updateActionsByCallType(trackingData.callType);
        }

        // Load modem light status
        const modemLightData = JSON.parse(localStorage.getItem('modemLightData') || '{}');
        for (const [lightNum, value] of Object.entries(modemLightData)) {
            const select = document.getElementById(`modem-${lightNum}`);
            if (select) {
                select.value = value;
                updateLightIndicator(lightNum, value);
            }
        }

        // Load selected actions
        const selectedActions = JSON.parse(localStorage.getItem('selectedActions') || '[]');
        setTimeout(() => {
            selectedActions.forEach(action => {
                const id = `action-${action.replace(/\s+/g, '-').toLowerCase()}`;
                const checkbox = document.getElementById(id);
                if (checkbox) checkbox.checked = true;
            });
        }, 100); // Small delay to ensure check-boxes are created

        // Load input text
        const inputText = localStorage.getItem('inputText');
        if (inputText) document.getElementById('inputText').value = inputText;

        // Load generated note
        const generatedNote = localStorage.getItem('generatedNote');
        if (generatedNote) outputText.value = generatedNote;

        return true;
    }

    // Helper function to format time ago
    function getTimeAgo(date) {
        const seconds = Math.floor((new Date() - date) / 1000);

        let interval = Math.floor(seconds / 86400);
        if (interval >= 1) {
            return interval + " day" + (interval > 1 ? "s" : "") + " ago";
        }

        interval = Math.floor(seconds / 3600);
        if (interval >= 1) {
            return interval + " hour" + (interval > 1 ? "s" : "") + " ago";
        }

        interval = Math.floor(seconds / 60);
        if (interval >= 1) {
            return interval + " minute" + (interval > 1 ? "s" : "") + " ago";
        }

        return "just now";
    }

    // Display toast notification
    function showToast(message) {
        toast.textContent = message;
        toast.className = "show";

        // After 3 seconds, hide the toast
        setTimeout(() => {
            toast.className = toast.className.replace("show", "");
        }, 3000);
    }

    // Add a clear button to reset the form
    function addClearFormButton() {
        const clearButton = document.createElement('button');
        clearButton.id = 'clearBtn';
        clearButton.textContent = 'Clear All Data';
        clearButton.title = 'Clear all form data and saved information';

        clearButton.addEventListener('click', function() {
            if (confirm('Are you sure you want to clear all form data? This cannot be undone.')) {
                // Save the current theme state before clearing
                const isDarkMode = document.body.classList.contains('dark-theme');

                // Clear localStorage (but preserve darkMode setting)
                if (storageAvailable()) {
                    const darkModeSetting = localStorage.getItem('darkMode');

                    // Clear all form-related items
                    localStorage.removeItem('trackingData');
                    localStorage.removeItem('modemLightData');
                    localStorage.removeItem('selectedActions');
                    localStorage.removeItem('inputText');
                    localStorage.removeItem('generatedNote');
                    localStorage.removeItem('lastSave');

                    // Restore dark mode setting if it existed
                    if (darkModeSetting) {
                        localStorage.setItem('darkMode', darkModeSetting);
                    }
                }

                // Directly reset all form elements
                // Clear all input fields
                document.querySelectorAll('input[type="text"]').forEach(input => {
                    input.value = '';
                });

                document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
                    if (checkbox.id !== 'themeToggle') {
                        checkbox.checked = false;
                    }
                });
                const themeToggle = document.getElementById('themeToggle');
                if (themeToggle) {
                    themeToggle.checked = isDarkMode;
                }

                // Clear all textareas
                document.querySelectorAll('textarea').forEach(textarea => {
                    textarea.value = '';
                });

                // Uncheck all checkboxes
                document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
                    checkbox.checked = false;
                });

                // Reset select elements to first option
                document.querySelectorAll('select').forEach(select => {
                    select.selectedIndex = 0;
                });

                // Reset modem light indicators
                Object.keys(MODEM_LIGHTS).forEach(lightNum => {
                    const select = document.getElementById(`modem-${lightNum}`);
                    if (select) {
                        select.value = MODEM_LIGHTS[lightNum][0]; // Set to first option
                        updateLightIndicator(lightNum, MODEM_LIGHTS[lightNum][0]);
                    }
                });

                // Clear the output
                document.getElementById('outputText').value = '';

                // Reset UI to initial state
                updateUIByCallType(document.getElementById('callType').value = 'Courtesy Check');

                showToast('All data has been cleared');
            }
        });

        // Add to right panel after copy button
        document.querySelector('.right-panel').appendChild(clearButton);
    }

    // Initialize UI
    function initializeUI() {
        // Set up modem lights UI with numbered indicators
        for (const [lightNum, states] of Object.entries(MODEM_LIGHTS)) {
            const lightContainer = document.createElement('div');
            lightContainer.className = 'light-status-item';

            // Create label with light number
            const label = document.createElement('label');
            label.textContent = `Light ${lightNum}:`;
            label.htmlFor = `modem-${lightNum}`;

            // Create select for light status
            const select = document.createElement('select');
            select.id = `modem-${lightNum}`;
            select.title = `Status of light ${lightNum}`;
            select.setAttribute('data-light-num', lightNum);

            // Add state options to select
            states.forEach(state => {
                const option = document.createElement('option');
                option.value = state;

                // Format display text for better readability
                let displayText = state;

                // Replace abbreviations with full words
                displayText = displayText.replace('grn', 'Green');
                displayText = displayText.replace('sld', 'Solid');
                displayText = displayText.replace('flsh', 'Flashing');
                displayText = displayText.replace('blue', 'Blue');
                displayText = displayText.replace('amber', 'Amber');
                displayText = displayText.replace('red', 'Red');
                displayText = displayText.replace('white', 'White');
                displayText = displayText.replace('off', 'Off');

                // Capitalize first letter
                displayText = displayText.charAt(0).toUpperCase() + displayText.slice(1);

                option.textContent = displayText;
                select.appendChild(option);
            });

            // Assemble the light status item
            lightContainer.appendChild(label);
            lightContainer.appendChild(select);
            modemLightsContainer.appendChild(lightContainer);
        }

        // Set up pattern template buttons
        const patternButtons = document.querySelectorAll('.pattern-button');
        patternButtons.forEach(button => {
            button.addEventListener('click', function() {
                const pattern = this.getAttribute('data-pattern');
                applyLightPattern(pattern);
                if (storageAvailable()) saveToLocalStorage();
            });
        });

        setupThemeToggle();

        // Add clear button
        addClearFormButton();

        // Set initial action checkboxes based on default call type
        updateActionsByCallType(callTypeSelect.value);

        // Update UI based on initial call type
        updateUIByCallType(callTypeSelect.value);

        // Load saved data if it exists
        if (storageAvailable()) loadFromLocalStorage();

        // Add auto-save functionality to input elements
        if (storageAvailable()) {
            const formElements = document.querySelectorAll('input, select, textarea');
            formElements.forEach(elem => {
                elem.addEventListener('change', saveToLocalStorage);
                // Add input event for text fields to save while typing (with debounce)
                if (elem.tagName === 'INPUT' || elem.tagName === 'TEXTAREA') {
                    let debounceTimer;
                    elem.addEventListener('input', function() {
                        clearTimeout(debounceTimer);
                        debounceTimer = setTimeout(saveToLocalStorage, 1000);
                    });
                }
            });

            // Also save on checkbox changes
            document.addEventListener('click', function(e) {
                if (e.target && e.target.type === 'checkbox') {
                    saveToLocalStorage();
                }
            });
        }
    }

    // Update the visual light indicator based on selected state
    function updateLightIndicator(lightNum, state) {
        const indicator = document.getElementById(`indicator-${lightNum}`);
        if (!indicator) return;

        // Remove all existing state classes
        Object.values(LIGHT_STATE_CLASSES).forEach(cls => {
            indicator.classList.remove(cls);
        });

        // Add the appropriate class for the current state
        const stateClass = LIGHT_STATE_CLASSES[state.toLowerCase()];
        if (stateClass) {
            indicator.classList.add(stateClass);
        }
    }

    // Apply a predefined light pattern
    function applyLightPattern(patternName) {
        const pattern = LIGHT_PATTERNS[patternName];
        if (!pattern) return;

        // Apply each light state from the pattern
        for (const [lightNum, state] of Object.entries(pattern)) {
            const select = document.getElementById(`modem-${lightNum}`);
            if (select) {
                select.value = state;
                updateLightIndicator(lightNum, state);
            }
        }
    }

    // Update actions based on call type
    function updateActionsByCallType(callType) {
        // Get the appropriate actions for the call type
        const actions = CALL_TYPE_ACTIONS[callType] || TROUBLESHOOTING_ACTIONS;

        // Set up checkboxes for those actions
        setupActionCheckboxes(actions);
    }

    // Update UI elements based on call type
    function updateUIByCallType(callType) {
        // Show/hide installation date field
        if (callType === "Repair and Install Date Confirmed") {
            installDateContainer.classList.remove('hidden');
        } else {
            installDateContainer.classList.add('hidden');
        }

        // Show/hide modem status section for relevant call types
        if (MODEM_STATUS_CALL_TYPES.includes(callType)) {
            modemStatusSection.classList.remove('hidden');
        } else {
            modemStatusSection.classList.add('hidden');
        }

        // Show/hide ticket extraction section - hide for customer-initiated calls
        if (CUSTOMER_INITIATED_CALL_TYPES.includes(callType)) {
            ticketExtractionSection.classList.add('hidden');
        } else {
            ticketExtractionSection.classList.remove('hidden');
        }
    }

    // Set up action checkboxes
    function setupActionCheckboxes(actions) {
        actionsContainer.innerHTML = '';

        actions.forEach(action => {
            const container = document.createElement('div');
            container.className = 'checkbox-container';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = `action-${action.replace(/\s+/g, '-').toLowerCase()}`;
            checkbox.value = action;
            checkbox.title = `Check if "${action}" was performed`;

            const label = document.createElement('label');
            label.htmlFor = checkbox.id;
            label.textContent = action;

            container.appendChild(checkbox);
            container.appendChild(label);
            actionsContainer.appendChild(container);
        });
    }

    // Extract information from ticket text
    function extractInfo() {
        let inputText = document.getElementById("inputText").value;

        // Extract customer name with improved regex for the format "END-USER NAME: Name"
        let nameMatch = inputText.match(/END-USER NAME:\s*([^-]+?)(?:\s*-|$)/i);
        // Alternative regex patterns for different name formats
        if (!nameMatch) {
            nameMatch = inputText.match(/Customer Name:\s*([^,\n]+)/i);
        }

        // Extract account ID
        let accountMatch = inputText.match(/account ID\s*:\s*(\S+)/i);

        // Extract ticket number - specifically looking for "Ticket #XXXX" format
        let ticketMatch = inputText.match(/Ticket\s+#\s*(\d+)/i);

        // Extract transaction ID with a more specific pattern
        // Looking for "TrxID:", "TID ", or similar patterns followed by digits
        let trxMatch = inputText.match(/(?:TrxID|TID|Transaction ID)\s*:?\s*(\d{9})/i);

        // Extract Rogers ID - 11 digits followed by "- Status" or similar
        let rogersMatch = inputText.match(/(\d{11})\s*-\s*Status/i);

        // Look for customer number - standalone 5-digit number
        // Avoid confusing with transaction ID or other numbers
        let customerNumMatch = inputText.match(/(?:^|\s|:)(\d{5})(?:\s|$)/);

        // Update form fields with extracted data
        document.getElementById("customerName").value = nameMatch ? nameMatch[1].trim() : "";
        document.getElementById("lsAccount").value = accountMatch ? accountMatch[1] : "";
        document.getElementById("ticketNum").value = ticketMatch ? ticketMatch[1] : "";
        document.getElementById("transactionId").value = trxMatch ? trxMatch[1] : "";
        document.getElementById("rogersId").value = rogersMatch ? rogersMatch[1] : "";
        document.getElementById("customerNum").value = customerNumMatch ? customerNumMatch[1] : "";

        // Save the extracted data
        if (storageAvailable()) saveToLocalStorage();
    }

    // Generate note
    function generateNote() {
        const callType = callTypeSelect.value;

        // Get selected actions
        const customerActions = Array.from(actionsContainer.querySelectorAll('input[type="checkbox"]:checked'))
            .map(checkbox => checkbox.value)
            .join('\n');

        // Get modem status for relevant call types
 // Get modem status for relevant call types
let modemStatus = "";
if (MODEM_STATUS_CALL_TYPES.includes(callType)) {
    modemStatus = Object.keys(MODEM_LIGHTS)
        .filter(lightNum => {
            const select = document.getElementById(`modem-${lightNum}`);
            // Only include this light if it exists and is not set to N/A
            return select && select.value.toLowerCase() !== "n/a";
        })
        .map(lightNum => `${lightNum}: ${document.getElementById(`modem-${lightNum}`).value}`)
        .join('\n');
}


        // Format template
        let note = CALL_TYPES[callType]
        .replace('{cust_name}', document.getElementById('customerName').value)
        .replace('{cust_num}', document.getElementById('customerNum').value)
        .replace('{ticket_num}', document.getElementById('ticketNum').value)
        .replace('{trans_id}', document.getElementById('transactionId').value)
        .replace('{install_date}', document.getElementById('installDate').value || '')
        .replace('{ls_account}', document.getElementById('lsAccount').value)
        .replace('{rogers_id}', document.getElementById('rogersId').value)
        .replace('{customer_actions}', customerActions || ' ')
        .replace('{additional_notes}', document.getElementById('additionalNotes').value || '')
        .replace('{modem_status}', modemStatus || '')
        .replace('{speed_test}', document.getElementById('speedTest').value || '');

            // Add divider line at the end
    note += '\n' + '='.repeat(50);

        // Display the generated note
        outputText.value = note;

        // Save the generated note
        if (storageAvailable()) {
            localStorage.setItem('generatedNote', note);
            saveToLocalStorage();
        }
    }

    // Copy generated note to clipboard
    function copyToClipboard() {
        if (outputText.value) {
            outputText.select();
            document.execCommand('copy');
            showToast('Note copied to clipboard!');
        } else {
            showToast('No text to copy!');
        }
    }

    // Set up event listeners

    // Handle call type change
    callTypeSelect.addEventListener('change', function() {
        const callType = this.value;

        // Update UI based on call type
        updateUIByCallType(callType);

        // Update actions based on call type
        updateActionsByCallType(callType);

        // Save the changes
        if (storageAvailable()) saveToLocalStorage();
    });

    // Generate note button click
    generateBtn.addEventListener('click', generateNote);

    // Copy to clipboard button click
    copyBtn.addEventListener('click', copyToClipboard);

    // Extract information button click
    extractBtn.addEventListener('click', extractInfo);
});
