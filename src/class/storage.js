class Storage {
    constructor() {
        this.storage = window.localStorage;
    }

    set(key, value) {
        try {
            this.storage.setItem(key, JSON.stringify(value)); // Store the value as JSON string
        } catch (error) {
            console.error("Error saving to localStorage:", error);
        }
    }

    get(key) {
        try {
            const value = this.storage.getItem(key);
            return value ? JSON.parse(value) : null; // Parse the stored value back to an object
        } catch (error) {
            console.error("Error reading from localStorage:", error);
            return null; // Return null if there's an error (e.g., corrupted data)
        }
    }

    remove(key) {
        try {
            this.storage.removeItem(key); // Remove the item from localStorage
        } catch (error) {
            console.error("Error removing from localStorage:", error);
        }
    }

    clear() {
        try {
            this.storage.clear(); // Clear all items from localStorage
        } catch (error) {
            console.error("Error clearing localStorage:", error);
        }
    }
}

const storage = new Storage();

export default storage;