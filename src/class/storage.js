class Storage {
    constructor() {
        this.storage = null; // Initialize to null
    }

    _getLocalStorage() {
        if (typeof window !== 'undefined') {
            return window.localStorage;
        }
        return null;
    }

    set(key, value) {
        const localStorage = this._getLocalStorage();
        if (localStorage) {
            try {
                localStorage.setItem(key, JSON.stringify(value)); // Store the value as JSON string
            } catch (error) {
                console.error("Error saving to localStorage:", error);
            }
        }
    }

    get(key) {
        const localStorage = this._getLocalStorage();
        if (localStorage) {
            try {
                const value = localStorage.getItem(key);
                return value ? JSON.parse(value) : null; // Parse the stored value back to an object
            } catch (error) {
                console.error("Error reading from localStorage:", error);
                return null; // Return null if there's an error (e.g., corrupted data)
            }
        }
        return null;
    }

    remove(key) {
        const localStorage = this._getLocalStorage();
        if (localStorage) {
            try {
                localStorage.removeItem(key); // Remove the item from localStorage
            } catch (error) {
                console.error("Error removing from localStorage:", error);
            }
        }
    }

    clear() {
        const localStorage = this._getLocalStorage();
        if (localStorage) {
            try {
                localStorage.clear(); // Clear all items from localStorage
            } catch (error) {
                console.error("Error clearing localStorage:", error);
            }
        }
    }
}

const storage = new Storage();

export default storage;