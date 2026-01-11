import * as Yup from 'yup';

/**
 * Simplified Brand Registration Schema
 * Only essential fields required for signup
 */
export const brandRegistrationSchema = Yup.object().shape({
    // Step 1: Basic Information
    businessName: Yup.string()
        .required('Business name is required')
        .min(2, 'Business name must be at least 2 characters')
        .max(100, 'Business name must be less than 100 characters')
        .trim(),

    username: Yup.string()
        .required('Username is required')
        .min(3, 'Username must be at least 3 characters')
        .max(30, 'Username must be less than 30 characters')
        .matches(
            /^[a-z0-9_]+$/,
            'Username can only contain lowercase letters, numbers, and underscores'
        )
        .test(
            'no-leading-trailing-underscore',
            'Username cannot start or end with underscore',
            (value) => value && !/^_|_$/.test(value)
        )
        .test(
            'no-consecutive-underscores',
            'Username cannot have consecutive underscores',
            (value) => value && !/__/.test(value)
        ),

    email: Yup.string()
        .required('Email is required')
        .email('Please enter a valid email address')
        .trim(),

    mobile: Yup.string()
        .required('Mobile number is required')
        .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits'),

    password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(
            /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
            'Password must include at least one letter, one number, and one special character'
        ),

    confirmPassword: Yup.string()
        .required('Please confirm your password')
        .oneOf([Yup.ref('password')], 'Passwords must match'),

    // Step 2: Company Details
    companyType: Yup.string()
        .required('Company type is required')
        .oneOf(
            ['sole_proprietor', 'private_ltd', 'llp', 'partnership', 'public_ltd'],
            'Please select a valid company type'
        ),

    state: Yup.string()
        .required('State is required'),

    city: Yup.string()
        .required('City is required'),

    // Terms & Conditions
    acceptedTerms: Yup.boolean()
        .oneOf([true], 'You must accept the Terms & Conditions')
        .required('You must accept the Terms & Conditions'),

    acceptedPrivacy: Yup.boolean()
        .oneOf([true], 'You must accept the Privacy Policy')
        .required('You must accept the Privacy Policy'),
});

/**
 * Simplified Creator Registration Schema
 * Only essential fields required for signup
 */
export const creatorRegistrationSchema = Yup.object().shape({
    // Basic Information
    name: Yup.string()
        .required('Name is required')
        .min(2, 'Name must be at least 2 characters')
        .max(100, 'Name must be less than 100 characters')
        .matches(/^[a-zA-Z\s]+$/, 'Name must contain only alphabetic characters')
        .trim(),

    username: Yup.string()
        .required('Username is required')
        .min(3, 'Username must be at least 3 characters')
        .max(30, 'Username must be less than 30 characters')
        .matches(
            /^[a-z0-9_]+$/,
            'Username can only contain lowercase letters, numbers, and underscores'
        )
        .test(
            'no-leading-trailing-underscore',
            'Username cannot start or end with underscore',
            (value) => value && !/^_|_$/.test(value)
        )
        .test(
            'no-consecutive-underscores',
            'Username cannot have consecutive underscores',
            (value) => value && !/__/.test(value)
        ),

    email: Yup.string()
        .required('Email is required')
        .email('Please enter a valid email address')
        .trim(),

    mobile: Yup.string()
        .required('Mobile number is required')
        .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits'),

    password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(
            /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
            'Password must include at least one letter, one number, and one special character'
        ),

    confirmPassword: Yup.string()
        .required('Please confirm your password')
        .oneOf([Yup.ref('password')], 'Passwords must match'),

    state: Yup.string()
        .required('State is required'),

    city: Yup.string()
        .required('City is required'),

    // Terms & Conditions
    acceptedTerms: Yup.boolean()
        .oneOf([true], 'You must accept the Terms & Conditions')
        .required('You must accept the Terms & Conditions'),

    acceptedPrivacy: Yup.boolean()
        .oneOf([true], 'You must accept the Privacy Policy')
        .required('You must accept the Privacy Policy'),
});
