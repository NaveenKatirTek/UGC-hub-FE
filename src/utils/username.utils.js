/**
 * Username Utility Functions
 * Handles username generation and sanitization
 */

/**
 * Sanitize text for username format
 * - Convert to lowercase
 * - Remove special characters except underscore
 * - Replace spaces with underscores
 * - Remove consecutive underscores
 * @param {string} text - Text to sanitize
 * @returns {string} Sanitized text
 */
export const sanitizeForUsername = (text) => {
    if (!text) return '';

    return text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9_\s]/g, '') // Remove special chars except underscore and space
        .replace(/\s+/g, '_') // Replace spaces with underscore
        .replace(/_+/g, '_') // Replace multiple underscores with single
        .replace(/^_|_$/g, ''); // Remove leading/trailing underscores
};

/**
 * Generate username from name
 * @param {string} name - Business name or creator name
 * @param {string} type - 'brand' or 'creator'
 * @returns {string} Generated username
 */
export const generateUsername = (name, type = 'brand') => {
    if (!name) return '';

    const sanitized = sanitizeForUsername(name);
    const prefix = type === 'brand' ? 'brand' : 'creator';

    // Take first 15 characters of sanitized name to keep username reasonable length
    const baseName = sanitized.substring(0, 15);

    // Add random 3-digit number
    const randomNum = Math.floor(100 + Math.random() * 900);

    return `${prefix}_${baseName}${randomNum}`;
};

/**
 * Generate alternative usernames
 * @param {string} baseUsername - Base username to generate alternatives from
 * @param {number} count - Number of alternatives to generate
 * @returns {string[]} Array of alternative usernames
 */
export const generateAlternatives = (baseUsername, count = 2) => {
    if (!baseUsername) return [];

    const alternatives = [];

    // Remove any existing numbers at the end
    const baseWithoutNumbers = baseUsername.replace(/\d+$/, '');

    for (let i = 0; i < count; i++) {
        // Generate random 3-4 digit number
        const randomNum = Math.floor(100 + Math.random() * 9000);
        alternatives.push(`${baseWithoutNumbers}${randomNum}`);
    }

    return alternatives;
};

/**
 * Validate username format
 * - Must be 3-30 characters
 * - Can only contain lowercase letters, numbers, and underscores
 * - Cannot start or end with underscore
 * - Cannot have consecutive underscores
 * @param {string} username - Username to validate
 * @returns {Object} Validation result with isValid and message
 */
export const validateUsernameFormat = (username) => {
    if (!username) {
        return { isValid: false, message: 'Username is required' };
    }

    if (username.length < 3) {
        return { isValid: false, message: 'Username must be at least 3 characters' };
    }

    if (username.length > 30) {
        return { isValid: false, message: 'Username must be less than 30 characters' };
    }

    if (!/^[a-z0-9_]+$/.test(username)) {
        return { isValid: false, message: 'Username can only contain lowercase letters, numbers, and underscores' };
    }

    if (/^_|_$/.test(username)) {
        return { isValid: false, message: 'Username cannot start or end with underscore' };
    }

    if (/__/.test(username)) {
        return { isValid: false, message: 'Username cannot have consecutive underscores' };
    }

    return { isValid: true, message: '' };
};
