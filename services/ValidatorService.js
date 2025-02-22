class ValidatorService {
    static validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    static validateAzerbaijanPhoneNumber(phoneNumber) {
        const azPhoneNumberRegex = /^(?:\+994|994|0)?(50|99|51|55|70|77)\d{7}$/;
        return azPhoneNumberRegex.test(phoneNumber);
    }

    static validatePassword(password) {
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
        return passwordRegex.test(password);
    }

    static validateRegister({ birthDate, gender, password, firstName, secondName }) {
        // Password validation
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
        if (!passwordRegex.test(password)) {
            return { isValid: false, message: "Password must be at least 8 characters long and contain one uppercase letter, one lowercase letter, one digit, and one special character." };
        }

        // Gender validation
        if (!["male", "female"].includes(gender)) {
            return { isValid: false, message: "Gender must be either 'male' or 'female'." };
        }

        // Birth date validation
        const date = new Date(birthDate);
        if (isNaN(date.getTime())) {
            return { isValid: false, message: "Please enter a valid birth date." };
        } else {
            const today = new Date();
            const age = today.getFullYear() - date.getFullYear();
            if (age < 14) {
                return { isValid: false, message: "You must be over 14 years old." };
            }
        }

        // First name validation (only letters and spaces)
        const nameRegex = /^[A-Za-zÇçĞğİıÖöŞşÜü\s]+$/;
        if (!firstName) {
            return { isValid: false, message: "First name must only contain letters and cannot be empty." };
        }

        if (!secondName) { 
            return { isValid: false, message: "Second name must only contain letters and cannot be empty." };
        }

        if (!nameRegex.test(firstName) || firstName.trim().length === 0) {
            return { isValid: false, message: "First name must only contain letters and cannot be empty." };
        }

        if (secondName) {
            if (!nameRegex.test(secondName) || secondName.trim().length === 0) {
                return { isValid: false, message: "Last name must only contain letters and cannot be empty." };
            }
        }

        // If all validations pass, return success message
        return { isValid: true, message: "Registration successful!" };
    }

    static validateShop({
        name,
        address,
        shortAddress,
        location,
        discountRate,
        operatingHours,
        settings
    }) {
        if (!name || typeof name !== "string" || name.trim().length === 0) {
            return { isValid: false, message: "Shop name is required and must be a valid string." };
        }
    
        if (!address || typeof address !== "string" || address.trim().length === 0) {
            return { isValid: false, message: "Shop address is required and must be a valid string." };
        }
    
        if (!shortAddress || typeof shortAddress !== "string" || shortAddress.trim().length === 0) {
            return { isValid: false, message: "Short address is required and must be a valid string." };
        }
    
        // Location validation
        if (!location || typeof location !== "object" || !location.coordinates) {
            return { isValid: false, message: "Location must be an object with coordinates." };
        }
    
        const { latitude, longitude } = location.coordinates;
    
        if (typeof latitude !== "number" || latitude < -90 || latitude > 90) {
            return { isValid: false, message: "Latitude must be a number between -90 and 90." };
        }
    
        if (typeof longitude !== "number" || longitude < -180 || longitude > 180) {
            return { isValid: false, message: "Longitude must be a number between -180 and 180." };
        }
    
        // Discount rate validation
        if (typeof discountRate !== "number" || discountRate < 0 || discountRate > 100) {
            return { isValid: false, message: "Discount rate must be a number between 0 and 100." };
        }
    
        // Operating hours validation
        if (!operatingHours || typeof operatingHours !== "object" || !operatingHours.open || !operatingHours.close) {
            return { isValid: false, message: "Operating hours must have 'open' and 'close' times." };
        }
    
        const openHour = parseInt(operatingHours.open, 10);
        const closeHour = parseInt(operatingHours.close, 10);
    
        if (isNaN(openHour) || openHour < 0 || openHour > 23) {
            return { isValid: false, message: "Open time must be a valid hour (0-23)." };
        }
    
        if (isNaN(closeHour) || closeHour < 0 || closeHour > 23) {
            return { isValid: false, message: "Close time must be a valid hour (0-23)." };
        }
    
        // Settings validation
        if (settings && typeof settings === "object" && settings.machineLearning) {
            if (typeof settings.machineLearning.isWorking !== "boolean") {
                return { isValid: false, message: "Machine learning setting 'isWorking' must be a boolean." };
            }
    
            if (typeof settings.machineLearning.startingLimit !== "number" || settings.machineLearning.startingLimit < 0) {
                return { isValid: false, message: "Machine learning 'startingLimit' must be a positive number." };
            }
        }
    
        return { isValid: true, message: "Shop validation successful!" };
    }

}

export { ValidatorService };