import { ref, watch } from 'vue'

export const errors = ref({});

export const validateForm = (form) => {
    // Clear previous errors
    errors.value = {};

    // If form is undefined, return early
    if (!form) {
        return;
    }

    // Validate title (trimming whitespace)
    if (!form.title.trim()) {
        errors.value.title = 'Questo campo è obbligatorio';
    } else {
        delete errors.value.title;
    }

    // Validate client_id (checking if it's an integer)
    if (!form.client_id) {
        errors.value.client_id = 'Questo campo è obbligatorio';
    } else if (typeof form.client_id !== 'number') {
        errors.value.client_id = 'Questo campo deve essere un numero intero';
    } else {
        delete errors.value.client_id;
    }

    // Validate start_time (checking if it's a valid date)
    if (!form.start_time || isNaN(Date.parse(form.start_time))) {
        errors.value.start_time = 'Questo campo è obbligatorio';
    } else {
        delete errors.value.start_time;
    }

    // Validate end_time (checking if it's a valid date and after start_time)
    if (!form.end_time || isNaN(Date.parse(form.end_time))) {
        errors.value.end_time = 'Questo campo è obbligatorio';
    } else if (Date.parse(form.end_time) <= Date.parse(form.start_time)) {
        errors.value.end_time = 'La data di fine deve essere successiva alla data di inizio';
    } else {
        delete errors.value.end_time;
    }

    // Validate description (trimming whitespace if it's a string)
    if (form.description && typeof form.description === 'string' && !form.description.trim()) {
        errors.value.description = 'Questo campo è obbligatorio';
    } else {
        delete errors.value.description;
    }
};

export const clearError = (field) => {
    if (errors.value[field]) {
        errors.value[field] = '';
    }
};

export const watchFields = (form) => {
    Object.keys(form).forEach(field => {
        watch(() => form[field], () => {
            clearError(field);
        });
    });
};
