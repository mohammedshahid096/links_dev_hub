export const converToJson = (data) => {
  return JSON.parse(JSON.stringify(data));
};

export const sanitizeForClient = (data) => {
  if (data === null || data === undefined) return data;
  if (typeof data !== "object") return data;

  if (Array.isArray(data)) {
    return data.map((item) => sanitizeForClient(item));
  }

  const plainObject = {};
  for (const key in data) {
    if (data[key] instanceof Date) {
      plainObject[key] = data[key].toISOString();
    } else if (typeof data[key] === "object" && data[key] !== null) {
      plainObject[key] = sanitizeForClient(data[key]);
    } else {
      plainObject[key] = data[key];
    }
  }
  return plainObject;
};

export const getChangedValues = (oldData, newData) => {
  const changes = {};

  // Helper function for deep comparison
  function compare(oldVal, newVal, keyPath = []) {
    if (oldVal === newVal) return;

    // Handle null/undefined
    if (oldVal == null && newVal == null) return;
    if (oldVal == null || newVal == null) {
      setNestedValue(changes, keyPath, newVal);
      return;
    }

    // Handle objects recursively
    if (
      typeof oldVal === "object" &&
      typeof newVal === "object" &&
      !Array.isArray(oldVal) &&
      !Array.isArray(newVal)
    ) {
      const oldKeys = Object.keys(oldVal);
      const newKeys = Object.keys(newVal);
      const allKeys = [...new Set([...oldKeys, ...newKeys])];

      for (const key of allKeys) {
        compare(oldVal[key], newVal[key], [...keyPath, key]);
      }
      return;
    }

    // Primitive values or arrays — if not equal, record the change
    if (oldVal !== newVal) {
      setNestedValue(changes, keyPath, newVal);
    }
  }

  // Helper to set nested value in result object
  function setNestedValue(obj, keyPath, value) {
    let current = obj;
    for (let i = 0; i < keyPath.length - 1; i++) {
      const key = keyPath[i];
      if (!(key in current)) {
        current[key] = {};
      }
      current = current[key];
    }
    current[keyPath[keyPath.length - 1]] = value;
  }

  // Start comparison at root level
  const allKeys = [
    ...new Set([...Object.keys(oldData), ...Object.keys(newData)]),
  ];
  for (const key of allKeys) {
    compare(oldData[key], newData[key], [key]);
  }

  return changes;
};
