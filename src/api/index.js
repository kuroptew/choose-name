import axios from "axios";

const BASE_URL = "https://my-json-server.typicode.com/kuroptew/child-names/";

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
    await axios.delete(`${BASE_URL}/${namesBy}/${name.id}`);
  } catch (e) {
    alert(e);
  }
}
