import apiClient, { setAuthToken, setUser, removeAuthToken } from './api.service';

/**
 * Authentication Service
 * Handles all authentication-related API calls
 */
const authService = {
    /**
     * Sign in user
     * @param {string} email - User email
     * @param {string} password - User password
     * @returns {Promise} User data and token
     */
    async signin(email, password) {
        try {
            const response = await apiClient.post('/auth/signin', {
                email,
                password,
            });

            // Store token and user data
            if (response.token) {
                setAuthToken(response.token);
                setUser(response.user);
            }

            return response;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Sign up brand user
     * @param {Object} data - Brand registration data
     * @returns {Promise} Registration response
     */
    async signupBrand(data) {
        try {
            const response = await apiClient.post('/auth/signup/brand', {
                businessName: data.businessName,
                username: data.username,
                email: data.email,
                mobile: data.mobile,
                password: data.password,
                companyType: data.companyType,
                state: data.state,
                city: data.city,
            });

            return response;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Sign up creator user
     * @param {Object} data - Creator registration data
     * @returns {Promise} Registration response
     */
    async signupCreator(data) {
        try {
            const response = await apiClient.post('/auth/signup/creator', {
                name: data.name,
                username: data.username,
                email: data.email,
                mobile: data.mobile,
                password: data.password,
                state: data.state,
                city: data.city,
            });

            return response;
        } catch (error) {
            throw error;
        }
    },

    /**
   * Check username availability
   * @param {string} username - Username to check
   * @returns {Promise} Availability status and suggestions
   */
    async checkUsernameAvailability(username) {
        try {
            // TODO: Replace with actual API call when backend is ready
            // const response = await apiClient.get(`/auth/check-username/${username}`);

            // Mock implementation for testing
            await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay

            // List of taken usernames for testing
            const takenUsernames = ['admin', 'test', 'user', 'brand_test123', 'creator_test123'];
            const isAvailable = !takenUsernames.includes(username.toLowerCase());

            if (isAvailable) {
                return {
                    available: true,
                    message: 'Username is available'
                };
            } else {
                // Generate suggestions
                const suggestions = [];
                for (let i = 0; i < 2; i++) {
                    const randomNum = Math.floor(1000 + Math.random() * 9000);
                    suggestions.push(`${username}${randomNum}`);
                }

                return {
                    available: false,
                    message: 'Username is already taken',
                    suggestions
                };
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get username suggestions
     * @param {string} baseName - Base name for suggestions
     * @param {number} count - Number of suggestions to generate
     * @returns {Promise} Array of suggested usernames
     */
    async suggestUsernames(baseName, count = 2) {
        try {
            const response = await apiClient.post('/auth/suggest-usernames', {
                baseName,
                count,
            });
            return response;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Verify email with token
     * @param {string} token - Email verification token
     * @returns {Promise} Verification response
     */
    async verifyEmail(token) {
        try {
            const response = await apiClient.post('/auth/verify-email', {
                token,
            });
            return response;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Verify mobile with OTP
     * @param {string} mobile - Mobile number
     * @param {string} otp - OTP code
     * @returns {Promise} Verification response
     */
    async verifyMobile(mobile, otp) {
        try {
            const response = await apiClient.post('/auth/verify-mobile', {
                mobile,
                otp,
            });
            return response;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Resend email verification
     * @param {string} email - User email
     * @returns {Promise} Response
     */
    async resendEmailVerification(email) {
        try {
            const response = await apiClient.post('/auth/resend-email-verification', {
                email,
            });
            return response;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Resend mobile OTP
     * @param {string} mobile - Mobile number
     * @returns {Promise} Response
     */
    async resendMobileOTP(mobile) {
        try {
            const response = await apiClient.post('/auth/resend-mobile-otp', {
                mobile,
            });
            return response;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Sign out user
     */
    signout() {
        removeAuthToken();
        window.location.href = '/sign-in';
    },
};

export default authService;
