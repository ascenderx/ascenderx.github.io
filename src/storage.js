class StorageHandler {
  constructor(type) {
    switch (type) {
      case 'session':
        this._storage = sessionStorage;
        break;
      
      case 'local':
        this._storage = localStorage;
        break;
      
      default:
        throw `Invalid storage type ${type}`;
    }
  }
  
  setItem(key, value) {
    try {
      this._storage.setItem(key, JSON.stringify(value));
    } catch (ex) {}
  }
  
  getItem(key) {
    try {
      return JSON.parse(this._storage.getItem(key));
    } catch (ex) {
      return null;
    }
  }
  
  hasItem(key) {
    try {
      return key in this._storage;
    } catch (ex) {
      return false;
    }
  }
  
  removeItem(key) {
    try {
      if (key in this._storage) {
        this._storage.removeItem(key);
      }
    } catch (ex) {}
  }
}

