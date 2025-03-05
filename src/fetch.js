import removeAccents from 'remove-accents';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getNextTrainTime(from, direction) {
  try {
    from = removeAccents(from);
    direction = removeAccents(direction);

    const response = await fetch(`${API_BASE_URL}/train?from=${from}&direction=${direction}`);
    const data = await response.json();
    if (response.ok) {
      const arr = data.data;
      return arr ;
    } else {
      console.error("Error:", data);
    }
  } catch (error) {
    console.error("Network Error:", error);
  }
}
