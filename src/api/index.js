import axios from "axios";

const BASE_URL = "https://64e07f6b50713530432c5c90.mockapi.io";

export async function getNames(namesBy) {
  try {
    const { data: names } = await axios.get(`${BASE_URL}/${namesBy}`);
    return names;
  } catch (e) {
    alert(e);
  }
}

export async function addNewName(namesBy, name) {
  try {
    await axios.post(`${BASE_URL}/${namesBy}`, name);
  } catch (e) {
    alert(e);
  }
}

export async function deleteName(namesBy, name) {
  try {
    //Пришлось сделать через GET запрос, поскольку mockApi задает свои id, а не id которые приходят из формы, что потом мешает удалять
    //С норм апи id на серваке и из формы должны совпадать
    const { data: names } = await axios.get(`${BASE_URL}/${namesBy}`);
    const foundName = await names.find((n) => name.value === n.value);
    await axios.delete(`${BASE_URL}/${namesBy}/${foundName.id}`);
  } catch (e) {
    alert(e);
  }
}
