export const loadState = <T = any>(key: string): T | undefined => {
    try {
      const serialized = localStorage.getItem(key);
      if (!serialized) return undefined;
      return JSON.parse(serialized) as T;
    } catch (err) {
      console.warn("Failed to load state", err);
      return undefined;
    }
  };
  
  export const saveState = (key: string, state: any): void => {
    try {
      const serialized = JSON.stringify(state);
      localStorage.setItem(key, serialized);
    } catch (err) {
      console.warn("Failed to save state", err);
    }
  };